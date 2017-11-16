(function(win) {
	"use strict";

	if (!win.jQuery) {
		throw new Error("jQuery must be included before QQ.");
	}

	if (!win.Dialog) {
		throw new Error("Dialog must be included before QQ.");
	}

	var $ = win.jQuery,
		Dialog = win.Dialog,
		_ = {};

	win.QQ = _;

	var wrapper = ['<div class="qq_wrapper">',
						'<div class="qq_user">',
							'<div class="qq_user_name">游客</div>',
							'<div class="qq_user_desc">来去匆匆，什么也没留下...</div>',
						'</div>',
						'<div class="qq_friends_list_title">好友列表</div>',
						'<div class="qq_friends_list">',
						'</div>',
						'<a href="javascript: void(0);" class="qq_friend_add" title="添加好友">添加好友</a>',
					'</div>'].join(""),
		friendBox = ['<div class="qq_friend">',
						'<img src="" alt="头像" class="qq_friend_icon">',
						'<div class="qq_friend_info">',
							'<div class="qq_friend_name">好友1</div>',
							'<div class="qq_friend_desc">好友描述...</div>',
						'</div>',
					'</div>'].join(""),
		userClassName = ".qq_user",
		userNameClassName = ".qq_user_name",
		userDescClassName = ".qq_user_desc",
		friendsListClassName = ".qq_friends_list",
		friendIconClassName = ".qq_friend_icon",
		friendNameClassName = ".qq_friend_name",
		friendDescClassName = ".qq_friend_desc",
		frineds = [{
			icon: "",
			name: "张三",
			desc: ""
		},{
			icon: "",
			name: "李四",
			desc: ""
		},{
			icon: "",
			name: "王五",
			desc: ""
		},{
			icon: "",
			name: "赵六",
			desc: ""
		}];

	var addFriends = function($list, list) {
		$.each(list, function(index, value) {
			_.addFriend($list, value);
		});
	};

	_.open = function (userName) {
		var $qq = $(wrapper),
			$friendsList = $qq.find(friendsListClassName),
			user = {
				name: userName,
				frineds: frineds.slice(0,1)
			};

		// 填充内容
		$qq.find(userNameClassName).html(userName || "游客");
		addFriends($friendsList, user.frineds);

		Dialog.open({
			title: "",
			content: $qq,
			width: 280,
			height: 600,
			btns: [],
			noShadow: true,
			left: $(window).width() - 320,
			top: 100,
			className: "qq"
		});

		// $friendsList.height($qq.height() - $qq.find(userClassName) - );
	};

	_.addFriend = function($list, friend) {
		var $newFriend = $(friendBox);

		$newFriend.find(friendIconClassName).attr("src", friend.icon);
		$newFriend.find(friendNameClassName).html(friend.name);
		$newFriend.find(friendDescClassName).html(friend.desc || "来去匆匆，什么也没留下...");

		$list.append($newFriend);
	};

	var addEvent = function() {
		$("body").on("click", ".qq_friend", function() {
			// Dialog.open({
				
			// });
		});
	};

	addEvent();
})(window);