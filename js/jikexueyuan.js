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
		var $contentNav = $(".content-nav"); //all导航栏
		var $upDown = $(".down"); //向下标志
		var $mainNav = $(".main-nav"); //导航栏细分的a
		var $mainNavI = $(".main-nav i"); //a导航标题的右箭头
		var $navTitleDiv = $(".nav-title li div");
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
		var $bannerSpan = $(".banner-prompt span"); //span提示
		var $bannerImgDiv = $(".banner-img div"); //图片
		var $bannerBig = $(".banner")
		var $leftArrow = $(".left-arrow");
		var $rightArrow = $(".right-arrow");
		var $twoArrow = $(".banner-arrow");
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
		var $goR = $("#goR");
		var $goL = $("#goL");
		$(".strategy").mouseover(function() {
			if (!$(this).is(":animated")) {
				$goL.fadeIn();
				$goR.fadeIn();
			}
		}).mouseleave(function() {
			if (!$(this).is(":animated")) {
				$goL.fadeOut();
				$goR.fadeOut();
			}
		});
		var $marquee = $("#marquee");
		var $marqueeLi = $("#marquee ul li");
		var $marqueeUl = $("#marquee ul");

		var allIndex = $marqueeUl.children().length - 1;
		var nums = 0;
		$goR.click(function() {
			$marqueeUl.animate({
				'margin-left': -$marqueeLi.width()
			}, 300, function() {
				$marqueeUl.append($marqueeLi.eq(nums));
				$marqueeUl.css("margin-left", 0);
				if (nums < allIndex) {
					nums++;
				} else {
					nums = 0;
				}
			});
		});
		$goL.click(function() {
			if (nums <= 0) {
				nums = allIndex + nums;
			} else {
				nums = nums - 1;
			}
			$marqueeUl.stop().prepend($marqueeLi.eq(nums));
			$marqueeUl.css("margin-left", -$marqueeLi.width());
			$marqueeUl.animate({
				'margin-left': 0
			}, 300);
		});
		var $goRR = $("#goRR");
		var $goLL = $("#goLL");
		$(".media").mouseover(function() {
			if (!$(this).is(":animated")) {
				$goLL.fadeIn();
				$goRR.fadeIn();
			}
		}).mouseleave(function() {
			if (!$(this).is(":animated")) {
				$goLL.fadeOut();
				$goRR.fadeOut();
			}
		});

		var $marquee1 = $("#marquee1");
		var $marquee1Li = $("#marquee1 ul li");
		var $marquee1Ul = $("#marquee1 ul");

		var allIndex1 = $marquee1Ul.children().length - 1;
		var nums1 = 0;
		$goRR.click(function() {
			$marquee1Ul.animate({
				'margin-left': -$marquee1Li.width()
			}, 300, function() {
				$marquee1Ul.append($marquee1Li.eq(nums1));
				$marquee1Ul.css("margin-left", 0);
				if (nums1 < allIndex1) {
					nums1++;
				} else {
					nums1 = 0;
				}
			});
		});
		$goLL.click(function() {
			if (nums1 <= 0) {
				nums1 = allIndex1 + nums1;
			} else {
				nums1 = nums1 - 1;
			}
			$marquee1Ul.stop().prepend($marquee1Li.eq(nums1));
			$marquee1Ul.css("margin-left", -$marquee1Li.width());
			$marquee1Ul.animate({
				'margin-left': 0
			}, 300);
		});


		///////footer
		$(".wechat").mouseover(function() {
			$(".wechat img").show();
		}).mouseout(function() {
			$(".wechat img").hide();
		});
		$(window).scroll(function() {
			var scrollHeight = $(window).scrollTop(); //鼠标滑动距离顶部的高度
			if (scrollHeight >= 500) {
				$(".back-top").stop().animate({
					opacity: "1"
				}, "normal");
			} else {
				$(".back-top").stop().animate({
					opacity: "0"
				}, "normal");
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