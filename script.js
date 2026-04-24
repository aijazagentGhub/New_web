const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');

// TOP 2 NEWS FOR APRIL 25, 2026 (Plus Top 2 from April 24)
const failSafeNews = [
    { 
        title: "Merck & Google: $1B Agentic Ecosystem", 
        brief: "Merck signed a $1B deal today to deploy Gemini Enterprise agents across 75,000 employees. This moves beyond chatbots to autonomous agents handling drug R&D and predictive manufacturing.",
        url: "https://itbrief.com.au/story/merck-signs-usd-1-billion-ai-deal-with-google-cloud", 
        date: "2026-04-25" 
    },
    { 
        title: "OpenAI Launches GPT-5.5 (Agentic Era)", 
        brief: "OpenAI officially rolled out GPT-5.5 today. It features massive improvements in coding autonomy and 'Computer Use' capabilities, allowing it to navigate complex software independently.",
        url: "https://m.economictimes.com/magazines/panache/openai-aunches-gpt-5-5-with-api-pricing-starting-at-5-per-1-million-tokens/articleshow/130485887.cms", 
        date: "2026-04-25" 
    },
    { 
        title: "DeepSeek V4-Pro: 1.6T MoE Model", 
        brief: "Released yesterday, V4-Pro matches GPT-5.4 logic benchmarks. Its Mixture-of-Experts architecture significantly lowers the barrier for high-tier reasoning on local enterprise infrastructure.",
        url: "https://www.taipeitimes.com/News/biz/archives/2026/04/25/2003856189", 
        date: "2026-04-24" 
    },
    { 
        title: "Stanford AI Index: China Closes Gap", 
        brief: "The 2026 report confirms that the performance lead of US models over China has evaporated, with models like DeepSeek V4 matching Claude and GPT in expert-level software engineering.",
        url: "https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report", 
        date: "2026-04-24" 
    }
];

// Force a clean load with a fresh key
let tabs = JSON.parse(localStorage.getItem('aiNews_FINAL')) || [
    { id: "news-tab-001", title: "Latest AI news", active: true, rows: failSafeNews }
];

function cleanAndSort(tab) {
    // Force sort: Newest First
    tab.rows.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Force limit: Max 4
    if (tab.rows.length > 4) tab.rows = tab.rows.slice(0, 4);
    // Force fail-safe: If blank, refill
    if (tab.rows.length === 0) tab.rows = [...failSafeNews];
}

function render() {
    if (!tabButtons || !tabContent) return;
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';

    tabs.forEach((tab) => {
        cleanAndSort(tab);
        const btn = document.createElement('div');
        btn.className = `tab-item ${tab.active ? 'active' : ''}`;
        btn.innerHTML = `<span class="tab-title" onclick="setActive('${tab.id}')">${tab.title}</span>`;
        tabButtons.appendChild(btn);

        if (tab.active) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
                    <h2 style="margin:0; color:#0369a1;">Top 2 Daily Insights (Total 4)</h2>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 25%;">Headline</th>
                            <th style="width: 50%;">Brief Insight</th>
                            <th style="width: 12%;">Source</th>
                            <th style="width: 13%;">Date</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
            `;
            tabContent.appendChild(wrapper);
            renderRows(tab);
        }
    });
    localStorage.setItem('aiNews_FINAL', JSON.stringify(tabs));
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
            <td style="text-align:center;">
                <a href="${row.url}" target="_blank" class="link-btn">OPEN ↗</a>
            </td>
            <td><input type="date" value="${row.date}" onchange="updateCell('${tab.id}', ${index}, 'date', this.value)"></td>
        `;
        tbody.appendChild(tr);
    });
}

window.updateCell = (id, idx, field, val) => {
    const tab = tabs.find(t => t.id === id);
    tab.rows[idx][field] = val;
    if (field === 'date') render(); 
    else localStorage.setItem('aiNews_FINAL', JSON.stringify(tabs));
};

window.setActive = (id) => {
    tabs.forEach(t => t.active = (t.id === id));
    render();
};

// Start
render();
