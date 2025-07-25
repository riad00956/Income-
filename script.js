// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (!user && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Handle login functionality
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('loginError').textContent = 'Invalid email or password';
    }
});

// Handle registration
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = {
        name: document.getElementById('fullName').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        referral: document.getElementById('referral').value || null
    };
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
});

// Load profile data
function loadProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileMobile').textContent = user.mobile;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('profileReferral').textContent = user.referral || 'None';
        document.getElementById('dashboardUserName').textContent = user.name;
    }
}

// Logout functionality
document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    if (window.location.pathname.includes('profile.html') || 
        window.location.pathname.includes('dashboard.html')) {
        loadProfile();
    }
});
