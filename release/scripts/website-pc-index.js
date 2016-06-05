$(function() {
  
  $(".nav li").on("click",function () {
    $(".nav a").removeClass('active');
    $(this).addClass("active");
  });

  $(".nav li").hover(function(){
    if($(this).children("div").length === 1){
      $(this).children("div").css("display","block");
      $(this).children("a").addClass("active");
    }
  },function(){
    if($(this).children("div").length === 1){
      $(this).children("div").css("display","none");
      $(this).children("a").removeClass("active");
    }
  });
  
  // 禁止右键图片另存为
  $("img").bind("contextmenu", function(e){
    return false;
  }) ;
  $(".jumbotron").bind("contextmenu", function(e){
      return false;
  });

  //联电话弹出框
  $(".navigator li").hover(function(){
    if($(this).children("div").length !=0){
      $(this).children("div").show()
    }
  },function(){
    if($(this).children("div").length !=0){
      $(this).children("div").hide();
    }
  })

  //返回顶部
  $("#gotop").on("click",function(){
    $("body,html").animate({scrollTop: 0},700);
  })
});

  