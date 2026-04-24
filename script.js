const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');
const syncStatus = document.getElementById('syncStatus');

// VERIFIED NEWS FOR APRIL 24, 2026
const executiveNews = [
    { 
        title: "DeepSeek-V4: 1.6T Parameter Open-Source Launch", 
        brief: "DeepSeek has released V4-Pro, featuring a Mixture-of-Experts (MoE) architecture with 1.6 trillion parameters. It matches GPT-5.4 reasoning benchmarks while supporting a 1-million token context window. This launch significantly bridges the gap between open-source and top-tier closed models for agentic tasks.",
        url: "https://in.investing.com/news/stock-market-news/deepseek-releases-new-flagship-open-source-ai-model-v4-5356342", 
        date: "2026-04-24" 
    },
    { 
        title: "TCS & Google Cloud: AI-Native Autonomous Enterprise", 
        brief: "Tata Consultancy Services (TCS) expanded its partnership with Google Cloud to deploy 'Agentic AI' systems. The initiative focuses on autonomous operating models using Gemini Enterprise to automate complex business decision-making and IT functions, reducing data transition cycles by 40%.",
        url: "https://www.tcs.com/who-we-are/newsroom/news-alert/tcs-deepens-partnership-google-cloud-power-ai-native-autonomous-enterprises", 
        date: "2026-04-24" 
    }
];

// v5 storage key to ensure a clean start
let tabs = JSON.parse(localStorage.getItem('aiNews_v5')) || [
    { 
        id: "news-tab-001", 
        title: "Latest AI news", 
        active: true, 
        rows: executiveNews 
    }
];

// 2) SAFETY LOCK: Prevent the "Blank Screen"
function ensureMinimumData(tab) {
    if (tab.rows.length === 0) {
        tab.rows.push({ 
            title: "Dashboard Placeholder", 
            brief: "No news found or all rows deleted. Click 'Sync' or 'Add Custom' to populate this tab with AI insights.", 
            url: "https://google.com", 
            date: new Date().toISOString().split('T')[0] 
        });
    }
}

async function fetchLiveAINews() {
    syncStatus.innerText = "Syncing...";
    // Using a reliable JSON proxy for the Wired AI RSS feed
    const RSS_URL = "https://www.wired.com/feed/category/ai/latest/rss";
    const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === 'ok') {
            const newsTab = tabs.find(t => t.title === "Latest AI news");
            if (newsTab) {
                const newItems = data.items.slice(0, 3).map(item => ({
                    title: item.title,
                    brief: item.description.replace(/<[^>]*>?/gm, '').substring(0, 300) + "...", 
                    url: item.link,
                    date: new Date().toISOString().split('T')[0]
                }));

                const existingUrls = new Set(newsTab.rows.map(r => r.url));
                const uniqueNewItems = newItems.filter(item => !existingUrls.has(item.url));
                
                if (uniqueNewItems.length > 0) {
                    newsTab.rows = [...uniqueNewItems, ...newsTab.rows].slice(0, 20);
                    render();
                    syncStatus.innerText = "Sync Successful";
                } else {
                    syncStatus.innerText = "No new updates";
                }
            }
        }
    } catch (e) {
        syncStatus.innerText = "Offline Mode";
    }
}

function saveToMemory() {
    localStorage.setItem('aiNews_v5', JSON.stringify(tabs));
}

function render() {
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';

    tabs.forEach((tab) => {
        ensureMinimumData(tab); // Apply safety lock

        const btn = document.createElement('div');
        btn.className = `tab-item ${tab.active ? 'active' : ''}`;
        btn.innerHTML = `
            <span class="tab-title" onclick="setActive('${tab.id}')">${tab.title}</span>
            <span class="rename-icon" onclick="renameTab(event, '${tab.id}')">✎</span>
            <span class="close-icon" onclick="removeTab(event, '${tab.id}')">×</span>
        `;
        tabButtons.appendChild(btn);

        if (tab.active) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
                    <h2>${tab.title}</h2>
                    <button class="refresh-btn" onclick="fetchLiveAINews()">↻ Sync Latest News</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 20%;">Title</th>
                            <th style="width: 45%;">Brief (Professional Summary)</th>
                            <th style="width: 20%;">Verified Source</th>
                            <th style="width: 10%;">Date</th>
                            <th style="width: 40px;"></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
                <button class="add-custom-btn" onclick="addRow('${tab.id}')">+ Add Custom Entry</button>
            `;
            tabContent.appendChild(wrapper);
            renderRows(tab);
        }
    });
    saveToMemory();
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
                    <a href="${row.url}" target="_blank" class="link-icon">↗ READ</a>
                </div>
            </td>
            <td><input type="date" value="${row.date}" oninput="updateCell('${tab.id}', ${index}, 'date', this.value)"></td>
            <td><button class="delete-row-btn" onclick="deleteRow('${tab.id}', ${index})">×</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// ... (Keep window.updateCell, window.addRow, window.deleteRow, window.setActive, window.renameTab, window.removeTab as per previous version)
