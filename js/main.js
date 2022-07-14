let myLeads = []
const saveBtn = document.getElementById('save-btn')
const inputEl = document.getElementById('input-el')
const ulListEl = document.querySelector('.url-list')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')



tabBtn.addEventListener('click' , function () {

  chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
    const activeTab = tabs[0]

    myLeads.push( activeTab.url )

    localStorage.setItem('myLeads', JSON.stringify(myLeads))
  
    render(myLeads)
  })
  
 


})

const myLocalStorageLeads = JSON.parse( localStorage.getItem('myLeads') )

if(myLocalStorageLeads) {
  myLeads = myLocalStorageLeads
  render(myLeads)
}

deleteBtn.addEventListener('dblclick' , function() {
  if( ulListEl ) {
    myLeads = []
    localStorage.clear()
    render(myLeads)
    inputEl.focus()
  }
})

saveBtn.addEventListener( 'click' , function () {
  if ( inputEl.value ) {
    myLeads.push(inputEl.value)
    render(myLeads);
    inputEl.value = ''
  
    const strLeads = JSON.stringify(myLeads)
  
    localStorage.setItem('myLeads', strLeads)
  
    inputEl.focus()
  } else {
    inputEl.focus()
  }
})


function render(lead) {

  let liList = ''

  for (let i = 0; i < lead.length; i++) {
    liList += `
      <li>
        <a href='http://${lead[i]}' target='_blank'>
          ${lead[i]}
        </a>            
      </li> 
    `
  }

  return ulListEl.innerHTML = liList 

}


window.onload = function() {
  inputEl.focus()
}







