let tabCount = 1;
let activeTabId = 1;

// Initialize with first tab
document.addEventListener('DOMContentLoaded', function() {
    createTab();
    document.getElementById('addTabBtn').addEventListener('click', createTab);
});

function createTab() {
    tabCount++;
    const tabId = tabCount;
    
    // Create tab button
    const tabBtn = document.createElement('button');
    tabBtn.className = 'tab-btn' + (tabId === tabCount ? ' active' : '');
    tabBtn.innerHTML = `
        Tab ${tabId}
        <button class="close-tab" onclick="event.stopPropagation(); closeTab(${tabId})" title="Close tab">×</button>
    `;
    tabBtn.onclick = () => switchTab(tabId);
    
    document.getElementById('tabButtons').appendChild(tabBtn);
    
    // Create tab content
    const tabPane = document.createElement('div');
    tabPane.id = 'tab-' + tabId;
    tabPane.className = 'tab-pane active';
    tabPane.innerHTML = `
        <h2>Tab ${tabId} - New Page</h2>
        <p>Welcome to Tab ${tabId}! This is your new page. Each tab has independent content.</p>
        
        <form>
            <input type="text" placeholder="Enter your name" required>
            <input type="email" placeholder="Enter your email" required>
            <textarea placeholder="Enter your message"></textarea>
            <button type="button" style="background: #667eea; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: 600;">Submit</button>
        </form>
    `;
    
    document.getElementById('tabContent').appendChild(tabPane);
    
    // Deactivate all other tabs
    document.querySelectorAll('.tab-pane').forEach(pane => {
        if (pane.id !== 'tab-' + tabId) {
            pane.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    tabBtn.classList.add('active');
    activeTabId = tabId;
}

function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById('tab-' + tabId).classList.add('active');
    
    // Add active class to button
    event.target.classList.add('active');
    activeTabId = tabId;
}

function closeTab(tabId) {
    const tabPane = document.getElementById('tab-' + tabId);
    const tabBtn = document.querySelector(`[onclick*="switchTab(${tabId})"]`);
    
    // Prevent closing if only one tab remains
    const totalTabs = document.querySelectorAll('.tab-pane').length;
    if (totalTabs <= 1) {
        alert('You must keep at least one tab open!');
        return;
    }
    
    // Remove tab
    if (tabPane) tabPane.remove();
    if (tabBtn) tabBtn.remove();
    
    // If closed tab was active, activate another tab
    if (activeTabId === tabId) {
        const remainingBtn = document.querySelector('.tab-btn');
        if (remainingBtn) {
            remainingBtn.classList.add('active');
            const nextTabId = remainingBtn.innerHTML.match(/Tab (\d+)/)[1];
            document.getElementById('tab-' + nextTabId).classList.add('active');
            activeTabId = nextTabId;
        }
    }
}
