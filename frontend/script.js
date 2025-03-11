function goToRegister() {
    window.location.href = "register.html";
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("아이디와 비밀번호를 입력하세요.");
        return;
    }

    alert(`로그인 시도: ${username}`);
}

function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;

    if (!username || !password || !confirmPassword) {
        alert("모든 필드를 입력하세요.");
        return;
    }

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    alert(`회원가입 성공: ${username}`);
}
