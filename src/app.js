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
                    /* for the very first crumb added; happens only once*/
                    if(!main.crumbTrail.length && !main.crumbLog.length){
                        console.log("first WeaveDataSource crumb added...");
                        main.crumbTrail.push(i_node);
                        main.crumbLog.push(i_node.label);
                    }
                    //remaining iterations
                    else{
                        /*3. check if previous crumb in trail is parent*/
                        var p_name = i_node.w_node.parent.getLabel();
                        var p_ind = main.crumbLog.indexOf(p_name);
                        var trail_parent = main.crumbTrail[p_ind].label;

                        if(p_name == trail_parent) {//proceed only if previous one in trail is parent
                            /*4. check if a sibling is present after parent */
                            if(main.crumbTrail[p_ind + 1]){
                                var sib_node = main.crumbTrail[p_ind + 1];
                                var sib_parent_name = sib_node.w_node.parent.getLabel();
                                if(p_name == sib_parent_name){
                                //if yes
                                //remove sibling and is trail
                                    main.crumbTrail.splice(p_ind+1, Number.MAX_VALUE);
                                    main.crumbLog.splice(p_ind+1, Number.MAX_VALUE);
                                //add it
                                    main.crumbTrail.push(i_node);
                                    main.crumbLog.push(i_node.label);
                                    console.log("replacing sibling and updating ...");

                                }
                            }
                            else{
                                //if no then add
                                console.log("new child added after parent...");
                                main.crumbTrail.push(i_node);
                                main.crumbLog.push(i_node.label);
                            }
                        }
                        else{}//don't add it anywhere in trail
                    }
                }
                else{}//if it already exists in the trail
            }
            else{}// if it is old
            main.weave_node = i_node;
            if (main.weave_node && main.weave_node.w_node.getLabel() != 'Data Sources')//we want to skip this level in the hierarchy
                main.weave_node = {};

            main.WeaveService.showUl = false;
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

