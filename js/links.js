(function( $ ) {    
    $.fn.linkList = function(items) {
        var $this = $(this);
        
        this.initialize = function() {
            
            // enable scrolling
            $this.linkScroller = new iScroll($this.parent().get(0), {
                snap: 'li',
            	vScrollbar: false,
            	vScroll:true,
            	hScroll:false
            });
            
            $this.delegate("li", "click", function(e) {
                $this.find("li.active").removeClass("active");
        		$(this).addClass("active");
        		var linkIndex = $this.find("li").index($(this));
                $this.trigger("select", [linkIndex, $(this)]);                
    		});
            
            return this; 
        };
        
        function setContent(type, items) {
            $this.html("");
            if(items) {
                for (var i=0; i < items.length; i++) {
                    switch(type) {
                    case "timeline":
                        timelineLink(items[i]);
                        break;
                    case "opinion":
                        opinionLink(items[i]);
                        break;
                    case "indepth":
                        indepthLink(items[i]);
                        break;
                    case "othermedia":
                        othermediaLink(items[i]);
                        break;
                    case "location":
                        locationLink(items[i]);
                        break;
                    }
                }
                $this.find("li:first-child").addClass("active");
                $this.trigger("select", 0); 
            }
            $this.linkScroller.refresh();
            $this.linkScroller.scrollTo(0,0);
        }
        
        function opinionLink(item) {
            var name = item.author && item.author.name ? item.author.name : "",
                role = item.author && item.author.role ? item.author.role : "",
                thumb = item.author && item.author.thumb ? item.author.thumb : "",
                date = item.date ? moment(item.date) : moment();
                
            $('<li>'
                +'<div class="thumb">'
                    +'<img  class="thumb-image" src="'+thumb+'">'
					+'<div class="mediatype">'+videoIcon(item.media)+'</div>'
                    +'<div class="date">'+date.format('DD/MM/YY')+'</div>'
            	+'</div>'
            	+'<div class="desc">'
            		+'<div class="author">'+name+'</div>'
            		+'<div class="author-info">'+role+'</div>'
            		+'<div class="title">'+item.title+'</div>'
            	+'</div>'
            +'</li>')
            .appendTo($this);
        }
        
        function othermediaLink(item) {
            var title = item.title||"",
            	sourceName = item.source ? item.source.name : "",
            	sourceThumb = item.source ? item.source.thumb : "",
                date = item.date ? moment(item.date) : moment();
                
            $('<li>'
                +'<div class="thumb">'
                    +'<img  class="thumb-image" src="'+sourceThumb+'">'
					+'<div class="mediatype">'+videoIcon(item.media)+'</div>'
                    +'<div class="date">'+date.format('DD/MM/YY')+'</div>'
            	+'</div>'
            	+'<div class="desc">'
            		+'<div class="author">'+sourceName+'</div>'
            		+'<div class="title">'+title+'</div>'
            	+'</div>'
            +'</li>')
            .appendTo($this);
        }
        
        function indepthLink(item) {
            var thumb = item.source ? item.source.thumb : "",
                date = item.date ? moment(item.date) : moment();
                
            $('<li>'
                +'<div class="thumb">'
                    +'<img  class="thumb-image" src="'+thumb+'">'
					+'<div class="mediatype">'+videoIcon(item.media)+'</div>'
                    +'<div class="date">'+date.format('DD/MM/YY')+'</div>'
            	+'</div>'
            	+'<div class="desc">'
            		+'<div class="title">'+item.title+'</div>'
            	+'</div>'
            +'</li>')
            .appendTo($this);
        }
        
        function timelineLink(item) {
            var date = item.date ? moment(item.date) : moment();
            $('<li>'
                +'<div class="date">'
                    +'<div class="year">'+date.format("YYYY")+'</div>'
                    +'<div class="month">'+date.format("D MMM")+'</div>'
            	+'</div>'
            	+'<div class="desc">'
            		+'<div class="title">'+item.title+'</div>'
            	+'</div>'
            +'</li>')
            .appendTo($this);
        }
        
        function locationLink(item) {
            var name = item.author ? item.author.name : "",
                thumb = item.author ? item.author.thumb : "",
                type = item.type || "nearme",
                date = item.date || "";//? moment(item.date) : moment();
                
            $('<li>'
                +'<div class="thumb">'
                    +'<img class="thumb-image" src="'+thumb+'">'
                    +'<div class="date">'+date //date.fromNow(true)
                    +'</div>'
            	+'</div>'
            	+'<div class="desc">'
            		+'<div class="author">'+name+'</div>'
            		+'<div class="title">'+item.text+'</div>'
            	+'</div>'
            +'</li>')
            .addClass(type)
            .appendTo($this);
        }
        
		function videoIcon(media) {
			var html = "";
			if(media&&media.type=="video") {
				html += '<img src="icon/video_icon.png">';
			}
			return html
		}

        /* public functions */
        this.setContent = function(type, items) {
            setContent(type, items);
        }
        this.selectLink = function(index) {
            $this.find("li.active").removeClass("active");
    		$this.find("li:eq('"+index+"')").addClass("active");
        }
        this.refresh = function() {
            if($this.css("display")=="block") {
                $this.linkScroller.refresh();
                $this.linkScroller.scrollTo(0,0);
            }
        }
        
        return this.initialize();
        
    }
    
}( jQuery ));


