var number=0;
var number1;
var number2;
//var maxnumber1=10;
var maxnumber2;
//var offsetnumber1=1;
var offsetnumber2=1;
var score;
var scoreText;
var timeTo=5;
var life=5;
var lifeText;
var questionTimer;
var lifeTimer;
//var volumen=1;
var level=1;
var text=["","","","","","","","","",""];
// textId marca el texto en el foco
var textId = 0;
var questionAnswered = false;
var timeIsUp = true;

var timesTables = function(game){};

timesTables.prototype = {
  	create: function(game){
  		//añadimos el fondo del juego. El escalado es manual.
  		var background = this.game.add.image(-375,0,"background");
  		background.scale.setTo(0.56,0.56);
  		
  		//definimos variables score, life, topScore
  		score = 0;
  		life = 50;
  		//level = 6;
  		topScore = localStorage.getItem("topTablesScore")==null?0:localStorage.getItem("topTablesScore");
		
		//mostramos life y score en la parte superior
		heart = this.game.add.sprite(32,32,"heart");
		heart.anchor.set(0.5);
		lifeText = game.add.text(64,32, life, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		lifeText.anchor.set(0.5);
		scoreText = game.add.text(296,32, score, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		scoreText.anchor.set(0.5);
		star = this.game.add.sprite(264,32,"star");
		star.anchor.set(0.5);
		
		// mostramos primera opeación aleatoria, añadiendo un degradado a medida que pasa el tiempo
		//text = game.add.text(game.world.centerX, game.world.centerY/2,number1 + operator + number2, { font: "75px Arial", fill: "#FFFFFF", align: "center" });
		//text.anchor.set(0.5);
		//game.add.tween(text).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);

		// llamamos a la función que calcula las operaciones aleatorias
		//this.onemoretry2();
		this.timesTablesQuestions();
		// Y muestra el texto en el foco
		this.newQuestionShowedUp();

		//comienza la cuenta atrás con el evento lifeTimer 	
		//lifeTimer = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.timerSecond, this);
		//comienza la cuenta atrás con el evento lifeTimer 	
		//creo mi propio Timer para que no se mezcle con el genérico
		lifeTimer = this.game.time.create(false);	
		//añadimos un evento cíclico
		lifeTimer.loop(Phaser.Timer.SECOND * 1, this.timerSecond, this);
    	//it won't start automatically, allowing you to hook it to button events and the like.
		lifeTimer.start();

		//mostramos el resultado inicializado a "" en el centro de la pantalla
		//textresult = game.add.text(game.world.centerX, game.world.centerY,"", { font: "95px Arial", fill: "#FFFFFF", align: "center" });
		//textresult.anchor.set(0.5);
	
		//mostramos el level
        focusText = game.add.text(this.game.world.centerX/2,64, textId , { font: "bold 16px Arial", fill: "#FFFFFF", align: "center" });
        focusText.anchor.set(0.5);

		//mostramos el botón de pausa
        pauseText = game.add.text(this.game.world.centerX,64, 'pause' , { font: "bold 16px Arial", fill: "#FFFFFF", align: "center" });
        pauseText.anchor.set(0.5);
        pauseText.inputEnabled = true;
        pauseText.events.onInputUp.add(this.pauseGame, this);

		//mostramos el volumen (no funciona bien)
		//volumenText = game.add.text(96,32, volumen, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		//volumenText.anchor.set(0.5);

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
		//music = this.game.add.audio('music',0.1,true,true);
		//music.play();
		////music.loopFull();
		//music.loop = true;
		
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
		life --;
		lifeText.text = life;
		//keysound.play();
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
		
	timesTablesQuestions: function () {
		// number1 es seleccionado aleatoriamente de entre los marcados en selectedNumbers
		number1 = this.game.rnd.pick(SelectedNumbers);
		//  hasta maxnumber2 preguntas lanzadas consecutivamente
		for (i = 0; i < maxnumber2; i++) {
			text1 = number1 + "x";
			text2 = i;
			text3 = "=" 
			text[i] = this.game.add.text(this.game.world.centerX, this.game.world.centerY*1.4,"", { font: "35px Arial", fill: "#FFFFFF", align: "center" });
			text[i].anchor.set(0.5);
			text[i].text = text1 + text2 + text3;
			text[i].alpha = 0;
			//text[0].fill = "#086A87";
		}
	},
	
	newQuestionShowedUp: function () {
		// inicializo questionAnswered a false
		questionAnswered = false;
		// añado un tween a text por duración de timeTo*1000
		textTween = this.game.add.tween(text[textId]).to( { alpha: 1 }, (timeTo*1000), Phaser.Easing.Linear.None, true);
		this.game.add.tween(text[textId]).to( { y: this.game.world.centerY+100-textId*30 }, (timeTo*1000), Phaser.Easing.Linear.None, true);
		textTween.onComplete.add(this.questionTimeIsUp, this);
	},
	
	// Función para cambiar el texto en el foco para responder
	changeTextTween: function () {
		// si acaba el tiempo cambio el foco
		if (timeIsUp) { 
			textId++;
			this.newQuestionShowedUp();
			focusText.text = textId;
			number=0;
		} else {
			// si ya he respondido reseteo questionAnswered para el onComplete
			//questionAnswered = false;
		}
	},

	clicked: function(button){
		button.fill = "#167CD6";
		button.events.onInputUp.add(this.clickedUp, button, this);
		number = (number*10) + button.valor;
		text[textId].text = text1 + textId + text3 + number;
		this.checkresult();
	},
	
	clickedUp: function(button){
		button.fill = "#94C7F4";
	},


	buttonsInputDissabled: function() {
		for (i = 0; i < 10; i++) {
			button[i].inputEnabled = false;
		}
	},
	
	buttonsInputEnabled: function () {
		for (i = 0; i < 10; i++) {
			button[i].inputEnabled = true;
		}
	},
	
	checkresult: function () {
		keysound.play();
		if (number1*textId == number) {
			this.youwin();
		} else if (number > 2*textId) {
			this.youFailed();	
		}
	},

	youwin: function () {
		fx.play("charm");
		score += 1;
		scoreText.text = score;
		text[textId].fill = "#FFFFFF";
		questionAnswered = true;
		timeIsUp = false;
		this.buttonsInputDissabled();
		this.changeTextTween();
		this.game.add.tween(star).to( { angle: 360 }, 1000, Phaser.Easing.Linear.None, true);
	},
	
	youFailed: function () {
		fx.play("curse");
		score -= 1;
		scoreText.text = score;
		text[textId].fill = "#FF0000";
		questionAnswered = true;
		timeIsUp = false;
		this.buttonsInputDissabled();
		this.changeTextTween();
		this.game.add.tween(star).to( { angle: -360 }, 1000, Phaser.Easing.Linear.None, true);
	},
	
	questionTimeIsUp: function () {
		if (!questionAnswered) {
			fx.play("curse");
			score -= 1;
			scoreText.text = score;
			text[textId].fill = "#FF0000";
		}
		timeIsUp = true;
		this.buttonsInputEnabled();
		this.changeTextTween();
		this.game.add.tween(star).to( { angle: -360 }, 1000, Phaser.Easing.Linear.None, true);
	},
	
	timeOver: function () {
		heart.destroy();
		heart = this.game.add.sprite(32,32,"heart");
		heart.anchor.set(0.5);	 
		heart.alpha = 0;
		heart.scale.set (0.5);
		tweenheart = this.game.add.tween(heart).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
		tweenheart1 = this.game.add.tween(heart.scale).to( { x: 1, y: 1 }, 200, Phaser.Easing.Linear.None, true, 200, 4, true);
		music.stop();
		if (score > 1) {
			fx.play("charm");
			localStorage.setItem("topTablesScore",Math.max(score,topScore));
			this.game.state.start("ShowResults",true,false,score,topScore,life);
		} else {
			fx.play("fireball");
			localStorage.setItem("topTablesScore",Math.max(score,topScore));
			this.game.state.start("GameOver",true,false,score,topScore);
		}	
	},
};