host = '192.168.167.127:1337'

function get_list(compiledListTemplate, id, callback) {
    var url = 'http://' + host + '/list'
    if (id) {
        url = url + '?id=' + id
    }
    $$.getJSON(url, {}, function (data) {
        console.log(data)
        var html = compiledListTemplate(data);
        if (id) {
            $$('#article_list ul').append(html)
        } else {
            $$('#article_list ul').html(html)
        }
        if (data.result.length > 0)
            last_sid = data.result[data.result.length - 1].sid
        if (callback)
            callback()
    })
}