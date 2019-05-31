// 读取配置文件
$.getJSON("/config.json", function(data){
    console.log(data);
    console.log(this);
    CONFIG_JSON = data;
});

// 绘制头像图像
try{   
    document.getElementById("icon-img")["src"] = CONFIG_JSON["icon_url"];
} catch(err){
    document.getElementById("icon-img")["src"] = "src/icon.jpg"
}

// 加载文章分类目录
var artDirUrl;
try{
    artDirUrl = CONFIG_JSON["data_url"];
}catch(err){
    artDirUrl = "data";
}