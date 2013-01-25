// ipub.js version 0.3 BETA, January 25, 2013...maybe alpha?
// Copyright John Wilson 2013


//$.mobile.showPageLoadingMsg("b", "Loading and typesetting your publication. We'll have it on screen in just a second....", false);



//global variables
global_page_num = 1;
global_gap = 30;
global_total_page = 1;
start_px = 0;
stop_px = 0;

main_window = $('#scrollcontainer').width();

current_pub = getUrlVars()["pub"];
action_pub = getUrlVars()["action"];
if (current_pub == null) {
	current_pub="store.cfm";
};

current_ipub = getUrlVars()["ipub"];
if (current_ipub == null) {
	current_ipub="-1";
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

current_action = getUrlVars()["action"];
if (current_action == null) {
	current_action="none";
}

current_hidetopbar = getUrlVars()["hidetopbar"];
if (current_hidetopbar == null) {
	current_hidetopbar="no";
}



//$.mobile.showPageLoadingMsg("b", "Loading and typesetting your publication. We'll have it on screen in just a second....", false);
//alert("bookmark URL " + current_bookmark);
//****** Good place to put a loading message....before things load

//current_bookmark = parseInt(getUrlVars()["pagenum"]);
//if (current_bookmark == null) {
//	current_bookmark="1";
//}
//else
//{
//	$.cookie("bookmark"+current_pub, current_bookmark, { expires: 512 });
//	$.cookie("current_bookmark", current_bookmark, { expires: 512 });
//}
//alert("url page num " + current_bookmark);


$(document).bind("mobileinit", function() {	
  $.support.touchOverflow = true;
  $.mobile.touchOverflowEnabled = true;

});



$(document).bind( 'pageinit', function() {
	


$.mobile.showPageLoadingMsg("b", "Loading and typesetting your publication. We'll have it on screen in just a second....", false);


if ( current_action == 'edit') {
$("[data-role=header]").fixedtoolbar({ tapToggleBlacklist: "video, a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .listing, #search-basic, #popupSearchPanel, #closesearch, #popupPanel, #storetoolbar, #previous, #next, #scroller, #edit_site_menu_id, #page_edit, #scroller, #scrollcontainer, #title, #wikiprev, #wikinext" });	
}
else
{
$("[data-role=header]").fixedtoolbar({ tapToggleBlacklist: "video, a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .listing, #search-basic, #popupSearchPanel, #closesearch, #popupPanel, #storetoolbar, #previous, #next, #wikiprev, #wikinext" });
}


	

if (current_pub == 'solartimesv2.cfm') {
			var cf = new FTColumnflow('target', 'viewport', {
				columnCount:           3,
				standardiseLineHeight: true,
				pagePadding:           30,
			});

			cf.flow(document.getElementById('flowedContent'), document.getElementById('fixedContent'));	
}

$( "#popupPanel" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height();

        $( "#popupPanel" ).css( "height", h );
    }
})



$( "#popupSearchPanel" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height();
		h = h + 45;

        $( "#popupSearchPanel" ).css( "height", h );
    }
})
	
$("#savedata").bind('click',function(event, ui){						
//var data1 = CKEDITOR.instances.scroller.getData();
var data1 = $('#scroller').html();
var title1 = $("#edit_section_title").val();
var file_id1 = $("#edit_file_id").val();
var site_menu_id1 = $("#edit_site_menu_id").val();
var state1 = $("#edit_state_val").val();
var author1 = $("#edit_author").val();
var site_tab_id1 = $("#edit_site_tab_id").val();
var FiletoUploadImage1 = $("edit_FiletoUploadImage").val();
var imagefile1 = $("edit_imagefile").val();
var obj = { filecontent: data1,
			section_title: title1,
			file_id: file_id1,
			site_menu_id: site_menu_id1,
			state_val: state1,
			author: author1,
			site_tab_id: site_tab_id1,
			FiletoUploadImage: FiletoUploadImage1,
			imagefile: imagefile1 };
//alert("Posting Data.");
$.post('./savepub_process.cfm', obj, myCallbackFunction);
//alert("Post Done.");

})

