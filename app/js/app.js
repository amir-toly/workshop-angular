var workshop = angular.module('workshop', []).
		filter('truncate', function() {
				return function(input) {
					var out = input;
					if (input.length > 12)
						out = input.substring(0, 12) + "...";
					return out;
				}
		});

function LogCtrl($scope, $http) {
	$scope.logs = [];
	$scope.selectedStatus = {
			"200": true,
			"404": true,
			"500": true
	};
	$scope.selectedMethods = {
			"GET": true,
			"POST": true,
			"PUT": true,
			"DELETE": true
	};
	$scope.selectedLogs = [];
	var filterLogs = function() {
		$scope.selectedLogs = [];
		
		for (var i = 0; i < $scope.logs.length; i++) {
			var statusPresent = false;//TODO(use a set to avoid duplicates)
			for (var status in $scope.selectedStatus) {
				if ($scope.logs[i].status == status && $scope.selectedStatus[status]) {
					statusPresent = true;
				}
			}//TODO(is there a contains() function in JS?)
			
			for (var method in $scope.selectedMethods) {
				if ($scope.logs[i].method == method && $scope.selectedMethods[method] && statusPresent) {
					$scope.selectedLogs[$scope.selectedLogs.length] = $scope.logs[i];
				}
			}//TODO(is there a contains() function in JS?)
		}//TODO(use loop iterators instead of indexes)
	};
	$http.get('/logs').success(function(data) {
			$scope.logs = data;
			filterLogs();
	});
	$scope.$watchCollection('selectedStatus', filterLogs);
	$scope.$watchCollection('selectedMethods', filterLogs);
}
