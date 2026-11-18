
const slides = document.querySelectorAll(".slide");

const prevButton = document.getElementById("prev");
const pageCount = document.getElementById("page-count");
const progressBar = document.getElementById("progress-bar");

const music = document.getElementById("background-music");
const startButton = document.getElementById("start-button");

let currentSlide = 0;
let experienceStarted = false;

// Menampilkan slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  currentSlide = index;

  prevButton.disabled = currentSlide === 0;

  pageCount.textContent =
    `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  progressBar.style.width =
    `${((currentSlide + 1) / slides.length) * 100}%`;
}

// Tombol pembuka: musik + slide
async function startExperience() {
  if (experienceStarted) return;

  try {
    music.currentTime = 0;
    await music.play();

    experienceStarted = true;
    showSlide(1);

  } catch (error) {
    console.error("Musik gagal diputar:", error);

    alert(
      "Musik belum bisa diputar. Periksa file surat-cinta.mp3 dan coba kembali."
    );
  }
}

// Slide berikutnya
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  }
}

// Slide sebelumnya
function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

// Tombol pembuka
startButton.addEventListener("click", startExperience);

// Navigasi keyboard
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    prevSlide();
  }
});

// Inisialisasi
showSlide(0);
