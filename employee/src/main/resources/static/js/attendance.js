async function checkIn() {

    const employeeId =
        document.getElementById("employeeId").value;

    const response = await fetch(
        `${API_URL}/attendance/checkin/${employeeId}`,
        {
            method: "POST",
            headers: {
                "Authorization":
                    "Bearer " + getToken()
            }
        }
    );

    if (response.ok) {

        alert("Checked In");
    }
}

async function checkOut() {

    const attendanceId =
        prompt("Enter Attendance ID");

    const response = await fetch(
        `${API_URL}/attendance/checkout/${attendanceId}`,
        {
            method: "PUT",
            headers: {
                "Authorization":
                    "Bearer " + getToken()
            }
        }
    );

    if (response.ok) {

        alert("Checked Out");
    }
}

async function loadAttendance() {

    const response = await fetch(
        `${API_URL}/attendance`,
        {
            headers: {
                "Authorization":
                    "Bearer " + getToken()
            }
        }
    );

    const data = await response.json();

    let html = "";

    data.forEach(a => {

        html += `
        <div class="card">
            Employee: ${a.employeeId}
            <br>
            In: ${a.checkIn}
            <br>
            Out: ${a.checkOut}
        </div>
        `;
    });

    document.getElementById("attendanceList")
        .innerHTML = html;
}