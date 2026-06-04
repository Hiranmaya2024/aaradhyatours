/* ═══════════════════════════════════════════════
   AARADHYA TOURS — Shared JavaScript (shared.js)
   ═══════════════════════════════════════════════ */

const NAV_HTML = `
<nav id="navbar">
  <a href="aaradhya-tours.html" class="logo">
    <span class="logo-main">Aaradhya Tours</span>
    <span class="logo-sub">Discover the Soul of India</span>
  </a>
  <ul class="nav-links">
    <li><a href="destinations.html">Destinations</a></li>
    <li><a href="packages.html">Packages</a></li>
    <li><a href="about.html">Why Us</a></li>
    <li><a href="reviews.html">Reviews</a></li>
    <li><a href="contact.html" class="nav-cta">Book Now</a></li>
  </ul>
  <button class="nav-hamburger" id="hamburger" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="aaradhya-tours.html" class="logo">
        <span class="logo-main">Aaradhya Tours</span>
        <span class="logo-sub">Discover the Soul of India</span>
      </a>
      <div class="footer-tagline">Crafting extraordinary journeys across India since 2012. Your trusted partner for authentic, immersive, and memorable travel experiences.</div>
      <div class="footer-socials">
        <span class="social-btn">f</span>
        <span class="social-btn">in</span>
        <span class="social-btn">ig</span>
        <span class="social-btn">yt</span>
      </div>
    </div>
    <div class="footer-col">
      <h4>Destinations</h4>
      <ul class="footer-links">
        <li><a href="rajasthan.html">Rajasthan</a></li>
        <li><a href="kerala.html">Kerala</a></li>
        <li><a href="goa.html">Goa</a></li>
        <li><a href="himachal.html">Himachal Pradesh</a></li>
        <li><a href="uttarakhand.html">Uttarakhand</a></li>
        <li><a href="andaman.html">Andaman Islands</a></li>
        <li><a href="tamilnadu.html">Tamil Nadu</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Tour Types</h4>
      <ul class="footer-links">
        <li><a href="honeymoon.html">Honeymoon Tours</a></li>
        <li><a href="family.html">Family Holidays</a></li>
        <li><a href="adventure.html">Adventure Trips</a></li>
        <li><a href="spiritual.html">Spiritual Tours</a></li>
        <li><a href="wildlife.html">Wildlife Safaris</a></li>
        <li><a href="heritage.html">Heritage Walks</a></li>
        <li><a href="group.html">Group Tours</a></li>
      </ul>
    </div>
    <div class="footer-col footer-contact">
      <h4>Contact Us</h4>
      <p>📍 12, Heritage Plaza, MG Road<br>Jaipur, Rajasthan 302001</p>
      <p>📞 <a href="tel:+919876543210">+91 98765 43210</a></p>
      <p>✉️ <a href="mailto:info@aaradhyatours.com">info@aaradhyatours.com</a></p>
      <p style="margin-top:12px; font-size:0.7rem; color:rgba(255,255,255,0.22)">Mon – Sat · 9 AM to 7 PM IST</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Aaradhya Tours Pvt. Ltd. All rights reserved.</p>
    <p>
      <a href="privacy.html">Privacy Policy</a> &nbsp;·&nbsp;
      <a href="terms.html">Terms of Service</a> &nbsp;·&nbsp;
      <a href="refund.html">Refund Policy</a>
    </p>
  </div>
</footer>`;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = NAV_HTML;

  // Inject footer
  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = FOOTER_HTML;

  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Nav scroll
  const isHeroNav = navbar.classList.contains('hero-nav');
  if (!isHeroNav) {
    // already scrolled style — nothing needed
  }
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // Highlight active link
  const currentPage = window.location.pathname.split('/').pop() || 'aaradhya-tours.html';
  navbar.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.body.classList.toggle('nav-mobile-open');
    });
  }

  // Close mobile nav on link click
  navbar.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.body.classList.remove('nav-mobile-open'));
  });

  // Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.body.classList.remove('nav-mobile-open');
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (document.body.classList.contains('nav-mobile-open') &&
        !navbar.contains(e.target)) {
      document.body.classList.remove('nav-mobile-open');
    }
  });

  // Scroll reveal
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('revealed'), i * 60);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

  // Accordion
  document.querySelectorAll('.accordion-head').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
});

// Toast helper
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position:'fixed', bottom:'28px', left:'50%', transform:'translateX(-50%)',
    background:'#2C1810', color:'#fff', padding:'14px 28px', borderRadius:'4px',
    fontSize:'0.85rem', zIndex:'99999', boxShadow:'0 8px 32px rgba(0,0,0,0.3)',
    borderLeft:'4px solid #E8651A', whiteSpace:'nowrap'
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}
