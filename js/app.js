// Initiate showNotes function on DOM load

$(document).ready(function(){
    showNotes();
})

// If user clicks on 'Add Node' then store text in localStorage andf initate showNotes funtion
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', e => {
    let addText = document.getElementById('addTxt')
    let addTitle = document.getElementById('addTitle')
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let notesObj
    let titlesObj
    if (notes == null && titles==null) {
        notesObj = [];
        titlesObj=[];
    }
    else {
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles)
    }
    notesObj.push(addTxt.value);
    titlesObj.push(addTitle.value)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titlesObj));
    addTxt.value = '';
    addTitle.value='';
    showNotes();
})

// Function to show Node
function showNotes() {

    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let notesObj
    let titlesObj
    if (notes == null && titles==null) {
        notesObj = [];
        titlesObj=[];
    }
    else {
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles)
    }

    let html = ''
    let n=notesObj.length
    for(let i=0;i<n;i++) {

        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${titlesObj[i]}</h5>
                <p class="card-text">${notesObj[i]}</p>
                <button id=${i} onclick="deleteNode(${this.id})" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `
    };
    
    let notesElm=document.getElementById('notes');
    if(notesObj.length==0 && titlesObj.length==0)
    {    
        notesElm.innerHTML=`Use 'Add Note' button to get started.`;
    }
    else
    {
        notesElm.innerHTML=html; 
    }
}

// Funtion to delete node

function deleteNode(idx)
{
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let notesObj
    let titlesObj
    if (notes == null && titles==null) {
        notesObj = [];
        titlesObj=[];
    }
    else {
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles)
    }
    notesObj.splice(idx,1)
    titlesObj.splice(idx,1)

    localStorage.setItem('notes',JSON.stringify(notesObj))
    localStorage.setItem('titles',JSON.stringify(titlesObj))
    
    showNotes();

}

// Search Functionality

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', e=>{
    let inputValue=searchTxt.value.toLowerCase();
    let noteCard=document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(ele => {
        let cardTxt=ele.querySelector('p').innerText.toLowerCase()
        if(cardTxt.includes(inputValue))
        {
            ele.style.display='block';
        }
        else
        {
            ele.style.display='none';
        }
    })
});

let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click',e=>{
e.preventDefault();
})
