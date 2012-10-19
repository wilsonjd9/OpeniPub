

// ipub.js version 0.1 BETA...maybe alpha?
// Copyright John Wilson 2012

/*! jQuery Mobile v1.1.0-rc.1 jquerymobile.com | jquery.org/license */


// Globally track paging system

global_page_num = 1; 
last_page_read = 1;
global_total_page_portrait = 1;
global_total_page_landscape = 1;
global_current_orientation = 0;   // Portrait orientation is 0 and lanscape is 1
prevent_horizontal_swipe = 0;
global_gap = 30;
global_full_page = 0;

port_pad = 100;
hori_pad = 90;
margins_leftright = 60;
main_window_adjust = 0;
just_scrolled_prevent = 0;
current_px = 0;
start_px = 0;
stop_px = 0;
delta_px = 0;
new_global_position = 0;
current_page = 0;
main_window = 0;
just_animated = 0;
	// OLD WAY - var main_window = $(window).width() - main_window_adjust;
main_window = $('#scrollcontainer').width();
// OLD WAY actual_page_window = main_window - hori_pad;
actual_page_window = main_window + global_gap;
global_position_percent = 0;
scrolling_toc = 0;
scrollcalled_by = "";
chapter = 1;



current_pub = getUrlVars()["pub"];
action_pub = getUrlVars()["action"];
if (current_pub == null) {
	current_pub="store.cfm";
};
bookmark = parseInt($.cookie("bookmark"+current_pub));

current_search = getUrlVars()["search"];
if (current_search == null) {
	current_search="";
}
current_offer = getUrlVars()["offer"];
if (current_offer == null) {
	current_offer="0";
}
current_state = getUrlVars()["state"];
if (current_state == null) {
	current_state="-1";
}
current_category = getUrlVars()["category"];
if (current_category == null) {
	current_category="-1";
}
current_sort = getUrlVars()["sort"];
if (current_sort == null) {
	current_sort="Title";
}

// fix for orientation change on ios

 // @mathias
 // https://gist.github.com/901295


// Start handling events...jquery mobile stuff

