class PaintBoard {
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
}