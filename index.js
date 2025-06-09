function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("show");
    const toggleBtn=document.querySelector('.menu-toggle');
    toggleBtn.setAttribute('aria-expanded',`${toggleBtn.getAttribute('aria-expanded')=='false'?'true':'false'}`);


    const menuIcon = document.querySelector(".menu-icon");
    const closeIcon = document.querySelector(".close-icon");

    if (!navLinks.classList.contains('show')) {
        menuIcon.style.display = "inline"; // Show hamburger icon
        closeIcon.style.display = "none"; // Hide cross icon
    } else {
        menuIcon.style.display = "none"; // Hide hamburger icon
        closeIcon.style.display = "inline"; // Show cross icon
    }
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

// Removing unsafe attributes in input element of form
function removeUnsafeAttributes(htmlString) {
    return htmlString.replace(/on\w+="[^"]*"/g, "");
}

// Sanitizing the input given by user in input element of form
function sanitizeInput(input) {
    return input.replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
}

function secureInput() {
    let input=this.parentElement.querySelector('[name=email]').value;
    let sanitized = sanitizeInput(input);
    return removeUnsafeAttributes(sanitized);
}

// To style placeholder of select 
document.querySelector("select").addEventListener("change", function() {
  this.classList.toggle("has-value", this.value !== "");
});

window.addEventListener("DOMContentLoaded",()=>{
    document.querySelector('.menu-toggle').addEventListener('click',toggleMenu);
    document.querySelector('.previous-btn').addEventListener('click',slideRight);
    document.querySelector('.previous-btn').addEventListener('keydown',handleKeyDown);
    document.querySelector('.next-btn').addEventListener('click',slideLeft);
    document.querySelector('.next-btn').addEventListener('keydown',handleKeyDown);
    document.querySelector('.subscribe-btn').addEventListener('click',secureInput);

})

