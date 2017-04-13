var preload = function(game){}

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

		this.game.load.image("background","assets/background1.jpeg");
		
		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("play","assets/play.png");
		this.game.load.image("play2","assets/play2.png");
		this.game.load.image("higher","assets/higher.png");
		this.game.load.image("lower","assets/lower.png");
		this.game.load.image("gameover","assets/gameover.png");
		this.game.load.image("star","assets/star2.png");
		this.game.load.image("gear","assets/gear.png");
		this.game.load.image("heart","assets/heart24x24.png");
		this.game.load.image("bigheart","assets/heart64x64.png");
		this.game.load.image("clock","assets/clock5.png");
		this.game.load.image("padlock","assets/padlock.png");
		this.game.load.audio("keysound","assets/p-ping.mp3");
		this.game.load.audio("music","assets/fantasy.mp3");		
		this.game.load.audio("sfx", [ "assets/magical_horror_audiosprite.mp3", "assets/magical_horror_audiosprite.ogg" ]);

	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}