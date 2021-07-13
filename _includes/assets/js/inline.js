/*!
 * Parallaxify.js v0.0.3 * http://hwthorn.github.io/parallaxify * Copyright 2016, Felix Pflaum * Released under the MIT license * http://hwthorn.mit-license.org */
!function(a,b,c,d){function s(b,c){this.element=b,this.options=a.extend({},g,c),this._defaults=g,this._name=e,this.init()}var e="parallaxify",f=30,g={positionProperty:"position",horizontalParallax:!0,verticalParallax:!0,parallaxBackgrounds:!0,parallaxElements:!0,responsive:!1,useMouseMove:!0,useGyroscope:!0,alphaFilter:.9,motionType:"natural",mouseMotionType:"gaussian",inputPriority:"mouse",motionAngleX:80,motionAngleY:80,adjustBasePosition:!0,alphaPosition:.05},h={position:{setLeft:function(a,b){a.css("left",b)},setTop:function(a,b){a.css("top",b)}},transform:{setPosition:function(a,b,c,d,e){a[0].style[n]="translate3d("+(b-c)+"px, "+(d-e)+"px, 0)"}}},i=function(a,b){return 1/(1+Math.exp(-(.07056*b*(3^a))-1.5976*b*a))},j=function(a,b,c){return null===b?a:("undefined"==typeof c&&(c=.5),c*a+(1-c)*b)},k=[],l={linear:function(a,b){return a<=-b?1:a>=b?-1:-a/b},natural:function(a,b){return a<=-b?1:a>=b?-1:(k["n"+b]===d&&(k["n"+b]=Math.tan(.01745*b)),-Math.tan(.01745*a)/k["n"+b])},performance:function(a,b){return a<=-b?1:a>=b?-1:(k["p"+b]===d&&(k["p"+b]=b/90+4.2*Math.pow(b/90,7)),-(a/90+4.2*Math.pow(a/90,7))/k["p"+b])},gaussian:function(a,b){return 1-2*i(a/90,135/b)}},m=function(){var e,b=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,c=a("script")[0].style,d="";for(e in c)if(b.test(e)){d=e.match(b)[0];break}return"WebkitOpacity"in c&&(d="Webkit"),"KhtmlOpacity"in c&&(d="Khtml"),function(a){return d+(d.length>0?a.charAt(0).toUpperCase()+a.slice(1):a)}}(),n=m("transform"),o=a("<div />",{style:"background:#fff"}).css("background-position-x")!==d,p=o?function(a,b,c){a.css({"background-position-x":b,"background-position-y":c})}:function(a,b,c){a.css("background-position",b+" "+c)},q=o?function(a){return[a.css("background-position-x"),a.css("background-position-y")]}:function(a){return a.css("background-position").split(" ")},r=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||b.oRequestAnimationFrame||b.msRequestAnimationFrame||function(a){setTimeout(a,1e3/f)};s.prototype={init:function(){this.options.name=e+"_"+Math.floor(1e9*Math.random()),this.tilt={beta:0,gamma:0},this._defineElements(),this._defineGetters(),this._defineSetters(),this._detectMobile(),this._detectMotionType(),this._detectViewport(),this._handleWindowLoadAndResize(),this.refresh({firstLoad:!0}),this._startAnimation()},_defineElements:function(){this.$element=a(this.element===c.body||this.element===b?"body":this.element),this.$viewportElement=a(b)},_defineGetters:function(){var a=this,b=l[a.options.motionType],c=l[a.options.mouseMotionType];this._getMoveHorizontal=function(){if(this.useMouseMove&&null!==this.clientX&&this.clientX!==this.oldClientX)return c(this.options.motionAngleX*(1-2*this.clientX/this.viewportWidth),this.options.motionAngleX);if(this.useSensor&&null!==this.beta&&null!==this.gamma){var a=this.tilt;return this.viewportLandscape?this.viewportFlipped?b(-a.beta,this.options.motionAngleX):b(a.beta,this.options.motionAngleX):this.viewportFlipped?b(-a.gamma,this.options.motionAngleX):b(a.gamma,this.options.motionAngleX)}return this.useSensor=!1,c(this.options.motionAngleX*(1-2*this.oldClientX/this.viewportWidth),this.options.motionAngleX)},this._getMoveVertical=function(){if(this.options.useMouseMove&&null!==this.clientY&&this.clientY!==this.oldClientY)return c(this.options.motionAngleY*(1-2*this.clientY/this.viewportHeight),this.options.motionAngleY);if(this.useSensor&&null!==this.beta&&null!==this.gamma){var a=this.tilt;return this.viewportLandscape?this.viewportFlipped?b(-a.gamma,this.options.motionAngleY):b(a.gamma,this.options.motionAngleY):this.viewportFlipped?b(-a.beta,this.options.motionAngleY):b(a.beta,this.options.motionAngleY)}return this.useSensor=!1,c(this.options.motionAngleY*(1-2*this.oldClientY/this.viewportHeight),this.options.motionAngleY)}},_defineSetters:function(){var a=this,b=h[a.options.positionProperty];this._setPosition=b.setPosition||function(c,d,e,f,g){a.options.horizontalParallax&&b.setLeft(c,d,e),a.options.verticalParallax&&b.setTop(c,f,g)}},refresh:function(c){c&&c.firstLoad||this._reset(),this._findElements(),this._findBackgrounds(),c&&c.firstLoad&&/WebKit/.test(navigator.userAgent)&&a(b).on("load",function(){var b=a("body");oldLeft=b.scrollLeft(),oldTop=b.scrollTop(),b.scrollLeft(oldLeft+1),b.scrollTop(oldTop+1),b.scrollLeft(oldLeft),b.scrollTop(oldTop)})},_detectViewport:function(){this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.useSensor&&(this.viewportFlipped=180===b.orientation,this.viewportLandscape=90===Math.abs(b.orientation))},_detectMobile:function(){var a=navigator.userAgent||navigator.vendor||b.opera;this.isMobile=/(bb\d+|meego).+mobile|android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|playbook|plucker|pocket|psp|series(4|6)0|silk|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))},_detectMotionType:function(){this.useSensor=!1,this.useSensorWebkit=!1,this.useSensorMoz=!1,this.useMouseMove=!1,this.options.useGyroscope&&(this.isMobile||"gyroscope"===this.options.inputPriority)&&(this.useSensorWebkit=b.DeviceOrientationEvent!==d,this.useSensorMoz=b.OrientationEvent!==d,this.useSensor=this.useSensorWebkit||this.useSensorMoz),this.options.useMouseMove&&!this.isMobile&&(this.useMouseMove=this.$viewportElement.mousemove!==d)},_findElements:function(){var b=this;if(this.elements!==d)for(var c=this.elements.length-1;c>=0;c--)this.elements[c].$element.data("parallaxify-ElementIsActive",d);this.elements=[],this.options.parallaxElements&&this.$element.find("[data-parallaxify-range],[data-parallaxify-range-x],[data-parallaxify-range-y]").each(function(c){var e=a(this);if(e.data("parallaxify-ElementIsActive")){if(e.data("parallaxify-ElementIsActive")!==this)return}else e.data("parallaxify-ElementIsActive",this);e.data("parralaxify-originalLeft")?(e.css("left",e.data("parallaxify-originalLeft")),e.css("top",e.data("parallaxify-originalTop"))):(e.data("parallaxify-originalLeft",e.css("left")),e.data("parallaxify-originalTop",e.css("top"))),b.elements.push({$element:e,originalPositionLeft:e.position().left,originalPositionTop:e.position().top,parallaxDistanceX:e.data("parallaxify-range-x")!==d?e.data("parallaxify-range-x"):e.data("parallaxify-range")!==d?e.data("parallaxify-range"):0,parallaxDistanceY:e.data("parallaxify-range-y")!==d?e.data("parallaxify-range-y"):e.data("parallaxify-range")!==d?e.data("parallaxify-range"):0,width:e.outerWidth(!0),height:e.outerHeight(!0)})})},_findBackgrounds:function(){var c,b=this;this.backgrounds=[],this.options.parallaxBackgrounds&&(c=this.$element.find("[data-parallaxify-background-range],[data-parallaxify-background-range-x],[data-parallaxify-background-range-y]"),(this.$element.data("parallaxify-background-range")||this.$element.data("parallaxify-background-range-x")||this.$element.data("parallaxify-background-range-y"))&&(c=c.add(this.$element)),c.each(function(){var c=a(this),e=q(c);if(c.data("parallaxify-backgroundIsActive")){if(c.data("parallaxify-backgroundIsActive")!==this)return}else c.data("parallaxify-backgroundIsActive",this);c.data("parralaxify-backgroundOriginalLeft")?p(c,c.data("parallaxify-backgroundOriginalLeft"),c.data("parallaxify-backgroundOriginalTop")):(c.data("parallaxify-backgroundOriginalLeft",e[0]),c.data("parallaxify-backgroundOriginalTop",e[1])),b.backgrounds.push({$element:c,originalValueLeft:e[0],originalValueTop:e[1],originalBackgroundPositionLeft:isNaN(parseInt(e[0],10))?0:parseInt(e[0],10),originalBackgroundPositionTop:isNaN(parseInt(e[1],10))?0:parseInt(e[1],10),originalPositionLeft:c.position().left,originalPositionTop:c.position().top,parallaxDistanceX:c.data("parallaxify-background-range-x")!==d?c.data("parallaxify-background-range-x"):c.data("parallaxify-background-range")!==d?c.data("parallaxify-background-range"):0,parallaxDistanceY:c.data("parallaxify-background-range-y")!==d?c.data("parallaxify-background-range-y"):c.data("parallaxify-background-range")!==d?c.data("parallaxify-background-range"):0})}))},_reset:function(){var a,b,c,d,e;for(e=this.elements.length-1;e>=0;e--)a=this.elements[e],b=a.$element.data("parallaxify-originalLeft"),c=a.$element.data("parallaxify-originalTop"),this._setPosition(a.$element,b,b,c,c),a.$element.data("parallaxify-originalLeft",null).data("parallaxify-originalLeft",null).data("parallaxify-elementIsActive",null).data("parallaxify-backgroundIsActive",null);for(e=this.backgrounds.length-1;e>=0;e--)d=this.backgrounds[e],d.$element.data("parallaxify-backgroundOriginalLeft",null).data("parallaxify-backgroundOriginalTop",null).data("parallaxify-backgroundIsActive",null),p(d.$element,d.originalValueLeft,d.originalValueTop)},destroy:function(){this._reset(),this.useMouseMove&&this.$viewportElement.unbind("mousemove."+this.name),this.useSensorWebkit&&b.removeEventListener("deviceorientation",this._handleSensorWebkit,!1),this.useSensorMoz&&b.removeEventListener("MozOrientation",this._handleSensorMoz,!1),a(b).unbind("load."+this.name).unbind("resize."+this.name).unbind("orientationchange."+this.name)},_processSensorData:function(){if(this.useSensor){var a=this.beta,b=this.gamma,c=0,e=0;a>90&&(a-=180),b>180&&(b-=360),this.initialBeta===d&&null!==a&&(this.initialBeta=a,this.useSensor&&"gyroscope"===this.options.inputPriority&&(this.useMouseMove=!1,this.useMouseMove&&this.$viewportElement.unbind("mousemove."+this.name))),this.initialGamma===d&&null!==b&&(this.initialGamma=b,this.useSensor&&"gyroscope"===this.options.inputPriority&&(this.useMouseMove=!1,this.useMouseMove&&this.$viewportElement.unbind("mousemove."+this.name))),this.options.adjustBasePosition&&this.initialGamma!==d&&this.initialBeta!==d&&(b-this.initialGamma<-180?this.initialGamma=j(b+360,this.initialGamma,this.options.alphaPosition):b-this.initialGamma>180?this.initialGamma=j(b-360,this.initialGamma,this.options.alphaPosition):this.initialGamma=j(b,this.initialGamma,this.options.alphaPosition),a-this.initialBeta<-90?this.initialBeta=j(a+180,this.initialBeta,this.options.alphaPosition):a-this.initialBeta>90?this.initialBeta=j(a-180,this.initialBeta,this.options.alphaPosition):this.initialBeta=j(a,this.initialBeta,this.options.alphaPosition)),c=this.initialBeta!==d?a-this.initialBeta:a,e=this.initialGamma!==d?b-this.initialGamma:b,c>100?c-=180:c<-100&&(c+=180),e>200?e-=360:e<-200&&(e+=360),c=j(c,this.tilt.beta,this.options.alphaFilter),e=j(e,this.tilt.gamma,this.options.alphaFilter),this.tilt.beta=c,this.tilt.gamma=e}},_repositionElements:function(){var c,d,e,f,g,h,i,a=this._getMoveHorizontal(),b=this._getMoveVertical();if(this.currentMoveHorizontal!==a||this.currentMoveVertical!==b||this.currentWidth!==this.viewportWidth||this.currentHeight!==this.viewportHeight){for(this.currentMoveHorizontal=a,this.currentMoveVertical=b,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight,i=this.elements.length-1;i>=0;i--)c=this.elements[i],g=this.options.horizontalParallax?Math.floor(a*c.parallaxDistanceX/2)+c.originalPositionLeft:c.originalPositionLeft,h=this.options.verticalParallax?Math.floor(b*c.parallaxDistanceY/2)+c.originalPositionTop:c.originalPositionTop,this._setPosition(c.$element,g,c.originalPositionLeft,h,c.originalPositionTop);for(i=this.backgrounds.length-1;i>=0;i--)d=this.backgrounds[i],e=this.options.horizontalParallax?Math.floor(a*d.parallaxDistanceX/2)+d.originalBackgroundPositionLeft+"px":d.originalValueLeft,f=this.options.verticalParallax?Math.floor(b*d.parallaxDistanceY/2)+d.originalBackgroundPositionTop+"px":d.originalValueTop,p(d.$element,e,f)}},_handleWindowLoadAndResize:function(){var c=this,d=a(b);c.options.responsive&&d.bind("load."+this.name,function(){c.refresh()}),d.bind("resize."+this.name,function(){c._detectViewport(),c.options.responsive&&c.refresh()}),d.bind("orientationchange."+this.name,function(){c._detectViewport(),c.options.responsive&&c.refresh()})},_startAnimation:function(){var a=this,c=!1;this.beta=0,this.gamma=0,this.clientX=this.oldClientX=Math.round(a.viewportWidth/2),this.clientY=this.oldClientY=Math.round(a.viewportHeight/2);var e=function(){a._processSensorData(),a._repositionElements(),c=!1},f=function(){c||(r(e),c=!0)};this._handleSensorWebkit=function(b){a.gamma=b.gamma,a.beta=b.beta,f()},this._handleSensorMoz=function(b){a.gamma=180*b.x,a.beta=b.y*-90,f()},this._handleMouseMove=function(b){a.oldClientX=a.clientX,a.oldClientY=a.clientY,b.clientX!==d?a.clientX=b.clientX:a.clientX=b.pageX,b.clientY!==d?a.clientY=b.clientY:a.clientY=b.pageY,f()},this.useSensorWebkit?b.addEventListener("deviceorientation",a._handleSensorWebkit,!1):this.useSensorMoz&&b.addEventListener("MozOrientation",a._handleSensorMoz,!1),this.useMouseMove&&this.$viewportElement.bind("mousemove."+this.name,a._handleMouseMove),f()}},a.fn[e]=function(b){var c=arguments;return b===d||"object"==typeof b?this.each(function(){a.data(this,"plugin_"+e)||a.data(this,"plugin_"+e,new s(this,b))}):"string"==typeof b&&"_"!==b[0]&&"init"!==b?this.each(function(){var d=a.data(this,"plugin_"+e);d instanceof s&&"function"==typeof d[b]&&d[b].apply(d,Array.prototype.slice.call(c,1)),"destroy"===b&&a.data(this,"plugin_"+e,null)}):void 0},a[e]=function(c){var d=a(b);return d[e].apply(d,Array.prototype.slice.call(arguments,0))},a[e].positionProperty=h,a[e].motionType=l,b[e]=s}(jQuery,this,document);

