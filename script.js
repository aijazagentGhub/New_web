// 1. ALL AI TOOLS (April 2026 Master List)
// 1. MASTER AI TOOL DATA (All current tools)
const toolsData = [
    { name: "GPT-5.5 (Action Engine)", usage: "LAUNCHED: Autonomous enterprise task execution & reasoning.", category: "LLMs", isNew: true },
    { name: "Claude 4.2 Mythos", usage: "NEW: Optimized for BFSI security and complex code refactoring.", category: "Security", isNew: true },
    { name: "Gemini 2.0 Pro", usage: "NEW: 2M context. Best for analyzing full banking repositories.", category: "LLMs", isNew: true },
    { name: "NotebookLM v3", usage: "Grounded AI research using your private PDF/Doc vault.", category: "Research", isNew: false },
    { name: "Cursor AI", usage: "AI-native IDE. The gold standard for senior software engineering.", category: "Development", isNew: false },
    { name: "n8n (Agentic)", usage: "Self-hosted workflow automation for local AI agents.", category: "Automation", isNew: false },
    { name: "Perplexity Pro", usage: "Real-time cited search for market and tech research.", category: "Research", isNew: false },
    { name: "Windsurf Cascade", usage: "Agentic IDE for managing complex code implementation flows.", category: "Development", isNew: false }
    { name: "GPT-5.5 (Action Engine)", usage: "LAUNCHED: Autonomous task execution across software interfaces.", category: "LLMs", isNew: true },
    { name: "Claude 4.2 Mythos", usage: "NEW: Specialized for high-stakes BFSI security and reasoning.", category: "Security", isNew: true },
    { name: "Gemini 2.0 Pro", usage: "NEW: 2M context window. Best for massive repository analysis.", category: "LLMs", isNew: true },
    { name: "NotebookLM v3", usage: "Grounded research using private documents with zero hallucination.", category: "Research", isNew: false },
    { name: "Cursor AI", usage: "AI-native IDE for managing complex code implementation flows.", category: "Development", isNew: false },
    { name: "n8n (Agentic)", usage: "Self-hosted engine for building secure AI automation workflows.", category: "Automation", isNew: false },
    { name: "Perplexity Pro", usage: "Real-time search with cited sources for technical research.", category: "Research", isNew: false },
    { name: "Windsurf Cascade", usage: "Agentic IDE for handling multi-step engineering tasks.", category: "Development", isNew: false }
];

// 2. NEWS ENGINE (With Triple Fail-Safe)
const RSS_URLS = ["https://blog.google/technology/ai/rss/", "https://openai.com/news/rss.xml"];
// 2. NEWS DATA & FETCHING
const newsData = []; // This gets populated by the RSS fetcher

async function fetchLiveNews() {
const grid = document.getElementById('newsGrid');
if (!grid) return;

try {
        // Try the most reliable proxy first
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URLS[0])}`);
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent("https://blog.google/technology/ai/rss/")}`);
const data = await response.json();
        
if (data.status === 'ok') {
            renderNews(data.items.map(i => ({
                title: i.title,
                brief: i.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + "...",
                link: i.link,
                date: i.pubDate.split(' ')[0]
            })));
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
        console.log("Switching to Local Pulse...");
        loadFallbackNews();
        // Fallback if RSS fails
        const fallback = [
            { title: "OpenAI GPT-5.5 Released", brief: "Action Engine allows agents to navigate UI autonomously.", link: "#", date: "2026-04-25" },
            { title: "Gemini 2.0 Integration", brief: "Google expands context window to 2M tokens for BFSI users.", link: "#", date: "2026-04-24" }
        ];
        newsData.push(...fallback);
        renderNews(fallback);
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
// 3. BULLETPROOF CSV EXPORT ENGINE
window.exportData = (type) => {
    let csvContent = "data:text/csv;charset=utf-8,Name/Title,Details,Date\n";
    const data = type === 'tools' ? toolsData.map(t => `${t.name},${t.usage},NEW`) : [];
    
    if (data.length === 0 && type === 'news') {
        alert("News feed is still loading. Try again in 2 seconds.");
        return;
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

    csvContent += data.join("\n");
    const encodedUri = encodeURI(csvContent);
    // Convert array to CSV string with proper escaping
    const csvString = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    
    // Create Blob and trigger download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

// 4. UI RENDERING
// 4. RENDERING & UI LOGIC
function renderTools() {
const hero = document.getElementById('latestToolRow');
const list = document.getElementById('toolsCategorized');
@@ -101,7 +123,6 @@ function renderNews(articles) {
   `).join('');
}

// 5. TABS & INIT
window.switchTab = (name, el) => {
document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
document.getElementById(name + 'Tab').classList.add('active');
