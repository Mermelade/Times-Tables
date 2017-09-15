var preload = function(game){};

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(160,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		//this.game.load.spritesheet("numbers","assets/numbers.png",100,100);
		//this.game.load.spritesheet("numbersx320","assets/numbersx320.png",64,64);
		this.game.load.spritesheet("button0","assets/button0.png",64,64);
		this.game.load.spritesheet("button1","assets/button1.png",64,64);
		this.game.load.spritesheet("button2","assets/button2.png",64,64);
		this.game.load.spritesheet("button3","assets/button3.png",64,64);		
		this.game.load.spritesheet("button4","assets/button4.png",64,64);
		this.game.load.spritesheet("button5","assets/button5.png",64,64);
		this.game.load.spritesheet("button6","assets/button6.png",64,64);
		this.game.load.spritesheet("button7","assets/button7.png",64,64);
		this.game.load.spritesheet("button8","assets/button8.png",64,64);		
		this.game.load.spritesheet("button9","assets/button9.png",64,64);
		this.game.load.spritesheet("buttonplus","assets/buttonplus.png",64,64);
		this.game.load.spritesheet("buttonminus","assets/buttonminus.png",64,64);		
		this.game.load.spritesheet("buttontimes","assets/buttontimes.png",64,64);
		this.game.load.spritesheet("buttondivision","assets/buttondivision.png",64,64);	
		this.game.load.spritesheet("music","assets/music4white.png",125,115);	
		this.game.load.spritesheet("coin","assets/coin.png",32,32);
		
		this.game.load.image("background","assets/background1island.png");
		this.game.load.image("hills","assets/hills.png");

		this.game.load.spritesheet("settings","assets/settings.png",91,95);
		this.game.load.spritesheet("play","assets/play.png",91,95);
		this.game.load.spritesheet("replay","assets/replay.png",91,95);
		this.game.load.spritesheet("home","assets/home.png",91,95);
		this.game.load.spritesheet("button","assets/button.png",91,95);
		this.game.load.spritesheet("button_0stars","assets/button_3stars.png",91,95);
		this.game.load.spritesheet("button_1star","assets/button_1yellowstars.png",91,95);
		this.game.load.spritesheet("button_2stars","assets/button_2yellowstars.png",91,95);
		this.game.load.spritesheet("button_3stars","assets/button_3yellowstars.png",91,95);
		this.game.load.image("level_end","assets/level_complete.png");
		this.game.load.image("red_ribbon","assets/red_ribbon.png");
		this.game.load.image("bigstar","assets/bigstar.png");
		this.game.load.image("level","assets/level.png");
		//this.game.load.image("home","assets/Button_50.png");
		//this.game.load.image("replay","assets/Button_74.png");

		
		this.game.load.image("gametitle","assets/gametitle.png");
		//this.game.load.image("play","assets/play.png");
		this.game.load.image("play1","assets/play1.png");
		//this.game.load.image("settings","assets/settings.png");
		//this.game.load.image("home","assets/home.png");
		this.game.load.image("higher","assets/higher.png");
		this.game.load.image("lower","assets/lower.png");
		this.game.load.image("gameover","assets/gameover.png");
		this.game.load.image("star","assets/star2.png");
		this.game.load.image("gear","assets/gear.png");
		this.game.load.image("heart","assets/heart24x24.png");
		this.game.load.image("bigheart","assets/heart64x64.png");
		this.game.load.image("clock","assets/clock5.png");
		this.game.load.image("bulb","assets/light-bulb-icon-36x36.png");
		this.game.load.image("padlock","assets/padlock.png");
		this.game.load.audio("keysound","assets/p-ping.mp3");
		this.game.load.audio("music","assets/fantasy.mp3");		
		this.game.load.audio("sfx", [ "assets/magical_horror_audiosprite.mp3", "assets/magical_horror_audiosprite.ogg" ]);

	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}