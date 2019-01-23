
function createButtons(){
    let btnCon = document.getElementById("row1");

    let value = "A".charCodeAt(0)
    for(let i = 0 ; i < 26; i++){
        let btn = document.createElement("BUTTON");
        let btnText = document.createTextNode(String.fromCharCode(value));
        console.log(String.fromCharCode(value));
        
        btn.appendChild(btnText);
        value++;
        btnCon.appendChild(btn);
        btn.setAttribute("onClick", "btnClicked(this.innerText)");
        if(i === 12){
            btnCon = document.getElementById("row2");
        }
    }
}

function btnClicked(value){
    alert(value);
}
createButtons();

