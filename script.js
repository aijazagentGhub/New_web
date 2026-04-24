const newsGrid = document.getElementById('newsGrid');
const toolsGrid = document.getElementById('toolsGrid');
const exportBtn = document.getElementById('exportBtn');

// TOP 6 NEWS FOR APRIL 25, 2026
const newsData = [
    { title: "Merck Signs $1B AI Deal", brief: "Merck officially partnered with Google Cloud today to deploy Gemini Enterprise across R&D and manufacturing. The deal involves 75,000 employees and focuses on autonomous R&D agents.", url: "https://itbrief.com.au/story/merck-signs-usd-1-billion-ai-deal-with-google-cloud", date: "2026-04-25" },
    { title: "XPENG 'Physical AI' Ecosystem", brief: "At Auto China 2026 today, XPENG unveiled the GX Robotaxi and IRON humanoid robot. Powered by Turing chips (3,000 TOPS), it marks a shift to end-to-end autonomous urban robotics.", url: "https://www.manilatimes.net/2026/04/25/tmt-newswire/pr-newswire/ai-transforms-the-world-xpeng-showcases-its-full-stack-physical-ai-ecosystem-at-auto-china-2026/2328312", date: "2026-04-25" },
    { title: "Anthropic 'Mythos' Bank Alert", brief: "Emergency security audits are underway in the BFSI sector following reports that Anthropic's 'Mythos' model can autonomously exploit legacy banking protocols and mainframe bugs.", url: "https://www.livemint.com/news/india/anthropic-mythos-security-alert-2026", date: "2026-04-25" },
    { title: "Tesla $25B AI Infrastructure", brief: "Tesla confirmed it is scaling capital expenditure to $25B by year-end. The spend is focused entirely on the Dojo supercomputer and humanoid production lines in Texas and China.", url: "https://enterpriseai.economictimes.indiatimes.com/news/industry/teslas-bold-25-billion-investment-plan", date: "2026-04-24" },
    { title: "Nvidia Rolls Out Codex Agent", brief: "Nvidia began the global rollout of its OpenAI-powered Codex agents to all employees today, aiming to automate 40% of internal engineering workflows and software testing by year-end.", url: "https://m.economictimes.com/tech/artificial-intelligence/nvidia-rolls-out-openais-codex", date: "2026-04-24" },
    { title: "AI Engineering Surge in India", brief: "LinkedIn reported a 60% Y-O-Y jump in AI engineering roles in India today. Bengaluru and Hyderabad remain the primary hubs as demand shifts from pilot programs to full-scale execution.", url: "https://ianslive.in/ai-engineering-hiring-in-india-jumps-595-pc-as-demand-spreads-beyond-metros", date: "2026-04-24" }
];

// TOP AI TOOLS (Tab 2)
const toolsData = [
    { name: "Claude 4.5 Opus", usage: "Exceptional for long-form analysis, complex BFSI reasoning, and policy drafting. Zero-hallucination research mode.", type: "LLM / Reasoning" },
    { name: "Cursor AI", usage: "An IDE designed for senior engineers. It maps entire codebases to suggest refactors and automate repetitive boilerplate.", type: "Development" },
    { name: "n8n (Agentic)", usage: "Self-hosted automation for building AI agents that manage Jira, Slack, and email while keeping data on-premise.", type: "Automation" },
    { name: "Perplexity Deep Research", usage: "Generates 20-page market intelligence reports with live citations. Essential for tech leadership research.", type: "Intelligence" },
    { name: "v0 by Vercel", usage: "Generates high-fidelity UI components from text. Best for Product Owners building rapid prototypes for stakeholders.", type: "UI/UX" },
    { name: "Fathom AI", usage: "Auto-records meetings and generates action items. Essential for Lead Scrum Masters to track sprint commits.", type: "Productivity" }
];

function renderAll() {
    newsGrid.innerHTML = newsData.map(item => `
        <article class="card">
            <div><h2 class="card-title">${item.title}</h2><p class="card-brief">${item.brief}</p></div>
            <div class="card-footer"><span class="date-badge">${item.date}</span><a href="${item.url}" target="_blank" class="btn-view">READ ↗</a></div>
        </article>
    `).join('');

    toolsGrid.innerHTML = toolsData.map(tool => `
        <article class="card">
            <div>
                <span class="type-tag">${tool.type}</span>
                <h2 class="card-title" style="margin-top:10px;">${tool.name}</h2>
                <p class="card-brief">${tool.usage}</p>
            </div>
            <div class="card-footer"><button class="btn-view" style="width:100%">LAUNCH TOOL</button></div>
        </article>
    `).join('');
}

window.switchTab = (tabName) => {
    document.querySelectorAll('.tab-content, .tab-link').forEach(el => el.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    // Find button based on onclick text
    Array.from(document.querySelectorAll('.tab-link')).find(btn => btn.innerText.toLowerCase().includes(tabName)).classList.add('active');
    exportBtn.style.display = tabName === 'news' ? 'block' : 'none';
};

window.addNewTab = () => {
    const tabName = prompt("Enter Name for New Data Stream:");
    if (tabName) {
        const btn = document.createElement('button');
        btn.className = 'tab-link';
        btn.innerText = tabName;
        btn.onclick = () => {
            document.querySelectorAll('.tab-content, .tab-link').forEach(el => el.classList.remove('active'));
            document.getElementById('dynamicTab').classList.add('active');
            btn.classList.add('active');
            exportBtn.style.display = 'none';
        };
        document.getElementById('tabBar').insertBefore(btn, document.getElementById('addTabBtn'));
    }
};

exportBtn.onclick = () => {
    const csv = [["Brief", "URL", "Date"], ...newsData.map(i => [`"${i.brief}"`, i.url, i.date])].map(e => e.join(",")).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `AI_News_Export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
};

renderAll();