$("#savedataclose").bind('click',function(event, ui){						
//var data1 = CKEDITOR.instances.scroller.getData();
var data1 = $('#scroller').html();
var title1 = $("#edit_section_title").val();
var file_id1 = $("#edit_file_id").val();
var site_menu_id1 = $("#edit_site_menu_id").val();
var state1 = $("#edit_state_val").val();
var gotopage1 = 'store';
var author1 = $("#edit_author").val();
var site_tab_id1 = $("#edit_site_tab_id").val();
var FiletoUploadImage1 = $("edit_FiletoUploadImage").val();
var imagefile1 = $("edit_imagefile").val();
var obj = { filecontent: data1,
			section_title: title1,
			file_id: file_id1,
			site_menu_id: site_menu_id1,
			state_val: state1,
			gotopage: gotopage1,
			author: author1,
			site_tab_id: site_tab_id1,
			FiletoUploadImage: FiletoUploadImage1,
			imagefile: imagefile1 };
//alert("Posting Data.");
$.post('./savepub_process.cfm', obj, myCallbackFunctionClose);
//alert("Post Done.");

})



$("#closesearch").bind('click',function(event, ui){
				
				$( "#popupSearchPanel" ).popup( "close" );
			
		})		

$("#search-basic").bind( "change", function(event, ui) {
     var searchinput = $("#search-basic").val();
	 var inputtype = $("#inputtype").val();
	 window.location = "?pub=store.cfm" + "&search=" + searchinput + "&type=" + inputtype  ;
	})
	
