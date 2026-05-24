
   
    function showPage(pageId) {
   
        document.querySelectorAll('.web-page').forEach(page => {
            page.style.display = 'none';
        });
        
     
        const targetPage = document.getElementById('page-' + pageId);
        if (targetPage) {
            targetPage.style.display = 'flex';
        }
        
      
        const footer = document.getElementById('global-footer');
        if (pageId === 'auth' || pageId === 'workspace') {
            footer.style.display = 'none';
        } else {
            footer.style.display = 'block';
        }

      
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

 
    function toggleAuth(view) {
        const loginCard = document.getElementById('login-card');
        const registerCard = document.getElementById('register-card');

        if (view === 'register') {
            loginCard.style.display = 'none';
            registerCard.style.display = 'block';
        } else {
            loginCard.style.display = 'block';
            registerCard.style.display = 'none';
        }
    }

    
    let chosenAvatar = "🦊"; 
    let runtimeUsername = "Guest_Agent";

    
    const authAvatarOptions = document.querySelectorAll('.avatar-option');
    authAvatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            authAvatarOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            chosenAvatar = option.getAttribute('data-avatar');
        });
    });

    function handleAuthSubmit(event, mode) {
        event.preventDefault(); 
        
      
        if (mode === 'register') {
            runtimeUsername = document.getElementById('reg-username').value || "Agent_Node";
        } else {
            runtimeUsername = document.getElementById('login-username').value || "Agent_Node";
        }

       
        syncWorkspaceIdentity();

        
        showPage('workspace');
    }


    function syncWorkspaceIdentity() {
 
        const wsInputName = document.getElementById('ws-display-username');
        if (wsInputName) wsInputName.value = runtimeUsername;

 
        const userMapNode = document.getElementById('user-map-node');
        if (userMapNode) {
            userMapNode.textContent = chosenAvatar;
         
            userMapNode.style.transform = 'translate(-50%, -50%) scale(1.3)';
            setTimeout(() => { userMapNode.style.transform = 'translate(-50%, -50%) scale(1)'; }, 250);
        }

      
        const rosterYou = document.getElementById('ws-roster-you');
        if (rosterYou) rosterYou.textContent = `${chosenAvatar} ${runtimeUsername}`;

       
        const wsAvatarCells = document.querySelectorAll('.ws-avatar-cell');
        wsAvatarCells.forEach(cell => {
            if (cell.getAttribute('data-avatar') === chosenAvatar) {
                cell.classList.add('active');
            } else {
                cell.classList.remove('active');
            }
        });
    }

    
    const wsAvatarCells = document.querySelectorAll('.ws-avatar-cell');
    wsAvatarCells.forEach(cell => {
        cell.addEventListener('click', function() {
           
            wsAvatarCells.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
           
            chosenAvatar = this.getAttribute('data-avatar');
            
            
            syncWorkspaceIdentity();
        });
    });


    function togglePassVisibility() {
        const passInput = document.getElementById('ws-room-pass');
        const viewToggleBtn = document.querySelector('.btn-toggle-view');
        
        if (passInput) {
            if (passInput.type === 'password') {
                passInput.type = 'text';
                viewToggleBtn.textContent = '🙈'; 
            } else {
                passInput.type = 'password';
                viewToggleBtn.textContent = '👁️';
            }
        }
    }
