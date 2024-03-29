const app = angular.module("MyAdmin", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");

  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "controllers/AppController"
    })
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "controllers/LoginController"
    })
    .when("/register", {
      templateUrl: "views/register.html",
      controller: "controllers/RegisterController"
    })
    .when("/preview", {
      templateUrl: "views/preview.html",
      controller: "controllers/PreviewController"
    })
    .when("/offices", {
      templateUrl: "views/offices.html",
      controller: "controllers/OfficesController"
    })
    .when("/departments", {
      templateUrl: "views/departments.html",
      controller: "controllers/DepartmentsController"
    })
    .when("/departments/:id", {
      templateUrl: "views/departmentForm.html",
      controller: "controllers/DepartmentsController"
    })
    .when("/employees/new", {
      templateUrl: "views/employeeForm.html",
      controller: "controllers/EmployeeFormController"
    })
    .when("/employees", {
      templateUrl: "views/employees.html",
      controller: "controllers/EmployeesController"
    })
    .when("/employees/:id", {
      templateUrl: "views/employeeForm.html",
      controller: "controllers/EmployeeFormUpdateController"
    })
    .when("/salaries", {
      templateUrl: "views/salaries.html",
      controller: "controllers/SalariesController"
    })
    .when("/salaries/:id", {
      templateUrl: "views/salaryForm.html",
      controller: "controllers/SalaryFormController"
    })
    .when("/not-found", {
      templateUrl: "views/404.html",
      controller: "controllers/PageNotFoundController"
    })
    .otherwise({ redirectTo: "/not-found" });
});
