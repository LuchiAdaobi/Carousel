// Dom Selection
const carousel = document.querySelector('.carousel');
const slides = [...carousel.children];
const nextButton = document.querySelector('.right-btn');
const prevButton = document.querySelector('.left-btn');
const nav = document.querySelector('.nav');
const dots = [...nav.children];

// Get the width of each slide
let slideWidth = slides[0].getBoundingClientRect().width;

// slide horizontal position
function slidePosition(slides){
    for(let index = 0; index < slides.length; index++){
        slides[index].style.left = slideWidth * index + 'px';
    }
}
slidePosition(slides);

// previous button. On click we traslate X to the left
prevButton.addEventListener('click', () => {
    let currentSlide = carousel.querySelector('.active');
    let prevSlide = currentSlide.previousElementSibling;
    moveToSlide(carousel, currentSlide, prevSlide);
    hideButton(prevSlide, slides);
    moveToDot(prevSlide, slides, nav, dots);
})

// next button
nextButton.addEventListener('click', () => {
    let currentSlide = carousel.querySelector('.active');
    let nextSlide = currentSlide.nextElementSibling;
    moveToSlide(carousel, currentSlide, nextSlide);
    hideButton(nextSlide, slides);
    moveToDot(nextSlide, slides, nav, dots);
  
})

// move to slide
function moveToSlide(carousel, currentSlide, targetSlide){
    const position = targetSlide.style.left;
    carousel.style.transform = `translateX(-${position})`;
    toggleActive(currentSlide, targetSlide);
}
// toggle active
function toggleActive(current, target){
    current.classList.remove('active');
    target.classList.add('active');
}
// hide button
function hideButton(targetSlide, slides){
    if(targetSlide === slides[0]){
        prevButton.classList.add('hide');
        nextButton.classList.remove('hide');
    }else if(targetSlide === slides[slides.length -1]){
        nextButton.classList.add('hide');
        prevButton.classList.remove('hide');
    }else{
        prevButton.classList.remove('hide');
        nextButton.classList.remove('hide');
    }
}

// DOTS
nav.addEventListener('click', (e) => {
    const targetDot = e.target;
    const currentDot = nav.querySelector('.active');
    const currentSlide = carousel.querySelector('.active');
    let targetDotIndex = findIndex(targetDot, dots);
    const targetSlide = slides[targetDotIndex];
    moveToSlide(carousel, currentSlide, targetSlide);
    toggleActive(currentDot, targetDot);
    hideButton(targetSlide, slides)
})
// move to dot
function moveToDot(targetSlide, slides, nav, dots){
    let slideIndex = findIndex(targetSlide, slides);
    const currentDot = nav.querySelector('.active');
    const targetDot = dots[slideIndex];
    toggleActive(currentDot, targetDot);
}

// find index of an item inside an array of items
function findIndex(item, items){
    for(let index = 0; index < items.length; index++){
        if(item === items[index]){
            return index;
        }
    }
}

// auto slide
// window.onload = function() {
//     let currentSlide = carousel.querySelector('.active');
//     let nextSlide = currentSlide.nextElementSibling;
//     // moveToDot(nextSlide, slides, nav, dots);
//     setInterval(() => {
//         moveToSlide(carousel, currentSlide, nextSlide);
//     }, 3000)
//     // toggleActive(currentDot, targetDot);

//     hideButton(targetSlide, slides)
// }

// let slideIndex = 0;
// autoShowSlides();

// function autoShowSlides(){
//     let i;
//     for(i = 0; i < slides.length; i++){
//         // slides[i].style.left = slideWidth * i + 'px';    
//         slides[i].style.display = 'none';    
//     }
//     slideIndex++;
//     if(slideIndex > slides.length){
//         slideIndex = 1
//     }
//     slides[slideIndex-1].style.display = 'block';
//     setTimeout(autoShowSlides, 2000)
// }