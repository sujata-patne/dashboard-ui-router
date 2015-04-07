'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjectseditCtrl
 * @description
 * # ProjectseditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProjectseditCtrl', ['$scope', '$state', '$stateParams','ProjectsService', function ($scope, $state, $stateParams, ProjectsService) {
      if($stateParams.id !== undefined){
        ProjectsService.getProject($stateParams.id, function (project) {
          $scope.project = project;
        });
      }else{
        $scope.project = {
          name: '',
          total_num_people:'',
          billable_headcount:'',
          bench_strength:'',
          owners: [],
          belong_to: ''
        };
      }

      /*Add New Owner Field*/
      $scope.newOwner = { name: [], id:[] };
      $scope.addOwner = function() {
        $scope.newOwner.name.push('');
        $scope.newOwner.id.push('');
      }

      $scope.autoCompleteOwner = function(cssClass, index){
        $( "."+cssClass ).autocomplete({
          source: function (searchTerm,response){
            ProjectsService.searchOwners(searchTerm.term).success(function (autocompleteResults) {
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
        angular.forEach($scope.project.owners, function(item,key){
          if(item._id == id){
            $scope.project.owners.splice(key,1);
          }
        })
      }
      $scope.updateOwner=function(){
        var index = 0;
        angular.forEach($scope.newOwner.name, function(item){
          var newOwnerId = $scope.newOwner.id[index];
          $scope.project.owners.push(newOwnerId);
          index++;
        })
      };
///organization

        $scope.autoCompleteOrganization = function(cssClass, index){
            $( "."+cssClass ).autocomplete({
                source: function (searchTerm,response){
                    ProjectsService.searchOrganizations(searchTerm.term).success(function (autocompleteResults) {
                        response($.map(autocompleteResults, function (autocompleteResult) {
                            return {
                                label: autocompleteResult.name,
                                value: autocompleteResult
                            }
                        }))
                    })
                },
                select: function ( event, selectedItem) {
                    $scope.project.belong_to.name = selectedItem.item.value.name;
                    $scope.project.belong_to._id = selectedItem.item.value._id;
                    $scope.$apply();
                    event.preventDefault();
                }
            });
        }

      //Add/Update project
      $scope.save = function(){
        $scope.updateOwner();

        if($stateParams.id === undefined){
          ProjectsService.addProject($scope.project, function(project){
            $scope.project = project;
            $state.transitionTo('auth.projects.view',{"id" : $scope.project._id});
          });
        }else{
          ProjectsService.updateProject($scope.project, function(project){
            $scope.project = project;
            $state.transitionTo('auth.projects.view',{"id" : $scope.project._id});
          });
        }
      }
    }]);

