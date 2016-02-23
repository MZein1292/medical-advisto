'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller(
        'FilterController', [
            '$scope', '$localStorage', '$http' , function ($scope, '$localStorage', $http) {

                $http.get('http://127.0.0.1:6231/getDrugs').success(function (data) {
                    $scope.tree_data = $TreeDnDConvert.line2tree(data, 'DrugId', 'parent');
                });
                
                $scope.signin = function() {
                    var formData = {
                        username: $scope.username,
                        password: $scope.password
                    };

                    //http signin

                };

                $scope.logout = function() {

                };

            }
        ]
    );