import { Spaceship } from "./Spaceship.js";
class Game{
    #HTML_ELEMENTS = {
        spaceship: document.querySelector('[data-spaceship]')
    }
    #ship = new Spaceship(this.#HTML_ELEMENTS.spaceship);
    init(){
        this.#ship.init();
    }
}
window.onload = function(){
    const game = new Game();
    game.init();
}