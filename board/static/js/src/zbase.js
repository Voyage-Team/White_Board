export class WeGame {
    constructor(id) {
        this.id = id;
        this.$cooperation_board = $('#' + id);
        // this.home = new Home(this);
        this.board = new Board(this);
        
        this.start();
    }

    start() {

    }
}
