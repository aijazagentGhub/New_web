let tabCount = 1;
let activeTabId = 1;
let tabNames = {}; // Store custom tab names

// Initialize with first tab
document.addEventListener('DOMContentLoaded', function() {
    createTab();
    document.getElementById('addTabBtn').addEventListener('click', createTab);
    createRenameModal();
});

function createTab() {
    tabCount++;
    const tabId = tabCount;
    const defaultName = `Tab ${tabId}`;
    tabNames[tabId] = defaultName;
    
    // Create tab button container
    const tabBtnContainer = document.createElement('div');
    tabBtnContainer.className = 'tab-btn-container';
    tabBtnContainer.id = `tab-btn-${tabId}`;
    
    // Create tab button
    const tabBtn = document.createElement('button');
    tabBtn.className = 'tab-btn active';
    tabBtn.id = `btn-${tabId}`;
    tabBtn.innerHTML = `<span class="tab-name">${defaultName}</span>`;
    tabBtn.onclick = (e) => {
        if (e.target.closest('.tab-action-btn')) return;
        switchTab(tabId);
    };
    
    // Create action buttons container
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'tab-actions';
    
    // Rename button
    const renameBtn = document.createElement('button');
    renameBtn.className = 'tab-action-btn rename-btn';
    renameBtn.title = 'Rename tab';
    renameBtn.innerHTML = '✎';
    renameBtn.onclick = (e) => {
        e.stopPropagation();
        renameTab(tabId);
    };
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'tab-action-btn delete-btn';
    deleteBtn.title = 'Delete tab';
    deleteBtn.innerHTML = '×';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        closeTab(tabId);
    };
    
    actionsContainer.appendChild(renameBtn);
    actionsContainer.appendChild(deleteBtn);
    
    tabBtn.appendChild(actionsContainer);
    tabBtnContainer.appendChild(tabBtn);
    document.getElementById('tabButtons').appendChild(tabBtnContainer);
    
    // Create tab content
    const tabPane = document.createElement('div');
    tabPane.id = 'tab-' + tabId;
    tabPane.className = 'tab-pane active';
    tabPane.innerHTML = `
        <h2>${defaultName}</h2>
        <p>Welcome to ${defaultName}! This is your new page. Each tab has independent content.</p>
        
        <form>
            <input type="text" placeholder="Enter your name" required>
            <input type="email" placeholder="Enter your email" required>
            <textarea placeholder="Enter your message"></textarea>
            <button type="button" class="submit-btn" onclick="event.preventDefault(); alert('Message submitted!')">Submit</button>
        </form>
    `;
    
    document.getElementById('tabContent').appendChild(tabPane);
    
    // Deactivate all other tabs
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
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
    const tabPane = document.getElementById('tab-' + tabId);
    const tabBtn = document.getElementById(`btn-${tabId}`);
    
    if (tabPane) tabPane.classList.add('active');
    if (tabBtn) tabBtn.classList.add('active');
    
    activeTabId = tabId;
}

// Create rename modal dialog
function createRenameModal() {
    const modalHTML = `
        <div id="renameModal" class="rename-modal">
            <div class="rename-modal-content">
                <div class="rename-modal-header">
                    <h3>Rename Tab</h3>
                    <button class="rename-modal-close" onclick="closeRenameModal()">×</button>
                </div>
                <div class="rename-modal-body">
                    <label for="renameInput">Enter new tab name:</label>
                    <input type="text" id="renameInput" class="rename-input" placeholder="Type new name..." maxlength="20">
                    <div class="rename-character-count">
                        <span id="charCount">0</span>/20 characters
                    </div>
                </div>
                <div class="rename-modal-footer">
                    <button class="rename-btn-cancel" onclick="closeRenameModal()">Cancel</button>
                    <button class="rename-btn-save" onclick="saveRename()">Save</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add character counter
    const input = document.getElementById('renameInput');
    input.addEventListener('input', function() {
        document.getElementById('charCount').textContent = this.value.length;
    });
    
    // Allow Enter key to save
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveRename();
        }
    });
}

// Open rename modal
function renameTab(tabId) {
    const currentName = tabNames[tabId] || `Tab ${tabId}`;
    const input = document.getElementById('renameInput');
    
    input.value = currentName;
    input.focus();
    input.select();
    document.getElementById('charCount').textContent = currentName.length;
    
    // Store current tab ID for saving
    window.currentRenameTabId = tabId;
    
    // Show modal
    document.getElementById('renameModal').classList.add('show');
}

// Save renamed tab
function saveRename() {
    const tabId = window.currentRenameTabId;
    const newName = document.getElementById('renameInput').value.trim();
    
    if (newName === '') {
        alert('Tab name cannot be empty!');
        return;
    }
    
    if (newName.length > 20) {
        alert('Tab name must be 20 characters or less!');
        return;
    }
    
    // Update tab name
    tabNames[tabId] = newName;
    
    // Update tab button
    const tabBtn = document.getElementById(`btn-${tabId}`);
    if (tabBtn) {
        const nameSpan = tabBtn.querySelector('.tab-name');
        if (nameSpan) nameSpan.textContent = newName;
    }
    
    // Update tab content heading
    const tabPane = document.getElementById('tab-' + tabId);
    if (tabPane) {
        const heading = tabPane.querySelector('h2');
        if (heading) heading.textContent = newName;
        
        // Update welcome text
        const para = tabPane.querySelector('p');
        if (para) para.textContent = `Welcome to ${newName}! This is your new page. Each tab has independent content.`;
    }
    
    closeRenameModal();
}

// Close rename modal
function closeRenameModal() {
    document.getElementById('renameModal').classList.remove('show');
    document.getElementById('renameInput').value = '';
    document.getElementById('charCount').textContent = '0';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('renameModal');
    if (e.target === modal) {
        closeRenameModal();
    }
});

function closeTab(tabId) {
    const tabPane = document.getElementById('tab-' + tabId);
    const tabBtnContainer = document.getElementById(`tab-btn-${tabId}`);
    
    // Prevent closing if only one tab remains
    const totalTabs = document.querySelectorAll('.tab-pane').length;
    if (totalTabs <= 1) {
        alert('You must keep at least one tab open!');
        return;
    }
    
    // Remove tab
    if (tabPane) tabPane.remove();
    if (tabBtnContainer) tabBtnContainer.remove();
    
    // Remove from tabNames object
    delete tabNames[tabId];
    
    // If closed tab was active, activate another tab
    if (activeTabId === tabId) {
        const firstTabBtn = document.querySelector('.tab-btn');
        if (firstTabBtn) {
            const nextTabId = parseInt(firstTabBtn.id.replace('btn-', ''));
            switchTab(nextTabId);
        }
    }
}
