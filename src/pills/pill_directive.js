/**
 * Created by Shweta on 8/5/15.
 * this component represents one ui crumb in the hierarchy
 * */
var yy;
(function (){
    //angular.module('crumbs.selectorPills', []);

    angular.module('crumbs').directive('selectorPills', selectorPillComponent);

    selectorPillComponent.$inject= [];
    function selectorPillComponent () {
        return {
            restrict: 'E',
            scope :{
                input : '=',
                pnode: '='
            },
            template: '<div class = "selector-components" ng-click="p_Ctrl.display_Children()">{{p_Ctrl.current_node.leaf}}</div>' +
            '<div id = "arrow" ng-show = "p_Ctrl.current_node.has_Children" ng-click="p_Ctrl.display_Children()"><i class="fa fa-chevron-circle-right"/></div>',
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
        p_Ctrl.display_Children = display_Children;

        p_Ctrl.current_node = {
            leaf:null,//name
            has_Children : null,//boolean if it is has children
            tree_node: null,//actual weave node
            children: null//list of children
        };

        p_Ctrl.current_node.leaf = p_Ctrl.input.getLabel();
        p_Ctrl.current_node.has_Children = p_Ctrl.input.isBranch();
        p_Ctrl.current_node.tree_node = p_Ctrl.input;

        yy = p_Ctrl.current_node;

        function display_Children(){
            p_Ctrl.WeaveService.display_Options(p_Ctrl.current_node);//using the actual node
        }
    }
})();