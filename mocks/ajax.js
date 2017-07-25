function getUser(listId, callback) {
    $.ajax({
        url: '/'+listId,
        success: function (data) {
            callback(null, data);
        }
    });
}
