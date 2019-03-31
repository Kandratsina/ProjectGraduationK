$(document).ready(function () {

    GetMessages();

    $('#publishButton').click(function () {
        PublishMessage();
    });

    function PublishMessage() {
        let message = $('#inputMessage').val();
        let author = $('#currentUserName').text();

        $.ajax({
            url: 'feed/SaveMessage',
            type: 'POST',
            data: {
                "messageText": message,
                "author": author
            },
            success: function () {
                location.reload();
            },
            error: function () {
                alert('Failed to publish a message');
            }
        })
    }

    function DeleteMessage(postId) {
        $.ajax({
            url: 'feed/'.concat(postId),
            type: 'DELETE',
            success: function () {
                window.location.replace(window.location);
            }
        })
    }

    function GetMessages() {
        $.ajax({
            url: 'feed/GetMessages',
            type: 'GET',
            success: function (data) {
                AppendMessagesToPage(data);
                AppendDeletePostEvents();
            }
        })
    }

    function AppendMessagesToPage(messages) {
        for (let i = Object.keys(messages).length - 1; i >= 0; i--) {
            let date = new Date(messages[i].publishDate);
            let formattedDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

            $('#messages').append('<div class="widget has-shadow"> <div class="widget-header d-flex align-items-center"> <div class="user-image"> <img class="rounded-circle" src="assets/img/avatar/avatar-04.jpg" alt="..."> </div><div class="d-flex flex-column mr-auto"> <div class="title"> <span class="username">' + messages[i].author + '</span> написал(а) </div><div class="time">' + formattedDate + '</div></div><div class="widget-options"> <div class="dropdown"> <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle"> <i class="la la-ellipsis-h"></i> </button> <div class="dropdown-menu"> <a name="editPost" data-id="' + messages[i].messageId + '" class="dropdown-item"> <i class="la la-edit"></i>Редактировать</a> <a name="deletePost" href="javascript:void(0)" data-id="' + messages[i].messageId + '" class="dropdown-item"> <i class="la la-trash"></i>Удалить</a> </div></div></div></div><div class="widget-body"> <p>' + messages[i].messageText + '</p></div><div class="widget-footer d-flex align-items-center"> <div class="col-xl-8 col-md-8 col-7 no-padding d-flex justify-content-start align-items-center"> </div><div class="col-xl-4 col-md-4 col-5 no-padding d-flex justify-content-end"> <div class="meta"> <ul> <li> <a href="javascript:void(0);"> <i class="la la-comment"></i><span class="numb">12</span> </a> </li><li> <a href="javascript:void(0);"> <i class="la la-heart-o"></i><span class="numb">18</span> </a> </li></ul> </div></div></div></div>');
        }
    }

    function AppendDeletePostEvents() {
        let deletePostButtons = document.getElementsByName('deletePost');
        for (let i = 0; i < deletePostButtons.length; i++) {
            $(deletePostButtons[i]).click(function () {
                let postId = $(deletePostButtons[i]).attr('data-id');
                DeleteMessage(postId);
            });
        }
    }
})