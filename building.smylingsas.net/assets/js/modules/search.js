export function initSearch() {
  const input = document.getElementById('searchInput');
  const dialog = document.getElementById('searchDialog');
  if (!input || !dialog) return;

  input.addEventListener('input', () => {
    if (input.value.trim() !== '' && !dialog.open) {
      input.value = '';
      dialog.showModal();
    }
  });
}
