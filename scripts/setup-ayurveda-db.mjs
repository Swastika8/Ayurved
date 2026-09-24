import postgres from "postgres";

const connectionString = "postgresql://postgres:SwastikaSinhahere@localhost:5432/Ayurveda";

async function main() {
  console.log("Connecting to PostgreSQL at:", connectionString.replace(/(:[^:@]+@)/, ":****@"));
  const sql = postgres(connectionString, {
    max: 1,
    timeout: 10,
    connect_timeout: 10,
  });

  try {
    const testResult = await sql`SELECT current_database(), current_user, version();`;
    console.log("Connected successfully:", testResult[0]);

    console.log("Setting up schema in Ayurveda database...");

    // Create app_role enum
    await sql.unsafe(`
      DO $$ BEGIN
        CREATE TYPE app_role AS ENUM ('admin', 'doctor', 'patient');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create tables
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS profiles (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        date_of_birth TEXT,
        address TEXT,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS user_roles (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL,
        role app_role NOT NULL DEFAULT 'patient',
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS doctors (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        full_name TEXT NOT NULL,
        speciality TEXT NOT NULL,
        qualifications TEXT,
        years_experience INTEGER NOT NULL DEFAULT 0,
        consultation_fee NUMERIC NOT NULL DEFAULT 0,
        photo_url TEXT,
        bio TEXT,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS availability (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        doctor_id TEXT REFERENCES doctors(id) ON DELETE CASCADE,
        weekday INTEGER NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        slot_minutes INTEGER NOT NULL DEFAULT 30,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        doctor_id TEXT REFERENCES doctors(id),
        patient_id TEXT NOT NULL,
        appointment_date DATE NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT,
        status TEXT NOT NULL DEFAULT 'confirmed',
        amount NUMERIC NOT NULL DEFAULT 0,
        reason TEXT,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        appointment_id TEXT REFERENCES appointments(id) ON DELETE SET NULL,
        patient_id TEXT NOT NULL,
        amount NUMERIC NOT NULL DEFAULT 0,
        currency TEXT NOT NULL DEFAULT 'INR',
        status TEXT NOT NULL DEFAULT 'completed',
        provider TEXT,
        provider_reference TEXT,
        receipt_number TEXT,
        paid_at TIMESTAMPTZ DEFAULT now(),
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS consultations (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        appointment_id TEXT REFERENCES appointments(id) ON DELETE SET NULL,
        doctor_id TEXT REFERENCES doctors(id),
        patient_id TEXT NOT NULL,
        visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
        dosha_assessment TEXT,
        diagnosis TEXT,
        notes TEXT,
        prescription TEXT,
        therapy_plan TEXT,
        follow_up_date DATE,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL,
        appointment_id TEXT REFERENCES appointments(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        body TEXT,
        channel TEXT NOT NULL DEFAULT 'in_app',
        send_after TIMESTAMPTZ DEFAULT now() NOT NULL,
        sent_at TIMESTAMPTZ,
        read_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS treatments (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        summary TEXT,
        description TEXT,
        duration TEXT,
        price NUMERIC,
        benefits TEXT[] DEFAULT '{}',
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS diseases (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        sanskrit_name TEXT,
        category TEXT,
        dosha_imbalance TEXT,
        description TEXT,
        symptoms TEXT[] DEFAULT '{}',
        herbs TEXT[] DEFAULT '{}',
        recommended_therapies TEXT[] DEFAULT '{}',
        diet_guidance TEXT,
        lifestyle_guidance TEXT,
        is_published BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS panchakarma_therapies (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        sanskrit_name TEXT,
        tagline TEXT,
        description TEXT,
        duration TEXT,
        benefits TEXT[] DEFAULT '{}',
        steps JSONB DEFAULT '[]'::jsonb,
        preparation_notes TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS site_content (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
      );
    `);

    console.log("Tables created successfully. Seeding doctors...");

    // Seed doctors
    const doctors = [
      {
        id: "dr-ks-namboodiri",
        full_name: "Dr. K. S. Namboodiri, BAMS, MD (Ayu)",
        speciality: "Chief Vaidya & Nadi Pariksha Specialist",
        qualifications: "BAMS, MD (Ayurveda), Senior Pulse Diagnostician",
        years_experience: 28,
        consultation_fee: 1200,
        photo_url: "/media/gallery-hospital.jpg",
        bio: "Lineage pulse diagnostician with over 28 years of clinical practice restoring Tridosha equilibrium, chronic metabolic harmony, and digestive health.",
      },
      {
        id: "dr-ananya-varma",
        full_name: "Dr. Ananya Varma, BAMS",
        speciality: "Classical Panchakarma & Stree Roga (Women's Health)",
        qualifications: "BAMS, Fellow in Classical Shodhana (Kerala)",
        years_experience: 16,
        consultation_fee: 950,
        photo_url: "/media/wellness-scene.jpg",
        bio: "Specializing in gentle classical detoxification, hormonal rebalancing, post-partum restoration, and autoimmune skin equilibrium.",
      },
      {
        id: "dr-madhavan-kutty",
        full_name: "Dr. Madhavan Kutty, BAMS",
        speciality: "Spine, Joint & Marma Therapy (Asthi-Sandhi)",
        qualifications: "BAMS, Traditional Kalari Marma Expert",
        years_experience: 22,
        consultation_fee: 1000,
        photo_url: "/media/contact-architecture.jpg",
        bio: "Pioneer in non-surgical chronic spine relief, sciatica alleviation, cervical spondylosis, and classical Janu Basti treatment protocols.",
      },
      {
        id: "dr-rajeshwar-iyer",
        full_name: "Dr. Rajeshwar Iyer, BAMS, Ph.D.",
        speciality: "Classical Rasashastra & Herbology Research",
        qualifications: "BAMS, Ph.D. in Ayurvedic Pharmacology",
        years_experience: 19,
        consultation_fee: 850,
        photo_url: "/media/appointment.jpg",
        bio: "Leading specialist in botanical immuno-modulators (Rasayanas), autoimmune skin conditions (Kushta Roga), and preventative pediatric immunity.",
      },
    ];

    for (const doc of doctors) {
      await sql`
        INSERT INTO doctors (id, full_name, speciality, qualifications, years_experience, consultation_fee, photo_url, bio, is_active)
        VALUES (${doc.id}, ${doc.full_name}, ${doc.speciality}, ${doc.qualifications}, ${doc.years_experience}, ${doc.consultation_fee}, ${doc.photo_url}, ${doc.bio}, true)
        ON CONFLICT (id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          speciality = EXCLUDED.speciality,
          qualifications = EXCLUDED.qualifications,
          years_experience = EXCLUDED.years_experience,
          consultation_fee = EXCLUDED.consultation_fee,
          photo_url = EXCLUDED.photo_url,
          bio = EXCLUDED.bio,
          is_active = true;
      `;
    }

    console.log("Seeding doctor availability...");
    // Seed weekday availability for doctors
    for (const doc of doctors) {
      for (const weekday of [1, 2, 3, 4, 5, 6]) {
        await sql`
          INSERT INTO availability (doctor_id, weekday, start_time, end_time, slot_minutes, is_active)
          VALUES (${doc.id}, ${weekday}, '09:00', '17:00', 30, true)
          ON CONFLICT DO NOTHING;
        `;
      }
    }

    const tableCounts = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log("Tables in public schema:", tableCounts.map(r => r.table_name).join(", "));
    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
