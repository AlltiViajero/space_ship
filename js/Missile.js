export class Missile{
    constructor(x, y, contaner){
        this.x = x;
        this.y = y;
        this.contaner = contaner;
        this.element = document.createElement('div');
        this.interval = null;
    }
    init(){
        this.element.classList.add('missile');
        this.contaner.appendChild(this.element);
        this.element.style.left = `${this.x - this.element.offsetWidth / 2}px`;
        this.element.style.top = `${this.y - this.element.offsetHeight }px`;
        this.interval = setInterval( () => (this.element.style.top = `${this.element.offsetTop - 1}px`), 5);
    }
    remove(){
        clearInterval(this.interval)
        this.element.remove();
    }
}