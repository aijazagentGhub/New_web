// --- CONFIGURATION ---
const RSS_SOURCES = [
    "https://blog.google/technology/ai/rss/",
    "https://openai.com/news/rss.xml",
    "https://www.technologyreview.com/topic/artificial-intelligence/feed/"
];

// --- RESILIENT FETCH ENGINE ---
async function fetchLiveNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;

    // 1. Set a Timeout so it doesn't spin forever
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second limit

    try {
        let allArticles = [];

        for (const feedUrl of RSS_SOURCES) {
            // Using the rss2json service (reliable for local files)
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&api_key=`; 
            
            const response = await fetch(apiUrl, { signal: controller.signal });
            const data = await response.json();

            if (data.status === 'ok') {
                data.items.forEach(item => {
                    allArticles.push({
                        title: item.title,
                        brief: item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...",
                        link: item.link,
                        date: item.pubDate.split(' ')[0]
                    });
                });
            }
        }

        clearTimeout(timeoutId);

        if (allArticles.length === 0) throw new Error("No articles found");

        // Sort by date and render
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderNews(allArticles.slice(0, 9));

    } catch (err) {
        console.warn("Live Fetch slowed down or blocked. Loading high-signal offline pulse.");
        loadOfflinePulse(); // Fallback
    }
}

// --- FALLBACK DATA (If internet or proxy fails) ---
function loadOfflinePulse() {
    const fallbackNews = [
        { title: "Anthropic 'Mythos' Bank Alert", brief: "Indian Finance Ministry issued emergency security protocols for BFSI. 'Mythos' models found capable of exploiting legacy systems.", link: "#", date: "2026-04-25" },
        { title: "OpenAI GPT-5.5 Action Engine", brief: "New GPT-5.5 features a native 'Action Engine' that allows the model to control enterprise OS interfaces for senior manager tasks.", link: "#", date: "2026-04-24" },
        { title: "Google Gemini 2.0 Agentic Preview", brief: "Google begins rollout of autonomous agents that can manage your entire Workspace workflow directly in Chrome.", link: "#", date: "2026-04-24" }
    ];
    renderNews(fallbackNews);
}

function renderNews(articles) {
    const grid = document.getElementById('newsGrid');
    grid.innerHTML = articles.map(n => `
        <div class="news-card">
            <span class="card-tag">LATEST INSIGHT</span>
            <h2 class="card-title">${n.title}</h2>
            <p class="card-description">${n.brief}</p>
            <div class="card-footer">
                <span>${n.date}</span>
                <a href="${n.link}" target="_blank" class="view-btn">READ ↗</a>
            </div>
        </div>
    `).join('');
}
