'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationseditCtrl
 * @description
 * # OrganizationseditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationseditCtrl',['$scope', '$state', '$stateParams','OrganizationsService', function ($scope, $state, $stateParams, OrganizationsService) {
    if($stateParams.id !== undefined){
      OrganizationsService.getOrganization($stateParams.id, function (organization) {
        $scope.organization = organization;

        //get last projectID
        $scope.projectIndex = $scope.organization.projects.length+1;
        //get last ownerID
        $scope.ownerIndex = $scope.organization.owners.length+1;

      });
    }else{
      $scope.organization = {
        name: '',
        total_num_people:'',
        billable_headcount:'',
        bench_strength:'',
        owners: [],
        projects: []
      };
    }

    /*Add New Owner Field*/
    $scope.newOwner = { name: [], id:[] };
    $scope.addOwner = function() {
      $scope.newOwner.name.push('');
      $scope.newOwner.id.push('');
      //$scope.organization.owners.push({"_id":$scope.newOwner.id});
    }

    $scope.autoCompleteOwner = function(cssClass, index){
      $( "."+cssClass ).autocomplete({
        source: function (searchTerm,response){
          OrganizationsService.searchOwners(searchTerm.term).success(function (autocompleteResults) {
            response($.map(autocompleteResults, function (autocompleteResult) {
              return {
                label: autocompleteResult.firstName,
                value: autocompleteResult
              }
            }))
          })
        },
        select: function ( event, selectedItem) {
          $scope.newOwner.name[index] = selectedItem.item.value.firstName;
          $scope.newOwner.id[index] = selectedItem.item.value._id;
          $scope.$apply();
          event.preventDefault();
        }
      });
    }

    $scope.deleteOwnerField = function(index) {
      $scope.newOwner.name.splice(index, 1);
      $scope.newOwner.id.splice(index, 1);
    }
    $scope.deleteOwner = function(id) {
      angular.forEach($scope.organization.owners, function(item,key){
        if(item._id == id){
          $scope.organization.owners.splice(key,1);
        }
      })
    }
    $scope.updateOwner=function(){
      var index = 0;
      angular.forEach($scope.newOwner.name, function(item){
        var newOwnerId = $scope.newOwner.id[index];
        $scope.organization.owners.push(newOwnerId);
        index++;
      })
    };

    /*Add New Project Field*/
    $scope.newProject = { name: [], id:[] };
    $scope.addProject = function() {
      $scope.newProject.name.push('');
      $scope.newProject.id.push('');
      //$scope.organization.projects.push({"_id":$scope.newProject.id});
    }

    $scope.deleteProjectField = function(index) {
      $scope.newProject.name.splice(index, 1);
      $scope.newProject.id.splice(index, 1);
    }

    $scope.deleteProject = function(id) {
      angular.forEach($scope.organization.projects, function(item,key){
        if(item._id == id){
          $scope.organization.projects.splice(key,1);
        }
      })
    }

    $scope.updateProject=function(){
      var index = 0;
      angular.forEach($scope.newProject.name, function(item){
        var newProjectId = $scope.newProject.id[index];
        $scope.organization.projects.push(newProjectId);
        index++;
      })
    };

    $scope.autoCompleteProject = function(cssClass, index){
      $( "."+cssClass ).autocomplete({
        source: function (searchTerm,response){
          OrganizationsService.searchProject(searchTerm.term).success(function (autocompleteResults) {
            response($.map(autocompleteResults, function (autocompleteResult) {
              return {
                label: autocompleteResult.name,
                value: autocompleteResult
              }
            }))
          })
        },
        select: function ( event, selectedItem) {
          $scope.newProject.name[index] = selectedItem.item.value.name;
          $scope.newProject.id[index] = selectedItem.item.value._id;
          $scope.$apply();
          event.preventDefault();
        }
      });
    }

    //Add/Update Organization
    $scope.save = function(){
      $scope.updateOwner();
      //$scope.updateProject();
      if($stateParams.id === undefined){
        OrganizationsService.addOrganization($scope.organization, function(organization){
          $scope.organization = organization;
          $state.transitionTo('auth.organizations.view',{"id" : $scope.organization._id});
        });
      }else{
        OrganizationsService.updateOrganization($scope.organization, function(organization){
          $scope.organization = organization;
          $state.transitionTo('auth.organizations.view',{"id" : $scope.organization._id});
        });
      }

    }


  }]);

