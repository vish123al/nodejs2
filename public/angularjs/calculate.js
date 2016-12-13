// 1. On clicking Equals, the calculator restarts
// 2. If you click another operator after pressing first operator, the first operator is taken into account.
// 3. If there is an error on the display screen, please reset and use.
// 4. Entering multiple dots.
// 5. 6-6-9+2

//loading the 'login' angularJS module
var oCalc = angular.module('onlineCalculator', []);
//defining the login controller
oCalc.controller('calc', function($scope, $http) {

	$scope.secNumb = 0;
	$scope.result = 0;
	
	$scope.output = '0'; // To display on calc screen
	$scope.prvOutput = ''; // To store previous number

	$scope.operator = ''; // To get lateset operator
	$scope.prvOperator = ''; // To store previous operator
	$scope.count = 1; // To check whether the numbered entered is the first one
	
	$scope.resultFlag = 0; // 0: User Input, 1: Error, 2: Calculation Result
	$scope.opratorFlag = 1;

	$scope.computeFlag = 0;

	$scope.reset = function () {
		$scope.secNumb = 0;
		$scope.result = 0;
		
		$scope.output = '0';
		$scope.prvOutput = '';
		$scope.operator = '';
		$scope.count = 1;
		
		$scope.resultFlag = 0;
		$scope.opratorFlag = 1;
	};

	$scope.clearLast = function () {
		$scope.output = '0';
		$scope.count = 1;
		$scope.prvOutput = '';
	};

	$scope.compute = function () {
		
		if($scope.operator == ''){
			$scope.output = data.result;
		}
		else{
			$scope.calcServer($scope.operator , $scope.result, $scope.prvOutput);
		}

		$scope.computeFlag = 1;

		setTimeout(function(){$scope.computeInitialize();}, 100);
	};

	$scope.computeInitialize = function () {
		if($scope.computeFlag == 1){
			
			$scope.prvOutput = 0;
			$scope.result = 0;
			console.log("$scope.result:"+$scope.result);
			$scope.count = 1;
			$scope.operator = '';
			$scope.resultFlag = 0;
			$scope.opratorFlag = 1;

			$scope.computeFlag = 0;
		}
	}

	$scope.division = function () {
		if($scope.opratorFlag == 0){
			if($scope.prvOutput != '0')
			{
				if(($scope.result != '0') && ($scope.operator == '+'))
				{
					$scope.calcServer('+' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == '-'))
				{
					$scope.calcServer('-' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == 'X')){
					$scope.calcServer('X' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == '/')){
					$scope.calcServer('/' , $scope.result, $scope.prvOutput); 
				}
				else{
				$scope.result = $scope.prvOutput;
				}
			}
			else if($scope.prvOutput == '0' && ($scope.operator == 'X' || $scope.operator == '/')){
				$scope.calcServer($scope.operator , $scope.result, $scope.prvOutput);
			}


			$scope.operator = '/';
			$scope.output = $scope.result;
			$scope.prvOutput = '0';
			$scope.count = 1;

			$scope.opratorFlag = 1;
		}
	};

	$scope.multiply = function () {
		if($scope.opratorFlag == 0){
			if($scope.prvOutput != '0')
			{
				if(($scope.result != '0') && ($scope.operator == '+'))
				{
					$scope.calcServer('+' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == '-'))
				{
					$scope.calcServer('-' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == 'X')){
					$scope.calcServer('X' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == '/')){
					$scope.calcServer('/' , $scope.result, $scope.prvOutput); 
				}
				else{
				$scope.result = $scope.prvOutput;
				}
			}

			else if($scope.prvOutput == '0' && ($scope.operator == 'X' || $scope.operator == '/')){
				$scope.calcServer($scope.operator , $scope.result, $scope.prvOutput);
			}


			$scope.operator = 'X';
			$scope.output = $scope.result;
			$scope.prvOutput = '0';
			$scope.count = 1;

			$scope.opratorFlag = 1;
		}
	};

	$scope.subtract = function () {
		if($scope.opratorFlag == 0){
			if($scope.prvOutput != '0')
			{
				if(($scope.result != '0') && ($scope.operator == '+'))
				{
					$scope.calcServer('+' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == '-'))
				{
					$scope.calcServer('-' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == 'X')){
					$scope.calcServer('X' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == '/')){
					$scope.calcServer('/' , $scope.result, $scope.prvOutput); 
				}
				else{
					$scope.result = $scope.prvOutput;
				}
			}
			else if($scope.prvOutput == '0' && ($scope.operator == 'X' || $scope.operator == '/')){
				$scope.calcServer($scope.operator , $scope.result, $scope.prvOutput);
			}

			$scope.operator = '-';
			$scope.output = $scope.result;
			$scope.prvOutput = '0';
			$scope.count = 1;

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
			/*if(){

			}*/
			$scope.output = num;
			$scope.resultFlag = 0;
			$scope.count++;
		}

		$scope.opratorFlag = 0;
		$scope.prvOutput = $scope.output;
		/*else{
			$scope.output = $scope.output + num;
		}*/
	};

	$scope.add = function () {
		if($scope.opratorFlag == 0){
			if($scope.prvOutput != '0'){
				if(($scope.result != '0') && ($scope.operator == '+'))
				{
					$scope.calcServer('+' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == '-'))
				{
					$scope.calcServer('-' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == 'X')){
					$scope.calcServer('X' , $scope.result, $scope.prvOutput); 
				}
				else if(($scope.result != '0') && ($scope.operator == '/')){
					$scope.calcServer('/' , $scope.result, $scope.prvOutput); 
				}
				else{
				$scope.result = $scope.prvOutput;
				}
			}

			else if($scope.prvOutput == '0' && ($scope.operator == 'X' || $scope.operator == '/')){
				$scope.calcServer($scope.operator , $scope.result, $scope.prvOutput);
			}

			$scope.operator = '+';
			$scope.output = $scope.result;
			$scope.prvOutput = '0';
			$scope.count = 1;

			$scope.opratorFlag = 1;
		}
	};

	$scope.calcServer = function(operator, num1,num2){
		
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
