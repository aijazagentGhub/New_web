const newsGrid = document.getElementById('newsGrid');

// LATEST NEWS AS OF APRIL 25, 2026
const liveNews = [
    { 
        title: "Anthropic 'Mythos' Banking Emergency", 
        brief: "The Indian Finance Ministry held high-level talks today regarding Anthropic's 'Mythos' model. The AI demonstrates an ability to bypass legacy security protocols in BFSI systems, necessitating an immediate infrastructure audit.",
        url: "https://www.livemint.com/news/india/anthropic-mythos-threat-finance-ministry-banking-security-11714022400000.html", 
        date: "2026-04-25" 
    },
    { 
        title: "XPENG Auto China: The Robot Era", 
        brief: "XPENG stunned the Auto China 2026 crowd today with the GX Robotaxi and IRON humanoid. Driven by the VLA 2.0 system, XPENG is pivoting toward a total Physical AI ecosystem for autonomous urban living.",
        url: "https://www.xpeng.com/news-2026-auto-china", 
        date: "2026-04-25" 
    },
    { 
        title: "Meta & Microsoft: Capital Shift", 
        brief: "Tech giants are slashing thousands of roles this week to redirect billions toward massive AI data centers. This restructuring reflects the industry's move from 'experimental AI' to 'infrastructure-first' economics.",
        url: "https://www.bloomberg.com/news/meta-microsoft-restructuring-2026", 
        date: "2026-04-25" 
    },
    { 
        title: "OpenAI GPT-5.5 Official Launch", 
        brief: "OpenAI's latest model is now live, featuring a native 'Agentic Layer' that allows the AI to navigate and control complex enterprise software suites without human middleware. This is the era of the autonomous worker.",
        url: "https://openai.com/blog/gpt-5-5-release", 
        date: "2026-04-24" 
    }
];

function renderDashboard(news) {
    newsGrid.innerHTML = '';
    news.forEach(item => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <div class="card-title">${item.title}</div>
            <div class="card-brief">${item.brief}</div>
            <div class="card-footer">
                <span class="card-date">${item.date}</span>
                <a href="${item.url}" target="_blank" class="btn-neon">READ ↗</a>
            </div>
        `;
        newsGrid.appendChild(card);
    });
}

// Initial Render
renderDashboard(liveNews);
