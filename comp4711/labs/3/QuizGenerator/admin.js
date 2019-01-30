let module = (function(){
    // localStorage.clear();
    let control = {};
    
    if(typeof(Storage) !== "undefined"){
        
    } else{
        console.log("Local storage is not supported in your browser.");
    }



    // let test;

    // localStorage.setItem("questions", test)

    // localStorage.clear();

    control.addQuestion = function(){
        let questions = localStorage.getItem("questions");
        if(questions!=null){
            questions = JSON.parse(questions);
            questions.push(control.getQuestion());
        } else{
            questions = [control.getQuestion()];
        }
        
        localStorage.setItem("questions", JSON.stringify(questions));
        control.getQuestions();
    };

    control.getQuestion = function(){
        let object = {
            "question" : document.getElementById("question").value,
            "answer" : control.choiceSelected(document.getElementsByClassName("choice")),
            "choices" : control.convertChoices()
        }
        return object;
    }

    control.choiceSelected = function(choices){
        for(let i = 0; i < choices.length; i++){
            if(choices[i].checked === true){
                return i;
            }
        }
    }

    control.convertChoices = function(){
        let choices = document.getElementsByClassName("choice_text")
        let convertedChoices = [];
        for(let i = 0 ; i < choices.length; i++){
            convertedChoices.push(choices[i].value);
        }
        return convertedChoices;
    }

    control.displayQuestions = function(questions){

        let container = control.createDiv("container");
        for(let i = 0; i < questions.length; i++){
            let questionTitle = document.createElement("h5")
            questionTitle.innerHTML="Question " + (i+1);
            container.appendChild(questionTitle);

            let displayContainer = control.createDiv("display");
            let div = control.createDiv("");
            div.innerHTML= questions[i].question;
            displayContainer.appendChild(div);
            container.appendChild(displayContainer);

            let answerContainer = control.createDiv("answer");
            for(let j = 0; j < questions[i].choices.length; j++){
                document.createElement("input");

            }
            container.appendChild(answerContainer);
        }
        console.log(questions.length);
        document.getElementById("questions").innerHTML =container.outerHTML;


    }

    control.createDiv = function(classString){
        let container = document.createElement("div");
        if(classString != ""){
            container.setAttribute("class", classString)
        }
        return container;


    }

    control.getQuestions = function(){
        let questions = localStorage.getItem("questions");
    
        if(questions!=null){
            control.displayQuestions(JSON.parse(questions));
        } else{
            document.getElementById("questions").innerHTML='<div class="alert alert-dark"><h1>No questions to display</h1></div>';
        }
    }

    control.clearQuestions = function(){
        localStorage.clear();
        control.getQuestions();
    }

    control.getQuestions();
    return control;
}())