class PaintBoard {
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
}