'use strict';

function NavigationController($scope) {
	var self = this;
	//var user = $scope.currentUser;

	self.items = [{
		id: "nav-dashboard",
		state: "missions",
		icon: "fa-dashboard",
		label: 'common.home'
	}, {
		id: "nav-wms",
		//state: "quests",
		icon: "fa-globe",
		label: 'wms.label',
		collapsed: true,
		items: [{
			id: "nav-wms-storages",
			state: "quests",
			label: 'wms.logistics.storage.label'
		}]
	}];
};

function Navigation() {
  return {
	  controller: NavigationController,
	  controllerAs: "nav",
	  templateUrl: "app/missionsNavigation/missionsNavigation.html",
	  restrict: 'EA',
      link: function (scope, element, attrs) {
      }
  };		
};

function NavigationItems() {
  return {
	  replace: true,
	  transclude: true,
	  template: "<ng-transclude></ng-transclude>"
  };		
};

angular.module('lifeApp')
  .directive('missionsNavigation', Navigation)
  .directive('missionsNavigationItems', NavigationItems);
