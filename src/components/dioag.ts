let styles=require('./dioag.css')
interface IDioag {
    width?: string,
    height?: string,
    content?: () => {}
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
    handle() {

    };

    init() {
        this.template()
    };

    template() {
        this.tempcontainer = document.createElement("div")
        console.log(styles.dioagBody)
        this.tempcontainer.innerHTML = `<h1 class="${styles.dioagBody}">hello</h1>`
        document.body.append(this.tempcontainer);
    };

    constructor(private setting: IDioag) {
        this.setting = Object.assign({
            width: "200px",
            height: "200px",
            content: function () {
            },
            save: function () {
            },
            cancel: function () {
            }
        }, this.setting)
        this.init()
    }

}

export default dioag;