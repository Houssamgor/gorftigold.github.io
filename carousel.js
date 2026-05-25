const PRODUITS = {
  bagues: [
    "images/img-bague-1.jpeg",
    "images/img-bague-2.jpeg",
    "images/img-bague-3.jpeg",
    "images/img-bague-4.jpeg",
    "images/img-bague-5.jpeg",
  ],
  colliers: [
    "images/img-collier-1.jpeg",
    "images/img-collier-2.jpeg",
  ],
  boucles: [
    "images/img-boucle-1.jpeg",
  ],
};

function buildCarousel(cardId, images) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const track = card.querySelector(".carousel-track");
  const dotsContainer = card.querySelector(".carousel-dots");
  let current = 0;

  images.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.onerror = () => {
      slide.innerHTML = `<div class="carousel-placeholder"><span>${i + 1}</span></div>`;
    };
    slide.appendChild(img);
    track.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + images.length) % images.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    card.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === current));
  }

  card.querySelector(".prev").addEventListener("click", () => goTo(current - 1));
  card.querySelector(".next").addEventListener("click", () => goTo(current + 1));

  let autoplay = setInterval(() => goTo(current + 1), 3500);
  card.addEventListener("mouseenter", () => clearInterval(autoplay));
  card.addEventListener("mouseleave", () => { autoplay = setInterval(() => goTo(current + 1), 3500); });
}

document.addEventListener("DOMContentLoaded", () => {
  buildCarousel("carousel-bagues",   PRODUITS.bagues);
  buildCarousel("carousel-colliers", PRODUITS.colliers);
  buildCarousel("carousel-boucles",  PRODUITS.boucles);
});
