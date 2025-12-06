const track = document.querySelector(".carousel-track");
let slides = Array.from(document.querySelectorAll(".carousel-slide"));
const btnLeft = document.querySelector(".carousel-btn.left");
const btnRight = document.querySelector(".carousel-btn.right");

let index = 1;
const slideWidth = 1200; // Fixed width

// Клонируем первый и последний слайды
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.append(firstClone);
track.prepend(lastClone);

slides = Array.from(document.querySelectorAll(".carousel-slide"));

// Начальная позиция
track.style.transform = `translateX(${-slideWidth * index}px)`;

// Функции
function moveToSlide() {
  track.style.transition = "0.4s ease";
  track.style.transform = `translateX(${-slideWidth * index}px)`;
}

btnRight.addEventListener("click", () => {
  if (index >= slides.length - 1) return;
  index++;
  moveToSlide();
});

btnLeft.addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  moveToSlide();
});

// FIX: когда доходим до клона – делаем мгновенный прыжок назад
track.addEventListener("transitionend", () => {
  if (slides[index].id === "first-clone") {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === "last-clone") {
    track.style.transition = "none";
    index = slides.length - 2;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

// Автопрокрутка
setInterval(() => {
  btnRight.click();
}, 4000);
