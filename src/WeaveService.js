/**
 * Created by Shweta on 8/10/15.
 * this file helps in managing data retrieval from Weave
 * @ author shweta purushe
 */
(function(){
    angular.module('crumbs').service('WeaveService', weaveService);

    weaveService.$inject = ['usSpinnerService'];
    function weaveService (usSpinnerService){
        var that = this;

        that.weave;
        that.weave_Tree;
        that.node_options;
        that.showUl;

        that.display_Options = function(input_node){
            var weaveTreeIsBusy = that.weave.evaluateExpression(null, '() => WeaveAPI.SessionManager.linkableObjectIsBusy(WEAVE_TREE_NODE_LOOKUP[0])');
            that.showUl = !that.showUl;
            //set the provider
            if(that.showUl){
                that.node_options =[];

                //usSpinnerService.spin('dataLoadSpinner');//start the spinner
                var chi = input_node.tree_node.getChildren();//array of children nodes
                (function fetching_Children(){
                   if(weaveTreeIsBusy())
                       setTimeout(fetching_Children, 500)
                    else{
                       for(var u =0; u < chi.length; u++){
                           var node_obj = {};
                           node_obj.label = chi[u].getLabel();
                           node_obj.node = chi[u];

                           that.node_options[u] = node_obj;
                       }
                   }
                }(input_node));
               // usSpinnerService.stop('dataLoadSpinner');//stops the spinner
                input_node.current_childList = that.node_options;
            }
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

        that.check_WeaveReady = function(){

            if(!that.weave)
                that.weave = document.getElementById('weave');
            return that.weave && that.weave.WeavePath && that.weave._jsonCall;
        };

    }
})();