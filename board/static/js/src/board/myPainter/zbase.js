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
        this.mode = ""; // 默认画笔是pen
        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
    }

    update() {}

    show() {
        this.$paint.show();
    }
}