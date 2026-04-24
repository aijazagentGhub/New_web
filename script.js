// DATA REPOSITORIES (Latest items first)
const newsData = [
    { title: "Anthropic 'Mythos' Bank Alert", brief: "Indian Finance Ministry issued emergency security protocols for BFSI. 'Mythos' models can exploit legacy mainframe vulnerabilities.", url: "#", date: "2026-04-25" },
    { title: "Merck Signs $1B Gemini Deal", brief: "Merck deployed 75,000 Gemini agents for autonomous R&D and supply chain management today.", url: "#", date: "2026-04-25" },
    { title: "XPENG 'Physical AI' Launch", brief: "GX Robotaxi and IRON humanoid debuted in Beijing today, powered by Turing 3,000 TOPS chips.", url: "#", date: "2026-04-25" },
    { title: "Nvidia Blackwell-Ultra Launch", brief: "Nvidia hits $5.1T as global demand for Blackwell-Ultra hardware remains the primary market driver.", url: "#", date: "2026-04-25" },
    { title: "Meta Workforce Pivot", brief: "Meta confirms cutting non-AI roles to reallocate $40B into fusion-energy-for-AI projects.", url: "#", date: "2026-04-24" },
    { title: "GPT-5.5 Action Engine", brief: "OpenAI released GPT-5.5 with a native 'Action Engine' for autonomous enterprise software control.", url: "#", date: "2026-04-24" }
];

const toolsData = [
    { name: "Mythos BFSI API", usage: "STRESS TESTING: Specialized API for banking security against agentic intrusion.", category: "Security", dateAdded: "2026-04-25", isNew: true },
    { name: "Claude 4.5 Opus", usage: "REASONING: High-tier LLM for complex regulatory auditing and doc analysis.", category: "LLM", dateAdded: "2026-04-20", isNew: false },
    { name: "Cursor AI", usage: "ENGINEERING: AI-native IDE that maps entire repos for senior engineers.", category: "Development", dateAdded: "2026-04-15", isNew: false },
    { name: "n8n (Agentic)", usage: "AUTOMATION: Self-hosted workflow tool for building AI agents.", category: "Automation", dateAdded: "2026-04-10", isNew: false }
];

function renderDashboard() {
    // 1. SELECT CONTAINERS
    const newsGrid = document.getElementById('newsGrid');
    const latestTool = document.getElementById('latestToolRow');
    const toolsGrid = document.getElementById('toolsCategorized');

    // 2. RENDER NEWS (ONLY IN NEWS GRID)
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

    // 3. RENDER TOOLS (ONLY IN TOOLS TAB)
    if (latestTool && toolsGrid) {
        const newest = toolsData.find(t => t.isNew) || toolsData[0];
        latestTool.innerHTML = `<div class="hero-tool-card"><h3>${newest.name}</h3><p>${newest.usage}</p></div>`;
        
        const cats = [...new Set(toolsData.map(t => t.category))];
        toolsGrid.innerHTML = cats.map(cat => `
            <div class="tool-section">
                <h3 class="section-title">${cat}</h3>
                <div class="tool-table-wrapper">
                    <table class="tool-table">
                        ${toolsData.filter(t => t.category === cat && !t.isNew).map(t => `
                            <tr><td><strong>${t.name}</strong></td><td>${t.usage}</td></tr>
                        `).join('')}
                    </table>
                </div>
            </div>
        `).join('');
    }
}

// TAB UTILITIES
window.switchTab = (tabName, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    el.classList.add('active');
};

window.renameTab = (e, icon) => {
    e.stopPropagation();
    const label = icon.previousElementSibling;
    const newName = prompt("Rename Tab:", label.innerText);
    if (newName) label.innerText = newName;
};

window.addNewTab = () => {
    const name = prompt("New Stream Name:");
    if (name) {
        const btn = document.createElement('div');
        btn.className = 'tab-item';
        btn.innerHTML = `<span class="tab-label">${name}</span><span class="rename-trigger" onclick="renameTab(event, this)">✎</span>`;
        btn.onclick = () => switchTab('dynamic', btn);
        document.getElementById('tabBar').insertBefore(btn, document.getElementById('addTabBtn'));
    }
};

renderDashboard();
