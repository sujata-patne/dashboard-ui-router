'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeeslistCtrl
 * @description
 * # EmployeeslistCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeeslistCtrl',['$scope', '$stateParams','EmployeesService', function ($scope, $stateParams, EmployeesService) {
    EmployeesService.getEmployeesList(function (employees) {
        $scope.employeesList = employees;
        console.log($scope.employeesList);
    });
  }]);
