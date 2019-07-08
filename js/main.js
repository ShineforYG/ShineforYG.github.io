// ---------------- 相关函数 ---------------- // 
// 插入文章
function displayArticle() {
    console.log("dsds");
}


// ---------------- 初始化相关 ---------------- // 
// 读取配置文件
var CONFIG_JSON;
var cur_art_list;

// 关闭JQuery的异步（异步：就是getJSON执行的时候，不等待，直接去执行后面的代码）
$.ajaxSettings.async = false;
$.getJSON("/config.json", function (data) {
    console.log("sss");
    CONFIG_JSON = data;
});

// 绘制头像图像
try {
    document.getElementById("icon-img")["src"] = CONFIG_JSON["icon_url"];
} catch (err) {
    document.getElementById("icon-img")["src"] = "src/icon.jpg"
}

// 加载文章分类目录
var artDirectory;
try {
    artDirectory = CONFIG_JSON["art_dir"];
} catch (err) {
    artDirectory = "data";
}

// 添加文章分类目录
for (var i = 0; i < artDirectory.length; i++) {
    var newChild = document.createElement("li");
    newChild.innerHTML = artDirectory[i].name;
    newChild.value = i;
    newChild.id = "art-dir"
    document.getElementById("directory-list").appendChild(newChild);
}
$("li#art-dir").addClass("tags-li");

// 目录点击事件
$("li#art-dir").click(function () {
    // 修改被选中的颜色
    $("li#art-dir").removeClass("tags-li-clicked").addClass("tags-li");
    this.classList.add("tags-li-clicked");
    this.classList.remove("tags-li");

    // 加载文章列表
    cur_art_list = CONFIG_JSON["art_dir"][this.value]["chlidren"];
    $("#article-list").empty();
    console.log($("#article-list"));

    for (var i = 0; i < cur_art_list.length; i++) {
        var newChild = document.createElement("li");
        newChild.innerHTML = cur_art_list[i].name;
        newChild.value = i;
        newChild.id = "art";
        document.getElementById("article-list").appendChild(newChild);
    }
    $("li#art").addClass("tags-li");

    // 点击文章显示markdown文档
    $("li#art").click(function () {

        // 样式被选中效果
        $("li#art").removeClass("tags-li-clicked-art").addClass("tags-li");
        this.classList.add("tags-li-clicked-art");
        this.classList.remove("tags-li");

        // 获取markdown文档
        console.log(cur_art_list[this.value]["url"]);
        $(".article-div").html("<h1>加载中</h1>");
        $.get(cur_art_list[this.value]["url"], function (data) {
            // 显示markdown文档
            $(".article-div").html(marked(data));
        }, "text"
        );
    })
});

// 插入文章目录