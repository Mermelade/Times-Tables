var number;
var number1;
var number2;
var result;
//var textHint;
var maxnumber1=10;
var maxnumber2=10;
var offsetnumber1=1;
var offsetnumber2=1;
var score = 0;
var scoreText;
var coinsText;
var timeTo=5;
var timeHint=3;
var money=0;
var lives=3;
var newgamelives=3;
//var operator="+";
//var volumen=1;
var pauseText;
var background;
var button0Text;var button1Text;var button2Text;var button3Text;var button4Text;
var button5Text;var button6Text;var button7Text;var button8Text;var button9Text;

var theGame = function(game){};

theGame.prototype = {
  	create: function(game){
  		//añadimos el fondo del juego. El escalado es manual.
		background = this.game.add.tileSprite(0,0,this.game.width*50,this.game.height*3,'hills');
  		background.scale.set(0.35);

  		//definimos variables score, lives, topScore
  		score = 0;
  		money = 0;
  		lives = newgamelives;
  		topScore = localStorage.getItem("topTablesScore")==null?0:localStorage.getItem("topTablesScore");
		topMoney = localStorage.getItem("topTablesMoney")==null?0:localStorage.getItem("topTablesMoney");

		//mostramos lives, score y money en la parte superior
		heart = this.game.add.sprite(32,32,"heart");
		heart.anchor.set(0.5);
		livesText = game.add.text(64,32, lives, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		livesText.anchor.set(0.5);
		star = this.game.add.sprite(264,64,"star");
		star.anchor.set(0.5);
		scoreText = game.add.text(296,64, score, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		scoreText.anchor.set(0.5);
		coins = this.game.add.sprite(this.game.width - 132, 32, 'coin');
		coins.anchor.set(0.5);
		coins.animations.add('cointwist');
		coinsText = game.add.text(this.game.width-64,32, money, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right", boundsAlignH: 'right',boundsAlignV: 'top' });
		coinsText.anchor.set(0.5);


		//mostramos bombilla para hints
		if (hintEnabled) {
			//bulb = this.game.add.sprite(280,80,"bulb");
			bulb = this.game.add.button(32,80,"bulb",this.showHint,this,0,0,1,0);
			bulb.anchor.set(0.5);
			bulb.visible = false;
		}
		
		//mostramos el botón de pausa
        pauseText = game.add.text(game.world.centerX,game.world.centerY+64, 'pause' , { font: "bold 16px Arial", fill: "#2F950C", align: "center" });
        pauseText.anchor.set(0.5);
        pauseText.inputEnabled = true;
        pauseText.events.onInputUp.add(this.pauseGame, this, true);


		// mostramos primera opeación aleatoria, añadiendo un degradado
		text = game.add.text(game.world.centerX, game.world.centerY/2,number1 + operator + number2, { font: "75px Arial", fill: "#94C7F4", align: "center" });
		text.anchor.set(0.5);
		game.add.tween(text).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);

		//mostramos una "pista" cuando el tiempo se acabe
		textHint = game.add.text(game.world.centerX, game.world.centerY, result , { font: "45px Arial", fill: "#F2F2F2", align: "center" });
		textHint.anchor.set(0.5);

		// llamamos a la función que calcula las operaciones aleatorias
		this.onemoretry();
		
		//mostramos el resultado inicializado a "" en el centro de la pantalla
		textresult = game.add.text(game.world.centerX, game.world.centerY,"", { font: "95px Arial", fill: "#FFFFFF", align: "center" });
		textresult.anchor.set(0.5);
		textresult.inputEnabled = true;
        textresult.events.onInputUp.add(this.deleteResult, this);

		//mostramos los operadores seleccionados en gameoptions
		for (i = 0; i < selectedOperators.length+1; i++) {
			switch(selectedOperators[i]) {
			    case '+':
			        plusText = game.add.text(96,32, " + ", { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
			        plusText.anchor.set(0.5);
			        break;
			    case '-':
			        minusText = game.add.text(112,32, " - ", { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
			        minusText.anchor.set(0.5);
			        break;
			    case 'x':
			        timesText = game.add.text(128,32, " x ", { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
			        timesText.anchor.set(0.5);
			        break;
			    case '/':
			        divisionText = game.add.text(144,32, " / ", { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
			        divisionText.anchor.set(0.5);
			        break;
			    default:
		        	break;
			}
		}

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

		// Si se acaba el tiempo reflejado en timeTo perdemos "youfailed"
		this.game.time.events.add(Phaser.Timer.SECOND * timeTo, this.youfailed, this);
		
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
		keysound.volume = 0.01;

	},
		
	pauseGame: function(){
		if (this.game.paused) {
			this.game.paused=false;
			pauseText.fill = "#2F950C";
		}
		else {
			this.game.paused=true;
        	pauseText.fill = "#7CE459";
        	game.input.onDown.add(this.pauseGame, this);
		}
	},

	deleteResult: function(){
		number = 0;
		textresult.text = "";
	},
	
	showHint: function() {
		if (hintEnabled) { 
			textHint.text = result; 
			this.game.add.tween(textHint).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
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
		//selecciono aleatoriamente un tipo de operación entre las posibles
		operator=this.game.rnd.pick(selectedOperators);
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
		    default:
	        	break;
		}

		// inicializo las variables number, text, textHint y bulb
		number = 0;
		text.destroy();
		textHint.destroy();
		if (hintEnabled) {
			bulb.visible = false;
		}
		
		// muestro el valor de la nueva operación
		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2,number1 + operator + number2, { font: "75px Arial", fill: "#167CD6", align: "center" });
        text.stroke = "#d4e8Fa";
	    text.strokeThickness = 14;
	    text.setShadow(2, 2, "#94C7F4", 2, true, true);
		text.anchor.set(0.5);
		text.text = number1 + operator + number2;
		//mostramos una "pista" cuando el tiempo se acabe
		textHint = this.game.add.text(this.game.world.centerX, this.game.world.centerY, result , { font: "45px Arial", fill: "#F2F2F2", align: "center" });
		textHint.anchor.set(0.5);
		textHint.text = "";

		// añado un tween a text por duración de timeTo*1000
		this.game.add.tween(text).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);
		this.game.time.events.destroy();

		// Si se acerca el final del tiempo mostramos la bombilla del hint
		if (hintEnabled) {
			this.game.time.events.add(Phaser.Timer.SECOND * timeHint, this.bulbVisible, this);
		}	

		// Si se acaba el tiempo reflejado en timeTo perdemos "youfailed"
		this.game.time.events.add(Phaser.Timer.SECOND * timeTo, this.youfailed, this);
		this.game.time.events.start();

	},
	
	bulbVisible: function () {
		if (hintEnabled) {
			bulb.visible = true;
			bulb.scale.set (0);
			this.game.add.tween(bulb.scale).to( { x: 1, y: 1 }, 150, Phaser.Easing.Elastic.None, true, 150, 4, true);
		}	
	},
	
	youwin: function () {
		fx.play("charm");
		money += this.game.time.events.duration;
		this.onemoretry();
		score += 1;
		scoreText.text = score;
		// revisar aqui
		coinsText.text = money;
		//comienza la animación de la moneda
		coins.animations.play('cointwist', 30, true);
		//comienza el tween de la estrella
		var starTween = this.game.add.tween(star).to( { angle: 360 }, 1000, Phaser.Easing.Linear.None, true);
		//cuando acaba el tween de la estrella paro la animación de la moneda
		starTween.onComplete.add(this.stopCoinsAnimation, this);
		
		// añado un tween a textResult para que desaparezca por duración de 500
		var tweenTextResult = this.game.add.tween(textresult).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
		tweenTextResult.onComplete.add(this.textResultStarts, this);
	},
	youfailed: function () {
		//emitter
		emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 200);
	    emitter.makeParticles('star');
	    emitter.start(true, 4000, null, 30);
		//resto una vida
		lives -=1;
		livesText.text = lives;
		//bckgnd.backgroundColor = '#ef3d45';
		heart.destroy();
		heart = this.game.add.sprite(32,32,"heart");
		heart.anchor.set(0.5);	 
		heart.alpha = 0;
		heart.scale.set (0.5);
		tweenheart = this.game.add.tween(heart).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
		tweenheart1 = this.game.add.tween(heart.scale).to( { x: 1, y: 1 }, 200, Phaser.Easing.Linear.None, true, 200, 4, true);
		// añado un tween a textResult para que desaparezca por duración de 500
		var tweenTextResult = this.game.add.tween(textresult).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
		tweenTextResult.onComplete.add(this.textResultStarts, this);
		if (lives <= 0) {
			this.bckgndblack();
			music.stop();
			fx.play("fireball");
			localStorage.setItem("topTablesScore",Math.max(score,topScore));
			localStorage.setItem("topTablesMoney",Math.max(money,topMoney));
			this.game.state.start("GameOver",true,false,score,topScore);
		} else {
			fx.play("spell");
			this.onemoretry();
		}
	},
	textResultStarts: function() {
		textresult.alpha = 1;
		textresult.text ='';
	},
	stopCoinsAnimation: function() {
		coins.animations.stop(null, true);
	},
	
	bckgndblack: function() {
		bckgnd.backgroundColor = '#000000';
	},
	update: function () {
        background.x -= 1;
	},
	render: function () {
    	//this.game.debug.text('Time until event: ' + this.game.time.events.duration, 32, 32);
	}
	
};