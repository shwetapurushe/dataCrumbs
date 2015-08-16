/**
 * Created by Shweta on 8/10/15.
 * this file helps in managing data retrieval from Weave
 * @ author shweta purushe
 */
(function(){
    angular.module('crumbs').service('WeaveService', weaveService);

    weaveService.$inject = ['usSpinnerService','$timeout'];
    function weaveService (usSpinnerService, $timeout){
        var that = this;

        that.weave;
        that.weave_Tree;
        that.node_options;
        that.showUl;

        that.display_Options = function(input_node, getChildren){
            var weaveTreeIsBusy = that.weave.evaluateExpression(null, '() => WeaveAPI.SessionManager.linkableObjectIsBusy(WEAVE_TREE_NODE_LOOKUP[0])');
            that.showUl = !that.showUl;

            if(that.showUl){
                if(getChildren){//when request is for children
                    if(input_node.children && input_node.children.length > 1){//use list if already there
                        that.node_options = input_node.children;//set the provider
                    }

                    else{//make fresh request
                        that.node_options = [];//clear
                        usSpinnerService.spin('dataLoadSpinner');//start the spinner

                        fetching_Children(input_node, getChildren);//use node
                    }
                }

                else{//when request is for siblings
                    if(input_node.siblings && input_node.siblings.length > 1){//use if list is already there
                        that.node_options = input_node.siblings;//set the provider
                    }

                    else{//make fresh request
                        that.node_options = [];//clear
                        usSpinnerService.spin('dataLoadSpinner');//start the spinner

                        fetching_Children(input_node, getChildren);
                    }
                }

            }//end of showUl boolean condition


            function fetching_Children(i_node, getChildren){
                var chi;
                if(getChildren)
                    chi= i_node.tree_node.getChildren();//array of children nodes //use node
                else
                    chi = i_node.p_node.getChildren(); //use node's parent node
                if(weaveTreeIsBusy())
                    setTimeout(function(){fetching_Children (i_node, getChildren);}, 300);
                else{
                    var tempProvider =[];

                    for(var u =0; u < chi.length; u++){
                        var node_obj = {};
                        node_obj.label = chi[u].getLabel();

                        if(weaveTreeIsBusy())
                            setTimeout(function(){fetching_Children (i_node, getChildren);}, 300);
                        node_obj.label = chi[u].getLabel();

                        node_obj.node = chi[u];

                        tempProvider[u] = node_obj;
                    }
                    $timeout(function(){
                        that.node_options = tempProvider;
                        input_node.current_childList = that.node_options;//set the provider

                        usSpinnerService.stop('dataLoadSpinner');//stops the spinner
                    }, 300);

                }
            };//end of fetching children
        };

        /** requests the WeaveNodeTree hierarchy comprised of IWeaveTreeNode objects**/
        that.request_WeaveTree = function (){
            if(that.check_WeaveReady())//only if Weave is ready
            {
                if(!that.weave_Tree){
                    that.weave_Tree = new that.weave.WeaveTreeNode();
                    return that.weave_Tree;
                }
                else
                    return that.weave_Tree;
            }
            else{
                setTimeout(that.request_WeaveTree, 100);
            }
        };

        /** checks if the Weave software has loaded**/
        that.check_WeaveReady = function(){

            if(!that.weave)
                that.weave = document.getElementById('weave');
            return that.weave && that.weave.WeavePath && that.weave._jsonCall;
        };

    }
})();