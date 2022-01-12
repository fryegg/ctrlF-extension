var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var searchTerm;
var only_option;
var num = 0;
var InstantSearch = {

    "highlight": function (container, highlightText)
    {
        var internalHighlighter = function (options)
        {

            var id = {
                container: "container",
                tokens: "tokens",
                all: "all",
                token: "token",
                className: "className",
                sensitiveSearch: "sensitiveSearch"
            },
            tokens = options[id.tokens],
            allClassName = options[id.all][id.className],
            allSensitiveSearch = options[id.all][id.sensitiveSearch];


            function checkAndReplace(node, tokenArr, classNameAll, sensitiveSearchAll)
            {
                var nodeVal = node.nodeValue, parentNode = node.parentNode,
                    i, j, curToken, myToken, myClassName, mySensitiveSearch,
                    finalClassName, finalSensitiveSearch,
                    foundIndex, begin, matched, end,
                    textNode, span, isFirst; 
                for (i = 0, j = tokenArr.length; i < j; i++)
                {   
                    curToken = tokenArr[i];
                    myToken = curToken[id.token];
                    myClassName = curToken[id.className];
                    mySensitiveSearch = curToken[id.sensitiveSearch];

                    finalClassName = (classNameAll ? myClassName + " " + classNameAll : myClassName);
                    finalSensitiveSearch = (typeof sensitiveSearchAll !== "undefined" ? sensitiveSearchAll : mySensitiveSearch);

                    isFirst = true;
                    while (true)
                    {   
                        // 이것만 찾기
                        if (finalSensitiveSearch)
                            myToken = " " + myToken + " ";

                        foundIndex = nodeVal.toLowerCase().indexOf(myToken.toLowerCase());
                        // 대소 구분
                        // if (finalSensitiveSearch)
                        //     foundIndex = nodeVal.indexOf(myToken);
                        // else
                        //     foundIndex = nodeVal.toLowerCase().indexOf(myToken.toLowerCase());
                        
                        if (foundIndex < 0)
                        {
                            if (isFirst)
                                break;

                            if (nodeVal)
                            {
                                textNode = document.createTextNode(nodeVal);
                                parentNode.insertBefore(textNode, node);
                            } // End if (nodeVal)
                            parentNode.removeChild(node);
                            break;
                        } // End if (foundIndex < 0)

                        isFirst = false;


                        begin = nodeVal.substring(0, foundIndex);
                        matched = nodeVal.substr(foundIndex, myToken.length);
                        if (begin)
                        {
                            textNode = document.createTextNode(begin);
                            parentNode.insertBefore(textNode, node);
                        } // End if (begin)

                        span = document.createElement("span");
                        span.className += finalClassName;
                        span.style.backgroundColor = 'yellow';
                        span.appendChild(document.createTextNode(matched));
                        parentNode.insertBefore(span, node);

                        nodeVal = nodeVal.substring(foundIndex + myToken.length);
                    } // Whend

                } // Next i
            }; // End Function checkAndReplace 
            
            function iterator(p)
            {
                if (p === null) return;

                var children = Array.prototype.slice.call(p.childNodes), i, cur;
                if (children.length)
                {
                    for (i = 0; i < children.length; i++)
                    {
                        cur = children[i];
                        if (cur.nodeType === 3)
                        {
                            checkAndReplace(cur, tokens, allClassName, allSensitiveSearch);
                        }
                        else if (cur.nodeType === 1)
                        {
                            iterator(cur);
                        }
                    }
                }
            }; // End Function iterator

            iterator(options[id.container]);
        } // End Function highlighter
        ;


        internalHighlighter(
            {
                container: container
                , all:
                    {
                        className: "highlighter"
                    }
                , tokens: [
                    {
                        token: highlightText
                        , className: "highlight"
                        , sensitiveSearch: only_option //false
                    }
                ]
            }
        ); // End Call internalHighlighter 

    } // End Function highlight


};

function ExtractText() {
    var input = document.getElementsByTagName("embed")[0];
    var fReader = new FileReader();
    console.log(input)
    fReader.readAsDataURL(input.files);
    fReader.onloadend = function (event) {
        convertDataURIToBinary(event.target.result);
    }
}

function content_res() {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension");
          if (request.demand === "num")
          {
            sendResponse({data: num});
          }  
        }
      );
}

function removehighlight(element){
    var parent = element.parentNode;
    while(element.firstChild){
        parent.insertBefore(element.firstChild, element);
    } 
    if(parent != undefined){
        parent.removeChild(element);
    }
}

function countnum(){
    var high = document.getElementsByClassName("highlight highlighter");
    return high.length
}

function autoscroll(){
    var high = document.getElementsByClassName("highlight highlighter");
    if (high.length != 0)
        {
            Array.from(high).forEach(element => element.scrollIntoView(true));
        }
}

function TestTextHighlighting(findtype, highlightText)
{   
    var container;
    if(findtype=='pdf')
    {
        console.log("hh",document.querySelector('embed'))
        console.log(document.getElementsByTagName('html')[0].innerHTML);
    }
    else
    {
        container = document.querySelector("body");
        // 먼저 노란거 지우기
        var high = document.getElementsByClassName("highlight highlighter");

        if (high.length != 0)
        {
            Array.from(high).forEach(element => removehighlight(element));
        }
        InstantSearch.highlight(container, highlightText);
        autoscroll();
        var num = countnum();
        console.log("num", num);
    }
}


var pdftag = document.getElementsByTagName("embed")[0];
var findtype;

//content_res();
if (pdftag)
{
    findtype = 'sexs';
}

if (searchTerm) {
    TestTextHighlighting(findtype,searchTerm);
    //document.body.innerText 'document.querySelector("body").innerText'
    // var docu_txt = document.body.innerText;
    // var searchTermRegEx = new RegExp(searchTerm, "ig");
    // var matches = docu_txt.match(searchTermRegEx);
    // // find matchs one
    
    // if (matches != null && matches.length > 0) {
    //     document.body.innerHTML = document.body.innerHTML.replace(searchTermRegEx, "<mark>" + searchTerm + "</mark>");
    //     // for(var i=0 ; i<document.getElementsByClassName('hello').length; i++){
    //     //     document.getElementsByClassName('hello')[i].style.backgroundColor = 'yellow';  
    //     //  }
           
    // }
}
