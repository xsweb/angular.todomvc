(function (angular) {
	//获取模块
	angular.module("todomvcApp")
		//基于模块创建一个控制器
		.controller("mainCtrl", ["$scope", "$location","$window", function ($scope, $location,$window) {
			//初始化数据
			$scope.title = "备忘录"
			$scope.text = ''
			$scope.todos = JSON.parse($window.localStorage.getItem("todos"))||[];
			$scope.maxId = $scope.todos.length + 1;
			$scope.checkAll = false;
			$scope.editingIndex = -1;
			$scope.dbclkTex = '';
			$scope.todosFilter={};

			//数据存储到本地
			$scope.save=function(){
				var todos=[];
				$scope.todos.forEach(function(e){
					todos.push(e)
				})
				$window.localStorage.setItem('todos',JSON.stringify($scope.todos))
			}
			// 初始化方法
			//判断$scope.todos的元素,如果长度为0，重置ID
			$scope.checkTodos = function () {
				if ($scope.todos.length === 0) {
					$scope.maxId = 1;
					$scope.checkAll = false;
				}
			}
			//删除任务方法
			$scope.del = function () {
				$scope.todos.splice(this.$index, 1);
				$scope.checkTodos();
				$scope.save();
			}
			//	添加任务方法
			$scope.appendList = function () {
				if (($scope.text).trim().length === 0) {
					return
				} else {
					if ($scope.maxId >= 30) {
						if ($scope.todos.length < 10) {
							for (var i = 0; i < $scope.todos.length; i++) {
								$scope.todos[i].id = i;
							}
							$scope.maxId = $scope.todos.length + 1;
						}
					}
					$scope.maxId = $scope.maxId + 1;
					$scope.todos.push({
						id: $scope.maxId,
						text: $scope.text,
						complated: false
					});
					$scope.text = '';
					$scope.toggle();
					$scope.save();
				}

			}
			//	统计未完成备忘条数
			$scope.itemLeftNum = function () {
				var num = 0;
				$scope.todos.forEach(function (e) {
					if (e.complated === false) {
						num++
					}
				})
				return num;
			}
			//	删除所有已完成项目
			$scope.delAllComplate = function () {
				for (var i = 0; i < $scope.todos.length;) {
					if ($scope.todos[i].complated) {
						$scope.todos.splice(i, 1);
					} else {
						i++;
					}
					$scope.checkTodos();
					$scope.save();

				}
			}

			// 标记所有任务为已完成以及未完成
			$scope.toggleComplate = function () {
				$scope.todos.forEach(function (e) {
					e.complated = $scope.checkAll;
				})
			}

			$scope.toggle = function () {
				if ($scope.todos.every(function (e) {
						return e.complated
					})) {
					$scope.checkAll = true;
				} else {
					$scope.checkAll = false;
				}
			}
			//	双击编辑文本框
			$scope.dbcChangeTex = function (todo) {
				$scope.editingIndex = todo.id;
				var dom=document.getElementsByClassName('edit')[this.$index];
			}
			$scope.changeText = function (todo) {
				$scope.dbclkTex = todo.text;
				if (($scope.dbclkTex).trim().length === 0) {
					$scope.todos.splice(this.$index, 1)
					$scope.checkTodos();
				}
				$scope.editingIndex = -1;
				$scope.save();
			}
		//	监视锚点事件
			$scope.$location=$location;
			$scope.$watch('$location.$$url',function(newValue,oldValue){
				switch (newValue) {
					case '/':
						$scope.todosFilter={};
						break;
					case '/completed':
						$scope.todosFilter={complated:true};
						break;
					case '/active':
						$scope.todosFilter={complated: false};
						break;
					default:
						$scope.todosFilter={};
						break;
				}
			})
		}])

})(angular)
