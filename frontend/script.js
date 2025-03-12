// 회원가입 페이지로 이동
function goToRegister() {
    window.location.href = "register.html";
}

// 로그인
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("아이디와 비밀번호를 입력하세요.");
        return;
    }

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

document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTodoButton = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");
    const doneList = document.getElementById("done-list");

    // 삭제 모달 
    const modal = document.getElementById("confirmModal");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");
    let targetTask = null; // 삭제할 리스트 요소 저장

    // 기존 할 일 목록 불러오기
    function loadTasks() {
        todoList.innerHTML = "";
        doneList.innerHTML = "";

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTask(task.text, task.isDone));
    }

    // 할 일 추가 버튼 클릭
    addTodoButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        addTask(taskText, false);
        saveTasks();
        todoInput.value = "";
    });

    // 할 일 추가 함수
    function addTask(text, isDone) {
        const li = document.createElement("li");

        // 체크박스
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isDone;
        checkbox.addEventListener("change", () => {
            toggleTask(li, checkbox.checked);
            saveTasks();
        });

        // 할 일 텍스트
        const span = document.createElement("span");
        span.textContent = text;

        // 수정 버튼
        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => enableEditMode(li, span, editButton, deleteButton));

        // 삭제 버튼
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation(); // 이벤트 전파 방지
            showDeletePopup(li);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        if (!isDone) li.appendChild(editButton); // 완료된 항목엔 수정 버튼 제거
        li.appendChild(deleteButton);

        if (isDone) {
            doneList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
    }

    // 체크박스 클릭 시 목록 이동
    function toggleTask(taskElement, isDone) {
        if (isDone) {
            doneList.appendChild(taskElement);
            const editButton = taskElement.querySelector(".edit");
            if (editButton) editButton.remove(); // 완료된 항목엔 수정 버튼 제거
        } else {
            todoList.appendChild(taskElement);
            if (!taskElement.querySelector(".edit")) {
                const span = taskElement.querySelector("span");
                const deleteButton = taskElement.querySelector(".delete");
                const editButton = document.createElement("button");
                editButton.textContent = "수정";
                editButton.classList.add("edit");
                editButton.addEventListener("click", () => enableEditMode(taskElement, span, editButton, deleteButton));
                taskElement.insertBefore(editButton, deleteButton);
            }
        }
        saveTasks();
    }

    function enableEditMode(li) {
        const checkbox = li.querySelector("input[type='checkbox']"); // 체크박스 저장
        const span = li.querySelector("span");
        const originalText = span.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = originalText;
        input.classList.add("edit-input");
    
        // 완료 버튼
        const completeButton = document.createElement("button");
        completeButton.textContent = "완료";
        completeButton.classList.add("complete-btn");
        completeButton.addEventListener("click", () => saveEdit(li, input, span, checkbox));
    
        // 취소 버튼
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "취소";
        cancelButton.classList.add("cancel-btn");
        cancelButton.addEventListener("click", () => cancelEdit(li, span, originalText, checkbox));
    
        // 버튼 컨테이너
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("edit-buttons");
        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(cancelButton);
    
        // 기존 요소 숨기고 새로운 요소 추가
        li.innerHTML = "";
        li.appendChild(checkbox); // 체크박스 유지
        li.appendChild(input);
        li.appendChild(buttonContainer);
    }
    
    // 수정 완료 시
    function saveEdit(li, input, span, checkbox) {
        span.textContent = input.value;
        resetListItem(li, span, checkbox);
        saveTasks();
    }
    
    // 수정 취소 시 (원래 텍스트 유지)
    function cancelEdit(li, span, originalText, checkbox) {
        span.textContent = originalText;
        resetListItem(li, span, checkbox);
    }
    
    // 원래 리스트 아이템 상태로 복원
    function resetListItem(li, span, checkbox) {
        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => enableEditMode(li));
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => showDeletePopup(li));
    
        // 기존 요소 초기화 후 다시 추가
        li.innerHTML = "";
        li.appendChild(checkbox); // 체크박스 복원
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
    }

    // 수정 모드 해제
    function disableEditMode(li, span, input, confirmButton, cancelButton, editButton, deleteButton) {
        li.replaceChild(span, input);
        li.replaceChild(editButton, confirmButton);
        li.replaceChild(deleteButton, cancelButton);
    }

    // 삭제 모달 기능
    function showDeletePopup(taskElement) {
        if (targetTask !== null) return; // 이미 다른 삭제 요청이 있으면 무시
        targetTask = taskElement;
        modal.style.display = "flex";
    }

    confirmDeleteBtn.addEventListener("click", () => {
        if (targetTask) {
            targetTask.remove();
            saveTasks();
        }
        closeModal(); 
    });

    cancelDeleteBtn.addEventListener("click", () => {
        closeModal(); 
    });

    // 팝업 닫기 
    function closeModal() {
        modal.style.display = "none";
        targetTask = null;
    }

    // 모달 바깥을 클릭하면 닫히도록
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#todo-list li").forEach(li => {
            tasks.push({ text: li.querySelector("span").textContent, isDone: false });
        });
        document.querySelectorAll("#done-list li").forEach(li => {
            tasks.push({ text: li.querySelector("span").textContent, isDone: true });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    // 초기 할 일 목록 불러오기
    loadTasks();
});
