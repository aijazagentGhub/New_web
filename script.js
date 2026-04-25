// --- APRIL 2026 AI MASTER LIST ---
const toolsData = [
    { name: "GPT-5.5 (Action Engine)", usage: "LAUNCHED YESTERDAY: Fully agentic. Can execute complex workflows across enterprise software autonomously.", category: "LLMs", isNew: true },
    { name: "Claude Mythos Preview", usage: "NEW: Specialized for high-stakes cybersecurity and BFSI mainframe logic.", category: "Security", isNew: true },
    { name: "Google Workspace Intelligence", usage: "NEW: Unified AI layer across Sheets, Meet, and Chrome for cross-app automation.", category: "Automation", isNew: true },
    { name: "Claude 4.7 Opus", usage: "Released last week. The new gold standard for software engineering and 'pixel-perfect' vision.", category: "Development", isNew: true },
    { name: "NotebookLM v3", usage: "Grounds AI in 50+ documents with zero hallucinations. Essential for research.", category: "Research", isNew: false },
    { name: "MindBridge AI", usage: "Audit-grade risk detection for BFSI. Analyzes 100% of transactions for anomalies.", category: "Finance", isNew: false },
    { name: "Cursor AI", usage: "AI-native IDE that understands entire codebases. Critical for Lead Engineers.", category: "Development", isNew: false },
    { name: "n8n (Agentic)", usage: "The core engine for self-hosted, secure AI workflow automation on your Mac.", category: "Automation", isNew: false },
    { name: "Perplexity Pro", usage: "Real-time search with cited sources. Matches GDPval benchmarks for knowledge work.", category: "Research", isNew: false },
    { name: "ChatFin AI", usage: "Purpose-built agents for accounting, regulatory compliance, and financial analysis.", category: "Finance", isNew: false }
];

// --- TAB LOGIC ---
window.switchTab = (name, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    const target = document.getElementById(name + 'Tab') || document.getElementById('newsTab');
    target.classList.add('active');
    el.classList.add('active');
};

window.addNewTab = () => {
    const name = prompt("Enter Tab Name:");
    if (!name) return;
    const tabBar = document.getElementById('tabBar');
    const addBtn = document.getElementById('addTabBtn');
    
    const newTab = document.createElement('div');
    newTab.className = 'tab-item';
    newTab.innerHTML = `
        <span class="tab-label">${name}</span>
        <div class="tab-controls">
            <span onclick="renameTab(event, this)">✎</span>
            <span onclick="deleteTab(event, this)">✕</span>
        </div>
    `;
    newTab.onclick = () => switchTab('news', newTab); // Default to news view for now
    tabBar.insertBefore(newTab, addBtn);
};

window.deleteTab = (e, btn) => {
    e.stopPropagation();
    if(confirm("Delete this tab?")) btn.closest('.tab-item').remove();
};

window.renameTab = (e, btn) => {
    e.stopPropagation();
    const label = btn.closest('.tab-item').querySelector('.tab-label');
    const newName = prompt("Rename to:", label.innerText);
    if(newName) label.innerText = newName;
};

// --- RENDER ENGINE ---
function renderTools() {
    const hero = document.getElementById('latestToolRow');
    const list = document.getElementById('toolsCategorized');
    
    // Sort tools: Newest first
    const sortedTools = [...toolsData].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    // Highlight the newest top 2 in the Hero
    hero.innerHTML = sortedTools.filter(t => t.isNew).slice(0, 2).map(t => `
        <div class="hero-tool interactive-card">
            <div class="new-pulse">JUST LAUNCHED</div>
            <h3>${t.name}</h3>
            <p>${t.usage}</p>
        </div>
    `).join('');

    const cats = [...new Set(sortedTools.map(t => t.category))];
    list.innerHTML = cats.map(cat => `
        <div class="tool-section">
            <h3 class="section-title">${cat}</h3>
            <table class="tool-table">
                ${sortedTools.filter(t => t.category === cat).map(t => `
                    <tr class="${t.isNew ? 'new-row' : ''}">
                        <td width="30%">
                            <strong>${t.name}</strong>
                            ${t.isNew ? '<span class="mini-tag">NEW</span>' : ''}
                        </td>
                        <td>${t.usage}</td>
                    </tr>
                `).join('')}
            </table>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderTools();
    // (Add your News RSS fetcher here as well)
});
