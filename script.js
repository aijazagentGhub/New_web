const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');
const syncStatus = document.getElementById('syncStatus');

// TOP 2 NEWS FOR APRIL 24, 2026 (Fallback so it's never blank)
const initialNews = [
    { 
        title: "DeepSeek V4: China's New Open-Source Model Rivals GPT-4o Performance", 
        url: "https://www.deepseek.com/news/v4-announcement", 
        date: "2026-04-24" 
    },
    { 
        title: "OpenAI GPT-5.5 Preview: Enhanced Agentic Capabilities Released for Developers", 
        url: "https://openai.com/news/gpt-5-5-preview", 
        date: "2026-04-24" 
    }
];

// Initialize Tabs - Checks if "Latest AI news" exists, otherwise creates it with data
let tabs = JSON.parse(localStorage.getItem('myAutoNewsTabs_v2')) || [
    { 
        id: "news-tab-001", 
        title: "Latest AI news", 
        active: true, 
        rows: initialNews 
    }
];

// Fetcher Logic
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
                const newItems = data.items.slice(0, 2).map(item => ({
                    title: item.title,
                    url: item.link,
                    date: new Date().toISOString().split('T')[0]
                }));

                const existingUrls = new Set(newsTab.rows.map(r => r.url));
                const uniqueNewItems = newItems.filter(item => !existingUrls.has(item.url));
                
                if (uniqueNewItems.length > 0) {
                    newsTab.rows = [...uniqueNewItems, ...newsTab.rows].slice(0, 20);
                    render();
                    syncStatus.innerText = "Updated!";
                } else {
                    syncStatus.innerText = "Up to date";
                }
            }
        }
    } catch (e) {
        syncStatus.innerText = "Showing stored news";
    }
}

function saveToMemory() {
    localStorage.setItem('myAutoNewsTabs_v2', JSON.stringify(tabs));
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
                    <button class="add-row-btn" style="background:#0369a1; padding: 5px 10px;" onclick="fetchLiveAINews()">↻ Refresh News</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 50%;">Meaningful Title</th>
                            <th>URL</th>
                            <th>Date</th>
                            <th style="width:40px"></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
                <button class="add-row-btn" style="margin-top:20px;" onclick="addRow('${tab.id}')">+ Add Custom Row</button>
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

window.updateCell = (id, idx, field, val) => {
    const tab = tabs.find(t => t.id === id);
    tab.rows[idx][field] = val;
    saveToMemory();
};

window.addRow = (id) => {
    const tab = tabs.find(t => t.id === id);
    tab.rows.push({ title: "New AI Event", url: "https://", date: new Date().toISOString().split('T')[0] });
    render();
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
    const name = prompt("Rename:", tab.title);
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

render();
fetchLiveAINews();
