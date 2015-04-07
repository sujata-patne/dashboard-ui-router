'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.employees.service
 * @description
 * # employees.service
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('EmployeesService',['$http', function ($http) {
    var service = {};
    service.baseRestUrl = 'http://localhost:8888';

    service.getEmployeesList = function (success) {
      $http.get(service.baseRestUrl + '/api/employees/').success(function (items) {
        success(items);
      });
    }
    service.getEmployee = function (id, success) {
        $http.get(service.baseRestUrl+'/api/employees/'+id).success(function (item) {
            success(item);
        });
    }
    service.addEmployee = function (newEmployees, success) {
        console.log(newEmployees);
      $http.post(service.baseRestUrl+'/api/employees/', newEmployees).success(function(items){
        success(items);
      });

    }
    service.deleteEmployee = function (employee, success) {
      $http.delete(service.baseRestUrl+'/api/employees/' + employee._id, employee).success(function (result) {
        success(result);
      });
    }
    service.updateEmployee = function (newEmployee, success) {
      $http.put(service.baseRestUrl+'/api/employees/' + newEmployee._id, newEmployee).success(function(items){
        success(items);
      });
    }
    service.searchOrganizations = function (term) {
        return $http.get(service.baseRestUrl+'/api/employees/organizations/' + term)
    }
    service.searchProject = function (term) {
        return $http.get(service.baseRestUrl+'/api/employees/projects/' + term)
    }
    return service;
  }]);
