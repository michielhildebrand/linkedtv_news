(function( $ ) {

    $.fn.chapterMark = function(chapters, options) {
        var $this = $(this);
        
        var activeChapter,
            bookmarks = {};
        
        var settings = $.extend({
            // These are the defaults.
        }, options );
        
        this.initialize = function() {
            return this;  
        };
        
        $("#bookmark").on("click", function(e) {
            if(activeChapter !== null) {
    		    addBookmark(activeChapter);
    		}
    	});
    	$("#bookmarked").on("click", function() {
    	    if(activeChapter !== null) {
    		    removeBookmark(activeChapter);
    		}
    	});

    	function addBookmark(id) {
    		if(!bookmarks[id]) {
    			bookmarks[id] = true;
    			$("#program-chapter").addClass("bookmarked");
    			$this.trigger("bookmarkAdded", id);
    		}
    	}

    	function removeBookmark(id) {
    		if(bookmarks[id]) {
    			delete bookmarks[id];
    			$("#program-chapter").removeClass("bookmarked");
    			$this.trigger("bookmarkRemoved", id);
    		}
    	}

    	function updateBookmarkIcon(id) {
    		if(bookmarks[id]) {
    			$("#program-chapter").addClass("bookmarked");
    		} else {
    			$("#program-chapter").removeClass("bookmarked");
    		}
    	}
        
        /* public functions */
        this.setChapter = function(id, data) {
            activeChapter = id;
            $("#chapter-category").html(data.category);
    		$("#chapter-title").html(data.title);
    		updateBookmarkIcon(id);
        }
        
        return this.initialize();
        
    }
    
    
    
}( jQuery ));