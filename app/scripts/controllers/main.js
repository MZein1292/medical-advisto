'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */

var app = angular.module('frontendApp');

app.controller('MainCtrl', ['$scope', '$http', '$timeout', '$location', MainCtrl ]);


    function MainCtrl($scope, $http, $timeout, $location) {
        
        
        console.log($scope.param);
        
        $scope.rows = [];
    var rowTmpl = {
        'drug': "Drug",
        'dose': 'Dose',
        'period': "Period",
    };
        
        
        //DATA FROM DATABASE
    
    $http.get('http://medicaladvisto.com/getDrugs').success(function (data) {
     
        
            $scope.ourDatas = data;
        
    
        });
        
        
        
         $scope.setDose = function (row, drug) {
             //console.log('Selcted', drug);
             var index = $scope.ourDatas.indexOf(drug);
             if (index === -1) return;

            var doseArray = $scope.ourDatas[index].dose_array.split(',');
            row.doseOptions = doseArray;
        };
        
        
        
        //PERIOD
       
            $scope.period = {
                currentPeriod: "1 day"
            };
        
            $scope.periods = [
                "1 day",
                "2 days",
                "3 days",
                "4 days"
                ];
    
        

            //ADDING ROWS
    
            $scope.rows = [
                {   
                    'drug': "Drug",
                    'dose':'Dose',
                    'period': "Period",
                }   
                
            ];
    
            $scope.addRow = function () {
                var newRow = angular.copy(rowTmpl);
                newRow.selectedPeriod = null;
                newRow.singleSelect = null;
                $scope.rows.push(newRow);

            };

            $scope.removeRow = function(rowIndex){
                if (confirm('Are you sure you want to delete this?'))
                    $scope.rows.splice(rowIndex, 1);
            }
    
            //TILE POINT FOR TUTORIAL
    
            $scope.activateInput = function () {
                var elm = document.getElementsByTagName("select")[0];
                var elm1 = document.getElementsByTagName("select")[1];
                var elm2 = document.getElementsByTagName("select")[2];
                var elm3 = document.getElementsByTagName("select")[3];
                $timeout(function () {
                    angular.element(elm).triggerHandler('click');
                    angular.element(elm1).triggerHandler('click');
                    angular.element(elm2).triggerHandler('click');
                    angular.element(elm3).triggerHandler('click');
                });
            }
    
            //SLIDER
    
            $scope.priceSlider3 = 50;

            // second slider value
        
            $scope.priceSlider4 = 50;

            $scope.$watch('priceSlider3', function(val) {
                
                $scope.priceSlider4 = 100 - val;
            });

        $scope.$watch('priceSlider4', function(val) {
            $scope.priceSlider3 = 100 - val;
        });
        
        
         
   
        
        
        $scope.stepTwo = function() {
            $location.path('/step2')
        };
    
        $scope.stepThree = function() {
            $location.path('/step3')
        };



    
    

  };