$(document).ready(function() {
	
			$.mobile.showPageLoadingMsg();
			
	


	
			$('textarea.tinymce').tinymce({
			// Location of TinyMCE script
			script_url : 'js/tiny_mce/tiny_mce.js',

			// General options
			theme_advanced_path : false,
			theme : "advanced",
			plugins : "autolink,lists,pagebreak,style,layer,table,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

			// Theme options
			theme_advanced_buttons1 : "newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
			theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
			theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
			
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_resizing : true,

			// Example content CSS (should be your site CSS)
			content_css : "css/ebook.css",

			// Drop lists for link/image/media/template dialogs
			template_external_list_url : "lists/template_list.js",
			external_link_list_url : "lists/link_list.js",
			external_image_list_url : "lists/image_list.js",
			media_external_list_url : "lists/media_list.js",

			// Replace values for the template plugin
			template_replace_values : {
				username : "Some User",
				staffid : "991234"
			}
		});
		
		
	
	
	$("#search-basic").bind( "change", function(event, ui) {
     var searchinput = $("#search-basic").val();
	 var inputtype = $("#inputtype").val();
	 window.location = "?pub=store.cfm" + "&search=" + searchinput + "&type=" + inputtype ;
	});
	
	//* Hide these for now by default.
	//	$('#next_image').hide();
	//	$('#previous_image').hide();
	
	//$('p').widont();
	//$('h3').widont();
	//$('h2').widont();
	//$('h1').widont();
	
	//if (current_pub == 'addpub_list.cfm') {
	//	var newColumnWidth = 904;
	//	global_full_page = 1;
	//	$('#scroller').css('-webkit-column-width', newColumnWidth);
	//	$('#scroller').css('-moz-column-width', newColumnWidth);
	//	$('#scroller').css('-ms-column-width', newColumnWidth);
	//	$('#scroller').css('-o-column-width', newColumnWidth);
		
	//}
	
	
	if ((current_pub == 'addpub.cfm') || (current_pub == 'addpub_list.cfm') || (current_pub == 'manpub.cfm') || (current_pub == 'manpro.cfm')) {
		var newColumnWidth = 904;
		global_full_page = 1;
		$('#scroller').css('column-width', newColumnWidth);
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		//$('#scrollcontainer').css('padding', '0 0 0 0');
		//$('#scrollcontainer').css('margin', '0 0 0 0');
	    $('#scrollcontainer').css('padding', '0 0 0 0');
		$('#scrollcontainer').css('margin', '0 0 0 0');
		
	}
	
	if (current_pub == 'welcome.cfm') {
		//alert("we have a welcome?");
		var newColumnWidth = 904;
		global_full_page = 1;
		$('#scroller').css('column-width', newColumnWidth);
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		$('#scrollcontainer').css('padding', '0 0 0 0');
		$('#scrollcontainer').css('margin', '0 0 0 0');
		//$('#scroller').css('background-color', 'black');
		
	}
	
	if (current_pub == 'buy.cfm') {
		//alert("we have a welcome?");
		var newColumnWidth = 904;
		global_full_page = 1;
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		//$('#scroller').css('background-color', 'black');
		
	}
	
		if (current_pub == 'store.cfm') {
		global_full_page = 1;		
		$('#scrollcontainer').css('padding', '0 0 0 0');
		$('#scrollcontainer').css('margin', '0 0 0 0');
		
	}
	
		if ((current_pub == 'account.cfm') || (current_pub == 'permission.cfm') || (current_pub == 'sharing.cfm') || (current_pub == 'preferences.cfm')) {
		//alert("we have a welcome?");
		var newColumnWidth = 904;
		//newColumnGap = 0;
		global_full_page = 1;
		$('#scroller').css('column-width', newColumnWidth);
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		//$('#scroller').css('-webkit-column-gap', newColumnGap);
		//$('#scroller').css('-moz-column-gap', newColumnGap);
		//$('#scroller').css('-ms-column-gap', newColumnGap);
		//$('#scroller').css('-o-column-gap', newColumnGap);		
		$('#scrollcontainer').css('padding', '0 0 0 0');
		$('#scrollcontainer').css('margin', '0 0 0 0');	
	}
	
	if (current_pub == 'welcome_video.cfm') {
		//alert("we have a welcome?");
		var newColumnWidth = 904;
		global_full_page = 1;
		$('#scroller').css('column-width', newColumnWidth);
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		
	}
	
	if (current_pub == 'nepal.cfm') {
		//alert("we have a welcome?");
		var newColumnWidth = 904;
		global_full_page = 1;
		$('#scroller').css('column-width', newColumnWidth);
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		$('#scrollcontainer').css('padding', '0 0 0 0');
		$('#scrollcontainer').css('margin', '0 0 0 0');
		
		
	}	
	
	if ((current_pub == 'elearn-sailboat.cfm') || (current_pub == 'elearn2.cfm') || (current_pub == 'elearn1.cfm')) {
		//alert("we have a welcome?");
		var newColumnWidth = 904;
		global_full_page = 1;
		$('#scroller').css('column-width', newColumnWidth);
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		$('#scrollcontainer').css('padding', '0 60px 0 60px');
		$('#scrollcontainer').css('margin', '0 0 0 0');
		$('#scrollcontainer').css('background-color', 'DodgerBlue');
		$('#scroller').css('background-color', 'DodgerBlue');	
		$('#scroller').css('background-color', 'DodgerBlue');		
		
	}	
	
		if ((current_pub == 'solartimes.cfm')) {
		var newPageHeight = 600;
		$('#scroller').css('height', newPageHeight);
		
		
	}
		
	
	
	if ((current_pub == 'help.cfm') || (current_pub == 'browserdownload.cfm')) {
		//alert("we have a welcome?");
		var newColumnWidth = 904;
		global_full_page = 1;
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		$('#scrollcontainer').css('padding', '35px 60px 0 60px');
		$('#scrollcontainer').css('margin', '0 0 0 0');		
		
	}		
	
//	$('#addpubform').submit(function(){
		
//		sendFormPub();
//		hideLoadingIndicator();
		
		
//	})
	
	        
            $("#Submit").click(function(){
				
				
 
                var formData = $("#addpubform").serialize();
 
                $.ajax({
                    type: "POST",
                    url: "addpub_process.cfm",
                    cache: false,
                    data: formData,
                    success: onSuccess,
                    error: onError
                });
 
                return false;
            })
       
	
	
	
	
	
   $('.swipecover').click(function(){
     $('div.cover').hide();
   })
   
   //$('a.showcover').click(function(){
     //$('div.cover').show();
  // })
   
   
   //$('h1.swipecover').click(function(){
	//$('div.cover').hide();
   //})
   
	
	
//	$( '#configure').live( 'pageinit',function(event){
	  //last_page_read = global_page_num;
	  //alert("what is the last page read?" + last_page_read);
//	  var current_cookie = 	parseInt($.cookie("bookmark"+current_pub));
//	  $("#bookmark_page").text("Your bookmark/latest page read to is currently: "+ current_cookie);
//	  $("#last_page_read").text("The last page you read: "+ global_page_num);
//	})

//	$( '#one').live( 'pageinit',function(event){
//				   $('h1.swipecover').click(function(){
//			 $('div.cover').hide();
//			})
//	})
	
	
	$( '#config' ).live( 'pagebeforeshow',function(event){
	  last_page_read = global_page_num;
	  //alert("2what is the last page read?" + last_page_read);	  
	  var current_cookie = 	parseInt($.cookie("bookmark"+current_pub));
	  $("#bookmark_page").text("Your furthest page read to is currently: "+ current_cookie);
	  $("#last_page_read").text("The last page you read: " + last_page_read);
	  $("#global_page_num").text("The current page is: "+ global_page_num);
	})	
	
	
	
	$("#bookmark_button").bind('click',function(event, ui){
	//alert("scrolltop position is " + $("#scroller_portrait").position().top);	
			
			var port_top = $("#mainbody").scrollTop();
			var p = $("#mainbody");
			// $("#one").scrollTop(1300);
			
			//alert("scroller_portrait scroll top position " + port_top + "scroller port " + p.scrollTop());
			//$("#mainbody").scrollTop(3000);
		
		
		
	//alert("set book mark to global page number " + global_page_num);	
	resetbookmark(global_page_num);
	last_page_read = global_page_num;
	$("#bookmark_image").attr("src","images/bookmark_red_trans.png");
	//$("#bookmark_indicator").text(" ^");
			//var x = $("#1").position().left;
			//alert("what is the left position of section 2:" + x);	
		
	})
	
	$("#arrow_toolbar").bind('change',function(event, ui){
		
		var current_arrow_setting = $("#arrow_toolbar").val();
		
		if (current_arrow_setting == 'off') {
	
		$('#arrow_up_image').css('visibility', 'hidden');
		
		}
		
		if (current_arrow_setting == 'on') {
			
			$('#arrow_up_image').css('visibility', 'visible');
			
		}
		
	
	})
	
	$("#hide_next_button").bind('click',function(event, ui){
	
	var stored_page_pref = $.cookie("page_pref"+current_pub);
	if (stored_page_pref == "show") {	

		
		var bgcolor = 'white';
		var font_color = 'black';
		$.cookie("page_pref"+current_pub, "hide");
		$('#next_image').hide();
		$('#previous_image').hide();
		$('#scroller').css('background-color', bgcolor);
		$('#scrollcontainer').css('background-color', bgcolor);
		$('#mainbody').css('background-color', bgcolor);
		$('#mainfooter').css('background-color', bgcolor);
		$('#maincenter').css('background-color', bgcolor);
		$('#one').css('background-color', bgcolor);
		$('body').css('background-color', bgcolor);
		$('html').css('background-color', bgcolor);		
		$('p').css('color', font_color);	
	}
	else
	{
		var bgcolor = 'black';
		var font_color = 'white';

		$.cookie("page_pref"+current_pub, "show");
		$('#next_image').show();
		$('#previous_image').show();	
		$('#scroller').css('background-color', bgcolor);
		$('#scrollcontainer').css('background-color', bgcolor);
		$('#mainbody').css('background-color', bgcolor);
		$('#mainfooter').css('background-color', bgcolor);
		$('#maincenter').css('background-color', bgcolor);
		$('#one').css('background-color', bgcolor);
		$('body').css('background-color', bgcolor);
		$('html').css('background-color', bgcolor);
		$('p').css('color', font_color);		
		
	}
	
	})
	
	$("#font_size_increase_button").bind('click',function(event, ui){
	var originalFontSize = $('p').css('font-size');
	
    var currentFontSize = $('p').css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*1.2;
    $('p').css('font-size', newFontSize);
	$('ol').css('font-size', newFontSize);
	$('ul').css('font-size', newFontSize);
	updatePageNum();
    return false;
	

	})
	
	$("#font_size_decrease_button").bind('click',function(event, ui){
	var originalFontSize = $('p').css('font-size');
	
    var currentFontSize = $('p').css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*0.8;
    $('p').css('font-size', newFontSize);
	$('ol').css('font-size', newFontSize);
	$('ul').css('font-size', newFontSize);
	updatePageNum();
    return false;
	

	})	
	
	$("#toc_button").bind('click',function(event, ui){
		
		//alert("did we click on toc button?");	
				last_page_read = global_page_num;
				
				gototoc(1);
			
		})		
		
	
	// This little IF statement make sure that left/right arrow buttons allow cursor to moved around edit on Publish page but are active when on normal published pages
	if ($.mobile.activePage.attr('id') != 'publish') {
	
	// left arrow key  on keyboard - go to the next page
	$(document).keydown(function(e){
    if (e.keyCode == 39) { 
       gotonextpage();
       return false;
    }
	})
	
	// right arrow key on keyboard - go to the previous page
	$(document).keydown(function(e){
    if (e.keyCode == 37) { 
       gotopreviouspage();
       return false;
    }
	})
	
	}
		



    // A standard 'swipe' can be used to trigger event regardless of direction
	// Start standard scrolling

	$("#scroller").bind('scrollstart',function(event, ui){
		//event.preventDefault();
		start_px = $("#scroller").scrollLeft();
	})
	
	
    $("#scroller").bind('scrollstop',function(event, ui){
		//event.preventDefault();
		
		stop_px = $("#scroller").scrollLeft();
		// alert("scrolled prevent is set to " + just_scrolled_prevent);
		// alert("This is how much it start and then stop: " + start_px + " end" + stop_px);
		
			// OLD WAY - var main_window = $(window).width() - main_window_adjust;
		var main_window = $('#scrollcontainer').width();
		
		// OLD WAY actual_page_window = main_window - hori_pad;
		actual_page_window = main_window + global_gap;

		
		if (start_px < stop_px) {
		// go to next page	
		gotonextpage();
	
		} // end of if when going to next page

		if (start_px > stop_px && global_page_num > 1) {
			// go to previous page
			gotopreviouspage();
			} // end of if when going to previous page		
    })		// end of scrolling landscape
	
	    // A standard 'swipe' for store navbar

	$("#storenavbar").bind('touch',function(event, ui){
		//event.preventDefault();
		alert('hey touch');
		
		
		
	})
	
	
$(window).bind('orientationchange resize', function(event){
      if(event.orientation) {
            if(event.orientation == 'portrait') {
				if (current_pub != 'store.cfm') {
				var main_window_width = $(window).width();
				var adjust_portrait_width = main_window_width - 120;
				$("#scrollcontainer").width(adjust_portrait_width);
				$("#scroller").width("100%");
				
				}
				
		  resesizewindows();
	          } else if (event.orientation == 'landscape') {
                       resesizewindows();
                       } 
            } else {
                  // optional... PC-version javascript for example
                  }

      });
	
	
$("#slider-0").bind("vmouseup", function(event, ui){
//	var slider_val = $("#scroller").scrollLeft();
    //alert("yo");
  });
  

  
})	//----- end of jquery load page function?
	

