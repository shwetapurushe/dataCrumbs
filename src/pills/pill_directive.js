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
                input : '=',
                pos : '='
            },
            template: '<div class = "selector-components" ng-click="p_Ctrl.display_Siblings()">{{p_Ctrl.current_node.leaf}}</div>' +
            '<div id = "arrow" ng-show = "p_Ctrl.current_node.isBranch && p_Ctrl.pos" ng-click="p_Ctrl.display_Children()"><i class="fa fa-chevron-circle-right"/></div>',
            controller: sPillController,
            controllerAs: 'p_Ctrl',
            bindToController: true,
            link: function (scope, elem, attrs) {

            }
        };//end of directive definition
    }

    sPillController.$inject = ['WeaveService'];
    function sPillController (WeaveService){
       var p_Ctrl = this;
        p_Ctrl.WeaveService = WeaveService;
        p_Ctrl.display_Children = display_Children;
        p_Ctrl.display_Siblings = display_Siblings;

        p_Ctrl.current_node = {
            leaf:null,//name
            tree_node: null,//actual weave node
            isBranch: null, //boolean if it has children
            children: null,//list of children
            siblings : null//list of siblings
        };

        p_Ctrl.current_node.leaf = p_Ctrl.input.getLabel();
        p_Ctrl.current_node.tree_node = p_Ctrl.input;
        p_Ctrl.current_node.isBranch = p_Ctrl.input.isBranch();

        function display_Children(){
            p_Ctrl.WeaveService.display_Options(p_Ctrl.current_node, true);//using the actual node
        }

        function display_Siblings(){
            p_Ctrl.WeaveService.display_Options(p_Ctrl.current_node)
        }
    }
})();