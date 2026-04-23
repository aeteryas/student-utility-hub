window.onload=function(){
    loadNotes();
    updateCounts();
    showWelcome();
    viewMode();
}

function getNotesKey(){
    let user=localStorage.getItem("currentUser");
    return user==="Guest"?"guest_notes":user+"_notes";
}

function getNotes(){
    let user=localStorage.getItem("currentUser");
    let key=getNotesKey();

    if(user==="Guest"){
        return sessionStorage.getItem(key)||"";
    }
    return localStorage.getItem(key)||"";
}

function saveNotes(){
    let user=localStorage.getItem("currentUser");
    let key=getNotesKey();
    let text=document.getElementById("notesArea").value;

    if(user==="Guest"){
        sessionStorage.setItem(key,text);
    }else{
        localStorage.setItem(key,text);
    }

    document.getElementById("saveStatus").innerText="Saved ✓";
    viewMode();
}

function loadNotes(){
    document.getElementById("notesArea").value=getNotes();
}

function clearNotes(){
    if(confirm("Clear all notes?")){
        document.getElementById("notesArea").value="";
        saveNotes();
        updateCounts();
    }
}

function editMode(){
    let box=document.getElementById("notesArea");
    box.readOnly=false;
    box.classList.add("editing");
    box.focus();
}

function viewMode(){
    let box=document.getElementById("notesArea");
    box.readOnly=true;
    box.classList.remove("editing");
}

function updateCounts(){
    let text=document.getElementById("notesArea").value;

    let chars=text.length;
    let words=text.trim()===""?0:text.trim().split(/\s+/).length;

    document.getElementById("wordCount").innerText="Words: "+words;
    document.getElementById("charCount").innerText="Characters: "+chars;
}

function showWelcome(){
    let user=localStorage.getItem("currentUser");
    document.getElementById("welcomeText").innerText="Welcome, "+user;
}