function load() {
	
	resesizewindows();
	getbookmarksetup();
	updatePageNum();
	gotopage(global_page_num);
	$.mobile.hidePageLoadingMsg();
}

function reload() {
	
	resesizewindows();
	getbookmarksetup();
	updatePageNum();
	gotopage(global_page_num);
	$.mobile.hidePageLoadingMsg();
}

function resesizewindows() {
				
				var main_window_height = $(window).height();
				var main_window_width = $(window).width();
				if (main_window_height > main_window_width ) {
					global_current_orientation = 0;				
					
				}
				else
				{
					global_current_orientation = 1;
				}
				// seems to be the key to starting natural getting top to work 
				// REMOVING CHECK ON ORIENTATION - try to handle generically if (global_current_orientation == 0) {
					
				
					var adjust_portrait_height = main_window_height - 70;
					
					//if ((current_pub != 'solartimes.cfm'))	{
					$("#mainbody").height("100%");
					$("#mainbody").width("100%");
					$("#container").height("100%");
					$("#container").width("100%");
					$("#scroller").width("100%");	
					$("#scroller").height(adjust_portrait_height);	
					
					//}	
					//$("#scroller").height(adjust_main_landscape_height);
				//}				
				//if (global_current_orientation == 1) {
					var adjust_landscape_height = main_window_height;//*** here is where we make full screen adjust_landscape_height = main_window_height - 74 NOTE 74 for bottom margine for footer ***//
					
					
					
					if (global_full_page == 1) {
						
						if (current_pub == 'store.cfm') {
							//$("#scroller").height(adjust_landscape_height - 124);
							$("#scroller").height(adjust_landscape_height - 344);
							$("#scroller").width("100%");
							
						}
						else if (current_pub == 'elearn-sailboat.cfm') {
							//$("#scroller").height(adjust_landscape_height - 124);
							
							$("#scrollcontainer").height(adjust_landscape_height+70);
							$("#scroller").width("100%");
							
						}
						else if (current_pub == 'solartimes.cfm') {
							//$("#scroller").height(adjust_landscape_height - 124);
							
							// $("#scroller").height(adjust_landscape_height);
							// $("#scroller").width("100%");
							
						}
						else if ((current_pub == 'addpub.cfm') || (current_pub == 'buy.cfm'))  {
							//$("#scroller").height(adjust_landscape_height - 124);
							
							$("#scroller").height(adjust_landscape_height-70);
							$("#scroller").width("100%");
							
						}
						else
						{
							$("#scroller").height(adjust_landscape_height);
							$("#scroller").width("100%");
						}
						
					//}
					//else
					//{
							// This one affects the store...add/subtract if store content changes.
							$("#scroller").height(adjust_landscape_height - 100);
							$("#scroller").width("100%");
							
					}
					else
					{
						
							$("#scroller").height(adjust_landscape_height - 70);
							$("#scroller").width("100%");
							
						
							
	
					}
						
					//}
					
			
				
$.mobile.hidePageLoadingMsg();
	
}

