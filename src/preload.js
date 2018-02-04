var preload = function(game){};

preload.prototype = {
	preload: function(){ 
		// show background image
		var background = this.game.add.image(-375,0,"background");
  		background.scale.setTo(0.56,0.56);

		// show loadingbar
        var loadingBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY*1.8,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        loadingBar.scale.setTo(2,2);
        this.load.setPreloadSprite(loadingBar);

		// load spritesheets
		// load sprites in TheGame
		this.game.load.spritesheet("coin","assets/coin.png",32,32);
		this.game.load.image("hills","assets/hills.png");
		this.game.load.image("star","assets/star2.png");
		this.game.load.image("heart","assets/heart24x24.png");
		this.game.load.image("bulb","assets/light-bulb-icon-36x36.png");
		// load sprites in ...
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
		// load sprites for TheRace
		this.game.load.image("hills_clouds","assets/Hills_Clouds.png");
		this.game.load.image("hills_sky","assets/Hills_Sky.png");
		this.game.load.image("hills1","assets/Hills_1.png");
		this.game.load.image("hills2","assets/Hills_2.png");
		this.game.load.image("hills3","assets/Hills_3.png");
		this.game.load.image("hills4","assets/Hills_4.png");
		this.game.load.image("cloud1","assets/Cloud1.png");
		this.game.load.image("cloud2","assets/Cloud2.png");
		this.game.load.image("cloud3","assets/Cloud3.png");
		this.game.load.image("cloud4","assets/Cloud4.png");
		this.game.load.image("cloud5","assets/Cloud5.png");
		this.game.load.image("cloud6","assets/Cloud6.png");		
		this.game.load.image("bigheart","assets/heart64x64.png");
		// load sprites for gameoptions
		this.game.load.image("clock","assets/clock5.png");
		this.game.load.spritesheet("music","assets/music4white.png",125,115);	
		
		//this.game.load.image("home","assets/Button_50.png");
		//this.game.load.image("replay","assets/Button_74.png");

		
		//this.game.load.image("gametitle","assets/gametitle.png");
		//this.game.load.image("play","assets/play.png");
		//this.game.load.image("play1","assets/play1.png");
		//this.game.load.image("settings","assets/settings.png");
		//this.game.load.image("home","assets/home.png");
		//this.game.load.image("higher","assets/higher.png");
		//this.game.load.image("lower","assets/lower.png");
		//this.game.load.image("gameover","assets/gameover.png");
		//this.game.load.image("gear","assets/gear.png");
		this.game.load.image("padlock","assets/padlock.png");
		this.game.load.audio("keysound","assets/p-ping.mp3");
		this.game.load.audio("music","assets/fantasy.mp3");		
		this.game.load.audio("sfx", [ "assets/magical_horror_audiosprite.mp3", "assets/magical_horror_audiosprite.ogg" ]);
		this.game.load.audio("paradise","assets/paradise.mp3");
		this.game.load.audio("correct","assets/correct.ogg");
		this.game.load.audio("wrong","assets/wrong.ogg");

	},
  	create: function(){
  		////volumen = 0.1;
		//titleMusic = this.game.add.audio('paradise',volumen,true,true);
		//music = this.game.add.audio('music',volumen,true,true);
		//titleMusic.play();
		this.game.state.start("GameTitle");
	}
}