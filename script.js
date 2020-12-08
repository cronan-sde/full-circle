//when form submits get the input information
const myForm = document.getElementById("my-form");
const showEmpsBtn = document.querySelector('button');
showEmpsBtn.onclick = getEmployees;


myForm.onsubmit = (event) => {
  event.preventDefault();

  const fName = document.getElementById("firstName").value;
  const lName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;

  //clearing form
  Array.from(myForm).forEach(ele => {
    if (ele.value !== "Add employee") {
      ele.value = "";
    }
  });

  console.log({fName, lName, email, role});

  //send this employee to POST https://crud-demo-cronan.herokuapp.com/employees
  axios.post('https://crud-demo-cronan.herokuapp.com/employees', {
    fName,
    lName,
    email,
    role
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

//getting data from my api
function getEmployees() {
  axios.get('https://crud-demo-cronan.herokuapp.com/employees').then(res => {
    const emps = res.data;
    const empDiv = document.getElementById("empContainer");

    emps.forEach(emp => {
      const empP = document.createElement('p');
      empP.innerHTML = `${emp.lName}, ${emp.fName} - ${emp.role}, ${emp.email}`;
      empDiv.appendChild(empP);
    })
  })
}