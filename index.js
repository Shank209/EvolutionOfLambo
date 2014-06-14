var w_width = $(window).width(), show=false;

$(window).load(function() {
	$('#loading').fadeOut(100);
	
	setTimeout(function(){$('#landing').fadeTo(500, 1);}, 100);
	
	position_container();
	
	$('#bottom').css('height',$(window).height());
});

$(window).resize(function() {
	position_container();
	
	w_width = $(window).width();
	
	set_fade();
	
	$('#bottom').css('min-height',$(window).height());
});

$(window).scroll(throttle(function(event) {
	set_fade();
}, 250));

$('#link').hover(function() {
	$(this).css('text-decoration','underline');
}, function() {
	$(this).css('text-decoration','none');
});

$('#button').hover(function() {
	$(this).animate({opacity:'1'},100);
}, function() {
	$(this).animate({opacity:'0.5'},100);
});

$('#button').click(function() {
	show=true;

	setTimeout(function(){$('body').css('overflow','hidden'); $('.block').fadeTo(0,0);}, 0);
	
	setTimeout(function(){$('#landing').animate({'left':'100%', opacity:'0'}, 750); $('.block:not(#1) .year').css('left','100%');}, 5);
	
	setTimeout(function(){$('#landing').hide(); $('#1').fadeTo(1000,1);}, 800);
	
	setTimeout(function(){$('body').css('overflow','auto');}, 850);
});

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  
  var last, deferTimer;
  
  return function () {
	var context = scope || this;

    var now = +new Date, args = arguments;
	
    if (last && now < last + threshhold) 
	{
      clearTimeout(deferTimer);
	  
      deferTimer = setTimeout(function () {
        last = now;
		
        fn.apply(context, args);
		
      }, threshhold);
    } else {
      last = now;
	  
      fn.apply(context, args);
    }
  };
}

function position_container()
{
	var height,w_height;
	
	height = $('#container').height();
	
	w_height = $('body').height();
	
	var top = (w_height/2)-(height/2);
	
	if(top<45)
	{
		top=45;
	}
	
	if(w_height>height)
	{
		$('#container').css('margin-top',top+'px');
	}
}

function set_fade()
{	console.log('executed');
	if(show)
	{
		$('.block').each(function() {
			var offset = $(this).offset().top;
			
			var gap = $(window).scrollTop();
			
			if(offset-gap<250)
			{
				if($(this).attr('id')=='bottom')
				{
					$(this).stop().fadeTo(1000,1);
				}
				else
				{
					$(this).stop().fadeTo(250,1);
				}
				
				$(this).find('.year').stop().animate({left:'0px'},500);
			}
			
			else
			{
				$(this).stop().fadeTo(250,0);
				
				$(this).find('.year').stop().animate({left:w_width},500);
			}
		});
	}
}