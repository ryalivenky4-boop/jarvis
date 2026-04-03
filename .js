import './style.css'

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu on item click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Sticky Navbar Background on Scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll Animations (Intersection Observer)
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

fadeElements.forEach(el => {
  appearOnScroll.observe(el);
});

// Reservation Form Handling
const reservationForm = document.getElementById('reservation-form');
const successPopup = document.getElementById('success-popup');
const closePopupBtn = document.getElementById('close-popup');

reservationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('res-name').value;
  const phone = document.getElementById('res-phone').value;
  const date = document.getElementById('res-date').value;
  const time = document.getElementById('res-time').value;
  const guests = document.getElementById('res-guests').value;

  try {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, date, time, guests }),
    });

    const data = await response.json();

    if (response.ok) {
      // Show success popup with animation
      successPopup.classList.remove('hidden');
      // Reset form
      reservationForm.reset();
    } else {
      alert(data.error || 'Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting reservation:', error);
    alert('Something went wrong. Please try again.');
  }
});

closePopupBtn.addEventListener('click', () => {
  successPopup.classList.add('hidden');
});
