import { Missile } from "./Missile.js";

export class Spaceship{
    missiles = []           //tablica z nabojami
    missileLimit = 15;      //limit nabojów wystrzelonych za jednym razem
    #modifier = 10;         //zmienna przechowująca o ile ma się przesówać px statek
    #leftArrow = false;     //zmienna sprawdzająca czy jest wciśnięta lewa strzałka
    #rightAttow = false;    //zmienna sprawdzająca czy jest wciśnięta prawa strzałka
    #HTML_BTN = {
        btn_left: document.querySelector('[data-btn-left]'),
        btn_shot: document.querySelector('[data-btn-shot]'),
        btn_right: document.querySelector('[data-btn-right]'),
    }
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
        this.element.style.bottom = '55px';
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
        })
        this.#HTML_BTN.btn_shot.addEventListener("click", () => this.#shot());
        // this.#HTML_BTN.btn_left.addEventListener("click", () => this.#left());
        // this.#HTML_BTN.btn_right.addEventListener("click", () => this.#right());
        this.#HTML_BTN.btn_left.addEventListener("touchstart", () => this.#leftArrow = true);
        this.#HTML_BTN.btn_left.addEventListener("touchend", () => this.#leftArrow = false);
        this.#HTML_BTN.btn_right.addEventListener("touchstart", () => this.#rightAttow = true);
        this.#HTML_BTN.btn_right.addEventListener("touchend", () => this.#rightAttow = false);
    };
    // #left(){
    //     if (this.#getPosition() > 12){   
    //         this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`;
    //     }
    // }
    // #right(){
    //     if (this.#getPosition() + 12 < window.innerWidth){
    //         this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier}px`;
    //     } 
    // }

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
    // #shot(){
    //     const missile = new Missile(this.#getPosition(), this.element.offsetTop, this.contener);
    //     missile.init();
    //     this.missiles.push(missile);
    //     console.log(this.missiles.length);
    // }
    #shot(){
        if (this.missiles.length < this.missileLimit){
            const missile = new Missile(this.#getPosition(), this.element.offsetTop, this.contener);
            missile.init();
            this.missiles.push(missile);
        }
    }

};