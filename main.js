class Toaster {
    // # Initialiser
    // # function pour créer toast
    // # function pour définir les options
    
    constructor(options) {
        this.anchor = document.getElementById(options.anchorid);

        this.createMainFrame()
    }

    findAnchor(){
        return this.anchor;
    }

    createMainFrame(classList = []) {
        let mainFrame = document.createElement("div");
        classList.map( (c) =>{ mainFrame.classList.add(c)} ) ;
        mainFrame.id = "jmt-frame";
        let message = createElement("div" , "" , "jmt-message");
        mainFrame.appendChild(message);
        this.findAnchor().appendChild(mainFrame);
    }

    addMessage(message) {
        document.getElementById("jmt-frame").innerHTML = message;
    }

    createButton (options) {
        let options = {
            caption : "text",
            action : (x)=> console.log("coucou"),
            hideOnClick : true
        }
    }

    addCloseButton() {
        let closeGroup = createElement("div" , "" , "jmt-closebtn");
        let closeBtn = createElement("button","Close");
        closeBtn.addEventListener("click", (x) => this.disableVisibility())
        closeGroup.appendChild(closeBtn);
        document.getElementById("jmt-frame").appendChild(closeGroup);
    }
    enableVisibility() {
        this.findAnchor().classList.add("visible");
    }
    disableVisibility() {
        this.findAnchor().classList.remove("visible");
    }
    show(options) {
        this.addMessage(options.message)
        this.addCloseButton()
        this.enableVisibility()
    }
}

function createElement(type = "div",innerHtml = null , id = null ) {
    let elm = document.createElement(type);
    elm.innerHTML = innerHtml;
    elm.id = id;
    return elm;
}