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
      console.log(line[i].substring(indexOfBeginning + 1, indexOfEnd));
    }
  }
}

function fetchInstructorsOfAClass(text, coursename)
{
  var line = text.split("\n");
  var arrayLength = line.length;

  var lineNumOfCourse = 0;

  for(var i = 0; i < arrayLength; i++)
  {
    if(line[i].includes("<th class=\"ddlabel\" scope=\"row\""))
    {
      var indexOfBeginning = line[i].indexOf(">", line[i].indexOf(">") + 1);
      var temp = line[i].indexOf("<", line[i].indexOf("<") + 1);
      var indexOfEnd = line[i].indexOf("<", temp + 1);
      if (line[i].substring(indexOfBeginning + 1, indexOfEnd).includes(coursename))
      {
        lineNumOfCourse = i;
        break;
      }
    }
  }

  for(var i = lineNumOfCourse + 1; i < arrayLength; i++)
  {
    if(line[i].includes("<a href=\"mailto:"))
    {
      var matchGroup = line[i].match(/target\="(.*?)"/g);
      for(var i = 0; i < matchGroup.length; i++)
      {
        var instructorName = matchGroup[i].match(/(?<=\")(.*?)(?=\")/g);
        console.log(instructorName)
      }
      break;
    }
  }
}

fetch(classesUrl).then(function(response) {
    return response.text();
  }).then(function(body) {
    textToFetch = body;
  }).then(function(){
    //console.log(textToFetch);
  }).then(function(){
    FetchClasses(textToFetch);
  }).then(function(){
    fetchInstructorsOfAClass(textToFetch, "VA 455");
  });