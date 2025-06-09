let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-item");
const slider = document.querySelector(".carousel-inner");
const dotsContainer = document.querySelector(".dots-container");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Create navigation dots dynamically
for(let i=0; i<slides.length-2; i++){
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute('tabindex','0');
    dot.setAttribute('role','tab');
    dot.addEventListener("click", () => jumpToSlide(i));
    dot.addEventListener('keydown',function handleKeyDown(e){
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // Prevents scrolling when Space is pressed
            e.currentTarget.click();
        }
    });
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function changeSlide() {
    if(this.classList.contains('next')) direction=1;
    else direction=-1;
    currentIndex += direction;

    // Ensure valid range (stopping at first & last card)
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > slides.length - 3) currentIndex = slides.length - 3;

    updateCarousel();
}

function jumpToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 3));
    updateCarousel();
}

function updateCarousel() {
    slider.style.transform = `translateX(${-currentIndex * (slides[0].offsetWidth + 32)}px)`;

    // Update active card appearance
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentIndex + 1);
        if(index!=currentIndex+1){
            slide.removeAttribute('aria-live');
            slide.setAttribute('aria-hidden','true');
        }
        else{
            slide.setAttribute('aria-live','assertive');
            slide.removeAttribute('aria-hidden');
        }
    });

    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
        if(index==currentIndex){
            dot.setAttribute('aria-selected','true');
        }
        else{
            dot.removeAttribute('aria-selected');
        }
    });

    // Disable or enable buttons based on position
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 3;
}

// Initialize first dot as active & update buttons
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.prev').addEventListener('click',changeSlide);
    document.querySelector('.next').addEventListener('click',changeSlide);
    updateCarousel();
});
