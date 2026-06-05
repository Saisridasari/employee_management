
function parseJwt(token) {
    if (!token) return null;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        return JSON.parse(window.atob(base64));
    } catch (e) {
        console.log("Invalid token");
        return null;
    }
}

// GET TOKEN
function getToken() {
    return localStorage.getItem("token");
}

// GET ROLE FROM TOKEN
function getRole() {
    const token = getToken();

    if (!token) return null;

    const decoded = parseJwt(token);

    // supports both backend formats
    return decoded?.role || decoded?.authorities?.[0] || null;
}

// CHECK ADMIN
function isAdmin() {
    const role = getRole();

    return role === "ROLE_ADMIN" || role === "ADMIN";
}