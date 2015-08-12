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
            scope :{
                input : '='
            },
            template: '<div class = "selector-components" ng-click="p_Ctrl.display_Options()">' +
            '{{p_Ctrl.input.getLabel()}} <i id = "arrow" ng-show="p_Ctrl.input.hasChildBranches()" class="fa fa-chevron-circle-right"/></div>',
            controller: sPillController,
            controllerAs: 'p_Ctrl',
            bindToController: true,
            link: function (scope, elem, attrs) {

            }
        };//end of directive definition
    }

    sPillController.$inject = ['$scope', 'WeaveService'];
    function sPillController (scope, WeaveService){
       var p_Ctrl = this;
        p_Ctrl.WeaveService = WeaveService;
        p_Ctrl.display_Options = display_Options;

        p_Ctrl.current_node = {
            leaf:null,
            has_Children : true,
            tree_node: null,
            current_childList:null
        };

        function display_Options(){
            p_Ctrl.WeaveService.display_Options(p_Ctrl.input);
        }
    }
})();