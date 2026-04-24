const newsGrid = document.getElementById('newsGrid');
const exportBtn = document.getElementById('exportBtn');

// TOP 6 VERIFIED NEWS FOR APRIL 25, 2026
const pulseData = [
    { 
        title: "Anthropic 'Mythos' Banking Lockdown", 
        brief: "Breaking: Major Indian banks are undergoing emergency security audits after reports that Anthropic's 'Mythos' model can autonomously find and exploit vulnerabilities in 20-year-old banking legacy systems.",
        url: "https://www.livemint.com/news/india/anthropic-mythos-banking-threat-2026", 
        date: "2026-04-25" 
    },
    { 
        title: "Nvidia Hits $5T Market Cap", 
        brief: "Nvidia shares surged 5% today, pushing the valuation back above $5 trillion. Demand for 'Blackwell-Ultra' chips for video-to-video generation remains the primary market driver.",
        url: "https://m.economictimes.com/news/international/us/nvda-stock-nvidia-hits-5-trillion", 
        date: "2026-04-25" 
    },
    { 
        title: "Meta & Microsoft AI Restructuring", 
        brief: "Meta (10% cut) and Microsoft (voluntary buyouts) announced significant workforce reductions today to offset multi-billion dollar capital expenditure on AI infrastructure.",
        url: "https://www.taipeitimes.com/News/biz/archives/2026/04/25/2003856188", 
        date: "2026-04-25" 
    },
    { 
        title: "XPENG GX Robotaxi & Humanoid Launch", 
        brief: "At Auto China 2026, XPENG unveiled its 'Physical AI' ecosystem. The GX Robotaxi and IRON humanoid are powered by Turing chips, marking a shift toward autonomous urban robotics.",
        url: "https://www.xpeng.com/news-auto-china-2026", 
        date: "2026-04-25" 
    },
    { 
        title: "Adobe's Agentic Creative Cloud", 
        brief: "Adobe revealed its 'Agentic' suite today. These new agents can autonomously manage entire marketing campaign workflows from asset creation to distribution.",
        url: "https://www.computerworld.com/article/adobe-bets-on-ai-agents", 
        date: "2026-04-24" 
    },
    { 
        title: "Merck Signs $1B Deal with Google", 
        brief: "Merck (MSD) signed a $1B deal to deploy Gemini Enterprise agents across 75,000 employees to handle R&D and autonomous commercial operations.",
        url: "https://itbrief.com.au/story/merck-signs-usd-1-billion-ai-deal-with-google-cloud", 
        date: "2026-04-24" 
    }
];

function renderPulse() {
    newsGrid.innerHTML = '';
    const sortedNews = pulseData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    sortedNews.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div>
                <h2 class="card-title">${item.title}</h2>
                <p class="card-brief">${item.brief}</p>
            </div>
            <div class="card-footer">
                <span class="date-badge">${item.date}</span>
                <a href="${item.url}" target="_blank" class="btn-view">SOURCE ↗</a>
            </div>
        `;
        newsGrid.appendChild(card);
    });
}

// CSV EXPORT LOGIC
exportBtn.onclick = () => {
    const csvRows = [
        ["Brief", "URL", "Date"], // Header
        ...pulseData.map(item => [
            `"${item.brief.replace(/"/g, '""')}"`, 
            item.url, 
            item.date
        ])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `AI_News_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

renderPulse();
