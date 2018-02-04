//var padlock_levels=["button_0stars","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock"];
var padlock_levels=[
"button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars",
"button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars","button_0stars",
"button_0stars","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock",
"padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock",
];
var page =["Easy","Medium","Hard"];
var pageNumber=0;
var levelTitleText;

var levels = function(game){};

levels.prototype = {
  	create: function(){
  		//añadimos el fondo. El escalado es manual.
  		var background = this.game.add.image(-30,0,"background");
  		background.scale.set(0.56);
  		//tween to alpha para oscurecer gradualmente el fondo;
		this.game.add.tween(background).to( { alpha: 0.55 }, 1000, Phaser.Easing.Linear.None, true);

		//Headline: Page (Easy,Medium, Hard)
		this.showTitle();

		//botones de niveles
		this.showLevels();

		//botones del centro (home y gear)
		var homeButton = this.game.add.button(this.game.world.centerX*0.75,this.game.world.centerY*1.83,"home",this.gameTitle,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(0.75);
		var gearButton = this.game.add.button(this.game.world.centerX*1.25,this.game.world.centerY*1.83,"settings",this.optionsGame,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(0.75);
		//botones previous y next
		this.showButtons();

	},

	showTitle: function () {
		levelTitleText = this.game.add.text(this.game.world.centerX,this.game.world.centerY-220, page[pageNumber] , { font: "bold 52px/50px Arial", fill: "#FFFFFF", align: "center" });
		levelTitleText.stroke = "#4adbff"; //#00ccff
		levelTitleText.strokeThickness = 14;
		levelTitleText.setShadow(4, 3, "#02b1dd", 2, true, true);
		levelTitleText.anchor.set(0.5);
	},

	showLevels: function () {
		button = new Array();
		var k=pageNumber*15;
		for (i = 0; i < 5; i++) {
			for (j = 0; j < 3; j++) {
				button[k] = this.game.add.button(j*70+95,i*70+130, padlock_levels[k], this.actionOnClick, this, 1, 0, 2);
				button[k].scale.set(0.75);
				button[k].anchor.set(0.50);
				button[k].valor = k+1;
				if (padlock_levels[k] !== "padlock") {
					var buttonText = this.game.add.text(j*70+95,i*70+140, k+1, { font: "bold 18px Arial", fill: "#a9a9a9", align: "center" });
					buttonText.anchor.set(0.5);
				}
				k++;
			}
		}
	},

	showButtons: function () {
		if (page[pageNumber] !== "Easy") {
			var easyButton = this.game.add.button(this.game.world.centerX*0.25,this.game.world.centerY*1.83,"button",this.previousPage,this,1,0,2);
			easyButton.anchor.setTo(0.5,0.5);
			easyButton.scale.set(0.75);
		}
		
		if (page[pageNumber] !== "Hard") {
		var hardButton = this.game.add.button(this.game.world.centerX*1.75,this.game.world.centerY*1.83,"button",this.nextPage,this,1,0,2);
		hardButton.anchor.setTo(0.5,0.5);
		hardButton.scale.set(0.75);
		}
	},
	
	actionOnClick: function (button) {
		if (button.key !== "padlock") {
			level = button.valor;
			this.game.state.start("NewLevel");
		}
	},

	nextPage: function () {
		if (pageNumber<2) pageNumber++;

		levelTitleText.text=page[pageNumber];

		//botones de niveles
		this.showLevels();
		//botones
		this.showButtons();
	},

	previousPage: function () {
		if (pageNumber>0) pageNumber--;
		
		levelTitleText.text=page[pageNumber];
		
		//botones de niveles
		this.showLevels();
		//botones
		this.showButtons();
	},

	gameTitle: function(){
		this.game.state.start("GameTitle");
	},
	
	optionsGame: function(){
		this.game.state.start("GameOptions");
	}
	
};