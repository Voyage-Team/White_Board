class SideBar {
    constructor(board) {
        this.board = board;
        this.$sidebar = $(`
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
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "line";
        });
        this.$toolbar_rectangle.click(function() {
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "rectangle";
        });
        this.$toolbar_oval.click(function() {
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "oval";
        });
        this.$toolbar_triangle.click(function() {
            outer.modify_cursor_style_crosshair();
            outer.board.paint_board.mode = "triangle";
        });
        this.$toolbar_pen.click(function() {
            outer.modify_cursor_style_pen();
            outer.board.paint_board.mode = "pen";
        });
    }
    
    modify_cursor_style_crosshair() {  // 修改鼠标样式为十字准心crosshair
        this.cursor.style.cursor = "crosshair";
    }

    modify_cursor_style_pen() { // 修改鼠标样式为笔
        this.cursor.style.cursor = 'url(http://123.57.187.239:8000/static/image/sidebar/pen.ico)8 20,pointer';
    }
}