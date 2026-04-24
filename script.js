const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');
const syncStatus = document.getElementById('syncStatus');

// MANUALLY VERIFIED NEWS - APRIL 24, 2026
const failSafeNews = [
    { 
        title: "DeepSeek V4: 1.6T Parameter Open-Source Launch", 
        brief: "DeepSeek officially released V4-Pro today, featuring a Mixture-of-Experts (MoE) architecture. It matches GPT-5.4 benchmarks in coding while reducing inference costs by 73%. It is optimized for Huawei Ascend 950 chips, supporting a 1-million token context window.",
        url: "https://www.cointribune.com/en/ai-deepseek-launches-its-v4-models-on-huawei-chips/", 
        date: "2026-04-24" 
    },
    { 
        title: "TCS & Google Cloud: AI-Native Enterprises", 
        brief: "TCS has expanded its partnership with Google Cloud to deploy 'Agentic AI' systems. They've launched 3,000+ specialized agents on Gemini Enterprise to automate complex business decision-making, aiming to reduce data transition cycles by 40%.",
        url: "https://www.deccanherald.com/business/tcs-deepens-partnership-with-google-cloud-3980121", 
        date: "2026-04-24" 
    },
    { 
        title: "OpenAI GPT-5.5 Released with Safety Focus", 
        brief: "OpenAI introduced GPT-5.5 today, focusing on 'Agentic' autonomy and enhanced cybersecurity safeguards. The model shows significant gains in reasoning and tool use compared to the 5.4 version released earlier this month.",
        url: "https://www.helpnetsecurity.com/2026/04/24/openai-gpt-5-5-cybersecurity-safeguards/", 
        date: "2026-04-24" 
    }
];

// v6 Key forces a clean load to fix the "Blank Screen"
let tabs = JSON.parse(localStorage.getItem('aiNews_v6')) || [
    { 
        id: "news-tab-001", 
        title: "Latest AI news", 
        active: true, 
        rows: failSafeNews 
    }
];

// 1) ANTI-BLANK PROTECTION: If rows are empty, refill with verified news
function fixBlankTable(tab) {
    if (!tab.rows || tab.rows.length === 0) {
        tab.rows = [...failSafeNews];
    }
}

async function fetchLiveAINews() {
    syncStatus.innerText = "Checking for updates...";
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
                    brief: item.description.replace(/<[^>]*>?/gm, '').substring(0, 280) + "...", 
                    url: item.link,
                    date: new Date().toISOString().split('T')[0]
                }));
                const existingUrls = new Set(newsTab.rows.map(r => r.url));
                const uniqueNewItems = newItems.filter(item => !existingUrls.has(item.url));
                if (uniqueNewItems.length > 0) {
                    newsTab.rows = [...uniqueNewItems, ...newsTab.rows].slice(0, 15);
                    render();
                    syncStatus.innerText = "New data synced.";
                } else {
                    syncStatus.innerText = "No new stories.";
                }
            }
        }
    } catch (e) {
        syncStatus.innerText = "Using Fail-Safe mode.";
    }
}

function saveToMemory() {
    localStorage.setItem('aiNews_v6', JSON.stringify(tabs));
}

function render() {
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';

    tabs.forEach((tab) => {
        fixBlankTable(tab); // Trigger Fail-Safe check

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
                    <h2 style="margin:0; color:#0369a1;">${tab.title}</h2>
                    <button class="refresh-btn" onclick="fetchLiveAINews()">↻ Refresh News</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 22%;">Headline</th>
                            <th style="width: 45%;">Brief Insight</th>
                            <th style="width: 20%;">Direct Link</th>
                            <th style="width: 10%;">Date</th>
                            <th style="width: 40px;"></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
                <button class="add-custom-btn" onclick="addRow('${tab.id}')">+ Add Manual Row</button>
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
                    <a href="${row.url}" target="_blank" class="link-btn">OPEN ↗</a>
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
    tab.rows.push({ title: "Custom Title", brief: "Summary goes here...", url: "https://google.com", date: new Date().toISOString().split('T')[0] });
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
