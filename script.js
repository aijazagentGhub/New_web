const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');

// TOP 2 NEWS FOR APRIL 25, 2026 + APRIL 24
const latestNews = [
    { 
        title: "Merck & Google: $1B Agentic Ecosystem", 
        brief: "Merck signed a $1B deal today to deploy Gemini Enterprise agents across 75,000 employees. This marks a shift from 'AI pilots' to fully autonomous agentic ecosystems handling drug R&D and predictive manufacturing.",
        url: "https://itbrief.com.au/story/merck-signs-usd-1-billion-ai-deal-with-google-cloud", 
        date: "2026-04-25" 
    },
    { 
        title: "OpenAI Launches GPT-5.5 (Agentic Era)", 
        brief: "OpenAI officially rolled out GPT-5.5 today, optimized for autonomous workflow execution. It features a 1M token context window and advanced 'Computer Use' capabilities to navigate enterprise software independently.",
        url: "https://m.economictimes.com/magazines/panache/openai-aunches-gpt-5-5-with-api-pricing-starting-at-5-per-1-million-tokens/articleshow/130485887.cms", 
        date: "2026-04-25" 
    },
    { 
        title: "DeepSeek V4-Pro: 1.6T MoE Model", 
        brief: "Released yesterday, V4-Pro matches GPT-5.4 benchmarks in coding. Its Mixture-of-Experts architecture significantly lowers the barrier for high-tier reasoning on local Mac/Docker infrastructure.",
        url: "https://www.taipeitimes.com/News/biz/archives/2026/04/25/2003856189", 
        date: "2026-04-24" 
    },
    { 
        title: "Stanford AI Index: The Performance Gap", 
        brief: "The 2026 report confirms that the performance lead of US models over China (DeepSeek/Z.ai) has almost entirely evaporated in expert-level software engineering and logical reasoning benchmarks.",
        url: "https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report", 
        date: "2026-04-24" 
    }
];

let tabs = JSON.parse(localStorage.getItem('aiNews_v9')) || [
    { id: "news-tab-001", title: "Latest AI news", active: true, rows: latestNews }
];

function cleanAndSort(tab) {
    tab.rows.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (tab.rows.length > 4) tab.rows = tab.rows.slice(0, 4);
    if (tab.rows.length === 0) tab.rows = [...latestNews];
}

function render() {
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
                    <h2 style="margin:0; color:#0369a1;">Executive Dashboard</h2>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th class="col-title">Headline</th>
                            <th class="col-brief">Brief Insight</th>
                            <th class="col-icon">Link</th>
                            <th class="col-date">Date</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
            `;
            tabContent.appendChild(wrapper);
            renderRows(tab);
        }
    });
    localStorage.setItem('aiNews_v9', JSON.stringify(tabs));
}

function renderRows(tab) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    tab.rows.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="col-title"><input type="text" value="${row.title}" oninput="updateCell('${tab.id}', ${index}, 'title', this.value)"></td>
            <td class="col-brief"><textarea oninput="updateCell('${tab.id}', ${index}, 'brief', this.value)">${row.brief || ''}</textarea></td>
            <td class="col-icon">
                <a href="${row.url}" target="_blank" class="icon-link" title="Open Source">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </td>
            <td class="col-date"><input type="date" value="${row.date}" onchange="updateCell('${tab.id}', ${index}, 'date', this.value)"></td>
        `;
        tbody.appendChild(tr);
    });
}

window.updateCell = (id, idx, field, val) => {
    const tab = tabs.find(t => t.id === id);
    tab.rows[idx][field] = val;
    if (field === 'date') render(); 
    else localStorage.setItem('aiNews_v9', JSON.stringify(tabs));
};

window.setActive = (id) => {
    tabs.forEach(t => t.active = (t.id === id));
    render();
};

render();
