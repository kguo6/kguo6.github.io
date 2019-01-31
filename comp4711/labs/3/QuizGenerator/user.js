module = (function () {
    let control = {};

    let questions;

    if (typeof (Storage) !== "undefined") {

    } else {
        console.log("Local storage is not supported in your browser.");
    }

    control.retrieveQuiz = function () {
        let questions = localStorage.getItem("questions");
        if (questions != null) {
            return JSON.parse(questions);
        } else {
            return null;
        }
    }

    control.showQuestions = function () {
        if (questions != null && questions.length != 0) {
            control.makeQuestionCards();
        } else {
            document.getElementById("questions").innerHTML = '<div class="alert alert-dark"><h1>No questions to display</h1></div>';
        }
    }

    control.createQuestionCards = function () {
        let container = control.createDiv("container");
        for (let i = 0; i < questions.length; i++) {
            let questionContainer = control.createDiv("question card mb-3 p-3 ");
            questionContainer.appendChild(control.createQuestionTitle(i));
            questionContainer.appendChild(control.createDisplay(i));
            questionContainer.appendChild(control.createAnswersList(i));
            container.appendChild(questionContainer);
        }
        container.appendChild(control.createSubmitButton());
        document.getElementById("questions").innerHTML = container.outerHTML;
    }

    control.createDisplay = function (index) {
        let displayContainer = control.createDiv("display");

        displayContainer.setAttribute("class", "alert")
        displayContainer.innerHTML = questions[index].question;

        return displayContainer;
    }


    control.createAnswersList = function (index) {
        let answerContainer = control.createDiv("answer");

        for (let i = 0; i < questions[index].choices.length; i++) {
            let choice = document.createElement("div");
            choice.setAttribute("class", " alert alert-dark");
            choice.setAttribute("id", "choice" + index + "-" + i)
            choice.appendChild(control.createRadioButton(index));
            choice.append(questions[index].choices[i]);
            answerContainer.appendChild(choice);
        }
        answerContainer.appendChild(control.createErrorMessage(index));
        return answerContainer;
    }

    control.createErrorMessage = function (index) {
        let error = document.createElement("div");
        error.setAttribute("id", "error" + index);
        return error;
    }

    control.createRadioButton = function (index) {
        let radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("class", "choice" + index);
        radio.setAttribute("name", "choice" + index);

        return radio;
    }

    control.createQuestionTitle = function (index) {
        let questionTitle = document.createElement("h5")
        questionTitle.innerHTML = "Question " + (index + 1);
        return questionTitle;
    }

    control.createSubmitButton = function () {
        let createButton = document.createElement("button");
        createButton.setAttribute("class", "btn btn-primary");
        createButton.innerHTML = "Submit";
        createButton.setAttribute("onclick", "module.submitQuiz()");
        return createButton;
    }

    control.submitQuiz = function () {
        control.disableAnswers();
        for (let i = 0; i < questions.length; i++) {
            let result = control.answerInputted(i);
            let resultText = document.getElementById("error" + i);

            if(questions[i].answer != undefined){
                document.getElementById("choice" + i + "-" + questions[i].answer).setAttribute("class", "alert alert-success");
                if (result >= 0) {
                    if(control.answerCorrect(result, i)){
                        resultText.setAttribute("class", "alert alert-success");
                        resultText.innerHTML = "Correct!"                    
                    } else {
                        document.getElementById("choice" + i + "-" + result).setAttribute("class", "alert alert-danger")
                        resultText.setAttribute("class", "alert alert-danger");
                        resultText.innerHTML = "Incorrect";
                    }
                } else{
                    resultText.setAttribute("class", "alert alert-danger");
                    resultText.innerHTML = "No answer was inputted.";

                } 
            } else{
                resultText.setAttribute("class", "alert alert-warning");
                resultText.innerHTML = "Something went wrong. No correct answer was found."  
            }
            
        }

    }

    control.disableAnswers = function(){
        for(let i = 0; i < questions.length; i++){
            let choices = document.getElementsByClassName("choice" + i);
            for(let j = 0 ; j < choices.length; j++){
                choices[j].disabled = true;
            }
        }
    }

    control.answerInputted = function (index) {
        let userAnswers = document.getElementsByClassName("choice" + index);

        for (let i = 0; i < userAnswers.length; i++) {
            console.log(userAnswers[i].checked);
            if (userAnswers[i].checked == true) {
                return i;
            }
        }
        return -1;
    }

    control.answerCorrect = function (answer, index) {
        if(questions[index].answer == answer){
            return true;
        }
        return false;
    }

    control.createDiv = function (classString) {
        let container = document.createElement("div");
        if (classString != "") {
            container.setAttribute("class", classString)
        }
        return container;
    }

    control.showQuestions = function () {
        if (questions != null && questions.length != 0) {
            control.createQuestionCards();
        } else {
            document.getElementById("questions").innerHTML = '<div class="alert alert-dark"><h1>No questions to display</h1></div>';
        }
    }

    questions = control.retrieveQuiz();

    control.showQuestions();

    return control;
}());