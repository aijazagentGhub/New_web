// FULL AI TOOLSET
const toolsData = [
    { name: "Gemini 1.5 Pro", usage: "Analysis of massive codebases (2M context) and complex banking docs.", category: "LLMs", isNew: true },
    { name: "NotebookLM", usage: "Personalized research assistant grounded strictly in your uploaded PDFs.", category: "Research", isNew: true },
    { name: "ChatGPT o1", usage: "Advanced reasoning for complex architectural and logic-heavy engineering.", category: "LLMs", isNew: false },
    { name: "Claude 3.5 Sonnet", usage: "The gold standard for human-like technical writing and nuanced coding.", category: "Development", isNew: false },
    { name: "Cursor AI", usage: "AI-native IDE that understands your entire project directory structure.", category: "Development", isNew: false },
    { name: "Perplexity", usage: "Real-time AI search engine with cited sources for technical facts.", category: "Research", isNew: false },
    { name: "n8n", usage: "Self-hosted automation for building secure, agentic AI workflows.", category: "Automation", isNew: false },
    { name: "AnythingLLM", usage: "Local RAG system to run document AI privately on your Mac.", category: "Security", isNew: false },
    { name: "v0.dev", usage: "Generative UI tool for building React/Tailwind components instantly.", category: "Development", isNew: false },
    { name: "Midjourney v6", usage: "High-end image generation for professional presentations and mockups.", category: "Design", isNew: false }
];

const newsData = [
    { title: "Anthropic 'Mythos' Bank Alert", brief: "Indian Finance Ministry issued emergency security protocols for BFSI. 'Mythos' models found capable of exploiting legacy mainframes.", url: "#", date: "2026-04-25" },
    { title: "Merck Signs $1B Gemini Deal", brief: "Merck officially deployed 75,000 Gemini agents today for autonomous R&D and predictive chemical manufacturing.", url: "#", date: "2026-04-25" },
    { title: "Nvidia Hits $5.1T Cap", brief: "Nvidia valuation remains at record highs as global demand for Blackwell-Ultra hardware continues to surge.", url: "#", date: "2026-04-25" },
    { title: "OpenAI 'Action Engine'", brief: "GPT-5.5 features a native 'Action Engine' that allows the model to control enterprise OS interfaces directly.", url: "#", date: "2026-04-24" }
];

function renderDashboard() {
    const newsGrid = document.getElementById('newsGrid');
    const hero = document.getElementById('latestToolRow');
    const toolList = document.getElementById('toolsCategorized');

    // 1. Render News ONLY if container exists
    if (newsGrid) {
        newsGrid.innerHTML = newsData.map(n => `
            <div class="news-card">
                <span class="card-tag">NEWS</span>
                <h2 class="card-title">${n.title}</h2>
                <p class="card-description">${n.brief}</p>
                <div class="card-footer"><span>${n.date}</span><a href="${n.url}" class="view-btn">READ ↗</a></div>
            </div>
        `).join('');
    }

    // 2. Render Tools ONLY if containers exist
    if (hero && toolList) {
        const newest = toolsData.find(t => t.isNew);
        hero.innerHTML = `<div class="hero-tool"><h3>${newest.name}</h3><p>${newest.usage}</p></div>`;
        
        const categories = [...new Set(toolsData.map(t => t.category))];
        toolList.innerHTML = categories.map(cat => `
            <div class="tool-section">
                <h3 class="section-title">${cat}</h3>
                <table class="tool-table">
                    ${toolsData.filter(t => t.category === cat).map(t => `
                        <tr><td width="35%"><strong>${t.name}</strong></td><td>${t.usage}</td></tr>
                    `).join('')}
                </table>
            </div>
        `).join('');
    }
}

window.switchTab = (name, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    document.getElementById(name + 'Tab').classList.add('active');
    el.classList.add('active');
};

window.renameTab = (e, icon) => {
    e.stopPropagation();
    const label = icon.previousElementSibling;
    const newName = prompt("Rename:", label.innerText);
    if (newName) label.innerText = newName;
};

document.addEventListener('DOMContentLoaded', renderDashboard);
