const newsData = [
    { title: "Anthropic 'Mythos' Bank Alert", brief: "Indian Finance Ministry issued emergency security protocols today for nationalized banks. 'Mythos' models found capable of exploiting legacy COBOL mainframe vulnerabilities, leading to a massive push for architectural modernization across Bengaluru's BFSI sector.", url: "#", date: "2026-04-25" },
    { title: "Merck Signs $1B Gemini Deal", brief: "Merck officially partnered with Google Cloud today to deploy Gemini 2.0 Enterprise across 75,000 employees. This deal focuses on autonomous R&D agents that can predict chemical reaction outcomes with 94% accuracy, cutting drug discovery times by half.", url: "#", date: "2026-04-25" },
    { title: "XPENG 'Physical AI' Ecosystem", brief: "At Auto China 2026, XPENG unveiled the GX Robotaxi and IRON humanoid. Powered by Turing chips (3,000 TOPS), these agents utilize vision-language-action (VLA) models to navigate urban environments with zero human intervention.", url: "#", date: "2026-04-25" },
    { title: "Nvidia Blackwell-Ultra Launch", brief: "Nvidia valuation hit $5.1T today as Jensen Huang announced the Blackwell-Ultra chips. These units are specifically designed for 'Agentic Reasoning' clusters, allowing AI models to execute multi-step software engineering tasks without API latency.", url: "#", date: "2026-04-25" },
    { title: "Meta/Microsoft Workforce Pivot", brief: "In a joint statement, both giants confirmed they are cutting non-AI operational roles by 15% to reallocate $40B into fusion-energy-for-AI projects. The goal is to power massive data centers in the EU and North America by 2028.", url: "#", date: "2026-04-24" },
    { title: "OpenAI GPT-5.5 'Action Engine'", brief: "OpenAI's latest release features a native 'Action Engine' that allows the model to control mouse and keyboard functions on any enterprise OS. This enables full automation of JIRA, SAP, and Salesforce workflows for senior managers.", url: "#", date: "2026-04-24" }
];

const toolsData = [
    { name: "Mythos BFSI API", usage: "STRESS TESTING: Specialized API for banking security against agentic intrusion.", category: "Security", dateAdded: "2026-04-25", isNew: true },
    { name: "Claude 4.5 Opus", usage: "REASONING: High-tier LLM for complex regulatory auditing and deep document analysis.", category: "LLM / Reasoning", dateAdded: "2026-04-20", isNew: false },
    { name: "Cursor AI v2", usage: "ENGINEERING: AI-native IDE that can refactor entire repositories based on architectural prompts.", category: "Development", dateAdded: "2026-04-15", isNew: false },
    { name: "n8n (Agentic)", usage: "AUTOMATION: Self-hosted workflow tool for building multi-step AI agents for internal systems.", category: "Automation", dateAdded: "2026-04-10", isNew: false }
];

function renderDashboard() {
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
                            <tr><td class="t-name"><strong>${t.name}</strong></td><td class="t-use">${t.usage}</td></tr>
                        `).join('')}
                    </table>
                </div>
            </div>
        `).join('');
    }
}

window.renameTab = (e, icon) => {
    e.stopPropagation();
    const label = icon.previousElementSibling;
    const newName = prompt("Rename your tab:", label.innerText);
    if (newName) label.innerText = newName;
};

window.addNewTab = () => {
    const tabName = prompt("Enter stream name:", "New Stream");
    if (tabName) {
        const div = document.createElement('div');
        div.className = 'tab-item';
        div.onclick = () => switchTab('dynamic', div);
        div.innerHTML = `<span class="tab-label">${tabName}</span><span class="rename-trigger" onclick="renameTab(event, this.previousElementSibling)">✎</span>`;
        document.getElementById('tabBar').insertBefore(div, document.getElementById('addTabBtn'));
    }
};

window.switchTab = (tabName, element) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(el => el.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    element.classList.add('active');
    document.getElementById('exportNewsBtn').style.display = tabName === 'news' ? 'block' : 'none';
    document.getElementById('exportToolsBtn').style.display = tabName === 'tools' ? 'block' : 'none';
};

renderDashboard();
