
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
        if (pageId === 'auth' || pageId === 'workspace') {
            footer.style.display = 'none';
        } else {
            footer.style.display = 'block';
        }

        // Smooth viewport repositioning back to surface tracking coordinates
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- 2. AUTH CARD SWITCHER LAYER LATCH ---
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

    // --- 3. GATEWAY ROUTE HANDLER (Launches UI Identity mapping) ---
    // Global tracking states for local persistent UI updates
    let chosenAvatar = "🦊"; 
    let runtimeUsername = "Guest_Agent";

    // Setup Event Tracking on the Auth Portal Account Creation Grid
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
        
        // Dynamically pull chosen or input identity profiles from text forms
        if (mode === 'register') {
            runtimeUsername = document.getElementById('reg-username').value || "Agent_Node";
        } else {
            runtimeUsername = document.getElementById('login-username').value || "Agent_Node";
        }

        // Run UI Data Sync to setup workspace components before transition
        syncWorkspaceIdentity();

        // Launch direct portal route straight into Page 2 (The Interactive Workspace Hub)
        showPage('workspace');
    }

    // --- 4. INDEPENDENT CLIENT-SIDE WORKSPACE CORE ENGINE (Page 2 Features) ---
    
    // Function to propagate settings across all three columns
    function syncWorkspaceIdentity() {
        // Left Column Input Parameter Configuration
        const wsInputName = document.getElementById('ws-display-username');
        if (wsInputName) wsInputName.value = runtimeUsername;

        // Center Column Presence Canvas Coordinate Node Update
        const userMapNode = document.getElementById('user-map-node');
        if (userMapNode) {
            userMapNode.textContent = chosenAvatar;
            // Add a swift visual entry pulse effect to the center map node
            userMapNode.style.transform = 'translate(-50%, -50%) scale(1.3)';
            setTimeout(() => { userMapNode.style.transform = 'translate(-50%, -50%) scale(1)'; }, 250);
        }

        // Right Column Channel Registry Node Update
        const rosterYou = document.getElementById('ws-roster-you');
        if (rosterYou) rosterYou.textContent = `${chosenAvatar} ${runtimeUsername}`;

        // Ensure Left Column internal modifier cell asset selection highlights accurately
        const wsAvatarCells = document.querySelectorAll('.ws-avatar-cell');
        wsAvatarCells.forEach(cell => {
            if (cell.getAttribute('data-avatar') === chosenAvatar) {
                cell.classList.add('active');
            } else {
                cell.classList.remove('active');
            }
        });
    }

    // Left Column Element Event Handlers: Dynamic In-App Avatar Swapper
    const wsAvatarCells = document.querySelectorAll('.ws-avatar-cell');
    wsAvatarCells.forEach(cell => {
        cell.addEventListener('click', function() {
            // Drop styling focus on alternate elements
            wsAvatarCells.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Re-assign persistent memory values to match structural targets
            chosenAvatar = this.getAttribute('data-avatar');
            
            // Execute real-time UI synchronization across map canvas and meta data block arrays
            syncWorkspaceIdentity();
        });
    });

    // Right Column Element Event Handlers: Crypto Password Secret Unmask Layer
    function togglePassVisibility() {
        const passInput = document.getElementById('ws-room-pass');
        const viewToggleBtn = document.querySelector('.btn-toggle-view');
        
        if (passInput) {
            if (passInput.type === 'password') {
                passInput.type = 'text';
                viewToggleBtn.textContent = '🙈'; // Switch icon element state indicators
            } else {
                passInput.type = 'password';
                viewToggleBtn.textContent = '👁️';
            }
        }
    }
