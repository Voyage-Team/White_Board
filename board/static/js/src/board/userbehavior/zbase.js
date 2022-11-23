class UserBehavior {
    constructor(board) {
        this.board = board;
        this.$userbehavior = $(`
<!-- 邀请/离开 -->
<div class="userbehavior">
    <div class="userbehavior_button">
        <!-- 邀请 -->
        <div class="user_invite">
            <div class="tip tip_bottom" id="user_invite_tip">邀请</div>
            <i class="icon_invite" id="icon_invite"></i>
        </div>
        <!-- 离开 -->
        <div class="user_live">
            <div class="tip tip_bottom" id="user_live_tip">离开</div>
            <i class="icon_off" id="icon_leave"></i>
        </div>
    </div>
    <!-- 邀请行为 -->
    <div class="invite_copy">
        <h2>邀请加入</h2>
        <div class="invite_layout">
            <span>房间号:</span>
            <div class="invite_layout_from">
                <input type="text" class="invite_layout_input invite_layout_input_roomid" id="invite_layout_input_roomid" value="" readonly disabled>
                <div class="invite_layout_i">
                    <i class="icon-copy"></i>
                </div>
            </div>
        </div>
        <div class="invite_layout">
            <span>链接:</span>
            <div class="invite_layout_from">
                <input type="text" class="invite_layout_input invite_layout_input_link" id="invite_layout_input_link" value="" readonly disabled>
                <div class="invite_layout_i">
                    <i class="icon-copy"></i>
                </div>
            </div>
        </div>
    </div>
</div>        
`);
        this.$behavior = this.$userbehavior.find(".userbehavior");
        this.$icon_invite = this.$userbehavior.find(".icon_invite");
        this.$icon_leave = this.$userbehavior.find(".icon_leave");
        this.$invite_copy = this.$userbehavior.find(".invite_copy");
        this.$invite_layout_input_roomid = this.$userbehavior.find(".invite_layout_input_roomid");
        this.$invite_layout_input_roomid.val(this.board.roomid);
        this.$invite_layout_input_link = this.$userbehavior.find(".invite_layout_input_link");
        this.$invite_layout_input_link.val("http://139.9.62.204:8001/?roomid="+this.board.roomid);
        this.$invite_copy.hide();
        this.board.$board.append(this.$userbehavior);
        this.start();
    }

    start() {
        this.listening_event();
    }

    listening_event() {
        let outer = this;
        let user_invite_tip = document.getElementById('user_invite_tip');
        let user_live_tip = document.getElementById('user_live_tip');
        let icon_invite = document.getElementById('icon_invite');
        let icon_leave = document.getElementById('icon_leave');
        icon_invite.onmouseover = function() {
            user_invite_tip.style.opacity = 1;
        }
        icon_leave.onmouseover = function () {
            user_live_tip.style.opacity = 1;
        }
        icon_invite.onmouseout = function() {
            user_invite_tip.style.opacity = 0;
        }
        icon_leave.onmouseout = function () {
            user_live_tip.style.opacity = 0;
        }

        this.$icon_invite.click(function() {
            outer.$invite_copy.show();
            return false;
        });
    }
}