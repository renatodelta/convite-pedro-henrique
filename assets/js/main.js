// assets/js/main.js

// Countdown Logic
const targetDate = new Date("June 28, 2026 16:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(interval);
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) {
            countdownEl.innerHTML = "<h2 class='font-headline-lg text-primary italic text-3xl md:text-5xl'>O JOGO COMEÇOU! ⚽</h2>";
        }
    }
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Player Card Live Preview
const inputCardName = document.getElementById('input-card-name');
const inputCardPos = document.getElementById('input-card-pos');
const inputCardCountry = document.getElementById('input-card-country');

const cardName = document.getElementById('card-name');
const cardPos = document.getElementById('card-pos');
const cardCountry = document.getElementById('card-country');

if (inputCardName && cardName) {
    inputCardName.addEventListener('input', (e) => {
        cardName.innerText = e.target.value.toUpperCase() || 'SEU NOME';
    });
}
if (inputCardPos && cardPos) {
    inputCardPos.addEventListener('change', (e) => {
        cardPos.innerText = `POSIÇÃO: ${e.target.value.toUpperCase()}`;
    });
}
if (inputCardCountry && cardCountry) {
    inputCardCountry.addEventListener('input', (e) => {
        cardCountry.innerText = `PAÍS: ${e.target.value.toUpperCase()}`;
    });
}

// Player Card Photo Preview
const inputCardPhoto = document.getElementById('input-card-photo');
const cardPhotoPlaceholder = document.getElementById('card-photo-placeholder');
const cardPhotoImg = document.getElementById('card-photo-img');

if (inputCardPhoto && cardPhotoImg && cardPhotoPlaceholder) {
    inputCardPhoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                cardPhotoImg.src = event.target.result;
                cardPhotoImg.classList.remove('hidden');
                cardPhotoPlaceholder.classList.add('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            cardPhotoImg.src = '';
            cardPhotoImg.classList.add('hidden');
            cardPhotoPlaceholder.classList.remove('hidden');
        }
    });
}

// RSVP Form Logic
const rsvpForm = document.getElementById('rsvp-form');
const rsvpMessage = document.getElementById('rsvp-message');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('rsvp-name').value.trim();
        const team = document.getElementById('rsvp-team').value.trim();
        const presence = document.querySelector('input[name="presence"]:checked').value;
        
        const rsvpData = {
            name,
            team,
            presence,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage (Local Backup)
        const allRsvps = JSON.parse(localStorage.getItem('rsvp_list') || '[]');
        allRsvps.push(rsvpData);
        localStorage.setItem('rsvp_list', JSON.stringify(allRsvps));

        // Submit to Google Forms (No-CORS Mode)
        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc3Ijjacjnd2bmRxksFMkFIlrWSVEFYD5U1ArlsXLVfJJ_mUA/formResponse";
        const formData = new URLSearchParams();
        formData.append("entry.558665171", name);
        formData.append("entry.1400950249", team);
        formData.append("entry.594822132", presence === 'sim' ? 'Sim' : 'Não');

        fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
        .then(() => {
            // Reset form
            rsvpForm.reset();
            
            // Show success message
            if (rsvpMessage) {
                rsvpMessage.innerText = presence === 'sim' 
                    ? `SUA ESCALAÇÃO FOI CONFIRMADA, ${name.toUpperCase()}! ⚽`
                    : `REGISTRADO! SENTIREMOS SUA FALTA NA ESCALAÇÃO, ${name.toUpperCase()}!`;
                rsvpMessage.classList.remove('hidden');
            }
        })
        .catch(err => {
            console.error("Google Forms submission error:", err);
            // Fallback: still show message since local storage worked
            rsvpForm.reset();
            if (rsvpMessage) {
                rsvpMessage.innerText = `SALVO LOCALMENTE! OBRIGADO, ${name.toUpperCase()}!`;
                rsvpMessage.classList.remove('hidden');
            }
        });
    });
}

// QR Code Generator
const qrcodeContainer = document.getElementById('qrcode');
if (qrcodeContainer) {
    // Generates a QR code linking to the Google Photos album
    const albumUrl = "https://photos.app.goo.gl/X8ryy4dxcpn3j3QXA";
    QRCode.toCanvas(qrcodeContainer, albumUrl, {
        width: 160,
        margin: 1,
        color: {
            dark: '#121314',
            light: '#ffffff'
        }
    }, function (error) {
        if (error) console.error(error);
    });
}
