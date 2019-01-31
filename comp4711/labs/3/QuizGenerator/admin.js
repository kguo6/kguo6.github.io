let module = (function () {
    let control = {};

    let questions;

    if (typeof (Storage) !== "undefined") {

    } else {
        console.log("Local storage is not supported in your browser.");
    }

    control.addQuestion = function () {
        if (questions != null) {
            questions.push(control.createQuestion("question", "choice", "choiceText"));
        } else {
            questions = [control.createQuestion("question", "choice", "choiceText")];
        }

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

    control.createQuestionCards = function () {
        let container = control.createDiv("container");
        for (let i = 0; i < questions.length; i++) {
            let questionContainer = control.createDiv("question card mb-3 p-3 ");
            questionContainer.appendChild(control.createQuestionTitle(i));
            questionContainer.appendChild(control.createDisplay(questions[i]));
            questionContainer.appendChild(control.createAnswersList(questions[i]));
            questionContainer.appendChild(control.createButtonGroup(i));
            container.appendChild(questionContainer);
        }
        document.getElementById("questions").innerHTML = container.outerHTML;
    }

    control.createDisplay = function (question) {
        let displayContainer = control.createDiv("display");
        displayContainer.innerHTML = question.question;

        return displayContainer;
    }

    control.createButtonGroup = function (index) {
        let buttonGroup = control.createDiv("option");
        buttonGroup.appendChild(control.createEditButton(index));
        buttonGroup.appendChild(control.createDeleteButton(index));

        return buttonGroup;
    }

    control.createAnswersList = function (question) {
        let answerContainer = control.createDiv("answer");

        for (let i = 0; i < question.choices.length; i++) {
            let choice = document.createElement("p");
            if (question.answer != null && i == question.answer) {
                choice.innerHTML = question.choices[i] + " <b>*correct answer* </b>";
            } else {
                choice.innerHTML = question.choices[i];
            }
            answerContainer.appendChild(choice);
        }
        return answerContainer;
    }

    control.createQuestionTitle = function (index) {
        let questionTitle = document.createElement("h5")
        questionTitle.innerHTML = "Question " + (index + 1);
        return questionTitle;
    }

    control.createDeleteButton = function (index) {
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "btn btn-danger");
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("value", index)
        deleteButton.setAttribute("onclick", "module.deleteQuestion(this.value)");
        return deleteButton;
    }

    control.createEditButton = function (index) {
        let editButton = document.createElement("button");
        editButton.setAttribute("class", "btn btn-primary mr-1")
        editButton.innerHTML = "Edit";
        editButton.setAttribute("value", index)
        editButton.setAttribute("onclick", "module.generateEditModal(this.value)")
        editButton.setAttribute("type", "button")
        return editButton
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

    control.clearQuestions = function () {
        localStorage.clear();
        control.showQuestions();
    }

    control.clearForm = function () {
        document.getElementById("question").value = "";
        let choice = document.getElementsByClassName("choice");
        let choiceText = document.getElementsByClassName("choiceText");

        for (let i = 0; i < choice.length; i++) {
            choice[i].checked = false;
            choiceText[i].value = "";
        }
    }

    control.clearEditForm = function () {
        document.getElementById("editQuestion").value = "";
        let choice = document.getElementsByClassName("editChoice");
        let choiceText = document.getElementsByClassName("editChoiceText");

        for (let i = 0; i < choice.length; i++) {
            choice[i].checked = false;
            choiceText[i].value = "";
        }
    }

    control.deleteQuestion = function (index) {
        questions.splice(index, 1);

        control.showQuestions();
    }

    control.generateEditModal = function (index) {
        control.clearEditForm();

        let saveEditButton = document.getElementById("save-edit-button");

        saveEditButton.replaceWith(control.createEditSaveButton(index));

        control.fillEditModal(questions[index]);

        $("#editQuestionModal").modal("show");
    }

    control.fillEditModal = function (question) {
        document.getElementById("editQuestion").value = question.question;
        let choices = document.getElementsByClassName("editChoiceText");
        let radios = document.getElementsByClassName("editChoice")

        for (let i = 0; i < choices.length; i++) {
            choices[i].value = question.choices[i];
        }

        if (question.answer != undefined) {
            radios[question.answer].checked = true;
        }
    }

    control.createEditSaveButton = function (index) {
        let editSaveButton = document.createElement("button");

        editSaveButton.innerHTML = "Save changes";
        editSaveButton.setAttribute("id", "save-edit-button");
        editSaveButton.setAttribute("class", "btn btn-primary");
        editSaveButton.setAttribute("value", index);
        editSaveButton.setAttribute("onclick", "module.editQuestion(this.value)");
        return editSaveButton;
    }

    control.editQuestion = function (index) {
        questions[index] = control.createQuestion("editQuestion", "editChoice", "editChoiceText");

        control.showQuestions();

        $(editQuestionModal).modal("hide");
    }

    control.retrieveQuiz = function () {
        let questions = localStorage.getItem("questions");
        if (questions != null) {
            return JSON.parse(questions);
        } else {
            return null;
        }
    }

    control.storeQuiz = function () {
        if (questions != null) {
            let data = JSON.stringify(questions);
            localStorage.setItem("questions", data);
        }
    }

    questions = control.retrieveQuiz();
    control.showQuestions();
    return control;
}())