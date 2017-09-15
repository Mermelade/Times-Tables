var title = ["","Make 10", "Adittion \nwithin 10","Doubles to 10", "Halves to 10"];
var missionText = ["","You will be shown a number.\nHit the number that makes \nthe total up to ten.","You will be shown a sum.\nHit the number that has \nthe correct total.","Hit the number that is \ndouble the number shown","Hit the number that is \nhalf the number shown"];
var text;
var index = 0;
var line = '';
var levelText;
var levelTitle;

var newLevel = function(game){};
newLevel.prototype = {
  	create: function(game){
		//background hills
 		background = this.game.add.tileSprite(0,0,this.game.width*50,this.game.height*3,'hills');
  		background.scale.set(0.35);
  		//var level = 2;

		//mostramos el level
        levelText = this.game.add.text(this.game.world.centerX,0, "Level "+level , { font: "bold 60px Arial", fill: "#FFFFFF", align: "center" });
        levelText.anchor.set(0.5);
        tweenlevelText = this.game.add.tween(levelText).to ({y:this.game.world.centerY}, 2000, Phaser.Easing.Bounce.Out, true);

        //mostramos el title
        levelTitle = this.game.add.text(this.game.world.centerX,this.game.world.centerY+50, title[level] , { font: "bold 35px Arial", fill: "#FFFFFF", align: "center" });
        levelTitle.anchor.set(0.5);
        levelTitle.alpha = 0;
        tweenlevelTitle = this.game.add.tween(levelTitle).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);

        //mostramos la mission
        //var levelMission = game.add.text(this.game.world.centerX,this.game.world.centerY+175, mission[level] , { font: "20px Arial", fill: "#FFFFFF", align: "center" });
        //levelMission.anchor.set(0.5);

	    text = game.add.text(this.game.world.centerX,this.game.world.centerY+175, '', { font: "16pt Arial", fill: "#FFFFFF", stroke: "#119f4e", strokeThickness: 2, align: "center"   });
		text.anchor.set(0.5);

        tweenlevelTitle.onComplete.add(this.nextLine, this);
		
	    //this.nextLine();

	},
	
	titleTween: function () {
		
		//check here!!
        tweentitle = this.game.add.tween(levelTitle).to ({y:this.game.world.centerY}, 2000, Phaser.Easing.Bounce.Out);
        tweentitle.start();
	},
	
	updateLine: function () {
	    if (line.length < missionText[index].length)
	    {
	        line = missionText[index].substr(0, line.length + 1);
	        // text.text = line;
	        text.setText(line);
	    }
	    else
	    {
	    //  Wait 2 seconds then starts tweensOut
	    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.tweensOut, this);
	    }
	},
	
	nextLine: function () {
	    index++;
	    if (index < missionText.length)
	    {
	        line = '';
	        this.game.time.events.repeat(80, missionText[index].length + 1, this.updateLine, this);
	    }
	},

	tweensOut: function(){
		tweenlevelText = this.game.add.tween(levelText).to ({y:-50}, 500, Phaser.Easing.Linear.None, true);
        tweenlevelTitle = this.game.add.tween(levelTitle).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        tweenText = this.game.add.tween(text).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
		tweenText.onComplete.add(this.playTheRace, this);
	},

	playTheRace: function(){
		this.game.state.start("TheRace");
	},

	update: function () {
        //background.x -= 1;
	},
	
};