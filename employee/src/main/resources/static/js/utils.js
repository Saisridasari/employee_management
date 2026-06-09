function getToken() {
    return localStorage.getItem("token");
}

function authHeader() {
    const token = getToken();

    if (!token) {
        alert("Login required");
        window.location.href = "index.html";
        return {};
    }

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}