import style from './dioag.css'

interface IDioag {
    width?: string,
    height?: string,
    title?: string,
    pos?: string,
    mask?:boolean,
    content?: (content:HTMLElement) => void,
    save?: () => {},
    cancel?: () => {}
}

interface Icomponent {
    tempcontainer?: HTMLElement;
    init: () => void;
    template: () => void;
    handle: () => void;
}

function dioag(options: IDioag) {
    return new Dioag(options)
}

class Dioag implements Icomponent {
    tempcontainer: HTMLElement;
    mask:HTMLElement;
    content:HTMLElement;
    handle() {
        let dioagClose=this.tempcontainer.querySelector(`.${style['dioag-title']} i`);
        dioagClose.addEventListener("click",()=>{
            document.body.removeChild(this.tempcontainer)
            this.mask&& document.body.removeChild(this.mask)
        })
    };
    createMask(){
        this.mask=document.createElement("div");
        this.mask.className=style.mask;
        this.mask.style.width='100%';
        this.mask.style.height=window.innerHeight+'px';
        document.body.appendChild(this.mask)
    }
    init() {
        this.template()
        this.setting.mask&&this.createMask();
        this.handle();
        this.contentCallback()
    };
    contentCallback(){
         this.content=this.tempcontainer.querySelector(`.${style['dioag-content']}`);
        this.setting.content(this.content)
    }
    template() {
        this.tempcontainer = document.createElement("div");
        this.tempcontainer.className = style.dioag
        this.tempcontainer.style.width = this.setting.width;
        this.tempcontainer.style.height = this.setting.height;
        this.tempcontainer.innerHTML = `
            <div class="${style['dioag-title']}">
                <h3>${this.setting.title}</h3>
                <i class="iconguanbi"></i>
            </div>
            <div class="${style['dioag-content']}">
            
            </div>`;
        document.body.appendChild(this.tempcontainer);
        if (this.setting.pos === 'left') {
            this.tempcontainer.style.left = '0px';
            this.tempcontainer.style.top = (window.innerHeight - this.tempcontainer.offsetHeight) + 'px';
        } else if (this.setting.pos === 'right') {
            this.tempcontainer.style.right = '0px';
            this.tempcontainer.style.top = (window.innerHeight - this.tempcontainer.offsetHeight) + 'px';
        } else {
            this.tempcontainer.style.left = (window.innerWidth - this.tempcontainer.offsetWidth) / 2 + 'px';
            this.tempcontainer.style.top = (window.innerHeight - this.tempcontainer.offsetHeight) / 2 + 'px';
        }
        this.setting.content

    };

    constructor(private setting: IDioag) {
        this.setting = Object.assign({
            width: "100%",
            height: "100%",
            title: '弹窗',
            pos: 'center',
            mask:true,
            save: function () {
            },
            cancel: function () {
            }
        }, this.setting)
        this.init()
    }

}

export default dioag;