////////////////////////////////
/* - SHAPE PARALLAX EFFECTS - */
////////////////////////////////

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
$.parallaxify({
  // enable parallax effect for horizontal, vertical or both directions
  horizontalParallax: true,
  verticalParallax: true,

  // enable or disable parallax effect for elements or backgrounds
  parallaxBackgrounds: true,
  parallaxElements: true,

  // set which positioning property is to be used
  // options include 'position' or 'transform' using css transformations
  //positionProperty: 'position',
  positionProperty: 'transform',

  // enable for responsive layouts
  // (upon orientation changes or window resizing element positions are reevaluated
  responsive: true,

  // enable or disable mouse or gyroscope data as input for the plugin
  useMouseMove: true,
  useGyroscope: true,

  // use a Low Pass Filter to smooth sensor readings (1 = no filter)
  alphaFilter: 0.9,

  // set which motion type algorithm is to be used
  // options include 'natural', 'linear', 'gaussian', or 'performance'
  motionType: 'natural',
  mouseMotionType: 'gaussian',

// define which sensor input has priority over the other
// options are either 'mouse' or 'gyroscope'
inputPriority: 'mouse',

  // define the delta angle (0 < motionAngle < 90)
  // that is used to render max parallax in this direction
  motionAngleX: 80,
  motionAngleY: 80,

  // enable of adjustment of base position (using a Low Pass Filter)
  // (adapting to device usage while plugin is running)
  adjustBasePosition: true,
  // alpha for Low Pass Filter used to adjust average position
  alphaPosition: 0.05,
});

