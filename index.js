function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("show");
    const toggleBtn=document.querySelector('.menu-toggle');
    toggleBtn.setAttribute('aria-expanded',`${toggleBtn.getAttribute('aria-expanded')=='false'?'true':'false'}`);
}

function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Prevents scrolling when Space is pressed
        event.currentTarget.classList.contains('previous-btn') && slideRight();
        event.currentTarget.classList.contains('next-btn') && slideLeft();
    }
}

function slideLeft(){
    let activeStep=document.querySelector('.carousel-container .step.active');
    let stepContainer=activeStep?.parentElement;
    let nextRightElement=activeStep?.nextElementSibling;
    if(stepContainer && nextRightElement){
        stepContainer.style.transform=`translateX(-${nextRightElement?.offsetWidth+48}px)`;
        activeStep.classList.remove('active');
        nextRightElement.classList.add('active');
    }
}

function slideRight(){
    let activeStep=document.querySelector('.carousel-container .step.active');
    let stepContainer=activeStep.parentElement;
    let nextLeftElement=activeStep.previousElementSibling;
    if(stepContainer && nextLeftElement){
        stepContainer.style.transform=`translateX(${nextLeftElement.offsetWidth/8 -32}px)`;
        activeStep.classList.remove('active');
        nextLeftElement.classList.add('active');
    }
}

