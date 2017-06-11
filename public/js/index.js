
$(function(){
    var urlInput = document.querySelector('#url-input');
    var nameInput = document.querySelector('#name-input');
    urlInput.value = 'https: //gitrepository';

    var btnCreate = document.querySelector('#btn-create');
    var btnDeploy = document.querySelector('#btn-deploy');

    var timestamp = new Date().getTime();
    nameInput.value = 'Branch-' + timestamp;

    getBranchesInfo();

    btnCreate.onclick = function(){
        $.ajax({
            url:"/controller/createBranch/"+new Date().valueOf(),
            data:{username: nameInput.value},
            dataType:"json",
            type:"get",
            success:function (data) {
                console.log('crete',data)
                alert('创建分支成功');
                getBranchesInfo();
            },
            error:function (err) {
                console.log(err);
            }
        });
    }

    btnDeploy.onclick = function(){

    }


});


function getBranchesInfo(){
    $.ajax({
        url:"/controller/getBranchInfo",
        data:{},
        dataType:"json",
        type:"get",
        success:function (data) {
            console.log(data);
            var items=[
                [{v:'Master', f:'Master'}, '']
            ];
            data.forEach(function (elem,index,arr) {
                items.push([elem,'Master']);
            });


            drawChart(items);


        },
        error:function (err) {
            console.log(err);
        }
    });
}


// google.charts.load('current', {packages:["orgchart"]});
// google.charts.setOnLoadCallback(drawChart);
function drawChart(myData) {
    myData = myData ? myData : [];
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');

    // For each orgchart box, provide the name, manager, and tooltip to show.
    data.addRows(myData);
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, {allowHtml:true});
}
