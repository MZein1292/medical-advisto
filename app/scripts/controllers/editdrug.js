'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:EditDrugCtrl
 * @description
 * # EditDrugCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('EditDrugCtrl', [
  	'$scope' , '$http', '$stateParams', '$modalInstance', function ($scope, $http, $stateParams, $modalInstance) {
  		var nodedata = $stateParams.nodedata;
  		console.log(nodedata);

  		$scope.drugname = nodedata.drug_name;
  		$scope.drugtype = nodedata.drug_type;
  		$scope.convert2drug = Number(nodedata.convert2drug);
  		$scope.convert2morphine = Number(nodedata.convert2morphine);
  		$scope.stepflag = nodedata.step_flag;
  		$scope.c2d_lower = Number(nodedata.c2d_lower);
  		$scope.c2d_upper = Number(nodedata.c2d_upper);
  		$scope.c2m_lower = Number(nodedata.c2m_lower);
  		$scope.c2m_upper = Number(nodedata.c2m_upper);
  		$scope.genericname = nodedata.generic_names;
  		$scope.doses = nodedata.dosearray.split(", ");
      $scope.dosesv = nodedata.dose_array_v.split(", ");
  		$scope.newdrug = false;
  		$scope.status = {
  		    isopen: false
  		  };
      var doseind;

      if(nodedata.parent != null) {
        $scope.parentDrug = false;
      } else if (nodedata.__children__.length > 0) {
        $scope.parentDrug = true;
      }
  		

  		$scope.getContent = function (dose, $index) {
        doseind = $index;
  			$scope.doseopt = dose;
        $scope.doseoptv = dose;
  			$scope.newdrug = true;
  		}

  		$scope.addDrug = function () {
        //console.log($scope.doseopt);
        var datemp = $scope.doses;
        datemp.push("New Dose Option");
        $scope.doses = datemp;
        $scope.doseopt = datemp[datemp.length - 1];
        $scope.doseoptv = 0;
        doseind = datemp.length - 1;
        $scope.newdrug = true;
  		}

      $scope.saveDrugDose = function () {
        var datemp = $scope.doses;
        var datemp2 = $scope.dosesv;
        datemp[doseind] = $scope.doseopt;
        datemp2[doseind] = $scope.doseoptv;
        $scope.doses = datemp;
        $scope.dosesv = datemp2;
      }

      $scope.saveAllDrug = function () {
        //TODO: Set up http call to update convert2drug for parent and children
      }

      $scope.saveAllMorp = function () {
        //TODO: Set up http call to update convert2morphine for parent and children
      }

      $scope.saveAllc2dl = function () {
        //TODO: Set up http call to update c2d_lower for parent and children
      }

      $scope.saveAllc2du = function () {
        //TODO: Set up http call to update c2d_upper for parent and children
      }

      $scope.saveAllc2ml = function () {
        //TODO: Set up http call to update c2m_lower for parent and children
      }

      $scope.saveAllc2mu = function () {
        //TODO: Set up http call to update c2m_upper for parent and children
      }

      $scope.delete = function () {
        console.log("Remove Drug");

        $modalInstance.close({cancel: false, nodedata: nodedata, deleteNode:true});
      };

  		$scope.ok = function() {
        var nnodedata = {
            id: nodedata.id,
            DrugId: nodedata.DrugId,
            drug_name: $scope.drugname,
            drug_type: $scope.drug_type,
            convert2drug: $scope.convert2drug,
            convert2morphine: $scope.convert2morphine,
            dose_array: $scope.doses,
            step_flag: $scope.stepflag,
            c2d_lower: $scope.c2d_lower,
            c2d_upper: $scope.c2d_upper,
            c2m_lower: $scope.c2m_lower,
            c2m_upper: $scope.c2m_upper
        };

  			$modalInstance.close({cancel: false, nodedata: nnodedata, deleteNode: false, updateNode: true});
  		};

  		$scope.cancel = function() {
  			$modalInstance.close({cancel: true});
  		};

  }]);