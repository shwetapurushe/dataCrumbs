/**
 * Created by Shweta on 8/5/15.
 * this controller will be one per pillContainer
 * parent controller to all the individual pills
 */
(function(){

    angular.module('crumbs', ['angularSpinner']);

    angular.module('crumbs').controller('mainController', crumbController);

    crumbController.$inject = ['WeaveService'];
    function crumbController (WeaveService){
        var main = this;
        main.WeaveService = WeaveService;

        main.WeaveService.request_WeaveTree();

        main.scriptOptions = ["a"];
    }

})();

