// PLUGIN: Annotation
(function ( Popcorn ) {

  /**
     * annotation popcorn plug-in for LinkedTV
     * Adds an annotation associated with a certain time in the video, which creates a scrolling view of each item as the video progresses
     * Options parameter will need a start, target, id and label
     * -Start = time that you want this plug-in to execute
     * -End
     * -Img
     * -Desc
     * -Number
     * @param {Object} options
     *
     * Example:
      var p = Popcorn("#video")
        .annotation( {
         start: 1682.8, // seconds
         
      } )
    *
  */

  Popcorn.plugin( "annotation" , function( options ) {
    
    var carousel = $(options.carousel),
        container = carousel.find(".carousel-inner"),
        indicators = carousel.find(".carousel-indicators"),
        img = options.img,
        desc = options.desc,
        number = options.number,
        active = number ? "" : "active";
    if(number>=0) {    
      /*$('<div class="item '+active+'"><div class="row-fluid">'
        +'<div class="image span5">'
        +'<img src="'+img+'">'
        +'</div>'
		+'<div class="desc span7">'
		+desc+
		'</div></div></div>')*/
 		$('<div class="item '+active+'"><div class="image">'
        +'<img  src="'+img+'"></div></div>')
		.appendTo(container);
    
        $('<li data-target="'+options.carousel+'" data-slide-to="'+number+'" class="'+active+'"></li>')
        .appendTo(indicators);    
    }
    return {

      start: function( event, options ) {
          if(options.number>=0) {
            carousel.carousel(options.number);
        }
      },

      end: function( event, options ) {
      },

      _teardown: function( options ) {

      }
    };
  },
  {

    about: {
      name: "Popcorn Annotation Plugin",
      version: "0.1",
      author: "Michiel Hildebrand"
    },

    options: {
      start: {
        elem: "input",
        type: "number",
        label: "Start"
      },
      end: {
          elem: "input",
          type: "number",
          label: "End"
        },
      img: {
          elem: "input",
          type: "text",
          label: "Image"
      },
      desc: {
            elem: "input",
            type: "text",
            label: "Description"
        },
        number: {
            elem: "input",
            type: "number",
            label: "SlideNumber"
        }
    }
  });

})( Popcorn );
