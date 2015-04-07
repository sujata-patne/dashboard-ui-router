'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeesCtrl
 * @description
 * # EmployeesCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeesCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
