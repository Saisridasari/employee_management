async function loadEmployees() {

    try {

        const response = await fetch(
            `${API_URL}/employees`,
            {
                headers: {
                    "Authorization": "Bearer " + getToken()
                }
            }
        );

        const data = await response.json();

        let html = "";

        data.forEach(emp => {

            html += `
                <div class="emp">
                    <h3>${emp.name}</h3>
                    <p>Email: ${emp.email}</p>
                    <p>Department: ${emp.department}</p>
                    <p>Salary: ${emp.salary}</p>
                    <p>Experience: ${emp.experience}</p>
                    <p>Joining Date: ${emp.joiningDate}</p>
                </div>
            `;
        });

        document.getElementById("employeeList").innerHTML = html;

    } catch (error) {

        console.error(error);
        alert("Failed to load employees");
    }
}

async function searchEmployee() {

    try {

        const name =
            document.getElementById("searchName").value.trim();

        if (name === "") {
            alert("Please enter employee name");
            return;
        }

        const response = await fetch(
            `${API_URL}/employees/search/name?name=${name}`,
            {
                headers: {
                    "Authorization":
                        "Bearer " + getToken()
                }
            }
        );

        const data = await response.json();

        let html = "";

        if (data.length === 0) {

            html = `
                <div class="emp">
                    <h3>No Employee Found</h3>
                    <p>No employee registered with name "${name}"</p>
                </div>
            `;

        } else {

            data.forEach(emp => {

                html += `
                    <div class="emp">
                        <h3>${emp.name}</h3>
                        <p>Email: ${emp.email}</p>
                        <p>Department: ${emp.department}</p>
                        <p>Salary: ${emp.salary}</p>
                        <p>Experience: ${emp.experience}</p>
                        <p>Joining Date: ${emp.joiningDate}</p>
                    </div>
                `;
            });
        }

        document.getElementById("employeeList")
            .innerHTML = html;

    } catch (error) {

        console.error(error);
        alert("Search failed");
    }
}

async function addEmployee() {

    try {

        const employee = {

            name:
                document.getElementById("name").value,

            email:
                document.getElementById("email").value,

            department:
                document.getElementById("department").value,

            salary:
                parseFloat(
                    document.getElementById("salary").value
                ),

            experience:
                parseInt(
                    document.getElementById("experience").value
                ),

            joiningDate:
                document.getElementById("joiningDate").value
        };

        const response = await fetch(
            `${API_URL}/employees`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization":
                        "Bearer " + getToken()
                },

                body: JSON.stringify(employee)
            }
        );

        if (response.ok) {

            alert("Employee Added Successfully");

            loadEmployees();

        } else {

            const error = await response.text();
            alert(error);
        }

    } catch (error) {

        console.error(error);
        alert("Failed to add employee");
    }
}