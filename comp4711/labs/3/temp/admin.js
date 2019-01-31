let module = (function () {
    // localStorage.clear();
    let control = {};

    let questions;

    if (typeof (Storage) !== "undefined") {

    } else {
        console.log("Local storage is not supported in your browser.");
    }

    control.addQuestion = function () {
        let questions = localStorage.getItem("questions");
        if (questions != null) {
            questions = JSON.parse(questions);
            questions.push(control.createQuestion("question", "choice", "choice_text"));
        } else {
            questions = [control.createQuestion("question", "choice", "choice_text")];
        }

        localStorage.setItem("questions", JSON.stringify(questions));
        control.showQuestions();
        control.clearForm();
    };

    control.createQuestion = function (question, answer, choices) {
        let object = {
            "question": document.getElementById(question).value,
            "answer": control.choiceSelected(document.getElementsByClassName(answer)),
            "choices": control.convertChoices(choices)
        }
        return object;
    }

    control.choiceSelected = function (choices) {
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].checked === true) {
                return i;
            }
        }
    }

    control.convertChoices = function (choiceClass) {
        let choices = document.getElementsByClassName(choiceClass)
        let convertedChoices = [];
        for (let i = 0; i < choices.length; i++) {
            convertedChoices.push(choices[i].value);
        }
        return convertedChoices;
    }

    control.makeQuestionDisplay = function (questions) {
        let container = control.createDiv("container");
        for (let i = 0; i < questions.length; i++) {
            let questionTitle = document.createElement("h5")
            let questionContainer = control.createDiv("question card mb-3 p-3 ");
            questionTitle.innerHTML = "Question " + (i + 1);
            questionContainer.appendChild(questionTitle);

            let displayContainer = control.createDiv("display");
            let div = control.createDiv("");
            div.innerHTML = questions[i].question;
            displayContainer.appendChild(div);

            let answerContainer = control.createDiv("answer");

            for (let j = 0; j < questions[i].choices.length; j++) {
                let choice = document.createElement("p");
                if (questions[i].answer != null && j == questions[i].answer) {
                    choice.innerHTML = questions[i].choices[j] + " <b>*correct answer* </b>";
                } else {
                    choice.innerHTML = questions[i].choices[j];
                }
                answerContainer.appendChild(choice);
            }

            let button_grp = control.createDiv("option");
            let edit_btn = document.createElement("button");
            let delete_btn = document.createElement("button");


            edit_btn.setAttribute("class", "btn btn-primary")
            edit_btn.innerHTML = "Edit";
            edit_btn.setAttribute("value", i)
            edit_btn.setAttribute("onclick", "module.generateEditModal(this.value)")
            edit_btn.setAttribute("type", "button")

            delete_btn.setAttribute("class", "btn btn-danger")
            delete_btn.innerHTML = "Delete";
            delete_btn.setAttribute("value", i)
            delete_btn.setAttribute("onclick", "module.deleteQuestion(this.value)")

            button_grp.appendChild(edit_btn);
            button_grp.appendChild(delete_btn);

            questionContainer.appendChild(displayContainer);
            questionContainer.appendChild(answerContainer);
            questionContainer.appendChild(button_grp);

            container.appendChild(questionContainer);
        }
        document.getElementById("questions").innerHTML = container.outerHTML;
    }

    control.createDiv = function (classString) {
        let container = document.createElement("div");
        if (classString != "") {
            container.setAttribute("class", classString)
        }
        return container;


    }

    control.showQuestions = function () {
        let questions = control.getQuestions();
        if (questions != null && questions.length != 0) {
            control.makeQuestionDisplay(questions);
        } else {
            document.getElementById("questions").innerHTML = '<div class="alert alert-dark"><h1>No questions to display</h1></div>';
        }
    }

    control.clearQuestions = function () {
        localStorage.clear();
        control.showQuestions();
    }

    control.clearForm = function () {
        document.getElementById("question").value = "";
        let choice = document.getElementsByClassName("choice");
        let choice_text = document.getElementsByClassName("choice_text");

        for (let i = 0; i < choice.length; i++) {
            if (choice[i].checked) {
                choice[i].checked = false;
            }
        }

        for (let i = 0; i < choice_text.length; i++) {
            choice_text[i].value = "";
        }
    }

    control.deleteQuestion = function (index) {
        let questions = JSON.parse(localStorage.getItem("questions"));
        questions.splice(index, 1);

        localStorage.setItem("questions", JSON.stringify(questions));

        control.showQuestions();


    }

    control.generateEditModal = function (index) {
        let modal_footer = document.getElementById("save-edit");
        let save_btn = document.createElement("button");
        save_btn.innerHTML = "Save changes";

        save_btn.setAttribute("id", "save-edit");
        save_btn.setAttribute("class", "btn btn-primary");
        save_btn.setAttribute("value", index);
        save_btn.setAttribute("onclick", "module.editQuestion(this.value)");
        modal_footer.replaceWith(save_btn);

        questions = control.getQuestions();

        document.getElementById("editQuestion").value = questions[index].question;
        let choices = document.getElementsByClassName("editChoiceText");
        let radios = document.getElementsByClassName("editChoice")

        for (let i = 0; i < choices.length; i++) {
            choices[i].value = questions[index].choices[i];
            radios[i].checked = false;
        }
        if (questions[index].answer != undefined) {
            radios[questions[index].answer].checked = true;
        }
        $("#editQuestionModal").modal("show");
    }

    control.editQuestion = function (index) {
        questions = JSON.parse(localStorage.getItem("questions"));
        questions[index] = control.createQuestion("editQuestion", "editChoice", "editChoiceText");
        
        localStorage.setItem("questions", JSON.stringify(questions));
        control.showQuestions();

        $(editQuestionModal).modal("hide");
    }

    control.getQuestions = function () {
        let questions = localStorage.getItem("questions");
        if (questions != null) {
            return JSON.parse(questions);
        } else {
            return null;
        }
    }

    control.showQuestions();
    return control;
}())