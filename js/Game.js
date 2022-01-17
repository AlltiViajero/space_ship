import { Spaceship } from "./Spaceship.js";
import { Enemy } from "./Enemy.js";
class Game{
    #HTML_ELEMENTS = {
        spaceship: document.querySelector('[data-spaceship]'),
        contener: document.querySelector('[data-contener]'),
        lives: document.querySelector('[data-lives]'),
        score: document.querySelector('[data-score]'),
    }
    #ship = new Spaceship(this.#HTML_ELEMENTS.spaceship, this.#HTML_ELEMENTS.contener);
    #checkPositionInterval = null;
    #createEnemyInterval = null;
    #enemies = [];
    #lives = null;
    #score = null;
    #enemiesInterval = null;
    init(){
        this.#ship.init();
        this.#newGame();
    }
    #newGame(){
        this.#enemiesInterval = 30;
        this.#lives = 3;
        this.#score = 0;
        this.#createEnemyInterval = setInterval(() => this.#randomNewEnemy(), 1000);
        this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
    };
//metoda losująca jaki wróg ma zostać wygenerowany
    #randomNewEnemy(){
      const randomNumber = Math.floor(Math.random() * 5) +1;
      randomNumber % 5 ? 
        this.#createNewEnemy(this.#HTML_ELEMENTS.contener, this.#enemiesInterval, 'enemy', 'explosion') : 
        this.#createNewEnemy(this.#HTML_ELEMENTS.contener, this.#enemiesInterval * 2, 'enemy--big', 'explosion--big', 3)
    }
//metoda tworząca obiekty wrogów
    #createNewEnemy(...params){
        const enemy = new Enemy(...params);
        enemy.init();
        this.#enemies.push(enemy);
    }
//sprawdzanie pozycji wroga i naboju statku
    #checkPosition(){
        this.#enemies.forEach((enemy, enemyIndex, enemiesArray) => {
            const enemyPosition = {
                top: enemy.element.offsetTop,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
            }
            if (enemyPosition.top > window.innerHeight) {
                enemy.explode();
                enemiesArray.splice(enemyIndex, 1);
                this.#updateLives();
            };
            this.#ship.missiles.forEach((missile, missileIndex, missileArray) => {
                const missilePosition = {
                    top: missile.element.offsetTop,
                    right: enemy.element.offsetLeft + enemy.element.offsetWidth,
                    bottom: missile.element.offsetTop + missile.element.offsetHeight,
                    left: missile.element.offsetLeft,
                }
                if (
                    missilePosition.bottom >= enemyPosition.top && 
                    missilePosition.top <= enemyPosition.bottom &&
                    missilePosition.right >= enemyPosition.left && 
                    missilePosition.left <= enemyPosition.right
                    ){
                        enemy.hit();
                        if (!enemy.lives){
                            enemiesArray.splice(enemyIndex, 1);
                        }
                        missile.remove();
                        missileArray.splice(missileIndex, 1);
                        this.#updateScore();
                    };
                    
                if (missilePosition.bottom < 0) {
                    missile.remove();
                    missileArray.splice(missileIndex, 1);
                };
            });
        });
    };
    #updateScore(){
        this.#score++;
        if (!(this.#score % 5)){
            this.#enemiesInterval--;
        }
        this.#updateScoreText();
    }
    #updateLives(){
        this.#lives--;
        this.#updateLivesText();
        this.#HTML_ELEMENTS.contener.classList.add('hit');
        setTimeout( () => this.#HTML_ELEMENTS.contener.classList.remove('hit'), 100)
    }
    #updateScoreText(){
        this.#HTML_ELEMENTS.score.textContent = `Score: ${this.#score}`
    }
    #updateLivesText(){
        this.#HTML_ELEMENTS.lives.textContent = `Lives: ${this.#lives}`
    }
}
window.onload = function(){
    const game = new Game();
    game.init();
}