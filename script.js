// Curation of AI Tools
const toolsData = [
    { name: "Gemini 1.5 Pro", usage: "Best for deep analysis of 1M+ token datasets (entire codebases or bank records).", category: "LLMs" },
    { name: "NotebookLM", usage: "Grounds AI in your private documents/PDFs for accurate research without hallucinations.", category: "Research" },
    { name: "ChatGPT o1", usage: "Excels at chain-of-thought reasoning for complex architectural and logic problems.", category: "LLMs" },
    { name: "Cursor AI", usage: "An AI-native IDE that understands your full project context for senior-level engineering.", category: "Development" },
    { name: "n8n", usage: "Self-hosted automation. Use this to build your local 'Agentic AI' search workflows.", category: "Automation" }
];

// High-signal RSS Feeds
const FEEDS = [
    "https://blog.google/technology/ai/rss/",
    "https://openai.com/news/rss.xml",
    "https://www.technologyreview.com/topic/artificial-intelligence/feed/"
];

async function fetchLiveNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;

    grid.innerHTML = '<p style="color: var(--sky-muted); padding: 20px;">Scanning the horizon for AI updates...</p>';

    try {
        let allArticles = [];

        // Fetching from all sources
        for (const feedUrl of FEEDS) {
            // Using rss2json API (No key needed for low-volume requests)
            const apiReq = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
            const response = await fetch(apiReq);
            const data = await response.json();

            if (data.status === 'ok') {
                data.items.forEach(item => {
                    allArticles.push({
                        title: item.title,
                        brief: item.description.replace(/<[^>]*>?/gm, '').substring(0, 160) + "...",
                        link: item.link,
                        date: item.pubDate.split(' ')[0] // Simple YYYY-MM-DD
                    });
                });
            }
        }

        // Sort: Newest first
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Render top 9 news items
        renderNews(allArticles.slice(0, 9));

    } catch (err) {
        console.error("News Fetch Error:", err);
        grid.innerHTML = '<p style="color: red; padding: 20px;">Connection failed. Check your internet.</p>';
    }
}

function renderNews(articles) {
    const grid = document.getElementById('newsGrid');
    grid.innerHTML = articles.map(n => `
        <div class="news-card">
            <span class="card-tag">LATEST PULSE</span>
            <h2 class="card-title">${n.title}</h2>
            <p class="card-description">${n.brief}</p>
            <div class="card-footer">
                <span>${n.date}</span>
                <a href="${n.link}" target="_blank" class="view-btn">READ ↗</a>
            </div>
        </div>
    `).join('');
}

function renderTools() {
    const list = document.getElementById('toolsCategorized');
    if (!list) return;
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

window.switchTab = (name, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    document.getElementById(name + 'Tab').classList.add('active');
    el.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
    fetchLiveNews();
    renderTools();
});
