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

        that.currentLeaf;
        that.currentProvider;

        that.add_init_Crumb = function(){

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

        //static function
        that.check_WeaveReady = function(){

            if(!that.weave)
                that.weave = document.getElementById('weave');
            return that.weave && that.weave.WeavePath && that.weave._jsonCall;
        };

    }
})();