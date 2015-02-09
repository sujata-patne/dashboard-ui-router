'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeeslistCtrl
 * @description
 * # EmployeeslistCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmployeeslistCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
