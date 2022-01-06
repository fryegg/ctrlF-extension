function matching(user){
  chrome.tabs.executeScript({
    code: 'var searchTerm = ' + JSON.stringify(user)
}, function() {
    chrome.tabs.executeScript({file: 'contentscript.js'});
});
}
//selector:text  searchterm:keyword


function launchSearch() {
    document.getElementById('searchBar___container').classList.add("activeSearch");
    document.getElementById('closeSearchBar').addEventListener('click', function() {
      document.getElementById('searchBar___container').classList.remove("activeSearch");
    });

    document.getElementById("searchBar___input").addEventListener("search", function(){
      matching(document.getElementById("searchBar___input").value);
    })
  }



// 페이지가 완전히 로딩된 후 함수 실행
window.onload = launchSearch;