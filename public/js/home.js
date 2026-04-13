document.querySelector("#searchByKeywordForm").addEventListener("submit", validateKeyword);

//ensure that keyword has at least 3 characters
function validateKeyword() {
    let keyword = document.querySelector("input[name=keyword]").value;
    if (keyword.length < 3) {
        document.querySelector("#keywordButton").textContent = "Must be > 3 Characters";
        document.querySelector("#keywordButton").style.color = "red";
        event.preventDefault(); //prevent the form from being submitted
    }
}