function getbookmarksetup() {
	var stored_bookmark = $.cookie("bookmark"+current_pub);
	if (stored_bookmark == null) {
	$.cookie("bookmark"+current_pub, "1", { expires: 512 });
	$.cookie("current_bookmark", "1", { expires: 512 });
	$.cookie("page_pref"+current_pub, "show_true", { expires: 512 });
	// alert( "Null bookmark, so set it to 1" + $.cookie("bookmark") );
	}
	else
	{
		var stored_page_pref = $.cookie("page_pref"+current_pub);
		if (stored_page_pref != "show") {
		$('#next_image').hide();
		$('#previous_image').hide();
		}
		global_page_num = parseInt($.cookie("bookmark"+current_pub));

	}	
}

function updatePageNum() {
	
	var container = document.getElementById('scroller').scrollWidth;
	var actual_main_window = $(window).width() - main_window_adjust;
	var main_window_height = $(window).height();
	var column_width = $('#scroller').css('-webkit-column-width');
	var column_gap = $('#scroller').css('-webkit-column-gap');


	if (global_full_page == 0) {			
			if (actual_main_window >= 1600) { // this would be when three columns appear
				
					var newGapWidth = 30;
					var newColumnWidth = 317;
					var newScrollContainer = 1320;
					//var newScrollContainer = 1440;
					$('#scrollcontainer').css('width', newScrollContainer);
					$('#scroller').css('-webkit-column-gap', newGapWidth);
					$('#scroller').css('-webkit-column-width', newColumnWidth);
					$('#scroller').css('-ms-column-gap', newGapWidth);
					$('#scroller').css('-ms-column-width', newColumnWidth);	
					$('#scroller').css('-moz-column-gap', newGapWidth);
					$('#scroller').css('-moz-column-width', newColumnWidth);										
					//$('#scrollcontainer').css('width', newScrollContainer);
					
				}
			else if (actual_main_window >= 1440) { // this would be when three columns appear
				
					var newGapWidth = 30;
					var newColumnWidth = 317;
					var newScrollContainer = 1320;
					//var newScrollContainer = 1440;
					$('#scrollcontainer').css('width', newScrollContainer);
					$('#scroller').css('-webkit-column-gap', newGapWidth);
					$('#scroller').css('-webkit-column-width', newColumnWidth);
					$('#scroller').css('-moz-column-gap', newGapWidth);
					$('#scroller').css('-moz-column-width', newColumnWidth);	
					$('#scroller').css('-ms-column-gap', newGapWidth);
					$('#scroller').css('-ms-column-width', newColumnWidth);									
					//$('#scrollcontainer').css('width', newScrollContainer);
					
				}
			else if (actual_main_window >= 1280) { // this would be when three columns appear
				
					var newGapWidth = 30;
					var newColumnWidth = 318;
					var newScrollContainer = 1164;
					//var newScrollContainer = 1440;
					$('#scrollcontainer').css('width', newScrollContainer);
					$('#scroller').css('-webkit-column-gap', newGapWidth);
					$('#scroller').css('-webkit-column-width', newColumnWidth);
					$('#scroller').css('-moz-column-gap', newGapWidth);
					$('#scroller').css('-moz-column-width', newColumnWidth);	
					$('#scroller').css('-ms-column-gap', newGapWidth);
					$('#scroller').css('-ms-column-width', newColumnWidth);					
					//$('#scrollcontainer').css('width', newScrollContainer);
					
				}
				
			else if (actual_main_window >= 1024) { // this would be when three columns appear
				
					var newGapWidth = 30;
					var newColumnWidth = 318;
					var newScrollContainer = 904;
					//var newScrollContainer = 1440;
					$('#scrollcontainer').css('width', newScrollContainer);
					$('#scroller').css('-webkit-column-gap', newGapWidth);
					$('#scroller').css('-webkit-column-width', newColumnWidth);
					$('#scroller').css('-moz-column-gap', newGapWidth);
					$('#scroller').css('-moz-column-width', newColumnWidth);	
					$('#scroller').css('-ms-column-gap', newGapWidth);
					$('#scroller').css('-ms-column-width', newColumnWidth);					
					//$('#scrollcontainer').css('width', newScrollContainer);
					
				}
				
			else if (actual_main_window <= 480) { // this would be when three columns appear
				
					var newGapWidth = 20;
					var newColumnWidth = 300;
					var newScrollContainer = 320;
					//var newScrollContainer = 1440;
					$('#scrollcontainer').css('width', newScrollContainer);
					$('#scroller').css('-webkit-column-gap', newGapWidth);
					$('#scroller').css('-webkit-column-width', newColumnWidth);
					$('#scroller').css('-moz-column-gap', newGapWidth);
					$('#scroller').css('-moz-column-width', newColumnWidth);	
					$('#scroller').css('-ms-column-gap', newGapWidth);
					$('#scroller').css('-ms-column-width', newColumnWidth);					
					//$('#scrollcontainer').css('width', newScrollContainer);
					
				}								
				
	} // end of check for full page 0 which means false, if it is the width is set 904, full page
						

		
	 
	
	
	var container = document.getElementById('scroller').scrollWidth;
	// OLD WAY - var main_window = $(window).width() - main_window_adjust;
	var actual_window = $(window).width() - main_window_adjust;
	var main_window = $('#scrollcontainer').width();
	var main_window_height = $(window).height();
	var column_width = parseInt($('#scroller').css('-webkit-column-width'));
	var column_gap = parseInt($('#scroller').css('-webkit-column-gap'));	
	// DON'T NEED TO SUBTRACT MARGINS? var page_width = main_window - 120;
	var page_width = main_window;
	var number_of_columns = (page_width + column_gap)/(column_width + column_gap);
	
  // TOOL FOR SEEING SIZES of things: $("#position").text("sw: " + container + " mw: " + main_window + " cw: " + column_width + " cg: " + column_gap + " cols: " + number_of_columns + " aw: " + actual_window); 


	var container = document.getElementById('scroller').scrollWidth;
	// OLD WAY - var main_window = $(window).width() - main_window_adjust;
	var main_window = $('#scrollcontainer').width() + global_gap;
	var pages_total = container/(main_window);
	var pages_rounded = Math.floor(pages_total)+1;			
	global_total_page_landscape = pages_rounded;
	// Change to generic: if (global_current_orientation == 1) {
		showPageNum("",  global_total_page_landscape, global_page_num + " of ");
	//}
	//else
	//{
		//showPageNum("- end -",  "", "");
	//}
}

