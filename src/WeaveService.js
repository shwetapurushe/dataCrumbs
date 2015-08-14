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

        that.display_Options = function(input_node){
            var weaveTreeIsBusy = that.weave.evaluateExpression(null, '() => WeaveAPI.SessionManager.linkableObjectIsBusy(WEAVE_TREE_NODE_LOOKUP[0])');
            that.showUl = !that.showUl;

            if(that.showUl){
                if(input_node.current_childList && input_node.current_childList.length > 1){
                    that.node_options = input_node.current_childList;//set the provider
                    //console.log("using old list of children");
                }
                else{
                    //console.log("fetching new list of children");
                    usSpinnerService.spin('dataLoadSpinner');//start the spinner

                    that.node_options =[];
                    (function fetching_Children(){
                        var chi = input_node.tree_node.getChildren();//array of children nodes
                        if(weaveTreeIsBusy())
                            setTimeout(fetching_Children, 300);
                        else{
                            var tempProvider =[];

                            for(var u =0; u < chi.length; u++){
                                var node_obj = {};
                                node_obj.label = chi[u].getLabel();

                                if(weaveTreeIsBusy())
                                    setTimeout(fetching_Children, 300);
                                node_obj.label = chi[u].getLabel();
                                //BAD SOLUTION #2
                                //if(node_obj.label == '...'){
                                //    fetching_Children();
                                //    break;
                                //}
                                node_obj.node = chi[u];

                                tempProvider[u] = node_obj;
                            }
                            $timeout(function(){
                                that.node_options = tempProvider;
                                input_node.current_childList = that.node_options;//set the provider
                                usSpinnerService.stop('dataLoadSpinner');//stops the spinner
                            }, 300);

                        }
                    }(input_node));//end of fetching children
                }// end of fetching list condition
            }//end of showUl boolean
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