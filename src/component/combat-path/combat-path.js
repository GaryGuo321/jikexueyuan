(function(factory, window) {
	// 模块化输出
	if (typeof define == 'function') {
		if (define.amd) {
			// amd
			define('combatPath', ['jquery', 'emitter', 'lifeCycle', 'css!../component/combat-path/combat-path', 'ejs'], factory);
		}
	} else {
		window.CombatPath = factory(jQuery);
	}
})(function($, Emitter, LifeCycle) {
	function CombatPath() {
		LifeCycle.apply(this, arguments);
		Emitter.apply(this, arguments);

		this.ajaxUrl = null;
	}

	$.extend(CombatPath.prototype, Emitter.prototype, LifeCycle.prototype, {
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
			this.template = $(ejs.render('<div class="real-path">\
				<% for(var i = 0; i < items.length; i++){ %>\
					<a href="" class="path-and path-all">\
					 	<img src="<%= items[i].img %>" width="70" height="70">\
			 			<p><%= items[i].pathName %></p>\
			 			<% for(var s = 0; s < items[i].desc.length; s++) { %>\
			 				<span><%= items[i].desc[s] %></span>\
			 			<% } %>\
			 			<% if(items[i].isLearn == 1) { %>\
							<button><%= items[i].btn %></button>\
			 			<% } else { %>\
			 				<button class="preparing"><%= items[i].btn %></button>\
			 			<% } %>\
					</a>\
				<% } %>\
			</div>', data));
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
		},
		init: function(obj) {
			$.extend(this, obj);
			this.render(this.container);
			return this;
		},
	});

	return CombatPath;
}, window);