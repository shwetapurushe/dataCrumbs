/**
 * Created by Shweta on 8/5/15.
 */
(function(){

    angular.module('crumbs', []);

    angular.module('crumbs').controller('mainController', crumbController);

    crumbController.$inject = ['$scope', '$compile', 'WeaveService'];
    function crumbController (scope, $compile, WeaveService){
        var main = this;

        main.WeaveService = WeaveService;
        main.WeaveService.showUl = false;

        main.request_WeaveTree = request_weaveTree;
        main.addComponent = addComponent;
        main.add_init_Crumb = add_init_Crumb;
        main.handle_Node_Selection = handle_Node_Selection;

        main.weave_node = {};

        //requesting the Weave root tree as soon as weave is ready
        main.request_WeaveTree();

        function handle_Node_Selection (i_node){
            //1.add the node pill
            main.addComponent(i_node.node);
            main.WeaveService.showUl = !main.WeaveService.showUl;//close options display
        }

        function addComponent (i_node){
            main.weave_node = i_node;
            var compiledHtml = $compile("<selector-pills input = 'main.weave_node'></selector-pills>")(scope);

            $("#pillsContainer").append(compiledHtml);
        }

        //this function adds the data source initial pill, done only once as soon as weave loads
        function add_init_Crumb (){
            if(main.WeaveService.request_WeaveTree()){
                main.addComponent(main.WeaveService.weave_Tree);//using root element
                scope.$apply();
            }
            else{
                setTimeout(main.add_init_Crumb, 100);
            }

        }

        function request_weaveTree (){
            main.WeaveService.request_WeaveTree();
        }


        //works with ng-repeat
        //scope.count = 10;
        main.logs = ['asinine', 'about', 'jumbla', 'love', 'sssshweta', 'slop'];
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

