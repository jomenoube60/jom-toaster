class Toaster {
    // # Initialiser
    // # function pour créer toast
    // # function pour définir les options    
    constructor(options) {
        this.anchor = document.getElementById(options.id);
        this._options = {
            default : {
                position :"top"
            },
            show_default : {
                message : "Hello",
                closeTimeOut : 1000,
                binaryQuestion : false,
                closeButton : false,
                customButtons : null
            },
        }
    }
    findAnchor(){
        if(this.anchor == undefined) throw "No tag to work with. Be sure that you provide an id" ;
        return this.anchor;
    }
    createMainFrame(classList = []) {
        this.findAnchor().classList.add("jmt-toaster");
        let mainFrame = document.createElement("div");
        mainFrame.classList.add("jmt-frame");
        classList.map( (c) =>{ mainFrame.classList.add(c)} ) ;
        
        let message = createElement("div" , "" , ["jmt-message"]);
        mainFrame.appendChild(message);
        this.findAnchor().appendChild(mainFrame);
    }
    addMessage(message) {
        let collection = this.findAnchor().getElementsByClassName("jmt-message");
        let action = function(elm) {elm.innerHTML = message}
        forEachElementDo(collection , (x) => {x.innerHTML = message});
    }
    /**
     * Create a new button with its own logic
     *
     * @param {string} options.caption The text in the button.
     * @param {Object} options.action The function defining what will happen on click.
     * @param {boolean} options.hideOnClick Whether or not the Toaster will hide on click.
     */
    createButton (options) {
        let btn = createElement("button" , options.caption);
        btn.addEventListener("click" , options.action);
        if(options.hideOnClick) btn.addEventListener("click",(x)=> this.disableVisibility());
        return btn;
    }
    addCloseButton() {
        let closeGroup = createElement("div" , "" , ["jmt-closebtn"]);     
        closeGroup.appendChild(this.createButton({
            caption : "Close",
            action : (x) => console.log(),
            hideOnClick : true
        }));
        forEachElementDo(this.findAnchor().getElementsByClassName("jmt-frame") , (x)=> {x.appendChild(closeGroup)})
    }
    createCustomButtonGroup (options) {
        let btnGroup = createElement("div" , "" , ["jmt-custombtn"]);
        for (const [key, value] of Object.entries(options)) {
            btnGroup.appendChild(this.createButton({
                caption : key,
                action : (x) => value.action(),
                hideOnClick : value.hideOnClick
            }));
        this.findAnchor().appendChild(btnGroup)        
         }
    }
    addYesNoButtons(options) {
        let btnGroup = createElement("div" , "" , ["jmt-yesno"]);
        for (const [key, value] of Object.entries(options)) {
            btnGroup.appendChild(this.createButton({
                caption : key,
                action : (x) => value.action(),
                hideOnClick : value.hideOnClick
            }));
        this.findAnchor().appendChild(btnGroup)
        }
    }
    enableVisibility() {
        this.findAnchor().classList.add("visible");
    }
    disableVisibility() {
        this.findAnchor().classList.remove("visible");
    }
    cleanToaster() {
        removeAllChildElement(this.findAnchor());
    }
    show(options = this._options.show_default) {
        this.cleanToaster();
        this.createMainFrame();
        this.addMessage(options.message);
        this.enableVisibility();
        if (options.binaryQuestion) this.addYesNoButtons();
        if (options.closeButton) this.addCloseButton();
        if (options.closeTimeOut > 0) setTimeout((x) => this.disableVisibility() , options.closeTimeOut);
        
    }
}

function removeAllChildElement(elm) {
    while (elm.lastChild) {
        elm.removeChild(elm.lastChild);
    }
}
function createElement(type = "div",innerHtml = null , classList = [] ) {
    let elm = document.createElement(type);
    elm.innerHTML = innerHtml;
    classList.map((x)=> elm.classList.add(x));
    return elm;
}
function forEachElementDo(collection , action) {
    for (let i = 0; i < collection.length; i++) {
        action(collection[i]);         
    }
}