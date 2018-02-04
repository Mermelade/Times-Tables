//var button = new Array();
var number;
var number1;
var number2;
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
var faultAccount=0;
var theRace = function(game){};

theRace.prototype = {
  	create: function(game){
  		//añadimos el fondo del juego. El escalado es manual.
  		//var background = this.game.add.image(0,0,"background");
  		//background.scale.setTo(0.25,0.25);

		//background hills
 		//background = this.game.add.tileSprite(0,0,this.game.width*50,this.game.height*3,'hills');
  		//background.scale.set(0.35);

 		background_sky = this.game.add.tileSprite(0,0,this.game.width*4,this.game.height*3,'hills_sky');
  		background_sky.scale.set(0.35);
  		background_hills1 = this.game.add.tileSprite(0,0,this.game.width*10,this.game.height*3,'hills1');
  		background_hills1.scale.set(0.35);
  		background_hills2 = this.game.add.tileSprite(0,0,this.game.width*15,this.game.height*3,'hills2');
  		background_hills2.scale.set(0.35);
  		background_hills3 = this.game.add.tileSprite(0,0,this.game.width*20,this.game.height*3,'hills3');
  		background_hills3.scale.set(0.35);
  		background_hills4 = this.game.add.tileSprite(0,0,this.game.width*25,this.game.height*3,'hills4');
  		background_hills4.scale.set(0.35);
  		//background_clouds = this.game.add.tileSprite(0,0,this.game.width*5,this.game.height*3,'hills_clouds');
  		//background_clouds.scale.set(0.35);

		//create clouds
		this.createClouds();
		
		// paramos el movimiento del background en update
		go = false;

  		//definimos variables score, life, topScore
  		score = 0;
  		life = 25;
  		money = 0;

  		topScore = localStorage.getItem("topTablesScore")==null?0:localStorage.getItem("topTablesScore");
		topMoney = localStorage.getItem("topTablesMoney")==null?0:localStorage.getItem("topTablesMoney");
		
		//mostramos lives, score y money en la parte superior
		heart = this.game.add.sprite(32,32,"bigheart");
		heart.anchor.set(0.5);
		heart.scale.set(0.75);
        heart.inputEnabled = true;
        heart.events.onInputUp.add(this.pauseGame, this);
		lifeText = game.add.text(32,32, life, { font: "bold 20px Arial", fill: "#FFFFFF", align: "right" });
		lifeText.anchor.set(0.5);
		
		star = this.game.add.sprite(264,72,"star");
		star.anchor.set(0.5);
		scoreText = game.add.text(296,64, score, { font: "bold 20px Arial", fill: "#FFFFFF", align: "right" });
		scoreText.anchor.set(0.5);
		totalScoreText = game.add.text(296,80, totalScore, { font: "bold 15px Arial", fill: "#FFFFFF", align: "right" });
		totalScoreText.anchor.set(0.5);
		
		coins = this.game.add.sprite(this.game.width - 74, 32, 'coin');
		coins.anchor.set(0.5);
		coins.animations.add('cointwist');
		coinsText = game.add.text(290,24, money, { font: "bold 20px Arial", fill: "#FFFFFF", align: "right", boundsAlignH: 'right',boundsAlignV: 'top' });
		coinsText.anchor.set(0.5);
		totalCoinsText = game.add.text(290,40, totalMoney, { font: "bold 15px Arial", fill: "#FFFFFF", align: "right", boundsAlignH: 'right',boundsAlignV: 'top' });
		totalCoinsText.anchor.set(0.5);
		
        //mostramos el botón de pausa
        pauseText = game.add.text(this.game.world.centerX/5,64, 'PAUSE' , { font: "bold 16px Arial", fill: "#FFFFFF", align: "center" });
        pauseText.anchor.set(0.5);
        pauseText.inputEnabled = true;
        pauseText.events.onInputUp.add(this.pauseGame, this);

		// mostramos primera opeación aleatoria, añadiendo un degradado a medida que pasa el tiempo
		text = game.add.text(game.world.centerX, game.world.centerY/2,"", { font: "75px Arial", fill: "#FFFFFF", align: "center" });
		text.anchor.set(0.5);

		//comienza la cuenta atrás con el evento lifeTimer 	
		//creo mi propio Timer para que no se mezcle con el genérico
		lifeTimer = this.game.time.create(false);	
		//añadimos un evento cíclico
		lifeTimer.loop(Phaser.Timer.SECOND * 1, this.timerSecond, this);
    	//it won't start automatically, allowing you to hook it to button events and the like.

		//mostramos el resultado inicializado a "" en el centro de la pantalla
		textresult = game.add.text(game.world.centerX, game.world.centerY,"", { font: "95px Arial", fill: "#FFFFFF", align: "center" });
		textresult.anchor.set(0.5);
		textresult.inputEnabled = true;
        textresult.events.onInputUp.add(this.deleteResult, this);

		//mostramos el hint inicializado a "" en el centro de la pantalla
		textHint = game.add.text(game.world.centerX, game.world.centerY+60,"", { font: "65px Arial", fill: "#FFFFFF", align: "center" });
		textHint.anchor.set(0.5);

		//mostramos el level
        var levelText = game.add.text(this.game.world.centerX,32, "Level "+level , { font: "bold 25px Arial", fill: "#FFFFFF", align: "center" });
        levelText.anchor.set(0.5);
        
        //mostramos el title
        var levelTitle = game.add.text(this.game.world.centerX,64, title[level] , { font: "16px Arial", fill: "#FFFFFF", align: "center" });
        levelTitle.anchor.set(0.5);

		// mostramos los botones numéricos
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


		// Preparamos la música!
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
		
		//HERE!!

	},

	countdown: function(){
		countdown--;
		if ( countdown > 0 ) countdownText.text = countdown.toString();
		else countdownText.text = "GO!"
		countdownText.scale.set (1);
		countdownTween = this.game.add.tween(countdownText.scale).to( { x: 0, y: 0 }, 1000, Phaser.Easing.Linear.None, true);
		if (countdown > 0 ) countdownTween.onComplete.add(this.countdown, this);
		else {
			// arranca el movimiento del background en update
			go= true;
			// let's play it Sam!
			//music.play();
			// cambiamos el color!
			countdownText.fill = "#19cf11"
			// llamamos a la función que calcula las operaciones aleatorias
			this.onemoretry2();
		    //start the timer running - this is important!
			lifeTimer.start();
		}
	},

	createClouds: function(){
		// creamos las nubes aleatoriamente
		clouds = new Array();
		for (var i = 0; i < cloudsCount; i++) {
			clouds[i] = this.game.add.image(Math.random()*500-50,Math.random()*150+70,this.game.rnd.pick(cloudTypes));
		  	clouds[i].scale.set(Math.random()*0.15+0.20);
		  	clouds[i].speed = Math.random()*0.1+0.075;
		}
	},
	
	timerSecond: function(){
		// resto un segundo
		life --;
		lifeText.text = life;
		// corazón palpitante
		heart.scale.set (0.5);
		// tweenheart = this.game.add.tween(heart).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
		tweenheart1 = this.game.add.tween(heart.scale).to( { x: 0.75, y: 0.75 }, 175, Phaser.Easing.Linear.None, true, 0, 2, true);
		
		// compruebo si se ha acabado el tiempo
		if (life==0) this.timeOver();
		//else this.game.time.events.add(Phaser.Timer.SECOND * 1, this.timerSecond, this);
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
		textresult.style.fill="#FFFFFF";
		textresult.text = number;
		this.checkresult();
	},	
	
	clickedUp: function(button){
		button.fill = "#94C7F4";
	},

	// Compruebo si la respuesta es correcta o no
	checkresult: function () {
		keysound.play();
		if (number == result) {
			//REVISAR ESTA PARTE!
			// cambio el text en funcion del tipo de operacion 
			switch(operator) {
				case 'Serie':
					text1X23 = number1 + ',' + number2 + ',' + number3 + result;
					break;
				case 'makeN':
					text1X23 = number1 + "+" + result + "=" + maxnumber1;
					break;
				case '++':
					text1X23 = number1 + "+" + number2 + "+" + number3 + "=" + result;
					break;
				default:
					text1X23 = number1 + operator + number2 + "=" + result;
					break;
			}
			text.text = text1X23;
			this.youwin();
		}
		//REVISAR cálculo del error!!!
		else if ((number > result) || (result < 100 && (Math.floor(result/10) !== number)) || (result > 100 && (number < 10) && (Math.floor(result/100) !== number)) || (result > 100 && (number > 9) && (number < 100) && (Math.floor(result/10) !== number)) ) {
		//else if (number > result) {
			faultAccount++;
			if (faultAccount > 2) {
				// cambio el text en funcion del tipo de operacion 
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
					default:
						text1X2 = number1 + operator + number2 + "=" + result;
						break;
				}
				text.text = text1X2;
				textHint.text=result;
				textHint.alpha = 1;
				textHintTween = this.game.add.tween(textHint).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true);
			}
			textresult.text = "";
			number = 0;
			this.youfailed();
		}
	},

	deleteResult: function(){
		number = 0;
		textresult.text = "";
	},

	// Hago caer rebotando la ecuación
	onemoretry: function () {
		//deshabilito los botones mientras cae la ecuación
		this.buttonsInputOnOff(false);

		if (this.game.time.events.duration > 2000) {
			var tweenFallingText = this.game.add.tween(text).to ( { y: +330 }, 2000, Phaser.Easing.Bounce.Out, true);
			tweenFallingText.onComplete.add(this.onemoretry2, this);
		} else this.onemoretry2();
	},
	
	buttonsInputOnOff: function (OnOff) {
		for (var i = 0; i < 10; i++) {
			if (OnOff) button[i].fill = "#94C7F4";
			button[i].inputEnabled = OnOff;
		}
	},

	// Función que calcula las operaciones aleatoriamente de acuerdo a la configuración de gameoptions
	onemoretry2: function () {
		//habilito los botones 
		this.buttonsInputOnOff(true);

		// Definimos las variables de cada nivel: 3
		// El tiempo de cada nivel (life) se actualiza en el levelUp del showresults.js 
		switch(level) {
		    case 1: //make10
				maxnumber1=10; offsetnumber1=1;
				Operators=['makeN'];
		        break;
		    case 2: //addition within10
				maxnumber1=10; offsetnumber1=1;
				Operators=['withinN'];
		        break;
		    case 3: //doubles to 10
				maxnumber1=5; offsetnumber1=1;
				Operators=['double'];
		        break;
		    case 4: //halves to 10
				maxnumber1=5; offsetnumber1=1;
				Operators=['half'];
		        break;
		    case 5://substraction within10 (1-10)
				maxnumber2=10; offsetnumber2=1;
				SelectedNumbers=[0,1,2,3,4,5,6,7,8,9,10];
				Operators=['-'];
		        break;
		    case 6: //make20
				maxnumber1=20; offsetnumber1=1;
				Operators=['makeN'];
		        break;
		    case 7: //sum within20
				maxnumber1=20; offsetnumber1=1;
				Operators=['withinN'];
		        break;
		    case 8: //doubles to 20
				maxnumber1=10; offsetnumber1=1;
				Operators=['double'];
		        break;
		    case 9: //halves to 20
				maxnumber1=10; offsetnumber1=1;
				Operators=['half'];
		        break;
		    case 10://substraction within20 (1-10)
				maxnumber2=20; offsetnumber2=1;
				SelectedNumbers=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
				Operators=['-'];
		        break;		        
		    case 11: //make within 20
				maxnumber1=Math.floor(Math.random()*20+1);
				offsetnumber1=1;
				Operators=['makeN'];
		        break;
		    case 12: //sum/sub within20
				maxnumber2=20; offsetnumber2=1;
				SelectedNumbers=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
				Operators=['+','-'];
		        break;
		    case 13: //doubles to 20
				maxnumber1=20; offsetnumber1=1;
				Operators=['double'];
		        break;
		    case 14: //halves to 20
				maxnumber1=20; offsetnumber1=1;
				Operators=['half'];
		        break;
		    case 15://substraction within20 (1-40)
				maxnumber1=10; offsetnumber1=1;
				maxnumber2=10; offsetnumber2=1;
				maxnumber3=10; offsetnumber3=1;
				Operators=['++'];
		        break;		        
		    case 16: // x1
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[1];
				Operators=['x'];
		        break;
		    case 17: // x2
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[2];
				Operators=['x'];
		        break;
		    case 18: // x3
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[3];
				Operators=['x'];
		        break;
		    case 19: // x4
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[4];
				Operators=['x'];
		        break;
		    case 20: // x5
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[5];
				Operators=['x'];
		        break;
		    case 21: // x6
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[6];
				Operators=['x'];
		        break;
		    case 22: // x7
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[7];
				Operators=['x'];
		        break;
		    case 23: // x8
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[8];
				Operators=['x'];
		        break;
		    case 24: // x9
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[9];
				Operators=['x'];
		        break;
		    case 25: // x10
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[10];
				Operators=['x'];
		        break;
		    case 26: // x11
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[11];
				Operators=['x'];
		        break;
		    case 27: // x12
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[12];
				Operators=['x'];
		        break;
		    case 28: // x1-x6
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[1,2,3,4,5,6];
				Operators=['x'];
		        break;
		    case 29: // x7-x8
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[7,8,9,10,11,12];
				Operators=['x'];
		        break;
		    case 30: // x1-x12
				maxnumber1=12; offsetnumber1=1;
				SelectedNumbers=[1,2,3,4,5,6,7,8,9,10,11,12];
				Operators=['x'];
		        break;

		    default:
	        	break;
		}		
		operator=this.game.rnd.pick(Operators);
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
				number2 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
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
		    default:
	        	break;
		}		

		// inicializo las variables number y text
		number = 0;
		text.destroy();

		// muestro el valor de la nueva operación
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


		// añado un tween a text por duración de timeTo*1000
		textAlphaTween = this.game.add.tween(text).to( { alpha: 0 }, (timeTo*1000)+2000, Phaser.Easing.Linear.None, true);
		textTween = this.game.add.tween(text).to( { y: this.game.world.centerY+100 }, (timeTo*1000)+2000, Phaser.Easing.Linear.None, true);
		
		// elimino explicitamente el event questionTimer, permaneciendo el evento lifeTimer
		// si usara this.game.time.events.remove(); eliminaría todos los eventos, incluido el lifeTimer
		//this.game.time.events.remove(questionTimer);
		this.game.time.events.removeAll();

		// Si se acaba el tiempo reflejado en timeTo para cada pregunta hemos perdido (youfailed), y cambiamos de pregunta con "onemoretry"
		questionTimer = this.game.time.events.add(Phaser.Timer.SECOND * timeTo+2000, this.youfailed, this);
		star.destroy();
		star = this.game.add.sprite(264,72,"star");
		star.anchor.set(0.5);
		this.game.add.tween(star).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);
	},
	
	youwin: function () {
		// si habíamos parado el timer lo arrancamos de nuevo
		if (lifeTimer.paused) {
			lifeTimer.resume();
			//questionTimer.resume();
			go = true;
		}
		//reseteo la cuenta de reintentos de errores
		faultAccount=0;
		
		fx.play("charm");

		bonification = Math.round(this.game.time.events.duration/10);
		money = money + bonification;
		coinsText.text = money;
		totalMoney = totalMoney + bonification;
		totalCoinsText.text = totalMoney;
		
		bonificationText = this.game.add.text(this.game.world.centerX,this.game.world.centerY-50, bonification, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right", boundsAlignH: 'right',boundsAlignV: 'top' });
		bonificationText.anchor.set(0.5);
		bonificationText.stroke = "#167CD6"; //#d4e8Fa
		bonificationText.strokeThickness = 2;
		//bonificationText.setShadow(2, 2, "#167CD6", 2, true, true);
		//bonificationText.setShadow(2, 2, "#167CD6", 2);

		this.game.add.tween(bonificationText).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
		this.game.add.tween(bonificationText).to( { y: '-50' }, 1000, Phaser.Easing.Linear.None, true);
		
		//comienza la animación de la moneda
		coins.animations.play('cointwist', 30, true);
		//comienza el tween de la estrella
		var starTween = this.game.add.tween(star).to( { angle: 360 }, 1000, Phaser.Easing.Linear.None, true);
		//cuando acaba el tween de la estrella paro la animación de la moneda
		starTween.onComplete.add(this.stopCoinsAnimation, this);
		
		textresult.alpha = 1;
		this.game.add.tween(textresult).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
		textresult.style.fill="#19cf11";
		textresult.text = number;
		this.onemoretry();
		score += 1;
		scoreText.text = score;
		totalScore ++;
		totalScoreText.text = totalScore;

	},
	
	tryagain: function () {
		//borro el último valor de textresult
		this.deleteResult();
		//paramos el Timer
		lifeTimer.pause();
		//paramos el tween
		textAlphaTween.pause();
		textTween.pause();
		//paramos el avance del background
		go = false;
		//paramos el Timer
		//questionTimer.removeall();
	},
	
	youfailed: function () {
		//emitter sale siempre que falle
		emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 200);
		emitter.makeParticles('star');
		emitter.start(true, 4000, null, 30);
		//sonido de fallo
		fx.play("curse");
		
		// sólo cuando no estoy parado por haber fallado
		if (!lifeTimer.paused) {
			//resto una estrella al score
			if (score != 0) {
				score -= 1;
				scoreText.text = score;
				totalScore --;
				totalScoreText.text = totalScore;
			}
			//giro la estrella
			this.game.add.tween(star).to( { angle: -360 }, 1000, Phaser.Easing.Linear.None, true);
			//añado tween a textresult mostrando el número erroneo en rojo
			textresult.alpha = 1;
			this.game.add.tween(textresult).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
			textresult.style.fill="#E60026";
			textresult.text = number;
			//siguiente pregunta
			this.tryagain();
			//this.onemoretry();
		}
	},
	
	timeOver: function () {
		//paramos la musica
		//music.stop();
		//actualizamos marcadores
		//totalMoney = totalMoney + money;
		//totalScore = totalScore + score;
		if (score > 2) {
			fx.play("charm");
			localStorage.setItem("topTablesScore",Math.max(score,topScore));
			localStorage.setItem("topTablesMoney",Math.max(money,topMoney));
			// unlocked next level - como el array empieza en 0, el siguiente nivel es padlock[level] 
			//padlock_levels[level] = "button";
			//this.game.state.start("ShowResults",true,false,score,topScore,life);
			this.game.state.start("LevelComplete",true,false,score,topScore);
		} else {
			fx.play("fireball");
			localStorage.setItem("topTablesScore",Math.max(score,topScore));
			localStorage.setItem("topTablesMoney",Math.max(money,topMoney));
			this.game.state.start("LevelComplete",true,false,score,topScore);
		}	
	},

	stopCoinsAnimation: function() {
		coins.animations.stop(null, true);
	},
	
	update: function () {
		if ( go ) {
			background_sky.x = background_sky.x - 0.05;
			//background_clouds.x = background_clouds.x - 0.1;
	        for (var i=0; i<cloudsCount; i++) {
		       clouds[i].x = clouds[i].x - clouds[i].speed;
	        }
	        //background_cloud2.x = background_cloud2.x - 0.1;
	        //background_cloud3.x = background_cloud3.x - 0.125;
	    	//background_cloud4.x = background_cloud4.x - 0.15;
	        //background_cloud5.x = background_cloud5.x - 0.175;
	        background_hills1.x = background_hills1.x - 0.25;
	        background_hills2.x = background_hills2.x - 0.5;
	        background_hills3.x = background_hills3.x - 0.75;
	        background_hills4.x = background_hills4.x - 1;
		}
	},
	
	render: function () {
    	//this.game.debug.text("Time remaining: " + this.game.time.events.duration.toFixed(0), 32, 32);
	}
};