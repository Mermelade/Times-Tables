var number;
var number1;
var number2;
var result;
var maxnumber1=10;
var maxnumber2=10;
var offsetnumber1=1;
var offsetnumber2=1;
var score = 0;
var scoreText;
var coinsText;
var timeTo=5;
var money=0;
var lives=3;
var newgamelives=3;
//var operator="+";
//var volumen=1;
var pauseText;
var background;
var button0Text;var button1Text;var button2Text;var button3Text;var button4Text;
var button5Text;var button6Text;var button7Text;var button8Text;var button9Text;
// goals y goalstars
var goals;
var SelectedNumbers2;
var goalText = new Array();
var goalstar = new Array();

var theGame = function(game){};

theGame.prototype = {
  	create: function(game){
  		//añadimos el fondo del juego. El escalado es manual.
		background = this.game.add.tileSprite(0,0,this.game.width*50,this.game.height*3,'hills');
  		background.scale.set(0.35);
  		//bckgrnd = 'bckgrnd'+ Math.floor(Math.random()*41).toString();
		//background = this.game.add.tileSprite(0,0,this.game.width*50,this.game.height,bckgrnd);
  		//background.scale.set(6);

  		//definimos variables score, lives, topScore
  		score = 0;
  		money = 0;
  		lives = 0;
  		topScore = localStorage.getItem("topTablesScore")==null?0:localStorage.getItem("topTablesScore");
		topMoney = localStorage.getItem("topTablesMoney")==null?0:localStorage.getItem("topTablesMoney");
		//SelectedNumbers = [1];
		SelectedNumbers2 = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
		goals = 0;
		SelectedText ='';
		//mostramos lives, score y money en la parte superior

		//SelectedNumbers2 Tracker **borrar si funciona**
		for (var i = 0; i < SelectedNumbers2.length; i++) {
			SelectedText = SelectedText+SelectedNumbers2[i];
		}
		SelectedNumbers2Text = game.add.text(128,80, SelectedText, { font: "bold 14px Arial", fill: "#F2F2F2", align: "left" });
		SelectedNumbers2Text.anchor.set(0.5);

		heart = this.game.add.sprite(32,32,"heart");
		heart.anchor.set(0.5);
		livesText = game.add.text(64,32, lives, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		livesText.anchor.set(0.5);
		goalsText = game.add.text(128,32, goals, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		goalsText.anchor.set(0.5);
		star = this.game.add.sprite(264,64,"stars");
		star.frame = 1;
		star.anchor.set(0.5);
		scoreText = game.add.text(296,64, score, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right" });
		scoreText.anchor.set(0.5);
		coins = this.game.add.sprite(this.game.width - 132, 32, 'coin');
		coins.anchor.set(0.5);
		coins.animations.add('cointwist');
		coinsText = game.add.text(this.game.width-64,32, money, { font: "bold 25px Arial", fill: "#FFFFFF", align: "right", boundsAlignH: 'right',boundsAlignV: 'top' });
		coinsText.anchor.set(0.5);

		//mostramos el botón de pausa
        pauseText = game.add.text(game.world.centerX,game.world.centerY+64, 'pause' , { font: "bold 16px Arial", fill: "#2F950C", align: "center" });
        pauseText.anchor.set(0.5);
        pauseText.inputEnabled = true;
        pauseText.events.onInputUp.add(this.pauseGame, this, true);


		// mostramos primera opeación aleatoria, añadiendo un degradado
		text = game.add.text(game.world.centerX, game.world.centerY/2,number1 + "x" + number2, { font: "75px Arial", fill: "#94C7F4", align: "center" });
		text.anchor.set(0.5);
		game.add.tween(text).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);

		// llamamos a la función que calcula las operaciones aleatorias
		this.onemoretry();

		//situación objetivos
		for (var i = 1; i < 11; i++) {
			goalText[i] = game.add.text(game.world.centerX*1.5,game.world.centerY*0.65 + 20*i, number1 +"x" + i , { font: "bold 20px Arial", fill: "#FFFFFF", align: "right" });
			goalText[i].anchor.set(0.5);
			goalstar[i] = new Array();
			for (var j = 1; j < 4; j++) {
				goalstar[i][j] = this.game.add.sprite(game.world.centerX*1.6+15*j,game.world.centerY*0.65 + 20*i,"stars");
				goalstar[i][j].frame = 0;
				goalstar[i][j].scale.set(0.5);
				goalstar[i][j].anchor.set(0.5);	
			}
		}

		
		//mostramos el resultado inicializado a "" en el centro de la pantalla
		textresult = game.add.text(game.world.centerX, game.world.centerY,"", { font: "95px Arial", fill: "#FFFFFF", align: "center" });
		textresult.anchor.set(0.5);
		textresult.inputEnabled = true;
        textresult.events.onInputUp.add(this.deleteResult, this);


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

		number1 = this.game.rnd.pick(SelectedNumbers);
		number2 = this.game.rnd.pick(SelectedNumbers2);
		//number2 = Math.floor(Math.random()*maxnumber2+offsetnumber2);
        result = number1*number2;

		// inicializo las variables number, text
		number = 0;
		text.destroy();

		// muestro el valor de la nueva operación
		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY/2,number1 + "x" + number2, { font: "75px Arial", fill: "#167CD6", align: "center" });
        text.stroke = "#d4e8Fa";
	    text.strokeThickness = 14;
	    text.setShadow(2, 2, "#94C7F4", 2, true, true);
		text.anchor.set(0.5);

		// añado un tween a text por duración de timeTo*1000
		this.game.add.tween(text).to( { alpha: 0 }, timeTo*1000, Phaser.Easing.Linear.None, true);
		this.game.time.events.destroy();


		// Si se acaba el tiempo reflejado en timeTo perdemos "youfailed"
		this.game.time.events.add(Phaser.Timer.SECOND * timeTo, this.youfailed, this);
		this.game.time.events.start();

	},
	
	youwin: function () {
		// actualizo stars
		this.goalstarRotation();
		goalstar[number2][3].frame = 1;
		
		//borra la primera ocurrencia de un valor;
		this.removeItemFromArray(SelectedNumbers2,number2);
		
		//SelectedNumbers2 Tracker **borrar si funciona**
		SelectedText='';
		for (var i = 0; i < SelectedNumbers2.length; i++) {
			SelectedText = SelectedText+SelectedNumbers2[i];
		}
		SelectedNumbers2Text.text = SelectedText;

		// comprueba si ya has completado todas las estrellas
		if ((goalstar[number2][1].frame == 1) && (goalstar[number2][2].frame == 1)) {
			goals++;
			goalsText.text = goals;
			goalText[number2].fill = "#00F200";
			if (goals == 10) { 
				this.bckgndblack();
				music.stop();
				fx.play("fireball");
				localStorage.setItem("topTablesScore",Math.max(score,topScore));
				localStorage.setItem("topTablesMoney",Math.max(money,topMoney));
				this.game.state.start("GameOver",true,false,score,topScore);
			}
		}
		
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
		//SelectedNumbers2 Tracker **borrar si funciona**
		SelectedText='';
		for (var i = 0; i < SelectedNumbers2.length; i++) {
			SelectedText = SelectedText+SelectedNumbers2[i];
		}
		SelectedNumbers2Text.text = SelectedText;

		//emitter
		emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 200);
	    emitter.makeParticles('star');
	    emitter.start(true, 4000, null, 30);
		//resto una vida
		lives ++;
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
		//sounds spell and one more try
		fx.play("spell");
		this.onemoretry();
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
        background.x -= 0.5;
	},
	render: function () {
    	//this.game.debug.text('Time until event: ' + this.game.time.events.duration, 32, 32);
	}
	
};