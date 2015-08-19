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
        main.request_WeaveTree = request_weaveTree;
        main.manage_Crumbs = manage_Crumbs;
        main.add_init_Crumb = add_init_Crumb;

        //is the previously added node in the stack, needed for comparison
        //structure of each node should be {w_node //actual node ; label: its label}
        main.weave_node = {};
        main.crumbTrail = [];
        main.crumbLog = [];

        //requesting the Weave root tree as soon as weave is ready
        main.request_WeaveTree();

        function manage_Crumbs(i_node){
            /*1. check if it is the previously added node*/
            if(i_node.label != main.weave_node.label && main.weave_node) {//proceed only if it is new
                /*2. check if it in the trail already */
                if($.inArray(i_node.label, main.crumbLog) == -1) {//proceed if it is new
                    /* for the very first crumb added*/
                    if(!main.crumbTrail.length && !main.crumbLog.length){
                        console.log("first WeaveDataSource crumb added...");
                        main.crumbTrail.push(i_node);
                        main.crumbLog.push(i_node.label);
                        main.WeaveService.showUl = false;
                    }
                    /*3. check if previous crumb in trail is parent*/
                   // if() {//proceed only if previous one in trail is parent
                        //find its siblings index
                        //remove sibling and is trail
                        //add it
                    //}
                    //else//dont add it anywhere in trail
                       // return;
                }
                else//if it already exists in the trail
                    return;
            }
            else// if it is old
                return;
            main.weave_node = i_node;
            if (main.weave_node && main.weave_node.w_node.getLabel() != 'Data Sources')//we want to skip this level in the hierarchy
                main.weave_node = {};
        }

        //this function adds the data source initial pill, done only once as soon as weave loads
        function add_init_Crumb (){
            if(main.WeaveService.request_WeaveTree()){
                var ds = main.WeaveService.weave_Tree.getChildren();

                var init_node = {};
                init_node.label = ds[0].getLabel();
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
    }

})();

