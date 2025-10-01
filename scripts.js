document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Video scroll scrubbing - Simple and effective approach
  var video = document.getElementById('bg-video');
  if (!video) return;

  // Wait for video to be ready
  video.addEventListener('canplay', function() {
    // Don't reset to 0, let it start from current position
    if (video.currentTime === 0) {
      video.currentTime = 0;
    }
  });

  // Simple scroll handler for hero section only
  function updateVideoTime() {
    if (!video.duration) return;

    // Get hero section position
    var heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    var heroRect = heroSection.getBoundingClientRect();
    var heroHeight = heroSection.offsetHeight;
    var windowHeight = window.innerHeight;
    
    // Calculate scroll progress within hero section only
    var scrollProgress = 0;
    
    if (heroRect.top <= 0 && heroRect.bottom > 0) {
      // Hero section is visible, calculate progress
      var scrolled = Math.abs(heroRect.top);
      var maxScroll = heroHeight - windowHeight;
      scrollProgress = Math.min(scrolled / maxScroll, 1);
    } else if (heroRect.top > 0) {
      // Hero section hasn't been reached yet
      scrollProgress = 0;
    } else {
      // Hero section has been completely scrolled past
      scrollProgress = 1;
    }
    
    // Set video time based on hero section scroll progress
    video.currentTime = video.duration * scrollProgress;
  }

  // Scroll event listener - direct call for immediate response
  window.addEventListener('scroll', function() {
    updateVideoTime();
  });

  // Initial call
  updateVideoTime();
});


