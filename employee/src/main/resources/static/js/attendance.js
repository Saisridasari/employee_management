window.checkIn = async function () {

    const employeeId = document.getElementById("employeeId").value;

    if (!employeeId) {
        alert("Enter Employee ID");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/attendance/checkin/${employeeId}`, {
            method: "POST",
            headers: authHeader()
        });

        if (res.ok) {
            alert("Checked In Successfully");
        } else {
            alert("Check-in failed");
        }

    } catch (error) {
        console.error(error);
        alert("Error during check-in");
    }
};
window.checkOut = async function () {

    const attendanceId = prompt("Enter Attendance ID");

    if (!attendanceId) return;

    try {
        const res = await fetch(`${API_URL}/attendance/checkout/${attendanceId}`, {
            method: "PUT",
            headers: authHeader()
        });

        if (res.ok) {
            alert("Checked Out Successfully");
        } else {
            alert("Check-out failed");
        }

    } catch (error) {
        console.error(error);
        alert("Error during check-out");
    }
};
window.loadAttendance = async function () {

    try {
        const res = await fetch(`${API_URL}/attendance`, {
            method: "GET",
            headers: authHeader()
        });

        if (res.status === 403) {
            alert("Unauthorized");
            return;
        }

        const data = await res.json();

        let html = "";

        data.forEach(a => {
            html += `
                <div class="card">
                    <p>Employee ID: ${a.employeeId}</p>
                    <p>Check In: ${a.checkIn}</p>
                    <p>Check Out: ${a.checkOut}</p>
                </div>
            `;
        });

        document.getElementById("attendanceList").innerHTML = html;

    } catch (error) {
        console.error(error);
        alert("Failed to load attendance");
    }
};