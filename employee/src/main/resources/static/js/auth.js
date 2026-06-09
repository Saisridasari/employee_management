async function login() {

    try {

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        console.log("Login Response:", data);

        // 🔥 IMPORTANT FIX
        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Login Successful");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid Credentials");
        }

    } catch (error) {
        console.error(error);
        alert("Login Failed");
    }
}