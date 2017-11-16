(function(factory) {
    factory(window, jQuery);
})(function(window, $) {
    "use strict";

    var defaultName = "游客",
        defaultDesc = "来去匆匆，什么也没留下...";

    function QQ(userName, userDesc, friendArr) {
        this.userName = userName || defaultName;
        this.userDesc = userDesc || defaultDesc;
        this.friends = friendArr || [{
            name: "test"
        }];

        this.init();
    }

    var qqTemplate = ['<div class="qq_wrapper">',
                        '<div class="qq_user">',
                            '<div class="qq_user_name">游客</div>',
                            '<div class="qq_user_desc">来去匆匆，什么也没留下...</div>',
                        '</div>',
                        '<div class="qq_friends_list_title">好友列表</div>',
                        '<div class="qq_friends_list">',
                        '</div>',
                        '<a href="javascript: void(0);" class="qq_friend_add" title="添加好友">添加好友</a>',
                    '</div>'].join("");
    
    var friendTemplate = ['<div class="qq_friend">',
                            '<img src="" alt="头像" class="qq_friend_icon">',
                            '<div class="qq_friend_info">',
                                '<div class="qq_friend_name">好友1</div>',
                                '<div class="qq_friend_desc">好友描述...</div>',
                            '</div>',
                        '</div>'].join("");
    var noFriendsTemplate = '<div class="qq_friends_no">暂无好友<br>请先点击右下方按钮，添加好友</div>'

    QQ.prototype.init = function() {
        var _ = this,
            $qq = $(qqTemplate),
            friendArr = _.friends;

        $qq.find(".qq_user_name").html(_.userName);
        $qq.find(".qq_user_desc").html(_.userDesc);

        console.log($qq);

        _.dialog = new Dialog({
            title: "",
            content: $qq,
            width: 280,
            height: 600,
            right: 20,
            middle: true
        });
        _.$qq = $qq;

        if (friendArr.length === 0) {
            $($qq.find(".qq_friends_list").append(noFriendsTemplate));
        } else {
            _.addFriends(_.friends);   
        }
    }

    QQ.prototype.addFriends = function(friendArr) {
        var _ = this,
            $friendList = _.$qq.find(".qq_friends_list");

        $.each(friendArr, function(index, value) {
            var $friend = $(friendTemplate);

            $friend.find(".qq_friend_name").html(value.name);
            $friend.find(".qq_friend_desc").html(value.desc);

            $friendList.append($friend);
        });
    }

    window.QQ = QQ;
});