/////////////////////////////
/* - WORD SWAP ANIMATION - */
/////////////////////////////
jQuery(document).ready(function($){
	//set animation timing
	var animationDelay = 2500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect
		revealDuration = 600,
		revealAnimationDelay = 1500;

	initHeadline();


	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.listen-title.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.listen-title'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);

			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.listen-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')){
				var spanWrapper = headline.find('.listen-words-wrapper'),
					newWidth = spanWrapper.width() + 0
				spanWrapper.css('width', newWidth);
			/*} else if (!headline.hasClass('type') ) {
				//assign to .listen-words-wrapper the width of its longest word
				var words = headline.find('.listen-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.listen-words-wrapper').css('width', width);*/
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);

		if($word.parents('.listen-title').hasClass('type')) {
			var parentSpan = $word.parent('.listen-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');
			setTimeout(function(){
				parentSpan.removeClass('selected');
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

		} else if($word.parents('.listen-title').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.listen-title').hasClass('clip')) {
			$word.parents('.listen-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.listen-title').hasClass('loading-bar')){
			$word.parents('.listen-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.listen-words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if($word.parents('.listen-title').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.listen-title').hasClass('clip')) {
			$word.parents('.listen-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay);
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');

		if(!$letter.is(':last-child')) {
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
		} else if($bool) {
		 	setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		}
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');

		if(!$letter.is(':last-child')) {
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration);
		} else {
			if($word.parents('.listen-title').hasClass('type')) { setTimeout(function(){ $word.parents('.listen-words-wrapper').addClass('waiting'); }, 200);}
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function takePrev($word) {
		return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
});

//////////////////////////
/* - HEADER ANIMATION - */
//////////////////////////

gsap.defaults({
  ease: "none"
  //duration: 1
});

var header = document.querySelector(".header");
var logo = document.querySelector(".logo");
var logoLink = document.querySelector(".logo-link");
//var deltaHeight = logo.offsetHeight - header.offsetHeight;
var deltaHeight = logo.offsetHeight - header.offsetHeight;

var fsize1 = 115;
var fsize2 = 160;

var rect1 = logoLink.getBoundingClientRect();
var rect2 = logo.getBoundingClientRect();

var scale = fsize1 / fsize2;
var x = -50;
//var y = 214 - 285;
//var y = rect1 - rect2;
//var y = deltaHeight - rect2.bottom;
var y = -50;

var headerAnimation = gsap.timeline({ paused: true })
//headerAnimation.from(header,  1, { y: 0 }, 0)
//headerAnimation.to(header,  1, { y: -deltaHeight + 20 }, 0)
headerAnimation.from(logo, { scale: 1, x: 0, y: 0 }, 0)
//headerAnimation.to(logo, 1, { scale: scale, x: x, y: deltaHeight + y }, 0)
headerAnimation.to(logo, 1, { scale: scale, x: x, y: y }, 0)

var progress  = 0;
var requestId = null;
var reversed  = true;

update();
window.addEventListener("scroll", requestUpdate);

function requestUpdate() {
  if (!requestId) {
    requestId = requestAnimationFrame(update);
  }
}

function update() {

  var scroll = window.pageYOffset;

  if (scroll < deltaHeight) {
    progress = scroll < 0 ? 0 : scroll / deltaHeight;
    reversed = true;
  } else {
    progress = 1;
    reversed = false;
  }

  headerAnimation.progress(progress);
  requestId = null;
}

let body = document.body;

gsap.to("body", {
  scrollTrigger: {
    trigger: "body",
    start: "top 25%",
    end: "75% 100%",
    scrub: 0,
    onUpdate: (self) => {
      body.style.setProperty("--progress", self.progress);
    },
    //markers: true
  }
});

function refresh() {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 2500);
}

window.addEventListener("resize", refresh);

//////////////////////////////
/* - MOOD PLAYLIST SELECT - */
//////////////////////////////

if( $('body').hasClass('home') ){
  var Select_List_Data = {
    'choices': { // name of associated select list
      // names match option values in controlling select list
      hold: {
        text: '❓'
      },
      morning: {
        text: ['❓', '🎹', '🎛️', '🎼', '🎵', '🎷','🎚️','🍃'],
        value: ['0', 'piano', 'lofi', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
          },
      evening: {
        text: ['❓', '🎹', '🎛️', '🎼', '🎵', '🎷','🎚️','🍃'],
        value: ['0', 'piano', 'lofi', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
          },
      sleep: {
        text: ['❓', '🎹', '⬜', '🎼', '🎵', '🎷','🎚️','🍃'],
        value: ['0', 'piano', 'noise', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
          },
      focus: {
        text: ['❓', '🎹', '🎛️', '⬜', '🎼', '🎵', '🎷','🎚️'],
        value: ['0', 'piano', 'lofi', 'noise', 'classical', 'acoustic', 'jazz', 'electronic']
          },
      relax: {
        text: ['❓', '🎹', '🎛️', '🎼', '🎵', '🎷','🎚️','🍃'],
        value: ['0', 'piano', 'lofi', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
          },
      cooking: {
        text: ['❓', '🎹', '🎛️', '🎼', '🎵', '🎷','🎚️'],
        value: ['0', 'piano', 'lofi', 'classical', 'acoustic', 'jazz', 'electronic']
          },
      meditation: {
        text: ['❓', '🎹', '🎛️', '⬜', '🎼', '🎵', '🎷','🎚️','🍃'],
        value: ['0', 'piano', 'lofi', 'noise', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
          }
      }
  };

  function removeAllOptions(sel, removeGrp) {
      var len, groups, par;
      if (removeGrp) {
          groups = sel.getElementsByTagName('optgroup');
          len = groups.length;
          for (var i=len; i; i--) {
              sel.removeChild( groups[i-1] );
          }
      }

      len = sel.options.length;
      for (var i=len; i; i--) {
          par = sel.options[i-1].parentNode;
          par.removeChild( sel.options[i-1] );
      }
  }

  function appendDataToSelect(sel, obj) {
      var f = document.createDocumentFragment();
      var labels = [], group, opts;

      function addOptions(obj) {
          var f = document.createDocumentFragment();
          var o;

          for (var i=0, len=obj.text.length; i<len; i++) {
              o = document.createElement('option');
              o.appendChild( document.createTextNode( obj.text[i] ) );

              if ( obj.value ) {
                  o.value = obj.value[i];
              }

              f.appendChild(o);
          }
          return f;
      }

      if ( obj.text ) {
          opts = addOptions(obj);
          f.appendChild(opts);
      } else {
          for ( var prop in obj ) {
              if ( obj.hasOwnProperty(prop) ) {
                  labels.push(prop);
              }
          }

          for (var i=0, len=labels.length; i<len; i++) {
              group = document.createElement('optgroup');
              group.label = labels[i];
              f.appendChild(group);
              opts = addOptions(obj[ labels[i] ] );
              group.appendChild(opts);
          }
      }
      sel.appendChild(f);
  }

  document.forms['plForm'].elements['category'].onchange = function(e) {
      var relName = 'choices';
      var relList = this.form.elements[ relName ];
      var obj = Select_List_Data[ relName ][ this.value ];
      removeAllOptions(relList, true);
      appendDataToSelect(relList, obj);
  };

  (function() {

      var form = document.forms['plForm'];
      var sel = form.elements['category'];
      sel.selectedIndex = 0;
      var relName = 'choices';
      var rel = form.elements[ relName ];
      var data = Select_List_Data[ relName ][ sel.value ];

      appendDataToSelect(rel, data);

  }());

  $( "form" ).submit(function( event ) {
    //console.log( $( this ).serializeArray() );
    event.preventDefault();
  });

  $( "#choices" )
    .change(function() {
      var str = "";
      $( "select option:selected" ).each(function() {
        str += $( this ).text() + " ";
      });
      $( "div" ).text( str );
    var fields = $( "form" ).serializeArray();
      $( "div" ).empty();
      var morning = 0
      var evening = 0
      var sleep = 0
      var focus = 0
      var relax = 0
      var cooking = 0
      var meditate = 0
      var piano = 0
      var lofi = 0
      var noise = 0
      var classic = 0
      var acoustic = 0
      var jazz = 0
      var electronic = 0
      var nature = 0
      jQuery.each( fields, function( i, field ) {
        //$( "div" ).append( field.value + " " );

        if (field.value == "morning") { morning = true }
        if (field.value == "evening") { evening = true }
        if (field.value == "sleep") { sleep = true }
        if (field.value == "focus") { focus = true }
        if (field.value == "relax") { relax = true }
        if (field.value == "cooking") { cooking = true }
        if (field.value == "meditation") { meditate = true }
        if (field.value == "piano") { piano = true }
        if (field.value == "lofi") { lofi = true }
        if (field.value == "noise") { noise = true }
        if (field.value == "classical") { classic = true }
        if (field.value == "acoustic") { acoustic = true }
        if (field.value == "jazz") { jazz = true }
        if (field.value == "electronic") { electronic = true }
        if (field.value == "nature") { nature = true }

              //Morning Piano
        if ((morning == true) && (piano == true)) {
          //$( "span" ).text( "Match ☕🎹 Morning Piano" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/4uKuvvMIp02dkJySji7Add?si=LH6ZFLXXRLCr4mwT8ctfRQ" target="_blank">☕🎹</a>');
          return;
        }

        //Morning Lofi
        if ((morning == true) && (lofi == true)) {
          //$( "span" ).text( "Match Morning Lofi" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/4vFrDonS8GZop4WenI9xf2?si=AVaAJ5VmSr2LKXFbUqwRJg" target="_blank">☕🎛️</a>');
          return;
        }

        //Morning Classical
        if ((morning == true) && (classic == true)) {
          //$( "span" ).text( "Match Morning Classical" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/5nJ0JPYiA6ArTbRd8QRqbW?si=RoxGcSb1QLeKA4UdJqAecg" target="_blank">☕🎼</a>');
          return;
        }

        //Morning Acoustic
        if ((morning == true) && (acoustic == true)) {
          //$( "span" ).text( "Match Morning Acoustic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/24M61a0YyLiqnKPisC9XTa?si=zP36n7BpRn2f9T-Mz4_72g" target="_blank">☕🎵</a>');
          return;
        }

        //Morning Jazz
        if ((morning == true) && (jazz == true)) {
          //$( "span" ).text( "Match Morning Jazz" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/19kt9zTTngQyErMQ7mGb5O?si=LFSCfNI9TlqzN8PChcuu9g" target="_blank">☕🎷</a>');
          return;
        }

        //Morning Electronic
        if ((morning == true) && (electronic == true)) {
          //$( "span" ).text( "Match Morning Electronic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/0MZcueIpEnbgl7CFQh04my?si=OhGJ57NxQU6hYb2RE2co1A" target="_blank">☕🎚️</a>');
          return;
        }

        //Morning Nature
        if ((morning == true) && (nature == true)) {
          //$( "span" ).text( "Match Morning Nature" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/7ljmzKm7siQSKF5xDhxrMQ?si=Zq59cp78SgGe9ZPmWwKb8Q" target="_blank">☕🍃</a>');
          return;
        }
        //evening Piano
        if ((evening == true) && (piano == true)) {
          //$( "span" ).text( "Match ☕🎹 evening Piano" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/4sjMQVuhQBgDuv1ORKCQE0?si=kZ4p9POyQ-a_Mh9WdE8WDw" target="_blank">🌆🎹</a>');
          return;
        }

        //evening Lofi
        if ((evening == true) && (lofi == true)) {
          //$( "span" ).text( "Match evening Lofi" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/2dPR6WDlNXGuGQSI8pz2Ro?si=bdDBgCjLRrCPfPkv9OKyyA" target="_blank">🌆🎛️</a>');
          return;
        }

        //evening Classical
        if ((evening == true) && (classic == true)) {
          //$( "span" ).text( "Match evening Classical" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/75Wqs0JumMbH2LC3iC1RHJ?si=JrfesioHTWy9PP3NWtuHUQ" target="_blank">🌆🎼</a>');
          return;
        }

        //evening Acoustic
        if ((evening == true) && (acoustic == true)) {
          //$( "span" ).text( "Match evening Acoustic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/6T5yjTG9miqPUUcSdSKdUW?si=S_1ZtQijSL62sL8YZ0Sj-g" target="_blank">🌆🎵</a>');
          return;
        }

        //evening Jazz
        if ((evening == true) && (jazz == true)) {
          //$( "span" ).text( "Match evening Jazz" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/2aAYyH5Ry9AKDR1jdkxrwa?si=_CRyG5uASiqm1pc6QhasIg" target="_blank">🌆🎷</a>');
          return;
        }

        //evening Electronic
        if ((evening == true) && (electronic == true)) {
          //$( "span" ).text( "Match evening Electronic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/3P7XRYHw9B7c4Fk88gtO0D?si=y9honWzJTAO8_ChLiN-ylg" target="_blank">🌆🎚️</a>');
          return;
        }

        //evening Nature
        if ((evening == true) && (nature == true)) {
          //$( "span" ).text( "Match evening Nature" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/2gD7o0nDrIfg4ygFMRlFoL?si=BVht3_CLQnakQjDwaIW-OQ" target="_blank">🌆🍃</a>');
          return;
        }

        //sleep Piano
        if ((sleep == true) && (piano == true)) {
          //$( "span" ).text( "Match ☕🎹 sleep Piano" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/0qL8FFKv7EzKqJi9XeFROb?si=TNKiqL9lRBW-772tBfQCgA" target="_blank">💤🎹</a>');
          return;
        }

        //sleep noise
        if ((sleep == true) && (noise == true)) {
          //$( "span" ).text( "Match sleep noise" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/6PgjFCYoZPQZMpKMBZlyx5?si=N8Dv6ZQVQEGNnTMDkte_cQ" target="_blank">💤⬜</a>');
          return;
        }

        //sleep Classical
        if ((sleep == true) && (classic == true)) {
          //$( "span" ).text( "Match sleep Classical" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/6SPT0xLAvGhPomqilJVvE9?si=9GgplFNwTd-a-SaiH0DL9w" target="_blank">💤🎼</a>');
          return;
        }

        //sleep Acoustic
        if ((sleep == true) && (acoustic == true)) {
          //$( "span" ).text( "Match sleep Acoustic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/22PGBkwN821RPJyWGEjf2D?si=NbuYojehRl27kcjnqSXS7A" target="_blank">💤🎵</a>');
          return;
        }

        //sleep Jazz
        if ((sleep == true) && (jazz == true)) {
          //$( "span" ).text( "Match sleep Jazz" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/0MYJYuXxmEXKijFK2KtME3?si=k7IZ0a48T6CJR-lwdAoXWQ" target="_blank">💤🎷</a>');
          return;
        }

        //sleep Electronic
        if ((sleep == true) && (electronic == true)) {
          //$( "span" ).text( "Match sleep Electronic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/789DBgO0aJm2Fvrxv1QetN?si=kLq5HkNAT-C11uO8XvQ5vQ" target="_blank">💤🎚️</a>');
          return;
        }

        //sleep Nature
        if ((sleep == true) && (nature == true)) {
          //$( "span" ).text( "Match sleep Nature" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/7g4a30e5k3TXpHCq8T1CXa?si=8YKi82jqTDiX5CR-gVxAXw" target="_blank">💤🍃</a>');
          return;
        }

        //focus Piano
        if ((focus == true) && (piano == true)) {
          //$( "span" ).text( "Match ☕🎹 focus Piano" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/6FGWDti2QLIZBrOe71Uhi5?si=E5DqezJwSJezfjIJjsEQxA" target="_blank">⚙️🎹</a>');
          return;
        }

        //focus Lofi
        if ((focus == true) && (lofi == true)) {
          //$( "span" ).text( "Match focus Lofi" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/4qxwiQjhdc5sl5wlUJaAVO?si=WkE99M4LQ4W4Kou5Bur6aQ" target="_blank">⚙️🎛️</a>');
          return;
        }

        //focus noise
        if ((focus == true) && (noise == true)) {
          //$( "span" ).text( "Match focus noise" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/1yn8hdB7jOZ6iFRp27NetD?si=WCKWAM2SQ9ixdHr02l80bA" target="_blank">⚙️⬜</a>');
          return;
        }

        //focus Classical
        if ((focus == true) && (classic == true)) {
          //$( "span" ).text( "Match focus Classical" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/7j1OEbOgLc5t9JyKO44Drs?si=qd-S_K4CSril83ManfL2CQ" target="_blank">⚙️🎼</a>');
          return;
        }

        //focus Acoustic
        if ((focus == true) && (acoustic == true)) {
          //$( "span" ).text( "Match focus Acoustic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/6Vq29HxIYglzjzv7hrKLIk?si=5OtgqQp6TkuQC-_83I-SHQ" target="_blank">⚙️🎵</a>');
          return;
        }

        //focus Jazz
        if ((focus == true) && (jazz == true)) {
          //$( "span" ).text( "Match focus Jazz" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/4zUQl020wtbJddIa9q1EOe?si=XAQXXFJhSe2mwkwF2JiVnA" target="_blank">⚙️🎷</a>');
          return;
        }

        //focus Electronic
        if ((focus == true) && (electronic == true)) {
          //$( "span" ).text( "Match focus Electronic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/3N01SL7HiBRk2yxgINK62z?si=3ct-JJQpRbyequ9fJ7FwJw" target="_blank">⚙️🎚️</a>');
          return;
        }
        //relax Piano
        if ((relax == true) && (piano == true)) {
          //$( "span" ).text( "Match ☕🎹 relax Piano" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/1uYHZcGvHRpQvmZgKVxJPv?si=w0TQam4DRqSc5zVtx-c9RA" target="_blank">🕯️🎹</a>');
          return;
        }

        //relax Lofi
        if ((relax == true) && (lofi == true)) {
          //$( "span" ).text( "Match relax Lofi" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/0hjElzknFVtdwWmgciGgSt?si=YAtUJM8KSS2mnV76_a3m-A" target="_blank">🕯️🎛️</a>');
          return;
        }

        //relax Classical
        if ((relax == true) && (classic == true)) {
          //$( "span" ).text( "Match relax Classical" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/0Qx1UAHKQBmzgqlbbSB043?si=xpYBZDqrTrSYRYUPLK6eSg" target="_blank">🕯️🎼</a>');
          return;
        }

        //relax Acoustic
        if ((relax == true) && (acoustic == true)) {
          //$( "span" ).text( "Match relax Acoustic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/5mE3qfnuetseWf1dCj21PF?si=VRFqbv33RMGg2FzhXlw4EA" target="_blank">🕯️🎵</a>');
          return;
        }

        //relax Jazz
        if ((relax == true) && (jazz == true)) {
          //$( "span" ).text( "Match relax Jazz" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/6MVnNmLrUBCoJ68R7AOj2N?si=gRzP5QNtT0ykQnGuqJCHOA" target="_blank">🕯️🎷</a>');
          return;
        }

        //relax Electronic
        if ((relax == true) && (electronic == true)) {
          //$( "span" ).text( "Match relax Electronic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/0x4XvzgNNLiTZQ7W2lncBk?si=1Jpl5VTTQtiIrCVjtpcEqw" target="_blank">🕯️🎚️</a>');
          return;
        }

        //relax Nature
        if ((relax == true) && (nature == true)) {
          //$( "span" ).text( "Match relax Nature" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/1XgWwvsFOMy60UQP93c6RO?si=vN-rCOPGSsaT9jcCrH7fBQ" target="_blank">🕯️🍃</a>');
          return;
        }

        //cooking Piano
        if ((cooking == true) && (piano == true)) {
          //$( "span" ).text( "Match ☕🎹 cooking Piano" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/6fM8K7HaLr3c6wy4a4rzBX?si=DMo29ypRT--MMQ4K3F4WOQ" target="_blank">👩‍🍳🎹</a>');
          return;
        }

        //cooking Lofi
        if ((cooking == true) && (lofi == true)) {
          //$( "span" ).text( "Match cooking Lofi" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/5BMiqIJKwuMKnlItTphaaL?si=rtnNloCOS-2EuRmIS6wJQg" target="_blank">"👩‍🍳🎛️</a>');
          return;
        }

        //cooking Classical
        if ((cooking == true) && (classic == true)) {
          //$( "span" ).text( "Match cooking Classical" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/5qq7akiiqd6UAaFfxBXj4F?si=lHITDW-FS3qVq7avL-R5oQ" target="_blank">👩‍🍳🎼</a>');
          return;
        }

        //cooking Acoustic
        if ((cooking == true) && (acoustic == true)) {
          //$( "span" ).text( "Match cooking Acoustic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/0Ew4yuXL6ZLUzRnHGDX34B?si=UDc_-dFRRAmFcG4FDUdqKA" target="_blank">👩‍🍳🎵</a>');
          return;
        }

        //cooking Jazz
        if ((cooking == true) && (jazz == true)) {
          //$( "span" ).text( "Match cooking Jazz" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/0qeQG3PRn6A66cmPP8mRHi?si=EM2JAJn1SQOK_Ww9Ttsedg" target="_blank">👩‍🍳🎷</a>');
          return;
        }

        //cooking Electronic
        if ((cooking == true) && (electronic == true)) {
          //$( "span" ).text( "Match cooking Electronic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/3oDm3tPsWSkYYpx8VwYhF5?si=bNmTHYDjSai_EBWVf2xqiA" target="_blank">👩‍🍳🎚️</a>');
          return;
        }
        //meditate Piano
        if ((meditate == true) && (piano == true)) {
          //$( "span" ).text( "Match ☕🎹 meditate Piano" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/7G1QDdawSJh7MGnzjYKoJv?si=84VV8skZRPWcJyhuv_MrVA" target="_blank">☮️🎹</a>');
          return;
        }

        //meditate Lofi
        if ((meditate == true) && (lofi == true)) {
          //$( "span" ).text( "Match meditate Lofi" ).show();
          $('#link').html('<a href="" target="_blank">☮️🎛️</a>');
          return;
        }

        //meditate noise
        if ((meditate == true) && (noise == true)) {
          //$( "span" ).text( "Match meditate noise" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/4Az5HG3PB97VXQiOue9JlW?si=AnSm3g8XR2-X21iDzXwR2Q" target="_blank">☮️⬜</a>');
          return;
        }

        //meditate Classical
        if ((meditate == true) && (classic == true)) {
          //$( "span" ).text( "Match meditate Classical" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/7dKgBG7Q0jwhVwDCIpqape?si=lNGChPNaQC2jlIQpvFrN9Q" target="_blank">☮️🎼</a>');
          return;
        }

        //meditate Acoustic
        if ((meditate == true) && (acoustic == true)) {
          //$( "span" ).text( "Match meditate Acoustic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/3oWLvrgBKmsoBJIehwNOJ7?si=a04YjBTVRG-L0BXWFMv_1g" target="_blank">☮️🎵</a>');
          return;
        }

        //meditate Jazz
        if ((meditate == true) && (jazz == true)) {
          //$( "span" ).text( "Match meditate Jazz" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/4COa3cD7fi2z1ncPLkNXmz?si=2wgoRue0Sw2cVjnQgLKREg" target="_blank">☮️🎷</a>');
          return;
        }

        //meditate Electronic
        if ((meditate == true) && (electronic == true)) {
          //$( "span" ).text( "Match meditate Electronic" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/1ZI70EGWfGYHol3ytKed1b?si=Vv1B-sKRRbWQTqK-chh64g" target="_blank">☮️🎚️</a>');
          return;
        }

        //meditate Nature
        if ((meditate == true) && (nature == true)) {
          //$( "span" ).text( "Match meditate Nature" ).show();
          $('#link').html('<a href="https://open.spotify.com/playlist/2x9Qc9Ttt25xuoGpFpIMtq?si=c0gtJsu0TD2s_NVnCLwkNw" target="_blank">☮️🍃</a>');
          return;
        }
        else  { $('#link').text( "❓❓" ).show(); }
    //event.preventDefault();
      });
  })

    .trigger( "change" );

}

//////////////////////////////
/* - QUOTE WAVE ANIMATION - */
//////////////////////////////

var darkgrey = "#0e4033";
//var divWidth = parseInt(d3.select("#quote-wave").style("width"));
var divWidth = document.getElementById('quote-wave').offsetWidth;
var margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var width = divWidth - margin.left - margin.right;
var height = width;
//console.log(divWidth, width, height);
//SVG container
var svg = d3
  .select("#quote-wave")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y-%m-%d"); // timeParse is added in version v4
var angle = (50 * Math.PI) / 180;
var radius = 255;
var newXmargin = margin.left;
var n;
//Round number to 2 behind the decimal
function round2(num) {
  return Math.round((num + 0.00001) * 100) / 100;
} //round2
function calculateGrid() {
  //How many circles fit in one "row"
  var s = width / Math.cos(angle);
  var numCircle = Math.min(4, Math.floor(s / (2 * radius)));
  //I don't want 1 circle
  if (numCircle === 1) numCircle = 2;
  //If it's not an exact fit, make it so
  radius = Math.min(radius, round2(s / numCircle / 2));

  //Locations for the textPath
  var xLocArc = new Array(numCircle + 1);
  for (var i = 0; i <= numCircle; i++) {
    xLocArc[i] = round2(2 * i * radius * Math.cos(angle));
  } //for i

  //New width & divide margins so it will sit in the center
  width = xLocArc[numCircle];
  newXmargin = round2((divWidth - width) / 2);
  svg.attr("transform", "translate(" + newXmargin + "," + margin.top + ")");

  return { xLocArc: xLocArc, numCircle: numCircle };
} //function calculateGrid

var grid = calculateGrid();
var quotes = [
  { quote: "We create deeper experiences with music" },
  { quote: "OFFAIR" },
  { quote: "Listen with intention" },
  { quote: "OFFAIR" },
  { quote: "Your favorite artist’s side project" },
  { quote: "OFFAIR" },
  { quote: "Music to experience" },
  { quote: "OFFAIR" }
];
drawQuoteWave("", quotes);
function drawQuoteWave(error, quotes) {
  n = 4;

  //Create the outer circular path
  svg
    .append("path")
    .attr("class", "circle-path")
    .attr("id", "circle-word-path")
    //.style("stroke", "#9d9d9d")
    .attr("d", calculateSnakePath(grid, n));

  //Create the text itself
  var wordString = " ";
  quotes.forEach(function (d, i) {
    wordString = wordString + d.quote + "\u00A0\u00A0";
  });
  //console.log(wordString);

  //Create text on path
  var quoteWave = svg
    .append("text")
    .attr("class", "circle-path-text noselect")
    .style("fill", "none")
    .attr("dy", "0.17em")
    .append("textPath")
    .attr("id", "top-word-string")
    .style("text-anchor", "middle")
    .style("fill", darkgrey)
    .attr("xlink:href", "#circle-word-path")
    .attr("startOffset", "0%")
    .text(wordString + "\u00A0\u00A0" + wordString);

  repeat();
  //animateQuoteWave();
} //function drawQuoteWave

function calculateSnakePath(grid, n) {
  var pos = 0,
    add = 1;
  function newPos() {
    if (pos === grid.numCircle) {
      add = -1;
    } else if (pos === 0) {
      add = 1;
    }
    pos = pos + add;
  } //newPos

  var xOld = 0,
    yOld = 0,
    sweep = 0,
    switchSide = 1;

  var path = "M0,0 ";

  //Construct the custom SVG paths out of arcs
  for (var i = 1; i <= n; i++) {
    //For the inbetween circles
    //console.log(i, "inbetween");
    newPos();
    x = grid.xLocArc[pos];
    y = yOld + round2(1.5 * radius * Math.sin(angle));
    path =
      path +
      " A" +
      radius +
      "," +
      radius +
      " 0 0," +
      sweep +
      " " +
      x +
      "," +
      y +
      " ";
    xOld = x;
    yOld = y;
    sweep = sweep ? 0 : 1;
  } //for i

  //Adjust the height of the SVG
  height = yOld;
  d3.select("#quote-wave svg").attr(
    "height",
    height + margin.top + margin.bottom
  );

  return path;
} //function calculateSnakePath

//function animateQuoteWave() {
function repeat() {
  var animateQuoteWave = d3.select("#top-word-string")
    .transition("move")
    .duration(140000)
    .ease(d3.easeLinear)
    .attr("startOffset", "100%")
    .transition("move")
    .duration(140000)
    .ease(d3.easeLinear)
    .attr("startOffset", "0%")
    .on("end", repeat);
  } ;//function animateQuoteWave

