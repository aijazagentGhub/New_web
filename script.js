// DATA: NEWS REPOSITORY
const newsData = [
    { title: "Anthropic 'Mythos' Bank Alert", brief: "Indian Finance Ministry issued emergency protocols for BFSI. 'Mythos' models can exploit legacy banking mainframe vulnerabilities.", url: "https://www.livemint.com/bfsi/security-2026", date: "2026-04-25" },
    { title: "Merck Signs $1B AI Deal", brief: "Merck partnered with Google to deploy Gemini Enterprise across 75,000 employees for autonomous R&D and supply chain management.", url: "https://itbrief.com.au/merck-google-deal", date: "2026-04-25" },
    { title: "XPENG 'Physical AI' Launch", brief: "GX Robotaxi and IRON humanoid debuted today at Auto China 2026, powered by Turing 3,000 TOPS chips.", url: "https://www.xpeng.com/auto-china-2026", date: "2026-04-25" },
    { title: "Nvidia Hits $5T Market Cap", brief: "Nvidia valuation holds at $5.1T as global demand for Blackwell-Ultra hardware remains the primary market driver for 2026.", url: "https://m.economictimes.com/tech/nvidia-cap", date: "2026-04-25" }
];

// DATA: TOOLS REPOSITORY (Accumulates over time)
const toolsData = [
    { name: "Mythos BFSI API", usage: "STRESS TESTING: Specialized API for banking security against agentic intrusion.", category: "Security", dateAdded: "2026-04-25", isNew: true },
    { name: "Claude 4.5 Opus", usage: "REASONING: High-tier LLM for complex regulatory auditing and document analysis.", category: "LLM / Reasoning", dateAdded: "2026-04-20", isNew: false },
    { name: "Cursor AI", usage: "ENGINEERING: AI-native IDE that maps entire codebases for architectural refactoring.", category: "Development", dateAdded: "2026-04-15", isNew: false },
    { name: "n8n (Agentic)", usage: "AUTOMATION: Self-hosted workflow tool for building on-premise AI agents.", category: "Automation", dateAdded: "2026-04-10", isNew: false }
];

function renderDashboard() {
    // 1. Render Tab 1 (News Only)
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
        newsGrid.innerHTML = newsData.map(item => `
            <div class="card">
                <div><h2 class="card-title">${item.title}</h2><p class="card-brief">${item.brief}</p></div>
                <div class="card-footer"><span class="date-badge">${item.date}</span><a href="${item.url}" target="_blank" class="btn-view">READ ↗</a></div>
            </div>
        `).join('');
    }

    // 2. Render Tab 2 (Tools Only)
    const latestRow = document.getElementById('latestToolRow');
    const toolsContainer = document.getElementById('toolsCategorized');
    if (latestRow && toolsContainer) {
        const latest = toolsData.find(t => t.isNew) || toolsData[0];
        latestRow.innerHTML = `
            <div class="tool-row latest">
                <span class="type-tag">NEWEST LAUNCH: ${latest.dateAdded}</span>
                <div class="tool-info" style="margin-top:10px;"><strong>${latest.name}</strong> — ${latest.usage}</div>
            </div>
        `;
        const categories = [...new Set(toolsData.map(t => t.category))];
        toolsContainer.innerHTML = categories.map(cat => `
            <div class="tool-section">
                <h3 class="section-title">${cat}</h3>
                <table class="tool-table">
                    ${toolsData.filter(t => t.category === cat && !t.isNew).map(t => `
                        <tr><td width="30%"><strong>${t.name}</strong></td><td>${t.usage} <br><small style="color:#94a3b8">Added: ${t.dateAdded}</small></td></tr>
                    `).join('')}
                </table>
            </div>
        `).join('');
    }
}

// NAVIGATION & RENAME
window.switchTab = (tabName, btn) => {
    document.querySelectorAll('.tab-content, .tab-link').forEach(el => el.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    btn.classList.add('active');
    document.getElementById('exportNewsBtn').style.display = tabName === 'news' ? 'block' : 'none';
    document.getElementById('exportToolsBtn').style.display = tabName === 'tools' ? 'block' : 'none';
};

window.addNewTab = () => {
    const tabName = prompt("Name for new stream:");
    if (tabName) {
        const btn = document.createElement('button');
        btn.className = 'tab-link';
        btn.innerHTML = `${tabName} <span class="rename-icon" onclick="renameTab(event, this)">✎</span>`;
        btn.onclick = () => {
            document.querySelectorAll('.tab-content, .tab-link').forEach(el => el.classList.remove('active'));
            document.getElementById('dynamicTab').classList.add('active');
            btn.classList.add('active');
        };
        document.getElementById('tabBar').insertBefore(btn, document.getElementById('addTabBtn'));
    }
};

window.renameTab = (e, icon) => {
    e.stopPropagation();
    const btn = icon.parentElement;
    const newName = prompt("Enter new name:", btn.innerText.replace('✎', '').trim());
    if (newName) btn.innerHTML = `${newName} <span class="rename-icon" onclick="renameTab(event, this)">✎</span>`;
};

// EXPORT
document.getElementById('exportNewsBtn').onclick = () => exportCSV(newsData, ["Title", "Brief", "URL", "Date"], "AI_News");
document.getElementById('exportToolsBtn').onclick = () => exportCSV(toolsData, ["Name", "Usage", "Category", "Date"], "AI_Tools");

function exportCSV(data, headers, fileName) {
    const csv = [headers, ...data.map(i => Object.values(i))].map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

renderDashboard();
