var title = ["",
"Times Tables x1+H",
"Times Tables x1+",
"Times Tables x1",
"Times Tables x2+H",
"Times Tables x2+",
"Times Tables x2",
"Times Tables x3+H",
"Times Tables x3+",
"Times Tables x3",
"Times Tables x4+H",
"Times Tables x4+",
"Times Tables x4",
"Times Tables x5+H",
"Times Tables x5+",
"Times Tables x5",

"Times Tables x6+H",
"Times Tables x6+",
"Times Tables x6",
"Times Tables x7+H",
"Times Tables x7+",
"Times Tables x7",
"Times Tables x8+H",
"Times Tables x8+",
"Times Tables x8",
"Times Tables x9+H",
"Times Tables x9+",
"Times Tables x9",
"Times Tables x10+H",
"Times Tables x10+",
"Times Tables x10",

"Times Tables x11+H",
"Times Tables x11+",
"Times Tables x11",
"Times Tables x12+H",
"Times Tables x12+",
"Times Tables x12",
"Times Tables\nx1 x2 x3 x4",
"Times Tables\nx5 x6,x7,x8",
"Times Tables\nx9 x10,x11,x12",
"Times Tables\nx1 x2 x3 x4 x5 x6",
"Times Tables\nx7 x8,x9,x10,x11,x12",
"Times Tables\nx1 x12 x2 x11 x3 x10",
"Times Tables\nx4 x9 x5 x8 x6 x7",
"Times Tables\nx4 x6 x7 x8 x9 x12",
"Times Tables\nx1-x12",

];

var missionText = ["",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",

"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",

"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",

"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",

"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",

"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",

"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",

"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",

"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",
"You will be shown a multiplication.\nHit the number that shows \nthe correct answer.",

];

var text;
var index = 0;
var line = '';
var levelText;
var levelTitle;

var newLevel = function(game){};
newLevel.prototype = {
  	create: function(game){
  		
  		// select background sprites 
	  		if (level<31) levelbckgnd = 'hills'
			else levelbckgnd = 'dunes';

		//background hills
 		background = this.game.add.tileSprite(0,0,this.game.width*50,this.game.height*3, levelbckgnd);
  		background.scale.set(0.35);
  		//var level = 2;

		//mostramos el level
        levelText = this.game.add.text(this.game.world.centerX,0, "Level "+level.toString() , { font: "bold 60px Arial", fill: "#FFFFFF", align: "center" });
        levelText.anchor.set(0.5);
        tweenlevelText = this.game.add.tween(levelText).to ({y:this.game.world.centerY}, 2000, Phaser.Easing.Bounce.Out, true);

        //mostramos el title
        levelTitle = this.game.add.text(this.game.world.centerX,this.game.world.centerY+70, title[level] , { font: "bold 35px Arial", fill: "#FFFFFF", align: "center" });
        levelTitle.anchor.set(0.5);
        levelTitle.alpha = 0;
        tweenlevelTitle = this.game.add.tween(levelTitle).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);

        //mostramos la mission
        index = level-1;
	    text = game.add.text(this.game.world.centerX,this.game.world.centerY+175, '', { font: "14pt Arial", fill: "#FFFFFF", stroke: "#119f4e", strokeThickness: 2, align: "center"   });
		text.anchor.set(0.5);

        tweenlevelTitle.onComplete.add(this.nextLine, this);
		
	    // on tap go to playTheRace
	    game.input.onTap.add(this.playTheRace, this);

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