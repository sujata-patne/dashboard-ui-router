'use strict';

/**
 * @ngdoc filter
 * @name dashboardApp.filter:organizationsFilter
 * @function
 * @description
 * # organizationsFilter
 * Filter in the dashboardApp.
 */
angular.module('dashboardApp')
  .filter('organizationsFilter', [function () {
    var filter = function(array,criteria){
      var filteredArray = [];
      array.forEach(function(item){
        if(criteria === 'all'){
          filteredArray.push(item);
        }else if(criteria === 'active' && item.completed === false){
          filteredArray.push(item);
        }else if(criteria === 'completed' && item.completed === true){
          filteredArray.push(item);
        }
      });
      return filteredArray;
    };
    return filter;
  }]);
