(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('knowledgeSystem', ['jquery', 'emitter', 'lifeCycle', 'css!../component/knowledge-system/knowledge-system', 'ejs'], factory);
		}
	} else {
		window.KnowledgeSystem = factory(jQuery);
	}
})(function($, Emitter, LifeCycle) {
	function KnowledgeSystem() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.ajaxUrl = null;
	}

	$.extend(KnowledgeSystem.prototype, Emitter.prototype, LifeCycle.prototype, {
		dataUI: function(fn) {
			var _self = this;
			$.ajax({
				url: this.ajaxUrl,
				type: 'GET',
				cache: false,
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

			this.template = $(ejs.render('<div class="know-content">\
			    <div class="know-content-frame">\
			    	<% for(var i = 0; i < items.length; i++) { %>\
			        <div class="know-frame">\
			            <div class="front">\
			                <img src="<%= items[i].img %>" alt="<%= items[i].imgAlt %>" width="52">\
			                <h2><%= items[i].sub %></h2>\
			                <span><%= items[i].courses %></span>\
			            </div>\
			            <div class="back">\
			                <strong><%= items[i].learner %></strong>\
			                <button class="greenbtn"><%= items[i].btn %></button>\
			            </div>\
			        </div>\
			        <% } %>\
			    </div>\
			</div>', data));

			return this;
		},
		eventUI: function() {
			$('.know-frame').mouseenter(function() {
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

			$('.greenbtn').mouseenter(function() {
				$(this).animate({
					opacity: "0.8"
				}, "normal");
			}).mouseleave(function() {
				$(this).animate({
					opacity: "1"
				}, "normal");
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
	return KnowledgeSystem;
}, window);