const STORAGE_KEY = 'site-theme-preference'; // 'light' | 'dark' | 'auto'

function getStoredPreference() {
  return localStorage.getItem(STORAGE_KEY); // may be null => auto
}

function getSystemPrefersDark() {
    try {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
        return false;
    }
}

function applyEffectiveTheme(pref) {
  // pref: 'light'|'dark'|'auto'
  let effective = pref;
  if (pref === 'auto') {
    effective = getSystemPrefersDark() ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', effective);
}

export function setThemePref(pref) {
  if (!['light', 'dark', 'auto'].includes(pref)) return;
  if (pref === 'auto') {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, pref);
  }
  applyEffectiveTheme(pref);
}

export function wireThemeButtons() {
  // Wire buttons generated from menu which may have data-modal-target OR aria-label
  function findButton(name) {
    return document.querySelector(`[data-modal-target="${name}"]`) || document.querySelector(`[aria-label="${name}"]`);
  }

  const btnLight = findButton('lightmode');
  const btnDark = findButton('darkmode');
  const btnAuto = findButton('automode') || findButton('Automatisk') || findButton('auto');

  function wire(btn, pref) {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      // prevent header modal logic from running if any
      e.preventDefault();
      e.stopPropagation();
      setThemePref(pref);
    });
  }

  wire(btnLight, 'light');
  wire(btnDark, 'dark');
  wire(btnAuto, 'auto');
}

// New: wire a single tri-state toggle button
export function wireThemeToggle() {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;

  function getPref() {
    return getStoredPreference() || 'auto';
  }

  function updateButtonUI(pref) {
    // pref is 'light'|'dark'|'auto'
    btn.dataset.themePref = pref;
    btn.setAttribute('aria-label', `Tema: ${pref}`);
    const autoIcon = btn.querySelector('.theme-icon-auto');
    const lightIcon = btn.querySelector('.theme-icon-light');
    const darkIcon = btn.querySelector('.theme-icon-dark');
    if (autoIcon) autoIcon.classList.toggle('active', pref === 'auto');
    if (lightIcon) lightIcon.classList.toggle('active', pref === 'light');
    if (darkIcon) darkIcon.classList.toggle('active', pref === 'dark');
  }

  // initialize UI
  updateButtonUI(getPref());

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const current = getPref();
    const order = ['auto', 'light', 'dark'];
    const next = order[(order.indexOf(current) + 1) % order.length];
    setThemePref(next);
    updateButtonUI(next);
  });

  // Also update the button UI when the effective theme changes due to system pref
  try {
    if (window.matchMedia && typeof window.matchMedia === 'function') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => {
        // only update UI if user hasn't chosen explicit pref
        if (!getStoredPreference()) {
          updateButtonUI('auto');
        }
      };
      if (typeof mq.addEventListener === 'function') mq.addEventListener('change', handler);
      else if (typeof mq.addListener === 'function') mq.addListener(handler);
    }
  } catch (e) { /* ignore */ }
}

export function initTheme() {
  const stored = getStoredPreference();
  const pref = stored || 'auto';
  applyEffectiveTheme(pref);

  // listen to system changes if user did not pick explicit pref
  try {
    if (window.matchMedia && typeof window.matchMedia === 'function') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => {
        if (!getStoredPreference()) {
          applyEffectiveTheme('auto');
        }
      };
      if (typeof mq.addEventListener === 'function') mq.addEventListener('change', handler);
      else if (typeof mq.addListener === 'function') mq.addListener(handler);
    }
  } catch (e) { /* ignore */ }
}