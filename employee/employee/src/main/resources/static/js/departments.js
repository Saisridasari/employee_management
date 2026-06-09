async function addDepartment() {

    const departmentName =
        document.getElementById("departmentName").value;

    const response = await fetch(
        `${API_URL}/departments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":
                    "Bearer " + getToken()
            },
            body: JSON.stringify({
                departmentName
            })
        }
    );

    if (response.ok) {

        alert("Department Added");

        loadDepartments();
    }
}

async function loadDepartments() {

    const response = await fetch(
        `${API_URL}/departments`,
        {
            headers: {
                "Authorization":
                    "Bearer " + getToken()
            }
        }
    );

    const data = await response.json();

    let html = "";

    data.forEach(dep => {

        html += `
        <div class="card">
            ${dep.departmentName}
        </div>
        `;
    });

    document.getElementById("departmentList")
        .innerHTML = html;
}