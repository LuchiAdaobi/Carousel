// Dom Selection
const carousel = document.querySelector('.carousel');
const slides = [...carousel.children];
const nextButton = document.querySelector('.right-btn');
const prevButton = document.querySelector('.left-btn');
const nav = document.querySelector('.nav');
const dots = [...nav.children];

// Calculate the slide width
let slideWidth = slides[0].getBoundingClientRect().width;
// Position the slides horizontally  
function positionSlides(slides){
    for(let index = 0; index < slides.length; index++){
        slides[index].style.left = slideWidth * index + 'px';
    }
}
positionSlides(slides);

// On Right button click, we move (translateX) the carousel to the left
nextButton.addEventListener('click', function() {
    const currentSlide = carousel.querySelector('.active');
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(carousel, currentSlide, nextSlide);
    hideButton(nextSlide, slides);
    moveToDot(nextSlide, slides, nav, dots);
  
});

prevButton.addEventListener('click', function() {
    const currentSlide = carousel.querySelector('.active');
    const prevSlide = currentSlide.previousElementSibling;
    moveToSlide(carousel, currentSlide, prevSlide);
    hideButton(prevSlide, slides);
    moveToDot(prevSlide, slides, nav, dots);
});

// Move to slide
function moveToSlide(carousel, currentSlide, targetSlide){
    const position = targetSlide.style.left;
    carousel.style.transform = `translateX(-${position})`;
    toggleActive(currentSlide, targetSlide)
}

// Move to dot 
function moveToDot(targetSlide, slides, nav, dots){
    let slideIndex = findIndex(targetSlide, slides);
    const currentDot = nav.querySelector('.active');
    const targetDot = dots[slideIndex];
    toggleActive(currentDot, targetDot);
}
// Toggle Active Class
function toggleActive(current, target){
    current.classList.remove('active');
    target.classList.add('active');
}

// Hide Button
function hideButton(targetSlide, slides){
    // if the target slide is the first slide, the previous icom must be hidden and the right button must be shown

    if(targetSlide === slides[0]){
        prevButton.classList.add('hide')
        nextButton.classList.remove('hide')
    } else if(targetSlide === slides[slides.length -1]){
        nextButton.classList.add('hide')
        prevButton.classList.remove('hide')
    } else {
        nextButton.classList.remove('hide')
        prevButton.classList.remove('hide')  
    }
};

// On Dot Click
nav.addEventListener('click', (e) => {
    // if dot isn't clicked, exit 
    // if(e.target === nav) return;
    // select clicked dot
    const targetDot = e.target;
    // current dot 
    const currentDot = nav.querySelector('.active');
    // select the curent slide
    currentSlide = carousel.querySelector('.active'); 
    // find the index of the dot, so we can target the right one
    let targetDotIndex = findIndex(targetDot, dots);

    // select the target slide
    const targetSlide = slides[targetDotIndex];
    moveToSlide(carousel,  currentSlide, targetSlide);
    toggleActive(currentDot, targetDot);
    hideButton(targetSlide, slides);
});

// Find the index of an item, inside an array of items
function findIndex(item, items){
      for(let index =0; index < items.length; index++){
          if(item === items[index]){
              return index;
          }
      }
};


// auto

            var counter = 1;
            setInterval(function(){
                dots(counter).checked = true;
                counter++;
                if(counter > 3){
                    counter = 1;
                }
            }, 5000);
        
            