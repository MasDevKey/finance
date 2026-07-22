// ===============================
// Finance Manager Authentication
// ===============================

const pinInput = document.getElementById("pin");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const showPin = document.getElementById("showPin");
const title = document.getElementById("loginTitle");
const message = document.getElementById("message");

// Ambil data
const savedPin = localStorage.getItem("financePIN");
const session = sessionStorage.getItem("financeSession");

// Kalau sudah login, langsung ke dashboard
if (session === "logged") {
    window.location.href = "index.html";
}

// ===============================
// Ubah tampilan
// ===============================

if (savedPin) {

    title.innerHTML = "Masukkan PIN";

    loginButton.innerHTML = "Masuk";

    logoutButton.style.display = "block";

} else {

    title.innerHTML = "Buat PIN Baru";

    loginButton.innerHTML = "Simpan PIN";

    logoutButton.style.display = "none";

}

// ===============================
// Show Hide PIN
// ===============================

showPin.onclick = () => {

    if (pinInput.type === "password") {

        pinInput.type = "text";

        showPin.innerHTML = "🙈";

    } else {

        pinInput.type = "password";

        showPin.innerHTML = "👁";

    }

};

// ===============================
// Login / Buat PIN
// ===============================

loginButton.onclick = () => {

    const pin = pinInput.value.trim();

    if (!/^\d{6}$/.test(pin)) {

        message.innerHTML = "PIN harus terdiri dari 6 angka.";

        return;

    }

    // ==========================
    // Belum punya PIN
    // ==========================

    if (!savedPin) {

        localStorage.setItem("financePIN", pin);

        sessionStorage.setItem("financeSession", "logged");

        window.location.href = "index.html";

        return;

    }

    // ==========================
    // Login
    // ==========================

    if (pin === savedPin) {

        sessionStorage.setItem("financeSession", "logged");

        window.location.href = "index.html";

    } else {

        message.innerHTML = "PIN salah.";

        pinInput.value = "";

        pinInput.focus();

    }

};

// ===============================
// Enter
// ===============================

pinInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        loginButton.click();

    }

});

// ===============================
// Logout
// ===============================

logoutButton.onclick = () => {

    if (!confirm("Hapus PIN dan logout?")) return;

    sessionStorage.removeItem("financeSession");

    localStorage.removeItem("financePIN");

    window.location.reload();

};