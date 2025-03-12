// 회원가입 페이지 이동
function goToRegister() {
    window.location.href = "register.html";
}

// 로그인 기능
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("아이디와 비밀번호를 입력하세요.");
        return;
    }

    // 로그인 성공 시 투두리스트 페이지로 이동
    alert(`로그인 성공: ${username}`);
    window.location.href = "todo.html";
}

// 회원가입 기능
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

// 투두리스트 기능
document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTodoButton = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");
    const doneList = document.getElementById("done-list");
    const todoEmptyMessage = document.getElementById("todo-empty");
    const doneEmptyMessage = document.getElementById("done-empty");

    // 할 일 추가
    addTodoButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        addTask(taskText, false);
        todoInput.value = "";
        updateEmptyMessage();
    });

    // 할 일 추가 함수
    function addTask(text, isDone) {
        const li = document.createElement("li");

        // 체크박스
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isDone;
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                doneList.appendChild(li);
            } else {
                todoList.appendChild(li);
            }
            updateEmptyMessage();
        });

        // 할 일 텍스트
        const span = document.createElement("span");
        span.textContent = text;

        // 수정 버튼
        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => {
            const newText = prompt("할 일을 수정하세요:", span.textContent);
            if (newText) span.textContent = newText;
        });

        // 삭제 버튼
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
            li.remove();
            updateEmptyMessage();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        if (isDone) {
            doneList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }

        updateEmptyMessage();
    }

    // 할 일이 없을 경우 메시지 표시
    function updateEmptyMessage() {
        todoEmptyMessage.style.display = todoList.children.length === 1 ? "block" : "none";
        doneEmptyMessage.style.display = doneList.children.length === 1 ? "block" : "none";
    }

    updateEmptyMessage();
});