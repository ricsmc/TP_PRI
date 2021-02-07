$(() => {
    $("#addTag").click(()=> {
        $('#tagLst').append('<input class="w3-input" type="text" name="tags" />')
    })
    $("#addFile").click(()=> {
        $('#fileLst').append('<input class="w3-input" type="file" name="myFiles" multiple/>')
    })
})

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});