(function () {
  'use strict';

  // ---- Scroll Reveal with Intersection Observer ----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // ---- Background Music Player ----
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  let isPlaying = false;

  function updateIcon() {
    musicIcon.innerHTML = isPlaying ? '&#10074;&#10074;' : '&#9835;';
  }

  musicToggle.addEventListener('click', () => {
    if (!bgMusic) return;
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
    } else {
      bgMusic.play().catch(() => {});
      isPlaying = true;
    }
    updateIcon();
  });

  bgMusic.addEventListener('play', () => {
    isPlaying = true;
    updateIcon();
  });

  bgMusic.addEventListener('pause', () => {
    isPlaying = false;
    updateIcon();
  });

  bgMusic.addEventListener('ended', () => {
    isPlaying = false;
    updateIcon();
  });

  updateIcon();

  // ---- Floating Hearts ----
  const heartsContainer = document.getElementById('floating-hearts-container');
  const HEARTS_MAX = 30;
  const HEART_SPAWN_INTERVAL = 700;
  const HEART_COLORS = ['#F4C2C2', '#FAE3E3', '#D4A0A0', '#FDF6E9', '#8B4A4A'];
  const HEART_SIZES = [12, 16, 20, 24, 28];
  const HEART_DURATIONS = [7000, 9000, 11000, 13000];
  let activeHearts = 0;
  let spawnTimer = null;

  function createHeart() {
    if (activeHearts >= HEARTS_MAX) return;

    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.innerHTML = '&hearts;';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = HEART_SIZES[Math.floor(Math.random() * HEART_SIZES.length)] + 'px';
    heart.style.color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
    heart.style.animationDuration = HEART_DURATIONS[Math.floor(Math.random() * HEART_DURATIONS.length)] + 'ms';
    heart.style.animationDelay = (Math.random() * 0.5) + 's';
    heart.style.opacity = '0';

    heartsContainer.appendChild(heart);
    activeHearts++;

    heart.addEventListener('animationend', () => {
      heart.remove();
      activeHearts = Math.max(0, activeHearts - 1);
    });
  }

  function startSpawning() {
    spawnTimer = setInterval(() => {
      if (activeHearts < HEARTS_MAX) {
        createHeart();
      }
    }, HEART_SPAWN_INTERVAL);
  }

  function stopSpawning() {
    if (spawnTimer) {
      clearInterval(spawnTimer);
      spawnTimer = null;
    }
  }

  startSpawning();

  // Pause hearts when page is hidden for performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSpawning();
    } else {
      startSpawning();
    }
  });

  // ---- Back to Top Button ----
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();