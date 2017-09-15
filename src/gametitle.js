var gameTitle = function(game){};

gameTitle.prototype = {
  	create: function(){
  		var background = this.game.add.image(0,0,"background");
  		background.scale.setTo(0.18,0.18);
		//var gameTitle = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY/2,"gametitle");
		//gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(this.game.world.centerX/2,this.game.world.centerY*1.5,"play",this.playTheGame,this,1,0,2);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.set(0.75);
		var raceButton = this.game.add.button(this.game.world.centerX*1.5,this.game.world.centerY*1.5,"play",this.playTheRace,this,1,0,2);
		raceButton.anchor.setTo(0.5,0.5);
		raceButton.scale.set(0.75);
		var timesTables = this.game.add.button(this.game.world.centerX,this.game.world.centerY*1.5,"play",this.playTimesTables,this,1,0,2);
		timesTables.anchor.setTo(0.5,0.5);
		timesTables.scale.set(0.75);
		var homeButton = this.game.add.button(this.game.world.centerX*0.75,this.game.world.centerY*1.8,"home",this.levels,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(0.75);
		var gearButton = this.game.add.button(this.game.world.centerX*1.25,this.game.world.centerY*1.8,"settings",this.optionsGame,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(0.75);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
	playTheRace: function(){
		this.game.state.start("NewLevel");
	},
	playTimesTables: function(){
		this.game.state.start("TimesTables");
	},	
	levels: function(){
		this.game.state.start("Levels");
	},	
	optionsGame: function(){
		this.game.state.start("GameOptions");
	}
};