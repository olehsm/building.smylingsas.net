export function initLayoutToggle() {
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');
    const listGrid = document.querySelector('.list-grid');

    if (!gridBtn || !listBtn || !listGrid) return;

    function setView(view) {
        if (view === 'grid') {
            listGrid.classList.remove('list-view');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            localStorage.setItem('listView', 'grid');
        } else {
            listGrid.classList.add('list-view');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            localStorage.setItem('listView', 'list');
        }
    }

    gridBtn.addEventListener('click', () => setView('grid'));
    listBtn.addEventListener('click', () => setView('list'));

    // Load saved preference
    const savedView = localStorage.getItem('listView') || 'grid';
    setView(savedView);
}