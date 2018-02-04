var gameTitle = function(game){};

gameTitle.prototype = {
  	create: function(){
  		var background = this.game.add.image(-30,0,"background");
  		background.scale.setTo(0.56,0.56);
  		//background.scale.setTo(0.36,0.36);
		//var gameTitle = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY/2,"gametitle");
		//gameTitle.anchor.setTo(0.5,0.5);
		
		//Game Headline: Times Tables
		var gameTitleText = this.game.add.text(this.game.world.centerX,this.game.world.centerY-165, "Times\nTables" , { font: "bold 64px/60px Arial", fill: "#FFFFFF", align: "center" });
		gameTitleText.stroke = "#4adbff"; //#00ccff
		gameTitleText.strokeThickness = 14;
		gameTitleText.setShadow(4, 3, "#02b1dd", 2, true, true);
		gameTitleText.anchor.set(0.5);
		
		//Game Buttons
		var playButton = this.game.add.button(this.game.world.centerX/2,this.game.world.centerY*1.5,"play",this.playTheGame,this,1,0,2);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.set(0.75);
		//playButton.scale.set(1.5);
		var raceButton = this.game.add.button(this.game.world.centerX*1.5,this.game.world.centerY*1.5,"play",this.playTheRace,this,1,0,2);
		raceButton.anchor.setTo(0.5,0.5);
		raceButton.scale.set(0.75);
		//raceButton.scale.set(1.5);
		var timesTables = this.game.add.button(this.game.world.centerX,this.game.world.centerY*1.5,"play",this.playTimesTables,this,1,0,2);
		timesTables.anchor.setTo(0.5,0.5);
		timesTables.scale.set(0.75);
		//timesTables.scale.set(1.5);
		var homeButton = this.game.add.button(this.game.world.centerX*0.75,this.game.world.centerY*1.8,"home",this.levels,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(0.75);
		//homeButton.scale.set(1.5);
		var gearButton = this.game.add.button(this.game.world.centerX*1.25,this.game.world.centerY*1.8,"settings",this.optionsGame,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(0.75);
		//gearButton.scale.set(1.5);
		
		//Game Main Start Button
		var centralButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY,"play",this.playTheRaceNow,this,1,0,2);
		centralButton.anchor.setTo(0.5,0.5);
		centralButton.scale.set(0.75);
		//centralButton.scale.set(1.5);
		var tweenCentralButton = this.game.add.tween(centralButton.scale).to ( { x: 1, y: 1 }, 1000, Phaser.Easing.Quadratic.InOut, true, 500, 10, true);
		//var tweenCentralButton = this.game.add.tween(centralButton.scale).to ( { x: 2, y: 2 }, 1000, Phaser.Easing.Quadratic.InOut, true, 500, 10, true);

		//play the music
		//this.playTheMusic();

	},
	
	playTheMusic: function(){
		// Ponemos la música!
		//volumen = 0.1;
		//music = this.game.add.audio('paradise',volumen,true,true);
		//titleMusic.play();
		//music.loopFull();
		//music.loop = true;
	},
	
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
	playTheRace: function(){
		this.game.state.start("NewLevel");
	},
	playTheRaceNow: function(){
		//titleMusic.stop();
		this.game.state.start("TheRace");
	},
	playTimesTables: function(){
		this.game.state.start("TimesTables");
	},	
	levels: function(){
		this.game.state.start("Levels");
	},	
	optionsGame: function(){
		this.game.state.start("GameOptions");
	},
	
	render: function() {
    	//this.game.debug.soundInfo(music, 20, 32);
	}
};