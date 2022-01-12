function read_pdf(){
  chrome.tabs.executeScript({file: 'pdf_reader.js'});
}

function matching(user,only){
// define what is user

  chrome.tabs.executeScript({
    code: 'var searchTerm = ' + JSON.stringify(user) + ', only_option = ' + JSON.stringify(only)
  }, function() {
  chrome.tabs.executeScript({file: 'contentscript.js'});
  });
}

function popup_req(demand){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {demand: demand}, function(response) {
    chrome.extension.getBackgroundPage().console.log("final_num",response.data);
    document.getElementById("searchBar___counter").value = response.data;
  });
});
}


function launchSearch() {


    document.getElementById('searchBar___container').classList.add("activeSearch");
    document.getElementById('closeSearchBar').addEventListener('click', function() {
      window.close();
    });
    document.getElementById("searchBar___input").focus();
    document.getElementById("searchBar___input").addEventListener("search", function(e){
      matching(e.target.value, document.getElementById("checkbox___only").checked);
      popup_req("num");
    })
  }



// 페이지가 완전히 로딩된 후 함수 실행
window.onload = launchSearch;