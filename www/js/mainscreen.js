function initGapi() {
	gapi.client.setApiKey(googleApiKey);
	gapi.client.load('urlshortener', 'v1', function(){
		console.log('URL Shortener loaded');
		initCode(true);
	});
}

function initCode(bShow) {
	var sUuid = Mp.Main.getUuid(true);
	var sUrl = window.location.origin + 
	    window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/')+1) + "#" + sUuid;
	$('#code').text(sUuid);
	
	var request = gapi.client.urlshortener.url.insert({
		'resource': {
			'longUrl': sUrl
		}
	});
    request.execute(function(response){
		
		if(response.id != null) {
			sUrl = response.id;
		} else {
			console.log("URL Shortening failed");
			console.log(response);
		}
		
		$('#link').attr('href', sUrl);
		$('#link img').attr('src', "http://chart.googleapis.com/chart?cht=qr&chs=150x150&chld=l|0&chl=" + sUrl);
		$('#link span').text(sUrl);
		
		toggleCode(bShow);
		
    });
}

function toggleCode(bShow) {
	if (bShow == true || (bShow != false && $('#overlay').css('top') == "-255px")) {
		bShow = true;
		sTop = "0px";
		sText = "Hide second screen link";
	} else {
		bShow = false;
		sTop = "-255px";
		sText = "Show second screen link";
	}
	$('#overlay').animate({top:sTop}, 600, function(){
		$('#toggle span').text(sText);
		$('#toggle i').toggleClass('icon-chevron-down', !bShow).toggleClass('icon-chevron-up', bShow);
	});
}
