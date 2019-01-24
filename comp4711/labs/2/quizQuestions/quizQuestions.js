// Converting to JSON
let questionsArray = document.getElementsByClassName("questions");

let data = [];
for(let i = 0; i < questionsArray.length; i++){
    let html = questionsArray[i].outerHTML;
    data.push(html);
}
result = JSON.stringify(data);

test = JSON.parse(result);


//Converting to html
var number = prompt("How many questions would you like to see? (0-5)");

let questions = JSON.parse(result);

let content = "";

if(number <= questions.length && number >= 0){

    for(let i = 0 ; i < number; i++){
        content += questions[i];
        content += "</br>"
    }
} else {
    alert("Not a valid input");
    number = prompt("How many questions would you like to see? (0-5)");
}

let con = document.getElementById("content");
con.innerHTML = content;




