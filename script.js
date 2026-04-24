const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');
const syncStatus = document.getElementById('syncStatus');

// Initialize Tabs from LocalStorage or create defaults
let tabs = JSON.parse(localStorage.getItem('myAutoNewsTabs')) || [
    { 
        id: "news-tab-001", 
        title: "Latest AI news", 
        active: true, 
        rows: [] 
    }
];

// --- NEW: AUTOMATED NEWS FETCHER ---
async function fetchLiveAINews() {
    syncStatus.innerText = "Fetching live AI news...";
    
    // Using a public RSS to JSON converter for Wired's AI feed
    const RSS_URL = "https://www.wired.com/feed/category/ai/latest/rss";
    const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === 'ok') {
            // Get the top 3 latest items
            const newItems = data.items.slice(0, 3).map(item => ({
                title: item.title,
                url: item.link,
                date: item.pubDate.split(' ')[0] // Formats as YYYY-MM-DD
            }));

            // Find our specific AI News tab
            const newsTab = tabs.find(t => t.title === "Latest AI news");
            if (newsTab) {
                // Merge and remove duplicates based on URL
                const existingUrls = new Set(newsTab.rows.map(r => r.url));
                const uniqueNewItems = newItems.filter(item => !existingUrls.has(item.url));
                
                // Add new items to the top
                newsTab.rows = [...uniqueNewItems, ...newsTab.rows].slice(0, 20); // Keep last 20
                syncStatus.innerText = `Update complete: Added ${uniqueNewItems.length} new stories.`;
                render();
            }
        }
    } catch (error) {
        console.error("News Fetch Error:", error);
        syncStatus.innerText = "Sync failed (Check connection)";
    }
}

function saveToMemory() {
    localStorage.setItem('myAutoNewsTabs', JSON.stringify(tabs));
}

function render() {
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';

    tabs.forEach((tab) => {
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
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h2>${tab.title}</h2>
                    <button class="add-row-btn" style="margin-bottom:10px" onclick="fetchLiveAINews()">↻ Force Refresh</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Meaningful Title</th>
                            <th>URL</th>
                            <th>Date</th>
                            <th style="width:40px"></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
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
            <td><input type="url" value="${row.url}" oninput="updateCell('${tab.id}', ${index}, 'url', this.value)"></td>
            <td><input type="date" value="${row.date}" oninput="updateCell('${tab.id}', ${index}, 'date', this.value)"></td>
            <td><button class="delete-row-btn" onclick="deleteRow('${tab.id}', ${index})">×</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Global Handlers
window.updateCell = (id, idx, field, val) => {
    const tab = tabs.find(t => t.id === id);
    tab.rows[idx][field] = val;
    saveToMemory();
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

window.renameTab = (e, id) => {
    e.stopPropagation();
    const tab = tabs.find(t => t.id === id);
    const name = prompt("New tab name:", tab.title);
    if (name) { tab.title = name; render(); }
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
    tabs.push({ id: Date.now().toString(), title: "Work Tab", active: true, rows: [] });
    render();
};

// INITIAL LOAD: Render then fetch latest news automatically
render();
fetchLiveAINews();
