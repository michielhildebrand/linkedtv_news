(function( $ ) {

    $.fn.chapterScroller = function(chapters, options) {
        var $this = $(this),
            chapters = chapters,
            entities = [],
            scroller,
            selectTimeout = null,
            activeChapter,
            activeEntity,
            currentTime;
        
        var settings = $.extend({
            // These are the defaults.
            chapterWidth: 1024,
            selectTimeout:10000
        }, options );

        this.initialize = function() {
            // add the chapters and entities
            for (var i=0; i < chapters.length; i++) {
                var chapter = chapters[i];
                var chapterNode = $('<li class="chapter" style="display:none">'
                    +'<div class="chapter-title">'
                    +chapter.title
                    +'</div>')
                .data("chapter", chapter.id)
                .data("start", chapter.start)
                .data("end", chapter.end)
                .appendTo($this);
            
                var entityNode = $('<div class="entity-list"></div>')
                .appendTo(chapterNode);
            
                for (var j=0; j < chapter.entities.length; j++) {
                    var entity = chapter.entities[j];
                    entities.push(entity); // builds the entity index
                    $('<div class="entity">'
                        +'<img src="'+entity.thumb+'">'
    					+'<div class="title">'
    					+entity.label
    					+'</div>'
    				    +'</div>')
    				.data("entity", entity.id)
    				.appendTo(entityNode);
                }
            }            
            
            // Enable scrolling of the entities with iScroll library
            scroller = new iScroll(this.parent().get(0), {
            	snap: 'li',
            	momentum: false,
            	hScrollbar:false,
            	bounce:false,
            	momentum:false,
            	vScroll:false
            });    

            // enable entity selection
            this.delegate(".entity", "click", function(e,i) {
                startSelectTimeout();
                
                var entityIndex = $this.find(".entity").index($(this));
                $this.trigger( 'entitySelect', [entityIndex, currentTime+settings.selectTimeout/1000, entities[entityIndex]] );
                $this.find(".entity.active").removeClass("active");
        		$(this).addClass("active");
        		
            });
            
            return this;
        };
        
        function startSelectTimeout() {
            clearTimeout(selectTimeout);
            selectTimeout = setTimeout(function() {
                selectTimeout = null;
                slideToChapter();
                updateEntity();
            }, settings.selectTimeout);
        }
        
        function itemAtTime(items, time) {
            if(time < items[0].start) {
                return -1;
            }

            for (var i=0; i < items.length; i++) {
                item = items[i];
                var end = items[i+1] ? items[i+1].start : items[i].end;
    			if(time >= item.start && time < end) {
    				return i;
    			}
            }
            return -1;

        }
        
        function updateChapter() {
            var chapterIndex = activeChapter,
                chapterNode = $this.find(".chapter:eq('"+activeChapter+"')");
                
            if(chapterNode) {
                if(chapterNode.css("display") !== "block") {    
                    // make sure the chapter and all previous ones are visible
            		// also make sure the content slides for the chapter are visible
            	    $this.find(".chapter").each(function(i,e) {
            		    if($(e).css("display")=="none" && i<=chapterIndex) {
            		        $(e).css("display", "block");
            		        $this.trigger( 'chapterAdd', [i,chapters[i]]);
            		    }
            		});
                
                    // update the scroller
            		var scrollerWidth = ($this.find(".chapter:visible .entity").length*settings.chapterWidth);
            		$this.width(scrollerWidth);
            		scroller.refresh();
                }
            
                // highlight the chapter
                $this.find(".chapter.active").removeClass("active");
        		chapterNode.addClass("active");

                $this.trigger( 'chapterSelect', [chapterIndex,chapters[chapterIndex]]);
                if(!selectTimeout) {
        		    slideToChapter();
        		}
        	}
        }
        
        function slideToChapter() {
            var chapterIndex = activeChapter;
            if(chapterIndex >= 0) {
                scroller.scrollToElement($this.find(".chapter:eq('"+chapterIndex+"')").get(0));
            }
        }
        
        function updateEntity() {
            var entityIndex = activeEntity
            if(!selectTimeout) {
        		setActiveEntity(entityIndex);
        		var endTime = entities[entityIndex+1] ? entities[entityIndex+1].start : entities[entityIndex].end;
        		$this.trigger( 'entitySelect', [entityIndex,endTime,entities[entityIndex]]);
        	}
        }
        
        function setActiveEntity(entityIndex) {
            // update "active" Class
            $this.find(".entity.active").removeClass("active");
    		$this.find(".entity:eq('"+entityIndex+"')").addClass("active");
        }
        
        /* public functions */
        this.selectEntity = function(entityIndex) {
            startSelectTimeout();
            setActiveEntity(entityIndex);
            // hack, scroll chapter in the view
            scroller.scrollToElement($this.find(".entity:eq('"+entityIndex+"')").parent().parent().get(0));
        };
        
        this.timeUpdate = function(time) {   
            currentTime = time;  
            // set active chapter
            var chapterIndex = itemAtTime(chapters, time);
            if(chapterIndex >= 0 && chapterIndex !== activeChapter) {
                activeChapter = chapterIndex;
                updateChapter();
            }
            
            var entityIndex = itemAtTime(entities, time);
            if(entityIndex >= 0 && entityIndex !== activeEntity) {
                activeEntity = entityIndex;
                updateEntity();
            }
        };
        
        return this.initialize();
        
    };
    
    
 
}( jQuery ));