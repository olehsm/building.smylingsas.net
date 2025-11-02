const openListeners = [];

export function initModals() {
  // Open modals
  document.querySelectorAll('[data-modal-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(modalId);
      if (modal?.showModal) {
        modal.showModal();
        openListeners.forEach((fn) => {
          try { fn(modalId, modal); } catch (e) { console.warn('modal open listener error', e); }
        });
      }
    });
  });

  // Close buttons (inside modals)
  document.querySelectorAll('dialog .close-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('dialog');
      modal?.close();
    });
  });

  // Optional: click outside modal to close
  document.querySelectorAll('dialog').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!isInside) {
        modal.close();
      }
    });
  });
}

export function addModalOpenListener(fn) {
  if (typeof fn === 'function') openListeners.push(fn);
}
