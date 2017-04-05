angular.module('starter.filter',[])
.filter("modify",function(){
	return function(input,param){
		param =  param.slice(0,param.length-1);
		input = param
		return input
	}
})