function showPageNum(ele, total, current) {
	
	
  $("#page_nums").text(ele + current + total);
  var page_percent = parseInt(current)/parseInt(total);
  page_percent = page_percent * 100;
  var display_page_percent = page_percent.toPrecision(3);
  var slider_value = page_percent;
  $("#page_percent").text(display_page_percent + "%");
  $("#slider-0").val(slider_value);
  $("#slider-0").slider('refresh');

}

// Go to a page

function gotopage(page_to) { //v3.0



				//if ( global_current_orientation == 0) {
								//var port_top = $("#mainbody").scrollTop();
								//var main_window_width = $(window).width() - 80;
								//var main_window_height = $(window).height() - hori_pad; // oritentation is port, so horizontal pad is the reference. width 904 on ipad, height is 688 when no safari tabs, 598 with safari tabs - .6615
								//var proportion_multiplier = main_window_width/main_window_height;
								//var move_top_by = page*1064*proportion_multiplier;
								
								//alert("we should have scrolled down" + move_top_by + "port top val:" + port_top);
								//$('div.cover').hide();
// doesn't seem to work								$("[data-position='fixed']").fixedtoolbar('hide');
// doesn't seem to work								$("[data-position='fixed']").fixedtoolbar('updatePagePadding');
								//$("#mainbody").scrollTop(move_top_by);
								
								
												
					
					
								//showWidth("All Pages",  "", "");						

	
				//}
									
				

				//if ( global_current_orientation == 1) {
					// OLD WAY - var main_window = $(window).width() - main_window_adjust;
				var main_window = $('#scrollcontainer').width();
				// OLD WAY var actual_page_window = main_window - hori_pad;
				var actual_page_window = main_window + global_gap;
				
				
				
				var container = document.getElementById('scroller').scrollWidth;
					// OLD WAY - var main_window = $(window).width() - main_window_adjust;
				var main_window = $('#scrollcontainer').width() + global_gap;
				var pages_total = container/(main_window);
				var pages_rounded = Math.floor(pages_total)+1;			
				global_total_page_landscape = pages_rounded;
				global_page_num = page_to;
				var left_scroll_position = $("#scroller").scrollLeft();

				//alert("What page number are we going to? " + global_page_num + "page passed in " + page_to + "What position is scroller at?" + left_scroll_position);
				
				//$('div.cover').hide();
				
	
				$("#scroller").scrollLeft((page_to-1)*(actual_page_window));	
				
				
				
				$.cookie("bookmark"+current_pub, page_to);
				$.cookie("current_bookmark", page_to);
				showPageNum("",  global_total_page_landscape, page_to + " of ");	
								var current_bookmark_val = parseInt($.cookie("bookmark"+current_pub));
								if (current_bookmark_val == global_page_num) {	
									$("#bookmark_image").attr("src","images/bookmark_red_trans.png");
								}
								else
								{
									$("#bookmark_image").attr("src","images/bookmark_black_trans.png");
								}				
								
	
				//}
								

				
					
	
}

