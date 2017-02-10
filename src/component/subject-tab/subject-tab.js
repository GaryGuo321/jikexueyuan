(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('subjectTab', ['jquery', 'emitter', 'lifeCycle', 'css!../component/subject-tab/subject-tab', 'ejs'], factory);
		}
	} else {
		window.SubjectTab = factory(jQuery);
	}
})(function($, Emitter, LifeCycle) {
	function SubjectTab() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.defaultShowTab = 1;
		this.ajaxUrl = null;
	}

	$.extend(SubjectTab.prototype, Emitter.prototype, LifeCycle.prototype, {
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
			var data = {
				items: this.data
			};

			this.template = $(ejs.render('<div class="sec-title">\
	            <ul>\
	                <li>热门推荐<i></i></li>\
	                <li>最新课程<i></i></li>\
	                <li>免费课程<i></i></li>\
	                <li>项目实战<i></i></li>\
	                <li>全球首发<i></i></li>\
	                <li>企业合作<i></i></li>\
	            </ul>\
	        </div>\
	        <div class="sec-content">\
	        	<% for(var s = 0; s< items.length; s++) { %>\
			    <div class="sec-frame">\
			    	<% for(var i = 0; i<items[s].length; i++) { %>\
			    	<div class="s-frame">\
			            <div class="frame-image">\
			                <img src="<%= items[s][i].subImg %>" width="100%">\
			            </div>\
			            <div class="img-blove">\
			                <i></i>\
			            </div>\
			            <div class="frame-word">\
			                <h2><a href=""><%= items[s][i].subTitle %></a></h2>\
			                <p>\
			                    <%= items[s][i].subDesc %>\
			                </p>\
			                <div class="subject-message">\
			                    <i class="time-logo"></i><em><%= items[s][i].subTime %></em>\
			                    <em class="people-num"><%= items[s][i].subLearner %></em>\
			                    <i class="grade-logo"></i><em><%= items[s][i].subGrade %></em>\
			                </div>\
			            </div>\
			        </div>\
			        <% } %>\
			    </div>\
			    <% } %>\
			</div>', data));

			return this;
		},
		eventUI: function() {
			var _self = this;
			$('.sec-title').find('li').mouseover(function() {
				var indexNum = $(this).index(); //加上this可以定位在鼠标之下的
				// 切换tab样式
				$(this).addClass("a-boder")
					.children("i").show();
				$(this).siblings().removeClass("a-boder")
					.children("i").hide();
				// 切换课程列表
				$('.sec-content').children().eq(indexNum).show()
					.siblings().hide();
			});

			$('.s-frame').mouseenter(function() {
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
		styleUI: function() {
			// 默认显示tab
			$('.sec-title').find('li').eq(this.defaultShowTab - 1).addClass("a-boder").children("i").show();
			$('.sec-content').children().eq(this.defaultShowTab - 1).show();
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
	return SubjectTab;
}, window);