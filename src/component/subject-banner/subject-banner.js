(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('subjectBanner', ['jquery', 'emitter', 'lifeCycle', 'css!../component/subject-banner/subject-banner', 'ejs'], factory);
		}
	} else {
		window.SubjectBanner = factory(jQuery);
	}
})(function($, Emitter, LifeCycle) {
	function SubjectBanner() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.isArrow = false;
		this.autoplay = false;

		this.ajaxUrl = null;
		this.length = 0; //图片数量
		this.indexNum = ''; //用于定位
		this.defaultShowNum = 1;
		this.times = 3000;

		// element
		this.box = null;
		this.imgBox = null;
		this.nav = null;
		this.btnPre = null;
		this.btnNext = null;
		this.arrow = null;
	}

	$.extend(SubjectBanner.prototype, Emitter.prototype, LifeCycle.prototype, {
		dataUI: function(fn) {
			var _self = this;
			$.ajax({
				url: this.ajaxUrl,
				type: 'GET',
				cache: false,
				success: function(data) {
					_self.data = data;
					_self.length = data.length;
					fn();
				}
			});

			return this;
		},
		templateUI: function() {
			var data = {
				items: this.data,
				length: this.length,
				isArrow: this.isArrow,
				isPagination: this.isPagination
			};

			this.template = $(ejs.render('<div class="banner-box">\
				<div class="banner-img">\
					<% for (var i = 0; i < length; i++) { %>\
					<div>\
						<a href="#"><img src="<%= items[i].imgUrl %>" /></a>\
					</div>\
					<% } %>\
				</div>\
				<div class="banner-pagination">\
					<% for (var s = 0; s < length; s++) { %>\
					<span></span>\
					<% } %>\
				</div>\
				<% if(isArrow) { %>\
				<div class="btn-pre banner-arrow"></div>\
				<div class="btn-next banner-arrow"></div>\
				<% } %>\
			</div>', data));

			return this;
		},
		eventUI: function() {
			var _self = this;

			this.box = $((this.container || 'body') + ' .banner-box');
			this.imgBox = $((this.container || 'body') + ' .banner-img');
			this.nav = $((this.container || 'body') + ' .banner-pagination');
			this.btnPre = $((this.container || 'body') + ' .btn-pre');
			this.btnNext = $((this.container || 'body') + ' .btn-next');
			this.arrow = $((this.container || 'body') + ' .banner-arrow');

			// 绑定自定义事件
			// 图片和导航的切换
			this.on('switchBanner', function(index) {
				this.imgBox.children().eq(index).fadeIn().siblings().fadeOut();
				this.nav.children().eq(index).addClass("pagination-span").siblings().removeClass("pagination-span");
			}.bind(this));
			// 图片向右切换时indexNum计算
			this.on('rightSwitch', function() {
				// 遍历导航，定位当前图片的位置
				_self.nav.children().each(function(index, element) {
					// 存在class名为pagination-span的就是当前显示的图片，保存位置
					var spanClass = $(this).attr("class");
					if (spanClass == "pagination-span") {
						_self.indexNum = index + 1;
					}
				});
				// 检测是否时最后一张图片，如果是indexNum的值归0
				if (_self.indexNum == _self.length) {
					_self.indexNum = 0;
				}
			});
			// 图片向左切换时indexNum计算
			this.on('leftSwitch', function() {
				_self.nav.children().each(function(index, element) {
					// 保存当前位置
					var spanClass = $(this).attr("class");
					if (spanClass == "pagination-span") {
						_self.indexNum = index - 1;
					}
				});
				// 如果是第一张，则转到最后一张图片
				if (_self.indexNum == -1) {
					_self.indexNum = _self.length - 1;
				}
			});


			// 绑定点击导航事件
			this.nav.children().click(function() {
				// 得到目前点击的图片排序位置
				var index = $(this).index();

				_self.fire('switchBanner', index);
			});

			this.btnNext.click(function() {
				// 定位当前图片的位置
				_self.fire('rightSwitch');
				// 切换导航和图片
				_self.fire('switchBanner', _self.indexNum);
			});

			this.btnPre.click(function() {
				// 定位当前图片的位置
				_self.fire('leftSwitch');
				// 切换导航和图片
				_self.fire('switchBanner', _self.indexNum);
			});

			// 定时器
			this._timer = function() {
				// 定位当前图片的位置
				this.fire('rightSwitch');
				// 图片和导航的切换操作
				this.fire('switchBanner', this.indexNum);
			};
			if (this.autoplay) {
				var adTimer = setInterval(this._timer.bind(this), this.times);
			}

			//位于banner上方时，停止切换／移出时重新绑定定时器
			this.box.mouseenter(function() {
				// 显示箭头
				_self.arrow.show();
				if (_self.autoplay) {
					clearInterval(adTimer);
				}
			}).mouseleave(function() {
				// 隐藏箭头
				_self.arrow.hide();
				if (_self.autoplay) {
					adTimer = setInterval(_self._timer.bind(_self), _self.times);
				}
			});
		},
		styleUI: function() {
			// 默认显示图片
			this.nav.children().eq(this.defaultShowNum - 1).addClass("pagination-span");
			// 默认显示导航
			this.imgBox.children('div').eq(this.defaultShowNum - 1).show();
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
	return SubjectBanner;
}, window);