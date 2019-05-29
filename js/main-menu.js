 var CONFIG_JSON;

$.getJSON("/config.json", function(data){
    CONFIG_JSON = JSON.parse(data);
    console.log(data);
});

try{   
    document.getElementById("icon-img")["src"] = CONFIG_JSON["icon_url"];
} catch{
    document.getElementById("icon-img")["src"] = "src/icon.jpg"
}
