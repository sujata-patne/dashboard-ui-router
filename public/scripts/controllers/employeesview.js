'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeesviewCtrl
 * @description
 * # EmployeesviewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeesviewCtrl',['$scope', '$stateParams','EmployeesService', function ($scope, $stateParams, EmployeesService) {
     EmployeesService.getEmployee($stateParams.id, function (employee) {
        $scope.employee = employee;
     });
  }]);
