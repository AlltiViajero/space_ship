export class Enemy {
    constructor(contaner, intervalTime, enemyClass, lives = 1){
        this.contaner = contaner;
        this.element = document.createElement('div');
        this.enemyClass = enemyClass;
        this.interval = null;
        this.intervalTime = intervalTime;
        this.lives = lives;
    }   
    init(){
        this.#setEnemy();
        this.#updatePossition();
    }
    //metoda generująca wrogów
    #setEnemy(){
        this.element.classList.add(this.enemyClass);
        this.contaner.appendChild(this.element);
        this.element.style.top = '0px';
        this.element.style.left = `${this.#randomPossition()}px`;
    }
    //losowanie pozycji wroga
    #randomPossition(){
        return Math.floor(Math.random()* (window.innerWidth - this.element.offsetWidth));
    }
    //aktualizowanie nowej pozycji wroga
    #updatePossition(){
        this.interval = setInterval( () => this.#setNewPossition(), this.intervalTime);
    }
    //metoda przesówania pozycji wroga
    #setNewPossition(){
        this.element.style.top = `${this.element.offsetTop + 1}px`
    }
    //metoda czyszcząca interwał i usuwająca relement
    remove(){
        clearInterval(this.interval);
        this.element.remove();
    }
}