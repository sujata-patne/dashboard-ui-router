'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationsdeleteCtrl
 * @description
 * # OrganizationsdeleteCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationsdeleteCtrl', ['$scope', '$state', '$stateParams', 'OrganizationsService', function ($scope,$state,$stateParams,OrganizationsService) {
    //Delete Organization

    OrganizationsService.deleteOrganization($stateParams.id, function(response){
      $state.transitionTo('organizations.list');
    });

  }]);
