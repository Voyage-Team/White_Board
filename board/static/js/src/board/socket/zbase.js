class MultiUserSocket {
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

}