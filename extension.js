let myLead = []
const buttonEL = document.getElementById("btn-el")
const inputEL = document.getElementById("input-el")
const ulEL = document.getElementById("ul-el")
const delEL = document.getElementById("del-el")
const tabEL = document.getElementById("tab-el")
const fetchFromLocal = JSON.parse(localStorage.getItem("myLead"))

if (fetchFromLocal) {
    myLead = fetchFromLocal
    render(myLead)
}

tabEL.addEventListener("click", function (){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead",JSON.stringify(myLead))
        render(myLead)    
    })
    
})

function render(leadName) {
    let listItem = " "
    for (let i = 0; i < leadName.length; i++) {
        listItem += `
            <li>
            <a href = '${leadName[i]}' target = '_blank'>
            ${leadName[i]}
            </a>
            </li>
        `
    }
    ulEL.innerHTML = listItem
}



buttonEL.addEventListener('click', function () {
    myLead.push(inputEL.value)
    inputEL.value = ""
    localStorage.setItem("myLead", JSON.stringify(myLead))
    render(myLead)
})

delEL.addEventListener('dblclick', function () {
    localStorage.clear()
    myLead = []
    render(myLead)
})





