const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// All interactions are browser-local. There are no analytics, APIs, or form requests.
const booking = $('#booking-dialog');
const details = $('#detail-dialog');
const bookingForm = $('#booking-form');
const menuToggle = $('.menu-toggle');
const navigation = $('#main-nav');

function setMenu(open) {
  navigation.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
$$('#main-nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) setMenu(false);
});
window.matchMedia('(min-width: 961px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

function todayLocal() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function resetBooking() {
  bookingForm.reset();
  $('#booking-content').hidden = false;
  $('#booking-success').hidden = true;
  booking.setAttribute('aria-labelledby', 'booking-title');
  $('#success-message').textContent = '';
  $('#appointment-summary').replaceChildren();
  bookingForm.elements.date.min = todayLocal();
  bookingForm.elements.date.setCustomValidity('');
}

function openBooking(interest) {
  if (details.open) details.close();
  setMenu(false);
  resetBooking();
  if (interest && [...bookingForm.elements.interest.options].some(option => option.value === interest)) {
    bookingForm.elements.interest.value = interest;
  }
  booking.showModal();
  document.body.classList.add('dialog-open');
}

$$('[data-book]').forEach(button => button.addEventListener('click', () => openBooking()));
$$('dialog').forEach(dialog => {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!$$('dialog[open]').length) document.body.classList.remove('dialog-open');
    if (dialog === booking) resetBooking();
  });
});

bookingForm.elements.date.addEventListener('input', () => {
  const date = bookingForm.elements.date;
  date.setCustomValidity(date.value && date.value < todayLocal() ? 'Please choose today or a future date.' : '');
});
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  const formData = new FormData(bookingForm);
  const name = String(formData.get('name')).trim();
  if (!name) {
    bookingForm.elements.name.setCustomValidity('Please enter your name.');
    bookingForm.elements.name.reportValidity();
    return;
  }
  const date = new Date(`${formData.get('date')}T12:00:00`);
  const formattedDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  $('#success-message').textContent = `Thank you, ${name}. Here’s what your consultation could look like.`;
  const summary = $('#appointment-summary');
  const title = document.createElement('strong');
  title.textContent = formData.get('interest');
  const timing = document.createElement('span');
  timing.textContent = `${formattedDate} · ${formData.get('time')}`;
  const type = document.createElement('span');
  type.textContent = `${formData.get('visit')} consultation · Preview only`;
  summary.replaceChildren(title, timing, type);
  $('#booking-content').hidden = true;
  $('#booking-success').hidden = false;
  booking.setAttribute('aria-labelledby', 'success-title');
  booking.scrollTop = 0;
  $('#booking-done').focus();
  // Clear personal details immediately after rendering the local preview.
  bookingForm.reset();
});
bookingForm.elements.name.addEventListener('input', () => bookingForm.elements.name.setCustomValidity(''));
$('#booking-done').addEventListener('click', () => booking.close());

