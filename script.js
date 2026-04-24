// Selecting elements from the DOM
const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');

// 1. Initialize Tabs: Load from LocalStorage or start with default
let tabs = JSON.parse(localStorage.getItem('myPersistentTabs')) || [
    { id: Date.now(), title: "Work Tab", active: true }
];

// 2. Save current state to LocalStorage
function saveToMemory() {
    localStorage.setItem('myPersistentTabs', JSON.stringify(tabs));
}

// 3. Render the UI
function render() {
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';

    tabs.forEach((tab) => {
        // Create the Tab Button element
        const btn = document.createElement('div');
        btn.className = `tab-item ${tab.active ? 'active' : ''}`;
        
        // Tab HTML structure with Title, Rename Icon, and Close Icon
        btn.innerHTML = `
            <span class="tab-title" onclick="setActive(${tab.id})">${tab.title}</span>
            <span class="rename-btn" title="Rename" onclick="renameTab(event, ${tab.id})">✎</span>
            <span class="close-btn" title="Delete" onclick="removeTab(event, ${tab.id})">×</span>
        `;
        tabButtons.appendChild(btn);

        // Create the Content Area (only displayed for the active tab)
        if (tab.active) {
            tabContent.innerHTML = `
                <h2>${tab.title}</h2>
                <p>Welcome! You can now rename this tab and it will be remembered.</p>
                <input type="text" placeholder="Enter your name" class="input-field">
                <input type="email" placeholder="Enter your email" class="input-field">
                <textarea placeholder="Enter your message" class="input-field" rows="4"></textarea>
                <button class="submit-btn">Submit</button>
            `;
        }
    });

    saveToMemory();
}

// 4. Function to Rename a Tab
window.renameTab = (event, id) => {
    event.stopPropagation(); // Stop the click from activating the tab
    const tabToRename = tabs.find(t => t.id === id);
    const newName = prompt("What would you like to name this tab?", tabToRename.title);
    
    if (newName !== null && newName.trim() !== "") {
        tabToRename.title = newName.trim();
        render();
    }
};

// 5. Function to Add a New Tab
addTabBtn.onclick = () => {
    // Set all existing tabs to inactive
    tabs.forEach(t => t.active = false);
    
    // Create new tab with unique ID
    const newId = Date.now();
    tabs.push({
        id: newId,
        title: `Tab ${tabs.length + 1}`,
        active: true
    });
    
    render();
};

// 6. Function to Switch Active Tab
window.setActive = (id) => {
    tabs.forEach(t => t.active = (t.id === id));
    render();
};

// 7. Function to Remove a Tab
window.removeTab = (event, id) => {
    event.stopPropagation();
    if (tabs.length === 1) {
        alert("You must have at least one tab open.");
        return;
    }
    
    tabs = tabs.filter(t => t.id !== id);
    
    // If the active tab was deleted, make the first one active
    if (!tabs.find(t => t.active)) {
        tabs[0].active = true;
    }
    
    render();
};

// Run the initial render on load
render();
