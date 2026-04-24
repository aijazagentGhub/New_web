function renderDashboard() {
    // --- STAGE 1: TAB 1 (NEWS) ONLY ---
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
        // Force clear to prevent AI tools from appearing here
        newsGrid.innerHTML = ''; 
        
        // Inject exactly 6 high-density news cards
        const latestNews = newsData.slice(0, 6);
        newsGrid.innerHTML = latestNews.map(item => `
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

    // --- STAGE 2: TAB 2 (AI TOOLS) ONLY ---
    const latestRow = document.getElementById('latestToolRow');
    const toolsContainer = document.getElementById('toolsCategorized');

    if (latestRow && toolsContainer) {
        latestRow.innerHTML = '';
        toolsContainer.innerHTML = '';

        // Render Top Hero Tool
        const latest = toolsData.find(t => t.isNew) || toolsData[0];
        latestRow.innerHTML = `
            <div class="hero-tool-card">
                <div class="hero-badge">NEWEST LAUNCH: ${latest.dateAdded}</div>
                <h3>${latest.name}</h3>
                <p>${latest.usage}</p>
            </div>
        `;

        // Render Categorized Tables
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
