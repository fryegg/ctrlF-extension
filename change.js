var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var searchTerm;

if (searchTerm) {
    console.log(document.body.innerText) //document.body.innerText 'document.querySelector("body").innerText'
    var docu_txt = document.body.innerText;
    var searchTermRegEx = new RegExp(searchTerm, "ig");
    var matches = docu_txt.match(searchTermRegEx);
    console.log(matches);
    console.log(document.body.innerText);
    // find matchs one
    
    if (matches != null && matches.length > 0) {
        document.body.innerHTML = document.body.innerHTML.replace(searchTermRegEx, "<span class='hello'>" + searchTerm + "</span>");
        console.log(searchTermRegEx);
        console.log(document.getElementsByClassName('hello'));
        for(var i=0 ; i<document.getElementsByClassName('hello').length; i++){
            document.getElementsByClassName('hello')[i].style.backgroundColor = 'yellow';  
         }
           
    }
}


// //selector:text  searchterm:keyword
// if (searchTerm) {
//     //var wholeWordOnly = new RegExp("\\g"+searchTerm+"\\g","ig"); //matches whole word only
//     //var anyCharacter = new RegExp("\\g["+searchTerm+"]\\g","ig"); //matches any word with any of search chars characters
//     var selector = "html"; //use body as selector if none provided
//     var searchTermRegEx = new RegExp(searchTerm, "ig");
//     console.log($(selector).html());
//     var matches = selector.match(searchTermRegEx);
//     if (matches != null && matches.length > 0) {
//         $('.highlighted').removeClass('highlighted'); //Remove old search highlights  

//         //Remove the previous matches
//         $span = $('#realTimeContents span');
//         $span.replaceWith($span.html());

// if (searchTerm === "&") {
//     searchTerm = "&amp;";
//     searchTermRegEx = new RegExp(searchTerm, "ig");
// }
//         $(selector).html($(selector).html().replace(searchTermRegEx, "<span class='match'>" + searchTerm + "</span>"));
//         $('.match:first').addClass('highlighted');

//         var i = 0;

//         $('.next_h').off('click').on('click', function () {
//             i++;

//             if (i >= $('.match').length) i = 0;

//             $('.match').removeClass('highlighted');
//             $('.match').eq(i).addClass('highlighted');
//         });
//         $('.previous_h').off('click').on('click', function () {

//             i--;

//             if (i < 0) i = $('.match').length - 1;

//             $('.match').removeClass('highlighted');
//             $('.match').eq(i).addClass('highlighted');
//         });

//         if ($('.highlighted:first').length) { //if match found, scroll to where the first one appears
//             $(window).scrollTop($('.highlighted:first').position().top);
//         }
//     }
// }