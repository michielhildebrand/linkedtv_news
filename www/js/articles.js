(function( $ ) {

    $.fn.articleSlider = function() {
        var $this = $(this),
            container = $this.find(".swipe-wrap") ? $this.find(".swipe-wrap") : $this;
        this.initialize = function() {
            
            /* Enable content swiping with Swipejs library 
            */
            $this.contentSlider = $this.Swipe({
            	callback:function(i,e) {
            	    $this.find(".article-slide.active").removeClass("active");
            	    $(e).addClass("active");
            	    $this.trigger( 'slideChange', [i,this] );
            	    updateScroller(i);
            	}
            }).data('Swipe'); 
            $this.contentScroller = new iScroll($this.get(0), {
        		vScrollbar: true,
        		hScroll: false
    	    });
            return this;  
        };
        
        function setContent(items) {
            container.html("");
            $(items).each(function(i,e) {
                formatArticle(e,i);
            });
            $this.find(".article-slide:first").addClass("active");
            $this.contentSlider.setup();
        }
        function formatArticle(item,i) {   
            var title = item.title || "";
            // the text is given in item.text or in an external file
            var text = item.text || "";
                
            var content = $('<div class="article-slide">'
            	    +'<div class="article-slide-content">'
        		    +'<h4 class="title">'+title+'</h4>'
        		    +'<div class="article-info">'
        		    +articleInfo(item)
        			+articleLink(item.url)
        		    +'</div>'
        		    +'<div class="media">'
        			    +formatMedia(item.media)
        		    +'</div>'
        		    +'<div class="article-text">'+text+'</div>'
        		+'</div>'
    	    +'</div>')
        	.appendTo(container);
        	if(item.textURL) {
        	    content.find(".article-text").load(item.textURL,function() {
        	        if(i==0) {
        	            updateScroller(0);
        	        }
        	    });
        	} else if(i==0) {
        	    updateScroller(0);
        	}
        }
        
        function formatMedia(media) {
            var html="";
            if(media) {
                if(media.type=="video") {
                    html += '<video width="496" height="279" controls><source type="video/mp4" src="'+media.url+'"></video>'
                        +'<div class="airplay" data-src="'+media.url+'"></div>';
                }
                else if(media.type=="image") {
                    html += '<img src="'+media.url+'">';
                }
                if(media.caption) {
                    html += '<div class="caption">'+media.caption+'</div>'
                }
            }
            return html;
        }
        
        function articleInfo(item) {
            // the author is a person or a source
            var name = item.author ? item.author.name : "",
                source = item.source ? item.source.name : "";
            var date = item.date ? 
                ( moment(item.date).isValid() ? moment(item.date).format("MMMM D, YYYY") : item.date ) 
                : "";
            var html = "";
            if(name||source) {
			    html += '<span class="author">'+name+'</span>'
			    if(name&&source) {
			        html += '<span class="divider">|</span>'
			    }
			    html += '<span class="source">'+source+'</span>'
			    if(date) {
			        html += '<span class="divider">|</span>'
			    }
			}
			if(date) {
			    html += '<span class="date">'+date+'</span>';
			}
			return html;
        }
        
        function articleLink(url) {
            if(url) {
                return '<div class="article-link"><a href="'+url+'">original article</a></div>'
            } else {
                return "";
            }
        }
        
        function updateScroller(index) {
            // before updating the scroller give it a second to load the content :(
            setTimeout(function() {
                var slideHeight = $this.find(".article-slide:eq('"+index+"')").height();
                container.height(slideHeight+100);
                $this.contentScroller.refresh();
                $this.contentScroller.scrollTo(0,0);
            }, 1000);
        }
        
        /* public functions */
        this.setContent = function(items) {
            setContent(items);
        };
        
        this.slide = function(index) {
            $this.contentSlider.slide(index);
        };
        
        this.refresh = function() {
            if($this.css("display")=="block") {
                var activeIndex = $this.find(".article-slide.active").attr("data-index");
                $this.contentSlider.setup();
                updateScroller(activeIndex);
            }
        };
        
        return this.initialize();
        
    }
    
    
    
}( jQuery ));