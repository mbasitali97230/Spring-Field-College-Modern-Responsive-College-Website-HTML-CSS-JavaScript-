 (function() {
      // sticky navbar
      window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
      });

      // SPA page switching
      const navLinks = document.querySelectorAll('.nav-link');
      const pages = document.querySelectorAll('.page');

      function setActivePage(pageId) {
        pages.forEach(p => p.classList.remove('active-page'));
        document.getElementById(pageId).classList.add('active-page');
        navLinks.forEach(link => {
          link.classList.remove('active-link');
          if (link.dataset.page === pageId) link.classList.add('active-link');
        });
        // re-run observer after page change
        setTimeout(observeFadeUp, 100);
      }

      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const pageId = link.dataset.page;
          if (pageId) setActivePage(pageId);
          // close mobile menu after click
          navMenu.classList.remove('active');
          mobileToggle.querySelector('i').classList.remove('fa-times');
          mobileToggle.querySelector('i').classList.add('fa-bars');
        });
      });

      // mobile menu
      const mobileToggle = document.getElementById('mobileToggle');
      const navMenu = document.getElementById('navMenu');

      if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          navMenu.classList.toggle('active');
          const icon = mobileToggle.querySelector('i');
          if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
          } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        });
      }

      // close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (navMenu && mobileToggle) {
          if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      });

      // animate counters
      function animateCounters() {
        const counters = document.querySelectorAll('.stat-item');
        counters.forEach(counter => {
          const text = counter.innerText;
          const match = text.match(/(\d+)/);
          if (!match) return;
          const targetNumber = parseInt(match[0]);
          let current = 0;
          const step = Math.ceil(targetNumber / 50);
          const originalHTML = counter.innerHTML;
          const update = () => {
            if (current < targetNumber) {
              current += step;
              if (current > targetNumber) current = targetNumber;
              counter.innerHTML = originalHTML.replace(/\d+/, current);
              requestAnimationFrame(update);
            } else {
              counter.innerHTML = originalHTML;
            }
          };
          update();
        });
      }

      // Parallax scroll effect
      window.addEventListener('scroll', function() {
        const hero = document.getElementById('heroSection');
        if (hero) {
          hero.style.backgroundPositionY = window.pageYOffset * 0.5 + 'px';
        }
      });

      // dark mode toggle
      const darkToggle = document.getElementById('darkToggle');
      if (darkToggle) {
        darkToggle.addEventListener('click', () => {
          document.body.classList.toggle('dark');
        });
      }

      // progress bar
      window.addEventListener('scroll', function() {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scrollProgress').style.width = scrolled + '%';
      });

      // Intersection Observer for fade-up
      function observeFadeUp() {
        const elements = document.querySelectorAll('.fade-up');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('appeared');
            }
          });
        }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
        elements.forEach(el => observer.observe(el));
      }

      // initial calls
      setTimeout(animateCounters, 500);
      observeFadeUp();
    })();