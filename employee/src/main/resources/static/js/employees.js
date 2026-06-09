
async function loadEmployees() {

    const res = await fetch(`${API_URL}/employees`, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });

    const data = await res.json();

    let html = "";

    data.forEach(emp => {
        html += `
        <div class="card">
            <h3>${emp.name}</h3>
            <p>${emp.email}</p>
            <p>${emp.department}</p>
        </div>
        `;
    });

    document.getElementById("employeeList").innerHTML = html;
}


/* ADD EMPLOYEE */
async function addEmployee() {

    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        salary: Number(document.getElementById("salary").value),
        experience: Number(document.getElementById("experience").value),
        joiningDate: document.getElementById("joiningDate").value
    };

    await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(employee)
    });

    alert("Employee Added");
    loadEmployees();
}


/* SEARCH EMPLOYEE */
async function searchEmployee() {

    const name = document.getElementById("searchName").value;

    const res = await fetch(`${API_URL}/employees/search/name?name=${name}`, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });

    const data = await res.json();

    let html = "";

    data.forEach(emp => {
        html += `
        <div class="card">
            <h3>${emp.name}</h3>
            <p>${emp.email}</p>
        </div>
        `;
    });

    document.getElementById("employeeList").innerHTML = html;
}