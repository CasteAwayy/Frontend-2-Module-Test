const errorTxt = "Error : Please Make sure All the fields are filled before adding in an employee !";
const clearText = "Success : Employee Added!";
let employeeData = [];
let id = 0;

const form = document.querySelector(".form");
const span = document.querySelector(".employee-details span");
const employeeContainer = document.querySelector(".employee-container");
const emptyListIdentifier = document.querySelector(".empty-list");

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const employeeFormData = new FormData(this);
  const arr = Array.from(employeeFormData);
  const [name, profession, age] = arr;

  errorUtilHelper(name, profession, age)
    ? somethingIsMissing()
    : noError(employeeFormData);
}

function somethingIsMissing() {
  addError();
  return;
}

function noError(employeeFormData) {
  clearError();
  emptyListIdentifier.style.display = "none";
  addEmployee(employeeFormData);
}

function renderEmployee(employeeArr) {
  employeeContainer.innerHTML = "";
  if (employeeArr.length == 0) emptyListIdentifier.style.display = "block";

  employeeArr.map((employee) => {
    const markup = `
           <div class="employee-data">
             <div class="user-data">
               <span>${employee.id}.</span>
               <span>Name: ${employee.name}</span>
               <span>Profession: ${employee.profession}</span>
               <span>Age: ${employee.age}</span>
             </div>
             <button class="btn btn-delete" onClick="deleteEmployee(${employee.id})">Delete User</button>
           </div>
          `;
    employeeContainer.insertAdjacentHTML("beforeend", markup);
  });
}

function addError() {
  span.classList.remove(...span.classList);
  span.textContent = errorTxt;
  span.classList.add("error");
}

function clearError() {
  span.classList.remove(...span.classList);
  span.textContent = clearText;
  span.classList.add("clear");
}

function addEmployee(employeeForm) {
  const employee = {
    id: ++id,
    name: employeeForm.get("name"),
    profession: employeeForm.get("profession"),
    age: employeeForm.get("age"),
  };

  employeeData.push(employee);
  renderEmployee(employeeData);
}

function deleteEmployee(id) {
  employeeData = employeeData.filter((employee) => {
    return employee.id != id;
  });
  renderEmployee(employeeData);
}

function errorUtilHelper(name, profession, age) {
  if (name[1].trim() == "" || profession[1].trim() == "" || age[1].trim() == "")
    return 1;
  return 0;
}
