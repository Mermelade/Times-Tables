
var showResults = function(game){};

showResults.prototype = {
  	create: function(){
  		//añadimos el fondo. El escalado es manual.
  		var background = this.game.add.image(0,0,"background");
  		background.scale.set(0.18);
		
		//mostramos la imagen 
  		//var level_end = this.game.add.image(this.game.world.centerX,this.game.world.centerY-20,"level_end");
  		//level_end.anchor.set(0.5);
  		//level_end.scale.set(1);
  		
		// mostramos el level completed!
        var levelText = this.game.add.text(this.game.world.centerX,160, "level: "+level+"\nCOMPLETED!" , { font: "bold 32px Arial", fill: "#FFFFFF", align: "center" });
        levelText.anchor.set(0.5);
        var levelCompletedTween = this.game.add.tween(levelText).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None);

        // mostramos el score y el HiScore
		var yourScore = "You scored: "+ score;
		if (score>topScore) yourScore += "\nNew HiScore!!"
		else yourScore += "\nBest: "+topScore;
		var scoreText = this.game.add.text(160,240, yourScore, { font: "bold 25px Arial", fill: "#FFFFFF", align: "center" });
		scoreText.anchor.set(0.5);
	    var scoreTextTween = this.game.add.tween(scoreText).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);

    	// mostramos botones de play y opciones
		var playButton = this.game.add.button(this.game.world.centerX*1.6,this.game.world.centerY*1.7,"play",this.playTheRace,this,1,0,2);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.set(1);
		var homeButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY*1.7,"home",this.titleGame,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(1);
// replay to do
		var gearButton = this.game.add.button(this.game.world.centerX*0.4,this.game.world.centerY*1.7,"replay",this.replayTheRace,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(1);
		
		// level UP!
        level += 1;
        levelText = this.game.add.text(this.game.world.centerX,100, "Level UP!"+"\nLevel: "+level, { font: "bold 32px Arial", fill: "#FFFFFF", align: "center" });
        levelText.anchor.set(0.5);
		levelText.alpha=0;
        var levelUpTween = this.game.add.tween(levelText).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None);

        // mostramos el title del nuevo level
        //var titleText = this.game.add.text(this.game.world.centerX,160, title[level], { font: "bold 28px Arial", fill: "#19cf11", align: "center" });
        var titleText = this.game.add.text(this.game.world.centerX,160, title[level], { font: "20pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2, align: "center" });
        titleText.anchor.set(0.5);
        titleText.alpha=0.1;
        var levelTitleTween = this.game.add.tween(titleText).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None);

        // mostramos la mission del nuevo level
        var missionText = this.game.add.text(this.game.world.centerX,220, mission[level], { font: "bold 18px Arial", fill: "#FFFFFF", align: "center" });
        missionText.anchor.set(0.5);
        missionText.alpha=0.1;
        var missionTextTween = this.game.add.tween(missionText).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None);

        levelCompletedTween.chain(missionTextTween,levelTitleTween,levelUpTween);
        levelCompletedTween.start();

        // life UP!
        // parametrizo aquí los segundos del timer (life) de cada nivel
        switch(level) {
		    case 1:
		    	life=10;
		        break;
		    case 2:
				life=9;
		        break;
		    case 3:
				life=8;
		        break;
		    default:
		    	life=5;
	        	break;
		}	
	},
	playTheRace: function(){
		this.game.state.start("TheRace");
	},
	titleGame: function(){
		this.game.state.start("GameTitle");
	},
	replayTheRace: function(){
		level --;
		this.game.state.start("TheRace");
	},
};