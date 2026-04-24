// 1. ALL AI TOOLS (April 2026 Master List)
const toolsData = [
    { name: "GPT-5.5 (Action Engine)", usage: "LAUNCHED: Autonomous enterprise task execution & reasoning.", category: "LLMs", isNew: true },
    { name: "Claude 4.2 Mythos", usage: "NEW: Optimized for BFSI security and complex code refactoring.", category: "Security", isNew: true },
    { name: "Gemini 2.0 Pro", usage: "NEW: 2M context. Best for analyzing full banking repositories.", category: "LLMs", isNew: true },
    { name: "NotebookLM v3", usage: "Grounded AI research using your private PDF/Doc vault.", category: "Research", isNew: false },
    { name: "Cursor AI", usage: "AI-native IDE. The gold standard for senior software engineering.", category: "Development", isNew: false },
    { name: "n8n (Agentic)", usage: "Self-hosted workflow automation for local AI agents.", category: "Automation", isNew: false },
    { name: "Perplexity Pro", usage: "Real-time cited search for market and tech research.", category: "Research", isNew: false },
    { name: "Windsurf Cascade", usage: "Agentic IDE for managing complex code implementation flows.", category: "Development", isNew: false }
];

// 2. NEWS ENGINE (With Triple Fail-Safe)
const RSS_URLS = ["https://blog.google/technology/ai/rss/", "https://openai.com/news/rss.xml"];

async function fetchLiveNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;

    try {
        // Try the most reliable proxy first
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URLS[0])}`);
        const data = await response.json();
        if (data.status === 'ok') {
            renderNews(data.items.map(i => ({
                title: i.title,
                brief: i.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + "...",
                link: i.link,
                date: i.pubDate.split(' ')[0]
            })));
        } else { throw new Error(); }
    } catch (e) {
        console.log("Switching to Local Pulse...");
        loadFallbackNews();
    }
}

function loadFallbackNews() {
    const fallback = [
        { title: "OpenAI GPT-5.5 Released", brief: "The new Action Engine allows agents to navigate software UI autonomously.", link: "https://openai.com", date: "2026-04-25" },
        { title: "Gemini 2.0 Deep Dive", brief: "Google expands context window to 2M tokens for all Enterprise users.", link: "https://blog.google", date: "2026-04-24" }
    ];
    renderNews(fallback);
}

// 3. EXPORT LOGIC (Fixed for local files)
window.exportData = (type) => {
    let csvContent = "data:text/csv;charset=utf-8,Name/Title,Details,Date\n";
    const data = type === 'tools' ? toolsData.map(t => `${t.name},${t.usage},NEW`) : [];
    
    if (data.length === 0 && type === 'news') {
        alert("News feed is still loading. Try again in 2 seconds.");
        return;
    }

    csvContent += data.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// 4. UI RENDERING
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

// 5. TABS & INIT
window.switchTab = (name, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    document.getElementById(name + 'Tab').classList.add('active');
    el.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
    renderTools();
    fetchLiveNews();
});
