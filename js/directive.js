angular.module("todomvcApp")
	//双击获取焦点指令
	.directive("focus",function(){
		return {
			link: function(scope,ele){
				ele.on("dblclick",function(){
					this.getElementsByTagName('input')[1].focus();
				})
			}
		}
	})
