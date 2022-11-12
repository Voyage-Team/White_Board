class BoardOperation {
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
        this.$add_board = this.$operation.find(".board_operate_add_board");
        this.$delete_board = this.$operation.find(".board_operate_delete_board");
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

            // 添加一页白板

            // 将新添白板设为当前白板
        });

        this.$delete_board.click(function() {

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
}