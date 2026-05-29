// ===== Configurações fáceis de editar =====
// Número do WhatsApp com código do país e DDD. Troque aqui se quiser enviar para outro número.
const WHATSAPP_NUMBER = "5511919730067";

// Data da contagem regressiva. Troque aqui para mudar o dia especial.
const COUNTDOWN_TARGET = "2026-10-31T23:59:59-03:00";

const ROMANTIC_CAPTIONS = [
  "Meu lugar favorito.",
  "A saudade mora aqui.",
  "A gente ainda vai viver tudo.",
  "Você é meu lar.",
  "Eu escolheria você de novo."
];

const galleryGrid = document.querySelector("#galleryGrid");
const emptyGallery = document.querySelector("#emptyGallery");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector("#lightboxClose");
const confirmModal = document.querySelector("#confirmModal");
const openSecret = document.querySelector("#openSecret");
const confirmYes = document.querySelector("#confirmYes");
const confirmNo = document.querySelector("#confirmNo");
const specialQuestion = document.querySelector("#specialQuestion");
const softMessage = document.querySelector("#softMessage");
const answerText = document.querySelector("#answerText");
const sendAnswer = document.querySelector("#sendAnswer");
const formWarning = document.querySelector("#formWarning");

function startCountdown() {
  const targetDate = new Date(COUNTDOWN_TARGET).getTime();
  const daysEl = document.querySelector("#days");
  const hoursEl = document.querySelector("#hours");
  const minutesEl = document.querySelector("#minutes");
  const secondsEl = document.querySelector("#seconds");
  const messageEl = document.querySelector("#countdownMessage");

  function updateCountdown() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "0";
      minutesEl.textContent = "0";
      secondsEl.textContent = "0";
      messageEl.textContent = "Chegou o nosso tempo ❤️";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

function buildGallery() {
  const photos = Array.isArray(window.COUPLE_PHOTOS) ? window.COUPLE_PHOTOS : (typeof COUPLE_PHOTOS !== "undefined" ? COUPLE_PHOTOS : []);
  let loadedPhotos = 0;

  if (!photos.length) {
    showEmptyGallery();
    return;
  }

  photos.forEach((photoPath, index) => {
    const card = document.createElement("article");
    card.className = "photo-card reveal";

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Abrir foto ${index + 1}`);

    const image = document.createElement("img");
    image.src = photoPath;
    image.alt = `Nossa foto ${index + 1}`;
    image.loading = "lazy";

    const caption = document.createElement("p");
    caption.className = "photo-caption";
    caption.textContent = ROMANTIC_CAPTIONS[index % ROMANTIC_CAPTIONS.length];

    image.addEventListener("load", () => {
      loadedPhotos += 1;
      emptyGallery.hidden = true;
    });

    image.addEventListener("error", () => {
      card.remove();
      if (loadedPhotos === 0 && galleryGrid.children.length === 0) {
        showEmptyGallery();
      }
    });

    button.addEventListener("click", () => openLightbox(photoPath));
    button.appendChild(image);
    card.append(button, caption);
    galleryGrid.appendChild(card);
  });

  observeReveals();
}

function showEmptyGallery() {
  emptyGallery.hidden = false;
}

function openLightbox(imagePath) {
  lightboxImage.src = imagePath;
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function openConfirmModal() {
  confirmModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeConfirmModal() {
  confirmModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function showSpecialQuestion() {
  closeConfirmModal();
  specialQuestion.classList.remove("hidden");
  observeReveals();
  specialQuestion.scrollIntoView({ behavior: "smooth", block: "start" });
}

function sendWhatsAppAnswer() {
  const answer = answerText.value.trim();

  if (!answer) {
    formWarning.textContent = "Escreve um pouquinho antes, meu amor ❤️";
    answerText.focus();
    return;
  }

  formWarning.textContent = "";
  const message = `Oi, meu amor ❤️\n\nEu li seu site e essa é minha resposta:\n\n${answer}\n\n❤️`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function observeReveals() {
  const revealElements = document.querySelectorAll(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
}

openSecret.addEventListener("click", openConfirmModal);
confirmYes.addEventListener("click", showSpecialQuestion);
confirmNo.addEventListener("click", () => {
  closeConfirmModal();
  softMessage.textContent = "Tudo bem, meu amor… eu espero o seu tempo ❤️";
});
sendAnswer.addEventListener("click", sendWhatsAppAnswer);
lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

confirmModal.addEventListener("click", (event) => {
  if (event.target === confirmModal) {
    closeConfirmModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closeConfirmModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  startCountdown();
  buildGallery();
  observeReveals();
});
