/**
 * Created by Shweta on 8/5/15.
 */
(function(){

    angular.module('crumbs', ['angularSpinner']);

    angular.module('crumbs').controller('mainController', crumbController);

    crumbController.$inject = ['$scope', 'WeaveService'];
    function crumbController (scope, WeaveService){
        var main = this;

        main.WeaveService = WeaveService;
        main.WeaveService.showUl = false;

        main.request_WeaveTree = request_weaveTree;
        main.addCrumb = addCrumb;
        main.add_init_Crumb = add_init_Crumb;
        main.handle_Node_Selection = handle_Node_Selection;

        main.weave_node = {};
        main.crumbTrail = [];
        main.crumbLog = [];

        //requesting the Weave root tree as soon as weave is ready
        main.request_WeaveTree();

        function handle_Node_Selection (i_node){
            //1.add the node pill
            main.addCrumb(i_node.node);
            main.WeaveService.showUl = !main.WeaveService.showUl;//close options display
        }

        function addCrumb(i_node){
            if(i_node){
                var label = i_node.getLabel();
                if($.inArray(label, main.crumbLog) == -1){//if it hasnt been added before
                    main.crumbTrail.push(i_node);
                    main.crumbLog.push(label);
                }
                else{

                }
            }
        }

        //this function adds the data source initial pill, done only once as soon as weave loads
        function add_init_Crumb (){
            if(main.WeaveService.request_WeaveTree()){
                var ds = main.WeaveService.weave_Tree.getChildren();
                var init_node = ds[0];

                main.addCrumb(init_node);//using root element
                scope.$apply();//because digest completes by the time the tree root is fetched
            }
            else
                setTimeout(main.add_init_Crumb, 100);
        }

        function request_weaveTree (){
            main.WeaveService.request_WeaveTree();
        }

        //works with ng-repeat
        //main.logs = [{name : 'a', kite: 99}, {name : 'shweta', kite: 80}];
        main.list = ['asinine', 'about', 'jumbla', 'love', 'sssshweta', 'slop'];

    }

})();

