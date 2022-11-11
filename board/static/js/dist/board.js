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
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.paint_board.width;
        this.ctx.canvas.height = this.paint_board.height;
        // this.x1 = (this.paint_board.board.width - this.paint_board.width)/2;
        // this.y1 = (this.paint_board.board.height - this.paint_board.height)/2;
        //this.ctx.fillStyle = "white";
        //this.ctx.fillRect(0, 0, this.paint_board.width, this.paint_board.height);
        // this.$canvas.hide();
        this.paint_board.$paint.append(this.$canvas);


        this.shapeList = new Array(); // list 数组，存放所有矢量图
        this.newstartX = 0;
        this.newstartY = 0; // 画pencil用
        this.points = new Array(); // 画pencil用的数组
        this.beginPoint = null;
        this.test();
    }

    test() {
        let outer = this;
        this.started = false;
        this.startX = 0;
        this.startY = 0;
        this.$canvas.mousedown(function(e) {
            if(e.which === 1) { // 左键单击事件
                e.preventDefault(); // 当您单击画布并拖动鼠标时，光标将变为文本选择光标，“ev.preventDefault()”可以防止这种情况发生。
                // outer.ctx.beginPath(); // 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。每次这个方法调用之后，列表清空重置
                var curPos = outer.getCursorPos(outer.ctx.canvas, e);
                outer.startX = curPos.x;
                outer.startY = curPos.y;
                outer.newstartX = curPos.x;
                outer.newstartY = curPos.y;
                const x = curPos.x;
                const y = curPos.y;
                outer.points.push({x, y});
                outer.beginPoint = {x, y};
                // outer.ctx.moveTo(outer.startX, outer.startY); // 调用 beginPath() 之后，或者 canvas 刚建的时候，第一条路径构造命令通常被视为是 moveTo（）
                
                console.log(outer.startX, outer.startY);
                outer.started = true;
            }
        });
        this.$canvas.mousemove(function(e) {
            if(outer.started) {
                var curPos = outer.getCursorPos(outer.ctx.canvas, e);
                const x = curPos.x;
                const y = curPos.y;
                // outer.clearCanvas(outer.ctx, outer.ctx.canvas);
                // outer.reviewAll(outer.ctx);
                switch(outer.paint_board.mode) {
                    case "line":
                        outer.clearCanvas(outer.ctx, outer.ctx.canvas);
                        outer.reviewAll(outer.ctx);
                        outer.addLine(outer.ctx, outer.startX, outer.startY, curPos.x, curPos.y);
                        break;
                    case "rectangle":
                        outer.clearCanvas(outer.ctx, outer.ctx.canvas);
                        outer.reviewAll(outer.ctx);
                        outer.addrectangle(outer.ctx, outer.startX, outer.startY, curPos.x, curPos.y);
                        break;
                    case "oval":
                        outer.clearCanvas(outer.ctx, outer.ctx.canvas);
                        outer.reviewAll(outer.ctx);
                        outer.addoval(outer.ctx, outer.startX, outer.startY, curPos.x, curPos.y);
                        break;
                    case "triangle":
                        outer.clearCanvas(outer.ctx, outer.ctx.canvas);
                        outer.reviewAll(outer.ctx);
                        outer.addtriangle(outer.ctx, outer.startX, outer.startY, curPos.x, curPos.y);
                        break;
                    case "pen":
                        outer.points.push({x, y});
                        if(outer.points.length > 3) {
                            const lastTwoPoints = outer.points.slice(-2);
                            const controlPoint = lastTwoPoints[0]; // 控制点
                            const endPoint = {
                                x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                                y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
                            }
                            outer.addBezierCurve(outer.ctx, outer.beginPoint, controlPoint, endPoint);
                            outer.saveBezierCurve(outer.beginPoint, controlPoint, endPoint);
                            outer.beginPoint = endPoint;
                        }
                        // outer.addpen(outer.ctx, outer.newstartX, outer.newstartY, curPos.x, curPos.y);
                        // outer.addShape(outer.newstartX+0.06, outer.newstartY+0.06, curPos.x, curPos.y);
                        // console.log("起点：", outer.newstartX, outer.newstartY);
                        // console.log("终点：", curPos.x, curPos.y);
                        break;
                }
                outer.savePoint(outer.startX, outer.startY, curPos.x, curPos.y);
            }
        });
        this.$canvas.mouseup(function(e) {
            if(outer.started) {
                outer.started = false;
                var curPos = outer.getCursorPos(outer.ctx.canvas, e);
                if(outer.paint_board.mode != "" && outer.paint_board.mode != "pen") outer.addShape(outer.startX, outer.startY, curPos.x, curPos.y);
            }
        });
    }

    addBezierCurve(ctx, beginPoint, controlPoint, endPoint) { // 画贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(beginPoint.x, beginPoint.y);
        ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
        ctx.stroke();
        ctx.closePath();
    }

    savePoint(startX, startY, endX, endY) {

    }

    getCursorPos(canvas, e) { // 获取鼠标当前位置
        var rect = canvas.getBoundingClientRect();
        //console.log("计算坐标:", (e.clientX - rect.left) * (canvas.width / rect.width),(e.clientY - rect.top) * (canvas.height / rect.height));
        return {
            x : (e.clientX - rect.left) * (canvas.width / rect.width),
            y : (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    clearCanvas(ctx, canvas) { // 清空画布
        var rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
    }

    reviewAll(ctx) { // 重绘所有矢量图
        for (var x in this.shapeList) {
            var shape = this.shapeList[x];
            switch(shape.type) {
                case "line":
                    this.addLine(ctx, shape.startX, shape.startY, shape.endX, shape.endY);
                    break;
                case "rectangle":
                    this.addrectangle(ctx, shape.startX, shape.startY, shape.endX, shape.endY);
                    break;
                case "oval":
                    this.addoval(ctx, shape.startX, shape.startY, shape.endX, shape.endY);
                    break;
                case "triangle":
                    this.addtriangle(ctx, shape.startX, shape.startY, shape.endX, shape.endY);
                    break;
                case "pen":
                    this.addBezierCurve(ctx, shape.beginPoint, shape.controlPoint, shape.endPoint);
            }
        }
    }

    addShape(startX, startY, endX, endY) { // 松开鼠标时，添加规则图形进数组
        var shape = new Object();
        shape.type = this.paint_board.mode;
        shape.startX = startX;
        shape.startY = startY;
        shape.endX = endX;
        shape.endY = endY;
        this.shapeList.push(shape);
    }

    saveBezierCurve(beginPoint, controlPoint, endPoint) { // 存贝塞尔曲线
        var shape = new Object();
        shape.type = this.paint_board.mode;
        shape.beginPoint = beginPoint;
        shape.controlPoint = controlPoint;
        shape.endPoint = endPoint;
        this.shapeList.push(shape);
    }

    addLine(ctx, startX, startY, endX, endY) { // 画直线
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    addrectangle(ctx, startX, startY, endX, endY) { // 画矩形
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        // ctx.fillRect(startX, startY, endX-startX, endY-startY);
        ctx.strokeRect(startX, startY, endX-startX, endY-startY);
    }

    addoval(ctx, startX, startY, endX, endY) { // 画圆形
        var r = this.getDistance( startX, startY, endX, endY);
	    ctx.beginPath();
	    ctx.arc(startX,startY,r,0,2*Math.PI);
	    ctx.stroke();
    }

    getDistance( x1, y1, x2, y2) { // 求两点间距离
        var calX = x2-x1;
	    var calY = y2-y1;
	    return Math.pow((calX *calX + calY * calY), 0.5);
    }

    addtriangle(ctx, startX, startY, endX, endY) { // 画等腰三角形
        ctx.beginPath();
        var halfend = Math.abs(startX-endX); // 三角形的底的一半
        var high = Math.abs(startY-endY); // 三角形底边的高
        var tmpX;
        if(endX < startX) tmpX = startX + halfend;
        else tmpX = startX - halfend;
        var tmpY = endY;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(tmpX, tmpY);
        ctx.lineTo(startX, startY);
        ctx.stroke();
    }

    addBezierCurve(ctx, beginPoint, controlPoint, endPoint) { // 画贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(beginPoint.x, beginPoint.y);
        ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
        ctx.stroke();
        ctx.closePath();
    }

    update() {

    }

    show() {
        this.$canvas.show();
    }

}class PaintBoard {
    constructor(board) {
        this.board = board;
        this.$paint = $(`
<div class="board_paint" style="transform: translate(-50%, -50%);position: absolute;left: 50%;top: 50%;width: 80%;height: 80%;background-color: #FFFFFF;"></div>        
`);
        this.$board_paint = this.$paint.find(".board_paint");
        // this.$paint.hide();
        this.board.$board.append(this.$paint);
        this.width = this.$paint.width();
        this.height = this.$paint.height();
        console.log(this.width, this.height );
        this.board_canvas = new BoardCanvas(this);
        this.mode = ""; // 默认画笔是pen
        this.ctx = this.board_canvas.ctx;
        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        console.log("add_listening_events");
        this.board_canvas.$canvas.on("contextmenu", function() {
            console.log("return false");
            return false;
        });
        // this.board_canvas.$canvas.mousedown(function(e) {
        //     const rect = outer.ctx.canvas.getBoundingClientRect();
        //     if(e.which === 1) {
        //         // let tx = (e.clientX - rect.left)/outer.height;
        //         // let ty = (e.clientY - rect.top) /outer.height;
        //         // console.log(tx, ty);
        //         // if (outer.mode = "line") { // 画直线
        //         //     outer.paint_line(tx, ty);
        //         // }
        //         // 发送给服务器
        //     }

        // });
    }

    paint_line() { // 画直线

    }

    update() {}

    show() {
        this.$paint.show();
    }
}class SideBar {
    constructor(board) {
        this.board = board;
        this.$sidebar = $(`
<div class="sidebar">
    <div id="ToolBarWhiteBoard" class="toolbar">
        <div class="toolbar_tool">
            <div class="toolbar_tool_button">
                <i class = "toolbar_tool_button_icon_line"></i>
            </div>
        </div>
        <div class="toolbar_tool">
            <div class="toolbar_tool_button">
                <i class = "toolbar_tool_button_icon_rectangle"></i>
            </div>
        </div>
        <div class="toolbar_tool">
            <div class="toolbar_tool_button">
                <i class = "toolbar_tool_button_icon_oval"></i>
            </div>
        </div>
        <div class="toolbar_tool">
            <div class="toolbar_tool_button">
                <i class = "toolbar_tool_button_icon_triangle"></i>
            </div>
        </div>
        <div class="toolbar_tool">
            <div class="toolbar_tool_button">
                <i class = "toolbar_tool_button_icon_pen"></i>
            </div>
        </div>
    </div>
</div>
`);

        this.$toolbar = this.$sidebar.find(".toolbar");
        this.$toolbar_line = this.$toolbar.find(".toolbar_tool_button_icon_line");
        this.$toolbar_rectangle = this.$toolbar.find(".toolbar_tool_button_icon_rectangle");
        this.$toolbar_oval = this.$toolbar.find(".toolbar_tool_button_icon_oval");
        this.$toolbar_triangle = this.$toolbar.find(".toolbar_tool_button_icon_triangle");
        this.$toolbar_pen = this.$toolbar.find(".toolbar_tool_button_icon_pen");

        this.board.$board.append(this.$sidebar);
        this.cursor = document.querySelector(".board_paint");
        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$toolbar_line.click(function () {
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "line";
        });
        this.$toolbar_rectangle.click(function() {
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "rectangle";
        });
        this.$toolbar_oval.click(function() {
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "oval";
        });
        this.$toolbar_triangle.click(function() {
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "triangle";
        });
        this.$toolbar_pen.click(function() {
            outer.modify_cursor_style_pen();
            outer.board.paint_board.mode = "pen";
        });
    }
    
    modify_cursor_style_crosshair() {  // 修改鼠标样式为十字准心crosshair
        this.cursor.style.cursor = "crosshair";
    }

    modify_cursor_style_pen() { // 修改鼠标样式为笔
        this.cursor.style.cursor = 'url(http://123.57.187.239:8000/static/image/sidebar/pen.ico)8 20,pointer';
    }
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
        
        this.start();
    }

    start() {
        this.show(1, "none");
    }
    

    show(roomid,mode) {
        this.roomid = roomid;
        this.mode = mode;
        this.$board.show();
        // this.mps = new MultiUserSocket(this);
        this.paint_board = new PaintBoard(this);
        this.sidebar = new SideBar(this);
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
        // this.home = new Home(this);
        this.board = new Board(this);
        
        this.start();
    }

    start() {

    }
}
