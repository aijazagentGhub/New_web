// 1. DATA REPOSITORIES - Separated at the source
const newsData = [
    { title: "Anthropic 'Mythos' Bank Alert", brief: "Indian Finance Ministry issued emergency security protocols for BFSI. 'Mythos' models found capable of exploiting legacy banking mainframes through advanced prompt-injection sequences that bypass traditional firewall logic.", url: "#", date: "2026-04-25" },
    { title: "Merck Signs $1B Gemini Deal", brief: "Merck officially deployed 75,000 Gemini agents today for autonomous R&D. This integration allows for real-time predictive chemical manufacturing and global supply chain orchestration across 140 manufacturing sites.", url: "#", date: "2026-04-25" },
    { title: "XPENG 'Physical AI' Launch", brief: "GX Robotaxi and IRON humanoid debuted today at Auto China 2026. These agents utilize vision-language-action (VLA) navigation models powered by Turing 3,000 TOPS chips for true autonomous urban mobility.", url: "#", date: "2026-04-25" },
    { title: "Nvidia Hits $5.1T Market Cap", brief: "Nvidia valuation remains at record highs as global demand for Blackwell-Ultra 'Agentic Reasoning' hardware continues to surge. Institutional investors are pivoting toward long-term AI infrastructure plays.", url: "#", date: "2026-04-25" },
    { title: "OpenAI 'Action Engine' GPT-5.5", brief: "The new GPT-5.5 features a native 'Action Engine' that allows the model to control enterprise OS interfaces. This enables full automation of complex JIRA, SAP, and Salesforce workflows for senior managers.", url: "#", date: "2026-04-24" },
    { title: "DeepSeek V4-Pro Launch", brief: "Released yesterday, V4-Pro matches GPT-5.4 benchmarks while significantly lowering the barrier for local reasoning. This makes on-premise AI hosting more viable for security-conscious banking sectors.", url: "#", date: "2026-04-24" }
];

const toolsData = [
    { name: "Mythos BFSI API", usage: "STRESS TESTING: Specialized API for banking security against agentic intrusion.", category: "Security", isNew: true },
    { name: "Claude 4.5 Opus", usage: "REASONING: High-tier LLM for complex regulatory auditing and deep document analysis.", category: "LLM", isNew: false },
    { name: "Cursor AI", usage: "ENGINEERING: AI-native IDE that maps entire codebases for architectural refactoring.", category: "Development", isNew: false },
    { name: "n8n (Agentic)", usage: "AUTOMATION: Self-hosted tool for building multi-step AI agents for internal systems.", category: "Automation", isNew: false }
];

// 2. RENDERING ENGINE - Hard Separation
function renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    // Clear and Inject only News
    newsGrid.innerHTML = newsData.map(n => `
        <div class="dopamine-card">
            <div class="card-tag">● AI BREAKTHROUGH</div>
            <h2 class="card-title">${n.title}</h2>
            <p class="card-description">${n.brief}</p>
            <div class="card-footer">
                <span class="date-label">${n.date}</span>
                <a href="${n.url}" class="action-btn">FULL ANALYSIS ↗</a>
            </div>
        </div>
    `).join('');
}

function renderTools() {
    const hero = document.getElementById('latestToolRow');
    const toolsGrid = document.getElementById('toolsCategorized');
    if (!hero || !toolsGrid) return;

    // Render Hero Banner
    const newest = toolsData.find(t => t.isNew) || toolsData[0];
    hero.innerHTML = `
        <div class="hero-tool-card">
            <div class="hero-badge">NEWEST ADDITION</div>
            <h3>${newest.name}</h3>
            <p>${newest.usage}</p>
        </div>
    `;

    // Render Categorized Tables
    const categories = [...new Set(toolsData.map(t => t.category))];
    toolsGrid.innerHTML = categories.map(cat => `
        <div class="tool-section">
            <h3 class="section-title" style="color: var(--accent); margin-top:20px;">${cat}</h3>
            <div class="tool-table-wrapper">
                <table class="tool-table">
                    ${toolsData.filter(t => t.category === cat && !t.isNew).map(t => `
                        <tr>
                            <td width="30%"><strong>${t.name}</strong></td>
                            <td>${t.usage}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        </div>
    `).join('');
}

// 3. UTILITIES
window.switchTab = (tabName, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    el.classList.add('active');
};

window.renameTab = (e, icon) => {
    e.stopPropagation();
    const label = icon.previousElementSibling;
    const newName = prompt("Rename your tab:", label.innerText);
    if (newName) label.innerText = newName;
};

window.addNewTab = () => {
    const name = prompt("Name for new stream:");
    if (!name) return;
    const btn = document.createElement('div');
    btn.className = 'tab-item';
    btn.innerHTML = `<span class="tab-label">${name}</span><span class="rename-trigger" onclick="renameTab(event, this)">✎</span>`;
    btn.onclick = () => switchTab('dynamic', btn);
    document.getElementById('tabBar').insertBefore(btn, document.getElementById('addTabBtn'));
};

// 4. INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    renderNews();
    renderTools();
});
