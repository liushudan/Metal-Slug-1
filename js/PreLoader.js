class PreLoader {
  constructor() {
    this.imageSources = {
      1: "images/start-screen.png",
      2: "images/background.jpg",
      3: "images/character-sprite.png",
      4 : "images/parachute-marco.png",
      5 : "images/enemy-soldier-sprite.png"
    };
    this.loadImages(this.imageSources);
  }

  loadImages(imageSources) {
    let images = {};
    let loadedImages = 0;
    let totalImages = 0;

    for (let key in imageSources) {
      totalImages++;
    }

    for (let key in imageSources) {
      images[key] = new Image();
      images[key].src = imageSources[key];
      images[key].onload = function () {
        loadedImages++;
        if (loadedImages >= totalImages) {
          let home = new HomeScreen();
          home.init();
        }
      };
    }
  }
}

window.onload = () => {
  let preloader = new PreLoader();
};