var number;
var number1;
var number2;
//var maxnumber1=10;
var maxnumber2=10;
//var offsetnumber1=1;
var offsetnumber2=1;
var score;
var money=0;
var result;
var scoreText;
var timeTo=5;
var life=5;
var lifeText;
var questionTimer;
var lifeTimer;
var operator="+";
//var SelectedNumbers=[1];
//var Operators=['+'];
var volumen=0;
var level = 1;
//var title = ["","Make 10", "Adittion \nwithin 10","Doubles to 10", "Halves to 10"];
//var mission = ["","You will be shown a number.\nHit the number that makes \nthe total up to ten.","You will be shown a sum.\nHit the number that has \nthe correct total.","Hit the number that is \ndouble the number shown","Hit the number that is \nhalf the number shown"];


var theRace = function(game){};

theRace.prototype = {
  	create: function(game){
  		//añadimos el fondo del juego. El escalado es manual.
  		//var background = this.game.add.image(0,0,"background");
  		//background.scale.setTo(0.25,0.25);

		//background hills
 		background = this.game.add.tileSprite(0,0,this.game.width*50,this.game.height*3,'hills');
  		background.scale.set(0.35);

  		//definimos variables score, life, topScore
  		score = 0;
  		life = 35;
  		money = 0;

  		topScore = localStorage.getItem("topTablesScore")==null?0:localStorage.getItem("topTablesScore");
		topMoney = localStorage.getItem("topTablesMoney")==null?0:localStorage.getItem("topTablesMoney");
		
		//mostramos lives, score y money en la parte superior
		heart = this.game.add.sprite(32,32,"bigheart");
		heart.anchor.set(0.5);
		heart.scale.set(0.75);
		lifeText = game.add.text(32,32, life, { font: "bold 20px Arial", fill: "#FFFFFF", align: "right" });
		lifeText.anchor.set(0.5);
		star = this.game.add.sprite(264,64,"star");
		star.anchor.set(0.5);
		scoreText = game.add.text(296,64, score, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		scoreText.anchor.set(0.5);
		coins = this.game.add.sprite(this.game.width - 94, 32, 'coin');
		coins.anchor.set(0.5);
		coins.animations.add('cointwist');
		coinsText = game.add.text(this.game.width-48,32, money, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right", boundsAlignH: 'right',boundsAlignV: 'top' });
		coinsText.anchor.set(0.5);
		
        //mostramos el botón de pausa
        pauseText = game.add.text(this.game.world.centerX/4,64, 'pause' , { font: "bold 16px Arial", fill: "#FFFFFF", align: "center" });
        pauseText.anchor.set(0.5);
        pauseText.inputEnabled = true;
        pauseText.events.onInputUp.add(this.pauseGame, this);

		// mostramos primera opeación aleatoria, añadiendo un degradado a medida que pasa el tiempo
		text = game.add.text(game.world.centerX, game.world.centerY/2,number1 + operator + number2, { font: "75px Arial", fill: "#FFFFFF", align: "center" });
		text.anchor.set(0.5);


		// llamamos a la función que calcula las operaciones aleatorias
		this.onemoretry2();

		//comienza la cuenta atrás con el evento lifeTimer 	
		lifeTimer = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.timerSecond, this);


		//mostramos el resultado inicializado a "" en el centro de la pantalla
		textresult = game.add.text(game.world.centerX, game.world.centerY,"", { font: "95px Arial", fill: "#FFFFFF", align: "center" });
		textresult.anchor.set(0.5);

		//mostramos el level
        var levelText = game.add.text(this.game.world.centerX,32, "level: "+level , { font: "bold 25px Arial", fill: "#FFFFFF", align: "center" });
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

		// Ponemos la música!
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
	
	timerSecond: function(){
		//resto un segundo
		life --;
		lifeText.text = life;
		// corazó palpitante
		heart.scale.set (0.5);
		//tweenheart = this.game.add.tween(heart).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
		tweenheart1 = this.game.add.tween(heart.scale).to( { x: 0.75, y: 0.75 }, 175, Phaser.Easing.Linear.None, true, 0, 2, true);
		
		//keysound.play();
		if (life==0) this.timeOver();
		else this.game.time.events.add(Phaser.Timer.SECOND * 1, this.timerSecond, this);
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
		button.events.onInputUp.add(this.clickedUp, button, this);
		number = (number*10) + button.valor;
		textresult.text = number;
		this.checkresult();
	},	
	
	clickedUp: function(button){
		button.fill = "#94C7F4";
	},

	checkresult: function () {
		keysound.play();
		if (number == result) {
			this.youwin();
		}
		else if (number > result) {
			textresult.text = result;
			this.youfailed();
		}
	},
	
	// Función que calcula las operaciones aleatoriamente de acuerdo a la configuración de gameoptions
	onemoretry: function () {
		var tweenFallingText = this.game.add.tween(text).to ( { y: +330 }, 2000, Phaser.Easing.Bounce.Out, true);
		tweenFallingText.onComplete.add(this.onemoretry2, this);
	},
	onemoretry2: function () {
		// variables de cada nivel: 3
		// El tiempo de cada nivel (life) se actualiza en el levelUp del showresults.js 
		switch(level) {
		    case 1: //make10
				maxnumber1=10; offsetnumber1=1;
				Operators=['makeN'];
		        break;
		    case 2: //within10
				maxnumber1=10; offsetnumber1=1;
				Operators=['withinN'];
		        break;
		    case 3: //doubles to 10
				maxnumber1=10; offsetnumber1=1;
				Operators=['double'];
		        break;
		    case 4: //halves to 10
				maxnumber1=10; offsetnumber1=1;
				Operators=['half'];
		        break;
		    case 5:
				maxnumber2=10; offsetnumber2=1;
				SelectedNumbers=[0,1,2,5];
				Operators=['+','-'];
		        break;
		    case 6:
				maxnumber2=15; offsetnumber2=1;
				SelectedNumbers=[0,1,2,3,4,5];
				Operators=['+','-','Serie'];
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
				number2 = Math.floor(Math.random()*(10-number1));
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
		    default:
	        	break;
		}		

		// inicializo las variables number y text
		number = 0;
		text.destroy();

		// muestro el valor de la nueva operación
		switch(operator) {
			case 'Serie':
				serieText = number1 + ',' + number2 + ',' + number3;
				text = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2,serieText, { font: "55px Arial", fill: "#FFFFFF", align: "center" });
				text.anchor.set(0.5);
				text.text = serieText + '...';
				break;
			case 'makeN':
				text1 = number1 + "+";
				text2 = "=" + maxnumber1;
				text = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2,text1 + '?' + text2, { font: "75px Arial", fill: "#FFFFFF", align: "center" });
				text.anchor.set(0.5);
				//text.text = number1 + operator + number2;				
				break;
			default:
				text1 = number1 + operator + number2 + "=";
				text2 = "";
				text = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2,number1 + operator + number2, { font: "75px Arial", fill: "#FFFFFF", align: "center" });
				text.anchor.set(0.5);
				text.text = text1 + text2;
				break;
		}	

		// añado un tween a text por duración de timeTo*1000
		this.game.add.tween(text).to( { alpha: 0 }, (timeTo*1000)+2000, Phaser.Easing.Linear.None, true);
		this.game.add.tween(text).to( { y: this.game.world.centerY+100 }, (timeTo*1000)+2000, Phaser.Easing.Linear.None, true);
		
		// elimino explicitamente el event questionTimer, permaneciendo el evento lifeTimer
		// si usara this.game.time.events.remove(); eliminaría todos los eventos, incluido el lifeTimer
		this.game.time.events.remove(questionTimer);

		// Si se acaba el tiempo reflejado en timeTo para cada pregunta, cambiamos de pregunta con "onemoretry"
		questionTimer = this.game.time.events.add(Phaser.Timer.SECOND * timeTo+2000, this.onemoretry, this);
		star.destroy();
		star = this.game.add.sprite(264,64,"star");
		star.anchor.set(0.5);
		this.game.add.tween(star).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);
	},
	youwin: function () {
		fx.play("charm");
		
		// calculo el tiempo restante para bonificarlo en money
		bonification = this.game.time.events.duration.toFixed(0);
		moneyTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 0.01, this.updateMoney, this);
		//money += bonification;
		//coinsText.text = money;
		//this.game.add.tween(coinsText).to( { text: money.toFixed(1) }, 1000, Phaser.Easing.Linear.None, true);
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

	},
	youfailed: function () {
		//emitter
		emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 200);
	    emitter.makeParticles('star');
	    emitter.start(true, 4000, null, 30);
		//sonido de fallo
		fx.play("curse");
		//resto una estrella al score
		if (score != 0) {
			score -= 1;
			scoreText.text = score;
		}
		//giro la estrella
		this.game.add.tween(star).to( { angle: -360 }, 1000, Phaser.Easing.Linear.None, true);
		//añado tween a textresult mostrando el número erroneo en rojo
		textresult.alpha = 1;
		this.game.add.tween(textresult).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
		textresult.style.fill="#E60026";
		textresult.text = number;
		//siguiente pregunta 
		this.onemoretry();
	},
	
	timeOver: function () {
		//paramos la musica
		music.stop();
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
	
	updateMoney: function () {
		money++;
		coinsText.text = money;
		bonification = bonification-10;
		if (bonification<0) {
			// elimino explicitamente el event moneyTimer, permaneciendo el resto como lifeTimer
			// si usara this.game.time.events.remove(); eliminaría todos los eventos, incluido el lifeTimer
			this.game.time.events.remove(moneyTimer);

		}
		
	},
	
	textResultStarts: function() {
		textresult.alpha = 1;
		textresult.text ='';
	},

	stopCoinsAnimation: function() {
		coins.animations.stop(null, true);
	},
	
	update: function () {
        background.x -= 1;
	},
	
	render: function () {
    	//this.game.debug.text("Time remaining: " + this.game.time.events.duration, 32, 32);
	}
};