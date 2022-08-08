"use strict";
//made for complete js implementation for no reason
let mainApp='<div><ul class="choises inline" id="choises"><li><label >Prof</label><input type="checkbox" name="prof" id="Prof" checked></li><label >education</label><input type="checkbox" name="education" id="education" checked></li><li><label >personal</label><input type="checkbox" name="personal" id="Personal" checked></li><li><label >Projects</label><input type="checkbox" name="project" id="projects" checked></li><li style="display: none;"><label >Projects</label><input type="checkbox" name="always" id="always" checked></li></ul></div><ul class="timeline"><root-li id="root-ele"></root-li></ul>'
document.querySelector("root").innerHTML=mainApp;
let choises=document.querySelector("#choises")
let choisesBox=document.querySelectorAll("#choises input")
choises.addEventListener('change', function() {
    let displayClass=[];
    for( let cb of choisesBox)
        cb.checked?displayClass.push(cb.name):"";
  
    let eles=document.querySelectorAll("#root-ele li");
    for ( let el of eles){
      let updated=false
      for (let i of displayClass)
        if(el.classList.contains(i)){
          el.style.display="block"
          updated=true
          break
        }
        updated?"":el.style.display="none";
    }});

function displayTimeline(configData){
    console.log(configData)
    let root=document.getElementsByTagName("root-li")[0];
    let timeLineHtml="";
    for (let [i, val] of configData.entries()) {
        timeLineHtml+='<li class=" '+ val.cssclass+' " >'+
            '<div class="direction-'+(i%2==0?'r':'l')+' ">'+
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
//let username = window.location.href.split("https://")[1].split(".")[0];
//let url= "https://raw.githubusercontent.com/"+username+"/"+username+"/master/timeline.json";
//url can be set to localdir but wanted to reuse config in other things also
fetch("./timeline.json", {
  headers: {
    'Cache-Control': 'no-cache'
  }
})
        .then(response => response.json())
        .then(data => displayTimeline(data));
    


                
