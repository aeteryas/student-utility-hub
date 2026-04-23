function Login() {
    let username = document.getElementById("username").value.trim();

    if (username === "") {
        alert("Please enter a username");
        return;
    }
    username=username.charAt(0).toUpperCase()+username.slice(1);

    localStorage.setItem("currentUser", username);
    window.location.href="dashboard.html";
}

function GuestLogin() {
    sessionStorage.removeItem("guest_tasks");
    localStorage.setItem("currentUser", "Guest");
    window.location.href="dashboard.html";
}

function Logout() {
    if(confirm("Are you sure you want to logout?")){
        sessionStorage.clear();
        localStorage.removeItem("currentUser");
        window.location.href="index.html";
    }
}
function GetUsername() {
    return localStorage.getItem("currentUser") || "Guest";
}

function goToDashboard() {
    window.location.href="dashboard.html";
}