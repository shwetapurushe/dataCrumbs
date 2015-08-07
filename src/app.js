/**
 * Created by Shweta on 8/5/15.
 */
var x ;
(function(){

    angular.module('crumbs', ['crumbs.selectorPills']);

    angular.module('crumbs').controller('mainController', crumbController);

    crumbController.$inject = ['$scope'];
    function crumbController (scope){
        var main = this;
        scope.count = 10;
        main.logs = ['a', 's'];
        x = main.logs;

        main.add = function (){
            main.logs.push('c');
            console.log(main.logs);
        };
        main.sub = function (){
            main.logs.pop();
            console.log(main.logs);
        };
    }

    angular.module('crumbs').directive('pillAdder', pillAdder);
    function pillAdder (){
        return {
            restrict : 'E',
            template : '<div><button adding>Add another pill</button></div>'
        };// this directive adds new pills when clicked
    }


    angular.module('crumbs').directive('adding', adding);
    adding.$inject = ['$compile'];
    function adding ($compile){
        return function (scope, element){
            element.bind("click", function(){
                scope.count ++;
                scope.name = "WTF";
                //angular.element(document.getElementById('pillsContainer')).append($compile("<div><button class='btn btn-default'>Show alert #"+scope.name+"</button></div>")(scope));
                    //angular.element(document.getElementById('pillsContainer')).append($compile("<div class='selector-balls'>"+scope.name+"</div>")(scope));
                var el = $( "#pillsContainer" );
                    el.append($compile("<selector-pills></selector-pills>")(scope));
                angular.element(el);
            });
        }
    }
})();

