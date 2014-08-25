$(document).ready(function() {
	$('.icon-with-tooltip').tooltip();

	$('.orange-bar').delay(100).animate({ width: ($('.business-card').outerWidth() + "px") }, 1500);

	// Preload invisible images for seamless transition
	var preloaded_jk = new Image(); preloaded_jk.src = "img/jk_icon_colour.png";
	var preloaded_ch = new Image(); preloaded_ch.src = "img/bicep_icon_colour.png";
	var preloaded_sc = new Image(); preloaded_sc.src = "img/scribboard_icon_colour.png";
	var preloaded_sq = new Image(); preloaded_sq.src = "img/squat_icon_colour.png";

	// I'm a programmer and I'm too lazy to manually write all the css
	// for the icon fade-colours, so we make the css dynamically
	makeIndividualIconHoverCSSBecauseIAmLazy();

});

var makeIndividualIconHoverCSSBecauseIAmLazy = function() {
	var iconStartColour = "#ddd";
	var animationName = "fadein";
	var duration = ".8s";
	var browserPrefixes = ["", "-webkit-", "-moz-", "-ms-"];
	var icons = [
		{name:"cv", colour:"#e18728"},
		{name:"in", colour:"#1e87be"},
		{name:"tw", colour:"#55acee"},
		{name:"fb", colour:"#43609c"},
		{name:"gh", colour:"#333333"},
		{name:"em", colour:"#cc181e"},

		{name:"jk", img:"jk_icon"},
		{name:"ch", img:"bicep_icon"},
		{name:"sc", img:"scribboard_icon"},
		{name:"sq", img:"squat_icon"}
	];

	var css = "";

	for(var i = 0; i < icons.length; i++) {
		var name = icons[i].name;
		
		var isImg = icons[i].hasOwnProperty("img");

		// First make the keyframes

		// Looks like this:
		// @-webkit-keyframes fadein-cv {
		// 	from {color: #ddd;}
		// 	to {color: #e18728;}
		// }

		for(var j = 0; j < browserPrefixes.length; j++) {
			var from = "";
			var to = "";
			if(isImg) {
				from = makeBackgroundImage(icons[i].img);
				to = makeBackgroundImage(icons[i].img + "_colour");
			} else {
				from = "color: " + iconStartColour;
				to = "color: " + icons[i].colour;
			}

			css += "@" + browserPrefixes[j] + "keyframes " + animationName + "-" + name + "{"; 
			css += "from {" + from + ";}";
			css += "to {" + to + ";}";
			css += "}\n";
		}

		// Then add the animation to the hover event

		// Looks like this:
		// #icon-cv:hover {
		// 	-webkit-animation: fadein-cv .8s;
		// 	color: #e18728;
		// }

		css += "#icon-" + name + ":hover {";
		for(var j = 0; j < browserPrefixes.length; j++) {
			css += browserPrefixes[j] + "animation: " + animationName + "-" + name + " " + duration + ";";
		}
		if(isImg) {
			css += makeBackgroundImage(icons[i].img + "_colour");
		} else {
			css += "color: " + icons[i].colour + ";";
		}
		css += "}\n";
	}

	makeCSS(css);
}

var makeCSS = function(css) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

var makeBackgroundImage = function(imgName) {
	return "background: url(img/" + imgName + ".png) center no-repeat;";
}