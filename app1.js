


function showPage(pageId) {
    document.querySelectorAll('.web-page').forEach(page => {
        page.style.display = 'none';
    });
 
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.style.display = 'flex';
    }
    

    const footer = document.getElementById('global-footer');
    if (footer) {
        if (pageId === 'auth' || pageId === 'workspace') {
            footer.style.display = 'none';
        } else {
            footer.style.display = 'block';
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


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


let currentStep = 1;
function nextStep(stepNumber) {

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

let chosenAvatar = "🦊"; 
const registrationAvatarCells = document.querySelectorAll('#register-card .avatar-cell');
const wsAvatarCells = document.querySelectorAll('.ws-avatar-cell');


registrationAvatarCells.forEach(cell => {
    cell.addEventListener('click', function() {
        registrationAvatarCells.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        chosenAvatar = this.getAttribute('data-avatar');
    });
});


wsAvatarCells.forEach(cell => {
    cell.addEventListener('click', function() {
        wsAvatarCells.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        
        const runtimeSelectedAvatar = this.getAttribute('data-avatar');
        
       
        const mapUserNode = document.getElementById('user-map-node');
        const listUserRoster = document.getElementById('ws-roster-you');
        
        if (mapUserNode) mapUserNode.textContent = runtimeSelectedAvatar;
        if (listUserRoster) {
            const currentUsername = document.getElementById('ws-display-username').value;
            listUserRoster.textContent = `${runtimeSelectedAvatar} ${currentUsername}`;
        }
    });
});


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

    const wsDisplayUser = document.getElementById('ws-display-username');
    const userMapNode = document.getElementById('user-map-node');
    const wsRosterYou = document.getElementById('ws-roster-you');

    if (wsDisplayUser) wsDisplayUser.value = usernameInput;
    if (userMapNode) userMapNode.textContent = chosenAvatar;
    if (wsRosterYou) wsRosterYou.textContent = `${chosenAvatar} ${usernameInput}`;


    wsAvatarCells.forEach(cell => {
        if (cell.getAttribute('data-avatar') === chosenAvatar) {
            cell.classList.add('active');
        } else {
            cell.classList.remove('active');
        }
    });

  
    window.location.href = "workspace.html";
}


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




window.openPrivateNode = function(nodeName, avatarIcon) {
    const mainHub = document.getElementById('main-application-hub');
    const privatePanel = document.getElementById('private-node-panel');
    const titleElement = document.getElementById('active-node-title');
    
    if (!mainHub || !privatePanel) return;

  
    mainHub.classList.add('chat-active');
    privatePanel.style.display = 'flex';
  
    if (titleElement) {
        titleElement.textContent = `${avatarIcon || ''} ${nodeName}`;
    }

    const chatStream = document.getElementById('chat-stream');
    if (chatStream) {
        chatStream.innerHTML = `<div class="system-log">[SYSTEM]: Secure peer-to-peer connection active with ${nodeName}. Zero footprint tracking engaged.</div>`;
    }
};
window.closePrivateNode = function() {
    const layoutHub = document.getElementById("main-application-hub");
    if (layoutHub) {
       
        layoutHub.classList.remove("chat-active");
    }
};


window.executeMessageSend = function() {
    const messageInput = document.getElementById("console-msg-input");
    const chatStream = document.getElementById("chat-stream");

    if (!messageInput || !chatStream) return;

    const cleanText = messageInput.value.trim();
    if (cleanText === "") return;

    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

   
    const userMessageHTML = `
        <div class="chat-row msg-you">
            <div class="msg-bubble">${cleanText}</div>
            <div class="msg-meta">YOU • ${timeStamp}</div>
        </div>
    `;

  
    chatStream.insertAdjacentHTML('beforeend', userMessageHTML);
    messageInput.value = "";
    
   
    chatStream.scrollTop = chatStream.scrollHeight;

   
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


window.enterGroupChat = function() {
    console.log("Global mesh network communication layer activated.");
    alert("Broadcasting network hub channel initializing...");
};
// ==========================================================================
// --- SPATIAL CORES SPLIT SCREEN VIEW ENGINE (GLOBAL SCOPE) ---
// ==========================================================================


window.openPrivateNode = function(nodeName, nodeAvatar) {
    const layoutHub = document.getElementById("main-application-hub");
    const consoleTitle = document.getElementById("active-node-title");
    const messageStream = document.getElementById("chat-stream");

    if (layoutHub) {

        layoutHub.classList.add("chat-active");
    }

    if (consoleTitle) {
    
        consoleTitle.innerText = `Friend: ${nodeAvatar} ${nodeName.toUpperCase()}`;
    }

    if (messageStream) {
        
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


window.closePrivateNode = function() {
    const layoutHub = document.getElementById("main-application-hub");
    if (layoutHub) {
       
        layoutHub.classList.remove("chat-active");
    }
};


window.executeMessageSend = function() {
    const messageInput = document.getElementById("console-msg-input");
    const chatStream = document.getElementById("chat-stream");

    if (!messageInput || !chatStream) return;

    const cleanText = messageInput.value.trim();
    if (cleanText === "") return;

    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  
    const userMessageHTML = `
        <div class="chat-row msg-you">
            <div class="msg-bubble">${cleanText}</div>
            <div class="msg-meta">YOU • ${timeStamp}</div>
        </div>
    `;

    
    chatStream.insertAdjacentHTML('beforeend', userMessageHTML);
    messageInput.value = "";
    
    
    chatStream.scrollTop = chatStream.scrollHeight;

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

window.enterGroupChat = function() {
    console.log("Global mesh network communication layer activated.");
    alert("Broadcasting network hub channel initializing...");
};
