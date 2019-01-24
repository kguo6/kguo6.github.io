// let questions = document.getElementsByClassName("questions");

// for(let i = 0; i < questions.length; i++){
//     let html = questions[i].outerHTML;
//     let data = {html: html };
//     let result = JSON.stringify(data);
//     console.log( result);
// }


var number = prompt("How many questions would you like to see? (0-5)");

let questions = JSON.parse(
"[\r\n    {\r\n        \"html\" : \"<div class=\\\"questions\\\">\\n            <div class=\\\"display\\\">\\n                <h5>1) Question 1<\/h5>\\n                <div class=\\\"question\\\">What is the following line of JavaScript doing?<\/div>\\n                <div class=\\\"code\\\">\\n                    <div>document.body.innerHTML = &lt;h1&gt;\\\"Hello World\\\"&lt;\/h1&gt;<\/div>\\n                <\/div>\\n            <\/div>\\n            <div class=\\\"answer\\\">\\n                <input type=\\\"radio\\\" name=\\\"Q1\\\"> a) Writing \\\"Hello World\\\" to console\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q1\\\"> b) The code will generate an error\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q1\\\"> c) Adding the heading \\\"Hello World\\\" to the html body\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q1\\\"> d) Adding the title \\\"Hello World\\\" \\n            <\/div>\\n        <\/div>\"\r\n    },\r\n    {\r\n        \"html\" : \"<div class=\\\"questions\\\">\\n            <div class=\\\"display\\\">\\n                <h5>2) Question 2<\/h5>\\n                <div class=\\\"question\\\"> What is the output of the following snippet of code?<\/div>\\n                <div class=\\\"code\\\">\\n                    <div>var array = [\\\"hello\\\", false, 23, \\\"world\\\"]<\/div>\\n                    <div>console.log(array)<\/div>\\n                <\/div>\\n    \\n            <\/div>\\n            <div class=\\\"answer\\\">\\n                <input type=\\\"radio\\\" name=\\\"Q2\\\"> a) Nothing, it is missing semi-colons\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q2\\\"> b) Nothing, array mixes different types\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q2\\\"> c) [\\\"hello\\\", false, 23, \\\"world\\\"]\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q2\\\"> d) [\\\"hello\\\", \\\"world\\\"]\\n            <\/div>\\n        <\/div>\"\r\n    },\r\n    { \r\n        \"html\" : \"<div class=\\\"questions\\\">\\n            <div class=\\\"display\\\">\\n                <h5>3) Question 3<\/h5>\\n                <div class=\\\"question\\\">What is the following conditional statement as a ternary operator?\\n                <\/div>\\n                <div class=\\\"code\\\">\\n                        <div>if (a &lt; b){<\/div>\\n                        <div>&nbsp;&nbsp;&nbsp;&nbsp;console.log(\\\"true\\\");<\/div>\\n                        <div>} else {<\/div>\\n                        <div>&nbsp;&nbsp;&nbsp;&nbsp;console.log(\\\"false\\\");<\/div>\\n                        <div>}<\/div>\\n                    <\/div>\\n            <\/div>\\n            <div class=\\\"answer\\\">\\n                <input type=\\\"radio\\\" name=\\\"Q3\\\"> a) a &gt; b ? console.log(\\\"false\\\") : console.log(\\\"true\\\");\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q3\\\"> b) a &lt; b ? console.log(\\\"true\\\") : console.log(\\\"false\\\");\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q3\\\"> c) a &lt; b ? console.log(\\\"false\\\") : console.log(\\\"true\\\");\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q3\\\"> d) a &lt; b ? console.log(\\\"true\\\"); : console.log(\\\"false\\\");\\n            <\/div>\\n        <\/div>\"\r\n    },\r\n    { \r\n        \"html\" : \"<div class=\\\"questions\\\">\\n            <div class=\\\"display\\\">\\n                <h5>4) Question 4<\/h5>\\n                <div class=\\\"question\\\"> What is the output of the follow code snippet?<\/div>\\n                <div class=\\\"code\\\">\\n                    <div>var hello = function(){<\/div>\\n                    <div>&nbsp;&nbsp;&nbsp;&nbsp;return \\\"world\\\";<\/div>\\n                    <div>}<\/div>\\n                    <br>\\n                    <div>var hello2 = hello();<\/div>\\n                    <div>console.log(hello2);<\/div>\\n                <\/div>\\n            <\/div>\\n            <div class=\\\"answer\\\">\\n                <input type=\\\"radio\\\" name=\\\"Q4\\\"> a) hello2\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q4\\\"> b) hello\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q4\\\"> c) world\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q4\\\"> d) There will be an error\\n            <\/div>\\n        <\/div>\"\r\n    },\r\n    {\r\n        \"html\" : \"<div class=\\\"questions\\\">\\n            <div class=\\\"display\\\">\\n                <h5>5) Question 5<\/h5>\\n                <div class=\\\"question\\\">What will happen if you run the following snippet of code?<\/div>\\n                <div class=\\\"code\\\">\\n                    <div>const hello = \\\"Hello World\\\";<\/div>\\n                    <div>hello = \\\"world\\\";<\/div>\\n                    <div>console.log(hello);<\/div>\\n                <\/div>\\n            <\/div>\\n            <div class=\\\"answer\\\">\\n                <input type=\\\"radio\\\" name=\\\"Q5\\\"> a) Hello World will appear on the console\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q5\\\"> b) world will appear on the console\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q5\\\"> c) Nothing will appear on the console\\n                <br>\\n                <input type=\\\"radio\\\" name=\\\"Q5\\\"> d) An error will appear on the console for trying to change a constant\\n            <\/div>\\n            <br>\\n        <\/div>\"\r\n    }\r\n]"
);

console.log(questions.length);

let content = "";

if(number <= questions.length && number >= 0){

    for(let i = 0 ; i < number; i++){
        content += questions[i].html;
        content += "</br>"
    }
} else {
    alert("Not a valid input");
    number = prompt("How many questions would you like to see? (0-5)");
}

let con = document.getElementById("content");
con.innerHTML = content;




