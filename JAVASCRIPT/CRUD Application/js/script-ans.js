// Select elements
const rollNoInput = document.getElementById("rollNo");
const nameInput = document.getElementById("name");
const genderInput = document.getElementById("gender");
const addressInput = document.getElementById("address");
const dataTable = document.getElementById("data-table");

// Buttons
const insertBtn = document.getElementById("insert");
const readBtn = document.getElementById("read");
const updateBtn = document.getElementById("update");
const deleteBtn = document.getElementById("delete");

// Helper function to get data from local storage
function getData() {
  const data = localStorage.getItem("crudData");
  return data ? JSON.parse(data) : [];
}

// Helper function to save data to local storage
function saveData(data) {
  localStorage.setItem("crudData", JSON.stringify(data));
}

// Function to render data in the table
function renderTable() {
  const data = getData();
  dataTable.innerHTML = ""; // Clear table
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.rollNo}</td>
      <td>${item.name}</td>
      <td>${item.gender}</td>
      <td>${item.address}</td>
    `;
    row.setAttribute("data-index", index);
    row.setAttribute("data-rollNo", item.rollNo); // Add rollNo as a data attribute
    row.addEventListener("click", () => loadFormData(index)); // Add click event to load data
    dataTable.appendChild(row);
  });
}

// Function to check for duplicate rollNo
function isDuplicateRollNo(rollNo) {
  const data = getData();
  return data.some(item => item.rollNo === rollNo);
}

// Function to load data into the form
function loadFormData(index) {
  const data = getData();
  const item = data[index];
  rollNoInput.value = item.rollNo;
  nameInput.value = item.name;
  genderInput.value = item.gender;
  addressInput.value = item.address;
  rollNoInput.setAttribute("data-index", index); // Store index for update/delete actions
}

// Function to reset the form
function resetForm() {
  rollNoInput.value = "";
  nameInput.value = "";
  genderInput.value = "";
  addressInput.value = "";
  rollNoInput.removeAttribute("data-index"); // Remove stored index
}

// Insert data
insertBtn.addEventListener("click", () => {
  const data = getData();
  const newEntry = {
    rollNo: rollNoInput.value,
    name: nameInput.value,
    gender: genderInput.value,
    address: addressInput.value,
  };

  if (!newEntry.rollNo || !newEntry.name || !newEntry.gender || !newEntry.address) {
    alert("Please fill out all fields before inserting!");
    return;
  }

  if (isDuplicateRollNo(newEntry.rollNo)) {
    alert("RollNo already exists! Please use a unique RollNo.");
    return;
  }

  data.push(newEntry);
  saveData(data);
  renderTable();
  resetForm();
  alert("Data inserted successfully!");
});

// Read data
readBtn.addEventListener("click", () => {
  // Filter data based on input here
});

// Update data
updateBtn.addEventListener("click", () => {
  const data = getData();
  const index = rollNoInput.getAttribute("data-index");

  if (index === null) {
    alert("Select a row to update.");
    return;
  }

  data[index] = {
    rollNo: rollNoInput.value,
    name: nameInput.value,
    gender: genderInput.value,
    address: addressInput.value,
  };

  saveData(data);
  renderTable();
  resetForm();
  alert("Data updated successfully!");
});

// Delete data
deleteBtn.addEventListener("click", () => {
  const data = getData();
  const index = rollNoInput.getAttribute("data-index");

  if (index === null) {
    alert("Select a row to delete.");
    return;
  }

  data.splice(index, 1); // Remove the selected item

  saveData(data);
  renderTable();
  resetForm();
  alert("Data deleted successfully!");
});

// Initial render
renderTable();
