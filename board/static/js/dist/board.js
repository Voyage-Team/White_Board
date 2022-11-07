let Board_OBJECTS = [];

class BoardObject {
    constructor() {
        Board_OBJECTS.push(this);
        
    }

    start() { // 只会在第一帧执行

    }

    update() { // 每一帧都会执行

    }

    destroy() { // 删掉该图形

    }
}class BoardCanvas extends BoardObject {
    constructor(paint_board) {
        super();
        this.paint_board = paint_board;
        this.$canvas = $(`<canvas id="imageView"></canvas>`);
        // this.ctx = this.$canvas[0].getContext('2d');
        // this.ctx.canvas.width = this.paint_board.width;
        // this.ctx.canvas.height = this.paint_board.height;
        // this.x1 = (this.paint_board.board.width - this.paint_board.width)/2;
        // this.y1 = (this.paint_board.board.height - this.paint_board.height)/2;
        // this.ctx.fillStyle = "#FF0000";
        // this.ctx.fillRect(0, 0, this.paint_board.width, this.paint_board.height);
        this.$canvas.hide();
        this.paint_board.$paint.append(this.$canvas);




        // this.start();
    }

    start() {
        var canvas;
        var context;
        var tool;
        let outer = this;
        //let canvas = this.$canvas;
        /** * called on window load. */
        if (window.addEventListener) { window.addEventListener('load', init(), false); }
        /** * init. */ function init() {
            /** * find the canvas element. */
            canvas = document.getElementById('imageView');
            console.log("init");
            // if (!canvas) { return; } if (!canvas.getContext) { return; }
            /** * get the 2D canvas context. */
            
            if (!canvas) { return; } 
            // if (!canvas.getContext) { return; }
            /** * get the 2D canvas context. */
            
            context = canvas.getContext('2d'); if (!context) { return; }
            context.canvas.width = outer.paint_board.width;
            context.canvas.height = outer.paint_board.height;
            /** * pencil tool instance. */
            console.log("ini");
            tool = new tool_pencil();
            
            /** * attach the mousedown, mousemove and mouseup event listeners. */
            canvas.addEventListener('mousedown', ev_canvas, false); 
            canvas.addEventListener('mousemove', ev_canvas, false); 
            canvas.addEventListener('mouseup', ev_canvas, false);
        }
        /** * This painting tool * works like a drawing pencil * which tracks the mouse movements. * * @returns {tool_pencil} */
        function tool_pencil() {
            var tool = this; this.started = false; /** * This is called when you start holding down the mouse button. * This starts the pencil drawing. */
            this.mousedown = function (ev) {
                /** * when you click on the canvas and drag your mouse * the cursor will changes to a text-selection cursor * the "ev.preventDefault()" can prevent this. */
                ev.preventDefault(); context.beginPath(); context.moveTo(ev._x, ev._y);
                tool.started = true;
            };
            /** * This is called every time you move the mouse. * Obviously, it only draws if the tool.started state is set to true */
            this.mousemove = function (ev) {
                if (tool.started) {
                    context.lineTo(ev._x, ev._y); context.stroke();
                }
            };
            /** * This is called when you release the mouse button. */
            this.mouseup = function (ev) {
                if (tool.started) {
                    tool.mousemove(ev);
                    tool.started = false;
                }
            };
        }
        /** * general-purpose event handler. * determines the mouse position relative to the canvas element. * * @param ev */
        function ev_canvas(ev) {
            var x, y;
            if (ev.offsetX || ev.offsetY == 0) {
                ev._x = ev.offsetX; ev._y = ev.offsetY;
            }
            /** * call the event handler of the tool. */
            var func = tool[ev.type];
            if (func) {
                func(ev);
            }
        }
    }

    update() {

    }

}class PaintBoard {
    constructor(board) {
        this.board = board;
        this.$paint = $(`
<div class="board_paint" style="transform: translate(-50%, -50%);position: absolute;left: 50%;top: 50%;width: 80%;height: 80%;background-color: #FFFFFF;"></div>        
`);
        this.$paint.hide();
        this.board.$board.append(this.$paint);
        this.width = this.$paint.width();
        this.height = this.$paint.height();
        this.board_canvas = new BoardCanvas(this);

    }

    start() {}

    update() {}
}class MultiUserSocket {
    constructor(board) {
        this.board = board;
        this.roomid = this.board.roomid;
        this.mode = this.board.mode;
        console.log(this.roomid);
        console.log(this.mode);
        this.ws = new WebSocket('ws://'+window.location.host+'/ws/'+this.mode+'/'+this.roomid+'/');

        this.start();
    }

    start() {
        
    }
}class Board {
    constructor(root) {
        this.root = root;
        this.roomid = 0;
        this.mode = "";
        this.$board = $(`
<div id="board" style="width: 100%;height: 100%;background-color: #efefef;"></div>
`);
        

        this.$board.hide();
        this.root.$cooperation_board.append(this.$board);
        this.height = this.$board.height();
        this.width = this.$board.width();
        this.paint_board = new PaintBoard(this);
        this.start();
    }

    start() {

    }
    

    show(roomid,mode) {
        this.roomid = roomid;
        this.mode = mode;
        this.$board.show();
        this.mps = new MultiUserSocket(this);
    }

    hide() {
        this.$board_painter.hide();
    }
}class Home {
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
export class WeGame {
    constructor(id) {
        this.id = id;
        this.$cooperation_board = $('#' + id);
        this.home = new Home(this);
        this.board = new Board(this);
        
        this.start();
    }

    start() {

    }
}
