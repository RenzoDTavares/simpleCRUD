// Sample Employee Data
const employees = [
    { id: 1, name: "John", role: "QA tester", salary: 55900 },
    { id: 2, name: "Baki", role: "Developer", salary: 30000 },
    { id: 3, name: "Annie", role: "Business Architect", salary: 47500 }
];

// Display Employee Data
function displayEmployees() {
    const employeeTable = document.getElementById("employeeTable");
    employeeTable.innerHTML = "";

    employees.forEach((employee, index) => {
        const row = employeeTable.insertRow();
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${employee.salary}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#editEmployeeModal" onclick="editEmployee(${employee.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;
        employee.id = index + 1; 
    });
}

// function checkForDuplicates(name) {
//     return employees.some(emp => emp.name.toLowerCase() === name.toLowerCase());
// }

// Função para capitalizar a primeira letra de uma string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add Employee
document.getElementById("addEmployeeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const role = document.getElementById("role").value;
    const salary = document.getElementById("salary").value;
    const duplicatesMessage = document.querySelector("#addEmployeeModal .duplicates-message");

    let name = nameInput.value;
    name = capitalizeFirstLetter(name); // Capitalize o primeiro caractere

    // if (checkForDuplicates(name)) {
    //     duplicatesMessage.textContent = "Já existe um funcionário com este nome na grade.";
    // } else {
        const id = employees.length + 1;
        employees.push({ id, name, role, salary });
        displayEmployees();
        document.getElementById("addEmployeeForm").reset();
        $("#addEmployeeModal").modal("hide");
        duplicatesMessage.textContent = "";
    // }
});

// Edit Employee
let currentEmployeeId;
function editEmployee(id) {
    currentEmployeeId = id;
    const employee = employees.find(emp => emp.id === id);

    if (employee) {
        document.getElementById("editName").value = employee.name;
        document.getElementById("editRole").value = employee.role;
        document.getElementById("editSalary").value = employee.salary;
    } else {
        currentEmployeeId = undefined;
        clearEditForm();
    }
}

document.getElementById("editEmployeeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("editName").value;
    const role = document.getElementById("editRole").value;
    const salary = document.getElementById("editSalary").value;
 
    const employee = employees.find(emp => emp.id === currentEmployeeId);
    employee.name = name;
    employee.role = role;
    employee.salary = salary;
    displayEmployees();
    document.getElementById("editEmployeeForm").reset();
    $("#editEmployeeModal").modal("hide");
});

function deleteEmployee(id) {
        const index = employees.findIndex(emp => emp.id === id);

        if (index !== -1) {
            employees.splice(index, 1);
            displayEmployees();
        }
}

displayEmployees();
