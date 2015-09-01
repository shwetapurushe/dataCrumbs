/**
 * Created by Shweta on 8/5/15.
 * this controller will be one per pillContainer
 * parent controller to all the individual pills
 */
var tt;
(function(){

    angular.module('crumbs', ['angularSpinner', 'ngSanitize']);

    angular.module('crumbs').directive('contentEditable', contentEditableComponent);
    contentEditableComponent.$inject= ['$sce'];
    function contentEditableComponent ($sce){
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elem, attrs, ngModel) {
                if(!ngModel) return;

                // Specify how UI should be updated
                ngModel.$render = function() {
                    elem.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$evalAsync(read);
                });
                read();

                function read(){
                    var html = elem.html();
                    if ( attrs.stripBr && html == '<br>' ) {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        }
    }

    angular.module('crumbs').controller('mainController', crumbController);
    crumbController.$inject = ['WeaveService'];
    function crumbController (WeaveService){
        var main = this;
        main.WeaveService = WeaveService;
        main.userContent = "Hello";
        tt = main;
        main.WeaveService.request_WeaveTree();

        main.scriptOptions = [];
        main.change = function(){
            main.userContent = "Purushe";
        }

    }

})();

