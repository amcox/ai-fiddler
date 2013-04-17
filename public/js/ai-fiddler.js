//----------------------------------------------------------
//
//  AIBar
//
//  Click to toggle value between 0 and 1.

Tangle.classes.AIText = {

    initialize: function (element, options, tangle) {
    	this.tangle = tangle;
		},
		
		update: function (element, ai_all){
			element.setStyle("font-size", ai_all);
			element.innerHTML=ai_all;
		}
		
};

Tangle.classes.RedHundredPercent = {

    initialize: function (element, options, tangle) {
    	this.tangle = tangle;
		},
		
		update: function (element, value){
			element.innerHTML=value + "%";
			el = $(element);
			if (value < 100) {
				el.addClass("below100");
			}else{
				el.removeClass("below100");
			};
		}
		
};

Tangle.classes.AIBar = {
    initialize: function (element, options, tangle) {
    	this.tangle = tangle;
		},		
		update: function (element, ai_all, bonus){
			var ctx = element.getContext("2d");
			var multiple = 4;
			ctx.clearRect(0,0,600,75);
			// Bonnus point shaded region
			ctx.fillStyle="rgba(201, 201, 201, 0.5)";
			ctx.fillRect(ai_all*multiple,0,bonus*multiple,50);
			// AI line
			ctx.lineWidth = 1;
			ctx.strokeStyle="#000000";
			ctx.beginPath();
			ctx.moveTo(ai_all*multiple, 0);
			ctx.lineTo(ai_all*multiple, 50);
			ctx.stroke();
			// Bonus line
			ctx.strokeStyle="#878787";
			ctx.beginPath();
			ctx.moveTo((ai_all+bonus)*multiple, 0);
			ctx.lineTo((ai_all+bonus)*multiple, 50);
			ctx.stroke();
			// Bonus text
			ctx.fillStyle="#878787";
			ctx.font="10px Arial";
			ctx.fillText(sprintf("%.1f",(ai_all+bonus)),(ai_all+bonus)*multiple-13,49);
			// AI text
			ctx.fillStyle="#000000";
			ctx.font="20px Arial";
			ctx.fillText(sprintf("%.1f",ai_all),ai_all*multiple-20,70);
		}
		
};

drawAIBarBackground = function(el){
	var ctx = el.getContext("2d");
	var multiple = 4;
	ctx.fillStyle="#FFB3B3";
	ctx.fillRect(0,0,50*multiple,50);
	ctx.fillStyle="#FFE4B3";
	ctx.fillRect(50*multiple,0,70*multiple,50);
	ctx.fillStyle="#FFFFB3";
	ctx.fillRect(70*multiple,0,85*multiple,50);
	ctx.fillStyle="#BBFFB3";
	ctx.fillRect(85*multiple,0,100*multiple,50);
	ctx.fillStyle="#B3B3FF";
	ctx.fillRect(100*multiple,0,150*multiple,50);
}
jQuery(document).ready(function($) {
  drawAIBarBackground(document.getElementById("ai_chart_background"));
});


function setUpTangle () {

    var element = document.getElementById("ai");
    var tangle = new Tangle(element, {
        initialize: function () {
            this.adv_e = 1;
            this.mast_e = 6;
            this.basic_e = 36;
            this.ab_e = 32;
            this.unsat_e = 25;
            this.total_e = this.adv_e+this.mast_e+this.basic_e+this.ab_e+this.unsat_e;
            this.adv_m = 1;
            this.mast_m = 7;
            this.basic_m = 42;
            this.ab_m = 25;
            this.unsat_m = 25;
            this.total_m = this.adv_m+this.mast_m+this.basic_m+this.ab_m+this.unsat_m;
            this.adv_sc = 0;
            this.mast_sc = 7;
            this.basic_sc = 34;
            this.ab_sc = 38;
            this.unsat_sc = 21;
            this.total_sc = this.adv_sc+this.mast_sc+this.basic_sc+this.ab_sc+this.unsat_sc;
            this.adv_ss = 1;
            this.mast_ss = 8;
            this.basic_ss = 37;
            this.ab_ss = 29;
            this.unsat_ss = 25;
            this.total_ss = this.adv_ss+this.mast_ss+this.basic_ss+this.ab_ss+this.unsat_ss;
            this.bonus = 10;
            resetMax = function(subject, tang){
              var levels = ["adv", "mast", "basic", "ab", "unsat"];
              levels.each(function(level){
                  total_s = "total_" + subject
                  level_s = level + "_" + subject
                  new_max = 100 - (tang[total_s] - tang[level_s])
                  $("[data-var=" + level_s + "]").attr("data-max", new_max)
              });
            };
            resetMax("e", this);
            resetMax("m", this);
            resetMax("sc", this);
            resetMax("ss", this);
        },
        update: function () {
            this.total_e = this.adv_e+this.mast_e+this.basic_e+this.ab_e+this.unsat_e;
            this.ai_e = (this.adv_e*150 + this.mast_e*125 + this.basic_e*100)/this.total_e;
            
            this.total_m = this.adv_m+this.mast_m+this.basic_m+this.ab_m+this.unsat_m;
            this.ai_m = (this.adv_m*150 + this.mast_m*125 + this.basic_m*100)/this.total_m;
            
            this.total_sc = this.adv_sc+this.mast_sc+this.basic_sc+this.ab_sc+this.unsat_sc;
            this.ai_sc = (this.adv_sc*150 + this.mast_sc*125 + this.basic_sc*100)/this.total_sc;
            
            this.total_ss = this.adv_ss+this.mast_ss+this.basic_ss+this.ab_ss+this.unsat_ss;
            this.ai_ss = (this.adv_ss*150 + this.mast_ss*125 + this.basic_ss*100)/this.total_ss;
            
            this.total_all = this.total_e + this.total_m + this.total_sc + this.total_ss;
            this.ai_all = (this.ai_e*2 + this.ai_m*2 + this.ai_sc + this.ai_ss)/6;
            
            this.test_var = this["total_e"];
            
            resetMax = function(subject, tang){
              var levels = ["adv", "mast", "basic", "ab", "unsat"];
              levels.each(function(level){
                  total_s = "total_" + subject
                  level_s = level + "_" + subject
                  new_max = 100 - (tang[total_s] - tang[level_s])
                  $("[data-var=" + level_s + "]").attr("data-max", new_max)
              });
            };
            resetMax("e", this);
            resetMax("m", this);
            resetMax("sc", this);
            resetMax("ss", this);
        }
    });
}
$(document).ready(setUpTangle)