/**
 * 首页
 */
$("#btn-test").on('click',function(){
    var data = {
        title: '国内要闻',
        time: (new Date).toString(),
        list: [
            {
                id: '1',
                name: '凌天968899'
            },
            {
                id: '2',
                name: '小木s菲'
            }
        ]
    };
    $.ajax({
        url:'test.json',
        success:function (res) {
            console.log(res);
        }
    })
    //var html = template('test', data);
    var html = template('list',data);
    document.getElementById('main').innerHTML = html;
});