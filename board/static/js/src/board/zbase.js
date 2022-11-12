class Board {
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
}