$("#toc_button").bind('click',function(event, ui){
		
		//alert("did we click on toc button?");	
				last_page_read = global_page_num;
				var tocShow = 'block';
				$('#toc').css('display', 'block');
				
				gototoc(1);
			
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
	
	$("#font_size_increase_button_a").bind('click',function(event, ui){
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
	
	$("#font_size_decrease_button_a").bind('click',function(event, ui){
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
	
	$('#night_mode_button').bind('click', function (event) {
    event.preventDefault();
    var theme = 'f';
	var stored_night_mode = $.cookie("night_mode"+current_pub);
	if (stored_night_mode == null) {
	$.cookie("night_mode"+current_pub, "night", { expires: 512 });
	}
	if (stored_night_mode == "day") {
		var theme = 'd';
		$.cookie("night_mode"+current_pub, "night", { expires: 512 });
	}
	if (stored_night_mode == "night") {
		var theme = 'f';
		$.cookie("night_mode"+current_pub, "day", { expires: 512 });
	}
		
    $.mobile.activePage.find('.ui-btn')
                       .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
                       .addClass('ui-btn-up-' + theme)
                       .attr('data-theme', theme);
    $.mobile.activePage.find('.ui-header, .ui-footer')
                       .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
                       .addClass('ui-bar-' + theme)
                       .attr('data-theme', theme);
    $.mobile.activePage.removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
                       .addClass('ui-body-' + theme)
                       .attr('data-theme', theme);
	})
	
	$('#columns_button').bind('click', function (event) {
    event.preventDefault();
    var columns = '-1';
	var stored_columns = $.cookie("columns"+current_pub);
	if (stored_columns == null) {
	$.cookie("columns"+current_pub, "-1", { expires: 512 });
	}
	if (stored_columns == "yes") {
		var columns = 'no';
		$.cookie("columns"+current_pub, "no", { expires: 512 });
	}
	if ((stored_columns == "no") || (stored_columns == "-1")) {
		var columns = 'yes';
		$.cookie("columns"+current_pub, "yes", { expires: 512 });
	}
	var stored_columns = $.cookie("columns"+current_pub);
	//alert("What is stored column value " + stored_columns);
	if (stored_columns == 'yes') {
		var newColumnWidth = 318;
    	$('#scroller').css('column-width', newColumnWidth);
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		updatePageNum();	
	}
	if (stored_columns == 'no') {
		var main_window_width = $(window).width();
		var newColumnWidth = main_window_width;
    	$('#scroller').css('column-width', newColumnWidth);
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);
		updatePageNum();
		gotopage(global_page_num);	
	}
	})
	
	$(window).bind('orientationchange resize', function(event){
      if(event.orientation) {
            if(event.orientation == 'portrait') {
				resesizewindows();
	          } else if (event.orientation == 'landscape') {
                       resesizewindows();
                       } 
            } else {
                  // optional... PC-version javascript for example
                  }

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
	  
if ( current_action == 'edit') {
//prevent left and right arrows	
}
else
{
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
	
	
	
  //Scrolling handler	
  
scroll_option = $("#scroll_option").val();
if (scroll_option == null) {
	scroll_option="no"
} 
			if (scroll_option == 'no') {
			$("#scrollcontainer").bind('scrollstart',function(event, ui){
			//Key to preventing scroll up and down that caused pages to scroll left and right only part way
				
				event.preventDefault();
				
			})
			}

	  		$("#scroller").bind('scrollstart',function(event, ui){
			//event.preventDefault();
			start_px = $("#scroller").scrollLeft();
			})
			
	  
	  		$("#scroller").bind('scrollstop',function(event, ui){
			
			stop_px = $("#scroller").scrollLeft();
			
			
			//alert("top position " + start_px_top + "stop top " + stop_px_top);
			
			// alert("scrolled prevent is set to " + just_scrolled_prevent);
			//alert("This is how much it start and then stop: " + start_px + " end" + stop_px + "start y " + start_px_y + "stop y " + stop_px_y);
			
				// OLD WAY - var main_window = $(window).width() - main_window_adjust;
			var main_window = $('#scrollcontainer').width();
			
			// OLD WAY actual_page_window = main_window - hori_pad;
			actual_page_window = main_window + global_gap;
			
			if (start_px < stop_px) {
				// go to next page	
				var abs_diff = stop_px - start_px;
				//alert("moved left more than 100 pixels start_px: " + start_px + " stop px: " + stop_px + "abs diff " + abs_diff);
				if (abs_diff >= 30) {
				gotonextpage();
				}
				else
				{
				gotopage(global_page_num);	
				}
				
		
			} // end of if when going to next page
			
	
			if (start_px > stop_px && global_page_num > 1) {
				// go to previous page
				var abs_diff = start_px - stop_px;
				//alert("moved left more than 100 pixels start_px: " + start_px + " stop px: " + stop_px + "abs diff " + abs_diff);
				if (abs_diff >= 50) {
				gotopreviouspage();
				}
				else
				{
				gotopage(global_page_num);	
				}
			} // end of if when going to previous page	
		
	
		
			})		// end of scrolling landscape

if (current_action != 'edit') {
$('.ui-content a[href^=#]').bind('click vclick', function (ev) {
	 	//alert("bookmark");
		var thingy = $(this).attr('href');
		var port_top = $(thingy).position().left;
		//alert("location " + port_top);
		var move_top_by = port_top;
								
		var container = move_top_by;
									// OLD WAY - var main_window = $(window).width() - main_window_adjust;
		var main_window = $('#scrollcontainer').width() + global_gap;
		var pages_to_chapter = container/(main_window);
		var pages_to_chapter_rounded = Math.floor(pages_to_chapter)+parseInt(global_page_num);
											
		var global_to_chapter = pages_to_chapter_rounded;												
				
		global_page_num = global_to_chapter;
				//alert("global_page_num of chapter to go to" + global_page_num);
				
		//alert("goto page " + global_page_num);		
		gotopage(global_page_num);
        //location.hash = $(this).attr('href');
		
        return false;
    })

	
}
	
$('a[href*="wikipedia"]').bind('click vclick', function (ev) {
	 	//alert("bookmark");
		var thingy = $(this).attr('title');
		//alert("what is title? " + thingy);
		window.location = "?pub=wikipedia.cfm" + "&title=" + thingy;
		
        return false;
    })	
	
$('a[href*="species"]').bind('click vclick', function (ev) {
	 	//alert("bookmark");
		var thingy = $(this).attr('title');
		//alert("what is title? " + thingy);
		window.location = "?pub=wikispecies.cfm" + "&title=" + thingy;
		
        return false;
    })		
	
$('a[href*="wikibooks"]').bind('click vclick', function (ev) {
	 	//alert("bookmark");
		var thingy = $(this).attr('title');
		//alert("what is title? " + thingy);
		window.location = "?pub=wikibooks.cfm" + "&title=" + thingy;
		
        return false;
    })		

$('a[href*="wikisource"]').bind('click vclick', function (ev) {
	 	//alert("bookmark");
		var thingy = $(this).attr('title');
		//alert("what is title? " + thingy);
		window.location = "?pub=wikisource.cfm" + "&title=" + thingy;
		
        return false;
    })			


$("a[data-ajax=false]").click(handleClick);
	
	function handleClick(e) {
		var target = $(e.target).closest('a');
		if( target ) {
			e.preventDefault();
			window.location = target.attr('href');
		}
	}	  
	
	$.mobile.hidePageLoadingMsg();
			
})



$( '#pub' ).live( 'pagebeforecreate',function(event){
	
	
//resesizewindows();
//getbookmarksetup();
//updatePageNum();
})

$( '#pub' ).live( 'pageloadfailed',function(event){
				
			//alert("Failed to load page properly. Sorry. Please try a different publications.");

})

$( '#pub' ).live( 'pageinit',function(event){
	
	


	
  //alert( 'This page was just enhanced by jQuery Mobile!' );

})

$( '#publish' ).live( 'pageinit',function(event){
  //alert( 'Publish page initialized and then hide page loading message.' );
  //$.mobile.hidePageLoadingMsg();	
});	

$('#publish').live('pageshow',function(event, ui){
	
	
	

  //$.mobile.hidePageLoadingMsg();		
})

  //alert( 'Pub page show and then hide load message.' );
$( '#pub' ).live( 'pageinit',function(event){	

});


		


function load() {
	//Removed for now, could be used to allow user to enable this - hideAddressBar();
	$.mobile.showPageLoadingMsg("b", "Loading and typesetting your publication. We'll have it on screen in just a second....", false);

		
	
	resesizewindows();
	getbookmarksetup();
	updatePageNum();
	gotopage(global_page_num);
	if ($("#publish").is(".ui-page-active")) {
		//do nothing
		//alert("publish is active");
	}
	else
	{
	$("#slider-0").slider('refresh');
	}
		//update the popupSearchPanel if the windows are resized
	$( "#popupSearchPanel" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height();
		h = h + 45;

        $( "#popupSearchPanel" ).css( "height", h );
    }
	})
	$.mobile.hidePageLoadingMsg();
	try{
		 
			if ( current_hidetopbar == 'yes') {
				//elem = document.getElementById('scroller');//This is the element that you want to move the caret to the end of
				//setEndOfContenteditable(elem);
				
				$("[data-position='fixed']").fixedtoolbar('hide');
				
				//elem = document.getElementById('scroller');//This is the element that you want to move the caret to the end of
				//alert("hey element " + elem);
				//setEndOfContenteditable(elem);
						
			}	  
	
		}
	catch(e){
	 //catch and just suppress error
	}
	
	if (current_action == 'Create') {
	$.mobile.changePage('#publish', 'pop', true, true);	
	}
	
	if (current_action == 'OpenLast') {
	$.mobile.changePage('#OpenLast', 'pop', true, true);	
	}
	
	//if ( current_hidetopbar == 'yes') {

		elem = document.getElementById('scroller');//This is the element that you want to move the caret to the end of
		//alert("hey element2 " + elem);
		setEndOfContenteditable(elem);
		elem.focus();	
		$(elem).focusEnd();	
		//$("[data-position='fixed']").fixedtoolbar('hide');
	 //};
	
}

function reload() {
	//Removed for now, could be used to allow user to enable this - hideAddressBar();
	resesizewindows();
	getbookmarksetup();
	updatePageNum();
	gotopage(global_page_num);
	if ($("#publish").is(".ui-page-active")) {
		//do nothing
		//alert("publish is active");
	}
	else
	{
	$("#slider-0").slider('refresh');	
	}
		//update the popupSearchPanel if the windows are resized
	$( "#popupSearchPanel" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height();
		h = h + 45;

        $( "#popupSearchPanel" ).css( "height", h );
    }
	})
	$.mobile.hidePageLoadingMsg();
	try{
		 
			if ( current_hidetopbar == 'yes') {
				//elem = document.getElementById('scroller');//This is the element that you want to move the caret to the end of
				//setEndOfContenteditable(elem);
				$("[data-position='fixed']").fixedtoolbar('hide');
				//elem = document.getElementById('scroller');//This is the element that you want to move the caret to the end of
				//setEndOfContenteditable(elem);
				//alert("hey element " + elem);						
			}	  
	
		}
	catch(e){
	 //catch and just suppress error
	}
	
	if (current_action == 'Create') {
	$.mobile.changePage('#publish', 'pop', true, true);	
	}
	
	if ( current_hidetopbar == 'yes') {

		elem = document.getElementById('scroller');//This is the element that you want to move the caret to the end of
		//alert("hey element3 " + elem);
		setEndOfContenteditable(elem);
		elem.focus();	
		$(elem).focusEnd();	
		//$("[data-position='fixed']").fixedtoolbar('hide');
	 };
	

}

  
function hideAddressBar()
{
  if(!window.location.hash)
  {
      if(document.height < window.outerHeight)
      {
          document.body.style.height = (window.outerHeight + 50) + 'px';
      }

      setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
  }
}

window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
window.addEventListener("orientationchange", hideAddressBar );
	  



function resesizewindows() {
	
var page_height = $("#page_height").val();
var margin_top = $("#margin_top").val();	
var margin_bottom = $("#margin_bottom").val();
var margin_left = $("#margin_left").val();	
var margin_right = $("#margin_right").val();
var columns = $("#columns").val();
var main_window_height = $(window).height();
var main_window_width = $(window).width();
var newColumnWidth = main_window_width;
if ((columns != "-1") && (columns == "no")) {
		$('#scroller').css('column-width', newColumnWidth);
		$('#scroller').css('-webkit-column-width', newColumnWidth);
		$('#scroller').css('-moz-column-width', newColumnWidth);
		$('#scroller').css('-ms-column-width', newColumnWidth);
		$('#scroller').css('-o-column-width', newColumnWidth);	
	
}

	var new_scrollcontainer_height = main_window_height - 80;
	if ((page_height != "-1") || (page_height != "")) {
		
		
		
		$("#scrollcontainer").height(new_scrollcontainer_height);
		
		
	
	}
	else
	{
			var new_scrollcontainer_height = page_height - 80;
			$("#scrollcontainer").height(new_scrollcontainer_height);
	}


	var actual_new_height = main_window_height;
	if (margin_top != "-1") {
		if (page_height == "-1") {
			actual_new_height = actual_new_height - margin_top;	
			$("#scrollcontainer").css('margin-top',margin_top+'px');
		}
		else
		{
			var new_scrollcontainer_height = page_height - margin_top;
			$("#scrollcontainer").css('margin-top',margin_top+'px');
			$("#scrollcontainer").height(new_scrollcontainer_height);
			
		}
	}
	if (margin_bottom != "-1") {
		if (page_height == "-1") {
			actual_new_height = actual_new_height - margin_bottom;	
			$("#scrollcontainer").css('margin-bottom',margin_top+'px');
		}
		else
		{
			var new_scrollcontainer_height = page_height - margin_bottom;
			$("#scrollcontainer").height(new_scrollcontainer_height);
		}
	}
	if (margin_left != "-1") {
	$("#scrollcontainer").css('margin-left',margin_left+'px');
	}
	if (margin_right != "-1") {
	$("#scrollcontainer").css('margin-right',margin_right+'px');
	}
	
	if ((margin_top != "-1") || (margin_bottom != "-1")) {
		if (page_height == "-1") {
			$("#scrollcontainer").height(actual_new_height);
		}
		else
		{
			var new_scrollcontainer_height = page_height;
			$("#scrollcontainer").height(new_scrollcontainer_height);
		}
	}
	else
	{
		if (page_height == "-1") {
			$("#scrollcontainer").height(main_window_height);	
		}
		else
		{
			var new_scrollcontainer_height = page_height;
			$("#scrollcontainer").height(new_scrollcontainer_height);
		}
	}
	
	//update the popupSearchPanel if the windows are resized
	$( "#popupSearchPanel" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height();
		h = h + 45;

        $( "#popupSearchPanel" ).css( "height", h );
    }
	})

	
	
}

