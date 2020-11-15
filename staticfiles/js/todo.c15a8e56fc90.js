$("document").ready(function () {

    let createTaskForm = $("#createTaskForm");
    let createButton = $("#createButton");
    let taskList = $("#taskList");
    let csrfToken = $("input[name='csrfmiddlewaretoken']").val();

    // send task
    createButton.click(function () {
        let serializedData = createTaskForm.serialize();

        $.ajax({
            url: createTaskForm.data("url"),
            data: serializedData,
            type: 'post',
            success: function (response) {
                taskList.append(`<div class="card mb-1" data-id="${response.task.id}">` +
                    `<div class="card-body" >` +
                    `${response.task.title}` +
                    `<button type="button" class="close float-right" data-id='${response.task.id}'>` +
                    `<span aria-hidden="true">&times;</span>` +
                    `</button>` +
                    `</div>` +
                    `</div>`);
            }
        });

        createTaskForm[0].reset();
    });

    // task complete and delete
    taskList.on("click", '.card', function () {

        let dataId = $(this).data('id');

        $.ajax({
            url: `/tasks/${dataId}/completed/`,
            data: {
                csrfmiddlewaretoken: csrfToken,
                id: dataId
            },
            type: "post",
            success: function () {
                let cardItem = $(`.card[data-id='${dataId}']`);
                cardItem.css("text-decoration", "line-through").hide().slideDown();
                taskList.append(cardItem);
            }
        });
    }).on("click", "button.close", function (event) {
        event.stopPropagation();

        let dataId = $(this).data('id');

        $.ajax({
            url: `/tasks/${dataId}/delete/`,
            data: {
                csrfmiddlewaretoken: csrfToken,
                id: dataId
            },
            type: "post",
            dataType: "json",
            success: function (response) {
                $(`.card[data-id='${dataId}']`).fadeOut().remove();
            }
        });
    });


});