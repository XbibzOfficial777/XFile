// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Check auth state
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        if (window.location.pathname.includes('index.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        // No user is signed in
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
    }
});

// Login Form
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const loginButton = loginForm.querySelector('button');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        loginButton.classList.add('loading');
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            // Redirect handled by auth state listener
        } catch (error) {
            alert(error.message);
            loginButton.classList.remove('loading');
        }
    });
}

// Register Link
if (document.getElementById('registerLink')) {
    document.getElementById('registerLink').addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Silakan isi email dan password terlebih dahulu');
            return;
        }
        
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('Akun berhasil dibuat! Silakan login');
            })
            .catch(error => {
                alert(error.message);
            });
    });
}

// Logout Button
if (document.getElementById('logoutButton')) {
    document.getElementById('logoutButton').addEventListener('click', () => {
        auth.signOut();
    });
}