import { Missile } from "./Missile.js";

export class Spaceship{
    missiles = []           //tablica z nabojami
    #modifier = 10;         //zmienna przechowująca o ile ma się przesówać px statek
    #leftArrow = false;     //zmienna sprawdzająca czy jest wciśnięta lewa strzałka
    #rightAttow = false;    //zmienna sprawdzająca czy jest wciśnięta prawa strzałka
    constructor(element, contener){   //konstruktor który przekazuje element z uchytem do html w Game
        this.element = element;
        this.contener = contener;
    }
    init(){
        this.setPosition();
        this.#eventListeners();
        this.#gameLoop();
    };
//ustawienie statku na środku ekrany
    setPosition(){
        this.element.style.bottom = '0px';
        this.element.style.left = `${window.innerWidth / 2 - this.#getPosition()}px`;
    };
//pobranie pozycji statku
    #getPosition(){
        return this.element.offsetLeft + this.element.offsetWidth / 2;
    };
//metoda nasłuchująca na wciśnięcie strzałek
    #eventListeners(){
        window.addEventListener('keydown', ({ keyCode }) => {
            switch(keyCode){
                case 37:
                    this.#leftArrow = true;
                break;
                case 39:
                    this.#rightAttow = true;
                break;
            };
        });
        window.addEventListener('keyup', ({ keyCode }) => {
            switch(keyCode){
                case 32:
                    this.#shot();
                break;
                case 37:
                    this.#leftArrow = false;
                break;
                case 39:
                    this.#rightAttow = false;
                break;
            };
        });
    };
//metoda pomocnicza która zapewnia większą płynność
    #gameLoop = () => {
        this.#whatKey();
        requestAnimationFrame(this.#gameLoop)
    };
//metoda co ma się zadziać przy naciśnięciu której strzałki
    #whatKey(){
        if (this.#leftArrow && this.#getPosition() > 12){
            this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`;
        }
        if (this.#rightAttow && this.#getPosition() + 12 < window.innerWidth){
            this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier}px`;
        }
    };
//metoda strzelania
    #shot(){
        const missile = new Missile(this.#getPosition(), this.element.offsetTop, this.contener);
        missile.init();
        this.missiles.push(missile);
    }
};