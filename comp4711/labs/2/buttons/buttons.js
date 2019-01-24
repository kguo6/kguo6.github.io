
(function (){
    let con = document.createElement("div");
    con.setAttribute("class", "container");
    document.body.appendChild(con);

    let btnCon = document.createElement("div");
    btnCon.setAttribute("id", "row1" );

    let btnCon2 = document.createElement("div");
    btnCon2.setAttribute("id", "row2");

    con.appendChild(btnCon);
    con.appendChild(btnCon2);

    // document.getElementById("row1");

    let value = "A".charCodeAt(0)
    for(let i = 0 ; i < 26; i++){
        let btn = document.createElement("button");
        let btnText = document.createTextNode(String.fromCharCode(value));
        
        btn.appendChild(btnText);
        btn.setAttribute("onClick", "btnClicked(this.innerText)");
        if(i <= 12){
            btnCon.appendChild(btn);
        } else{
            btnCon2.appendChild(btn);
        }
        value++;
    }
})();

function btnClicked(value){
    alert(value);
}


