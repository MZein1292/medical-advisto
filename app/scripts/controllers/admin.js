'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller(
        'FilterController', [
            '$scope', '$TreeDnDConvert', '$http' , function ($scope, $TreeDnDConvert, $http) {
                var tree = {};
                $scope.tree_data = {};
                $scope.my_tree = tree = {};

                $scope._filter = {};

                
                $scope.expanding_property = {
                    field:       "drug_name",
                    titleClass:  'text-center',
                    cellClass:   'v-middle',
                    displayName: 'Drug Name'
                };

                $scope.col_defs = [
                    {
                        field: "drug_type",
                        displayName: "Type"
                    },
                    {
                        field: "drug2morphine",
                        displayName: "Drug to Morphine Ratio"
                    },
                    {
                        field: "dosearray",
                        displayName: "Dose Options"
                    }, {
                        titleStyle:    {
                            'width': '80pt'
                        },
                        titleClass:    'text-center',
                        cellClass:     'v-middle text-center',
                        displayName:   'Edit Drug',
                        cellTemplate:  '<button ui-sref="editdrug.edit({nodedata:node})" class="btn btn-default btn-sm">Edit</button>'
                    }];

                $scope.expanding_property_inside = {
                    field:       "drug_name",
                    titleClass:  'text-center',
                    titleTemplate: '<label> {{expandingProperty.displayName || expandingProperty.field || expandingProperty}} <input class="form-control" ng-model="_filter.drug_name"></label>',
                    cellClass:   'v-middle',
                    displayName: 'drug_name' 
                };

                $scope.col_defs_inside = [
                    {
                        field:         "drug_type",
                        titleClass:  'text-center',
                        titleTemplate: '<label> {{col.displayName || col.field}} <input class="form-control" ng-model="_filter.type"></label>'
                    },
                    {
                        field:         "drug_name",
                        titleClass:  'text-center',
                        titleTemplate: '<label> {{col.displayName || col.field}} <input class="form-control" ng-model="_filter.parent"></label>'
                    },
                    {
                        field:         "drug2morphine",
                        titleClass:  'text-center',
                        titleTemplate: '<label> {{col.displayName || col.field}} <input class="form-control" ng-model="_filter.drug2morphine"></label>'
                    },
                    {
                        field:         "dosearray",
                        titleClass:  'text-center',
                        titleTemplate: '<label> {{col.displayName || col.field}} <input class="form-control" ng-model="_filter.dosagearray"></label>'
                    }];

                // DataDemo.getDatas() can see in 'Custom Option' -> Tab 'Data Demo'
                
                $http.get('http://127.0.0.1:6231/getDrugs').success(function (data) {
                    $scope.tree_data = $TreeDnDConvert.line2tree(data, 'DrugId', 'parent');
                });
                
            }
        ]
    );