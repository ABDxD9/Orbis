/**
 * ==========================================================================
 * ORBIS CORE APPLICATION INTERFACE MODULE ENGINE
 * ==========================================================================
 */

// --- 1. CORE VIEWPORT NAVIGATION ENGINE ---
function showPage(pageId) {
    // Hide all major workspace panels
    document.querySelectorAll('.web-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Target and manifest the selected section layer
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.style.display = 'flex';
    }
    
    // Hide structural layout footer automatically if entering an active application state
    const footer = document.getElementById('global-footer');
    if (footer) {
        if (pageId === 'auth' || pageId === 'workspace') {
            footer.style.display = 'none';
        } else {
            footer.style.display = 'block';
        }
    }

    // Smooth viewport repositioning back to surface tracking coordinates
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 2. AUTH CARD SWITCHER LAYER LATCH ---
function toggleAuth(view) {
    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');

    if (!loginCard || !registerCard) return;

    if (view === 'register') {
        loginCard.style.display = 'none';
        registerCard.style.display = 'block';
    } else {
        loginCard.style.display = 'block';
        registerCard.style.display = 'none';
    }
}

// --- 3. DYNAMIC REGISTRATION STEPPER INTERACTION ---
let currentStep = 1;
function nextStep(stepNumber) {
    // Hide all dynamic step blocks inside registration wrapper template bounds
    document.querySelectorAll('.step-content').forEach(step => {
        step.style.display = 'none';
    });

    const targetStep = document.getElementById(`step-${stepNumber}`);
    if (targetStep) {
        targetStep.style.display = 'block';
        currentStep = stepNumber;
    }
}

function prevStep(stepNumber) {
    document.querySelectorAll('.step-content').forEach(step => {
        step.style.display = 'none';
    });

    const targetStep = document.getElementById(`step-${stepNumber}`);
    if (targetStep) {
        targetStep.style.display = 'block';
        currentStep = stepNumber;
    }
}

// --- 4. IDENTITY MATRIX AVATAR SELECTION COMPONENT ---
let chosenAvatar = "🦊"; // System default fallback avatar identity state
const registrationAvatarCells = document.querySelectorAll('#register-card .avatar-cell');
const wsAvatarCells = document.querySelectorAll('.ws-avatar-cell');

// Bind interactions across authentication selection grid elements
registrationAvatarCells.forEach(cell => {
    cell.addEventListener('click', function() {
        registrationAvatarCells.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        chosenAvatar = this.getAttribute('data-avatar');
    });
});

// Bind interaction engines across Left Sidebar components directly inside running session hub view
wsAvatarCells.forEach(cell => {
    cell.addEventListener('click', function() {
        wsAvatarCells.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        
        const runtimeSelectedAvatar = this.getAttribute('data-avatar');
        
        // Dynamically shift visual projections on running interface nodes
        const mapUserNode = document.getElementById('user-map-node');
        const listUserRoster = document.getElementById('ws-roster-you');
        
        if (mapUserNode) mapUserNode.textContent = runtimeSelectedAvatar;
        if (listUserRoster) {
            const currentUsername = document.getElementById('ws-display-username').value;
            listUserRoster.textContent = `${runtimeSelectedAvatar} ${currentUsername}`;
        }
    });
});

// --- 5. SECURE PASSWORD EYE VIEW VISIBILITY TOGGLER ---
function togglePassVisibility() {
    const passInput = document.getElementById('ws-room-pass');
    const viewToggleBtn = document.querySelector('.password-display-wrapper .btn-toggle-view');
    
    if (passInput) {
        if (passInput.type === 'password') {
            passInput.type = 'text';
            if (viewToggleBtn) viewToggleBtn.textContent = '🙈';
        } else {
            passInput.type = 'password';
            if (viewToggleBtn) viewToggleBtn.textContent = '👁️';
        }
    }
}

// --- 6. UNIVERSAL GATEWAY ACCESS SUBMIT ROUTE DISPATCHER ---
function handleAuthSubmit(event, mode) {
    event.preventDefault(); 
    
    let usernameInput = "";
    if (mode === 'register') {
        const regField = document.getElementById('reg-username');
        usernameInput = regField ? regField.value : "Guest_Agent";
    } else {
        const loginField = document.getElementById('login-username');
        usernameInput = loginField ? loginField.value : "Guest_Agent";
    }

    // Provision identity fields into Workspace tracking cards on valid system access
    const wsDisplayUser = document.getElementById('ws-display-username');
    const userMapNode = document.getElementById('user-map-node');
    const wsRosterYou = document.getElementById('ws-roster-you');

    if (wsDisplayUser) wsDisplayUser.value = usernameInput;
    if (userMapNode) userMapNode.textContent = chosenAvatar;
    if (wsRosterYou) wsRosterYou.textContent = `${chosenAvatar} ${usernameInput}`;

    // Sync active state mappings inside Left Sidebar profile selectors to reflect choice
    wsAvatarCells.forEach(cell => {
        if (cell.getAttribute('data-avatar') === chosenAvatar) {
            cell.classList.add('active');
        } else {
            cell.classList.remove('active');
        }
    });

    // Auto-redirect router context straight into primary workspace dashboard view!
    // Force the browser to jump to your brand new separate page file instead:
    window.location.href = "workspace.html";
}

// --- 7. MANUAL PORTAL PRELOADER DISMISSAL ---
function dismissLoader() {
    const loader = document.getElementById("portal-loader");
    const homePage = document.getElementById("page-home");
    
    if (loader) loader.style.display = "none";
    if (homePage) {
        homePage.style.display = "flex";
        homePage.style.opacity = "1";
    }
    
    showPage('home');
    console.log("Portal dismissed manually via action click.");
}


/**
 * ==========================================================================
 * EXPOSED SPLIT VIEW MODE & PEER MESSAGE TRANSACTION HOOKS (GLOBAL SCOPE)
 * ==========================================================================
 */

// Handles shifting layout into a secure split chat window view and hides sidebars
// --- 3. SPATIAL INTERACTION & PRIVATE CHAT TERMINAL OVERLAYS ---
// --- 3. SPATIAL INTERACTION & PRIVATE CHAT TERMINAL OVERLAYS ---
window.openPrivateNode = function(nodeName, avatarIcon) {
    const mainHub = document.getElementById('main-application-hub');
    const privatePanel = document.getElementById('private-node-panel');
    const titleElement = document.getElementById('active-node-title');
    
    if (!mainHub || !privatePanel) return;

    // 1. Smoothly transition the grid layout to split screen
    mainHub.classList.add('chat-active');
    privatePanel.style.display = 'flex';
    
    // 2. Cleanly show JUST the person's avatar and name in the header
    if (titleElement) {
        titleElement.textContent = `${avatarIcon || ''} ${nodeName}`;
    }

    // 3. System alert feedback log
    const chatStream = document.getElementById('chat-stream');
    if (chatStream) {
        chatStream.innerHTML = `<div class="system-log">[SYSTEM]: Secure peer-to-peer connection active with ${nodeName}. Zero footprint tracking engaged.</div>`;
    }
};
// Disengages split-screen mode and smoothly opens details panels back into view
window.closePrivateNode = function() {
    const layoutHub = document.getElementById("main-application-hub");
    if (layoutHub) {
        // Removes active class, restoring sidebars and centering layout wheel
        layoutHub.classList.remove("chat-active");
    }
};

// Grabs values from input deck and appends messaging data structures to view stream
window.executeMessageSend = function() {
    const messageInput = document.getElementById("console-msg-input");
    const chatStream = document.getElementById("chat-stream");

    if (!messageInput || !chatStream) return;

    const cleanText = messageInput.value.trim();
    if (cleanText === "") return;

    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Build custom output bubble layout block
    const userMessageHTML = `
        <div class="chat-row msg-you">
            <div class="msg-bubble">${cleanText}</div>
            <div class="msg-meta">YOU • ${timeStamp}</div>
        </div>
    `;

    // Inject your text node block straight to the console view stream grid
    chatStream.insertAdjacentHTML('beforeend', userMessageHTML);
    messageInput.value = "";
    
    // Auto-scroll viewport down to keep pace with new lines
    chatStream.scrollTop = chatStream.scrollHeight;

    // Simulate safe connection trace bounce reply after 1 second delay
    setTimeout(function() {
        const structuralEchoHTML = `
            <div class="chat-row msg-them">
                <div class="msg-bubble">Node receipt confirmed. Safe packet stream dropped.</div>
                <div class="msg-meta">PEER • ${timeStamp}</div>
            </div>
        `;
        chatStream.insertAdjacentHTML('beforeend', structuralEchoHTML);
        chatStream.scrollTop = chatStream.scrollHeight;
    }, 1000);
};

// Global messaging broadcast route dispatcher placeholder
window.enterGroupChat = function() {
    console.log("Global mesh network communication layer activated.");
    alert("Broadcasting network hub channel initializing...");
};
// ==========================================================================
// --- SPATIAL CORES SPLIT SCREEN VIEW ENGINE (GLOBAL SCOPE) ---
// ==========================================================================

/**
 * Handles shifting layout into a secure split chat window view and hides sidebars
 */
window.openPrivateNode = function(nodeName, nodeAvatar) {
    const layoutHub = document.getElementById("main-application-hub");
    const consoleTitle = document.getElementById("active-node-title");
    const messageStream = document.getElementById("chat-stream");

    if (layoutHub) {
        // Adds the CSS class forcing left and right sidebars to collapse to 0px
        layoutHub.classList.add("chat-active");
    }

    if (consoleTitle) {
        // Updates encrypted header telemetry readout text dynamically
        consoleTitle.innerText = `Friend: ${nodeAvatar} ${nodeName.toUpperCase()}`;
    }

    if (messageStream) {
        // Resets text node buffer stream and drops secure connection logging feedback
        // Alternative innerHTML structure replacement check:
    }
const panelHeader = document.querySelector('.panel-header');
if (panelHeader) {
    panelHeader.innerHTML = `
        <span id="active-node-title" style="font-size: 18px; font-weight: 600; color: #ffffff; letter-spacing: normal;">
            ${avatarIcon || ''} ${nodeName}
        </span>
        <button class="btn-close-console" onclick="closePrivateNode()"> × </button>
    `;
;
    }
};

/**
 * Disengages split-screen mode and smoothly opens details panels back into view
 */
window.closePrivateNode = function() {
    const layoutHub = document.getElementById("main-application-hub");
    if (layoutHub) {
        // Removes active class, restoring sidebars and centering layout wheel
        layoutHub.classList.remove("chat-active");
    }
};

/**
 * Grabs values from input deck and appends messaging data structures to view stream
 */
window.executeMessageSend = function() {
    const messageInput = document.getElementById("console-msg-input");
    const chatStream = document.getElementById("chat-stream");

    if (!messageInput || !chatStream) return;

    const cleanText = messageInput.value.trim();
    if (cleanText === "") return;

    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Build custom output bubble layout block
    const userMessageHTML = `
        <div class="chat-row msg-you">
            <div class="msg-bubble">${cleanText}</div>
            <div class="msg-meta">YOU • ${timeStamp}</div>
        </div>
    `;

    // Inject your text node block straight to the console view stream grid
    chatStream.insertAdjacentHTML('beforeend', userMessageHTML);
    messageInput.value = "";
    
    // Auto-scroll viewport down to keep pace with new lines
    chatStream.scrollTop = chatStream.scrollHeight;

    // Simulate safe connection trace bounce reply after 1 second delay
    setTimeout(function() {
        const structuralEchoHTML = `
            <div class="chat-row msg-them">
                <div class="msg-bubble">Node receipt confirmed. Safe packet stream dropped.</div>
                <div class="msg-meta">PEER • ${timeStamp}</div>
            </div>
        `;
        chatStream.insertAdjacentHTML('beforeend', structuralEchoHTML);
        chatStream.scrollTop = chatStream.scrollHeight;
    }, 1000);
};

/**
 * Global messaging broadcast route dispatcher placeholder
 */
window.enterGroupChat = function() {
    console.log("Global mesh network communication layer activated.");
    alert("Broadcasting network hub channel initializing...");
};
