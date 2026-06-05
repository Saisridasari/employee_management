async function login() {

    try {

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const response = await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        console.log("Status:", response.status);

        const result = await response.text();

        console.log("Response:", result);

        alert(result);

    } catch (error) {

        console.error(error);

        alert(error.message);
    }
}