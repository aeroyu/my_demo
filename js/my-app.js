// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({  // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }});

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Framework7.$;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});
var detailTemplate = $$('script#detail-template').html();
var compiledDetailTemplate = Template7.compile(detailTemplate);

console.log(detailTemplate)
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
    console.log(page)
    if (page.name === 'detail') {
//        // Following code will be executed for page with data-page attribute equal to "about"
//        myApp.alert('Here comes About page');


        var sid = page.query.sid
        $$.getJSON('http://' + host + '/detail?id=' + sid, {}, function (data) {
            console.log(data)
            var html = compiledDetailTemplate(data);
            $$('#defail_content').html(html)
        })
    }
})

last_sid = null
var listTemplate = $$('script#list-template').html();
var compiledListTemplate = Template7.compile(listTemplate);
get_list(compiledListTemplate)


// 下拉刷新页面
var ptrContent = $$('.pull-to-refresh-content');

// 添加'refresh'监听器
ptrContent.on('refresh', function (e) {
    // 模拟2s的加载过程
    get_list(compiledListTemplate, null, function () {
        myApp.pullToRefreshDone();

    })
});
var loading = false;
// 注册'infinite'事件处理函数
$$('.infinite-scroll').on('infinite', function () {

    // 如果正在加载，则退出
    if (loading) return;

    // 设置flag
    loading = true;

    get_list(compiledListTemplate, last_sid, function () {
        loading = false;
    })

});