class BoardCanvas extends BoardObject {
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

}