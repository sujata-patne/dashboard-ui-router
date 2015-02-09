'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.employees.service
 * @description
 * # employees.service
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('employees.service',['$http', function ($http) {
    var service = {};
    service.baseRestUrl = 'http://localhost:8888';

    service.getEmployeesList = function (success) {
      $http.get(service.baseRestUrl + '/api/employees/').success(function (items) {
        success(items);
      });
    }
    service.add = function (newEmployees, success) {
      $http.post(service.baseRestUrl+'/api/employees/', newEmployees).success(function(items){
        success(items);
      });
    }
    service.delete = function (employee, success) {
      $http.delete(service.baseRestUrl+'/api/employees/' + employee._id, employee).success(function (result) {
        success(result);
      });
    }
    service.update = function (newEmployee, success) {
      $http.put(service.baseRestUrl+'/api/employees/' + newEmployee._id, newEmployee).success(function(items){
        success(items);
      });
    }

    return service;
  }]);