function getbookmarksetup() {
	var stored_last_pub = $.cookie("stored_last_pub");
	var stored_last_pub_ipub = $.cookie("stored_last_pub_ipub");
	if (stored_last_pub == null) {
		$.cookie("stored_last_pub", current_pub, { expires: 512 });
	}
	else
	{
		$.cookie("stored_last_pub", current_pub, { expires: 512 });	
	}
	if (stored_last_pub_ipub == null) {
		$.cookie("stored_last_pub_ipub", current_ipub, { expires: 512 });
	}
	else
	{
		$.cookie("stored_last_pub_ipub", current_ipub, { expires: 512 });
	}
	
	var bookmarkname = "bookmark" + current_pub;	
	var stored_bookmark = $.cookie("bookmark" + current_pub);
	//alert("current pub " + current_pub);
	//alert("cookie value " + stored_bookmark);
	//alert("emma value " + $.cookie("bookmarkmother_earth_emma_goldman.html"));
	//alert("page nume " + current_bookmark);
	if (stored_bookmark == null) {
	$.cookie("bookmark"+current_pub, 1, { expires: 512 });
	$.cookie("current_bookmark", 1, { expires: 512 });
	$.cookie("page_pref"+current_pub, "show_true", { expires: 512 });
	 //alert( "Null bookmark, so set it to 1" + $.cookie("bookmark") + " bookmarkname " + bookmarkname);
	}
	else
	{
		var stored_page_pref = $.cookie("page_pref"+current_pub);
		if (stored_page_pref != "show") {
		$('#next_image').hide();
		$('#previous_image').hide();
		}
		if ((current_pub != 'wikipedia.cfm') || (current_pub != 'wikibooks.cfm') || (current_pub != 'wikisource.cfm') || (current_pub != 'wikispecies.cfm'))  {
			
		global_page_num = stored_bookmark;
		//alert("global page num set"+global_page_num);
		//alert("current bookmark " + current_bookmark);
		//alert("stored bookmark " + stored_bookmark);
		//alert("current bookmark " + stored_bookmark);
		//alert("bookmark " + bookmark);
		}
		else
		{
			//when doing wiki work to when new topics are selected it goes to the first page.
			global_page_num = 1;
		}
	}
	if (global_page_num	== null) {
	if ((current_pub != 'wikipedia.cfm') || (current_pub != 'wikibooks.cfm') || (current_pub != 'wikisource.cfm')  || (current_pub != 'wikispecies.cfm'))  {	
	
	global_page_num = parseInt($.cookie(bookmarkname));
	}
	else
	{
	
	global_page_num = 1;
	}
	}
	if ((current_pub == 'wikipedia.cfm'))  {
	global_page_num = 1;
	}
		
}

