// 1. MASTER AI TOOL DATA (All current tools)
const toolsData = [
    { name: "GPT-5.5 (Action Engine)", usage: "LAUNCHED: Autonomous task execution across software interfaces.", category: "LLMs", isNew: true },
    { name: "Claude 4.2 Mythos", usage: "NEW: Specialized for high-stakes BFSI security and reasoning.", category: "Security", isNew: true },
    { name: "Gemini 2.0 Pro", usage: "NEW: 2M context window. Best for massive repository analysis.", category: "LLMs", isNew: true },
    { name: "NotebookLM v3", usage: "Grounded research using private documents with zero hallucination.", category: "Research", isNew: false },
    { name: "Cursor AI", usage: "AI-native IDE for managing complex code implementation flows.", category: "Development", isNew: false },
    { name: "n8n (Agentic)", usage: "Self-hosted engine for building secure AI automation workflows.", category: "Automation", isNew: false },
    { name: "Perplexity Pro", usage: "Real-time search with cited sources for technical research.", category: "Research", isNew: false },
    { name: "Windsurf Cascade", usage: "Agentic IDE for handling multi-step engineering tasks.", category: "Development", isNew: false }
];

// 2. NEWS DATA & FETCHING
const newsData = []; // This gets populated by the RSS fetcher

async function fetchLiveNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;

    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent("https://blog.google/technology/ai/rss/")}`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            const articles = data.items.map(item => ({
                title: item.title,
                brief: item.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + "...",
                link: item.link,
                date: item.pubDate.split(' ')[0]
            }));
            
            // Populate our global news array for export
            newsData.length = 0; 
            newsData.push(...articles);
            renderNews(articles);
        } else { throw new Error(); }
    } catch (e) {
        // Fallback if RSS fails
        const fallback = [
            { title: "OpenAI GPT-5.5 Released", brief: "Action Engine allows agents to navigate UI autonomously.", link: "#", date: "2026-04-25" },
            { title: "Gemini 2.0 Integration", brief: "Google expands context window to 2M tokens for BFSI users.", link: "#", date: "2026-04-24" }
        ];
        newsData.push(...fallback);
        renderNews(fallback);
    }
}

// 3. BULLETPROOF CSV EXPORT ENGINE
window.exportData = (type) => {
    let rows = [];
    let filename = "";

    if (type === 'tools') {
        rows = [["Tool Name", "Usage", "Category", "Status"]]; // CSV Headers
        toolsData.forEach(t => {
            rows.push([t.name, t.usage, t.category, t.isNew ? "NEW" : "Stable"]);
        });
        filename = "AI_Tools_Inventory.csv";
    } else if (type === 'news') {
        if (newsData.length === 0) {
            alert("News is still loading. Please wait 2 seconds.");
            return;
        }
        rows = [["Title", "Brief Summary", "Date"]]; // CSV Headers
        newsData.forEach(n => {
            rows.push([n.title, n.brief, n.date]);
        });
        filename = "Latest_News_Pulse.csv";
    }

    // Convert array to CSV string with proper escaping
    const csvString = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    
    // Create Blob and trigger download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// 4. RENDERING & UI LOGIC
function renderTools() {
    const hero = document.getElementById('latestToolRow');
    const list = document.getElementById('toolsCategorized');
    
    hero.innerHTML = toolsData.filter(t => t.isNew).map(t => `
        <div class="hero-tool">
            <span class="new-pulse">JUST LAUNCHED</span>
            <h3>${t.name}</h3>
            <p>${t.usage}</p>
        </div>
    `).join('');

    const cats = [...new Set(toolsData.map(t => t.category))];
    list.innerHTML = cats.map(cat => `
        <div class="tool-section">
            <h3 class="section-title">${cat}</h3>
            <table class="tool-table">
                ${toolsData.filter(t => t.category === cat).map(t => `
                    <tr><td width="30%"><strong>${t.name}</strong></td><td>${t.usage}</td></tr>
                `).join('')}
            </table>
        </div>
    `).join('');
}

function renderNews(articles) {
    const grid = document.getElementById('newsGrid');
    grid.innerHTML = articles.map(n => `
        <div class="news-card">
            <span class="card-tag">PULSE</span>
            <h3>${n.title}</h3>
            <p>${n.brief}</p>
            <div class="card-footer"><span>${n.date}</span><a href="${n.link}" target="_blank">READ ↗</a></div>
        </div>
    `).join('');
}

window.switchTab = (name, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    document.getElementById(name + 'Tab').classList.add('active');
    el.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
    renderTools();
    fetchLiveNews();
});
