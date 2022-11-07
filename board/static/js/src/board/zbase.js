class Board {
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
}