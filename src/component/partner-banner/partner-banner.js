(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('partnerBanner', ['jquery', 'emitter', 'lifeCycle', 'css!../component/partner-banner/partner-banner', 'ejs'], factory);
		}
	} else {
		window.PartnerBanner = factory(jQuery);
	}
})(function($, Emitter, LifeCycle) {
	function PartnerBanner() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		// this.isArrow = null;
		this.ajaxUrl = null;
		// this.autoplay = false;
		this.length = 0;
	}

	$.extend(PartnerBanner.prototype, Emitter.prototype, LifeCycle.prototype, {
		dataUI: function(fn) {
			var _self = this;
			$.ajax({
				url: this.ajaxUrl,
				type: 'GET',
				success: function(data) {
					_self.data = data;
					_self.length = data.length - 1;
					fn();
				}
			});

			return this;
		},
		templateUI: function() {
			var data = {
				items: this.data
			};

			this.template = $(ejs.render('<div class="partner-container">\
			    <div class="partner-container-box">\
			        <span class="btn-pre"></span>\
			        <span class="btn-next"></span>\
			        <div class="marquee">\
			            <ul>\
			            	<% for(var i = 0; i < items.length; i++) { %>\
			                <li>\
			                    <a href="#"><img src="<%= items[i].imgUrl %>"></a>\
			                </li>\
			                <% } %>\
			            </ul>\
			        </div>\
			    </div>\
			</div>', data));

			return this;
		},
		eventUI: function() {
			// 箭头显示与隐藏
			var _self = this;
			var box = $(this.container + ' .partner-container');
			var btnPre = $(this.container + ' .btn-pre');
			var btnNext = $(this.container + ' .btn-next');
			var imgBox = $(this.container + ' .marquee');

			// 自定义事件
			this.on('btnNext', function() {
				// 设置图片盒子的margin-left:-li宽度
				imgBox.children().animate({
					'margin-left': -imgBox.children().children().width()
				}, 300, function() {
					// 把第一张的图片放到最后
					imgBox.children().append(imgBox.children().children().eq(0));
					// 把margin-left重置0
					imgBox.children().css("margin-left", 0);
				});
			});
			this.on('btnPre', function() {
				// 把后一张图片放到第一张
				imgBox.children().prepend(imgBox.children().children().eq(_self.length));
				// 设置图片盒子的margin-left:-li宽度
				imgBox.children().css("margin-left", -imgBox.children().children().width());
				// 设置margin-left:0
				imgBox.children().stop().animate({
					'margin-left': 0
				}, 300);
			});
			this.on('fadeIn', function() {
				btnPre.fadeIn();
				btnNext.fadeIn();
			});
			this.on('fadeOut', function() {
				btnPre.fadeOut();
				btnNext.fadeOut();
			});

			// 箭头的显示与隐藏
			box.mouseenter(function() {
				if (!$(this).is(":animated")) {
					_self.fire('fadeIn');
				}
			}).mouseleave(function() {
				if (!$(this).is(":animated")) {
					_self.fire('fadeOut');
				}
			});
			// 点击右键头切换
			btnNext.click(function() {
				_self.fire('btnNext');
			});

			// 点击做箭头切换
			btnPre.click(function() {
				_self.fire('btnPre');
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
	return PartnerBanner;
}, window);