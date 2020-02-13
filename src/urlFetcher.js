const fetch = require("node-fetch");

var classesUrl = 'http://bannerweb.sabanciuniv.edu/schedule-201902.html';
var textToFetch;

function FetchClasses(text)
{
  var line = text.split("\n");
  var arrayLength =line.length;

  for(var i = 0; i < arrayLength; i++)
  {
    if(line[i].includes("<th class=\"ddlabel\" scope=\"row\""))
    {
      var indexOfBeginning = line[i].indexOf(">", line[i].indexOf(">") + 1);
      var temp = line[i].indexOf("<", line[i].indexOf("<") + 1);
      var indexOfEnd = line[i].indexOf("<", temp + 1);
      //console.log(line[i]);
      //console.log(indexOfBeginning, indexOfEnd);
      console.log(line[i].substring(indexOfBeginning + 1, indexOfEnd));
    }
  }
}

fetch(classesUrl).then(function(response) {
    return response.text();
  }).then(function(body) {
    //console.log(body);
    textToFetch = body;
  }).then(function(){
    //console.log(textToFetch);
  }).then(function(){
    //console.log(typeof textToFetch);
    FetchClasses(textToFetch);
  });