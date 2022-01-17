import { Spaceship } from "./Spaceship.js";
import { Enemy } from "./Enemy.js";
class Game{
    #HTML_ELEMENTS = {
        spaceship: document.querySelector('[data-spaceship]'),
        contener: document.querySelector('[data-contener]')
    }
    #ship = new Spaceship(this.#HTML_ELEMENTS.spaceship, this.#HTML_ELEMENTS.contener);
    #checkPositionInterval = null;
    #createEnemyInterval = null;
    #enemies = [];
    #enemiesInterval = null;
    init(){
        this.#ship.init();
        this.#newGame();
    }
    #newGame(){
        this.#enemiesInterval = 30;
        this.#createEnemyInterval = setInterval(() => this.#randomNewEnemy(), 1000);
        this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
    };
//metoda losująca jaki wróg ma zostać wygenerowany
    #randomNewEnemy(){
      const randomNumber = Math.floor(Math.random() * 5) +1;
      randomNumber % 5 ? 
        this.#createNewEnemy(this.#HTML_ELEMENTS.contener, this.#enemiesInterval, 'enemy') : 
        this.#createNewEnemy(this.#HTML_ELEMENTS.contener, this.#enemiesInterval * 2, 'enemy--big', 3)
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
                right: enemy.element.Left + enemy.element.offsetWidth,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
            }
            if (enemyPosition.top > window.innerHeight) {
                enemy.remove();
                enemiesArray.splice(enemyIndex, 1)
            };
        });
        this.#ship.missiles.forEach((missile, missileIndex, missileArray) => {
            const missilePosition = {
                top: missile.element.offsetTop,
                right: missile.element.Left + missile.element.offsetWidth,
                bottom: missile.element.offsetTop + missile.element.offsetHeight,
                left: missile.element.offsetLeft,
            }
            if (missilePosition.bottom < 0) {
                missile.remove();
                missileArray.splice(missileIndex, 1)
            };
        });
    };
}
window.onload = function(){
    const game = new Game();
    game.init();
}