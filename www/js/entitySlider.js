(function( $ ) {

    $.fn.entitySlider = function(options) {
        var $this = $(this),
            container = $this.find(".swipe-wrap") ? $this.find(".swipe-wrap") : $this,
            preventSlideCallback = false,
            activeSlide = null,
            currentTime = 0;
        
        var settings = $.extend({
            // These are the defaults.
            selectTimeout:10000
        }, options );
        
        this.initialize = function() {
            
            /* Enable content swiping with Swipejs library 
            */
            this.contentSlider = $this.Swipe({
                continuous:false,
            	callback:function(i,e) {
            	    if(!preventSlideCallback) {
            	        activeSlide = {index:i, end:currentTime+settings.selectTimeout/1000};
            	        $this.trigger( 'slideChange', [i,this] );
            	    }
            	}
            }).data('Swipe'); 
            
            return this;  
        };
        
        function addSlides(entities) {
            
            for (var j=0; j < entities.length; j++) {
                var entity = entities[j],
                    desc = entity.desc || "";
                    highlight = entity.highlight || "",
                    metadata = entity.property || "";
                
                var sourceURL = entity.wikiURL ? entity.wikiURL :
                    (entity.source ? entity.source.url : "");
                var sourceName = entity.wikiURL ? "Wikipedia" :
                        (entity.source ? entity.source.name : "");
                
                $('<div class="slide">'
                 +'<div class="left">'
                    +'<div class="image"><img src="'+entity.image+'"></div>'
                    +'<div class="box name"><span>'+entity.label+'</span></div>'
                 +'</div>'
                 +'<div class="right">'
                    +'<div class="desc box">'
                        +'<div class="content-body">'
                            +'<div class="entity-text">'+desc+'</div>'
                            +'<div class="entity-metadata">'+metadata+'</div>'
                            +'<div class="entity-highlight">'+highlight+'</div>'
                        +'</div>'
                 		+'<div class="content-footer grey">'
                 		+'<div class="link">'
                 		+'<a href="'+sourceURL+'">'+sourceName+'</a>'
                 		+'</div>'
                 		+'<div class="icons">'
                 		    +'<span class="timer control"></span>'
                 		    +'<a class="play control" href="javascript:;"></a>'
                 			+'<a class="share control" href="javascript:;"><img src="icon/share_icon_24.png"></a>'
                 			+'<a class="save control" data-name="'+entity.label+'" href="javascript:;"><img src="icon/save_icon_24.png"></a>'
                 		+'</div>'
                 	+'</div>'
                 +'</div>'
                 +'</div>')
                 .data("entity", entity.id)
                 .appendTo(container);
            }
        }
        
        this.addSlides = function(entities) {
            addSlides(entities);
            this.contentSlider.setup();
        };
        
        /* public functions */
        this.slide = function(index, endTime) {
            // when we are called externally, don't send the callback on slide change
            preventSlideCallback = true;
            activeSlide = {index:index, end:endTime};
            this.contentSlider.slide(index);
            preventSlideCallback = false;
        };
        
        this.timeUpdate = function(time) {
            currentTime = time;
            if(activeSlide) {
                var countdown = activeSlide.end - time > 0 ? activeSlide.end - time : "";
                $this.find(".slide:eq("+activeSlide.index+") .timer")
                    .html(countdown);
            }
            
        };
        
        return this.initialize();
        
    }
    
    
    
}( jQuery ));