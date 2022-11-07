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
        
    }
}