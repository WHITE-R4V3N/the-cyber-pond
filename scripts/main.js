// --- Collect tags from cards and render tag chips ---
const grid = document.getElementById('grid');
const cards = Array.from(grid.querySelectorAll('.card'));
const tagRow = document.getElementById('tagRow');

const tagSet = new Set();
cards.forEach(card => card.dataset.tags.split(',').map(t => t.trim()).forEach(t => t && tagSet.add(t)));

const activeTags = new Set();

function makeChip(label) {
    const b = document.createElement('button');
    b.className = 'chip';
    b.type = 'button';
    b.textContent = label;
    b.dataset.tag = label;
    b.addEventListener('click', () => {
    const isActive = b.dataset.active === 'true';
    b.dataset.active = String(!isActive);
    if (isActive) activeTags.delete(label); else activeTags.add(label);
    applyFilters();
    });
    return b;
}

const allBtn = document.createElement('button');
allBtn.className = 'chip';
allBtn.textContent = 'All';
allBtn.title = 'Clear all tag filters';
allBtn.addEventListener('click', () => {
    activeTags.clear();
    tagRow.querySelectorAll('.chip').forEach(c => c.dataset.active = 'false');
    applyFilters();
});
tagRow.appendChild(allBtn);

Array.from(tagSet).sort().forEach(tag => tagRow.appendChild(makeChip(tag)));

// --- Search & Sort ---
const search = document.getElementById('search');
const empty = document.getElementById('empty');
const sortSelect = document.getElementById('sortSelect');

search.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', () => { sortCards(); applyFilters(); });

function sortCards() {
    const mode = sortSelect.value;
    const sorted = [...cards].sort((a, b) => {
    if (mode === 'az' || mode === 'za') {
        const ta = a.dataset.title.toLowerCase();
        const tb = b.dataset.title.toLowerCase();
        const dir = mode === 'az' ? 1 : -1;
        return ta.localeCompare(tb) * dir;
    }
    // date in YYYY-MM-DD
    const da = new Date(a.dataset.date || '1970-01-01');
    const db = new Date(b.dataset.date || '1970-01-01');
    return mode === 'new' ? db - da : da - db;
    });
    sorted.forEach(card => grid.appendChild(card));
}

function applyFilters() {
    const q = search.value.trim().toLowerCase();
    let visibleCount = 0;
    cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const desc = card.querySelector('.desc')?.textContent.toLowerCase() || '';
    const tags = card.dataset.tags.split(',').map(t => t.trim().toLowerCase());

    const matchesSearch = !q || title.includes(q) || desc.includes(q);
    const matchesTags = activeTags.size === 0 || Array.from(activeTags).every(t => tags.includes(t.toLowerCase()));

    const show = matchesSearch && matchesTags;
    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
    });
    empty.style.display = visibleCount ? 'none' : 'block';
}

// Initial run
sortCards();
applyFilters();