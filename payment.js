// Handle payment submission
document.getElementById('paymentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const payment = {
        method: document.getElementById('paymentMethod').value,
        amount: document.getElementById('amount').value,
        transactionId: document.getElementById('transactionId').value,
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    // Save to localStorage
    let payments = JSON.parse(localStorage.getItem('payments')) || [];
    payments.push(payment);
    localStorage.setItem('payments', JSON.stringify(payments));
    
    // Update balance
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.balance = (user.balance || 0) + parseFloat(payment.amount);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    alert('Payment submitted successfully!');
    window.location.href = 'dashboard.html';
});

// Handle withdrawal requests
document.getElementById('withdrawForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const withdrawal = {
        method: document.getElementById('withdrawMethod').value,
        number: document.getElementById('withdrawNumber').value,
        amount: document.getElementById('withdrawAmount').value,
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    // Save to localStorage
    let withdrawals = JSON.parse(localStorage.getItem('withdrawals')) || [];
    withdrawals.push(withdrawal);
    localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
    
    // Update balance
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.balance = (user.balance || 0) - parseFloat(withdrawal.amount);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    alert('Withdrawal request submitted!');
    window.location.href = 'dashboard.html';
});

// Load transactions
function loadTransactions() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    const withdrawals = JSON.parse(localStorage.getItem('withdrawals')) || [];
    
    // Combine and display transactions
    // Implementation would go here
}

// Initialize payment pages
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('availableBalance')) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        document.getElementById('availableBalance').textContent = user.balance || '0';
    }
    
    if (window.location.pathname.includes('transactions.html')) {
        loadTransactions();
    }
});
