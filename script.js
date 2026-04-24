const newsData = [
    { title: "Anthropic 'Mythos' Alert", brief: "Indian Finance Ministry issued emergency security protocols for BFSI. 'Mythos' models found capable of exploiting legacy banking mainframes.", url: "#", date: "2026-04-25" },
    { title: "Merck Gemini Deployment", brief: "Merck officially deployed 75,000 Gemini agents today for autonomous R&D and predictive chemical manufacturing across global sites.", url: "#", date: "2026-04-25" },
    { title: "XPENG 'Physical AI' Launch", brief: "GX Robotaxi and IRON humanoid debuted today at Auto China 2026, featuring vision-language-action (VLA) navigation models.", url: "#", date: "2026-04-25" },
    { title: "Nvidia Hits $5.1T Cap", brief: "Nvidia valuation remains at record highs as global demand for Blackwell-Ultra 'Agentic Reasoning' hardware continues to surge.", url: "#", date: "2026-04-25" },
    { title: "OpenAI 'Action Engine'", brief: "The new GPT-5.5 features a native 'Action Engine' that allows the model to control enterprise OS interfaces for senior manager tasks.", url: "#", date: "2026-04-24" },
    { title: "DeepSeek V4-Pro Launch", brief: "Released yesterday, V4-Pro matches GPT-5.4 benchmarks while significantly lowering the barrier for local reasoning on Mac/Docker setups.", url: "#", date: "2026-04-24" }
];

const toolsData = [
    { name: "Mythos BFSI API", usage: "STRESS TESTING: Specialized API for banking security against agentic intrusion.", category: "Security", dateAdded: "2026-04-25", isNew: true },
    { name: "Claude 4.5 Opus", usage: "REASONING: High-tier LLM for complex regulatory auditing and deep document analysis.", category: "LLM", dateAdded: "2026-04-20", isNew: false },
    { name: "Cursor AI", usage: "ENGINEERING: AI-native IDE that maps entire codebases for architectural refactoring.", category: "Development", dateAdded: "2026-04-15", isNew: false },
    { name: "n8n (Agentic)", usage: "AUTOMATION: Self-hosted tool for building multi-step AI agents for internal bank systems.", category: "Automation", dateAdded: "2026-04-10", isNew: false }
];

function renderDashboard() {
    // --- RENDER NEWS (ONLY IN NEWS GRID) ---
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
        newsGrid.innerHTML = newsData.map(item => `
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

    // --- RENDER TOOLS (ONLY IN TOOLS TAB) ---
    const latestRow = document.getElementById('latestToolRow');
    const toolsContainer = document.getElementById('toolsCategorized');
    if (latestRow && toolsContainer) {
        const latest = toolsData.find(t => t.isNew) || toolsData[0];
        latestRow.innerHTML = `
            <div class="hero-tool-card">
                <div class="hero-badge">NEWEST LAUNCH: ${latest.dateAdded}</div>
                <h3>${latest.name}</h3>
                <p>${latest.usage}</p>
            </div>
        `;
        const categories = [...new Set(toolsData.map(t => t.category))];
        toolsContainer.innerHTML = categories.map(cat => `
            <div class="tool-section">
                <h3 class="section-title">${cat}</h3>
                <div class="tool-table-wrapper">
                    <table class="tool-table">
                        ${toolsData.filter(t => t.category === cat && !t.isNew).map(t => `
                            <tr><td width="30%"><strong>${t.name}</strong></td><td>${t.usage}</td></tr>
                        `).join('')}
                    </table>
                </div>
            </div>
        `).join('');
    }
}

// Fixed Rename Utility
window.renameTab = (e, icon) => {
    e.stopPropagation();
    const label = icon.previousElementSibling;
    const newName = prompt("Enter new tab name:", label.innerText);
    if (newName) label.innerText = newName;
};

// Fixed Tab Switch Utility
window.switchTab = (tabName, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    el.classList.add('active');
};

// Fixed Add Stream Utility
window.addNewTab = () => {
    const name = prompt("Name for new stream:");
    if (name) {
        const btn = document.createElement('div');
        btn.className = 'tab-item';
        btn.innerHTML = `<span class="tab-label">${name}</span><span class="rename-trigger" onclick="renameTab(event, this)">✎</span>`;
        btn.onclick = () => switchTab('dynamic', btn);
        document.getElementById('tabBar').insertBefore(btn, document.getElementById('addTabBtn'));
    }
};

renderDashboard();
