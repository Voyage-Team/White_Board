class PaintBoard {
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
}