$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  $$('.treatment-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));

const treatments = {
  panchakarma: {
    title: 'Panchakarma', eyebrow: 'RESTORE & RECONNECT', image: 'therapy',
    intro: 'Make space for a thoughtful reset. Panchakarma is a traditional Ayurvedic approach that brings together several therapies, selected around an individual’s needs.',
    body: 'A programme begins with an assessment, rather than a set package. Your practitioner would discuss the purpose, suitability, duration, and practical details of each proposed therapy with you.',
    list: ['An initial conversation about your health and goals', 'An individual plan, explained before you begin', 'Guidance on preparation, aftercare, and follow-up'], interest: 'Panchakarma'
  },
  abhyanga: {
    title: 'Abhyanga & oil therapies', eyebrow: 'UNWIND & REPLENISH', image: 'herbal-oil',
    intro: 'A quieter moment in a busy day. Abhyanga is a traditional oil massage ritual, offering time to pause in a peaceful, considered setting.',
    body: 'The choice of oil, pressure, and pace should be discussed with a practitioner. Comfort, allergies, skin sensitivities, and your preferences are part of that conversation.',
    list: ['A discussion of comfort and individual needs', 'A calm space and a carefully paced session', 'Clear preparation and aftercare guidance'], interest: 'Abhyanga & oil therapies'
  },
  yoga: {
    title: 'Yoga & mindful living', eyebrow: 'BREATHE & BE PRESENT', image: 'yoga',
    intro: 'Not another thing to get right. Just a little more space to move, breathe, and pay attention to yourself.',
    body: 'Explore a gentle, individual approach to movement and breath. Sessions can be discussed around your experience, preferences, and physical needs, with an emphasis on moving within your comfort.',
    list: ['An introduction to mindful movement', 'Breathing and relaxation practices', 'Small routines you can return to at home'], interest: 'Yoga & mindful living'
  },
  consultation: {
    title: 'Ayurvedic consultation', eyebrow: 'LISTEN & UNDERSTAND', image: 'doctor-man',
    intro: 'Your story is the starting point. A first consultation is a chance to talk about your concerns and what wellbeing means in your life.',
    body: 'A practitioner would ask about your health history, daily habits, existing care, and goals. Together, you can discuss what next steps may be appropriate, with time for questions.',
    list: ['Space to discuss your concerns', 'A review of your routines and existing care', 'A clear explanation of possible next steps'], interest: 'First Ayurvedic consultation'
  },
  nutrition: {
    title: 'Nutrition & lifestyle', eyebrow: 'NOURISH & FLOURISH', image: 'tea',
    intro: 'Wellbeing happens in the everyday. Explore a thoughtful way to look at your meals, rest, routines, and the pace of your day.',
    body: 'The aim is a practical conversation about habits that fit your life, preferences, and needs. Personal nutrition advice should always take account of your health and any existing clinical guidance.',
    list: ['An understanding of your daily rhythm', 'A conversation about practical, realistic habits', 'Space to adjust and reflect over time'], interest: 'Nutrition & lifestyle'
  },
  shirodhara: {
    title: 'Shirodhara & relaxation', eyebrow: 'PAUSE & FIND STILLNESS', image: 'hero-spa',
    intro: 'An invitation to slow down. Shirodhara is a traditional Ayurvedic ritual involving a gentle stream of liquid over the forehead.',
    body: 'A consultation is important before choosing a therapy. Your practitioner would explain what to expect, discuss suitability and comfort, and answer any questions about the experience.',
    list: ['A suitability and comfort conversation', 'A peaceful, thoughtfully prepared setting', 'Time to rest and clear aftercare information'], interest: 'Shirodhara & relaxation'
  }
};

function showDetail(html, onReady) {
  $('#detail-content').innerHTML = html;
  details.showModal();
  document.body.classList.add('dialog-open');
  details.scrollTop = 0;
  if (onReady) onReady();
}

$$('[data-treatment]').forEach(button => button.addEventListener('click', () => {
  const treatment = treatments[button.dataset.treatment];
  showDetail(`<div class="detail-image"><img src="assets/${treatment.image}.jpg" alt="Placeholder photography for ${treatment.title}"></div><div class="detail-body"><div class="eyebrow">${treatment.eyebrow}</div><h2 id="detail-title">${treatment.title}</h2><p>${treatment.intro}</p><p>${treatment.body}</p><h3>A considered experience</h3><ul>${treatment.list.map(item => `<li>${item}</li>`).join('')}</ul><span class="demo-label">Illustrative service information for this website concept. Individual suitability requires a qualified practitioner’s assessment.</span><button class="button primary" id="detail-book">Explore a consultation <svg class="icon"><use href="#i-arrow"/></svg></button></div>`, () => {
    $('#detail-book').addEventListener('click', () => openBooking(treatment.interest));
  });
}));

$$('[data-doctor]').forEach(button => button.addEventListener('click', () => {
  showDetail(`<div class="detail-image"><img src="assets/doctor-man.jpg" alt="Stock portrait placeholder for Swasthyam’s doctor"></div><div class="detail-body"><div class="eyebrow">YOUR CARE AT SWASTHYAM</div><h2 id="detail-title">Your Ayurvedic doctor</h2><span class="demo-label">Stock portrait · Name and professional details to be added</span><p>At Swasthyam, your care begins with a conversation with our doctor. Share your concerns, discuss your daily routine, and take time to ask your questions.</p><h3>A personal approach.</h3><p>One doctor to understand your story and guide your next step, with care shaped around you.</p><button class="button primary" id="detail-book">Book a consultation <svg class="icon"><use href="#i-arrow"/></svg></button></div>`, () => $('#detail-book').addEventListener('click', () => openBooking()));
}));

const articles = {
  morning: {
    title: 'The quiet art of a slower morning', category: 'MINDFUL LIVING', read: '4 MIN READ', image: 'tea',
    content: `<p>Some mornings begin before we feel ready: a screen lights up, a message arrives, and the day is already moving. A slower start doesn’t need an elaborate ritual. It can begin with one unhurried moment.</p><h3>Give the first few minutes to yourself</h3><p>Open a window. Notice the light. Sit with your morning drink before reaching for a screen. Choose a pause that feels easy enough to repeat, rather than a routine that becomes another task.</p><h3>Let ordinary things be enough</h3><p>A few gentle stretches, a quiet breakfast, or the simple act of making your bed can offer a sense of intention. There is no perfect sequence, and every day can look different.</p><h3>Start small, stay curious</h3><p>Pick one thing you enjoy and try making room for it this week. Notice how the experience fits your life. The point is not to optimise every minute, but to make a little space within it.</p>`
  },
  ayurveda: {
    title: 'Ancient wisdom. Your everyday life.', category: 'AYURVEDA, SIMPLIFIED', read: '5 MIN READ', image: 'herbal-oil',
    content: `<p>Ayurveda is a traditional system of care with roots in India. At the heart of its approach is attention to the individual and their relationship with daily life, seasons, and surroundings.</p><h3>Begin with observation</h3><p>Looking at an everyday routine can be a useful starting point for a conversation: the pace of your mornings, when you make time to rest, and the habits that feel comfortable or difficult.</p><h3>Make room for a conversation</h3><p>When exploring Ayurvedic care, ask questions. What is being proposed? What does it involve? How does it fit with the care you already receive? A qualified practitioner should make room for a clear discussion of suitability and your choices.</p><h3>A thoughtful next step</h3><p>Curiosity is welcome. Begin with an individual consultation, take a list of your current medicines and supplements, and discuss any proposed treatment with your healthcare team.</p>`
  },
  nature: {
    title: 'Make a little more room for nature', category: 'EVERYDAY WELLBEING', read: '3 MIN READ', image: 'yoga',
    content: `<p>A patch of green outside a window. The sound of rain. A familiar tree on a familiar walk. Nature needn’t be a distant destination; it can be something we notice in the middle of an ordinary day.</p><h3>Look a little closer</h3><p>Try taking your usual walk without rushing. Notice one colour, texture, or sound you might otherwise pass by. You don’t need to turn it into a practice or measure what it achieves.</p><h3>Find your version of outdoors</h3><p>A park bench, a balcony plant, or a few minutes near an open window can all become small moments of connection. Choose what is accessible and enjoyable for you.</p><h3>Leave some time unplanned</h3><p>Not every quiet moment needs a purpose. Sometimes sitting, looking, and simply being there is enough.</p>`
  }
};
$$('[data-article]').forEach(button => button.addEventListener('click', () => {
  const article = articles[button.dataset.article];
  showDetail(`<div class="detail-image"><img src="assets/${article.image}.jpg" alt="${article.title}"></div><article class="detail-body"><div class="eyebrow">${article.category}</div><h2 id="detail-title">${article.title}</h2><div class="article-byline">Swasthyam journal · Sample editorial · ${article.read}</div>${article.content}<div class="demo-notice">An illustrative journal article for this website concept. General information, not individual medical advice.</div></article>`);
}));

const info = {
  philosophy: `<div class="eyebrow">THE SWASTHYAM WAY</div><h2 id="detail-title">A little closer<br>to <em>yourself.</em></h2><p>At Swasthyam Ayurvedic Hospital, our approach begins with a simple idea: care should begin with the person.</p><p>The experience brings together time-honoured Ayurvedic traditions, a calm environment, and space for thoughtful conversations. It makes room for your questions and respects your existing care.</p><h3>Listen. Understand. Guide.</h3><p>We see the first consultation as a starting point, rather than a promise of an outcome. Your care choices should feel clear, individual, and considered.</p><span class="demo-label">This is a website preview. Booking is a demonstration; the doctor’s details and hospital contact information are to be added.</span>`,
  privacy: `<div class="eyebrow">YOUR PRIVACY</div><h2 id="detail-title">A private, local<br><em>preview.</em></h2><p>This demonstration site has no analytics, advertising trackers, contact API, or booking backend. Form entries are used only to display the sample appointment summary on this page.</p><p>The form is reset after that preview and again when the booking dialog closes. No form data is sent to a clinic, saved to local storage, or emailed. Photos and fonts are served with this website.</p><p>The hosting service may process ordinary request information necessary to serve this site.</p>`,
  website: `<div class="eyebrow">ABOUT THIS WEBSITE</div><h2 id="detail-title">A fresh expression<br>of <em>Ayurvedic care.</em></h2><p>This website preview for Swasthyam Ayurvedic Hospital presents Ayurvedic care, a single-doctor introduction, and a sample booking experience.</p><p>All branding, copy, styling, and interface code were created for this concept. None of the reference clinic’s photos are used. The images are independent Unsplash stock photos used as placeholders.</p><p>The doctor’s name, professional details, and hospital location are to be added. The portrait is a stock photo placeholder. The sample booking flow does not create a real appointment.</p>`
};
$$('[data-info]').forEach(button => button.addEventListener('click', () => showDetail(`<div class="detail-body">${info[button.dataset.info]}</div>`)));

const slides = [
  { title: 'Find your way<br>back to <em>balance.</em>', image: 'herbal-oil', alt: 'Amber botanical oil in soft natural light', label: 'THE ART OF FEELING WELL' },
  { title: 'Make room<br>for a little <em>calm.</em>', image: 'therapy', alt: 'A calming massage in a peaceful setting', label: 'A MOMENT, JUST FOR YOU' },
  { title: 'Reconnect with<br>your own <em>rhythm.</em>', image: 'yoga', alt: 'A quiet moment of yoga outdoors', label: 'BREATHE. MOVE. BE PRESENT.' }
];
let slideIndex = 0;
function showSlide(next) {
  slideIndex = (next + slides.length) % slides.length;
  const slide = slides[slideIndex];
  $('.hero h1').innerHTML = slide.title;
  $('#hero-image').src = `assets/${slide.image}.jpg`;
  $('#hero-image').alt = slide.alt;
  $('.image-caption').textContent = slide.label;
  $('#slide-count').innerHTML = `0${slideIndex + 1} <i>/ 03</i>`;
}
$('#hero-prev').addEventListener('click', () => showSlide(slideIndex - 1));
$('#hero-next').addEventListener('click', () => showSlide(slideIndex + 1));

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$('#main-nav a').forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  });
}, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
$$('main section[id]').forEach(section => navObserver.observe(section));
$('#year').textContent = new Date().getFullYear();
resetBooking();
