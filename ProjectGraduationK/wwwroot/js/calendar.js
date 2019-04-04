$(document).ready(function () {
    let events = [];
    let selectedEvent = null;
    FetchEventAndRenderCalendar();

    function FetchEventAndRenderCalendar() {
        events = [];
        $.ajax({
            type: "GET",
            url: "/calendar/GetEvents",
            success: function (data) {
                $.each(data, function (k, v) {
                    events.push({
                        eventId: v.eventId,
                        title: v.subject,
                        description: v.description,
                        start: moment(v.start),
                        end: v.end != null ? moment(v.end) : null,
                        color: v.themeColor,
                        allDay: v.isFullDay
                    });
                })

                GenerateCalendar(events);
            },
            error: function (error) {
                alert('failed');
            }
        })
    }

    function GenerateCalendar(events) {
        $(' ').fullCalendar('destroy');
        $('#calendar').fullCalendar({
            contentHeight: "auto",
            firstDay: 1,
            defaultDate: new Date(),
            timeFormat: 'h(:mm)a',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'],
            dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
            dayNamesShort: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
            buttonText: {
                today: "Сегодня",
                month: "Месяц",
                week: "Неделя",
                day: "День",
            }, 
            eventLimit: true,
            eventColor: '#378006',
            events: events,
            eventClick: function (calEvent) {
                selectedEvent = calEvent;
                $('#myModal #eventTitle').text(calEvent.title);
                let $description = $('<div/>');
                $description.append($('<p/>').html('<b>Начало: </b>' + calEvent.start.format("DD-MMM-YYYY HH:mm a")));
                if (calEvent.end != null) {
                    $description.append($('<p/>').html('<b>Конец: </b>' + calEvent.end.format("DD-MMM-YYYY HH:mm a")));
                }
                $description.append($('<p/>').html('<b>Описание: </b>' + calEvent.description));
                $('#myModal #pDetails').empty().html($description);
                $('#myModal').modal();
            },
            selectable: true,
            select: function (start, end) {
                selectedEvent = {
                    eventID: 0,
                    title: '',
                    description: '',
                    start: start,
                    end: end,
                    allDay: false,
                    color: ''
                };
                openAddEditForm();
                $('#calendar').fullCalendar('unselect');
            },
            editable: true,
            eventDrop: function (event) {
                let data = {
                    EventID: event.eventID,
                    Subject: event.title,
                    Start: event.start.format('DD/MM/YYYY HH:mm A'),
                    End: event.end != null ? event.end.format('DD/MM/YYYY HH:mm A') : null,
                    Description: event.description,
                    ThemeColor: event.color,
                    IsFullDay: event.allDay
                };
                SaveEvent(data);
            }
        })
    }

    $('#btnEdit').click(function () {
        //Open modal dialog for edit event
        openAddEditForm();
    })

    $('#btnDelete').click(function () {
        if (selectedEvent != null && confirm('Are you sure?')) {
            $.ajax({
                type: "DELETE",
                url: '/calendar/'.concat(selectedEvent.eventId),
                error: function () {
                    alert('Failed');
                }
            })
            $('#myModalSave').modal('hide');
            location.reload();
        }
    })

    $('#dtp1,#dtp2').datetimepicker({
        format: 'DD/MM/YYYY HH:mm A'
    });

    $('#chkIsFullDay').change(function () {
        if ($(this).is(':checked')) {
            $('#divEndDate').hide();
        }
        else {
            $('#divEndDate').show();
        }
    });

    function openAddEditForm() {
        if (selectedEvent != null) {
            $('#hdEventID').val(selectedEvent.eventId);
            $('#txtSubject').val(selectedEvent.title);
            $('#txtStart').val(selectedEvent.start.format('DD/MM/YYYY HH:mm A'));
            $('#chkIsFullDay').prop("checked", selectedEvent.allDay || false);
            $('#chkIsFullDay').change();
            $('#txtEnd').val(selectedEvent.end != null ? selectedEvent.end.format('DD/MM/YYYY HH:mm A') : '');
            $('#txtDescription').val(selectedEvent.description);
            $('#ddThemeColor').val(selectedEvent.color);
        }
        $('#myModal').modal('hide');
        $('#myModalSave').modal();
        
    }

    $('#btnSave').click(function () {
        //Validation/
        if ($('#txtSubject').val().trim() == "") {
            alert('Subject required');
            return;
        }
        if ($('#txtStart').val().trim() == "") {
            alert('Start date required');
            return;
        }
        if ($('#chkIsFullDay').is(':checked') == false && $('#txtEnd').val().trim() == "") {
            alert('End date required');
            return;
        }
        else {
            let startDate = moment($('#txtStart').val(), "DD/MM/YYYY HH:mm A").toDate();
            let endDate = moment($('#txtEnd').val(), "DD/MM/YYYY HH:mm A").toDate();
            if (startDate > endDate) {
                alert('Invalid end date');
                return;
            }
        }

        let data = {
            EventID: $('#hdEventID').val(),
            Subject: $('#txtSubject').val().trim(),
            Start: $('#txtStart').val().trim(),
            End: $('#chkIsFullDay').is(':checked') ? null : $('#txtEnd').val().trim(),
            Description: $('#txtDescription').val(),
            ThemeColor: $('#ddThemeColor').val(),
            IsFullDay: $('#chkIsFullDay').is(':checked')
        }
        SaveEvent(data);
        $('#myModalSave').modal('hide');
        location.reload();
    })

    function SaveEvent(data) {
        $.ajax({
            type: "POST",
            url: '/calendar/SaveEvent',
            data: data,
            error: function () {
                alert('Failed');
            }
        })
    }
})