function renderDashboard() {
    // --- TARGET TAB 1 (NEWS) ---
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
        // Force clear any leaked tools data
        newsGrid.innerHTML = ''; 
        
        // Render exactly 6 News Cards
        const displayNews = newsData.slice(0, 6);
        newsGrid.innerHTML = displayNews.map(item => `
            <div class="dopamine-card">
                <div class="card-content">
                    <span class="card-tag">LATEST NEWS</span>
                    <h2 class="card-title">${item.title}</h2>
                    <p class="card-description">${item.brief}</p>
                </div>
                <div class="card-footer">
                    <span class="date">${item.date}</span>
                    <a href="${item.url}" class="action-btn">ANALYZE ↗</a>
                </div>
            </div>
        `).join('');
    }

    // --- TARGET TAB 2 (AI TOOLS) ---
    const latestRow = document.getElementById('latestToolRow');
    const toolsContainer = document.getElementById('toolsCategorized');

    if (latestRow && toolsContainer) {
        // Clear containers before rendering
        latestRow.innerHTML = '';
        toolsContainer.innerHTML = '';

        // Render Hero Tool
        const latest = toolsData.find(t => t.isNew) || toolsData[0];
        latestRow.innerHTML = `
            <div class="hero-tool-card">
                <div class="hero-badge">NEWEST LAUNCH: ${latest.dateAdded}</div>
                <h3>${latest.name}</h3>
                <p>${latest.usage}</p>
            </div>
        `;

        // Render Categorized Directory
        const categories = [...new Set(toolsData.map(t => t.category))];
        toolsContainer.innerHTML = categories.map(cat => `
            <div class="tool-section">
                <h3 class="section-title">${cat}</h3>
                <div class="tool-table-wrapper">
                    <table class="tool-table">
                        ${toolsData.filter(t => t.category === cat && !t.isNew).map(t => `
                            <tr>
                                <td class="t-name"><strong>${t.name}</strong></td>
                                <td class="t-use">${t.usage}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
        `).join('');
    }
}
