/**
 * Created by Shweta on 8/5/15.
 * this component represents one ui crumb in the hierarchy
 * */

(function (){
    //angular.module('crumbs.selectorPills', []);

    angular.module('crumbs').directive('selectorPills', selectorPillComponent);

    selectorPillComponent.$inject= [];
    function selectorPillComponent () {
        return {
            restrict: 'E',
            template: '<div class = "selector-components">{{p_Ctrl.name}}</div>' +
            '<div id = "arrow"  ng-show="p_Ctrl.label" ng-click = "p_Ctrl.display_Options()"><i class="fa fa-chevron-circle-right"/></div>',
            controller: sPillController,
            controllerAs: 'p_Ctrl',
            bindToController: true,
            link: function (scope, elem, attrs) {
            }
        };//end of directive definition
    }

    sPillController.$inject = ['$scope'];
    function sPillController (scope){
       var p_Ctrl = this;
        p_Ctrl.name = scope.main.name;
        p_Ctrl.label = "k";
        //p_Ctrl.name = "Shweta";
    }
})();