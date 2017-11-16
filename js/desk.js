(function() {
	"use strict";

	$(function() {
		chat();
	});

	function chat() {
		$("body").on("click", "#chat", function() {
			Dialog.open({
				title: "",
				content: ['<div class="chat_user_form">',
							'<div>请输入您的用户名：</div>',
							'<div><input type="text" id="chat_user_name"></div>',
						'</div>'].join(""),
				btns: [{
					content: "确定",
					className: "dialog_btn_0",
					fun: function() {
						var name = $("#chat_user_name").val();
						QQ.open(name);	
					},
					close: true
				}]
			});
		});
	}
})();