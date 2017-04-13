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
var SelectedNumbers=[1,2,3];

var Plus=true;
var Minus=false;
var Times=false;
var Division=false;
//var maxnumber2=10;
var volumen=0;

var gameOptions = function(game){};

gameOptions.prototype = {
  	create: function(game){
		ButtonHeart = game.add.button(64,64,"bigheart",this.clickedheart,this);
		ButtonHeart.scale.setTo(0.4,0.4);
		ButtonClock = game.add.button(205,60,"clock",this.clickedclock,this);
		ButtonClock.scale.setTo(0.4,0.4);
		playButton = game.add.button(160,320,"play",this.playTheGame,this);
		musicButton = game.add.button(160,380,"music",this.musicVolume,this);
		ButtonClock.anchor.setTo(0.5,0.5);
		ButtonHeart.anchor.setTo(0.5,0.5);
		playButton.anchor.setTo(0.5,0.5);
		musicButton.anchor.setTo(0.5,0.5);
		musicButton.scale.setTo(0.4,0.4);
		textolives = game.add.text(128, 64,"1", { font: "Bold 55px Arial", fill: "#FFFFFF", align: "center" });
		textolives.anchor.set(0.5);
		texto = game.add.text(266, 64,"5", { font: "Bold 55px Arial", fill: "#FFFFFF", align: "center" });
		texto.anchor.set(0.5);
		texto.text = timeTo;

		threshold = game.add.sprite(maxnumber2+39, 130, 'heart');
		threshold.anchor.set(1);
		threshold.inputEnabled = true;
		//  enableDrag parameters = (lockCenter, bringToTop, pixelPerfect, alphaThreshold, boundsRect, boundsSprite)
		var rectangle = new Phaser.Rectangle(40,130,223,24);
		threshold.input.enableDrag(false,false,false,255,rectangle,null);
		textothreshold = game.add.text(275, 120, maxnumber2, { font: "Bold 30px Arial", fill: "#FFFFFF", align: "right" });
		textothreshold.anchor.set(0.5);
		threshold.events.onDragStop.add(this.onDragStop, this);
		//  Enable snapping. For the threshold sprite it will snap as its dragged around and on release.
		//  The snap is set to every 1x1 pixels.
		threshold.input.enableSnap(1 , 1, false, true);

		Button0 = game.add.button(0,152,"button0",this.clicked0,this,0,0,1);
		Button1 = game.add.button(64,152,"button1",this.clicked1,this,0,0,1);
		Button2 = game.add.button(128,152,"button2",this.clicked2,this,0,0,1);
		Button3 = game.add.button(192,152,"button3",this.clicked3,this,0,0,1);
		Button4 = game.add.button(256,152,"button4",this.clicked4,this,0,0,1);
		Button5 = game.add.button(0,216,"button5",this.clicked5,this,0,0,1);
		Button6 = game.add.button(64,216,"button6",this.clicked6,this,0,0,1);
		Button7 = game.add.button(128,216,"button7",this.clicked7,this,0,0,1);
		Button8 = game.add.button(192,216,"button8",this.clicked8,this,0,0,1);
		Button9 = game.add.button(256,216,"button9",this.clicked9,this,0,0,1);
		
		Buttonplus = game.add.button(32,416,"buttonplus",this.clickedplus,this,0,0,1);
		Buttonminus = game.add.button(96,416,"buttonminus",this.clickedminus,this,0,0,1);
		Buttontimes = game.add.button(160,416,"buttontimes",this.clickedtimes,this,0,0,1);
		Buttondivision = game.add.button(224,416,"buttondivision",this.clickeddivision,this,0,0,1);
		
		if (Plus) Buttonplus.setFrames(1,1,0); else Buttonplus.setFrames(0,0,1);
		if (Minus) Buttonminus.setFrames(1,1,0); else Buttonminus.setFrames(0,0,1);
		if (Times) Buttontimes.setFrames(1,1,0); else Buttontimes.setFrames(0,0,1);
		if (Division) Buttondivision.setFrames(1,1,0); else Buttondivision.setFrames(0,0,1);
		
		if (Zero) Button0.setFrames(1,1,0); else Button0.setFrames(0,0,1);
		if (One) Button1.setFrames(1,1,0); else Button1.setFrames(0,0,1);
		if (Two) Button2.setFrames(1,1,0); else Button2.setFrames(0,0,1);
		if (Three) Button3.setFrames(1,1,0); else Button3.setFrames(0,0,1);
		if (Four) Button4.setFrames(1,1,0); else Button4.setFrames(0,0,1);
		if (Five) Button5.setFrames(1,1,0); else Button5.setFrames(0,0,1);
		if (Six) Button6.setFrames(1,1,0); else Button6.setFrames(0,0,1);
		if (Seven) Button7.setFrames(1,1,0); else Button7.setFrames(0,0,1);
		if (Eight) Button8.setFrames(1,1,0); else Button8.setFrames(0,0,1);
		if (Nine) Button9.setFrames(1,1,0); else Button9.setFrames(0,0,1);
		
		if (newgamelives <= 0) {
				newgamelives = 1;
		}
		textolives.text = newgamelives;
		
		keysound = game.add.audio('keysound');
		keysound.volume = volumen;

	},
	onDragStop: function(){
		maxnumber2 = threshold.x - 39;
		textothreshold.text = maxnumber2;
	},
	clickedclock: function(){
		timeTo += 3;
		if (timeTo > 20) {
			timeTo = 5;
		};
		texto.text = timeTo;
		ButtonClock.scale.setTo(0.4+(timeTo-5)/30,0.4+(timeTo-5)/30);
	},
	clickedheart: function(){
		newgamelives += 1;
		if (newgamelives > 5) {
			newgamelives = 1;	
		};
		textolives.text = newgamelives;
		ButtonHeart.scale.setTo(0.4+(newgamelives)/10,0.4+(newgamelives)/10);
	},
	clicked0: function(){
		if (Zero) {
			Button0.setFrames(0,0,1);
			Zero = false;
		} else {
			Button0.setFrames(1,1,0);
			Zero = true;
		}
	},
	clicked1: function(){
		if (One) {
			Button1.setFrames(0,0,1);
			One = false;
		} else {
			Button1.setFrames(1,1,0);
			One = true;
		}
	},
	clicked2: function(){
		if (Two) {
			Button2.setFrames(0,0,1);
			Two = false;
		} else {
			Button2.setFrames(1,1,0);
			Two = true;
		}
	},
	clicked3: function(){
		if (Three) {
			Button3.setFrames(0,0,1);
			Three = false;
		} else {
			Button3.setFrames(1,1,0);
			Three = true;
		}
	},
	clicked4: function(){
		if (Four) {
			Button4.setFrames(0,0,1);
			Four = false;
		} else {
			Button4.setFrames(1,1,0);
			Four = true;
		}
	},	
	clicked5: function(){
		if (Five) {
			Button5.setFrames(0,0,1);
			Five = false;
		} else {
			Button5.setFrames(1,1,0);
			Five = true;
		}
	},
	clicked6: function(){
		if (Six) {
			Button6.setFrames(0,0,1);
			Six = false;
		} else {
			Button6.setFrames(1,1,0);
			Six = true;
		}
	},
	clicked7: function(){
		if (Seven) {
			Button7.setFrames(0,0,1);
			Seven = false;
		} else {
			Button7.setFrames(1,1,0);
			Seven = true;
		}
	},
	clicked8: function(){
		if (Eight) {
			Button8.setFrames(0,0,1);
			Eight = false;
		} else {
			Button8.setFrames(1,1,0);
			Eight = true;
		}
	},
	clicked9: function(){
		if (Nine) {
			Button9.setFrames(0,0,1);
			Nine = false;
		} else {
			Button9.setFrames(1,1,0);
			Nine = true;
		}
	},
	clickedplus: function(){
		if (Plus) {
			Buttonplus.setFrames(0,0,1);
			Plus=false;
		} else {
			Buttonplus.setFrames(1,1,0);
			Plus=true;
		}
	},
	clickedminus: function(){
		if (Minus) {
			Buttonminus.setFrames(0,0,1);
			Minus=false;
		} else {
			Buttonminus.setFrames(1,1,0);
			Minus=true;
		}
	},
	clickedtimes: function(){
		if (Buttontimes.frame==1) {
			Buttontimes.setFrames(1,1,0);
			Times=true;
		} else {
			Buttontimes.setFrames(0,0,1);
			Times=false;
		}
	},
	clickeddivision: function(){
		if (Buttondivision.frame==1) {
			Buttondivision.setFrames(1,1,0);
			Division=true;
		} else {
			Buttondivision.setFrames(0,0,1);
			Division=false;
		}
	},
	musicVolume: function(){
		if (musicButton.frame == 3) {
			musicButton.frame = 0;
			volumen = 0;
		}
		else {
			musicButton.frame++;
			volumen = volumen + 0,33;
			keysound.play();
			keysound.volume = volumen;
		}
	},
	playTheGame: function(){
		SelectedNumbers=[];
		if (One) SelectedNumbers.push(1);
		if (Two) SelectedNumbers.push(2);
		if (Three) SelectedNumbers.push(3);
		if (Four) SelectedNumbers.push(4);
		if (Five) SelectedNumbers.push(5);
		if (Six) SelectedNumbers.push(6);
		if (Seven) SelectedNumbers.push(7);
		if (Eight) SelectedNumbers.push(8);
		if (Nine) SelectedNumbers.push(9);
		if (Plus || Minus || Times || Division) this.game.state.start("TheGame");
	}
};

function render() {

    game.debug.spriteInfo(music, 125, 116);
}