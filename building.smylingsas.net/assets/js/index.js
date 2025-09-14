  document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img.lazy-image");
    images.forEach(img => {
      if (img.complete) {
        img.style.filter = "none";
      } else {
        img.addEventListener("load", () => {
          img.style.filter = "none";
        });
      }
    });
  });


// Open modals
document.querySelectorAll('[data-modal-target]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);
    if (modal?.showModal) {
      modal.showModal();
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

// Open search modal
const input = document.getElementById('searchInput');
  const dialog = document.getElementById('searchDialog');

  input.addEventListener('input', () => {
    if (input.value.trim() !== '' && !dialog.open) {
      input.value = '';
      dialog.showModal(); // Opens the dialog
    }
  });
