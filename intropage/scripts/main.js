$(function(){
	$("#tab").on("click",function(e){
		var $target = $(e.target);
		if($target.is('a')){
			var $targetSeletor = $target.data("target");
			console.log($targetSeletor);
			$(".news-list").css("display","none");
			$("#"+$targetSeletor).css("display","block");
		}
	});
});