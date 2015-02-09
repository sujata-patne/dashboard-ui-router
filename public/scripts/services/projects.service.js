'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.projects.service
 * @description
 * # projects.service
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('ProjectsService', ['$http', function ($http) {
    var service = {};
    service.baseRestUrl = 'http://localhost:8888';

    service.getProjectList = function(success){
      $http.get(service.baseRestUrl+'/api/projects/').success(function (items) {
        success(items);
      });
    }
      service.getProject = function (id, success) {
        $http.get(service.baseRestUrl+'/api/projects/'+id).success(function (item) {
          success(item);
        });
      }
    service.addProject = function (newProject, success) {
      $http.post(service.baseRestUrl+'/api/projects/', newProject).success(function(items){
        success(items);
      });
    }
    service.deleteProject = function (project, success) {
      $http.delete(service.baseRestUrl+'/api/projects/' + project._id, project).success(function (result) {
        success(result);
      });
    }
    service.updateProject = function (newProject, success) {
      $http.put(service.baseRestUrl+'/api/projects/' + newProject._id, newProject).success(function(items){
        success(items);
      });
    }

      service.getObjectDataStr = function (objects) {
        var objectDataList = '';
        angular.forEach(objects, function(object) {
          if('firstName' in object){
            objectDataList += object.firstName + " " + object.lastName + ", ";
          }else{
            objectDataList += object.name + ", ";
          }

        });
        var pos = objectDataList.lastIndexOf(",");
        objectDataList = objectDataList.substr(0, pos);
        return objectDataList;
      }
      service.searchOwners = function (term) {
        return $http.get(service.baseRestUrl+'/api/projects/owners/' + term)
      }
      service.searchOrganizations = function (term) {
        return $http.get(service.baseRestUrl+'/api/projects/organizations/' + term)
      }
      service.chartData = {
        "labels":["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        "series":['Series A', 'Series B','Series C', 'Series D'],
        "data":[
          [65, 59, 25, 81, 56, 55,45, 59, 45, 31, 65, 48],
          [28, 48, 35, 19, 35, 27,65, 59, 25, 81, 56, 55],
          [45, 59, 45, 31, 65, 48,65, 59, 25, 81, 56, 55],
          [58, 48, 55, 92, 25, 35,28, 48, 35, 19, 35, 27]
        ]
      }

    return service;
  }]);

