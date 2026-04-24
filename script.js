const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');
const syncStatus = document.getElementById('syncStatus');

// Initial News with new "Brief" summarization
const initialNews = [
    { 
        title: "DeepSeek V4: China's New Open-Source Model", 
        brief: "A massive upgrade in open-source AI, rivaling GPT-4o in coding and math benchmarks while maintaining efficiency.",
        url: "https://www.deepseek.com/news/v4-announcement", 
        date: "2026-04-24" 
    },
    { 
        title: "OpenAI GPT-5.5 Preview Released", 
        brief: "New 'Agentic' reasoning update that allows AI to perform multi-step tasks across different apps autonomously.",
        url: "https://openai.com/news/gpt-5-5-preview", 
        date: "2026-04-24" 
    }
];

let tabs = JSON.parse(localStorage.getItem('myAutoNewsTabs_v3')) || [
    { 
        id: "news-tab-001", 
        title: "Latest AI news", 
        active: true, 
        rows: initialNews 
    }
];

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
                    brief: item.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + "...", // Auto-summarizing snippet
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
        syncStatus.innerText = "Local Mode";
    }
}

function saveToMemory() {
    localStorage.setItem('myAutoNewsTabs_v3', JSON.stringify(tabs));
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
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 15px;">
                    <h2>${tab.title}</h2>
                    <button class="add-row-btn" style="background:#0369a1;" onclick="fetchLiveAINews()">↻ Sync Latest News</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 25%;">Title</th>
                            <th style="width: 35%;">Brief Summary</th>
                            <th style="width: 20%;">URL (Click to Read)</th>
                            <th style="width: 12%;">Date</th>
                            <th style="width: 40px;"></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
                <button class="add-row-btn" style="margin-top:20px; background:#64748b;" onclick="addRow('${tab.id}')">+ Add Custom Entry</button>
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
                    <a href="${row.url}" target="_blank" title="Open Link">🔗</a>
                </div>
            </td>
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
    tab.rows.push({ title: "", brief: "", url: "https://", date: new Date().toISOString().split('T')[0] });
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
