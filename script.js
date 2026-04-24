// SOURCES: High-signal AI News RSS
const RSS_FEEDS = [
    'https://blog.google/technology/ai/rss/',
    'https://openai.com/news/rss.xml',
    'https://www.technologyreview.com/topic/artificial-intelligence/feed/'
];

// TOOLS: We keep these manually curated for quality
const toolsData = [
    { name: "Gemini 1.5 Pro", usage: "2M context window. Best for analyzing entire banking codebases.", category: "LLMs" },
    { name: "NotebookLM", usage: "Ground your AI research strictly in your own uploaded project PDFs.", category: "Research" },
    { name: "Cursor AI", usage: "AI-native IDE. Essential for senior engineers managing large repos.", category: "Development" },
    { name: "n8n", usage: "The core engine for your local Agentic AI and automation workflows.", category: "Automation" }
];

async function fetchLiveNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;

    newsGrid.innerHTML = '<p style="color: var(--sky-muted); padding: 20px;">Fetching latest AI pulses...</p>';

    try {
        let allArticles = [];

        for (const url of RSS_FEEDS) {
            // Using a CORS proxy so it works from your local file
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const items = xmlDoc.querySelectorAll("item");

            items.forEach(item => {
                allArticles.push({
                    title: item.querySelector("title")?.textContent || "Untitled",
                    brief: item.querySelector("description")?.textContent.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..." || "No description.",
                    link: item.querySelector("link")?.textContent || "#",
                    date: new Date(item.querySelector("pubDate")?.textContent).toLocaleDateString()
                });
            });
        }

        // Sort by date (newest first) and take top 9
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderNews(allArticles.slice(0, 9));

    } catch (error) {
        console.error("RSS Error:", error);
        newsGrid.innerHTML = '<p style="color: red; padding: 20px;">Failed to fetch live feed. Check internet connection.</p>';
    }
}

function renderNews(articles) {
    const newsGrid = document.getElementById('newsGrid');
    newsGrid.innerHTML = articles.map(n => `
        <div class="news-card">
            <span class="card-tag">LIVE FEED</span>
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
                    <tr><td width="35%"><strong>${t.name}</strong></td><td>${t.usage}</td></tr>
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
    fetchLiveNews(); // This fetches fresh news every time you open/refresh
    renderTools();
});
