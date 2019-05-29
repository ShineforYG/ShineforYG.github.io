 var CONFIG_JSON;

$.getJSON("/config.json", function(data){
    CONFIG_JSON = data;
});

try{   
    document.getElementById("icon-img")["src"] = CONFIG_JSON["icon_url"];
} catch{
    document.getElementById("icon-img")["src"] = "src/icon.jpg"
}
