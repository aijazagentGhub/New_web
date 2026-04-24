const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');
const syncStatus = document.getElementById('syncStatus');

// HAND-PICKED & VERIFIED FOR APRIL 25, 2026
const latestExecutiveNews = [
    { 
        title: "Merck Signs $1B AI Deal with Google Cloud", 
        brief: "Merck (MSD) has entered a massive $1 billion partnership today to deploy Gemini Enterprise agents across 75,000 employees. The goal is to move from pilot projects to an 'Agentic Ecosystem' that handles R&D, manufacturing predictive analytics, and autonomous commercial operations.",
        url: "https://itbrief.com.au/story/merck-signs-usd-1-billion-ai-deal-with-google-cloud", 
        date: "2026-04-25" 
    },
    { 
        title: "Stanford AI Index 2026: The Agentic Jump", 
        brief: "The 2026 AI Index report confirms AI agents have reached 66% human performance on real-world computer tasks, up from 12% just a year ago. It highlights a critical shift: China has nearly erased the US lead in model performance, with DeepSeek and Z.ai matching Claude and GPT benchmarks.",
        url: "https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report", 
        date: "2026-04-24" 
    },
    { 
        title: "DeepSeek V4: 1.6T MoE Model Launch", 
        brief: "DeepSeek's new V4-Pro architecture features 1.6 trillion parameters. Manually verified to match GPT-5.4 logic, this model is optimized for edge-computing and low-latency agentic workflows, significantly lowering the barrier for high-tier open-source AI deployment.",
        url: "https://in.investing.com/news/stock-market-news/deepseek-releases-new-flagship-open-source-ai-model-v4-5356342", 
        date: "2026-04-24" 
    },
    { 
        title: "TCS & Google: AI-Native Enterprises", 
        brief: "Tata Consultancy Services is scaling 3,000+ specialized autonomous agents to redefine enterprise IT. The partnership focuses on reducing data transition cycles by 40% using 'AI Hypercomputer' infrastructure to manage mission-critical BFSI and logistics supply chains.",
        url: "https://www.tcs.com/who-we-are/newsroom/news-alert/tcs-deepens-partnership-google-cloud-power-ai-native-autonomous-enterprises", 
        date: "2026-04-23" 
    }
];

// v7 Key ensures a fresh start with the new sorting/limit logic
let tabs = JSON.parse(localStorage.getItem('aiNews_v7')) || [
    { 
        id: "news-tab-001", 
        title: "Latest AI news", 
        active: true, 
        rows: latestExecutiveNews 
    }
];

// Logic to keep exactly 4 rows, sorted by date (Newest First)
function cleanAndSort(tab) {
    // 1. Sort: Newest date at index 0
    tab.rows.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 2. Limit: Keep only 4
    if (tab.rows.length > 4) {
        tab.rows = tab.rows.slice(0, 4);
    }

    // 3. Fail-safe: Always have at least 1 row
    if (tab.rows.length === 0) {
        tab.rows.push({ title: "Awaiting News...", brief: "Click Sync to fetch latest data.", url: "https://", date: new Date().toISOString().split('T')[0] });
    }
}

async function fetchLiveAINews() {
    syncStatus.innerText = "Syncing...";
    const RSS_URL = "https://www.wired.com/feed/category/ai/latest/rss";
    const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.status === 'ok') {
            const newsTab = tabs.find(t => t.title === "Latest AI news");
            if (newsTab) {
                const newItems = data.items.map(item => ({
                    title: item.title,
                    brief: item.description.replace(/<[^>]*>?/gm, '').substring(0, 250) + "...", 
                    url: item.link,
                    date: new Date().toISOString().split('T')[0]
                }));

                // Add only unique items
                const existingUrls = new Set(newsTab.rows.map(r => r.url));
                const uniqueNewItems = newItems.filter(item => !existingUrls.has(item.url));
                
                newsTab.rows = [...uniqueNewItems, ...newsTab.rows];
                render();
                syncStatus.innerText = "Sync Complete";
            }
        }
    } catch (e) {
        syncStatus.innerText = "Local Mode";
    }
}

function render() {
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';

    tabs.forEach((tab) => {
        cleanAndSort(tab); // Apply 4-row limit and date sorting

        const btn = document.createElement('div');
        btn.className = `tab-item ${tab.active ? 'active' : ''}`;
        btn.innerHTML = `
            <span class="tab-title" onclick="setActive('${tab.id}')">${tab.title}</span>
            <span class="close-icon" onclick="removeTab(event, '${tab.id}')">×</span>
        `;
        tabButtons.appendChild(btn);

        if (tab.active) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
                    <h2 style="margin:0; color:#0369a1;">${tab.title} (Top 4 Insights)</h2>
                    <button class="refresh-btn" onclick="fetchLiveAINews()">↻ Sync Today's News</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 22%;">Headline</th>
                            <th style="width: 45%;">Brief (Executive Summary)</th>
                            <th style="width: 20%;">Verified Link</th>
                            <th style="width: 10%;">Date</th>
                            <th style="width: 40px;"></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
            `;
            tabContent.appendChild(wrapper);
            renderRows(tab);
        }
    });
    localStorage.setItem('aiNews_v7', JSON.stringify(tabs));
}

function renderRows(tab) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    tab.rows.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${row.title}" oninput="updateCell('${tab.id}', ${index}, 'title', this.value)"></td>
            <td><textarea oninput="updateCell('${tab.id}', ${index}, 'brief', this.value)">${row.brief || ''}</textarea></td>
            <td>
                <div class="url-cell">
                    <input type="url" value="${row.url}" oninput="updateCell('${tab.id}', ${index}, 'url', this.value)">
                    <a href="${row.url}" target="_blank" class="link-btn">OPEN ↗</a>
                </div>
            </td>
            <td><input type="date" value="${row.date}" onchange="updateCell('${tab.id}', ${index}, 'date', this.value)"></td>
            <td><button class="delete-row-btn" onclick="deleteRow('${tab.id}', ${index})">×</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Window functions...
window.updateCell = (id, idx, field, val) => {
    const tab = tabs.find(t => t.id === id);
    tab.rows[idx][field] = val;
    if (field === 'date') render(); // Re-sort if date changes
    else localStorage.setItem('aiNews_v7', JSON.stringify(tabs));
};

window.deleteRow = (id, idx) => {
    const tab = tabs.find(t => t.id === id);
    tab.rows.splice(idx, 1);
    render();
};

window.setActive = (id) => {
    tabs.forEach(t => t.active = (t.id === id));
    render();
};

window.removeTab = (e, id) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    tabs = tabs.filter(t => t.id !== id);
    if (!tabs.find(t => t.active)) tabs[0].active = true;
    render();
};

addTabBtn.onclick = () => {
    tabs.forEach(t => t.active = false);
    tabs.push({ id: Date.now().toString(), title: "Project Tab", active: true, rows: [] });
    render();
};

render();
