const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');

// VERIFIED NEWS: APRIL 25, 2026
const liveNewsFeed = [
    { 
        title: "Anthropic 'Mythos' Banking Alert", 
        brief: "India's Finance Minister issued an urgent directive to banks today regarding Anthropic's unreleased 'Mythos' model. The model can autonomously exploit 27-year-old software bugs, posing an unprecedented systemic risk to financial infrastructure.",
        url: "https://www.indiatoday.in/technology/news/story/finance-minister-nirmala-sitharaman-raises-alarm-on-bank-security-risk-due-to-anthropic-mythos-ai-2900767-2026-04-24", 
        date: "2026-04-25" 
    },
    { 
        title: "XPENG Unveils Physical AI Ecosystem", 
        brief: "At Auto China 2026 today, XPENG debuted its full-stack Physical AI strategy, including the GX Robotaxi and IRON humanoid robot. The ecosystem is powered by Turing chips delivering 3,000 TOPS for end-to-end autonomous mobility.",
        url: "https://www.xpeng.com/news/019dbfbdbc669c0960ee8a028129064c", 
        date: "2026-04-25" 
    },
    { 
        title: "Meta & Microsoft: AI Capital Reallocation", 
        brief: "Meta (10% staff cut) and Microsoft (voluntary buyouts) announced massive workforce restructuring today. The goal is to trim operational overhead to fund the projected $135B+ annual spend on AI data centers.",
        url: "https://www.straitstimes.com/business/companies-markets/meta-microsoft-plan-cuts-buyouts-that-may-affect-23000-jobs-amid-ai-push", 
        date: "2026-04-25" 
    },
    { 
        title: "OpenAI GPT-5.5: The Agentic Standard", 
        brief: "OpenAI officially released GPT-5.5 system cards. Optimized for real-world autonomous work, it features a 1M context window and advanced 'Computer Use' tools to perform complex tasks across enterprise software independently.",
        url: "https://openai.com/index/gpt-5-5-system-card/", 
        date: "2024-04-24" 
    }
];

let tabs = JSON.parse(localStorage.getItem('aiNews_v11')) || [
    { id: "news-tab-001", title: "Latest AI news", active: true, rows: liveNewsFeed }
];

function cleanAndSort(tab) {
    tab.rows.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (tab.rows.length > 4) tab.rows = tab.rows.slice(0, 4);
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
                <h2 style="color:#0369a1; margin-bottom: 20px;">Executive Intelligence Feed</h2>
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
    localStorage.setItem('aiNews_v11', JSON.stringify(tabs));
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
                <a href="${row.url}" target="_blank" class="icon-link">
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
    else localStorage.setItem('aiNews_v11', JSON.stringify(tabs));
};

window.setActive = (id) => {
    tabs.forEach(t => t.active = (t.id === id));
    render();
};

render();
