const isLoggedIn = localStorage.getItem('isLoggedIn');
if (isLoggedIn !== 'true' && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    }
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    
    const expirySpan = document.getElementById('expiry-date');
    if (expirySpan) {
        const today = new Date();
        today.setDate(today.getDate() + 20); // Add 20 days
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        expirySpan.innerText = `${dd}/${mm}/${yyyy}`;
    }

    const loginForm = document.getElementById('loginForm');
    const eyeBtn = document.getElementById('eyeBtn');
    const passInput = document.getElementById('password');

    if (eyeBtn && passInput) {
        eyeBtn.addEventListener('click', function() {
            const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            const correctEmail = "nskadmin@workspace.com";
            const correctPass = "nsk$admin@55";

            if (email === correctEmail && password === correctPass) {
                showToast('Success', 'Login successful! Redirecting...', 'success');
                localStorage.setItem('isLoggedIn', 'true');
                setTimeout(() => { window.location.href = 'index.html'; }, 1500);
            } else {
                showToast('Error', 'Invalid Email or Password. Try again!', 'error');
            }
        });
    }
    
    // 1. Revenue Line Chart (CRM Page)
    const revEl = document.getElementById('revenueChart');
    if (revEl) {
        new Chart(revEl.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Actual Revenue',
                    data: [45000, 52000, 48000, 61000, 58000, 72000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }, {
                    label: 'Forecast',
                    data: [42000, 50000, 55000, 58000, 65000, 70000],
                    borderColor: '#cbd5e1',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { display: false }, ticks: { font: { size: 10 } } },
                    x: { grid: { display: false }, ticks: { font: { size: 10 } } }
                }
            }
        });
    }

    // 2. Lead Source Doughnut (CRM Page)
    const srcEl = document.getElementById('sourceChart');
    if (srcEl) {
        new Chart(srcEl.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Search', 'Referral', 'Social', 'Other'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#f87171'],
                    borderWidth: 0,
                    cutout: '80%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }

    // 3. Inventory Distribution Chart (Inventory Page)
    const invEl = document.getElementById('invDistChart');
    if (invEl) {
        new Chart(invEl.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Electronics', 'Accessories', 'Furniture', 'Others'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: ['#6366f1', '#f59e0b', '#ef4444', '#10b981'],
                    borderWidth: 0,
                    cutout: '75%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }

    // const ctxInvoice = document.getElementById('invoiceStatusChart').getContext('2d');
    // new Chart(ctxInvoice, {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Paid', 'Pending', 'Overdue'],
    //         datasets: [{
    //             data: [75, 20, 5],
    //             backgroundColor: ['#10b981', '#fbbf24', '#ef4444'],
    //             borderWidth: 0,
    //             cutout: '75%'
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         plugins: { legend: { display: false } }
    //     }
    // });
});

    function showToast(title, message, type) {
        const toastEl = document.getElementById('authToast');
        if (!toastEl) return;
        
        const toastTitle = document.getElementById('toastTitle');
        const toastBody = document.getElementById('toastBody');
        
        toastTitle.innerText = title;
        toastBody.innerText = message;
        
        toastBody.className = (type === 'success') ? "toast-body fw-medium text-success" : "toast-body fw-medium text-danger";

        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }


    const ctx = document.getElementById('expenseChart').getContext('2d');
    const expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Salaries', 'Marketing', 'Rent', 'Software'],
            datasets: [{
                data: [45, 20, 15, 20],
                backgroundColor: ['#6366f1', '#fbbf24', '#f87171', '#10b981'],
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) { return ` ${context.label}: ${context.raw}%`; }
                    }
                }
            },
            layout: { padding: 10 }
        }
    });