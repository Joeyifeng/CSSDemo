(function(){
  var curSelecter = window.location.hash.split('-')[0];
  /**
   * Change url query string to object
   * @return {Object}    Query object
   */
  function getQueryObj() {
    var 
      url = location.search,
      ret = {},
      keyVal, strs, key, val, i, len;

   if (url.indexOf('?') !== -1) {
      strs = url.substr(1).split('&');
      len = strs.length;

      for(i = 0; i < len; i ++) {
        keyVal = strs[i].split('=');
        key = keyVal[0];
        val = window.decodeURIComponent(keyVal[1] || '');
        ret[key] = val;
      }
   }

    return ret;
  };

  function showRouterView(targetSelecter) {

    var $tabsTarget;
    var tabMap = {
      '#productInfo': '#productInfo',
      '#productIntro': '#productIntro',
      '#serviceQa': '#serviceQa',
      '#adCooperation': '#adCooperation'
    };

    $(document).scrollTop(0);

    //当点击 "查看更多" 或者 "申请使用"
    if(targetSelecter == "#intro_FAQ" || targetSelecter == "#apply" || targetSelecter == "#status"){
      $('.k-section').removeClass('active');
      $(targetSelecter).addClass('active');
    }else{
      targetSelecter = tabMap[targetSelecter] || '#productInfo';
      $tabsTarget = $('#kTabs [data-target=' + targetSelecter + ']');

      $('.item').removeClass('active');
      $tabsTarget.parent().addClass('active');

      $('.k-section').removeClass('active');

      $(targetSelecter).addClass('active');
    }
  }

  function showWeixinMsg(e) {
    var isApple = browser.versions.ios || browser.versions.iPhone
        || browser.versions.iPad;

    if (browser.versions.weixin) {
      $('.overlay, .msg-weixin').removeClass('none');
      if(e) {
        e.preventDefault();
      }
    }
  }
  function hideWeixinMsg() {
    $('.overlay, .msg-weixin').addClass('none');
  }

  // 初始化界面事件
	function initEvent() {

    $(window).scroll(function(){
      var scrollTop = $(window).scrollTop();
      if(window.location.hash=="#productInfo-href"||window.location.hash==""){
        if(scrollTop > 10){
          $(".k-header").removeClass("k-header-show");
        }else{
            $(".k-header").addClass("k-header-show");
        }
      }
    });

    if(window.location.hash == "#productInfo-href"||window.location.hash==""){
      $(".k-header").addClass("k-header-show");
      $("#productInfo").css("margin-top","220px");
    }


    //导航栏被点击
    $('#kTabs').on('click', function(e) {

      $("#intro_FAQ_container").show();
      $("#more").show();
      $("#hideArea").hide();

      var $target = $(e.target);
      var targetSelecter = '';
      
      if ($target.is('a')) {
        targetSelecter = $target.data('target');
        showRouterView(targetSelecter);
      
        //当点击首页tab
        if(targetSelecter == "#productInfo"){
          // $(".k-jumbotron").show();
          $(".k-jumbotron").show();
          $(".k-header").addClass("k-header-show");

          // $("#productInfo").css("margin-top","220px");
          $("#productInfo").animate({marginTop:"220px"}, 200);
        }else{
          $(".k-jumbotron").hide();
          console.log("1");
        }

      }


      //为什么targetSeletor行 ， window.location.hash不行
      //从详情页跳到主页
      if(window.location.pathname.indexOf("index")==-1){
        console.log("../index.html"+window.location.hash);
        window.location.href = "../index.html"+targetSelecter;
      }
    });

    //常见问题 - 查看更多按钮事件
    $("#FAQ").on("click",function(e){        
        showRouterView("#intro_FAQ");
    });

    //申请试用按钮事件
    $("#apply_btn").on("click",function(){
        showRouterView("#apply");
    })

    $('.msg-weixin, .overlay').on('click', function() {
      hideWeixinMsg();
    });

    $(document).on('touchstart', function() {
      hideWeixinMsg();
    });

    $('#dowloadApp').on('click', function(e) {
      showWeixinMsg(e);
    });
    $('#dowloadApp1').on('click', function(e) {
      showWeixinMsg(e);
    });

    $('#dowloadIosApp').on('click', function(e) {
      showWeixinMsg(e);
    });
    $('#downloadIosApp1').on('click', function(e) {
      showWeixinMsg(e);
    });

    //动态查看更多按钮点击后隐藏
    $(".k-section").delegate('#more','click',function(){
      $("#hideArea").show();
      $("#more").hide();
      $("#intro_FAQ_container").hide();
      $(".intro-msg").removeClass("clear-border");
    });

    //返回顶部
    $("#toTop").on('click',function(){
      $('html,body').animate({scrollTop:"0px"},300);
    });   
  }

  function handleIso() {
    if (browser.versions.ios || browser.versions.iPhone
        || browser.versions.iPad) {

      $('body').addClass('ios');
    }
  }

  function changDownloadUrl(data) {
    $('#dowloadApp').attr('href', data['download_url']);
    $('#downloadApp1').attr('href', data['download_url']);
  }

  showRouterView(curSelecter);
  showWeixinMsg();
  handleIso();

  // dom 加载完成是调用
  $(function() {

    initEvent();

  });

})();