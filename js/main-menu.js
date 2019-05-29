 var CONFIG_JSON;

$.getJSON("/config.json", function(data){
    console.log(this);
    console.log(data);
    CONFIG_JSON = data;
    console.log(CONFIG_JSON);
});

console.log(CONFIG_JSON);
try{   
    document.getElementById("icon-img")["src"] = CONFIG_JSON["icon_url"];
} catch{
    document.getElementById("icon-img")["src"] = "src/icon.jpg"
}
