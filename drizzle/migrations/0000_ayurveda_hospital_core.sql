-- ROLES ENUM
create type public.app_role as enum ('admin', 'doctor', 'patient');

-- PROFILES
create table public.profiles (
  id uuid primary key,
  full_name text not null default '',
  email text,
  phone text,
  date_of_birth date,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

-- USER ROLES
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  );
$$;

create policy "Users read own profile" on public.profiles
  for select to authenticated using (auth.uid() = id or public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'doctor'));
create policy "Users insert own profile" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id or public.has_role(auth.uid(), 'admin'));

create policy "Users read own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

-- new user trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), new.email)
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role)
  values (new.id, 'patient')
  on conflict (user_id, role) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- DOCTORS
create table public.doctors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  full_name text not null,
  speciality text not null default 'Ayurvedic Physician',
  qualifications text,
  bio text,
  photo_url text,
  years_experience int not null default 0,
  consultation_fee numeric(10,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.doctors to anon;
grant select, insert, update, delete on public.doctors to authenticated;
grant all on public.doctors to service_role;
alter table public.doctors enable row level security;
create policy "Doctors are public" on public.doctors for select using (true);
create policy "Admins manage doctors" on public.doctors for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Doctors update own record" on public.doctors for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- AVAILABILITY
create table public.availability (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  weekday int not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  slot_minutes int not null default 30,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.availability to anon;
grant select, insert, update, delete on public.availability to authenticated;
grant all on public.availability to service_role;
alter table public.availability enable row level security;
create policy "Availability is public" on public.availability for select using (true);
create policy "Admins manage availability" on public.availability for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Doctors manage own availability" on public.availability for all to authenticated
  using (exists (select 1 from public.doctors d where d.id = availability.doctor_id and d.user_id = auth.uid()))
  with check (exists (select 1 from public.doctors d where d.id = availability.doctor_id and d.user_id = auth.uid()));

-- APPOINTMENTS
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null,
  doctor_id uuid not null references public.doctors(id) on delete restrict,
  appointment_date date not null,
  start_time time not null,
  end_time time,
  reason text,
  status text not null default 'pending_payment',
  amount numeric(10,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index appointments_slot_unique on public.appointments (doctor_id, appointment_date, start_time)
  where status in ('pending_payment','confirmed','completed');
grant select, insert, update on public.appointments to authenticated;
grant all on public.appointments to service_role;
alter table public.appointments enable row level security;
create policy "Patients read own appointments" on public.appointments for select to authenticated
  using (patient_id = auth.uid()
    or public.has_role(auth.uid(), 'admin')
    or exists (select 1 from public.doctors d where d.id = appointments.doctor_id and d.user_id = auth.uid()));
create policy "Patients create own appointments" on public.appointments for insert to authenticated
  with check (patient_id = auth.uid());
create policy "Update own or assigned appointments" on public.appointments for update to authenticated
  using (patient_id = auth.uid()
    or public.has_role(auth.uid(), 'admin')
    or exists (select 1 from public.doctors d where d.id = appointments.doctor_id and d.user_id = auth.uid()));

-- PAYMENTS
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments(id) on delete cascade,
  patient_id uuid not null,
  amount numeric(10,2) not null default 0,
  currency text not null default 'INR',
  status text not null default 'pending',
  provider text,
  provider_reference text,
  receipt_number text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
grant select, insert on public.payments to authenticated;
grant all on public.payments to service_role;
alter table public.payments enable row level security;
create policy "Patients read own payments" on public.payments for select to authenticated
  using (patient_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Patients create own payments" on public.payments for insert to authenticated
  with check (patient_id = auth.uid());

-- CONSULTATIONS / PRESCRIPTIONS
create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments(id) on delete set null,
  patient_id uuid not null,
  doctor_id uuid not null references public.doctors(id) on delete restrict,
  visit_date date not null default current_date,
  diagnosis text,
  dosha_assessment text,
  notes text,
  prescription text,
  therapy_plan text,
  follow_up_date date,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.consultations to authenticated;
grant all on public.consultations to service_role;
alter table public.consultations enable row level security;
create policy "Read own or assigned consultations" on public.consultations for select to authenticated
  using (patient_id = auth.uid()
    or public.has_role(auth.uid(), 'admin')
    or exists (select 1 from public.doctors d where d.id = consultations.doctor_id and d.user_id = auth.uid()));
create policy "Doctors write consultations" on public.consultations for insert to authenticated
  with check (exists (select 1 from public.doctors d where d.id = consultations.doctor_id and d.user_id = auth.uid())
    or public.has_role(auth.uid(), 'admin'));
create policy "Doctors update own consultations" on public.consultations for update to authenticated
  using (exists (select 1 from public.doctors d where d.id = consultations.doctor_id and d.user_id = auth.uid())
    or public.has_role(auth.uid(), 'admin'));

-- DISEASES
create table public.diseases (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sanskrit_name text,
  category text,
  description text,
  dosha_imbalance text,
  symptoms text[] not null default '{}',
  recommended_therapies text[] not null default '{}',
  diet_guidance text,
  lifestyle_guidance text,
  herbs text[] not null default '{}',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.diseases to anon;
grant select, insert, update, delete on public.diseases to authenticated;
grant all on public.diseases to service_role;
alter table public.diseases enable row level security;
create policy "Published diseases are public" on public.diseases for select using (is_published = true);
create policy "Admins manage diseases" on public.diseases for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- TREATMENTS
create table public.treatments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text,
  description text,
  duration text,
  price numeric(10,2),
  benefits text[] not null default '{}',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.treatments to anon;
grant select, insert, update, delete on public.treatments to authenticated;
grant all on public.treatments to service_role;
alter table public.treatments enable row level security;
create policy "Published treatments are public" on public.treatments for select using (is_published = true);
create policy "Admins manage treatments" on public.treatments for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- PANCHAKARMA
create table public.panchakarma_therapies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sanskrit_name text,
  tagline text,
  description text,
  benefits text[] not null default '{}',
  duration text,
  preparation_notes text,
  steps jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.panchakarma_therapies to anon;
grant select, insert, update, delete on public.panchakarma_therapies to authenticated;
grant all on public.panchakarma_therapies to service_role;
alter table public.panchakarma_therapies enable row level security;
create policy "Published therapies are public" on public.panchakarma_therapies for select using (is_published = true);
create policy "Admins manage therapies" on public.panchakarma_therapies for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- SITE CONTENT
create table public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon;
grant select, insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "Site content is public" on public.site_content for select using (true);
create policy "Admins manage site content" on public.site_content for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- NOTIFICATIONS
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  appointment_id uuid references public.appointments(id) on delete cascade,
  channel text not null default 'in_app',
  title text not null,
  body text,
  send_after timestamptz not null default now(),
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.notifications to authenticated;
grant all on public.notifications to service_role;
alter table public.notifications enable row level security;
create policy "Users read own notifications" on public.notifications for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Users update own notifications" on public.notifications for update to authenticated
  using (user_id = auth.uid());
create policy "Insert own notifications" on public.notifications for insert to authenticated
  with check (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- SEED: site content (placeholders)
insert into public.site_content (key, value) values
('hospital', '{"name":"Aarogya Ayurveda Hospital","tagline":"Classical Ayurveda, gently modern care","address":"[PLACEHOLDER] 12 Herbal Garden Road, City, State 000000","phone":"[PLACEHOLDER] +00 00000 00000","email":"[PLACEHOLDER] care@example.com","hours":"Mon-Sat 8:00-19:00, Sun 9:00-13:00","about":"[PLACEHOLDER] We are a NABH-aspiring Ayurveda hospital offering classical Panchakarma, herbal medicine and lifestyle counselling. Replace this text with your real hospital story."}'),
('announcement', '{"active":true,"text":"[PLACEHOLDER] Free dosha assessment camp every first Sunday of the month."}');

-- SEED: doctors (placeholders)
insert into public.doctors (full_name, speciality, qualifications, bio, years_experience, consultation_fee) values
('[PLACEHOLDER] Dr. Meera Nair', 'Panchakarma & Rasayana', 'BAMS, MD (Ayurveda)', '[PLACEHOLDER] Focuses on classical Panchakarma protocols and rejuvenation therapy.', 14, 800),
('[PLACEHOLDER] Dr. Arun Sharma', 'Kayachikitsa (Internal Medicine)', 'BAMS, MD (Kayachikitsa)', '[PLACEHOLDER] Treats digestive, metabolic and autoimmune conditions.', 11, 700),
('[PLACEHOLDER] Dr. Lakshmi Iyer', 'Prasuti & Stri Roga', 'BAMS, MS (Ayurveda)', '[PLACEHOLDER] Womens health, fertility support and postnatal care.', 9, 750);

insert into public.availability (doctor_id, weekday, start_time, end_time, slot_minutes)
select d.id, w.weekday, '09:00', '13:00', 30 from public.doctors d cross join (values (1),(2),(3),(4),(5),(6)) as w(weekday);
insert into public.availability (doctor_id, weekday, start_time, end_time, slot_minutes)
select d.id, w.weekday, '16:00', '19:00', 30 from public.doctors d cross join (values (1),(3),(5)) as w(weekday);

-- SEED: treatments
insert into public.treatments (slug, name, summary, description, duration, price, benefits, sort_order) values
('abhyanga','Abhyanga','Warm herbal oil full-body massage','[PLACEHOLDER] Synchronised warm-oil massage that calms vata, improves circulation and prepares the body for deeper therapy.','60 min',1500,'{"Calms the nervous system","Improves circulation","Relieves stiffness"}',1),
('shirodhara','Shirodhara','Continuous oil stream on the forehead','[PLACEHOLDER] A steady stream of medicated oil over the forehead to settle the mind, ease insomnia and reduce anxiety.','45 min',1800,'{"Deep mental calm","Better sleep","Relief from headaches"}',2),
('kizhi','Elakizhi','Herbal leaf bolus therapy','[PLACEHOLDER] Heated herbal boluses applied over joints and muscles for pain, swelling and stiffness.','50 min',1600,'{"Joint pain relief","Reduces swelling","Improves mobility"}',3),
('netra-tarpana','Netra Tarpana','Medicated ghee eye therapy','[PLACEHOLDER] Warm medicated ghee held over the eyes to relieve strain, dryness and fatigue.','30 min',1200,'{"Relieves eye strain","Improves dry eyes"}',4),
('udvartana','Udvartana','Herbal powder massage','[PLACEHOLDER] Upward herbal powder massage used in kapha and metabolic disorders.','45 min',1400,'{"Supports weight management","Improves skin texture"}',5);

-- SEED: diseases
insert into public.diseases (slug, name, sanskrit_name, category, description, dosha_imbalance, symptoms, recommended_therapies, diet_guidance, lifestyle_guidance, herbs) values
('arthritis','Arthritis','Sandhivata','Musculoskeletal','[PLACEHOLDER] Degenerative joint disorder marked by pain, stiffness and reduced movement, understood in Ayurveda as vata accumulating in the joints.','Predominantly Vata, with Kapha involvement in swelling','{"Joint pain","Morning stiffness","Swelling","Cracking sounds"}','{"Abhyanga","Elakizhi","Janu Basti","Basti"}','[PLACEHOLDER] Warm, freshly cooked and lightly oily food. Favour moong dal, ghee, ginger and cooked vegetables. Avoid cold, dry and fermented foods.','[PLACEHOLDER] Gentle daily oil massage, warm baths, slow joint mobility exercise, avoid cold exposure and prolonged inactivity.','{"Shallaki","Guggulu","Ashwagandha","Rasna"}'),
('diabetes','Type 2 Diabetes','Madhumeha','Metabolic','[PHOLDER] Chronic metabolic disorder of impaired sugar handling, classed among the prameha disorders.','Kapha predominant, later Vata involvement','{"Excess thirst","Frequent urination","Fatigue","Slow healing"}','{"Udvartana","Virechana","Takradhara"}','[PLACEHOLDER] Barley, millets, bitter vegetables, fenugreek. Reduce sugar, refined flour, dairy sweets and daytime sleep.','[PLACEHOLDER] Daily brisk walking, resistance exercise, regular meal timing, weight management.','{"Vijaysar","Gudmar","Karela","Haridra"}'),
('psoriasis','Psoriasis','Ekakushta','Skin','[PLACEHOLDER] Chronic inflammatory skin condition with scaly plaques, seen as a deep-seated rakta and kapha-vata disorder.','Vata-Kapha with Rakta dushti','{"Scaly plaques","Itching","Dry cracked skin"}','{"Virechana","Raktamokshana","Takradhara"}','[PLACEHOLDER] Avoid incompatible food combinations such as milk with fish, excess salt, sour and fermented foods.','[PLACEHOLDER] Regular sleep, stress reduction, gentle sun exposure, no scratching or harsh soaps.','{"Manjistha","Neem","Khadira","Guduchi"}'),
('ibs','Irritable Bowel Syndrome','Grahani','Digestive','[PLACEHOLDER] Functional bowel disorder with irregular motions and bloating, understood as weakened digestive fire.','Vata-Pitta with weak Agni','{"Bloating","Irregular stools","Cramping","Urgency"}','{"Basti","Abhyanga","Deepana-Pachana therapy"}','[PLACEHOLDER] Simple warm meals, buttermilk with roasted cumin, avoid raw salads, caffeine and irregular eating.','[PLACEHOLDER] Fixed meal times, pranayama, adequate sleep, reduced screen time at night.','{"Bilva","Kutaja","Musta","Shankhpushpi"}'),
('migraine','Migraine','Ardhavabhedaka','Neurological','[PLACEHOLDER] Recurrent one-sided headache with nausea and light sensitivity, driven by aggravated vata and pitta.','Vata-Pitta','{"One-sided headache","Nausea","Light sensitivity","Aura"}','{"Nasya","Shirodhara","Virechana"}','[PLACEHOLDER] Regular meals, cooling foods, avoid skipping meals, fermented food, and excess caffeine.','[PLACEHOLDER] Consistent sleep, avoid direct midday sun, screen breaks, nasal oil drops at night.','{"Brahmi","Shatavari","Jatamansi","Godanti"}'),
('insomnia','Insomnia','Anidra','Neurological','[PLACEHOLDER] Difficulty falling or staying asleep, often from vata aggravation and an overstimulated mind.','Vata, sometimes Pitta','{"Difficulty falling asleep","Frequent waking","Daytime fatigue"}','{"Shirodhara","Abhyanga","Padabhyanga"}','[PLACEHOLDER] Warm milk with nutmeg at night, light early dinner, avoid caffeine after noon.','[PLACEHOLDER] Fixed sleep time, foot oil massage, no screens an hour before bed, evening pranayama.','{"Ashwagandha","Jatamansi","Tagara","Sarpagandha"}'),
('obesity','Obesity','Sthaulya','Metabolic','[PLACEHOLDER] Excess accumulation of meda dhatu with sluggish metabolism and blocked channels.','Kapha with Meda dushti','{"Weight gain","Lethargy","Breathlessness on effort","Excess sweating"}','{"Udvartana","Virechana","Lekhana Basti"}','[PLACEHOLDER] Warm light meals, barley, honey water, plenty of vegetables; reduce dairy sweets, fried food and daytime sleep.','[PLACEHOLDER] Daily 45 minutes of movement, early dinner, no snacking between meals.','{"Triphala","Guggulu","Vrikshamla","Musta"}'),
('asthma','Bronchial Asthma','Tamaka Shwasa','Respiratory','[PLACEHOLDER] Recurrent breathlessness with wheeze from kapha obstructing the breathing channels alongside vata.','Kapha-Vata','{"Wheeze","Breathlessness","Cough","Chest tightness"}','{"Vamana","Nasya","Steam therapy"}','[PLACEHOLDER] Warm light food, ginger and turmeric, avoid curd, cold drinks, banana and heavy dairy at night.','[PLACEHOLDER] Pranayama, steam inhalation, avoid dust and cold air, keep bedding dust-free.','{"Vasa","Kantakari","Pushkarmool","Yashtimadhu"}');

-- SEED: panchakarma
insert into public.panchakarma_therapies (slug, name, sanskrit_name, tagline, description, benefits, duration, preparation_notes, steps, sort_order) values
('vamana','Vamana','वमन','Therapeutic emesis for kapha disorders','[PLACEHOLDER] A supervised, medicated vomiting therapy that clears excess kapha from the chest and stomach. Used in asthma, chronic cold, skin disease and obesity.','{"Clears the chest and airways","Relieves chronic kapha conditions","Lightness and improved appetite"}','7-10 days including preparation','[PLACEHOLDER] Three days of internal ghee (snehapana), light kapha-increasing diet the night before, empty stomach on the day, rest and graded diet (samsarjana krama) afterwards.','[{"title":"Consultation & assessment","detail":"Dosha and strength assessment decides suitability."},{"title":"Snehapana","detail":"Medicated ghee taken internally for 3 days to mobilise doshas."},{"title":"Swedana","detail":"Herbal steam loosens the doshas and moves them to the stomach."},{"title":"Vamana","detail":"Medicated decoction induces controlled, supervised emesis."},{"title":"Samsarjana krama","detail":"Graded diet rebuilds digestive fire over the following days."}]',1),
('virechana','Virechana','विरेचन','Therapeutic purgation for pitta disorders','[PLACEHOLDER] Controlled medicated purgation that clears pitta from the small intestine and liver. Used in skin disease, jaundice, acidity and metabolic conditions.','{"Clears heat and toxins","Improves skin and digestion","Balances pitta"}','7-10 days including preparation','[PLACEHOLDER] Internal ghee for 3-5 days, oil massage and steam, purgative given on an empty stomach, warm water sipped through the day, then graded diet.','[{"title":"Preparation","detail":"Deepana-pachana herbs improve digestion before therapy."},{"title":"Snehapana","detail":"Internal ghee for 3-5 days saturates the tissues."},{"title":"Abhyanga & swedana","detail":"Oil massage and steam bring doshas to the gut."},{"title":"Virechana","detail":"A measured purgative clears pitta through the bowels."},{"title":"Recovery diet","detail":"Rice gruel to normal food across 3-5 days."}]',2),
('basti','Basti','बस्ति','Medicated enema, the master vata therapy','[PLACEHOLDER] Medicated oil or decoction introduced into the colon, considered the most important of the five therapies for vata disorders such as arthritis, sciatica, constipation and neurological conditions.','{"Best therapy for vata disorders","Relieves joint and back pain","Nourishes and strengthens tissues"}','8-30 days depending on schedule','[PLACEHOLDER] Light warm diet, abhyanga and steam before each basti, empty bladder and bowels, rest lying on the left side after administration.','[{"title":"Assessment","detail":"Type of basti (oil or decoction) and schedule are chosen."},{"title":"Abhyanga","detail":"Warm oil massage over abdomen, back and hips."},{"title":"Swedana","detail":"Localised steam opens the channels."},{"title":"Basti administration","detail":"Warm medicated liquid introduced gently into the colon."},{"title":"Rest & observation","detail":"Retention time, return, and appetite are monitored."}]',3),
('nasya','Nasya','नस्य','Nasal medication for head and neck','[PLACEHOLDER] Medicated oils, powders or juices administered through the nostrils to clear the head, sinuses and neck region. Used in migraine, sinusitis, cervical pain and hair fall.','{"Clears sinuses","Relieves migraine and cervical stiffness","Sharpens the senses"}','7-14 days','[PLACEHOLDER] Face and neck massage with steam beforehand, empty stomach or two hours after light food, avoid cold water, dust and head bath afterwards.','[{"title":"Face & neck massage","detail":"Gentle oil massage over face, forehead and neck."},{"title":"Local steam","detail":"Steam to the face loosens accumulated kapha."},{"title":"Nasya drops","detail":"Warm medicated oil instilled into each nostril."},{"title":"Gargle & spit","detail":"Warm water gargle clears the throat of loosened kapha."},{"title":"Rest","detail":"Warm environment and no cold exposure for the day."}]',4),
('raktamokshana','Raktamokshana','रक्तमोक्षण','Precise bloodletting for blood-borne disorders','[PLACEHOLDER] Controlled removal of a small quantity of impure blood, by leech application or venesection, for localised skin disease, varicose veins, gout and abscesses.','{"Relieves localised inflammation","Helps stubborn skin conditions","Reduces varicose discomfort"}','1-3 sittings','[PLACEHOLDER] Blood tests and fitness check first, light meal before the sitting, site cleaned and dressed, iron-rich diet and rest afterwards. Not for anaemia, pregnancy or bleeding disorders.','[{"title":"Eligibility check","detail":"Blood counts and general strength are verified."},{"title":"Site preparation","detail":"Affected area cleaned and marked."},{"title":"Raktamokshana","detail":"Leech application or fine venesection removes a measured quantity of blood."},{"title":"Dressing","detail":"Site dressed and protected against infection."},{"title":"Aftercare","detail":"Rest, hydration and nourishing diet for a few days."}]',5);
