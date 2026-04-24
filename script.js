const tabButtons = document.getElementById('tabButtons');
const tabContent = document.getElementById('tabContent');
const addTabBtn = document.getElementById('addTabBtn');

// Initialize with a table structure in the first tab
let tabs = JSON.parse(localStorage.getItem('myTableTabs')) || [
    { 
        id: Date.now(), 
        title: "Project Tracker", 
        active: true, 
        rows: [{ title: "", url: "", date: "" }] 
    }
];

function saveToMemory() {
    localStorage.setItem('myTableTabs', JSON.stringify(tabs));
}

function render() {
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';

    tabs.forEach((tab) => {
        // Render Tab Buttons
        const btn = document.createElement('div');
        btn.className = `tab-item ${tab.active ? 'active' : ''}`;
        btn.innerHTML = `
            <span onclick="setActive(${tab.id})">${tab.title}</span>
            <span style="cursor:pointer; font-size:12px;" onclick="renameTab(event, ${tab.id})">✎</span>
            <span style="cursor:pointer; margin-left:10px;" onclick="removeTab(event, ${tab.id})">×</span>
        `;
        tabButtons.appendChild(btn);

        // Render Content for Active Tab
        if (tab.active) {
            const container = document.createElement('div');
            container.innerHTML = `
                <h2>${tab.title}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Date</th>
                            <th style="width:50px"></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
                <div class="table-actions">
                    <button class="btn-add-row" onclick="addRow(${tab.id})">+ Add New Row</button>
                </div>
            `;
            tabContent.appendChild(container);
            renderRows(tab);
        }
    });
    saveToMemory();
}

function renderRows(tab) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    tab.rows.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${row.title}" oninput="updateRow(${tab.id}, ${index}, 'title', this.value)" placeholder="Task Name"></td>
            <td><input type="url" value="${row.url}" oninput="updateRow(${tab.id}, ${index}, 'url', this.value)" placeholder="https://..."></td>
            <td><input type="date" value="${row.date}" oninput="updateRow(${tab.id}, ${index}, 'date', this.value)"></td>
            <td><button class="btn-delete-row" onclick="deleteRow(${tab.id}, ${index})">×</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Actions
window.addRow = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    tab.rows.push({ title: "", url: "", date: "" });
    render();
};

window.updateRow = (tabId, rowIndex, field, value) => {
    const tab = tabs.find(t => t.id === tabId);
    tab.rows[rowIndex][field] = value;
    saveToMemory(); // Save immediately as user types
};

window.deleteRow = (tabId, rowIndex) => {
    const tab = tabs.find(t => t.id === tabId);
    tab.rows.splice(rowIndex, 1);
    render();
};

window.setActive = (id) => {
    tabs.forEach(t => t.active = (t.id === id));
    render();
};

window.renameTab = (event, id) => {
    event.stopPropagation();
    const tab = tabs.find(t => t.id === id);
    const newName = prompt("New name:", tab.title);
    if (newName) { tab.title = newName; render(); }
};

window.removeTab = (event, id) => {
    event.stopPropagation();
    if (tabs.length === 1) return;
    tabs = tabs.filter(t => t.id !== id);
    if (!tabs.find(t => t.active)) tabs[0].active = true;
    render();
};

addTabBtn.onclick = () => {
    tabs.forEach(t => t.active = false);
    tabs.push({ 
        id: Date.now(), 
        title: `Tab ${tabs.length + 1}`, 
        active: true, 
        rows: [{ title: "", url: "", date: "" }] 
    });
    render();
};

render();
