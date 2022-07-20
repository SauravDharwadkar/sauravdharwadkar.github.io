"use strict";
function displayTimeline(configData){
    console.log(configData)
    let root=document.getElementsByTagName("root")[0];
    let timeLineHtml="";
    for (let [i, val] of configData.entries()) {
        timeLineHtml+='<li>'+
            '<div class="direction-'+(i%2==0?'r':'l')+'">'+
            '<div class="flag-wrapper">'+
            '<span class="flag">'+val.flag+'</span>'+
            '<span class="time-wrapper"><span class="time">'+val.date+'</span></span>'+
            '</div>'+
            '<div class="desc">'+val.desc+'</div>'+
            '</div>'+
            '</li> ';

    }
    root.innerHTML=timeLineHtml;
}

//work only with github.io site
let username = window.location.href.split("https://")[1].split(".")[0];
let url= "https://raw.githubusercontent.com/"+username+"/"+username+"/master/timeline.json";
//url can be set to localdir but wanted to reuse config in other things also
fetch(url)
        .then(response => response.json())
        .then(data => displayTimeline(data));
    


                