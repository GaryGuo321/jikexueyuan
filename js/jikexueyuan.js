require.config({
	paths: {
		"jquery": "jquery.min"
	}
});

require(['jquery'], function($) {　　　　
	$(function() {
		//输入搜索框，有焦点和无焦点时的状态
		function SearchInput(obj) {
			$.extend(this, obj);
			this.init();
		}

		$.extend(SearchInput.prototype, {
			// 输入框导航状态
			navStatus: function() {
				var _self = this;
				this.inputText.focus(function() {
					_self.navSmallSort.hide();
				}).blur(function() {
					_self.navSmallSort.show();
				});
			},
			// 按钮状态
			btnStatus: function() {
				var _self = this;
				this.inputText.focus(function() {
					_self.btn.addClass('submit-focus');
				}).blur(function() {
					_self.btn.removeClass('submit-focus');
				});
			},
			// 初始化
			init: function() {
				this.navStatus();
				this.btnStatus();
			}
		});

		// 输入框实例
		var search = new SearchInput({
			navSmallSort: $(".nav-small-sort"), //输入框导航
			inputText: $(".text"), //输入框
			btn: $("#submit") //提交按钮
		});


		//鼠标位于用户名上时的状态
		function UserHover(obj) {
			$.extend(this, obj);
			this.init();
		}
		$.extend(UserHover.prototype, {
			// 位于名字上
			userStatus: function() {
				var _self = this;
				this.myName.mouseenter(function() {
					// 箭头转向
					_self.arrow.addClass("arrow-go")
						.removeClass("arrow-back");
					// 菜单显示
					_self.menu.show();
				}).mouseleave(function() {
					//箭头转向
					_self.arrow.removeClass("arrow-go")
						.addClass("arrow-back");
					// 菜单隐藏
					_self.menu.hide();
				});
			},
			// 位于菜单上
			menuStatus: function() {
				var _self = this;
				this.menu.mouseenter(function() {
					_self.menu.show();
					_self.arrow.addClass("arrow-go")
						.removeClass("arrow-back");
				}).mouseleave(function() {
					_self.menu.hide();
					_self.arrow.removeClass("arrow-go")
						.addClass("arrow-back");
				});
			},
			// 初始化
			init: function() {
				this.userStatus();
				this.menuStatus();
			}
		});

		// 用户名菜单效果实例
		var UserOne = new UserHover({
			myName: $(".my-name"),
			menu: $(".user-menu"),
			arrow: $(".arrow")
		});


		//左侧导航栏效果
		function MainNav(obj) {
			$.extend(this, obj);
			this.init();
		}
		$.extend(MainNav.prototype, {
			// 鼠标位于盒子上时
			navBoxStatus: function() {
				var _self = this;
				this.navBox.mouseover(function() {
					// 显示隐藏的导航菜单
					$(this).css("overflow", "visible");
					// 向下箭头隐藏
					_self.upArrow.hide();
				}).mouseout(function() {
					$(this).css("overflow", "hidden");
					_self.upArrow.show();
				});
			},
			// 鼠标位于具体导航类时
			mainNavStatus: function() {
				var _self = this;
				this.mainNav.mouseover(function() {
					// 增加绿色border，并且隐藏箭头
					$(this).addClass("nav-a-hover").children("i").hide();
					// 显示子导航栏
					$(this).next().show();
				}).mouseout(function() {
					$(this).removeClass("nav-a-hover").children("i").show();
					$(this).next().hide();
				});
			},
			// 鼠标位于子导航栏时
			mainNavChildStatus: function() {
				var _self = this;
				this.mainNavChild.mouseover(function() {
					// 显示子导航栏
					$(this).show();
					// 增加绿色border，并且隐藏箭头
					$(this).prev().addClass("nav-a-hover").children("i").hide();
				}).mouseout(function() {
					$(this).hide();
					$(this).prev().removeClass("nav-a-hover").children("i").show();
				});
			},
			// 初始化
			init: function() {
				this.navBoxStatus();
				this.mainNavStatus();
				this.mainNavChildStatus();
			}
		});

		// 导航实例
		var nav = new MainNav({
			// 左侧导航盒子
			navBox: $(".content-nav"),
			// 隐藏过多导航条的箭头
			upArrow: $(".down"),
			// 导航list
			mainNav: $(".main-nav"),
			// 子导航栏
			mainNavChild: $(".nav-title li div")
		});


		//banner

		// 图片模版
		// <div>
		//     <a href="#"><img src="../image/55e6b5f787fd0.png"></a>
		// </div>

		// 导航条模版
		// <span></span>

		// 箭头
		// <div class="left-arrow banner-arrow"></div>
		// <div class="right-arrow banner-arrow"></div> 

		function Banner(obj) {
			$.extend(this, obj);
			this.length = this.img.length; //图片数量
			this.indexNum = ''; //用于定位
			this.init();
		}
		$.extend(Banner.prototype, {
			// 拼接元素
			joinEle: function() {
				var _self = this;
				// 遍历img数组
				$.each(this.img, function(index, ele) {
					// 添加图片元素
					_self.imgBox.append($('<div><a href="#"><img src="' + ele.imgUrl + '"></a></div>'));
					if (_self.nav) {
						// 添加导航点元素
						_self.nav.append($('<span></span>'));
					}
				});
			},
			// 默认显示图片
			defaultShow: function() {
				// 默认显示图片
				this.nav.children().eq(this.defaultShowNum - 1).addClass("prompt-span");
				// 默认显示导航
				this.imgBox.children().eq(this.defaultShowNum - 1).show();
			},
			// 点击导航
			navClick: function() {
				var _self = this;
				// 绑定点击导航事件
				this.nav.children().click(function() {
					// 得到目前点击的图片排序位置
					var index = $(this).index();
					// 给点击的导航添加样式
					$(this).addClass("prompt-span").siblings().removeClass("prompt-span");
					// 把指定的图片显示出来，兄弟元素隐藏
					_self.imgBox.children().eq(index).fadeIn()
						.siblings().fadeOut();
				});
			},
			// 点击箭头
			arrowClick: function() {
				var _self = this;
				// 点击点头切换图片
				// 绑定右箭头点击事件
				this.arrow.filter('.right-arrow').click(function() {
					// 遍历导航，定位当前图片的位置
					_self.nav.children().each(function(index, element) {
						// 存在class名为prompt-span的就是当前显示的图片，保存位置
						var spanClass = $(this).attr("class");
						if (spanClass == "prompt-span") {
							_self.indexNum = index + 1;
						}
					});
					// 检测是否时最后一张图片，如果是indexNum的值归0
					if (_self.indexNum == _self.length) {
						_self.indexNum = 0;
					}
					// 切换导航和图片
					_self.imgBox.children().eq(_self.indexNum).fadeIn().siblings().fadeOut();
					_self.nav.children().eq(_self.indexNum).addClass("prompt-span").siblings().removeClass("prompt-span");
				});
				// 绑定左箭头点击事件
				this.arrow.filter('.left-arrow').click(function() {
					// 遍历导航
					_self.nav.children().each(function(index, element) {
						// 保存当前位置
						var spanClass = $(this).attr("class");
						if (spanClass == "prompt-span") {
							_self.indexNum = index - 1;
						}
					});
					// 如果是第一张，则转到最后一张图片
					if (_self.indexNum == -1) {
						_self.indexNum = _self.length - 1;
					}
					// 切换导航和图片
					_self.imgBox.children().eq(_self.indexNum).fadeIn().siblings().fadeOut();
					_self.nav.children().eq(_self.indexNum).addClass("prompt-span").siblings().removeClass("prompt-span");
				});
			},
			timeSwitch: function() {
				var _self = this;
				//指定时间执行
				var adTimer = setInterval(this._timer.bind(this), this.times);

				//位于banner上方时，停止切换／移出时重新绑定定时器
				this.box.mouseenter(function() {
					// 显示箭头
					_self.arrow.show();
					clearInterval(adTimer);
				}).mouseleave(function() {
					// 隐藏箭头
					_self.arrow.hide();
					adTimer = setInterval(_self._timer.bind(_self), _self.times);
				});
			},
			// 事件函数
			_timer: function() {
				var _self = this;
				// 时间函数，指定每x秒执行一次，切换轮播图
				this.nav.children().each(function(index, ele) {
					// 定位
					var spanClass = $(this).attr("class");
					if (spanClass == "prompt-span") {
						_self.indexNum = index + 1;
					}
				});
				// 判断是否时最后一张
				if (this.indexNum == this.length) {
					this.indexNum = 0;
				}
				// 图片和导航的切换操作
				this.imgBox.children().eq(this.indexNum).fadeIn().siblings().fadeOut();
				this.nav.children().eq(this.indexNum).addClass("prompt-span").siblings().removeClass("prompt-span");
			},
			// 初始化
			init: function() {
				this.joinEle();
				this.defaultShow();
				this.navClick();
				this.timeSwitch();
				this.arrowClick();
			}
		});

		var mainBanner = new Banner({
			// 图片
			img: [{
				imgUrl: '../image/55e6b5f787fd0.png'
			}, {
				imgUrl: '../image/55ebb00122f6b.jpg'
			}, {
				imgUrl: '../image/55efa62ccade9.jpg'
			}, {
				imgUrl: '../image/55f2a26fc7ded.jpg'
			}, {
				imgUrl: '../image/55f10a27808c2.jpg'
			}],
			defaultShowNum: 1,
			times: 5000,
			// 箭头
			arrow: $('.banner-arrow'),
			// banner盒子
			box: $(".banner"),
			// 图片盒子
			imgBox: $('.banner-img'),
			// 导航
			nav: $('.banner-prompt')
		});

		//推荐课程标题效果切换与显示切换
		function TabSwitch(obj) {
			$.extend(this, obj);
			this.init();
		}
		$.extend(TabSwitch.prototype, {
			// 默认显示操作
			defaultShow: function() {
				this.tabBox.find('li').eq(this.defaultShowNum - 1).addClass("a-boder").children("i").show(); //默认显示第一个
				this.contentBox.children().eq(this.defaultShowNum - 1).show(); //默认显示第一个课程框
			},
			// 鼠标经过tab时
			tabMouse: function() {
				var _self = this;
				this.tabBox.find('li').mouseover(function() {
					var indexNum = $(this).index(); //加上this可以定位在鼠标之下的
					// 切换tab样式
					$(this).addClass("a-boder")
						.children("i").show();
					$(this).siblings().removeClass("a-boder")
						.children("i").hide();
					// 切换课程列表
					_self.contentBox.children().eq(indexNum).show()
						.siblings().hide();
				});
			},
			init: function() {
				this.defaultShow();
				this.tabMouse();
			}
		});

		var tab = new TabSwitch({
			// tab盒子
			tabBox: $('.sec-title'),
			// 课程列表盒子
			contentBox: $('.sec-content'),
			// 默认显示
			defaultShowNum: 1
		});

		//课程列表动画
		function SubAnimation(obj) {
			$.extend(this, obj);
			this.init();
		}
		$.extend(SubAnimation.prototype, {
			// hover函数
			subHover: function() {
				var _self = this;
				this.subBox.mouseenter(function() {
					// 小遮罩出现
					$(this).children(".img-blove").stop().fadeIn();
					// 隐藏高度出现
					$(this).children(".frame-word").stop().animate({
						height: "160px"
					}, "fast");
					// 隐藏文字出现
					$(this).find('.frame-word p').stop().slideDown("fast");
				}).mouseleave(function() {
					// 小遮罩消失
					$(this).children(".img-blove").fadeOut();
					// 隐藏高度
					$(this).children(".frame-word").stop().animate({
						height: "100px"
					}, "normal");
					// 隐藏文字
					$(this).find('.frame-word p').stop().slideUp();
				});
			},
			// 初始化
			init: function() {
				this.subHover();
			}
		});

		var subject = new SubAnimation({
			// 课程
			subBox: $('.s-frame')
		});


		//知识路径图
		function Flip(obj) {
			$.extend(this, obj);
			this.init();
		}
		$.extend(Flip.prototype, {
			// hover元素
			eleHover: function() {
				this.box.mouseenter(function() {
					// 阻止多次动画
					if (!$(this).children(".front").is(":animated")) {
						// 翻转过去
						$(this).children(".front").addClass("front-rotate");
						$(this).children(".back").addClass("back-rotate");
					}
				}).mouseleave(function() {
					// 阻止多次动画
					if (!$(this).is(":animated")) {
						// 翻转回来
						$(this).children(".front").removeClass("front-rotate");
						$(this).children(".back").removeClass("back-rotate");
					}
				});
			},
			// 按钮hover
			btnHover: function() {
				this.btn.mouseenter(function() {
					$(this).animate({
						opacity: "0.8"
					}, "normal");
				}).mouseleave(function() {
					$(this).animate({
						opacity: "1"
					}, "normal");
				});
			},
			init: function() {
				this.eleHover();
				this.btnHover();
			}
		});

		var subFlip = new Flip({
			// 盒子
			box: $(".know-frame"),
			// 按钮
			btn: $(".greenbtn")
		});

		//相关轮播
		//轮播模版
		// 盒子
		// <div class="strategy">
		//   盒子
		//   <div class="strategy-box">
		//     箭头
		//     <span class="left-arrow3" id="goL"></span>
		//     箭头
		//     <span class="right-arrow3" id="goR"></span>
		//     图片盒子
		//     <div id="marquee"></div>
		//   </div>
		// </div>

		// 图片模版
		// <ul>
		//   <li>
		//	   <a href="#">
		//	     <img src="../image/54d1d9f50e1af.jpg">
		//	   </a> 
		//	 </li> 
		// </ul>

		function AboutBanner(obj) {
			$.extend(this, obj);
			// 长度
			this.length = this.img.length - 1;
			this.init();
		}

		$.extend(AboutBanner.prototype, {
			// 元素拼接
			joinEle: function() {
				var _self = this;
				this.imgBox.append($('<ul></ul>'));
				// 循环添加模版
				$.each(this.img, function(index, ele) {
					_self.imgBox.children().append($('<li><a href="#"><img src="' + ele.imgUrl + '"></a></li>'));
				});
			},
			// 鼠标位于盒子上
			boxStatus: function() {
				var _self = this;
				// 箭头显示与隐藏
				this.box.mouseenter(function() {
					if (!$(this).is(":animated")) {
						_self.arrowL.fadeIn();
						_self.arrowR.fadeIn();
					}
				}).mouseleave(function() {
					if (!$(this).is(":animated")) {
						_self.arrowL.fadeOut();
						_self.arrowR.fadeOut();
					}
				});
			},
			// 点击箭头
			arrowClick: function() {
				var _self = this;

				// 点击右键头切换
				this.arrowL.click(function() {
					// 设置图片盒子的margin-left:-li宽度
					_self.imgBox.children().animate({
						'margin-left': -_self.imgBox.children().children().width()
					}, 300, function() {
						// 把第一张的图片放到最后
						_self.imgBox.children().append(_self.imgBox.children().children().eq(0));
						// 把margin-left重置0
						_self.imgBox.children().css("margin-left", 0);
					});
				});
				// 点击做箭头切换
				this.arrowR.click(function() {
					// 把后一张图片放到第一张
					_self.imgBox.children().prepend(_self.imgBox.children().children().eq(_self.length));
					// 设置图片盒子的margin-left:-li宽度
					_self.imgBox.children().css("margin-left", -_self.imgBox.children().children().width());
					// 设置margin-left:0
					_self.imgBox.children().stop().animate({
						'margin-left': 0
					}, 300);
				});
			},
			init: function() {
				this.joinEle();
				this.boxStatus();
				this.arrowClick();
			}
		});

		var aboutFriend = new AboutBanner({
			img: [{
				imgUrl: '../image/54feae1060a75.jpg'
			}, {
				imgUrl: '../image/54ffb46961d0d.jpg'
			}, {
				imgUrl: '../image/54d18f3f14fd6.jpg'
			}, {
				imgUrl: '../image/55cab4db88fee.png'
			}, {
				imgUrl: '../image/551df2a07a195.png'
			}, {
				imgUrl: '../image/556e6608940cb.jpg'
			}, {
				imgUrl: '../image/55078d94affa7.jpg'
			}, {
				imgUrl: '../image/55755bc57f9c9.png'
			}, {
				imgUrl: '../image/5513774149948.png'
			}, {
				imgUrl: '../image/microsoft.jpg'
			}, {
				imgUrl: '../image/tengxun.jpg'
			}, {
				imgUrl: '../image/54d1d9f50e1af.jpg'
			}],
			// 箭头
			arrowL: $("#goR"),
			arrowR: $("#goL"),
			box: $(".strategy"),
			imgBox: $("#marquee"),
		});

		var reportMedia = new AboutBanner({
			img: [{
				imgUrl: '../image/mt_1_42b5088.jpg'
			}, {
				imgUrl: '../image/mt_2_28e84dd.jpg'
			}, {
				imgUrl: '../image/mt_4_2376f75.jpg'
			}, {
				imgUrl: '../image/mt_5_8427d73.jpg'
			}, {
				imgUrl: '../image/mt_6_21a38b7.jpg'
			}, {
				imgUrl: '../image/mt_7_7b98ea4.jpg'
			}, {
				imgUrl: '../image/mt_8_22fde55.jpg'
			}, {
				imgUrl: '../image/mt_9_c0db122.jpg'
			}, {
				imgUrl: '../image/mt_10_d2a046a.jpg'
			}, {
				imgUrl: '../image/mt_11_82c3d18.jpg'
			}, {
				imgUrl: '../image/mt_12_47fcda1.jpg'
			}, {
				imgUrl: '../image/mt_14_d3100a3.jpg'
			}],
			arrowL: $("#goRR"),
			arrowR: $("#goLL"),
			box: $(".media"),
			imgBox: $("#marquee1"),
		});

		//footer
		//微信二维码
		$(".wechat").mouseover(function() {
			$(".wechat img").show();
		}).mouseout(function() {
			$(".wechat img").hide();
		});
		// 返回顶部
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
	});　　
});