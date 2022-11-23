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
}class BoardOperation {
    constructor(board) {
        this.board = board;
        this.$boardoperation = $(`
<!-- 白板操作 -->
<div class="boardoperation">
    <!-- 白板分页 -->
    <div class="repeal">
        <div class="board_operate">
            <!-- 添加白板 -->
            <div class="repeal_options">
                <div class="tip" id="tip_add_board">添加白板</div>
                <i class="board_operate_add_board" id="board_operate_add_board"></i>
            </div>
            <!-- 删除白板 -->
            <div class="repeal_options">
                <div class="tip" id="tip_delete_board">删除白板</div>
                <i class="board_operate_delete_board" id="board_operate_delete_board"></i>
            </div>
        </div>
    </div>
</div>        
`);
        
        this.$operation = this.$boardoperation.find(".boardoperation");
        this.$add_board = this.$boardoperation.find(".board_operate_add_board");
        this.$delete_board = this.$boardoperation.find(".board_operate_delete_board");
        this.board.$board.append(this.$boardoperation);

        this.start();
    }

    start() {
        this.listening_events();
    }

    listening_events() {
        let add_board_tip = document.getElementById('tip_add_board');
        let delete_board_tip = document.getElementById('tip_delete_board');
        let add_board = document.getElementById('board_operate_add_board');
        let delete_board = document.getElementById('board_operate_delete_board');
        let outer = this;
        this.$add_board.click(function() { // 点击添加白板按钮
            // 隐藏当前白板
            outer.board.paint_board.current_canvas.$canvas.hide();
            // 添加一页白板
            outer.board.paint_board.create_canvas();
        });

        this.$delete_board.click(function() { // 点击删除当前白板按钮
            // 删除当前白板
                // (1) 隐藏当前canvas
            // outer.board.paint_board.current_canvas.$canvas.hide();
                // (2) 将当前白板从列表中删除
                    // 显示当前白板在列表中的上一页白板 (无法删除第一页白板)
                    // 将显示出来的白板设为当前白板
            outer.board.paint_board.delete_curCanvas();
            console.log("删除当前白板");
                    
        });

        add_board.onmouseover = function() {
            add_board_tip.style.opacity = 1;
        }
    
        add_board.onmouseout = function() {
            add_board_tip.style.opacity = 0;
        }

        delete_board.onmouseover = function() {
            delete_board_tip.style.opacity = 1;
        }

        delete_board.onmouseout = function() {
            delete_board_tip.style.opacity = 0;
        }
    }
}class BoardCanvas extends BoardObject {
    constructor(paint_board) {
        super();
        this.paint_board = paint_board;
        this.$canvas = $(`<canvas id="imageView"></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.paint_board.width;
        this.ctx.canvas.height = this.paint_board.height;
        // this.$canvas.hide();
        this.paint_board.$paint.append(this.$canvas);
        this.paint_board.$paint.append(this.$click);

        this.mps = this.paint_board.board.mps;
        this.shapeList = new Array(); // list 数组，存放所有矢量图
        this.newstartX = 0;
        this.newstartY = 0; // 画pencil用
        this.points = new Array(); // 画pencil用的数组
        this.beginPoint = null;
        this.start();
    }

    start() {
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
                
                // console.log(outer.startX, outer.startY);
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
                            // 发给远端服务器
                            outer.mps.send_paint_bezier_curve(outer.paint_board.mode, outer.beginPoint, controlPoint, endPoint);
                            outer.beginPoint = endPoint;
                        }
                        break;
                }
                outer.savePoint(outer.startX, outer.startY, curPos.x, curPos.y);
            }
        });
        this.$canvas.mouseup(function(e) {
            if(outer.started) {
                outer.started = false;
                var curPos = outer.getCursorPos(outer.ctx.canvas, e);
                if(outer.paint_board.mode != "" && outer.paint_board.mode != "pen") {
                    outer.addShape(outer.startX, outer.startY, curPos.x, curPos.y);
                    // 向服务器发送矢量图
                    outer.mps.send_paint_regular_graphics(outer.paint_board.mode, outer.startX, outer.startY, curPos.x, curPos.y);
                }
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

    addRemoteShape(mode, startX, startY, endX, endY) { // 松开鼠标时，添加远端规则图形进数组
        var shape = new Object();
        shape.type = mode;
        shape.startX = startX;
        shape.startY = startY;
        shape.endX = endX;
        shape.endY = endY;
        this.shapeList.push(shape);
    }

    saveBezierCurve(beginPoint, controlPoint, endPoint) { // 存贝塞尔曲线
        var shape = new Object();
        shape.type = "pen";
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
<div class="board_paint" style="position: absolute;left: 6%;width: 88%;height: 100%;background-color: #FFFFFF;"></div>        
`);
        this.$board_paint = this.$paint.find(".board_paint");
        this.board.$board.append(this.$paint);
        this.width = this.$paint.width(); // 为canvas画布获取宽度
        this.height = this.$paint.height(); // 为canvas画布获取高度
        this.default_canvas = new BoardCanvas(this); // 默认创建一个canvas画布
        this.push_canvas(this.default_canvas);
        this.current_canvas = this.default_canvas;
        this.mode = ""; // 默认画笔是pen
        this.start();
    }

    start() {
        //this.current_canvas.$canvas.hide();
        this.add_listening_events();
    }

    add_listening_events() {
    }

    create_canvas() { // 创建新的canvas画布
        this.newCanvas = new BoardCanvas(this); 
        this.push_canvas(this.newCanvas);
        this.current_canvas = this.newCanvas; // 将新添白板设为当前白板
    }

    push_canvas(canvas) {
        var obj = new Object();
        obj.canvas = canvas;
        this.board.canvas_array.push(obj);
    }

    delete_curCanvas() {
        var i;
        for (i in this.board.canvas_array) {
            var obj = this.board.canvas_array[i];
            if (obj.canvas === this.current_canvas) break;
        }
        console.log(i);
        if (i == 0) { // == 相等运算符
            console.log("弹窗警告");
            alert("当前已经是画布的第一页");
        } else {
            this.current_canvas.$canvas.hide();
            this.board.canvas_array.splice(i,1); // 从数组中删除当前canvas画布
            this.board.canvas_array[i-1].canvas.$canvas.show();
            this.current_canvas = this.board.canvas_array[i-1].canvas;
        }
        
    }

    update() {}

    show() {
        this.$paint.show();
    }
}class SideBar {
    constructor(board) {
        this.board = board;
        this.$sidebar = $(`
<!-- 侧边栏 -->
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
            outer.$toolbar_line.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/select_line.png' + ")");
            outer.$toolbar_rectangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Rectangle.png' + ")");
            outer.$toolbar_oval.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Oval.png' + ")");
            outer.$toolbar_triangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Triangle.png' + ")");
            outer.$toolbar_pen.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/pen.png' + ")");
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "line";
        });
        this.$toolbar_rectangle.click(function () {
            outer.$toolbar_rectangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/select_Rectangle.png' + ")");
            outer.$toolbar_line.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/line.png' + ")");
            outer.$toolbar_oval.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Oval.png' + ")");
            outer.$toolbar_triangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Triangle.png' + ")");
            outer.$toolbar_pen.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/pen.png' + ")");
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "rectangle";
        });
        this.$toolbar_oval.click(function () {
            outer.$toolbar_oval.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/select_Oval.png' + ")");
            outer.$toolbar_line.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/line.png' + ")");
            outer.$toolbar_rectangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Rectangle.png' + ")");
            outer.$toolbar_triangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Triangle.png' + ")");
            outer.$toolbar_pen.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/pen.png' + ")");
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "oval";
        });
        this.$toolbar_triangle.click(function () {
            outer.$toolbar_triangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/select_Triangle.png' + ")");
            outer.$toolbar_line.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/line.png' + ")");
            outer.$toolbar_rectangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Rectangle.png' + ")");
            outer.$toolbar_oval.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Oval.png' + ")");
            outer.$toolbar_pen.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/pen.png' + ")");
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "triangle";
        });
        this.$toolbar_pen.click(function () {
            outer.$toolbar_pen.css("background-i mage", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/select_pen.png' + ")");
            outer.$toolbar_line.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/line.png' + ")");
            outer.$toolbar_rectangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Rectangle.png' + ")");
            outer.$toolbar_oval.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Oval.png' + ")");
            outer.$toolbar_triangle.css("background-image", "url(" + 'http://139.9.62.204:8001/static/image/sidebar/Triangle.png' + ")");
            outer.modify_cursor_style_pen();
            outer.board.paint_board.mode = "pen";
        });
    }

    modify_cursor_style_crosshair() {  // 修改鼠标样式为十字准心crosshair
        this.cursor.style.cursor = "crosshair";
    }

    modify_cursor_style_pen() { // 修改鼠标样式为笔
        this.cursor.style.cursor = 'url(http://139.9.62.204:8001/static/image/sidebar/pen.ico)8 20,pointer';
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
        this.receive();
    }

    receive() {
        let outer = this;
        this.ws.onmessage = function(e) {
            let data = JSON.parse(e.data);
            let event = data.event;

            if (event === "regular_graphics") {
                outer.receive_paint_regular_graphics(data.style, data.startX, data.startY, data.endX, data.endY);
            } else if (event === "bezier_curve") {
                outer.receive_paint_bezier_curve(data.style, data.start, data.control, data.end)
            }
        }
    }

    send_paint_bezier_curve (type, start, control, end) {
        this.ws.send(JSON.stringify({
            'event':"bezier_curve", 
            'style':type,
            'start':start,
            'control':control,
            'end':end,
        }));
    }

    send_paint_regular_graphics(type, startX, startY, endX, endY) {
        console.log(type);
        let outer = this;
        this.ws.send(JSON.stringify({
            'event':"regular_graphics", 
            'style':type,
            'startX':startX,
            'startY':startY,
            'endX':endX,
            'endY':endY,
        }));
    }

    receive_paint_regular_graphics(style, startX, startY, endX, endY) {
        console.log("接受规则图形");
        if(style === "line")
            this.board.paint_board.current_canvas.addLine(this.board.paint_board.current_canvas.ctx, startX, startY, endX, endY);
        else if (style === "rectangle") 
            this.board.paint_board.current_canvas.addrectangle(this.board.paint_board.current_canvas.ctx, startX, startY, endX, endY);
        else if (style === "oval")
            this.board.paint_board.current_canvas.addoval(this.board.paint_board.current_canvas.ctx, startX, startY, endX, endY);
        else if (style === "triangle")
            this.board.paint_board.current_canvas.addtriangle(this.board.paint_board.current_canvas.ctx, startX, startY, endX, endY);
        // 存到本地数组中
        this.board.paint_board.current_canvas.addRemoteShape(style, startX, startY, endX, endY);
    }

    receive_paint_bezier_curve(style, start, control, end) {
        this.board.paint_board.current_canvas.addBezierCurve(this.board.paint_board.current_canvas.ctx,start,control,end);
        // 存到本地数组中
        this.board.paint_board.current_canvas.saveBezierCurve(start, control, end);
    }  

}class UserBehavior {
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
}class Board {
    constructor(root) {
        this.root = root;
        this.roomid = 0;
        this.mode = "";
        this.$board = $(`
<div class="board" id="board" style="width: 100%;height: 100%;background-color: #efefef;"></div>
`);
        this.$board.hide();
        this.$global_board = this.$board.find(".board");
        this.root.$cooperation_board.append(this.$board);
        this.canvas_array = new Array(); // 创建canvas画布数组
        this.start();
    }

    start() {
        // this.show(1, "none");
        this.listening_events();
    }
    

    show(roomid,mode) {
        this.roomid = roomid;
        this.mode = mode;
        this.$board.show();
        this.mps = new MultiUserSocket(this);
        this.paint_board = new PaintBoard(this);
        this.board_operation = new BoardOperation(this);
        this.sidebar = new SideBar(this);
        this.userbehavior = new UserBehavior(this);
    }

    listening_events() {
        let outer = this;
        this.$board.click(function() {
            outer.userbehavior.$invite_copy.hide();
        });
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
                url:"http://139.9.62.204:8001/redis/create/",
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
                url:"http://139.9.62.204:8001/redis/query/",
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