function updatePageNum() {
	
	
	var container = document.getElementById('scroller').scrollWidth;
	var actual_window = $(window).width();
	var actual_window_height = $(window).height();
	var column_width = $('#scroller').css('-webkit-column-width');
	var column_gap = $('#scroller').css('-webkit-column-gap');
	var main_window = $('#scrollcontainer').width();	
	
	// DON'T NEED TO SUBTRACT MARGINS? var page_width = main_window - 120;
	var page_width = main_window;
	var number_of_columns = (page_width + column_gap)/(column_width + column_gap);
	
	//$("#position").text("sw: " + container + " mw: " + main_window + " cw: " + column_width + " cg: " + column_gap + " cols: " + number_of_columns + " aw: " + actual_window); 


	// OLD WAY - var main_window = $(window).width() - main_window_adjust;
	var pages_total = container/(main_window);
	var pages_rounded = Math.floor(pages_total)+1;			
	global_total_page = pages_rounded;
	// Change to generic: if (global_current_orientation == 1) {
	showPageNum("",  global_total_page, global_page_num + " of ");
	resesizewindows();
	
}


function showPageNum(ele, total, current) {
	
	
  $("#page_nums").text(ele + current + total);
  var page_percent = parseInt(current)/parseInt(total);
  page_percent = page_percent * 100;
  var display_page_percent = page_percent.toPrecision(3);
  var slider_value = page_percent;
  $("#page_percent").text(display_page_percent + "%");
  //alert("page percent " + slider_value);
  
  $("#slider-0").val(slider_value);
	if ($("#publish").is(".ui-page-active")) {
		//do nothing
		//alert("publish is active");
	}
	else
	{
	$("#slider-0").slider('refresh');	
	}
  
}

