class Home {
    constructor(root) {
        this.root = root;

        this.$home = $(`
<!-- Home界面 -->
<div id="home" class="home">
    <div class="home_frame">
        <div class="home_frame_background"></div>
        <div class="home_frame_write">
            <h1>欢迎使用协作白板</h1>
            <div class="home_frame_write_operate">
                <div class="home_frame_write_join_meeting">
                    <img class="home_frame_write_join_meeting_img" width="55" src="/static/image/join_meeting.jpg">
                    <span>匿名加入白板</span>
                </div>
                <div class="home_frame_write_create_meeting">
                    <img class="home_frame_write_create_meeting_img" width="55" src="/static/image/create_meeting.jpg">
                    <span>快速创建白板</span>
                </div>
            </div>
        </div>
        <!-- 表单 -->
        <div class="home_frame_form">
            <h1>欢迎使用协作白板</h1>
            <div class="home_frame_write_form">
                <!-- 房间号 -->
                <div class="home_frame_write_form_item_roomid">
                    <input class="home_frame_write_form_item_roomid_input" type="text" placeholder="房间号">
                    <div class="home_frame_write_form_item_roomid_input_warn">该房间不存在</div>
                </div>
                <!-- 提交表单 -->
            </div>
            <div class="home_frame_write_form_submit">立即加入</div>
        </div>
    </div>
</div>
`);
        this.$frame = this.$home.find(".home_frame");
        this.$frame_write = this.$frame.find(".home_frame_write");
        this.$frame_write_operate = this.$frame.find(".home_frame_write_operate");
        this.$frame_write_operate_join_meeting = this.$frame.find(".home_frame_write_join_meeting_img");
        this.$frame_write_operate_create_meeting = this.$frame.find(".home_frame_write_create_meeting_img");
        this.$frame_form = this.$frame.find(".home_frame_form");
        this.$frame_write_form_roomid_input = this.$frame.find(".home_frame_write_form_item_roomid_input");
        this.$frame_write_form_roomid_input_warn = this.$frame.find(".home_frame_write_form_item_roomid_input_warn");
        this.$frame_write_form_submit = this.$frame.find(".home_frame_write_form_submit");

        this.$frame_form.hide();
        // this.$home.hide();
        this.$frame_write_form_roomid_input_warn.hide();
        this.root.$cooperation_board.append(this.$home);
        this.start();
    }
    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        
        this.$frame_write_operate_join_meeting.click(function(){ // 匿名加入白板
            console.log("匿名加入白板");
            outer.$frame_write.hide();
            outer.$frame_form.show();
        });

        this.$frame_write_operate_create_meeting.click(function(){ // 快速创建白板
            console.log("快速创建白板");
            $.ajax({
                url:"http://123.57.187.239:8000/redis/create/",
                data:{},
                type:"GET",
                success:function(resp) {
                    if(resp.result === "success") {
                        console.log("success");
                        let mode = "create";
                        let roomid = resp.roomid;
                        outer.hide();
                        outer.root.board.show(roomid, mode);
                    }
                }
            });
        });

        this.$frame_write_form_submit.click(function(){ // 加入已存在房间
            let roomid = outer.$frame_write_form_roomid_input.val(); // 对于roomid需要确定在redis中是否存在
            outer.$frame_write_form_roomid_input_warn.hide();
            $.ajax({
                url:"http://123.57.187.239:8000/redis/query/",
                data:{
                    roomid:roomid,
                },
                type:"GET",
                success:function(resp) {
                    if(resp.result === "success") {
                        let mode = "join";
                        outer.hide();
                        outer.root.board.show(roomid, mode);
                    } else if (resp.result === "fail"){
                        console.log("加入失败");
                        outer.$frame_write_form_roomid_input_warn.html("该房间号不存在");
                        outer.$frame_write_form_roomid_input_warn.show();  
                    } else {
                        console.log("没输入房间号");
                        outer.$frame_write_form_roomid_input_warn.html(resp.result);
                        outer.$frame_write_form_roomid_input_warn.show();
                    }
                }
            });
        });
    }

    show() {

    }

    hide() {
        this.$home.hide();
    }
}
