// Expanded AI Toolset
const toolsData = [
    { name: "Gemini 1.5 Pro", usage: "ENTERPRISE: Massive 2M token context window for analyzing entire codebases or long banking regulations.", category: "LLMs", isNew: true },
    { name: "NotebookLM", usage: "RESEARCH: Grounding AI in your specific documents to create a private, expert source guide.", category: "Research", isNew: true },
    { name: "ChatGPT (o1-preview)", usage: "REASONING: Advanced problem-solving for complex logic, math, and architectural planning.", category: "LLMs", isNew: false },
    { name: "Claude 3.5 Sonnet", usage: "CODING/WRITING: Exceptional at nuanced coding tasks and human-like technical writing.", category: "Development", isNew: false },
    { name: "n8n", usage: "AUTOMATION: Workflow automation for connecting Agentic AI to your existing databases and APIs.", category: "Automation", isNew: false },
    { name: "Cursor AI", usage: "ENGINEERING: An AI-native IDE that understands your entire project structure for faster refactoring.", category: "Development", isNew: false },
    { name: "Perplexity", usage: "SEARCH: Real-time web-crawling for cited, accurate technical answers.", category: "Research", isNew: false },
    { name: "AnythingLLM", usage: "LOCAL RAG: Running document-based AI locally on your Mac for privacy and speed.", category: "Security/Local", isNew: false }
];

const newsData = [
    { title: "Anthropic 'Mythos' Bank Alert", brief: "Indian Finance Ministry issued emergency security protocols for BFSI. 'Mythos' models found capable of exploiting legacy mainframes.", url: "#", date: "2026-04-25" },
    { title: "Merck Signs $1B Gemini Deal", brief: "Merck officially deployed 75,000 Gemini agents today for autonomous R&D and predictive chemical manufacturing.", url: "#", date: "2026-04-25" },
    { title: "XPENG 'Physical AI' Launch", brief: "GX Robotaxi and IRON humanoid debuted today at Auto China 2026, featuring vision-language-action (VLA) navigation models.", url: "#", date: "2026-04-25" },
    { title: "Nvidia Hits $5.1T Cap", brief: "Nvidia valuation remains at record highs as global demand for Blackwell-Ultra 'Agentic Reasoning' hardware continues to surge.", url: "#", date: "2026-04-25" },
    { title: "OpenAI 'Action Engine'", brief: "The new GPT-5.5 features a native 'Action Engine' that allows the model to control enterprise OS interfaces for senior manager tasks.", url: "#", date: "2026-04-24" },
    { title: "DeepSeek V4-Pro Launch", brief: "Released yesterday, V4-Pro matches GPT-5.4 benchmarks while significantly lowering the barrier for local reasoning.", url: "#", date: "2026-04-24" }
];

function renderNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    grid.innerHTML = newsData.map(n => `
        <div class="news-card interactive">
            <div class="card-glow"></div>
            <span class="card-tag">NEW INSIGHT</span>
            <h2 class="card-title">${n.title}</h2>
            <p class="card-description">${n.brief}</p>
            <div class="card-footer">
                <span>${n.date}</span>
                <a href="${n.url}" class="view-btn">ANALYZE</a>
            </div>
        </div>
    `).join('');
}

function renderTools() {
    const hero = document.getElementById('latestToolRow');
    const list = document.getElementById('toolsCategorized');
    if (!hero || !list) return;

    // Show all tools marked as isNew in the hero section
    const newTools = toolsData.filter(t => t.isNew);
    hero.innerHTML = newTools.map(t => `
        <div class="hero-tool">
            <span class="new-label">JUST RELEASED</span>
            <h3>${t.name}</h3>
            <p>${t.usage}</p>
        </div>
    `).join('');

    const cats = [...new Set(toolsData.map(t => t.category))];
    list.innerHTML = cats.map(cat => `
        <div class="tool-section">
            <h3 class="section-title">${cat}</h3>
            <div class="mobile-scroll-table">
                <table class="tool-table">
                    ${toolsData.filter(t => t.category === cat).map(t => `
                        <tr>
                            <td width="35%"><strong>${t.name}</strong></td>
                            <td>${t.usage}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        </div>
    `).join('');
}

// Fixed switchTab for mobile
window.switchTab = (name, el) => {
    document.querySelectorAll('.tab-content, .tab-item').forEach(i => i.classList.remove('active'));
    document.getElementById(name + 'Tab').classList.add('active');
    el.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'}); // Better UX for mobile
};

document.addEventListener('DOMContentLoaded', () => {
    renderNews();
    renderTools();
});
