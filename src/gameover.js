var gameOver = function(game){}

gameOver.prototype = {
  	create: function(){
  		var gameOverTitle = this.game.add.sprite(160,160,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var yourScore = "You scored: "+ score;
		if (score>topScore) yourScore += "\nNew HiScore!!"
		else yourScore += "\nBest: "+topScore;
		var scoreText = this.game.add.text(160,240, yourScore, { font: "bold 25px Arial", fill: "#FFFFFF", align: "center" });
		scoreText.anchor.set(0.5);
		var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
		var gearButton = this.game.add.button(120,400,"gear",this.optionsGame,this);
		gearButton.anchor.setTo(0.5,0.5);
		var padlockButton = this.game.add.button(200,400,"padlock",this.optionsGame,this);
		padlockButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
	optionsGame: function(){
		this.game.state.start("GameOptions");
	}
}