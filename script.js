const newsGrid = document.getElementById('newsGrid');

// TOP 6 NEWS FOR APRIL 25, 2026
const pulseData = [
    { 
        title: "Anthropic 'Mythos' Banking Lockdown", 
        brief: "Breaking: Major Indian banks are undergoing emergency security audits after reports that Anthropic's 'Mythos' model can autonomously find and exploit vulnerabilities in 20-year-old banking legacy systems. A major focal point for BFSI leaders today.",
        url: "https://www.livemint.com/news/india/anthropic-mythos-banking-threat-2026", 
        date: "2026-04-25" 
    },
    { 
        title: "Nvidia Hits $5T Market Cap (Again)", 
        brief: "Nvidia shares surged 5% today, pushing the valuation back above $5 trillion. Investors are rallying behind the massive demand for 'Blackwell-Ultra' chips required for the new wave of video-to-video AI generation.",
        url: "https://m.economictimes.com/news/international/us/nvda-stock-nvidia-hits-5-trillion", 
        date: "2026-04-25" 
    },
    { 
        title: "Meta & Microsoft Staff Trimming", 
        brief: "Meta confirmed a 10% workforce reduction today, while Microsoft offered voluntary buyouts to thousands. Both giants are aggressively pivoting capital from human headcount to AI data center energy infrastructure.",
        url: "https://www.taipeitimes.com/News/biz/archives/2026/04/25/2003856188", 
        date: "2026-04-25" 
    },
    { 
        title: "XPENG GX Robotaxi & Humanoid Launch", 
        brief: "At Auto China 2026, XPENG unveiled its 'Physical AI' ecosystem. The new GX Robotaxi and IRON humanoid are powered by Turing chips, marking a definitive shift toward end-to-end autonomous urban robotics.",
        url: "https://www.xpeng.com/news-auto-china-2026", 
        date: "2026-04-25" 
    },
    { 
        title: "Adobe's Agentic Marketing Suite", 
        brief: "Adobe revealed its 'Agentic Creative Cloud' today. Instead of just editing photos, these new agents can autonomously manage entire marketing campaign workflows from asset creation to distribution and tracking.",
        url: "https://www.computerworld.com/article/adobe-bets-on-ai-agents", 
        date: "2026-04-24" 
    },
    { 
        title: "Video-to-Video AI Revolution", 
        brief: "A new wave of V2V models launched this week, allowing creators to transform existing footage into hyper-realistic anime or 3D styles with zero temporal flicker—revolutionizing content creation for 2026.",
        url: "https://www.tbsnews.net/tech/2026-breakthrough-video-to-video-ai", 
        date: "2026-04-24" 
    }
];

function renderPulse() {
    newsGrid.innerHTML = '';
    // Sorting by date (Newest First) and slicing to Top 6
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

// Initial Run
renderPulse();
