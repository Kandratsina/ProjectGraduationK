$(document).ready(function () {

    GetQuestions();

    $('#publishButton').click(function () {
        PublishQuestion();
    });

    function PublishQuestion() {
        let questionText = $('#questionText').val();
        let answer = $('#answer').val();

        $.ajax({
            url: 'faq/SaveQuestion',
            type: 'POST',
            data: {
                "questionText": questionText,
                "answer": answer
            },
            success: function () {
                location.reload();
            },
            error: function () {
                alert('Failed to publish a question');
            }
        })
    }

    function GetQuestions() {
        $.ajax({
            url: 'faq/GetQuestions',
            type: 'GET',
            success: function (data) {
                AppendQuestionToPage(data);
                //AppendDeletePostEvents();
            }
        })
    }

    function AppendQuestionToPage(questions) {
        for (let i = Object.keys(questions).length - 1; i >= 0; i--) {

            $('#questionContainer').append('<a class="card-header collapsed d-flex align-items-center" data-toggle="collapse" href="#IconLeftCollapse' + i + '"> <div id="question" class="card-title">' + questions[i].questionText + '</div></a> <div id="IconLeftCollapse' + i + '" class="card-body collapse pt-0" data-parent="#accordion-icon-left"> <p id="answer">' + questions[i].answer + ' </p><div> <button type="button" class="btn btn-info"> <i class="la la-edit"></i>Редактировать </button> <button type="button" class="btn btn-info" data-dismiss="modal"> <i class="la la-trash"></i>Удалить </button> </div></div>');
        }
    }

})