// TOC stuff
function gototoc(page){ //v3.0

				



				//if ( global_current_orientation == 0) {
					//			var port_top = $("#toc").offset().top;
						//		var move_top_by = port_top - 60;
								
								//alert("we should have scrolled down" + move_top_by + "port top val:" + port_top);
							//	$("#mainbody").scrollTop(move_top_by);
								
												
					
					
								//showWidth("All Pages",  global_total_page_portrait, global_page_num);						

	
				//}
									
				

				//if ( global_current_orientation == 1) {
					// OLD WAY - var main_window = $(window).width() - main_window_adjust;
				var main_window = $('#scrollcontainer').width();
				// actual_page_window = main_window - hori_pad;
				actual_page_window = main_window + global_gap;
				//alert("do we get into the goto toc function?");
								var port_top = $("#toc").position().left;
								//alert("What is port top when no toc? " + port_top);
								var move_top_by = port_top;
								var toc_page = move_top_by/(actual_page_window);
								var toc_page_rounded = Math.floor(toc_page)+1;
												
				// *** We are putting the TOC on page 1 always for now...eventually find it.
				// *** por_top offset position is a negative number relative to current scroll...so
				// *** need to figure out how to move to that position.
				global_page_num = 1;
										if ((current_pub == 'solvil1.cfm') || (current_pub == 'solvil2.cfm') || (current_pub == 'solvil3.cfm') || (current_pub == 'solvil4.cfm') || (current_pub == 'solvil5.cfm')) {
						
						window.location = "?pub=solvil.cfm";
						
					}			
					if ((current_pub == 'solworld1.cfm') || (current_pub == 'solworld2.cfm') || (current_pub == 'solworld3.cfm')) {
						
						window.location = "?pub=solarworld.cfm";
						
					}	
					
					if ((current_pub == '100percent_re1.html') || (current_pub == '100percent_re2.html') || (current_pub == '100percent_re3.html')) {
						
						window.location = "?pub=100percent_re.html";
						
					}	
					
					if ((current_pub == 'SunRise1.cfm') || (current_pub == 'SunRise2.cfm') || (current_pub == 'SunRise3.cfm')) {
						
						window.location = "?pub=SunRise.htm";
						
					}				
						
				// we aren't setting last page read to 1 at this point in theory it is the one before they came to toc
				if (move_top_by < 0) {

				$("#scroller").scrollLeft(move_top_by);
				
								container = document.getElementById('scroller').scrollWidth;
									// OLD WAY - var main_window = $(window).width() - main_window_adjust;
								var main_window = $('#scrollcontainer').width() + global_gap;
								pages_total = container/(main_window);
								pages_rounded = Math.floor(pages_total)+1;			
								global_total_page_landscape = pages_rounded;
								showPageNum("",  global_total_page_landscape, global_page_num + " of ");
								var current_bookmark_val = parseInt($.cookie("bookmark"+current_pub));
								if (current_bookmark_val == global_page_num) {	
									$("#bookmark_image").attr("src","images/bookmark_red_trans.png");
								}
								else
								{
									$("#bookmark_image").attr("src","images/bookmark_black_trans.png");
								}
								
				}
				else
				{

					
				}
								
								
				//}
								

				
					
	
}

