// assets/js/main.js
// Countdown to 28 June 2026 14:00
const targetDate = new Date('2026-06-28T14:00:00');
function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<div>Evento começou!</div>';
    clearInterval(timer);
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP handling using localStorage
const form = document.getElementById('rsvp-form');
const msg = document.getElementById('rsvp-message');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const attendance = document.getElementById('attendance').value;
  const entry = { name, email, attendance, timestamp: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem('rsvp') || '[]');
  existing.push(entry);
  localStorage.setItem('rsvp', JSON.stringify(existing));
  form.reset();
  msg.textContent = `Obrigado, ${name}! Sua confirmação foi registrada.`;
  msg.classList.remove('hidden');
});

// Photo carousel population (placeholder images)
const carousel = document.getElementById('photo-carousel');
const photos = [
  'assets/img/pedro1.png',
  // add more if you have them
];
photos.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Foto do Pedro';
  carousel.appendChild(img);
});

// Album upload preview
const upload = document.getElementById('upload');
const previewGrid = document.getElementById('preview-grid');
upload.addEventListener('change', () => {
  previewGrid.innerHTML = '';
  const files = Array.from(upload.files);
  files.forEach(file => {
    const url = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = url;
    img.alt = file.name;
    previewGrid.appendChild(img);
  });
});

// QR Code generation (link placeholder – replace with actual link)
const qrDiv = document.getElementById('qrcode');
const qrLink = 'https://example.com/album'; // TODO: replace with real link
QRcode.toCanvas(qrDiv, qrLink, { width: 180, color: { dark: '#ffda44', light: '#0a0a0a' } }, function (error) {
  if (error) console.error(error);
});

// Set age placeholder (you can modify directly in HTML or set here)
const ageSpan = document.getElementById('age');
ageSpan.textContent = 'X'; // TODO: replace X with Pedro's age
