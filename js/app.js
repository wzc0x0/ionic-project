angular.module('starter',['ionic','ionicLazyLoad','starter.services','starter.controllers','starter.filter'])
	.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
	    if(window.cordova && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	      cordova.plugins.Keyboard.disableScroll(true);
	    }
	    if(window.StatusBar) {
	      StatusBar.styleDefault();
	    }
	});
})
.config(function ($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state("tab",{
      url:"/tab",
      templateUrl:"tem/tab-bar.html"
    })
    .state("tab.book",{
      url:"/book",
      views:{
        "tab-book":{
          templateUrl:"tem/books.html",
          controller:"ctrl-book"
        }
      }
    })
    .state("tab.detail",{
    	url:"/detail/:id",
    	views:{
    	 "tab-book":{
         	templateUrl:"tem/book-detail.html",
         	controller:"ctrl-book-detail"
          }
    	}
    })
    .state("tab.music",{
      url:"/music",
      views:{
      	"tab-music":{
      		templateUrl:"tem/music.html",
      		controller:"ctrl-music"
      	}
      }
    })
    .state("tab.movie",{
      url:"/movie",
      views:{
      	"tab-movie":{
      		templateUrl:"tem/movie.html",
      		controller:"ctrl-movie"
      	}
      }
    })
    .state("tab.mine",{
    	url:"/mine",
    	views:{
    		"tab-mine":{
    			templateUrl:"tem/mine.html",
      			controller:"ctrl-mine"
    		}
    	}
    })
  $urlRouterProvider.otherwise("tab/book")
})
.config(['$sceDelegateProvider','$ionicConfigProvider', function($sceDelegateProvider,$ionicConfigProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://localhost*'
  ]);
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
}]);
//curPlayer.src="http://yinyue.cloudmeng.com/listen/song/?key="+curSong+'-'+curAuthor