// Username dan password admin (sementara hardcoded)
const adminUser = {
    username: 'admin',
    password: '123456'
};

const form = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === adminUser.username && password === adminUser.password) {
        // Simpan status login ke localStorage
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html'; // Arahkan ke halaman utama
    } else {
        errorMsg.classList.remove('hidden');
    }
});
