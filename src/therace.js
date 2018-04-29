//var button = new Array();
var number;
var number1 = 0;
var number2 = 0;
//var maxnumber1=10;
var maxnumber2=10;
//var offsetnumber1=1;
var offsetnumber2=1;
var score;
var money=0;
var totalMoney=0;
var totalScore=0;
var result;
var scoreText;
var timeTo=5;
var timeHint=3;
var life=5;
var lifeText;
var questionTimer;
var eventQuestionTimer;
var lifeTimer;
var operator="+";
//var volumen = 0.1;
var level = 1;
var bonification;
var cloudTypes =['cloud1','cloud2','cloud3','cloud4','cloud5'];
// goals y goalstars
var goals;
var fails;
var SelectedNumbers2;
var SelectedNumbers;
var goalText = new Array();
var goalstar = new Array();

var theRace = function(game){};

theRace.prototype = {
  	create: function(game){
  		
		// select background sprites 
  		for (i = 1; i < 5; i++) {
	  		if (level<31) {
	  			bckgnd[i] = 'hills'+ i.toString();
			} else bckgnd[i] = 'dunes'+ i.toString();
  		}
  		
  		// create background sprites
 		background_sky = this.game.add.tileSprite(0,0,this.game.width*4,this.game.height*3,'hills_sky');
  		background_sky.scale.set(0.35);
  		background_hills1 = this.game.add.tileSprite(0,0,this.game.width*10,this.game.height*3,bckgnd[1]);
  		background_hills1.scale.set(0.35);
  		background_hills2 = this.game.add.tileSprite(0,0,this.game.width*15,this.game.height*3,bckgnd[2]);
  		background_hills2.scale.set(0.35);
  		background_hills3 = this.game.add.tileSprite(0,0,this.game.width*20,this.game.height*3,bckgnd[3]);
  		background_hills3.scale.set(0.35);
  		background_hills4 = this.game.add.tileSprite(0,0,this.game.width*25,this.game.height*3,bckgnd[4]);
  		background_hills4.scale.set(0.35);

		//create clouds
		this.createClouds();
		
		// stop background animation in update function
		go = false;
		
		// Setup level
		this.setupLevel();

  		// score, life, money, topScore, topMoney and fails init
  		score = 0;
  		//life = 0; // init in setupLevel
  		money = 0;
  		fails = 0;
  		topScore = localStorage.getItem("topTablesScore")==null?0:localStorage.getItem("topTablesScore");
		topMoney = localStorage.getItem("topTablesMoney")==null?0:localStorage.getItem("topTablesMoney");
		//new ones
		SelectedNumbers2 = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12];
		goals = 0;
		SelectedText ='';
		//tracker
		//for (var i = 0; i < SelectedNumbers2.length; i++) {
		//	SelectedText = SelectedText+SelectedNumbers2[i];
		//}
		//SelectedNumbers2Text = game.add.text(128,80, SelectedText, { font: "bold 14px Arial", fill: "#F2F2F2", align: "left" });
		//SelectedNumbers2Text.anchor.set(0.5);
		
		// show life(heart) on top
		heart = this.game.add.sprite(32,32,"bigheart");
		heart.anchor.set(0.5);
		heart.scale.set(0.75);
        heart.inputEnabled = true;
        heart.events.onInputUp.add(this.pauseGame, this);
		lifeText = game.add.text(32,32, life, { font: "bold 20px Arial", fill: "#FFFFFF", align: "right" });
		lifeText.anchor.set(0.5);

		// show score(stars) on top
		star = this.game.add.sprite(264,72,"star");
		star.anchor.set(0.5);
		scoreText = game.add.text(296,64, score, { font: "bold 20px Arial", fill: "#FFFFFF", align: "right" });
		scoreText.anchor.set(0.5);
		totalScoreText = game.add.text(296,80, totalScore, { font: "bold 15px Arial", fill: "#FFFFFF", align: "right" });
		totalScoreText.anchor.set(0.5);
		// show money(coins) on top		
		coins = this.game.add.sprite(this.game.width - 74, 32, 'coin');
		coins.anchor.set(0.5);
		coins.animations.add('cointwist');
		coinsText = game.add.text(290,24, money, { font: "bold 20px Arial", fill: "#FFFFFF", align: "right", boundsAlignH: 'right',boundsAlignV: 'top' });
		coinsText.anchor.set(0.5);
		totalCoinsText = game.add.text(290,40, totalMoney, { font: "bold 15px Arial", fill: "#FFFFFF", align: "right", boundsAlignH: 'right',boundsAlignV: 'top' });
		totalCoinsText.anchor.set(0.5);
		goalsText = game.add.text(270,120, goals, { font: "bold 25px Arial", fill: "#19cf11", align: "right" });
		goalsText.anchor.set(0.5);
		failsText = game.add.text(300,120, fails, { font: "bold 25px Arial", fill: "#E60026", align: "right" });
		failsText.anchor.set(0.5);

        // show pause button
        //pauseText = game.add.text(this.game.world.centerX/5,64, 'PAUSE' , { font: "bold 16px Arial", fill: "#FFFFFF", align: "center" });
        //pauseText.anchor.set(0.5);
        //pauseText.inputEnabled = true;
        //pauseText.events.onInputUp.add(this.pauseGame, this);

		// create ecuation text (text)
		text = game.add.text(game.world.centerX, game.world.centerY/2,"", { font: "75px Arial", fill: "#FFFFFF", align: "center" });
		text.anchor.set(0.5);

		// lifeTimer 	
		// create own Timer preventing conflicts with the generic one
		lifeTimer = this.game.time.create(false);	
		// add a looped event each second
		lifeTimer.loop(Phaser.Timer.SECOND * 1, this.timerSecond, this);
    	// it won't start automatically, allowing you to hook it to button events and the like.
    	// it will start at the end of the countdown

		// create answer text (textresult)
		textresult = game.add.text(game.world.centerX, game.world.centerY,"", { font: "95px Arial", fill: "#FFFFFF", align: "center" });
		textresult.anchor.set(0.5);
		textresult.inputEnabled = true;
        textresult.events.onInputUp.add(this.deleteResult, this);

		// create hint text (textHint)
		textHint = game.add.text(game.world.centerX, game.world.centerY-100,"", { font: "125px Arial", fill: "#19cf11", align: "center" });
		textHint.anchor.set(0.5);

		// crete level text (levelText)
        var levelText = game.add.text(this.game.world.centerX,32, "Level "+level , { font: "bold 25px Arial", fill: "#FFFFFF", align: "center" });
        levelText.anchor.set(0.5);
        
        // create title text
        var levelTitle = game.add.text(this.game.world.centerX,64, title[level] , { font: "16px Arial", fill: "#FFFFFF", align: "center" });
        levelTitle.anchor.set(0.5);

		// create buttons numbers
		button = new Array();
		var k=0;
		for (i = 1.5; i > 0; i--) {
			for (j = 0.5; j < 5; j++) {
				// utilizamos el metodo .toString para que k recoja el valor "0" en lugar de ""
				button[k] = game.add.text(j*(this.game.world.width/5),(this.game.world.height)-((this.game.world.width/5)*i), k.toString() , { font: "bold 64px Arial", fill: "#94C7F4", align: "center" });
		        button[k].stroke = "#d4e8Fa";
			    button[k].strokeThickness = 14;
			    button[k].setShadow(2, 2, "#167CD6", 2, true, true);
		        button[k].anchor.set(0.5);
		        button[k].valor = k;
		        button[k].inputEnabled = true;
		        button[k].events.onInputDown.add(this.clicked, this);
				k++;
			}
		}

		// Countdown
		countdown = 3;
		countdownText = game.add.text(game.world.centerX, game.world.centerY,countdown.toString(), { font: "175px Arial", fill: "#E60026", align: "center" });
		countdownText.anchor.set(0.5);
		countdownText.scale.set (1);
		countdownTween = this.game.add.tween(countdownText.scale).to( { x: 0, y: 0 }, 1000, Phaser.Easing.Linear.None, true, 1000);
		countdownTween.onComplete.add(this.countdown, this);
		
		//situación objetivos
		for (var i = 1; i < 13; i++) {
			goalText[i] = game.add.text(game.world.centerX*1.5,game.world.centerY*0.50 + 20*i, "x" + i , { font: "bold 20px Arial", fill: "#FFFFFF", align: "right" });
			goalText[i].anchor.set(0.5);
			goalstar[i] = new Array();
			for (var j = 1; j < 4; j++) {
				goalstar[i][j] = this.game.add.sprite(game.world.centerX*1.6+15*j,game.world.centerY*0.50 + 20*i,"stars");
				goalstar[i][j].frame = 0;
				goalstar[i][j].scale.set(0.5);
				goalstar[i][j].anchor.set(0.5);	
			}
		}

		// setup music and sounds
		//volumen = 0.1;
		//music = this.game.add.audio('music',volumen,true,true);
		
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

	    //  Being mp3 files these take time to decode, so we can't play them instantly
	    //  Using setDecodedCallback we can be notified when they're ALL ready for use.
	    //  The audio files could decode in ANY order, we can never be sure which it'll be.
	    //this.game.sound.setDecodedCallback([ keysound, fx, music ], this.letsStart, this);

	},

	countdown: function(){
		countdown--;
		countdownText.scale.set (1);
		countdownTween = this.game.add.tween(countdownText.scale).to( { x: 0, y: 0 }, 1000, Phaser.Easing.Linear.None, true);

		if ( countdown > 0 ) {
			countdownText.text = countdown.toString();
			countdownTween.onComplete.add(this.countdown, this);
		} else {
			// start background animation in update function
			go= true;
			countdownText.text = "GO!"
			countdownText.fill = "#19cf11"
			// let's play it Sam!
			//music.play();
			// call random ecuations function
			this.onemoretry();
		    // start the timer running - this is important!
			lifeTimer.start();
		}
	},

	createClouds: function(){
		// create random clouds, number is defined in options
		clouds = new Array();
		for (var i = 0; i < cloudsCount; i++) {
			clouds[i] = this.game.add.image(Math.random()*500-50,Math.random()*150+70,this.game.rnd.pick(cloudTypes));
		  	clouds[i].scale.set(Math.random()*0.15+0.20);
		  	clouds[i].speed = Math.random()*0.1+0.075;
		}
	},
	
	timerSecond: function(){
		// one second less
		life ++;
		lifeText.text = life;
		// throbbing heart
		heart.scale.set (0.5);
		// tweenheart = this.game.add.tween(heart).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
		this.game.add.tween(heart.scale).to( { x: 0.75, y: 0.75 }, 175, Phaser.Easing.Linear.None, true, 0, 2, true);
	}, 
	
	pauseGame: function(){
		if (this.game.paused) {
			this.game.paused=false;
			pauseText.fill = "#FFFFFF";
		}
		else {
			this.game.paused=true;
        	pauseText.fill = "#3ADF00";
        	game.input.onDown.add(this.pauseGame, this);
		}
	},
	
	clicked: function(button){
		button.fill = "#167CD6";
		button.events.onInputUp.add(this.clickedUp, this);
		number = (number*10) + button.valor;
		textresult.alpha = 1;
		textresult.scale.set(1);
		textresult.style.fill="#FFFFFF";
		textresult.text = number;
		this.checkresult();
	},	
	
	clickedUp: function(button){
		button.fill = "#94C7F4";
	},

	// Check if the answer is OK
	checkresult: function () {
		keysound.play();

		// You Win!
		if (number == result) {
			this.textUpdate();
			this.youwin();
		}
		// You Failed!
		else if ((number > result) || (result < 100 && (Math.floor(result/10) !== number)) || (result > 100 && (number < 10) && (Math.floor(result/100) !== number)) || (result > 100 && (number > 9) && (number < 100) && (Math.floor(result/10) !== number)) ) {
			//optional update
			//this.textUpdate();
			this.youfailed();
		}
		// else do nothing! Important if the answer number is not yet full completed
	},

	textUpdate: function() {
		// change ecuation text (text.text) to the right answer
		switch(operator) {
			case 'Serie':
				text1X2 = number1 + ',' + number2 + ',' + number3 + result;
				break;
			case 'makeN':
				text1X2 = number1 + "+" + result + "=" + maxnumber1;
				break;
			case '++':
				text1X2 = number1 + "+" + number2 + "+" + number3 + "=" + result;
				break;
			case 'x+':
				text1X2 = number1 + "x" + number2 + "=" + result;
				break;
			default:
				text1X2 = number1 + operator + number2 + "=" + result;
				break;
		}
		text.text = text1X2;
	},

	deleteResult: function(){
		this.buttonsInputOnOff(true);
		number = 0;
		textresult.text = "";
	},

	// create text ecuation falling tween
	textFallingTween: function () {
		// buttons off when tween is running
		this.buttonsInputOnOff(false);
		// create tween if there is enough time left (2 secs.)
		if (this.game.time.events.duration > 2000) {
			var tweenFallingText = this.game.add.tween(text).to ( { y: +330 }, 2000, Phaser.Easing.Bounce.Out, true);
			tweenFallingText.onComplete.add(this.onemoretry, this);
		} else this.onemoretry();

	},
	
	buttonsInputOnOff: function (OnOff) {
		for (var i = 0; i < 10; i++) {
			if (OnOff) button[i].fill = "#94C7F4";
			button[i].inputEnabled = OnOff;
		}
	},

	// set up ecuations according to the level
	onemoretry: function () {
		// buttons on. falling tween is ended at this point 
		this.buttonsInputOnOff(true);
		
		// pick up a random operator, just in case there are more than one
		operator=this.game.rnd.pick(Operators);
		// create random ecuation for the operator selected
		switch(operator) {
		    case '+':
				number1 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				number2 = this.game.rnd.pick(SelectedNumbers);
				result = number1+number2;
				break;
		    case '-':
				number1 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				number2 = this.game.rnd.pick(SelectedNumbers);
				if (number1 < number2) {
					n2=number2;
					number2=number1;
					number1=n2;
				}
				result = number1-number2;
		        break;
		    case 'x':
				number1 = this.game.rnd.pick(SelectedNumbers);
				number2 = this.game.rnd.pick(SelectedNumbers2);
				//number2 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				result = number1*number2;
		        break;
		    case '/':
				number1 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				number2 = this.game.rnd.pick(SelectedNumbers);
				number1=number1*number2;
				result = number1/number2;
		        break;
			case 'Serie':
				number1 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				offset = this.game.rnd.pick(SelectedNumbers);
				number2 = number1+offset;
				number3 = number2+offset;
				result = number3+offset;
		        break;
			case 'makeN':
				number1 = Math.floor(Math.random()*maxnumber1+offsetnumber1);
		        result = maxnumber1-number1;
		        break;	
			case 'withinN':
				number1 = Math.floor(Math.random()*maxnumber1+offsetnumber1);
				number2 = Math.floor(Math.random()*(maxnumber1-number1));
				operator='+';
		        result = number1+number2;
		        break;
			case 'double':
				number1 = Math.floor(Math.random()*maxnumber1+offsetnumber1);
				number2 = number1;
				operator='+';
				result = number1+number2;
		        break;
			case 'half':
				number1 = 2*Math.floor(Math.random()*maxnumber1+offsetnumber1);
				number2 = 2;
				operator='/';
				result = number1/number2;
		        break;	
			case '++':
				number1 = Math.floor(Math.random()*maxnumber1+offsetnumber1);
				number2 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
				number3 = Math.floor(Math.random()*maxnumber3+offsetnumber3);;
				result = number1+number2+number3;
		        break;
		    case 'x+':
				number1 = this.game.rnd.pick(SelectedNumbers);
				do {
					if (number2 < 12) number2 += offsetnumber2;
					else {
						number2 = 1;
						//this.timeOver();
					}
				} //while ( !this.itemInArray(SelectedNumbers2,number2));
				while ( this.countItemInArray(SelectedNumbers2,number2) < 1);

				operator='x';
				result = number1*number2;
	        break;

		    default:
	        	break;
		}		

		// reset number and text vars
		number = 0;
		text.destroy();
		
		// textHint disappears
		//if (hintTimer.isRunning) hintTimer.stop();
		textHint.alpha = 0;

		// show new ecuation text (text) 
		switch(operator) {
			case 'Serie':
				text1X2 = number1 + ',' + number2 + ',' + number3 + '...';
				break;
			case 'makeN':
				text1X2 = number1 + "+" + "?" + "=" + maxnumber1;
				break;
			case '++':
				text1X2 = number1 + "+" + number2 + "+" + number3 + "=" +"?";
				break;
			default:
				text1X2 = number1 + operator + number2 + "=" +"?";
				break;
		}
		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2, text1X2 , { font: "75px Arial", fill: "#FFFFFF", align: "center" });
		text.anchor.set(0.5);

		// add a text tween for timeTo*1000
		textAlphaTween = this.game.add.tween(text).to( { alpha: 0 }, (timeTo*1000)+2000, Phaser.Easing.Linear.None, true);
		textTween = this.game.add.tween(text).to( { y: this.game.world.centerY+100 }, (timeTo*1000)+2000, Phaser.Easing.Linear.None, true);
		
		// remove all generic time events, except events in lifeTimer wich is a different timer.
		this.game.time.events.removeAll();

		// Si se acerca el final del tiempo mostramos el hint
		if (hintEnabled) {
			// create own Timer preventing conflicts with the generic one
			hintTimer = this.game.time.create(false);	
			// add a looped event each second
			hintTimer.add(Phaser.Timer.SECOND * timeHint, this.showHints, this);
			// it won't start automatically, allowing you to hook it to button events and the like.
			hintTimer.start();
			//this.game.time.events.add(Phaser.Timer.SECOND * timeHint, this.showHints, this);
		}	

		// create questionTimer event lasting SECOND * timeTo+2000, at the end call questionTimerOver function
		questionTimer = this.game.time.events.add(Phaser.Timer.SECOND * timeTo+2000, this.questionTimerOver, this);

	},
	
	youwin: function () {
		// play charm!
		fx.play("charm");

		// only if dont come from a fail
		if ( go ) {
			// actualizo stars
			this.goalstarRotation();
			goalstar[number2][3].frame = 1;
			//borra la primera ocurrencia de un valor;
			this.removeItemFromArray(SelectedNumbers2,number2);
			//SelectedNumbers2 Tracker **borrar si funciona**
			//SelectedText='';
			//for (var i = 0; i < SelectedNumbers2.length; i++) {
			//	SelectedText = SelectedText+SelectedNumbers2[i];
			//}
			//SelectedNumbers2Text.text = SelectedText;

			// comprueba si ya has completado todas las estrellas
			if ((goalstar[number2][1].frame == 1) && (goalstar[number2][2].frame == 1)) {
				goals++;
				goalsText.text = goals;
				goalText[number2].fill = "#19cf11";
				if (goals == 12) { 
					this.timeOver();
				}
			}

			// calculate money bonification
			bonification = Math.round(this.game.time.events.duration/10);
			money = money + bonification;
			coinsText.text = money;
			totalMoney = totalMoney + bonification;
			totalCoinsText.text = totalMoney;
			// show bonification text
			bonificationText = this.game.add.text(this.game.world.centerX,this.game.world.centerY-50, bonification, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right", boundsAlignH: 'right',boundsAlignV: 'top' });
			bonificationText.anchor.set(0.5);
			bonificationText.stroke = "#167CD6"; //#d4e8Fa
			bonificationText.strokeThickness = 2;
			// create bonification text tween
			this.game.add.tween(bonificationText).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
			this.game.add.tween(bonificationText).to( { y: '-50' }, 1000, Phaser.Easing.Linear.None, true);
			
			// play coin twist animation
			coins.animations.play('cointwist', 30, true);
			
			// play star rotation tween until coin twist animation ends
			var starTween = this.game.add.tween(star).to( { angle: 360 }, 1000, Phaser.Easing.Linear.None, true);
			// stop rotation when coin twist animation ends
			starTween.onComplete.add(this.stopCoinsAnimation, this);
			
			// update and show new score
			score += 1;
			scoreText.text = score;
			totalScore ++;
			totalScoreText.text = totalScore;
		}
		
		// show right answer (textresult) 
		textresult.alpha = 1;
		textresult.scale.set(2);
		textresult.style.fill="#19cf11"; //green
		textresult.text = number;
		// play textresult tweens
		this.game.add.tween(textresult).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
		this.game.add.tween(textresult.scale).to( { x: 0, y: 0 }, 1000, Phaser.Easing.Linear.None, true);

		// start lifeTimer if it was paused
		if (lifeTimer.paused) {
			lifeTimer.resume();
			go = true;
		}
		
		if (hintEnabled) {
			hintTimer.stop();
			textHint.alpha=0;
		}
	
		// call textFallingTween
		this.textFallingTween();

	},
	
	stopGo: function () {
		// stop lifeTimer
		lifeTimer.pause();
		// stop tweens
		textAlphaTween.pause();
		textTween.pause();
		// stop background animation
		go = false;
	},
	
	youfailed: function () {
		// stop if its the first time failed ("go" is true)
		if (go) this.stopGo();
		// actualizo fails
		fails++;
		failsText.text=fails;
		// actualizo stars
		this.goalstarRotation();
		goalstar[number2][3].frame = 0;
		// añade una o dos ocurrencias del numero fallado según corresponda
		switch (this.countItemInArray(SelectedNumbers2,number2)) {
		    case 2:
		        SelectedNumbers2.push(number2);
		        break; 
		    case 1:
				SelectedNumbers2.push(number2);
				SelectedNumbers2.push(number2);
				break; 
		    default:
		}

		// show emitter animation
		emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 200);
		emitter.makeParticles('star');
		emitter.start(true, 4000, null, 30);
		
		// play curse sound
		fx.play("curse");
		
		// star rotation
		this.game.add.tween(star).to( { angle: -360 }, 1000, Phaser.Easing.Linear.None, true);
		
		// show textHint with the right answer
		this.showHints();

		// show textresult
		textresult.alpha = 1;
		textresult.scale.set(1);
		textresult.style.fill="#E60026"; //red
		if (number == 0) {
			textresult.text = "";
		} else textresult.text = number;
		textresultTween = this.game.add.tween(textresult).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
		//this.game.add.tween(textresult.scale).to( { x: 0, y: 0 }, 1000, Phaser.Easing.Linear.None, true);

		
		// buttons off until textresultTween ends
		this.buttonsInputOnOff(false);

		// when textresultTween ends, call deleteResult (delete an reset values)
		textresultTween.onComplete.add(this.deleteResult, this);
	},
	
	showHints: function() {
		// show textHint with the right answer
		textHint.text=result;
		textHint.alpha = 1;
		//if (!textHintTween.isRunning) {
			textHintTween = this.game.add.tween(textHint).to( { alpha: 0 }, 200, Phaser.Easing.Quadratic.InOut, true, 100, 5, true);
		//}

	},
	
	questionTimerOver: function () {
		text.alpha = 1;
		if (go) {
			text.y = this.game.world.centerY-70;
			this.youfailed();
		}
	},
	
	timeOver: function () {
		// stop music
		//music.stop();
		if (score > 2) {
			fx.play("charm");
			localStorage.setItem("topTablesScore",Math.max(score,topScore));
			localStorage.setItem("topTablesMoney",Math.max(money,topMoney));
			this.game.state.start("LevelComplete",true,false,score,topScore);
		} else {
			fx.play("fireball");
			localStorage.setItem("topTablesScore",Math.max(score,topScore));
			localStorage.setItem("topTablesMoney",Math.max(money,topMoney));
			this.game.state.start("LevelComplete",true,false,score,topScore);
		}	
	},
	
	goalstarRotation: function(){
		goalstar[number2][1].frame = goalstar[number2][2].frame;
		goalstar[number2][2].frame = goalstar[number2][3].frame;
	},
	
	removeItemFromArray: function ( arr, item ) {
	    var i = arr.indexOf( item );
	    if ( i !== -1 ) {
	        arr.splice( i, 1 );
	    }
	},
	
	countItemInArray: function (arr,item) {
		var count = 0;
	    for (var i=0;i<arr.length;i++) {
	        if (arr[i]===item) count++;
	    }
	    return count;
	},

	stopCoinsAnimation: function() {
		coins.animations.stop(null, true);
	},
	
	// if go is true start background animation
	update: function () {
		if ( go ) {
			background_sky.x = background_sky.x - 0.00625;
	        for (var i=0; i<cloudsCount; i++) {
		       clouds[i].x = clouds[i].x - clouds[i].speed;
	        }
	        background_hills1.x = background_hills1.x - 0.03125;
	        background_hills2.x = background_hills2.x - 0.0625;
	        background_hills3.x = background_hills3.x - 0.09375;
	        background_hills4.x = background_hills4.x - 0.125;
		}
	},
	
	setupLevel: function () {
		// setup vars for each level
		// life = 25 except detailed on levels
		life=0;
		// set number2=0 for times tables (Operators='x+')
		number2=0;
		switch(level) {
		    case 1: // x1+H
				offsetnumber2=1;
				SelectedNumbers=[1];
				Operators=['x+'];
				hintEnabled=true;
				break;
		    case 2: // x1+
				offsetnumber2=1;
				SelectedNumbers=[1];
				Operators=['x+'];
				hintEnabled=false;
				break;
		    case 3: // x1
				offsetnumber2=1;
				SelectedNumbers=[1];
				Operators=['x'];
				hintEnabled=false;
				break;
		    case 4: // x2+H
				offsetnumber2=1;
				SelectedNumbers=[2];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 5: // x2+
				offsetnumber2=1;
				SelectedNumbers=[2];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 6: // x2
				offsetnumber2=1;
				SelectedNumbers=[2];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 7: // x3+H
				offsetnumber2=1;
				SelectedNumbers=[3];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 8: // x3+
				offsetnumber2=1;
				SelectedNumbers=[3];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 9: // x3
				offsetnumber2=1;
				SelectedNumbers=[3];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 10: // x4+H
				offsetnumber2=1;
				SelectedNumbers=[4];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 11: // x4+
				offsetnumber2=1;
				SelectedNumbers=[4];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 12: // x4
				offsetnumber2=1;
				SelectedNumbers=[4];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 13: // x5+H
				offsetnumber2=1;
				SelectedNumbers=[5];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 14: // x5+
				offsetnumber2=1;
				SelectedNumbers=[5];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 15: // x5
				offsetnumber2=1;
				SelectedNumbers=[5];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 16: // x6+H
				offsetnumber2=1;
				SelectedNumbers=[6];
				Operators=['x+'];
				hintEnabled=true;
				break;
		    case 17: // x6+
				offsetnumber2=1;
				SelectedNumbers=[6];
				Operators=['x+'];
				hintEnabled=false;
				break;
		    case 18: // x6
				offsetnumber2=1;
				SelectedNumbers=[6];
				Operators=['x'];
				hintEnabled=false;
				break;
		    case 19: // x7+H
				offsetnumber2=1;
				SelectedNumbers=[7];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 20: // x7+
				offsetnumber2=1;
				SelectedNumbers=[7];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 21: // x7
				offsetnumber2=1;
				SelectedNumbers=[7];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 22: // x8+H
				offsetnumber2=1;
				SelectedNumbers=[8];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 23: // x8+
				offsetnumber2=1;
				SelectedNumbers=[8];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 24: // x8
				offsetnumber2=1;
				SelectedNumbers=[8];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 25: // x9+H
				offsetnumber2=1;
				SelectedNumbers=[9];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 26: // x9+
				offsetnumber2=1;
				SelectedNumbers=[9];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 27: // x9
				offsetnumber2=1;
				SelectedNumbers=[9];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 28: // 10+H
				offsetnumber2=1;
				SelectedNumbers=[10];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 29: // x10+
				offsetnumber2=1;
				SelectedNumbers=[10];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 30: // x10
				offsetnumber2=1;
				SelectedNumbers=[10];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 31: // x11+H
				offsetnumber2=1;
				SelectedNumbers=[11];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 32: // x11+
				offsetnumber2=1;
				SelectedNumbers=[11];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 33: // x11
				offsetnumber2=1;
				SelectedNumbers=[11];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 34: // x12+H
				offsetnumber2=1;
				SelectedNumbers=[12];
				Operators=['x+'];
				hintEnabled=true;
		        break;
		    case 35: // x12+
				offsetnumber2=1;
				SelectedNumbers=[12];
				Operators=['x+'];
				hintEnabled=false;
		        break;
		    case 36: // x12
				offsetnumber2=1;
				SelectedNumbers=[12];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 37: // x1 x2 x3 x4
				offsetnumber2=1;
				SelectedNumbers=[1,2,3,4];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 38: // x5 x6 x7 x8
				offsetnumber2=1;
				SelectedNumbers=[5,6,7,8];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 39: // x9 x10 x11 x12
				offsetnumber2=1;
				SelectedNumbers=[9,10,11,12];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 40: // x1 x2 x3 x4 x5 x6
				offsetnumber2=1;
				SelectedNumbers=[1,2,3,4,5,6];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 41: // x7 x8 x9 x10 x11 x12
				offsetnumber2=1;
				SelectedNumbers=[7,8,9,10,11,12];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 42: // x1 x12 x2 x11 x3 x10
				offsetnumber2=1;
				SelectedNumbers=[1,12,2,11,3,10];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 43: // x4 x9 x5 x8 x7 x6
				offsetnumber2=1;
				SelectedNumbers=[4,9,5,8,7,6];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 44: // x4 x6 x7 x8 x9 x12
				offsetnumber2=1;
				SelectedNumbers=[4,6,7,8,9,12];
				Operators=['x'];
				hintEnabled=false;
		        break;
		    case 45: // x1-x12
				offsetnumber2=1;
				SelectedNumbers=[1,2,3,4,5,6,7,8,9,10,11,12];
				Operators=['x'];
				hintEnabled=false;
		        break;

		    default:
	        	break;
		}
	},
	
	render: function () {
    	//this.game.debug.text("Time remaining: " + this.game.time.events.duration.toFixed(0), 32, 32);
	}
};