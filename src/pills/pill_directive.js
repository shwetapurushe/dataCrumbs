/**
 * Created by Shweta on 8/5/15.
 * this component represents one ui crumb in the hierarchy
 * */

(function (){
    angular.module('crumbs.selectorPills', []);

    angular.module('crumbs.selectorPills').directive('selectorPills', selectorPillComponent);

    selectorPillComponent.$inject= [];
    function selectorPillComponent (){
        return {
            restrict : 'E',
            template : '<div class = "selector-pills">{{p_Ctrl.name}}</div>' +
            '<div id = "arrow"  ng-show="p_Ctrl.label"><i class="fa fa-chevron-circle-right"/></div>',
            controller : sPillController,
            controllerAs : 'p_Ctrl',
            bindToController : true,
            link : function(){

            }
        };//end of directive definition
    }

    function sPillController (){
       var p_Ctrl = this;

        p_Ctrl.label = "";
        p_Ctrl.name = "Shweta";
    }
})();