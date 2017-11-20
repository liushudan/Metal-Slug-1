class GameView{
  constructor(){
    this.element =  document.getElementsByClassName("wrapper")[0];
  }

  getMainWrapper () {
    return this.element;
  };

  createElement(elementName) {
    return document.createElement(elementName);
  };

  addClass(element, className) {
    element.className = className;
  };

  appendElement(parentElement,childElement){
    parentElement.appendChild(childElement);
  }

  removeElement(parentElement,childElement){
    parentElement.removeChild(childElement);
  }
}