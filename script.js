// Selecting elements from the HTML
const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');

// This array will hold our tab data
let tabs = [];

// 1. Function to save tabs to the browser's memory
function saveToLocalStorage() {
    localStorage.setItem('myTabs', JSON.stringify(tabs));
}

// 2. Function to display the tabs on the screen
function renderTabs() {
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';

    tabs.forEach((tab, index) => {
        // Create the Tab Button
        const btn = document.createElement('div');
        btn.className = `tab-item ${tab.active ? 'active' : ''}`;
        btn.innerHTML = `
            <span onclick="setActive(${index})">${tab.title}</span>
            <span class="close-btn" onclick="deleteTab(event, ${index})">×</span>
        `;
        tabButtons.appendChild(btn);

        // Create the Tab Content Area
        if (tab.active) {
            const content = document.createElement('div');
            content.innerHTML = `
                <h2>${tab.title}</h2>
                <p>Welcome to ${tab.title}! This is your saved page.</p>
                <input type="text" placeholder="Enter your name" class="input-field">
                <input type="email" placeholder="Enter your email" class="input-field">
                <textarea placeholder="Enter your message" class="input-field"></textarea>
                <button class="submit-btn">Submit</button>
            `;
            tabContent.appendChild(content);
        }
    });
    
    saveToLocalStorage();
}

// 3. Logic to add a new tab
function addNewTab() {
    // Deactivate all existing tabs
    tabs.forEach(t => t.active = false);
    
    // Add the new tab
    const newId = tabs.length + 1;
    tabs.push({
        title: `Tab ${newId}`,
        active: true
    });
    
    renderTabs();
}

// 4. Logic to switch between tabs
window.setActive = function(index) {
    tabs.forEach(t => t.active = false);
    tabs[index].active = true;
    renderTabs();
};

// 5. Logic to delete a tab
window.deleteTab = function(event, index) {
    event.stopPropagation(); // Prevents clicking the tab when clicking "X"
    tabs.splice(index, 1);
    
    // If we deleted the active tab, make the first remaining one active
    if (tabs.length > 0) {
        const hasActive = tabs.some(t => t.active);
        if (!hasActive) tabs[0].active = true;
    }
    
    renderTabs();
};

// 6. INITIAL LOAD: Check browser memory when page opens
function init() {
    const saved = localStorage.getItem('myTabs');
    if (saved && JSON.parse(saved).length > 0) {
        tabs = JSON.parse(saved);
    } else {
        // Default first tab if memory is empty
        tabs = [{ title: 'Tab 1', active: true }];
    }
    renderTabs();
}

addTabBtn.addEventListener('click', addNewTab);
init();
