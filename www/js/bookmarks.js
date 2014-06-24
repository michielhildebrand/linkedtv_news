(function( $ ) {

    $.fn.bookmarks = function(options) {
        var $this = $(this);
            
        var settings = $.extend({
            // These are the defaults.
            bookmarks:[]
        }, options );
        
        this.initialize = function() {
            var bookmarks = settings.bookmarks;
            for (var i=0; i < bookmarks.length; i++) {
                addBookmark(bookmarks[i]);
            }
            
            $this.delegate(".bookmark", "click", function(e,i) {
                $this.find(".bookmark.active").removeClass("active");
                $(this).addClass("active");
                $this.trigger("select", $(this).data("id"));
            });
            
            return this; 
        };
        
    	function addBookmark(o) {
            $('<li class="bookmark">'+o.title
    		    +'<div class="day">'+o.date+'</div>'
    		    +'</li>')
    		.data("id", o.id)
    		.prependTo($this);
    	}

    	function removeBookmark(id) {
    	    $this.find(".bookmark").each(function() {
    	        if($(this).data("id") == id) {
    	            $(this).remove();
    	        }
    	    });    
    	}
        
        /* public functions */
        this.initSelect = function() {
            // select first bookmark if none is active yet
            if($this.find(".bookmark.active").length==0) {
                var first = $this.find(".bookmark:first");
                if(first.length>0) {
                    first.addClass("active");
                    $this.trigger("select", first.data("id") );
                }
            }            
        }
        this.addBookmark = function(data) {
            addBookmark(data);
        }
        this.removeBookmark = function(id) {
            removeBookmark(id);
        }
        
        return this.initialize();
        
    }
    
}( jQuery ));