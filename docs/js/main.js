class Carousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.carousel-track');
    this.slides = Array.from(this.track.children);
    this.dotsContainer = container.querySelector('.carousel-dots');
    this.prevBtn = container.querySelector('.carousel-prev');
    this.nextBtn = container.querySelector('.carousel-next');
    
    this.currentSlide = 0;
    this.slideWidth = this.slides[0].getBoundingClientRect().width;
    this.autoPlayInterval = null;
    
    this.init();
  }
  
  init() {
    this.generateDots();
    
    this.dots = this.container.querySelectorAll('.carousel-dot');
    
    this.setSlidePositions();
    
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    this.startAutoPlay();
    
    this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.track.addEventListener('mouseleave', () => this.startAutoPlay());
    
    window.addEventListener('resize', () => {
      this.slideWidth = this.slides[0].getBoundingClientRect().width;
      this.setSlidePositions();
      this.goToSlide(this.currentSlide);
    });
  }
  
  generateDots() {
    this.dotsContainer.innerHTML = '';
    
    this.slides.forEach((slide, index) => {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot w-2.5 h-2.5 rounded-full bg-accent cursor-pointer transition-colors duration-300';
      dot.setAttribute('data-slide', index);
      
      if (index === 0) {
        dot.classList.add('carousel-dot-active');
      }
      
      this.dotsContainer.appendChild(dot);
    });
  }
  
  setSlidePositions() {
    this.slides.forEach((slide, index) => {
      slide.style.left = `${this.slideWidth * index}px`;
    });
  }
  
  goToSlide(slideIndex) {
    this.track.style.transform = `translateX(-${this.slideWidth * slideIndex}px)`;
    this.currentSlide = slideIndex;
    this.updateDots();
  }
  
  nextSlide() {
    const nextSlide = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextSlide);
  }
  
  prevSlide() {
    const prevSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevSlide);
  }
  
  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('carousel-dot-active', index === this.currentSlide);
    });
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const carouselContainers = document.querySelectorAll('.carousel-container');
  carouselContainers.forEach(container => {
    new Carousel(container);
  });
  
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade-in-up');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); 
  
  const progressElements = document.querySelectorAll('.circular-progress');
  progressElements.forEach(progress => {
    const progressValue = progress.getAttribute('data-progress') || '85';
    progress.style.setProperty('--progress', `${progressValue}%`);
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});