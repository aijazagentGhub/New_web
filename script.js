function renderDashboard() {
    // --- PART 1: TAB 1 (NEWS) LOGIC ---
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
        // Sort newest first and render ONLY news items here
        const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
        newsGrid.innerHTML = sortedNews.map(item => `
            <div class="card">
                <div>
                    <h2 class="card-title">${item.title}</h2>
                    <p class="card-brief">${item.brief}</p>
                </div>
                <div class="card-footer">
                    <span class="date-badge">${item.date}</span>
                    <a href="${item.url}" target="_blank" class="btn-view">READ ↗</a>
                </div>
            </div>
        `).join('');
    }

    // --- PART 2: TAB 2 (AI TOOLS) LOGIC ---
    const latestRow = document.getElementById('latestToolRow');
    const toolsContainer = document.getElementById('toolsCategorized');

    if (latestRow && toolsContainer) {
        // Find the single newest tool for the highlight banner
        const latest = toolsData.find(t => t.isNew) || toolsData[0];
        latestRow.innerHTML = `
            <div class="tool-row latest">
                <span class="type-tag">NEWEST LAUNCH: ${latest.dateAdded}</span>
                <div class="tool-info" style="margin-top:10px;">
                    <strong>${latest.name}</strong> — ${latest.usage}
                </div>
            </div>
        `;

        // Render the rest of the library categorized in the tools table
        const categories = [...new Set(toolsData.map(t => t.category))];
        toolsContainer.innerHTML = categories.map(cat => `
            <div class="tool-section">
                <h3 class="section-title">${cat}</h3>
                <table class="tool-table">
                    ${toolsData.filter(t => t.category === cat && !t.isNew).map(t => `
                        <tr>
                            <td width="30%"><strong>${t.name}</strong></td>
                            <td>${t.usage} <br><small style="color:#94a3b8">Added: ${t.dateAdded}</small></td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        `).join('');
    }
}
