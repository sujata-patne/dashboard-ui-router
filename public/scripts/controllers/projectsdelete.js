'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjectsdeleteCtrl
 * @description
 * # ProjectsdeleteCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
    .controller('ProjectsdeleteCtrl', ['$scope', '$state', '$stateParams', 'ProjectsService', function ($scope, $state, $stateParams, ProjectsService) {

        ProjectsService.deleteProject($stateParams.id, function(response){
            $state.transitionTo('auth.projects.list');
        });
  }]);
