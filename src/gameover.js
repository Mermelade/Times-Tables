var gameOver = function(game){};

gameOver.prototype = {
  	create: function(){
  		//añadimos el fondo. El escalado es manual.
  		var background = this.game.add.image(-30,0,"background");
  		background.scale.set(0.56);
		
		//mostramos la imagen y el ribbon
  		var level_end = this.game.add.image(this.game.world.centerX+5,this.game.world.centerY,"level_end");
  		level_end.anchor.set(0.5);
  		level_end.scale.set(0.95);  
    	var red_ribbon = this.game.add.image(this.game.world.centerX+5,85,"red_ribbon");
  		red_ribbon.anchor.set(0.5);
  		red_ribbon.scale.set(1);  
  		
  		//stars
  		if (score > 5) {
			var bigstar1 = this.game.add.image(this.game.world.centerX-79,this.game.world.centerY-70,"bigstar");
			bigstar1.anchor.set(0.5);
			bigstar1.scale.set (0);
			this.game.add.tween(bigstar1.scale).to( { x: 0.38, y: 0.38 }, 500, Phaser.Easing.Bounce.Out.None, true);
			this.game.add.tween(bigstar1).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true);
			if (score > 10) {
				var bigstar2 = this.game.add.image(this.game.world.centerX-1,this.game.world.centerY-97,"bigstar");
				bigstar2.anchor.set(0.5);
				bigstar2.scale.set (0);
				this.game.add.tween(bigstar2.scale).to( { x: 0.5, y: 0.5 }, 500, Phaser.Easing.Elastic.None, true, 500);
				this.game.add.tween(bigstar2).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true,500);
				if (score > 15) {
					var bigstar3 = this.game.add.image(this.game.world.centerX+77,this.game.world.centerY-70,"bigstar");
					bigstar3.anchor.set(0.5);
					bigstar3.scale.set (0);
					this.game.add.tween(bigstar3.scale).to( { x: 0.38, y: 0.38 }, 500, Phaser.Easing.Elastic.None, true, 1000);
					this.game.add.tween(bigstar3).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true,1000);
				}
			}
  		}
  		
  		// mostramos score
  		var moneyText = this.game.add.text(this.game.world.centerX+15,this.game.world.centerY+10, money, { font: "bold 40px Arial", fill: "#FFFFFF", align: "center" });
  		moneyText.anchor.set(0.5);
  		var scoreText = this.game.add.text(this.game.world.centerX,this.game.world.centerY+50, score, { font: "bold 45px Arial", fill: "#FFFFFF", align: "center" });
  		
  		//var gameOverTitle = this.game.add.sprite(160,100,"gameover");
		//gameOverTitle.anchor.setTo(0.5,0.5);
		
		//mostramos score
		//var yourScore = "You scored: "+ score;
		//if (score>topScore) yourScore += "\nNew HiScore!!"
		//else yourScore += "\nBest: "+topScore;
		//var scoreText = this.game.add.text(160,160, yourScore, { font: "bold 25px Arial", fill: "#FFFFFF", align: "center" });
		//scoreText.anchor.set(0.5);
		
		//mostramos money
		//var yourMoney = "You earned: "+ money;
		//if (money>topMoney) yourMoney += "\nNew HiScore!!"
		//else yourMoney += "\nBest: "+topMoney;
		//var moneyText = this.game.add.text(160,220, yourMoney, { font: "bold 25px Arial", fill: "#FFFFFF", align: "center" });
		//moneyText.anchor.set(0.5);
		
		var replayButton = this.game.add.button(this.game.world.centerX*0.4,this.game.world.centerY*1.65,"replay",this.playTheGame,this,1,0,2);
		replayButton.anchor.setTo(0.5,0.5);
		replayButton.scale.set(1);
		var homeButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY*1.65,"home",this.titleGame,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(1);
		var gearButton = this.game.add.button(this.game.world.centerX*1.6,this.game.world.centerY*1.65,"settings",this.optionsGame,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(1);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
	titleGame: function(){
		this.game.state.start("GameTitle");
	},
	optionsGame: function(){
		this.game.state.start("GameOptions");
	}
}