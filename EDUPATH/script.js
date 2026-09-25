function goHome() {
    window.location.href = "index.html";
}

function openSubject(subject) {
    window.location.href = "pages/subject.html?subject=" + encodeURIComponent(subject);
}

function examAction(action) {
    window.location.href = "pages/exam.html?action=" + encodeURIComponent(action);
}

function openAI() {
    window.location.href = "pages/ai.html";
}

function closeAI() {
    window.location.href = "index.html";
}

function askAI() {
    const question = document.getElementById("aiQuestion").value;
    const answer = document.getElementById("aiAnswer");

    if (question.trim() === "") {
        answer.innerText = "Bạn hãy nhập câu hỏi trước nhé!";
        return;
    }

    answer.innerText = "AI Trợ giảng sẽ được xây dựng ở bước tiếp theo.";
}
function openPage(page) {
    window.location.href = "pages/" + page + ".html";
}
function openWelcome() {
    window.location.href = "pages/welcome.html";
}
function openAuth() {
    window.location.href = "pages/auth.html";
}