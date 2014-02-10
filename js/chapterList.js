(function( $ ) {

    $.fn.chapterList = function(chapters, options) {
        var $this = $(this);
            
        var settings = $.extend({
            // These are the defaults.
        }, options );
        
        this.initialize = function() {
            $this.delegate("li", "click", function(e,i) {
                $this.find("li.active").removeClass("active");
                $(this).addClass("active");
                $this.trigger("select", $(this).data("id"));
            });
            
            return this; 
        };
        
    	function addChapter(i, o) {
            $('<li class="chapter-link">'+o.title+'</li>')
    		.data("id", i)
    		.appendTo($this);
    	}
        
        /* public functions */
        this.addChapters = function(chapters) {
            for (var i=0; i < chapters.length; i++) {
                addChapter(i, chapters[i]);
            }
        }
        this.selectChapter = function(index) {
            // select first chapter if none is active yet
            var node = $this.find("li:eq('"+index+"')");
            $this.find("li.active").removeClass("active");
            node.addClass("active");
            $this.trigger("select", index );
        }
        
        return this.initialize();
        
    }
    
}( jQuery ));