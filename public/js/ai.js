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
