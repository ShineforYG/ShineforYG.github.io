var t;

$.getJSON("/config.json", function(data){
    t = data;
    console.log(data);
});


console.log(t);