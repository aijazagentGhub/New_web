const newsData = [
    { title: "Anthropic 'Mythos' Bank Alert", brief: "Indian Finance Ministry issued emergency security protocols for BFSI. 'Mythos' models found capable of exploiting legacy banking mainframes.", url: "#", date: "2026-04-25" },
    { title: "Merck Signs $1B Gemini Deal", brief: "Merck officially deployed 75,000 Gemini agents today for autonomous R&D and predictive chemical manufacturing across global sites.", url: "#", date: "2026-04-25" },
    { title: "XPENG 'Physical AI' Launch", brief: "GX Robotaxi and IRON humanoid debuted today at Auto China 2026, featuring vision-language-action (VLA) navigation models.", url: "#", date: "2026-04-25" },
    { title: "Nvidia Hits $5.1T Cap", brief: "Nvidia valuation remains at record highs as global demand for Blackwell-Ultra 'Agentic Reasoning' hardware continues to surge.", url: "#", date: "2026-04-25" },
    { title: "OpenAI 'Action Engine'", brief: "The new GPT-5.5 features a native 'Action Engine' that allows the model to control enterprise OS interfaces for senior manager tasks.", url: "#", date: "2026-04-24" },
    { title: "DeepSeek V4-Pro Launch", brief: "Released yesterday, V4-Pro matches GPT-5.4 benchmarks while significantly lowering the barrier for local reasoning on Mac/Docker setups.", url: "#", date: "2026-04-24" }
];

const toolsData = [
    { name: "Mythos BFSI API", usage: "STRESS TESTING: Specialized API for banking security against agentic intrusion.", category: "Security", isNew: true },
    { name: "Claude 4.5 Opus", usage: "REASONING: High-tier LLM for complex regulatory auditing and deep document analysis.", category: "LLM", isNew: false },
    { name: "Cursor AI", usage: "ENGINEERING: AI-native IDE that maps entire codebases for architectural refactoring.", category: "Development", isNew: false },
    { name: "n8n (Agentic)", usage: "AUTOMATION: Self-hosted tool for building multi-step AI agents for internal bank systems.", category: "Automation", isNew: false }
];

function init() {
    renderNews();
    renderTools();
}

function renderNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    grid.innerHTML = newsData.map(n => `
        <div class="dopamine-card">
            <span class="card-tag">NEWS</span>
            <h2 class="card-title">${n.title}</h2>
            <p class="card-description">${n.brief}</p>
            <div class="card-footer"><span>${n.date}</span><a href="${n.url}" class="action-btn">READ ↗</a></div>
        </div>
    `).join('');
}

function renderTools() {
    const hero = document.getElementById('latestToolRow');
    const list = document.getElementById('toolsCategorized');
    if (!hero || !list) return;

    const newest = toolsData.find(t => t.isNew);
    hero.innerHTML = `<div class="hero-tool-card"><h3>${newest.name}</h3><p>${newest.usage}</p></div>`;

    const cats = [...new Set(toolsData.map(t => t.category))];
    list.innerHTML = cats.map(cat => `
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

window.switchTab = (name, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    document.getElementById(name + 'Tab').classList.add('active');
    el.classList.add('active');
};

window.renameTab = (e, icon) => {
    e.stopPropagation();
    const label = icon.previousElementSibling;
    const newName = prompt("Rename Tab:", label.innerText);
    if (newName) label.innerText = newName;
};

window.addNewTab = () => {
    const name = prompt("Tab Name:");
    if (!name) return;
    const btn = document.createElement('div');
    btn.className = 'tab-item';
    btn.innerHTML = `<span class="tab-label">${name}</span><span class="rename-trigger" onclick="renameTab(event, this)">✎</span>`;
    btn.onclick = () => switchTab('dynamic', btn);
    document.getElementById('tabBar').insertBefore(btn, document.getElementById('addTabBtn'));
};

init();
