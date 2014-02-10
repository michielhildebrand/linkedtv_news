(function( $ ) {

    $.fn.basePlayer = function(options) {
        var $this = $(this);
        
        var settings = $.extend({
            // These are the defaults.
            interval: 100,
            duration: 0,
            title: ""
        }, options );
        
        // some global stuff
        var time = 0,
            player = null,
            stepSize = $("#timeline").width()/settings.duration;
        
        this.initialize = function() {
            $this.find("#program-title").html(settings.title);
            
            // Video controls
        	$("#play").on("click", function() {
        		var paused = $(this).hasClass("paused");
        		if(paused) {
        			play();
        			$this.trigger("stateChange", "play");
        		} else {
        			pause();
        			$this.trigger("stateChange", "pause");
        		}
        	});	

        	$("#timeline").on("click", function(e) {
        		time = Math.round(e.offsetX/stepSize);
        		$("#playhead").css("left", e.offsetX-1);
        		$this.trigger("stateChange", JSON.stringify({time:time}));
        		$this.trigger("timeChange", Math.ceil(time));
        	});
            
            return this;  
        };
        
        function play(newTime) {
        	if(newTime) { time = newTime };
        	$("#play").removeClass("paused");
    		if(!player) {
    			player = setInterval(function() {
    				var currentTime = time+settings.interval/1000;
    				if(Math.ceil(currentTime) == video.duration) {
    					endOfVideo();
    				}
    				if(Math.ceil(time) !== Math.ceil(currentTime)) {
    					$this.trigger("timeChange", Math.ceil(currentTime));
    					updatePlayhead(currentTime);
    				}
    				time = currentTime;
    			}, settings.interval);
    		}
        }
        function pause(newTime) {
    		if(newTime) { time = newTime };
    		$("#play").addClass("paused");
    		clearInterval(player);
    		player = null;
    		updatePlayhead(time);
    		$this.trigger("timeChange", Math.ceil(time));
    	}
    	function endOfVideo() {
    		pause();
    	}
    	
        function updatePlayhead(time) {
    		var left = stepSize*time;
    		// do not animate the last step
    		if(time==settings.duration) {
    			$("#playhead").css("left", left);
    		} else {
    			$("#playhead").animate({"left":left}, 500);
    		}
    	}
        
        
        /* public functions */
        this.play = function(time) {
            play(time);
        }
        this.pause = function(time) {
            pause(time);
        }
        
        
        
        
        return this.initialize();
        
    }
    
    
    
}( jQuery ));