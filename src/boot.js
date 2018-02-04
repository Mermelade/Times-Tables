var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/loading.png"); 
          this.game.load.image("background","assets/background2island.png");
	},
  	create: function(){
  		bckgnd = this.game.stage;
  		bckgnd.backgroundColor = '#000000';

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.setScreenSize();
		//		this.forceOrientation(false, true)
		this.scale.forceOrientation(false, true);
		this.game.state.start("Preload");
	}
}