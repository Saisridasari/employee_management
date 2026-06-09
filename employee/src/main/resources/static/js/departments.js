
window.addDepartment = async function () {

    const departmentName = document.getElementById("departmentName").value;

    if (!departmentName) {
        alert("Enter department name");
        return;
    }

    const res = await fetch(`${API_URL}/departments`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ departmentName })
    });

    if (res.ok) {
        alert("Department Added");
        loadDepartments();
    } else {
        alert(await res.text());
    }
};


window.loadDepartments = async function () {

    try {
        const res = await fetch(`${API_URL}/departments`, {
            method: "GET",
            headers: authHeader()
        });

        if (res.status === 403) {
            alert("Unauthorized - Login again");
            return;
        }

        const data = await res.json();

        let html = "";

        data.forEach(dep => {
            html += `
                <div class="card">
                    <h3>${dep.departmentName}</h3>
                </div>
            `;
        });

        document.getElementById("departmentList").innerHTML = html;

    } catch (error) {
        console.error(error);
        alert("Failed to load departments");
    }
};