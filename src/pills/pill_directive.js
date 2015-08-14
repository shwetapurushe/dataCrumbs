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
            template: '<div class = "selector-components">{{p_Ctrl.input.kite}} <i id = "arrow" class="fa fa-chevron-circle-right"/></div>',
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

    }
})();