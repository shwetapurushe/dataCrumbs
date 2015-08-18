/**
 * Created by Shweta on 8/5/15.
 * this controller will be one per pillContainer
 * parent controller to all the individual pills
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
        main.manage_Crumbs = manage_Crumbs;
        main.add_init_Crumb = add_init_Crumb;

        //is the last added node in the stack, needed for comparison
        //structure of each node should be {w_node //actual node ; p_node //its parent node}
        main.weave_node = null;
        main.crumbTrail = [];
        main.crumbLog = [];

        //requesting the Weave root tree as soon as weave is ready
        main.request_WeaveTree();

        function manage_Crumbs(i_node){
            if(i_node){
                var label = i_node.w_node.getLabel();
                var parent_name = i_node.w_node.parent.getLabel();
                var previous_parent;
                if (main.weave_node)
                    previous_parent = main.weave_node.p_node.getLabel();

                if(main.weave_node && parent_name == previous_parent ) {//the parents (they are siblings) are the same then do a replacement
                    console.log("replacing");
                }
                else{//if parents are diff then addition or removal from the trail
                    console.log("updating");
                    if($.inArray(label, main.crumbLog) == -1){//if it hasnt been added before
                        main.crumbTrail.push(i_node);
                        main.crumbLog.push(label);
                    }
                    else{

                    }
                }
                main.weave_node = i_node;//keeping track of latest chosen pill
                if(main.weave_node && main.weave_node.w_node.getLabel() != 'Data Sources')//we want to skip this level in the hierarchy
                    main.weave_node = null;
            }
        }

        //this function adds the data source initial pill, done only once as soon as weave loads
        function add_init_Crumb (){
            if(main.WeaveService.request_WeaveTree()){
                var ds = main.WeaveService.weave_Tree.getChildren();

                var init_node = {};
                init_node.w_node= ds[0];//starting with the WeaveDataSource Pill
                main.manage_Crumbs(init_node);
                scope.$apply();//because digest completes by the time the tree root is fetched
            }
            else
                setTimeout(main.add_init_Crumb, 300);
        }

        function request_weaveTree (){
            main.WeaveService.request_WeaveTree();
        }

        //works with ng-repeat
        main.logs = [{name : 'a', kite: 99}, {name : 'shweta', kite: 80}];
        main.list = ['asinine', 'about', 'jumbla', 'love', 'sssshweta', 'slop'];

    }

})();

