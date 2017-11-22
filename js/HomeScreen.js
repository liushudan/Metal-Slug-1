class HomeScreen{
  constructor(){
    this.homeScreen=new GameView();
    this.gameUI=new GameUI();
    this.game=new MetalSlug();
  }

  init(){
    let mainWrapper=this.homeScreen.getMainWrapper();
    let startScreen=this.homeScreen.createElement('div');
    this.homeScreen.addClass(startScreen,'home-screen');



    let startText=this.homeScreen.createElement('span');
    this.homeScreen.addClass(startText, 'home-font');
    startText.innerHTML='press enter to start';

    this.homeScreen.appendElement(startScreen,startText);
    this.homeScreen.appendElement(mainWrapper,startScreen);
  
    let enemyInformation  = {
        0 :[  { "src" : "images/enemy-soldier-sprite.png" , width :50, height :50} , { "src" : "images/enemy-soldier-sprite.png" , width :50, height :50}]

    };

    document.onkeydown = (event) => {
      if(event.keyCode===13){
        this.homeScreen.removeElement(mainWrapper, startScreen);
        this.gameUI.show();
        this.game.init(enemyInformation);
      }
    }
  }
}