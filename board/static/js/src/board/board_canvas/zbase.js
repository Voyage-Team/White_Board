class BoardCanvas extends BoardObject {
    constructor(paint_board) {
        super();
        this.paint_board = paint_board;
        this.$canvas = $(`<canvas id="imageView"></canvas>`);
        // this.ctx = this.$canvas[0].getContext('2d');
        // this.ctx.canvas.width = this.paint_board.width;
        // this.ctx.canvas.height = this.paint_board.height;
        // this.x1 = (this.paint_board.board.width - this.paint_board.width)/2;
        // this.y1 = (this.paint_board.board.height - this.paint_board.height)/2;
        // this.ctx.fillStyle = "#FF0000";
        // this.ctx.fillRect(0, 0, this.paint_board.width, this.paint_board.height);
        this.$canvas.hide();
        this.paint_board.$paint.append(this.$canvas);




        // this.start();
    }

    start() {
        var canvas;
        var context;
        var tool;
        let outer = this;
        //let canvas = this.$canvas;
        /** * called on window load. */
        if (window.addEventListener) { window.addEventListener('load', init(), false); }
        /** * init. */ function init() {
            /** * find the canvas element. */
            canvas = document.getElementById('imageView');
            console.log("init");
            // if (!canvas) { return; } if (!canvas.getContext) { return; }
            /** * get the 2D canvas context. */
            
            if (!canvas) { return; } 
            // if (!canvas.getContext) { return; }
            /** * get the 2D canvas context. */
            
            context = canvas.getContext('2d'); if (!context) { return; }
            context.canvas.width = outer.paint_board.width;
            context.canvas.height = outer.paint_board.height;
            /** * pencil tool instance. */
            console.log("ini");
            tool = new tool_pencil();
            
            /** * attach the mousedown, mousemove and mouseup event listeners. */
            canvas.addEventListener('mousedown', ev_canvas, false); 
            canvas.addEventListener('mousemove', ev_canvas, false); 
            canvas.addEventListener('mouseup', ev_canvas, false);
        }
        /** * This painting tool * works like a drawing pencil * which tracks the mouse movements. * * @returns {tool_pencil} */
        function tool_pencil() {
            var tool = this; this.started = false; /** * This is called when you start holding down the mouse button. * This starts the pencil drawing. */
            this.mousedown = function (ev) {
                /** * when you click on the canvas and drag your mouse * the cursor will changes to a text-selection cursor * the "ev.preventDefault()" can prevent this. */
                ev.preventDefault(); context.beginPath(); context.moveTo(ev._x, ev._y);
                tool.started = true;
            };
            /** * This is called every time you move the mouse. * Obviously, it only draws if the tool.started state is set to true */
            this.mousemove = function (ev) {
                if (tool.started) {
                    context.lineTo(ev._x, ev._y); context.stroke();
                }
            };
            /** * This is called when you release the mouse button. */
            this.mouseup = function (ev) {
                if (tool.started) {
                    tool.mousemove(ev);
                    tool.started = false;
                }
            };
        }
        /** * general-purpose event handler. * determines the mouse position relative to the canvas element. * * @param ev */
        function ev_canvas(ev) {
            var x, y;
            if (ev.offsetX || ev.offsetY == 0) {
                ev._x = ev.offsetX; ev._y = ev.offsetY;
            }
            /** * call the event handler of the tool. */
            var func = tool[ev.type];
            if (func) {
                func(ev);
            }
        }
    }

    update() {

    }

}