function renderRows(tab) {
    const grid = document.getElementById('newsGrid');
    grid.innerHTML = ''; // Clear current grid

    tab.rows.forEach((row) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <div>
                <div class="card-title">${row.title}</div>
                <div class="card-brief">${row.brief}</div>
            </div>
            <div class="card-footer">
                <span class="card-date">${row.date}</span>
                <a href="${row.url}" target="_blank" class="btn-open">VIEW SOURCE ↗</a>
            </div>
        `;
        grid.appendChild(card);
    });
}
