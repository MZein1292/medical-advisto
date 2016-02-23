'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
var app = angular.module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ntt.TreeDnD',
    'ui.bootstrap',
    'rzModule'
  ]);

app.config( function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state("Default", {})
        .state('/', {
            url:'/',
            views:{
                "main" : {
                    templateUrl: '../views/step_one.html',
                    controller: 'MainCtrl',
                    controllerAs: 'controllers/main'
                }
            }
        })
        .state('step2', {
            url:'/step2',
            views:{
                "main" : {
                    templateUrl: '../views/step_two.html',
                    controller: 'MainCtrl',
                    controllerAs: 'controllers/main'
                }
            }
        })
    
        .state('step3', {
            url:'/step3',
            views:{
                "main" : {
                    templateUrl: '../views/step_three.html',
                    controller: 'MainCtrl',
                    controllerAs: 'controllers/main'
                }
            }
        })
    
        .state('admin', {
            url:'/admin',
            views:{
                "main": {
                    templateUrl: '../views/admin.html',
                    controller: 'FilterController',
                    controllerAs: 'controllers/admin'
                }
            }
        })
        .state('editdrug', {
            views: {
                "modal": {
                    templateUrl: '../views/modal.html'
                }
            },
            onEnter: function($state){
                  // Hitting the ESC key closes the modal
                  $(document).on('keyup', function(e){
                    if(e.keyCode === 27){
                      $(document).off('keyup');
                      $state.go('admin');
                    }
                  });

                  // Clicking outside of the modal closes it
                  $(document).on('click', '.Modal-backdrop, .Modal-holder', function() {
                    $state.go('admin');
                  });

                  // Clickin on the modal or it's contents doesn't cause it to close
                  $(document).on('click', '.Modal-box, .Modal-box *', function(e) {
                    e.stopPropagation();
                  });
                },
            abstract: true
        })
        .state('editdrug.edit', {
            params: {nodedata: null, results: null,},
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {

                    $modal.open({
                        templateUrl: '../views/editDrug.html',
                        controller: 'EditDrugCtrl',
                        controllerAs: 'controllers/editdrug',
                    }).result.then( function (opts) {
                        //TODO: http call to update data
                        if(opts.cancel) {
                            $state.go('admin');
                        } else if(opts.deleteNode) {
                            //TODO: http call to delete
                        } else if(opts.updateNode) {
                            //TODO: http call to update node
                            /*
                            $http.post('http://127.0.0.1:6231/editDrugs', {nodedata: opts.nodedata}).
                                then(function (res) {
                                    //called if succuess
                                }, function (res) {
                                    //called if error
                                });
                            */    
                        }
                        $state.go('admin');
                    });
                }]
        });

 });