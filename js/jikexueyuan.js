// js模块化设置
require.config({
	paths: {
		"jquery": "jquery.min"
	}
});
require.config({
	shim: {　　　　
		'kxbdSuperMarquee': {　　
			deps: ['jquery'],
			exports: 'kxbdSuperMarquee'
		}　　
	}　
});



require(['jquery', 'kxbdSuperMarquee'], function($, kxbdSuperMarquee) {　　　　
	$(function() {
		//////输入搜索框，有焦点和无焦点时的状态
		var $navSmallSort = $(".nav-small-sort");
		var $inputText = $(".text");
		$inputText.focus(function() {
			$navSmallSort.hide();
		}).blur(function() {
			$navSmallSort.show();
		});
		//////鼠标位于用户名上时的状态
		$(".my-name").mouseover(function() {
			mouseOver($(".user-menu"));
			$(".arrow").addClass("arrow-go");
			$(".arrow").removeClass("arrow-back");
		}).mouseout(function() {
			mouseOut($(".user-menu"));
			$(".arrow").removeClass("arrow-go");
			$(".arrow").addClass("arrow-back");
		});
		$(".user-menu").mouseover(function() {
			mouseOver($(".user-menu"));
			$(".arrow").addClass("arrow-go");
			$(".arrow").removeClass("arrow-back");
		}).mouseout(function() {
			mouseOut($(".user-menu"));
			$(".arrow").removeClass("arrow-go");
			$(".arrow").addClass("arrow-back");
		});
		//////导航栏效果
		$contentNav = $(".content-nav"); //all导航栏
		$upDown = $(".down"); //向下标志
		$mainNav = $(".main-nav"); //导航栏细分的a
		$mainNavI = $(".main-nav i"); //a导航标题的右箭头
		$navTitleDiv = $(".nav-title li div");
		$("");
		$("");
		$contentNav.mouseover(function() {
			$(this).css("overflow", "visible");
			$upDown.hide();
		}).mouseout(function() {
			$(this).css("overflow", "hidden");
			$upDown.show();
		});
		$mainNav.mouseover(function() {
			$(this).addClass("nav-a-hover").children("i").hide();
			$(this).next().show();
		}).mouseout(function() {
			$(this).removeClass("nav-a-hover").children("i").show();
			$(this).next().hide();
		});
		$navTitleDiv.mouseover(function() {
			$(this).show();
		}).mouseout(function() {
			$(this).hide();
		});
		//////banner效果
		$bannerSpan = $(".banner-prompt span"); //span提示
		$bannerImgDiv = $(".banner-img div"); //图片
		$bannerBig = $(".banner")
		$leftArrow = $(".left-arrow");
		$rightArrow = $(".right-arrow");
		$twoArrow = $(".banner-arrow");
		$bannerSpan.eq(0).addClass("prompt-span");
		$bannerImgDiv.eq(0).show(); //默认显示第一张图和第一个span提示
		///banner点击span提示效果,且切换banner图片
		$bannerSpan.click(function() {
			var index = $(this).index();
			$(this).addClass("prompt-span").siblings().removeClass("prompt-span");
			$bannerImgDiv.eq(index).fadeIn().siblings().fadeOut();
		});
		///指定时间执行
		var adTimer = setInterval(timer, 5000);

		function timer() {
			$bannerSpan.each(function(index, element) {
				var spanClass = $(this).attr("class");
				if (spanClass == "prompt-span") {
					indexNum = index + 1;
				}
			});
			if (indexNum == 5) {
				indexNum = 0;
			}
			$bannerImgDiv.eq(indexNum).fadeIn().siblings().fadeOut();
			$bannerSpan.eq(indexNum).addClass("prompt-span").siblings().removeClass("prompt-span");
		};
		///位于banner上方时箭头效果
		$bannerBig.mouseover(function() {
			$leftArrow.show();
			$rightArrow.show();
			clearInterval(adTimer);
		}).mouseout(function() {
			$leftArrow.hide();
			$rightArrow.hide();
			adTimer = setInterval(timer, 5000);
		});
		$rightArrow.mouseover(function() {
			$(this).show();
			$leftArrow.show();
		}).mouseout(function() {
			$(this).hide();
			$leftArrow.hide();
		});
		$leftArrow.mouseover(function() {
			$(this).show();
			$rightArrow.show();
		}).mouseout(function() {
			$(this).hide();
			$rightArrow.hide();
		});

		///点击点头切换图片
		$rightArrow.click(function() {
			$bannerSpan.each(function(index, element) {
				var spanClass = $(this).attr("class");
				if (spanClass == "prompt-span") {
					indexNum = index + 1;
				}
			});
			if (indexNum == 5) {
				indexNum = 0;
			}
			$bannerImgDiv.eq(indexNum).fadeIn().siblings().fadeOut();
			$bannerSpan.eq(indexNum).addClass("prompt-span").siblings().removeClass("prompt-span");
		});
		$leftArrow.click(function() {
			$bannerSpan.each(function(index, element) {
				var spanClass = $(this).attr("class");
				if (spanClass == "prompt-span") {
					indexNum = index - 1;
				}
			});
			if (indexNum == -1) {
				indexNum = 4;
			}
			$bannerImgDiv.eq(indexNum).fadeIn().siblings().fadeOut();
			$bannerSpan.eq(indexNum).addClass("prompt-span").siblings().removeClass("prompt-span");
		});
		//////推荐课程标题效果切换与显示切换
		$(".sec-title li").eq(0).addClass("a-boder").children("i").show(); //默认显示第一个
		$(".sec-frame").eq(0).show(); //默认显示第一个课程框	
		$(".sec-title li").mouseover(function() {
			indexTitle = $(".sec-title li").index(this); //加上this可以在mouseover时指向位于鼠标之下的a
			$(".sec-title li").eq(indexTitle).addClass("a-boder").children("i").show();
			$(".sec-title li").eq(indexTitle).siblings().removeClass("a-boder").children("i").hide();
			$(".sec-frame").eq(indexTitle).show().siblings().hide();
		});
		//////鼠标位于
		$sFrame = $(".frame-image");
		$frameWork = $(".frame-word");
		$frameWorkP = $(".frame-word p");
		$sFrame.mouseover(function() {
			indexFrame = $sFrame.index(this);
			$(".img-blove").eq(indexFrame).fadeIn();
			$(".img-blove").unbind("mouseover").bind("mouseover", function() {
				$(this).stop().fadeIn("fast");
				$frameWork.eq(indexFrame).stop().animate({
					height: "160px"
				}, "fast");
				$frameWorkP.eq(indexFrame).stop().slideDown("fast");

			}).mouseleave(function() {
				$(this).stop().fadeOut("fast");
				$frameWork.eq(indexFrame).stop().animate({
					height: "100px"
				}, "normal");
				$frameWorkP.eq(indexFrame).stop().slideUp();

			}); //当mouse加载新界面时及时stop原先动画可以避免重复执行
		});
		//////实战路径图js效果
		$realPath = $(".real-path a");
		$realPathB = $(".real-path button");
		$realPath.mouseover(function() {
			indexPath = $realPath.index(this);
			$realPath.eq(indexPath).addClass("ahover-green");
			$realPath.eq(indexPath).siblings().removeClass("ahover-green");
			if (indexPath <= 3) {
				$realPathB.eq(indexPath).addClass("button-hover");
			} else {
				$realPathB.eq(indexPath).addClass("button-special");
			};
		}).mouseout(function() {
			$realPath.removeClass("ahover-green");
			if (indexPath <= 3) {
				$realPathB.eq(indexPath).removeClass("button-hover");
			} else {
				$realPathB.eq(indexPath).removeClass("button-special");
			};
		});
		//////知识路径图js效果
		$(".know-frame").mouseover(function() {
			if (!$(this).children(".front").is(":animated")) {
				$(this).children(".front").addClass("front-rotate");
				$(this).children(".back").addClass("back-rotate");
			}
		}).mouseleave(function() {
			if (!$(this).is(":animated")) {
				$(this).children(".front").removeClass("front-rotate");
				$(this).children(".back").removeClass("back-rotate");
			}
		});
		$(".greenbtn").mouseover(function() {
			$(this).animate({
				opacity: "0.8"
			}, "normal");
		}).mouseout(function() {
			$(this).animate({
				opacity: "1"
			}, "normal");
		});
		//////相关轮播
		$(".strategy").mouseover(function() {
			if (!$(this).is(":animated")) {
				$("#goL").fadeIn();
				$("#goR").fadeIn();
			}
		}).mouseleave(function() {
			if (!$(this).is(":animated")) {
				$("#goL").fadeOut();
				$("#goR").fadeOut();
			}
		});
		$("#marquee").kxbdSuperMarquee({
			isMarquee: true,
			isEqual: false,
			scrollDelay: 20,
			direction: "left",
			controlBtn: {
				left: "#goR",
				right: "#goL"
			}
		});
		$(".media").mouseover(function() {
			if (!$(this).is(":animated")) {
				$("#goLL").fadeIn();
				$("#goRR").fadeIn();
			}
		}).mouseleave(function() {
			if (!$(this).is(":animated")) {
				$("#goLL").fadeOut();
				$("#goRR").fadeOut();
			}
		});
		$('#marquee1').kxbdSuperMarquee({
			distance: 160,
			btnGo: {
				left: '#goRR',
				right: '#goLL'
			},
			direction: 'left',
			time: 3
		});
		///////footer
		$(".wechat").mouseover(function() {
			$(".wechat img").show();
		}).mouseout(function() {
			$(".wechat img").hide();
		});
		$(window).scroll(function() {
			var scrollHeight = $(window).scrollTop(); //鼠标滑动距离顶部的高度
			if (scrollHeight >= 350) {
				$(".back-top").stop().animate({
					opacity: "1"
				}, "fast").addClass("back-top-cursor");
			} else {
				$(".back-top").stop().animate({
					opacity: "0"
				}, "fast").removeClass("back-top-cursor");
			};
		});
		$(".back-top").click(function() {
			$("body").animate({
				scrollTop: 0
			}, 500);
			return false;
		});

		//mouseover
		function mouseOver(b) {
			b.show();
		};
		//mouseout
		function mouseOut(b) {
			b.hide();
		}
	});　　
});