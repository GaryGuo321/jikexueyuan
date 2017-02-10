(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('navLists', ['jquery', 'emitter', 'lifeCycle', 'css!../component/nav-lists/nav-lists', 'ejs'], factory);
		}
	} else {
		window.NavLists = factory(jQuery);
	}
})(function($, Emitter, LifeCycle) {
	function NavLists() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		// element
		this.navBox = null;
		this.upArrow = null;
		this.mainNav = null;
		this.mainNavChild = null;

		this.ajaxUrl = null;
	}

	$.extend(NavLists.prototype, Emitter.prototype, LifeCycle.prototype, {
		dataUI: function(fn) {
			var _self = this;
			$.ajax({
				url: this.ajaxUrl,
				type: 'GET',
				success: function(data) {
					_self.data = data;
					fn();
				}
			});

			return this;
		},
		templateUI: function() {
			console.log(this.data);
			var data = {
				items: this.data
			};

			this.template = $(ejs.render('<div class="nav-title">\
				<ul class="nav-lists">\
					<% for(var i = 0; i < items.length; i++) { %>\
					<li>\
						<a class="main-nav">\
							<%= items[i].bigSort %>\
							<i></i>\
						</a>\
						<div>\
							<% for(var s = 0; s < items[i].smallSort.length; s++) { %>\
							<p><%= items[i].smallSort[s].sort %></p>\
							<ul>\
								<% for(var t = 0; t < items[i].smallSort[s].subSort.length; t++) { %>\
								<li><a href=""><%= items[i].smallSort[s].subSort[t].sub %></a></li>\
								<span>|</span>\
								<% } %>\
							</ul>\
							<% } %>\
						</div>\
					</li>\
					<% } %>\
				</ul>\
			</div>\
			<div class="down"><i></i></div>', data));

			return this;
		},
		eventUI: function() {
			var _self = this;
			this.navBox = $(this.container || 'body');
			this.upArrow = $((this.container || 'body') + ' .down');
			this.mainNav = $((this.container || 'body') + ' .main-nav');
			this.mainNavChild = $((this.container || 'body') + ' .nav-title li div');

			// 鼠标位于盒子上
			this.navBox.mouseover(function() {
				// 显示隐藏的导航菜单
				$(this).css("overflow", "visible");
				// 向下箭头隐藏
				_self.upArrow.hide();
			}).mouseout(function() {
				$(this).css("overflow", "hidden");
				_self.upArrow.show();
			});

			// 鼠标位于具体导航类
			this.mainNav.mouseover(function() {
				// 增加绿色border，并且隐藏箭头
				$(this).addClass("nav-a-hover").children("i").hide();
				// 显示子导航栏
				$(this).next().show();
			}).mouseout(function() {
				$(this).removeClass("nav-a-hover").children("i").show();
				$(this).next().hide();
			});

			// 鼠标位于子导航类
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
		render: function(container) {
			this.dataUI(function() {
				this.templateUI();
				if (this.template) {
					this.template.appendTo(container || 'body');
					this.eventUI();
					this.styleUI();
				}
			}.bind(this));

			return this;
		},
		init: function(obj) {
			$.extend(this, obj);
			this.render(this.container);
			return this;
		}
	});
	return NavLists;
}, window);