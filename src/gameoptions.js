var Zero=false;
var One=false;
var Two=false;
var Three=false;
var Four=false;
var Five=false;
var Six=false;
var Seven=false;
var Eight=false;
var Nine=true;
var SelectedNumbers=[9];
var selectedOperators=['+'];
var operators = ['+','-','x','/'];
var Plus=true;
var Minus=false;
var Times=false;
var Division=false;
//var maxnumber2=10;
var volumen=0.33;
var hintEnabled=false;
var button=[];
var buttonOperator=[];
var cloudsCount = 1;


var gameOptions = function(game){};

gameOptions.prototype = {
  	create: function(game){
  		var background = this.game.add.image(-30,0,"background");
  		background.scale.setTo(0.56,0.56);
  		//tween to alpha para oscurecer gradualmente el fondo;
		this.game.add.tween(background).to( { alpha: 0.55 }, 1000, Phaser.Easing.Linear.None, true);

  		
  		// Botón de vidas
		ButtonHeart = game.add.button(32,44,"bigheart",this.clickedheart,this);
		ButtonHeart.scale.setTo(0.4,0.4);
		ButtonHeart.anchor.setTo(0.5,0.5);

		// Texto número de vidas
		textolives = game.add.text(70, 44,"1", { font: "Bold 55px Arial", fill: "#FFFFFF", align: "center" });
		textolives.anchor.set(0.5);

		// Botón de tiempo
		ButtonClock = game.add.button(112,40,"clock",this.clickedclock,this);
		ButtonClock.scale.setTo(0.4,0.4);
		ButtonClock.anchor.setTo(0.5,0.5);

		// Texto duración
		texto = game.add.text(160, 44,"5", { font: "Bold 55px Arial", fill: "#FFFFFF", align: "center" });
		texto.anchor.set(0.5);
		texto.text = timeTo;

  		// Botón de clouds
		ButtonCloud = game.add.button(238,44,"cloud1",this.clickedclouds,this);
		ButtonCloud.scale.setTo(0.1,0.1);
		ButtonCloud.anchor.setTo(0.5,0.5);

		// Texto clouds
		textoClouds = game.add.text(290, 44, cloudsCount, { font: "Bold 55px Arial", fill: "#FFFFFF", align: "center" });
		textoClouds.anchor.set(0.5);
		textoClouds.text = cloudsCount;


		// Draw a new line
		var graphics = game.add.graphics(0, 0);
	    graphics.lineStyle(4,0x167CD6);
    	graphics.moveTo(28,90);
    	graphics.lineTo(228,90);
		// Draw circles	
		graphics.drawCircle(28, 90, 2);
		graphics.drawCircle(228, 90, 2);

		// Texto banda threshold de números
		threshold = game.add.sprite(maxnumber2+39, 100, 'heart');
		threshold.anchor.set(1);
		threshold.inputEnabled = true;
		
		// enableDrag parameters = (lockCenter, bringToTop, pixelPerfect, alphaThreshold, boundsRect, boundsSprite)
		var rectangle = new Phaser.Rectangle(40,100,223,24);
		threshold.input.enableDrag(false,false,false,255,rectangle,null);
		textothreshold = game.add.text(275, 90, maxnumber2, { font: "Bold 30px Arial", fill: "#FFFFFF", align: "right" });
		textothreshold.anchor.set(0.5);
		threshold.events.onDragStop.add(this.onDragStop, this);
		// Enable snapping. For the threshold sprite it will snap as its dragged around and on release.
		// The snap is set to every 1x1 pixels.
		threshold.input.enableSnap(1 , 1, false, true);

		// mostramos los botones numéricos
		button = new Array();
		var k=0;
		for (var i = 1.5; i > 0; i--) {
			for (var j = 0.5; j < 5; j++) {
				// utilizamos el metodo .toString para que k recoja el valor "0" en lugar de ""
				button[k] = game.add.text(j*(this.game.world.width/5),(this.game.world.centerY)-((this.game.world.width/5)*i)-20, k.toString() , { font: "bold 64px Arial", fill: "#94C7F4", align: "center" });
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
		//marcamos el botón 9 por defecto
		//button[9].fill = "#167CD6";

		// Botones de operaciones (Operators)		
		buttonOperator = new Array();
		for (var i=0; i<4; i++) {
			buttonOperator[i] = game.add.text(64*i+60,280, operators[i] , { font: "bold 64px Courier", fill: "#94C7F4", align: "center" });
	        buttonOperator[i].stroke = "#d4e8Fa";
			buttonOperator[i].strokeThickness = 14;
			buttonOperator[i].setShadow(2, 2, "#167CD6", 2, true, true);
			buttonOperator[i].anchor.set(0.5);
			buttonOperator[i].valor = operators[i];
			buttonOperator[i].inputEnabled = true;
			buttonOperator[i].events.onInputDown.add(this.clicked, this);
		}
		//actualizamos las selecciones anteriores de button y button Operators
		this.updateSelected();


		// Botón de Hint
		hintButton = game.add.button(60,340,"bulb",this.hintClicked,this);
		hintButton.anchor.setTo(0.5,0.5);
		//hintButton.scale.setTo(0.4,0.4);
		
		// Texto Hint
		hintText = game.add.text(160,340, 'hint' , { font: "bold 22px Arial", fill: "#D53863", align: "center" });
        hintText.anchor.set(0.5);
        hintText.inputEnabled = true;
        hintText.events.onInputUp.add(this.hintClicked, this, true);

		// Botón de música
		musicButton = game.add.button(260,340,"music",this.musicVolume,this);
		musicButton.anchor.setTo(0.5,0.5);
		musicButton.scale.setTo(0.4,0.4);
		musicButton.tint = 0x167CD6;

		//Game Buttons
		var playButton = this.game.add.button(this.game.world.centerX/2,this.game.world.centerY*1.5,"play",this.playTheGame,this,1,0,2);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.set(0.75);
		//playButton.scale.set(1.5);
		var raceButton = this.game.add.button(this.game.world.centerX*1.5,this.game.world.centerY*1.5,"play",this.playTheRace,this,1,0,2);
		raceButton.anchor.setTo(0.5,0.5);
		raceButton.scale.set(0.75);
		//raceButton.scale.set(1.5);
		var timesTables = this.game.add.button(this.game.world.centerX,this.game.world.centerY*1.5,"play",this.playTimesTables,this,1,0,2);
		timesTables.anchor.setTo(0.5,0.5);
		timesTables.scale.set(0.75);
		//timesTables.scale.set(1.5);
		var homeButton = this.game.add.button(this.game.world.centerX*0.75,this.game.world.centerY*1.8,"home",this.levels,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(0.75);
		//homeButton.scale.set(1.5);
		var gearButton = this.game.add.button(this.game.world.centerX*1.25,this.game.world.centerY*1.8,"settings",this.optionsGame,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(0.75);
		//gearButton.scale.set(1.5);
		
		// Hint de acuerdo a la selección
		if (hintEnabled) hintText.fill = "#19E9A5";
		
		// newgamelives
		if (newgamelives <= 0) {
				newgamelives = 1;
		}
		textolives.text = newgamelives;
		
		// volumen del clik
		keysound = game.add.audio('keysound');
		keysound.volume = volumen;

	},
	
	clicked: function(button){
		if (button.fill == "#167CD6") button.fill = "#94C7F4";
		else button.fill = "#167CD6";
	},	
	
	onDragStop: function(){
		maxnumber2 = threshold.x - 39;
		textothreshold.text = maxnumber2;
	},
	hintClicked: function(){
		if (!hintEnabled) {
			hintEnabled=true;
			hintText.fill = "#19E9A5";
		}
		else {
			hintEnabled=false;
			hintText.fill = "#D53863";
        	//this.game.input.onDown.add(this.hintClicked, this);
		}
	},
	clickedclock: function(){
		timeTo += 3;
		if (timeTo > 20) {
			timeTo = 5;
		};
		texto.text = timeTo;
		ButtonClock.scale.setTo(0.4+(timeTo-5)/70,0.4+(timeTo-5)/70);
	},
	clickedheart: function(){
		newgamelives += 1;
		if (newgamelives > 5) {
			newgamelives = 1;	
		};
		textolives.text = newgamelives;
		ButtonHeart.scale.setTo(0.4+(newgamelives)/20,0.4+(newgamelives)/20);
	},
	clickedclouds: function(){
		cloudsCount += 1;
		if (cloudsCount > 5) {
			cloudsCount = 1;	
		};
		textoClouds.text = cloudsCount;
		ButtonCloud.scale.setTo(0.1+(cloudsCount)/80,0.1+(cloudsCount)/80);
	},
	
	musicVolume: function(){
		if (musicButton.frame == 3) {
			musicButton.frame = 0;
			volumen = 0;
		}
		else {
			musicButton.frame++;
			volumen = volumen + 0.33;
		}
		keysound.volume = volumen;
		keysound.play();
		titleMusic.volume = volumen;

	},

	updateSelected: function(){
		// actualizamos opciones mostradas con SelectedNumbers y selectedOperators
		for (var i=0; i<SelectedNumbers.length; i++) {
			button[SelectedNumbers[i]].fill="#167CD6";
		}
		for (var i=0; i<selectedOperators.length; i++) {
			switch(selectedOperators[i]) {
				case '+':
					buttonOperator[0].fill  = "#167CD6";
					break;
				case '-':
					buttonOperator[1].fill  = "#167CD6";
					break;
				case 'x':
					buttonOperator[2].fill  = "#167CD6";
					break;
				case '/':
					buttonOperator[3].fill  = "#167CD6";
					break;
				default:
	        		break;
			}
		}
	},
	
	updateOptions: function(){
		// antes de iniciar el state "TheGame" actualizamos SelectedNumbers y selectedOperators
		SelectedNumbers=[];
		for (var i=0; i<10; i++) {
			if (button[i].fill=="#167CD6" ) SelectedNumbers.push(i);
		}
		selectedOperators=[];
		for (var i=0; i<4; i++) {
			if (buttonOperator[i].fill == "#167CD6") selectedOperators.push(buttonOperator[i].valor);
		}
	},
	
	playTheGame: function(){
		//paramos la musica
		//titleMusic.stop();
		this.updateOptions();
		if (selectedOperators!==[]) this.game.state.start("TheGame");
	},
	
	playTimesTables: function(){
		//paramos la musica
		//titleMusic.stop();
		this.updateOptions();
		if (selectedOperators!==[]) this.game.state.start("TimesTables");
	},
	
	playTheRace: function(){
		//paramos la musica
		//titleMusic.stop();
		this.updateOptions();
		if (selectedOperators!==[]) this.game.state.start("TheRace");
	},

	levels: function(){
		this.updateOptions();
		if (selectedOperators!==[]) this.game.state.start("Levels");
	},	
	optionsGame: function(){
		this.updateOptions();
		if (selectedOperators!==[]) this.game.state.start("GameTitle");
	},

	render: function () {
	    //this.game.debug.geom(line);
	    //this.game.debug.lineInfo(line, 32, 32);
		//this.game.debug.textInfo(music, 125, 116);
	}
	
};

