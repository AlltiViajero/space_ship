import { Spaceship } from "./Spaceship.js";
class Game{
    #HTML_ELEMENTS = {
        spaceship: document.querySelector('[data-spaceship]'),
        contener: document.querySelector('[data-contener]')
    }
    #ship = new Spaceship(this.#HTML_ELEMENTS.spaceship, this.#HTML_ELEMENTS.contener);
    #checkPositionInterval = null;
    init(){
        this.#ship.init();
        this.#newGame();
    }
    #newGame(){
        this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
    };
    #checkPosition(){
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