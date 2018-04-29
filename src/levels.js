var padlock_levels=[
"button_0stars","button_0stars","button_0stars","button_0stars",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock",
"button_0stars","padlock","padlock","padlock"
];
var timesTablesText=[1,2,3,4,5,6,7,8,9,10,11,12,"X"]
var page =["Easy","Medium","Hard"];
var pageNumber=0;
var levelTitleText;
var easyButton;
var hardButton;

var levels = function(game){};

levels.prototype = {
  	create: function(){
  		//  Modify the world and camera bounds
  		this.game.world.setBounds(-1000, -1000, 2000, 2000);
  		//añadimos el fondo. El escalado es manual.
  		background = this.game.add.image(0,0,"background");
  		background.scale.set(0.65);
  		//background.scale.set(0.56);
  		//tween to alpha para oscurecer gradualmente el fondo;
		this.game.add.tween(background).to( { alpha: 0.55 }, 1000, Phaser.Easing.Linear.None, true);

		//Headline: Page (Easy,Medium, Hard)
		this.showTitle();

		//botones de niveles
		this.showLevels();

		//botones previous, next, home y gear
		this.showButtons();
		
		//me situo en la pantalla en la que estaba
		this.game.camera.x = 320*pageNumber;
		
		if (pageNumber==0) easyButton.visible = false;
		if (pageNumber==2) hardButton.visible = false;
		
	},

	showTitle: function () {
		for (i = 0; i < 3; i++) {
			levelTitleText = this.game.add.text(160+(320*i),40, page[i] , { font: "bold 52px/50px Arial", fill: "#FFFFFF", align: "center" });
			levelTitleText.stroke = "#4adbff"; //#00ccff
			levelTitleText.strokeThickness = 14;
			levelTitleText.setShadow(4, 3, "#02b1dd", 2, true, true);
			levelTitleText.anchor.set(0.5);
		}
	},

	showLevels: function () {
		button = new Array();
		timesTablesText = new Array();
		var n=0;
		for (k = 0; k<3; k++) {
			for (i = 0; i < 5; i++) {
				l=(i+1)+(k*5);
				timesTablesText[l] = this.game.add.text(15+(320*k),i*70+120, l, { font: "bold 20px Arial", fill: "#F2F2F2", align: "center" });
				timesTablesText[l].anchor.set(0.5);
				for (j = 0; j < 4; j++) {
					button[n] = this.game.add.button(j*70+60+(320*k),i*70+120, padlock_levels[n], this.actionOnClick, this, 1, 0, 2);
					button[n].scale.set(0.75);
					button[n].anchor.set(0.50);
					button[n].valor = n+1;
					if (padlock_levels[n] !== "padlock") {
						var buttonText = this.game.add.text(j*70+60+(320*k),i*70+130, n+1, { font: "bold 18px Arial", fill: "#a9a9a9", align: "center" });
						buttonText.anchor.set(0.5);
					}
					n++;
				}
			}
		}
	},

	showButtons: function () {
		//botones previous y next
		easyButton = this.game.add.button(40,480,"button",this.previousPage,this,1,0,2,0);
		easyButton.fixedToCamera = true;
		easyButton.anchor.setTo(0.5,0.5);
		easyButton.scale.set(0.75);
		hardButton = this.game.add.button(280,480,"button",this.nextPage,this,1,0,2,0);
		hardButton.fixedToCamera = true;
		hardButton.anchor.setTo(0.5,0.5);
		hardButton.scale.set(0.75);
		//botones del centro (home y gear)
		var homeButton = this.game.add.button(120,480,"home",this.gameTitle,this,1,0,2,0);
		homeButton.fixedToCamera = true;
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(0.75);
		var gearButton = this.game.add.button(200,480,"settings",this.optionsGame,this,1,0,2,0);
		gearButton.fixedToCamera = true;
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(0.75);
	},
	
	actionOnClick: function (button) {
		if (button.key !== "padlock") {
			level = button.valor;
			this.game.world.setBounds(0,0,320,533);
			this.game.state.start("NewLevel");
		}
	},

	nextPage: function () {
		if (pageNumber<2) {
			if (pageNumber<1) hardButton.visible = true;
			else hardButton.visible = false;
			easyButton.visible = true;
			pageNumber++;
			this.game.add.tween(this.game.camera).to ( { x: 320*pageNumber }, 1500, Phaser.Easing.Bounce.Out, true, 300);
			//this.game.camera.x += 320;
		} 
	},

	previousPage: function () {
		if (pageNumber>0) {
			if (pageNumber>1) easyButton.visible = true;
			else easyButton.visible = false;
			hardButton.visible = true;
			pageNumber--;
			this.game.add.tween(this.game.camera).to ( { x: 320*pageNumber }, 1500, Phaser.Easing.Bounce.Out, true, 300);
			//this.game.camera.x -= 320;
		}
	},

	gameTitle: function(){
		this.game.world.setBounds(0,0,320,533);
		this.game.state.start("GameTitle");
	},
	
	optionsGame: function(){
		this.game.world.setBounds(0,0,320,533);
		this.game.state.start("GameOptions");
	},
	
	render: function () {
    	//this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}
};