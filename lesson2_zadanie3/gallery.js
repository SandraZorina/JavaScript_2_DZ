class Modal {
    constructor(modal){
        this.settings = modal;
        this.btn = null;
        this.imgWrap = null;
        this.block = null;
        this._build()
    }
    _open(element) {
        this._addImage(element.src, element.alt);
        this.block.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    }
    _addImage(src, alt) {
        this.imgWrap.innerHTML = `<img src="${src}" alt="${alt}">`;
    }
    _build() {
       let template = `
                        <div id="${this.settings.id}" class="modal-wrap">
                           <div class="top-block">
                               <button type="button" class="${this.settings.btn}" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                           </div>
                           <div class="${this.settings.imgWrap}"></div>    
                        </div>`;
        document.body.innerHTML += template;
        this.imgWrap = document.querySelector(`.${this.settings.imgWrap}`);
        this.block = document.querySelector(`#${this.settings.id}`);
        this._initElements();
    }
    _initElements() {
        this.btn = document.querySelector(`.${this.settings.btn}`);
        this.btn.addEventListener('click', () => {
            this.block.classList.toggle('show');
        });
    }
}

class Gallery {
    constructor(source, container, modal = {id: 'modal', imgWrap: 'img-wrap', btn: 'close'}){
        this.container = container;
        this.modal = new Modal(modal);
        this._getData(source);
    }
    _getData(source) {
        fetch(source)
            .then(result => {return result.json()})
            .then(data => this._buildGallery(data));
    }
    _addImage(image) {
        this.container.innerHTML += `<img src="${image.src}" alt="${image.alt}">`;
    }
    _buildGallery(data) {
        this.container = document.querySelector(this.container);
        for (let image of data) {
            this._addImage(image);
        }
        this._initGallery();
    }
    _initGallery() {
        this.container.addEventListener('click', event => {
            if (event.target.tagName !== 'IMG'){
                return;
            }
            this.modal._open(event.target);
        });
    }
}