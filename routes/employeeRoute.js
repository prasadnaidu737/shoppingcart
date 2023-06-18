var express = require("express");
var {
  addEmployee,
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  modifyEmployee,
} = require("../controller/empController.js");

var router = express.Router();
console.log("Inside the employee router");
router.get("/", getAllEmployees);

router.get("/:eId", (request, response) => {
    var empId=request.params.eId;
    if(!empId){
       response.send("empId is missing")
    }
    else{
        let result = getEmployee(empId)
        response.status(200).json(result)
    }
});

router.put("/:eId?", (request, response) => {
  var empId = request.params.eId;
  var empIdInBody = request.body.empId;
  if (!empId || !empIdInBody) {
    response.send("EmpId is missing, Update not possible");
  } else {
    if (empId == empIdInBody) {
      var empToBeUpdated = request.body;
      var result = modifyEmployee(empToBeUpdated);
      response.status(result.statusCode).send(result.data);
    } else {
      response.send("Mismatch in data in body and params");
    }
  }
});

router.delete("/:eId?", (request, response) => {
  var empDataTobeDeleted = request.params.eId;
  if (empDataTobeDeleted) {
    var result = deleteEmployee(empDataTobeDeleted);
    response.status(result.statusCode).send(result.data);
  } else {
    response.send("Employee Id to be deleted is missing in the params");
  }
});

router.post("/", (request, response) => {
  // "/employee"
  console.log("POST request received for /employee");
  var empToBeAdded = request.body;
  var result = addEmployee(empToBeAdded);
  response.send(result);
});

router.put("/:eId", (request, response) => {});

router.delete("/:eId", (request, response) => {});

module.exports = router;
