var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
  		var background = this.game.add.image(0,0,"background");
  		background.scale.setTo(0.25,0.25);
		//var gameTitle = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY/2,"gametitle");
		//gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY/2,"play2",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.setTo(0.5,0.5);
		var gearButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY,"gear",this.optionsGame,this);
		gearButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
	optionsGame: function(){
		this.game.state.start("GameOptions");
	}
}