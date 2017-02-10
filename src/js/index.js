require.config({
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'emitter': './lib/emitter',
		'lifeCycle': './lib/lifeCycle',
		'combatPath': '../component/combat-path/combat-path',
		'knowledgeSystem': '../component/knowledge-system/knowledge-system',
		'partnerBanner': '../component/partner-banner/partner-banner',
		'subjectTab': '../component/subject-tab/subject-tab',
		'subjectBanner': '../component/subject-banner/subject-banner',
		'navLists': '../component/nav-lists/nav-lists',
		'ejs': '../bower_components/ejs/ejs.min'
	},
	map: {
		'*': {
			'css': '../bower_components/require-css/css.min'
		}
	},
});

require(['jquery', 'emitter', 'lifeCycle', 'combatPath', 'knowledgeSystem', 'partnerBanner', 'subjectTab', 'subjectBanner', 'navLists', 'ejs'], function($, Emitter, LifeCycle, CombatPath, KnowledgeSystem, PartnerBanner, SubjectTab, SubjectBanner, NavLists) {　　　　
	$(function() {
		// 实战路径图
		new CombatPath().init({
			container: '.content-third',
			ajaxUrl: 'data/combat-path.json'
		});
		// 知识体系图
		new KnowledgeSystem().init({
			container: '.content-fourth',
			ajaxUrl: 'data/knowledge-system.json'
		});

		// 战略合作伙伴
		new PartnerBanner().init({
			container: '.content-five',
			ajaxUrl: 'data/strategy.json',
		});

		// 媒体报道
		new PartnerBanner().init({
			container: '.content-six',
			ajaxUrl: 'data/media.json',
		});

		// 课程tab
		new SubjectTab().init({
			container: '.sub-tab',
			defaultShowTab: 1,
			ajaxUrl: 'data/subject-lists.json'
		});

		// 首屏banner
		new SubjectBanner().init({
			container: '.banner',
			ajaxUrl: 'data/sub-banner-img.json',
			autoplay: true,
			times: 5000,
			isArrow: true
		});

		// 导航
		new NavLists().init({
			ajaxUrl: 'data/nav-lists.json',
			container: '.content-nav'
		});

		//搜索框
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
		new SearchInput({
			navSmallSort: $(".nav-small-sort"), //输入框导航
			inputText: $(".text"), //输入框
			btn: $("#submit") //提交按钮
		});


		//用户信息
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
		new UserHover({
			myName: $(".my-name"),
			menu: $(".user-menu"),
			arrow: $(".arrow")
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
			}
		});
		$(".back-top").click(function() {
			$("body").animate({
				scrollTop: 0
			}, 300);
			return false;
		});
	});　　
});