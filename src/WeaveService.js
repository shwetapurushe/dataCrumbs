/**
 * Created by Shweta on 8/10/15.
 * this file helps in managing data retrieval from Weave
 * @ author shweta purushe
 */
(function(){
    angular.module('crumbs').service('WeaveService', weaveService);

    function weaveService (){
        var that = this;

        that.weave;
        that.weave_Tree;
        that.showUl;

    //this structure represents each pill added in the hierarchy trail
    //its value changes depending on the latest addition to the trail
    //for eg. DataSources >> Tables >> Blah
        that.w_node = {
            currentLeaf:null,
            has_Children : true,
            tree_node: null,
            current_childList:null
        };


        that.set_init_Crumb = function(){
            that.w_node.currentLeaf = "DataSources";
        };

        that.display_Options = function(){
            // main.options = main.WeaveService.currentProvider;//set the provider
            that.showUl = !that.showUl;
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