// Go to Chapters in Table of Contents #toc element in the publicaiton text

function gototocchapter(chapter) {

				
	
	
			//alert("Reset bookmark to the following" + reset_page);
			//if ( global_current_orientation == 1) {
			var chapter_num_element = chapter;
								if (chapter == 1) {
								var port_top = $("#c1").position().left;
								}
								if (chapter == 2) {
								var port_top = $("#c2").position().left;
								}
								if (chapter == 3) {
								var port_top = $("#c3").position().left;
								}
								if (chapter == 4) {
								var port_top = $("#c4").position().left;
								}
								if (chapter == 5) {
								var port_top = $("#c5").position().left;
								}
								if (chapter == 6) {
								var port_top = $("#c6").position().left;
								}
								if (chapter == 7) {
								var port_top = $("#c7").position().left;
								}
								if (chapter == 8) {
								var port_top = $("#c8").position().left;
								}
								if (chapter == 9) {
								var port_top = $("#c9").position().left;
								}
								if (chapter == 10) {
								var port_top = $("#c10").position().left;
								}
								if (chapter == 11) {
								var port_top = $("#c11").position().left;
								}
								if (chapter == 12) {
								var port_top = $("#c12").position().left;
								}
								if (chapter == 13) {
								var port_top = $("#c13").position().left;
								}
								if (chapter == 14) {
								var port_top = $("#c14").position().left;
								}
								if (chapter == 15) {
								var port_top = $("#c15").position().left;
								}
								if (chapter == 16) {
								var port_top = $("#c16").position().left;
								}
								if (chapter == 17) {
								var port_top = $("#c17").position().left;
								}
								if (chapter == 18) {
								var port_top = $("#c18").position().left;
								}
								if (chapter == 19) {
								var port_top = $("#c19").position().left;
								}
								if (chapter == 20) {
								var port_top = $("#c20").position().left;
								}																	
								var move_top_by = port_top;
								
								var container = move_top_by;
									// OLD WAY - var main_window = $(window).width() - main_window_adjust;
								var main_window = $('#scrollcontainer').width() + global_gap;
								var pages_to_chapter = container/(main_window);
								var pages_to_chapter_rounded = Math.floor(pages_to_chapter)+global_page_num;
											
								var global_to_chapter = pages_to_chapter_rounded;												
				
				global_page_num = global_to_chapter;
				//alert("global_page_num of chapter to go to" + global_page_num);
				gotopage(global_page_num);
				
			
			//} // end of if landscape orientation
}


// go to next page

function gotonextpage() {

			// alert("This is if start less than stop");
			//if (just_animated == 0) {
							// alert("just animated is 0");
							
				if (global_page_num < global_total_page_landscape) {			
				var from_page = global_page_num;
				var to_page = global_page_num + 1;
				global_page_num = global_page_num + 1;
				
							
				// alert("global_page_num " + global_page_num);								

	
								
								showPageNum("",  global_total_page_landscape, global_page_num + " of ");	
								$.cookie("bookmark"+current_pub, global_page_num);
								$.cookie("current_bookmark", global_page_num);
								UpdateBookmark(global_page_num);
								var current_bookmark_val = parseInt($.cookie("bookmark"+current_pub));
								if (current_bookmark_val == global_page_num) {	
									$("#bookmark_image").attr("src","images/bookmark_red_trans.png");
								}
								else
								{
									$("#bookmark_image").attr("src","images/bookmark_black_trans.png");
								}
								
								scroll_landscape(global_page_num);
								
				} // end of check on at end of publication
									
}

function gotopreviouspage() {
				// go to the previous page
			// alert("This is if start less than stop");
			//if (just_animated == 0) {
							// alert("just animated is 0");
				if (global_page_num > 1) {			
				var from_page = global_page_num;
				var to_page = global_page_num - 1;
				global_page_num = global_page_num - 1;
				
				
							
				// alert("global_page_num " + global_page_num);								

								showPageNum("",  global_total_page_landscape, global_page_num + " of ");
								UpdateBookmark(global_page_num);
								var current_bookmark_val = parseInt($.cookie("bookmark"+current_pub));
								if (current_bookmark_val == global_page_num) {	
									$("#bookmark_image").attr("src","images/bookmark_red_trans.png");
								}
								else
								{
									$("#bookmark_image").attr("src","images/bookmark_black_trans.png");
								}
								
								scroll_landscape(global_page_num);
								
				} // end of if on whether at start of document

			}
			
