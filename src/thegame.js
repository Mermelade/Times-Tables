var number;
var number1;
var number2;
var maxnumber1=10;
var maxnumber2=10;
var offsetnumber1=1;
var offsetnumber2=1;
var operator="+";
var score;
var scoreText;
var timeTo=5;
var lives=1;
var newgamelives=1;
var numoperators=4;
var Plus=true;
var Minus=false;
var Times=false;
var Division=false;
var volumen=0;

var theGame = function(game){};

theGame.prototype = {
  	create: function(game){
  		var background = this.game.add.image(0,0,"background");
  		background.scale.setTo(0.25,0.25);
  		
  		score = 0;
  		lives = newgamelives;
  		topScore = localStorage.getItem("topTablesScore")==null?0:localStorage.getItem("topTablesScore");
		text = game.add.text(game.world.centerX, game.world.centerY-60,number1 + operator + number2, { font: "75px Arial", fill: "#FFFFFF", align: "center" });
		text.anchor.set(0.5);
		game.add.tween(text).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);
		star = this.game.add.sprite(264,32,"star");
		star.anchor.set(0.5);

		this.onemoretry();
		textresult = game.add.text(game.world.centerX, game.world.centerY+40,"", { font: "95px Arial", fill: "#FFFFFF", align: "center" });
		textresult.anchor.set(0.5);
		scoreText = game.add.text(296,32, score, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		scoreText.anchor.set(0.5);
		heart = this.game.add.sprite(32,32,"heart");
		heart.anchor.set(0.5);
		livesText = game.add.text(64,32, lives, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		livesText.anchor.set(0.5);
		
		numoperators=0;
		if (Plus) { numoperators++; plusText = game.add.text(128,32, " + ", { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" }); plusText.anchor.set(0.5); };
		if (Minus) { numoperators++; minusText = game.add.text(160,32, " - ", { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" }); minusText.anchor.set(0.5); };
		if (Times) { numoperators++; timesText = game.add.text(192,32, " x ", { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" }); timesText.anchor.set(0.5); };
		if (Division) { numoperators++; divisionText = game.add.text(224,32, " / ", { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" }); divisionText.anchor.set(0.5); };

//		numoperatorsText = game.add.text(96,32, numoperators, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
//		numoperatorsText.anchor.set(0.5);

		volumenText = game.add.text(96,32, volumen, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		volumenText.anchor.set(0.5);

		Button0 = this.game.add.button(0,352,"button0",this.clicked0,this,0,0,1,0);
		Button1 = this.game.add.button(64,352,"button1",this.clicked1,this,0,0,1,0);
		Button2 = this.game.add.button(128,352,"button2",this.clicked2,this,0,0,1,0);
		Button3 = this.game.add.button(192,352,"button3",this.clicked3,this,0,0,1,0);
		Button4 = this.game.add.button(256,352,"button4",this.clicked4,this,0,0,1,0);
		Button5 = this.game.add.button(0,416,"button5",this.clicked5,this,0,0,1,0);
		Button6 = this.game.add.button(64,416,"button6",this.clicked6,this,0,0,1,0);
		Button7 = this.game.add.button(128,416,"button7",this.clicked7,this,0,0,1,0);
		Button8 = this.game.add.button(192,416,"button8",this.clicked8,this,0,0,1,0);
		Button9 = this.game.add.button(256,416,"button9",this.clicked9,this,0,0,1,0);
		
		this.game.time.events.add(Phaser.Timer.SECOND * timeTo, this.youfailed, this);
		
		music = this.game.add.audio('music',0.1,true,true);
		music.play();
		//music.loopFull();
		music.loop = true;
		
		fx = this.game.add.audio('sfx');
		fx.volume = volumen;
		fx.allowMultiple = true;
		fx.addMarker('charm', 0, 2.7);		
		fx.addMarker('curse', 4, 2.9);
		fx.addMarker('fireball', 8, 5.2);
		fx.addMarker('spell', 14, 4.7);
		fx.addMarker('soundscape', 20, 18.8);
		keysound = this.game.add.audio('keysound');
		keysound.volume = volumen;

	},
	clicked0: function(){
		number = (number*10) + 0;
		textresult.text = number;
		this.checkresult();
	},
	clicked1: function(){
		number = (number*10) + 1;
		textresult.text = number;
		this.checkresult();
	},	
	clicked2: function(){
		number = (number*10) + 2;
		textresult.text = number;
		this.checkresult();
	},	
	clicked3: function(){
		number = (number*10) + 3;
		textresult.text = number;
		this.checkresult();
	},	
	clicked4: function(){
		number = (number*10) + 4;
		textresult.text = number;
		this.checkresult();
	},	
	clicked5: function(){
		number = (number*10) + 5;
		textresult.text = number;
		this.checkresult();
	},	
	clicked6: function(){
		number = (number*10) + 6;
		textresult.text = number;
		this.checkresult();
	},	
	clicked7: function(){
		number = (number*10) + 7;
		textresult.text = number;
		this.checkresult();
	},
	clicked8: function(){
		number = (number*10) + 8;
		textresult.text = number;
		this.checkresult();
	},
	clicked9: function(){
		number = (number*10) + 9;
		textresult.text = number;
		this.checkresult();
	},
	checkresult: function () {
		keysound.play();
		if (operator == "x") {
			if (number == number1*number2) {
				this.youwin();
			}
			else if ((number > number1*number2) || (number*10 > number1*number2)) {
				textresult.text = number1*number2;
				this.youfailed();
			}
		}
		else if (operator == "+") {
			if (number == number1+number2) {
				this.youwin();			}
			else if ((number > number1+number2) || (number*10 > number1+number2)) {
				textresult.text = number1+number2;
				this.youfailed();
			}
		}
		else if (operator == "/") {
			if (number == number1/number2) {
				this.youwin();			}
			else if (number > number1/number2) {
				textresult.text = number1/number2;
				this.youfailed();
			}
		}
		else if (operator == "-") {
			if (number == number1-number2) {
				this.youwin();			}
			else if (number > number1-number2) {
				textresult.text = number1-number2;
				this.youfailed();
			}
		}
	},
	onemoretry: function () {
		//number1 = Math.floor(Math.random()*maxnumber1+offsetnumber1);
		//number2 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
		randoperator = Math.floor(Math.random()*4);
		operatornotdecided = true;
		while (operatornotdecided) {
			if ((randoperator == 0) && (Times)) {
				operator="x";
				number1 = this.game.rnd.pick(SelectedNumbers);
				number2 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				operatornotdecided=false;
			}
			else if ((randoperator == 1) && (Plus)) {
				operator="+";
				number1 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				number2 = this.game.rnd.pick(SelectedNumbers);
				operatornotdecided=false;
			}		
			else if ((randoperator == 2) && (Division)) {
				operator="/";
				number1 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				number2 = this.game.rnd.pick(SelectedNumbers);
				number1=number1*number2;
				operatornotdecided=false;
			}
			else if ((randoperator == 3) && (Minus)) {
				operator="-";
				number1 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				number2 = this.game.rnd.pick(SelectedNumbers);
				if (number1 < number2) {
					n2=number2;
					number2=number1;
					number1=n2;
				}
				operatornotdecided=false;
			}
			else randoperator = Math.floor(Math.random()*4);
		}
		number = 0;
		text.destroy();
		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-60,number1 + operator + number2, { font: "75px Arial", fill: "#FFFFFF", align: "center" });
		text.anchor.set(0.5);
		text.text = number1 + operator + number2;
		this.game.add.tween(text).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);
		this.game.time.events.destroy();
		this.game.time.events.add(Phaser.Timer.SECOND * timeTo, this.youfailed, this);
		this.game.time.events.start();
		star.destroy();
		star = this.game.add.sprite(264,32,"star");
		star.anchor.set(0.5);
		this.game.add.tween(star).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);
	},
	youwin: function () {
		fx.play("charm");
		this.onemoretry();
		score += 1;
		scoreText.text = score;
		bckgnd.backgroundColor = '#19cf11';
		this.game.add.tween(star).to( { angle: 360 }, 1000, Phaser.Easing.Linear.None, true);
	},
	youfailed: function () {
		lives -=1;
		livesText.text = lives;
		bckgnd.backgroundColor = '#ef3d45';
		heart.destroy();
		heart = this.game.add.sprite(32,32,"heart");
		heart.anchor.set(0.5);	 
		heart.alpha = 0;
		heart.scale.set (0.5);
		tweenheart = this.game.add.tween(heart).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
		tweenheart1 = this.game.add.tween(heart.scale).to( { x: 1, y: 1 }, 200, Phaser.Easing.Linear.None, true, 200, 4, true);
		if (lives <= 0) {
			this.bckgndblack();
			music.stop();
			fx.play("fireball");
			localStorage.setItem("topTablesScore",Math.max(score,topScore));
			this.game.state.start("GameOver",true,false,score,topScore);
		} else {
			fx.play("spell");
			this.onemoretry();
		}
	},
	bckgndblack: function() {
		bckgnd.backgroundColor = '#000000';
	},
	render: function () {
    	//this.game.debug.text("Time remaining: " + this.game.time.events.duration, 32, 32);
	}
};