const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');

// Load tabs from browser memory or start with one default tab
let tabs = JSON.parse(localStorage.getItem('myPersistentTabs')) || [
    { id: Date.now(), title: "Tab 1", active: true }
];

// Function to save the current state to memory
function saveToMemory() {
    localStorage.setItem('myPersistentTabs', JSON.stringify(tabs));
}

// Function to update the UI
function render() {
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';

    tabs.forEach((tab) => {
        // 1. Create the button element
        const btn = document.createElement('div');
        btn.className = `tab-item ${tab.active ? 'active' : ''}`;
        btn.innerHTML = `
            <span onclick="setActive(${tab.id})">${tab.title}</span>
            <span class="close-btn" onclick="removeTab(event, ${tab.id})">×</span>
        `;
        tabButtons.appendChild(btn);

        // 2. Create the content area (only for the active tab)
        if (tab.active) {
            tabContent.innerHTML = `
                <h2>${tab.title}</h2>
                <p>Welcome to ${tab.title}! This content is now saved.</p>
                <input type="text" placeholder="Enter your name" class="input-field">
                <input type="email" placeholder="Enter your email" class="input-field">
                <textarea placeholder="Enter your message" class="input-field"></textarea>
                <button class="submit-btn">Submit</button>
            `;
        }
    });

    saveToMemory();
}

// Logic to add a new tab
addTabBtn.onclick = () => {
    tabs.forEach(t => t.active = false);
    const newId = Date.now();
    tabs.push({
        id: newId,
        title: `Tab ${tabs.length + 1}`,
        active: true
    });
    render();
};

// Logic to switch tabs
window.setActive = (id) => {
    tabs.forEach(t => t.active = (t.id === id));
    render();
};

// Logic to delete a tab
window.removeTab = (event, id) => {
    event.stopPropagation(); // Prevents switching to the tab while deleting
    if (tabs.length === 1) return; // Keep at least one tab
    
    tabs = tabs.filter(t => t.id !== id);
    
    // If we deleted the active one, make the first one active
    if (!tabs.find(t => t.active)) {
        tabs[0].active = true;
    }
    render();
};

// Initial run
render();
