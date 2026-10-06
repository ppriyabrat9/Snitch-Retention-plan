// SNITCH retention plan · reveal on scroll, nav state, theme toggle, scenario toggle.
(function () {
  // Theme (dark by default, remembered per browser)
  const root = document.documentElement;
  const tbtn = document.getElementById('theme');
  const meta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    tbtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0b0b0b' : '#f5f4f1');
  }
  applyTheme(root.getAttribute('data-theme') || 'dark');
  tbtn.addEventListener('click', () => {
    const t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  });

  // Reveal
  const els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    els.forEach((el) => io.observe(el));
  } else { els.forEach((el) => el.classList.add('in')); }

  // Active nav link
  const links = [...document.querySelectorAll('.links a')];
  const secs = links.map((a) => document.querySelector(a.getAttribute('href')));
  function onScroll() {
    let cur = -1;
    secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 110) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scenario toggle (₹ Cr per year)
  const totals = [20.0, 37.8, 59.4];
  const margin = [7.4, 12.6, 17.4];
  const btns = document.querySelectorAll('.seg button');
  const vals = document.querySelectorAll('.ln b[data-v]');
  function setScen(i) {
    btns.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.s === i ? 'true' : 'false'));
    vals.forEach((v) => { v.textContent = '₹' + v.dataset.v.split(',')[i] + ' Cr'; });
    document.getElementById('total').innerHTML = '₹' + totals[i].toFixed(1) + ' Cr <small>a year</small>';
    document.getElementById('cmp').textContent = '₹' + margin[i].toFixed(1) + ' Cr of this is pure margin saved. For scale, FY26 EBITDA was ₹18 to 27 Cr.';
  }
  btns.forEach((b) => b.addEventListener('click', () => setScen(+b.dataset.s)));
})();
