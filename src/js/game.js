import Ania from './ania';
import Potato from './potato';

class Game {
    constructor() {
        this.board = document.querySelectorAll('#board div');
        this.ania = new Ania(0, 0, 'right');
        this.potato = new Potato();
        this.score = 0;
        this.level = 'VERY EASY';
        this.idSetInterval = setInterval(() => {
            this.moveAnia();
        }, 500);
        this.scoreText = document.querySelector('#score strong');
        this.levelText = document.querySelector('#level strong');
        this.levelText.innerText = this.level;
    };

    index(x, y) {
        return x + (y * 10);
    };

    showAnia() {
        this.board[this.index(this.ania.x, this.ania.y)].classList.add('ania');
    };

    hideVisibleAnia() {
        document.querySelector('.ania').classList.remove('ania');
    };

    showPotato() {

        this.board[this.index(this.potato.x, this.potato.y)].classList.add('potato');
    };

    changeLevel () {
        if (this.score >= 5 && this.score <10) {
            clearInterval(this.idSetInterval);
            this.level = 'EASY';
            this.levelText.innerText = this.level;
            this.idSetInterval = setInterval(() => {
                this.moveAnia();
            }, 250);
        }
        else if (this.score >= 10 && this.score < 15) {
            clearInterval(this.idSetInterval);
            this.level = 'MEDIUM';
            this.levelText.innerText = this.level;
            this.idSetInterval = setInterval(() => {
                this.moveAnia();
            }, 125);
        }
        else if (this.score >= 15 && this.score < 20) {
            clearInterval(this.idSetInterval);
            this.level = 'HARD';
            this.levelText.innerText = this.level;
            this.idSetInterval = setInterval(() => {
                this.moveAnia();
            }, 100);
        }
        else if (this.score >= 20 && this.score < 25) {
            clearInterval(this.idSetInterval);
            this.level = 'EXPERT';
            this.levelText.innerText = this.level;
            this.idSetInterval = setInterval(() => {
                this.moveAnia();
            }, 75);
        }
    }

    checkPotatoCollision() {

        if (this.ania.x === this.potato.x && this.ania.y === this.potato.y) {
            this.board[this.index(this.potato.x, this.potato.y)].classList.remove('potato');
            this.score += 1;
            this.scoreText.innerText = this.score;
            this.changeLevel();
            this.potato = new Potato();
            this.showPotato();
        };
    };

    moveAnia() {

        this.hideVisibleAnia();
        if (this.ania.direction === 'right') {
            this.ania.x = this.ania.x + 1;
        } else if (this.ania.direction === 'left') {
            this.ania.x = this.ania.x - 1;
        } else if (this.ania.direction === 'up') {
            this.ania.y = this.ania.y - 1;
        } else if (this.ania.direction === 'down') {
            this.ania.y = this.ania.y + 1;
        };
        this.gameOver();
        this.showAnia();
        this.checkPotatoCollision();
    };

    turnAnia(event) {
        switch (event.which) {
            case 37:
                this.ania.direction = 'left';
                break;
            case 38:
                this.ania.direction = 'up';
                break;
            case 39:
                this.ania.direction = 'right';
                break;
            case 40:
                this.ania.direction = 'down';
                break;
        };
    };

    startGame() {
        return this.idSetInterval;
    };

    gameOver() {
        if (this.ania.x > 9 || this.ania.x < 0 || this.ania.y > 9 || this.ania.y < 0) {
            clearInterval(this.idSetInterval);
            alert('Game over! You scored ' + this.score + ' points.');
            this.hideVisibleAnia();
        };
    };
};

export default Game;