//loading the 'login' angularJS module
var oCalc = angular.module('onlineCalculator', []);
//defining the login controller
oCalc.controller('calc', function($scope, $http) {

	$scope.secNumb = 0;
	$scope.result = 0;
	
	$scope.output = '0'; // To display on calc screen
	$scope.operator = '';
	$scope.count = 1;
	
	$scope.resultFlag = 0; // 0: User Input, 1: Error, 2: Calculation Result
	$scope.opratorFlag = 0;

	$scope.computeFlag = 0;

	$scope.reset = function () {
		$scope.secNumb = 0;
		$scope.result = 0;
		
		$scope.output = '0';
		$scope.operator = '';
		$scope.count = 1;
		
		$scope.resultFlag = 0;
		$scope.opratorFlag = 0;
	};

	$scope.clearLast = function () {
		$scope.output = '0';
		$scope.count = 1;
	};

	$scope.compute = function () {
		$scope.secNumb = ( $scope.output * 1);

		$scope.calcServer($scope.operator , $scope.result, $scope.secNumb);

		$scope.computeFlag = 1;

		setTimeout(function(){$scope.computeInitialize();}, 100);
	};

	$scope.computeInitialize = function () {
		if($scope.computeFlag == 1){
			$scope.secNumb = 0;
			$scope.result = 0;
			console.log("$scope.result:"+$scope.result);
			$scope.count = 1;
			$scope.resultFlag = 0;
			$scope.opratorFlag = 0;

			$scope.computer = 0;
		}
	}

	$scope.division = function () {

	};

	$scope.multiply = function () {

	};

	$scope.subtract = function () {
		if($scope.opratorFlag == 0){
			$scope.operator = '-';
			$scope.secNumb = ( $scope.output * 1);
			$scope.calcServer($scope.operator , $scope.result, $scope.secNumb);

			$scope.opratorFlag = 1;
		}
	};
	
	$scope.updateScreen = function (num) {
		if($scope.count == 1 && num == '.'){
			$scope.output = '0.';
			$scope.count++;
		}

		else if(num == "conn"){
			$scope.output = "Error Occured In connection to server.";
		}
		else if($scope.resultFlag == 0 && $scope.count > 1){
			$scope.output = $scope.output + num;
		}
		else if($scope.resultFlag == 1 || $scope.count == 1){
			$scope.output = num;
			$scope.resultFlag = 0;
			$scope.count++;
		}
		$scope.opratorFlag = 0;
		/*else{
			$scope.output = $scope.output + num;
		}*/
	};

	$scope.add = function () {
		if($scope.opratorFlag == 0){
			$scope.operator = '+';
			$scope.secNumb = ( $scope.output * 1);
			$scope.calcServer($scope.operator , $scope.result, $scope.secNumb);

			$scope.opratorFlag = 1;
		}
	}

	$scope.calcServer = function(operator, num1,num2){
		console.log("num1:"+num1);
		$http({
			method : "GET",
			url : '/calculator',
			params : {
				"operator" : operator,
				"num1" : num1,
				"num2" : num2
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.output = data.result;
				$scope.resultFlag = 1;
			}
			else
			{
				$scope.result = data.result;
				$scope.output = data.result;
				$scope.resultFlag = 1;
			}
		}).error(function(error) {
			$scope.updateScreen("conn");
		});

	}
})
