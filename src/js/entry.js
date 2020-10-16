import '../css/style.css';
import Game from './game.js';
document.addEventListener('DOMContentLoaded', function () {


    let game = new Game();
    game.showAnia();
    game.showPotato();
    game.startGame();
    document.addEventListener('keydown', (e) => game.turnAnia(e));
});