function scroll_landscape(page) {
				actual_page_window = $('#scrollcontainer').width() + global_gap;
				//alert("actual page window " + actual_page_window);
				$("#scroller").scrollLeft((global_page_num-1)*actual_page_window);
				
				//$("#scroller").animate({scrollLeft:(global_page_num-1)*actual_page_window},'slow');
				
				//$("#scroller").animate({ scrollLeft: ((global_page_num-1)*actual_page_window) },1500,'easeInOutExpo');
								container = document.getElementById('scroller').scrollWidth;
									// OLD WAY - var main_window = $(window).width() - main_window_adjust;
								var main_window = $('#scrollcontainer').width() + global_gap;
								pages_total = container/(actual_page_window);
								pages_rounded = Math.floor(pages_total)+1;			
								global_total_page_landscape = pages_rounded;
								showPageNum("",  global_total_page_landscape, global_page_num + " of ");
								global_position_percent = global_page_num/global_total_page_landscape;
								//event.preventDefault();
											
				//$("#scroller_landscape").stop();
			
				

}

// bookmark handling

function resetbookmark(reset_page) {
			//alert("Reset bookmark to the following" + reset_page);
			
			$.cookie("bookmark"+current_pub, reset_page);
			$.cookie("current_bookmark", reset_page);
				global_page_num = reset_page;
				UpdateBookmark(global_page_num);
				gotopage(reset_page);

				

}

function gotobookmarkpage() {
				
				$('#config.ui-dialog').dialog('close');
				bookmark = parseInt($.cookie("bookmark"+current_pub));

				//alert("Should be trying to go to current book mark at page... " + global_page_num + "current bookmark"+ bookmark);
				global_page_num = parseInt($.cookie("bookmark"+current_pub));
				
				gotopage(global_page_num);
}

function gotolastpageread() {
				
				gotopage(last_page_read);
}

// Some data functions

        function onSuccess(data, status)
        {	
			//alert("success?");
            data = $.trim(data);
            $("#result1").text(data);
        }
 
        function onError(data, status)
        {
           // alert("error?");
        }  



function hideLoadingIndicator(){
        // this.base();
        $.mobile.pageLoading(true);
		}

//Some utility functions

var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(doSomething, 200);
	
});


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// some useful common functions
	
function isInteger(s) {
  return (s.toString().search(/^-?[0-9]+$/) == 0);
}		

function openebook(ebookfile) {
	window.location = "?pub=" + ebookfile;
}

function storesearch(typeinput) {
	window.location = "?pub=store.cfm" + "&amp;search=" + search.value + "&amp;type=" + typeinput;
}

//	end of clicking right and left sides
function calcPages(ele, w, c) {
  $("#page_nums").text(""+ c +" of " + w);
}

function doSomething() {
	
	//alert("If you change the window size you should refresh the browser to resize the content of the book properly.");
   
};

function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+"?pub="+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}	

function CAT_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+"?pub=store.cfm&search="+current_search+"&offer="+current_offer+"&state="+current_state+"&sort="+current_sort+"&category="+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}	

// new checks on CKEDITOR to make sure 2000 characters or less, from http://www.rodi.nu/blog/2010/06/ckeditor-maximum-length/

function getCurrentCount(editor)
{
	var currentLength = editor.getData()
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ')
		.replace(/&\w+;/g ,'X')
		.replace(/^\s*/g, '')
		.replace(/\s*$/g, '')
		.length;
 
	return currentLength;
}
 
function checkLength(evt)
{
	var stopHandler = false;
	var currentLength = getCurrentCount(evt.editor);
	var maximumLength = 350;
 
	if(evt.editor.config.MaxLength)
	{
		maximumLength = evt.editor.config.MaxLength;
	}
 
	if(!evt.editor.config.LockedInitialized)
	{
		evt.editor.config.LockedInitialized = 1;
		evt.editor.config.Locked = 0;
	}
 
	if(evt.data)
	{
		if(evt.data.html)
		{
			currentLength += evt.data.html.length;
		}
		else if(evt.data.text)
		{
			currentLength += evt.data.text.length;
		}
	}
 
	if(!stopHandler && currentLength >= maximumLength)
	{
		if ( !evt.editor.config.Locked )
		{
			// Record the last legal content.
			evt.editor.fire( 'saveSnapshot' );
			evt.editor.config.Locked = 1;
			// Cancel the keystroke.
			evt.cancel();
		}
		else
			// Check after this key has effected.
			setTimeout( function()
			{
				// Rollback the illegal one.
				if( getCurrentCount(evt.editor) > maximumLength )
					evt.editor.execCommand( 'undo' );
				else
					evt.editor.config.Locked = 0;
			}, 0);
	}
}

function UpdateBookmark(obj){
	$.post('/updatebookmark.cfm',$("#pageform").serialize(),function(data,obj){
		$("#result").html(data)
	});
	return false
	
	
	//alert("Bookmark value is:" + obj);
    //$.ajax({
      //  type: "POST",
        //url: "/updatebookmark.cfm",
        //datatype: "html",
        //data: "bookmark=" + obj,
        //success: function() {
            
          //  alert("Bookmark updated.");
        //},
        //error: function(){
        //   alert("Bookmark could not be saved on the server.");
       // }
    //});
}

