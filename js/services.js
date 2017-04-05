angular.module('starter.services',[])
.service('ajaxBook',["$http",function($http){
	this.getData=function(url,callback){
		$http({
			url:url
		}).success(function(data){
			callback(data);				
		}).error(function(err){
			callback(false)
			console.log(err);
		})
	}
}])
.service('AccountService',function($http,$ionicPopup,$state){
	var that = this;
	this.login = function(formData,callback){
		var url = urls.login+'&name='+formData.name+'&password='+formData.password
    	$http.jsonp(url).success(function (response) {
    		if(!response.status){
    			$ionicPopup.alert({template: response.msg})
    		}else{			
    			var token = response.access_token;
	        	that.user(token,callback)
    		}
      	})
	};
	
	this.user = function(token,callback){
		var url = urls.user + "&access_token=" + token;
		$http.jsonp(url).success(function(response){
			callback(response)
			console.log(response)
		})
	};
	
	this.regs = function(FormData,callback){
		var url = urls.reg + "&account=" + FormData.account + "&email=" + FormData.email + "&password=" + FormData.password;
		$http.jsonp(url).success(function (response) {
	        if (!response.status) {
	        	$ionicPopup.alert({template: response.msg})
	        	callback();
	        }else{
	        	var myPop = $ionicPopup.alert({template: '注册成功！'})
	        	myPop.then(function(res){
	        		callback()
	        	})
	        }
        })	
	};
	
})
/*this.login = function(formData,callback){
		$http({
			url:'http://localhost',
			method:'POST',
			data: $httpParamSerializerJQLike(formData),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } 
		}).success(function(res){
			console.log(res)
		})
	}
 */