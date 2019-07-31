


$(document).ready(function(){
    $(".ul1 > li > a").each(function(index){
        $(this).click(function () { 
        
            $("a").removeClass("active");
            $("a").eq(index).addClass("active");
            
        });
    });

   
setInterval(() => {
    var d1=$("#page1").css("display")
    var d2=$("#page2").css("display")
    if(d1=="block"){
         $('.pt-page1').css({ "display": "none" })
       
    }else{
        $('.pt-page1').css({ "display": "block" })
    }
    
    if(d2=="block"){
        $('.pt-page2').css({ "display": "none" })
    }else{
        $('.pt-page2').css({ "display": "block" })
    }
  

  
},5000);


$('#move1').mouseenter(function () { 
    $('#move1').addClass('  animated  swing')
});
$('#move1').mouseleave(function () { 
    $('#move1').removeClass(' animated  swing')
});


$('#move2').mouseenter(function () { 
    $('#move2').addClass('  animated  swing')
});
$('#move2').mouseleave(function () { 
    $('#move2').removeClass(' animated  swing')
});

$(window).scroll(function(){
    var scroll=$(window).scrollTop();
    if(scroll>400){
    $("#d1").css({ "display": "block" })
    }
    
    if(scroll>1080){
        $("#d3").css({ "display": "block" })
    }
    if(scroll>1400){
        $("#d4").css({ "display": "block" })
    }


    console.log(scroll);
    })



})

