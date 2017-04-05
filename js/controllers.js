angular.module('starter.controllers',[])
.controller("ctrl-book",function($http,$scope,$ionicPopup,ajaxBook){
	var runLock = false;
	var GoLoader = $scope.GoLoader = {
		init:function(){
			ajaxBook.getData('douban.json',function(data) {
				data == false?$ionicPopup.alert({template: '请检查您的网络状态!'}):$scope.items = data.books				
			})
		},
		doRefresh:function(){
			ajaxBook.getData('english-book.json',function(data) {
				if(data){
					$scope.items = data.books
				}else{
					$ionicPopup.alert({template: '请检查您的网络状态!'});
				}
				$scope.$broadcast('scroll.refreshComplete')
			})
		},
		loadMore:function(){
			ajaxBook.getData('english-book.json',function(data){
				if(!runLock){
				runLock = !runLock;
					if(data){
						$scope.items = $scope.items.concat(data.books);
						runLock = !runLock
					}else{
						that.msg = !that.msg
						$ionicPopup.alert({template: '到底了!'});
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}				
			})	
		},
		msg:true	
	}
	GoLoader.init();
})
.controller("ctrl-music",function($http,$scope,ajaxBook){
	var run = false;
	ajaxBook.getData('music.json', function(data) {
		data == false?$ionicPopup.alert({template: '请检查您的网络状态!'}):$scope.items = data.tracks			
	})
	$scope.playAudio = function(i){
		var curSong = document.getElementsByClassName("song")[i].textContent
		var curAuthor = document.getElementsByClassName("song")[i].textContent
		var curPlayer = document.getElementsByClassName("myAudio")
		var curAvatar = document.getElementsByClassName("avatar")		
		if(!run){
			angular.element(curAvatar).eq(i).addClass("audio-rotate")
			angular.element(curPlayer).eq(i).attr({"src":"123.mp3","volume":"0.6"})
			angular.element(curPlayer)[i].play()
			run = !run;
		}else{
			angular.element(curAvatar).removeClass("audio-rotate")
			for(var j = 0;j < curPlayer.length;j++){
				curPlayer[j].pause()
			}
			run = !run;
		}		
	}
		
})

.controller("ctrl-book-detail",function($http,$scope,$stateParams){
	$scope.isFav = false;
	var loader = $scope.loader={
		init:function(){
			$http({
				url: "douban.json"
				}).success(function(data) {
				data.books.forEach(function(v, i) {
					if(v.id == $stateParams.id) {
						$scope.details = data.books[i]
						if(localStorage.getItem(v.id)){
							$scope.isFav = !$scope.isFav;
						}						
					}
				})
			})
		},
		onTap:function(res){
			$scope.isFav = !$scope.isFav;
			if($scope.isFav){
				window.localStorage[res.id] = JSON.stringify(res);
			}else{
				localStorage.removeItem(res.id)
			}
		}
	}
	loader.init()
	
})

.controller('ctrl-movie',function($http,$scope,ajaxBook){
	ajaxBook.getData('movie.json', function(data) {
		data == false?$ionicPopup.alert({template: '请检查您的网络状态!'}):$scope.items = data.subjects
	})
})

.controller('ctrl-mine',function($scope,$ionicTabsDelegate,$ionicSlideBoxDelegate,$ionicModal,AccountService,$ionicPopup){
	var isLogin = false;
	$ionicModal.fromTemplateUrl('tem/login.html',{
		scope: $scope,
        animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal
	})
	$scope.openModal = function () {
        $scope.modal.show();
    }
    $scope.closeModal = function () {
        $scope.modal.hide();
    }
    $scope.loginData = {
        name: '',
        password: ''
    }
    $scope.regData = {
        account: '',
        email: '',
        password: ''
    }
    $scope.user = {
      account: "未登陆"
    }
    $scope.login = function() {
		AccountService.login($scope.loginData,function(user) {
			$scope.user = user;
			$scope.modal.hide();
			isLogin = !isLogin;
			showFav();
		})
	};
    $scope.register = function () {
       AccountService.regs($scope.regData,function(){
       		$scope.modal.hide();
       });
  	}
    
    //切换
	var accountTab = $ionicTabsDelegate.$getByHandle('accountTab');
    var accountSlide = $ionicSlideBoxDelegate.$getByHandle('accountSlide');
    $scope.accountSelectedTab = function (index) {
        accountSlide.slide(index);
    }
    $scope.accountSlideChanged = function (index) {
        accountTab.select(accountSlide.currentIndex());
    };
    //获取当前试图
   	$scope.$on('$ionicView.beforeEnter',function(){
   		showFav();
   		if(!isLogin){
			var myPop = $ionicPopup.alert({template: '请登录或注册!'})
			myPop.then(function(res){
				$scope.modal.show();
			})
		}
   	})
   	
   	// 显示收藏
   	function showFav(){
   		var arr = []
   		var len = localStorage.length
   		for(var i=0 ;i<len;i++){
   			var key = localStorage.key(i);
   			var value = localStorage.getItem(key)
   			arr.push(JSON.parse(value))
   		}
   		$scope.items = arr;
   		console.log($scope.items)
   	} 	
})