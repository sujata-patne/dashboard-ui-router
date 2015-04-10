'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeesdeleteCtrl
 * @description
 * # EmployeesdeleteCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
    .controller('EmployeesdeleteCtrl', ['$scope', '$state', '$stateParams', 'EmployeesService', function ($scope, $state, $stateParams, EmployeesService) {

        EmployeesService.deleteEmployee($stateParams.id, function(response){
            $state.transitionTo('auth.employees.list');
        });
    }]);