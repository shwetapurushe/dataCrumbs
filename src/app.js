/**
 * Created by Shweta on 8/5/15.
 */
(function(){

    angular.module('crumbs', []);

    angular.module('crumbs').controller('mainController', crumbController);

    crumbController.$inject = ['$scope', '$compile', 'WeaveService'];
    function crumbController (scope, $compile, WeaveService){
        var main = this;
        main.name = "Purushe";
        main.WeaveService = WeaveService;
        main.showUl = true;

        main.request_WeaveTree = request_weaveTree;
        main.addComponent = addComponent;
        main.add_ds_Crumb = add_ds_Crumb;
        main.display_Options = display_Options;

        //requesting the Weave root tree as soon as weave is ready
        main.request_WeaveTree();


        function display_Options(){
           // main.options = main.WeaveService.currentProvider;//set the provider
            //main.showUl = true;
        }
        function addComponent (){
            var compiledHtml = $compile("<selector-pills></selector-pills>")(scope);

            $("#pillsContainer").append(compiledHtml);
        };

        //this function add the data source initial pill
        function add_ds_Crumb (){
           main.WeaveService.add_init_Crumb();
        };

        function request_weaveTree (){
            main.WeaveService.request_WeaveTree();
        }


        //works with ng-repeat
        //scope.count = 10;
        main.logs = ['a', 's', 'j', 'l'];
        // main.add = function (){
        //    main.logs.push('c');
        //    console.log(main.logs);
        //};
        //main.sub = function (){
        //    main.logs.pop();
        //    console.log(main.logs);
        //};
    }

    //angular.module('crumbs').directive('pillAdder', pillAdder);
    //function pillAdder (){
    //    return {
    //        restrict : 'E',
    //        template : '<div><button adding>Add another pill</button></div>'
    //    };// this directive adds new pills when clicked
    //}
    //
    //
    //angular.module('crumbs').directive('adding', adding);
    //adding.$inject = ['$compile'];
    //function adding ($compile){
    //    return function (scope, element){
    //        element.bind("click", function(){
    //            scope.count ++;
    //            scope.name = "WTF";
    //            //angular.element(document.getElementById('pillsContainer')).append($compile("<div><button class='btn btn-default'>Show alert #"+scope.name+"</button></div>")(scope));
    //                //angular.element(d[ocument.getElementById('pillsContainer')).append($compile("<div class='selector-balls'>"+scope.name+"</div>")(scope));
    //            var el = $( "#pillsContainer" );
    //                el.append($compile("<selector-pills></selector-pills>")(scope));
    //            angular.element(el);
    //        });
    //    }
    //}
})();

