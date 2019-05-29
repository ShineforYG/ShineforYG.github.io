 var CONFIG_JSON;

$.getJSON("/config.json", CONFIG_JSON = function(data){
    return data;
});

try{   
    document.getElementById("icon-img")["src"] = CONFIG_JSON["icon_url"];
} catch{
    document.getElementById("icon-img")["src"] = "src/icon.jpg"
}
