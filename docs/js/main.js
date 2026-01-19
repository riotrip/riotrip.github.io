class Carousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.carousel-track');
    if (!this.track) return;
    
    this.slides = Array.from(this.track.children);
    if (this.slides.length === 0) return;
    
    this.dotsContainer = container.querySelector('.carousel-dots');
    this.prevBtn = container.querySelector('.carousel-prev');
    this.nextBtn = container.querySelector('.carousel-next');
    
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    
    this.init();
  }
  
  init() {
    this.generateDots();
    
    this.dots = this.container.querySelectorAll('.carousel-dot');
    
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    this.startAutoPlay();
    
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.startAutoPlay());
  }
  
  generateDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    
    this.slides.forEach((slide, index) => {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot';
      dot.setAttribute('data-slide', index);
      
      if (index === 0) {
        dot.classList.add('carousel-dot-active');
      }
      
      this.dotsContainer.appendChild(dot);
    });
  }
  
  goToSlide(slideIndex) {
    this.track.style.transform = `translateX(-${slideIndex * 100}%)`;
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

class NavigationHighlight {
  constructor() {
    this.navItems = document.querySelectorAll('.nav-link');
    this.sections = [];
    this.progressBar = document.querySelector('.scroll-progress-bar');
    
    this.navItems.forEach(item => {
      const sectionId = item.getAttribute('data-section');
      const section = document.getElementById(sectionId);
      if (section) {
        this.sections.push({ id: sectionId, element: section });
      }
    });
    
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => this.onScroll());
    this.onScroll();
  }
  
  onScroll() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Update progress bar
    if (this.progressBar) {
      this.progressBar.style.height = `${scrollPercent}%`;
    }
    
    let currentSection = this.sections[0]?.id;
    
    this.sections.forEach(section => {
      if (section.element.offsetTop <= scrollPosition) {
        currentSection = section.id;
      }
    });
    
    this.navItems.forEach(item => {
      const isActive = item.getAttribute('data-section') === currentSection;
      item.classList.toggle('active', isActive);
    });
  }
}

class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.info-card, .exp-card, .exp-card-alt, .edu-item, .project-card, .exp-subsection');
    this.init();
  }
  
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    this.elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
}

class ParallaxEffect {
  constructor() {
    this.bgTexts = document.querySelectorAll('.hero-bg-text, .contact-bg-text');
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      this.bgTexts.forEach(el => {
        const speed = 0.3;
        el.style.transform = `translate(-50%, calc(-50% + ${scrolled * speed}px)) rotate(-8deg)`;
      });
    });
  }
}

class MouseFollow {
  constructor() {
    this.heroImage = document.querySelector('.hero-image-container');
    if (this.heroImage) {
      this.init();
    }
  }
  
  init() {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      this.heroImage.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

function initializeApp() {
  const carouselContainers = document.querySelectorAll('.carousel-container');
  carouselContainers.forEach(container => {
    new Carousel(container);
  });
  
  new NavigationHighlight();
  
  new ScrollReveal();
  
  new ParallaxEffect();
  
  new MouseFollow();
  
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
  
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}