function showDeviceInfo(global_pages, device_width, device_height) {	
  $("#device_pages").text("Pages: " + global_pages);
  $("#device_width").text("Page Width: " + device_width + "px");
  $("#device_height").text("Page Height: " + device_height + "px");
}

function gotopage(page_to) { //v3.0
				var actual_window_height = $('#scrollcontainer').height();
				var actual_page_window = main_window ;			
				var container = document.getElementById('scroller').scrollWidth;
				var main_window = $('#scrollcontainer').width() + global_gap;
				var pages_total = container/(main_window);
				var pages_rounded = Math.floor(pages_total)+1;			
				global_total_page = pages_rounded;
				//alert("what is page to as global is being set to that "+global_total_page_landscape);
				global_page_num = page_to;
				var left_scroll_position = $("#scroller").scrollLeft();	
				scroll_landscape(global_page_num);
				//$("#scroller").scrollLeft((page_to-1)*(actual_page_window));	
				$.cookie("bookmark"+current_pub, page_to, { expires: 512 });
				$.cookie("current_bookmark", page_to, { expires: 512 });
				showPageNum("",  global_total_page, page_to + " of ");	
								var current_bookmark_val = parseInt($.cookie("bookmark"+current_pub));
								if (current_bookmark_val == global_page_num) {	
									$("#bookmark_image").attr("src","images/bookmark_red_trans.png");
								}
								else
								{
									$("#bookmark_image").attr("src","images/bookmark_black_trans.png");
								}				
								
	
				//}
								

				showDeviceInfo(global_total_page, main_window, actual_window_height);
				
				
				

	
					
	
}

