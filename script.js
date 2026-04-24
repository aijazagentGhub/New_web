// TOP 6 NEWS DATA (April 25, 2026)
const newsData = [
    { title: "Anthropic 'Mythos' Bank Alert", brief: "Indian Finance Ministry issued emergency security protocols today for banks. 'Mythos' models found capable of exploiting legacy mainframe vulnerabilities common in nationalized banks.", url: "https://www.livemint.com/bfsi/security-2026", date: "2026-04-25" },
    { title: "Merck Signs $1B AI Deal", brief: "Merck officially partnered with Google Cloud today to deploy Gemini Enterprise across R&D and manufacturing. The deal focuses on autonomous R&D agents.", url: "https://itbrief.com.au/merck-google-deal", date: "2026-04-25" },
    { title: "XPENG 'Physical AI' Launch", brief: "XPENG unveiled the GX Robotaxi and IRON humanoid robot today in Beijing. Powered by Turing chips (3,000 TOPS) for end-to-end autonomous mobility.", url: "https://www.xpeng.com/auto-china-2026", date: "2026-04-25" },
    { title: "Nvidia Hits $5T Market Cap", brief: "Nvidia valuation holds at $5.1T as global cloud providers rush to secure the Blackwell-Ultra hardware needed for next-gen agentic workflows.", url: "https://m.economictimes.com/tech/nvidia-cap", date: "2026-04-25" },
    { title: "Meta & Microsoft Workforce Pivot", brief: "Both giants confirmed massive capital reallocation today, cutting operational roles to fund 'Energy-for-AI' infrastructure projects.", url: "https://www.bloomberg.com/tech/pivots", date: "2026-04-25" },
    { title: "OpenAI GPT-5.5 'Agentic' Layer", brief: "OpenAI's latest release features a native 'Action Engine' that allows models to execute software tasks across enterprise tools autonomously.", url: "https://openai.com/gpt-5-5-launch", date: "2026-04-24" }
];

// COMPREHENSIVE AI TOOLS DIRECTORY
const toolsData = [
    { name: "Mythos BFSI API", usage: "Newest Launch: Specialized API for stress-testing banking mainframe security against agentic intrusion.", category: "Security / BFSI", status: "New Launch" },
    { name: "Claude 4.5 Opus", usage: "High-reasoning LLM for long-document analysis and regulatory compliance auditing.", category: "LLM / Reasoning", status: "Active" },
    { name: "Cursor AI", usage: "AI-native code editor for senior engineers. Maps entire repos for architectural refactoring.", category: "Engineering", status: "Active" },
    { name: "n8n (Agentic)", usage: "Self-hosted workflow automation to build multi-agent AI systems for JIRA and Slack.", category: "Automation", status: "Active" },
    { name: "Perplexity Deep Research", usage: "Generates cited 20-page market intelligence reports on any stock or technology trend.", category: "Intelligence", status: "Active" },
    { name: "v0 by Vercel", usage: "Generates high-fidelity React UI components from text or screenshots. Best for Product Owners.", category: "UI/UX", status: "Active" },
    { name: "Fireflies.ai", usage: "Automated meeting transcription and action-item extraction for Scrum Masters.", category: "Productivity", status: "Active" },
    { name: "Llama 3.2 (Local)", usage: "Open-source model for local hosting on Mac/Docker to protect proprietary bank data.", category: "Open Source", status: "Active" }
];

function renderAll() {
    // Render News
    document.getElementById('newsGrid').innerHTML = newsData.map(item => `
        <div class="card">
            <div><h2 class="card-title">${item.title}</h2><p class="card-brief">${item.brief}</p></div>
            <div class="card-footer"><span class="date-badge">${item.date}</span><a href="${item.url}" target="_blank" class="btn-view">READ ↗</a></div>
        </div>
    `).join('');

    // Render Tools (Latest Tool on top row, rest categorized)
    const latest = toolsData.find(t => t.status === "New Launch");
    document.getElementById('latestToolRow').innerHTML = `
        <div class="tool-row latest">
            <span class="type-tag">NEWEST LAUNCH</span>
            <div class="tool-info"><strong>${latest.name}</strong> — ${latest.usage}</div>
        </div>
    `;

    const categories = [...new Set(toolsData.map(t => t.category))];
    document.getElementById('toolsCategorized').innerHTML = categories.map(cat => `
        <div class="tool-section">
            <h3 class="section-title">${cat}</h3>
            <table class="tool-table">
                ${toolsData.filter(t => t.category === cat && t.status !== "New Launch").map(t => `
                    <tr><td width="30%"><strong>${t.name}</strong></td><td>${t.usage}</td></tr>
                `).join('')}
            </table>
        </div>
    `).join('');
}

window.switchTab = (tabName, btn) => {
    document.querySelectorAll('.tab-content, .tab-link').forEach(el => el.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    btn.classList.add('active');
    document.getElementById('exportNewsBtn').style.display = tabName === 'news' ? 'block' : 'none';
    document.getElementById('exportToolsBtn').style.display = tabName === 'tools' ? 'block' : 'none';
};

window.addNewTab = () => {
    const tabName = prompt("Name for your new stream:");
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
    const newName = prompt("Enter new name for this tab:", btn.innerText.replace('✎', '').trim());
    if (newName) btn.innerHTML = `${newName} <span class="rename-icon" onclick="renameTab(event, this)">✎</span>`;
};

// CSV Export for News and Tools
document.getElementById('exportNewsBtn').onclick = () => exportCSV(newsData, ["Brief", "URL", "Date"], "AI_News");
document.getElementById('exportToolsBtn').onclick = () => exportCSV(toolsData, ["Name", "Usage", "Category"], "AI_Tools_Directory");

function exportCSV(data, headers, fileName) {
    const csv = [headers, ...data.map(i => Object.values(i))].map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

renderAll();
