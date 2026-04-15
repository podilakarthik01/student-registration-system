const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

// Load data on page load
window.onload = function () {
    displayStudents();
};

// Form submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    // Validation
    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Name should contain only letters");
        return;
    }

    if (!/^[0-9]+$/.test(studentId)) {
        alert("Student ID should be numbers only");
        return;
    }

    if (!/^[0-9]{10,}$/.test(contact)) {
        alert("Contact must be at least 10 digits");
        return;
    }

    if (!name || !studentId || !email || !contact) {
        alert("All fields are required");
        return;
    }

    const student = { name, studentId, email, contact };

    if (editIndex === null) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = null;
    }

    localStorage.setItem("students", JSON.stringify(students));

    form.reset();
    displayStudents();
});

// Display function
function displayStudents() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Edit
function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    editIndex = index;
}

// Delete
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}