function gotonextpage() {
		
							
				if (global_page_num < global_total_page) {			
				var from_page = parseInt(global_page_num);
				var to_page = parseInt(global_page_num) + 1;
				global_page_num = parseInt(global_page_num) + 1;
								
								showPageNum("",  global_total_page, global_page_num + " of ");	
								$.cookie("bookmark"+current_pub, parseInt(global_page_num), { expires: 512 });
								$.cookie("current_bookmark", parseInt(global_page_num), { expires: 512 });
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
				else
				{
					//alert("You've reached the end of this publication.");
				}
									
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

								showPageNum("",  global_total_page, global_page_num + " of ");
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
								global_total_page = pages_rounded;
								showPageNum("",  global_total_page, global_page_num + " of ");
								global_position_percent = global_page_num/global_total_page;
								//event.preventDefault();
											
				//$("#scroller_landscape").stop();
			
				

}

// bookmark handling

function resetbookmark(reset_page) {
			//alert("Reset bookmark to the following" + reset_page);
			
			$.cookie("bookmark"+current_pub, parseInt(reset_page), { expires: 512 });
			$.cookie("current_bookmark", parseInt(reset_page), { expires: 512 });
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
				if ((current_pub != 'wikipedia.cfm') || (current_pub != 'wikibooks.cfm')  || (current_pub != 'wikisource.cfm')  || (current_pub != 'wikisecies.cfm'))  {	
				gotopage(last_page_read);
				}
				else
				{
				last_page_read = 1;	
				gotopage(1);	
				}
}

function UpdateBookmark(obj){
	$.post('updatebookmark.cfm',$("#pageform").serialize(),function(data,obj){
		$("#result").html(data)
	});
	return false
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

// TOC stuff
function gototoc(page){ //v3.0
var thingy = $('#toc').position().left;
//alert("toc position " + thingy);
var port_top = thingy;
var move_top_by = port_top;
								
		var container = move_top_by;
									// OLD WAY - var main_window = $(window).width() - main_window_adjust;
		var main_window = $('#scrollcontainer').width() + global_gap;
		var pages_to_chapter = container/(main_window);
		var pages_to_chapter_rounded = Math.floor(pages_to_chapter)+parseInt(global_page_num);
											
		var global_to_chapter = pages_to_chapter_rounded;												
				
		global_page_num = global_to_chapter;
				//alert("global_page_num of chapter to go to" + global_page_num);
				
		//alert("goto page " + global_page_num);		
		gotopage(global_page_num);
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
				//global_page_num = 1;
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
								global_total_page = pages_rounded;
								showPageNum("",  global_total_page, global_page_num + " of ");
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
  eval(targ+".location='"+"?pub=store.cfm&search="+current_search+"&offer="+current_offer+"&state="+current_state+"&sort="+current_sort+"&category="+selObj.options[selObj.selectedIndex].value+"&ipub=#store"+"'");
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


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function myCallbackFunction() {
$('#savefile').dialog('close');	
//alert("Updates Saved");
}

function myCallbackFunctionClose() {
window.location = "?pub=store.cfm";	
//alert("Updates Saved");
}


function setEndOfContenteditable(contentEditableElement)
{
	var range,selection;
	if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
	{
			try{
		range = document.createRange();//Create a range (a range is a like the selection but invisible)
		range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
		range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
		selection = window.getSelection();//get the selection object (allows you to change selection)
		selection.removeAllRanges();//remove any selections already made
		selection.addRange(range);//make the range you have just created the visible selection
			}
			catch(e){
	 //catch and just suppress error
			}
	}
	else if(document.selection)//IE 8 and lower
	{ 
		range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
		range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
		range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
		range.select();//Select the range (make it the visible selection
	}
}

$.fn.setCursorPosition = function(position){
    if(this.length == 0) return this;
    return $(this).setSelection(position, position);
}

$.fn.setSelection = function(selectionStart, selectionEnd) {
    if(this.length == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}

$.fn.focusEnd = function(){
	try {
    this.setCursorPosition(this.val().length);
            return this;
		}
		catch(e){
	 //catch and just suppress error
		}		
}

