$(document).ready(function () {

    GetQuestions();

    function DeleteQuestion(questionId) {
        $.ajax({
            url: 'faq/'.concat(questionId),
            type: 'DELETE',
            success: function () {
                window.location.replace(window.location);
            }
        })
    }

    function GetQuestions() {
        $.ajax({
            url: 'faq/GetQuestions',
            type: 'GET',
            success: function (data) {
                AppendQuestionToPage(data);
                AppendDeleteQuestionEvents();
            }
        })
    }

    function AppendQuestionToPage(questions) {
        for (let i = Object.keys(questions).length - 1; i >= 0; i--) {

            $('#questionContainer').append('<a class="card-header collapsed d-flex align-items-center" data-toggle="collapse" href="#IconLeftCollapse' + i + '"> <div id="question" class="card-title">' + questions[i].questionText + '</div></a> <div id="IconLeftCollapse' + i + '" class="card-body collapse pt-0" data-parent="#accordion-icon-left"> <p id="answer">' + questions[i].answer + ' </p><div> <button type="button" class="btn btn-info"> <i class="la la-edit"></i>Редактировать </button> <button type="button" name="deleteQuestion" data-id="' + questions[i].questionId + '" class="btn btn-info" data-dismiss="modal"> <i class="la la-trash"></i>Удалить </button> </div></div>');
        }
    }

    function AppendDeleteQuestionEvents() {
        let deleteQuestionButtons = document.getElementsByName('deleteQuestion');
        for (let i = 0; i < deleteQuestionButtons.length; i++) {
            $(deleteQuestionButtons[i]).click(function () {
                let questionId = $(deleteQuestionButtons[i]).attr('data-id');
                DeleteQuestion(questionId);
            });
        }
    }
})



