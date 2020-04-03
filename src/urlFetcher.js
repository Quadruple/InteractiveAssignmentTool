const fetch = require("node-fetch");

var classesUrl = 'http://bannerweb.sabanciuniv.edu/schedule-201902.html';
var textToFetch;

function FetchClasses(text)
{
  var line = text.split("\n");
  var arrayLength =line.length;
  var wholeClasses = [];

  for(var i = 0; i < arrayLength; i++)
  {
    if(line[i].includes("<th class=\"ddlabel\" scope=\"row\""))
    {
      var indexOfBeginning = line[i].indexOf(">", line[i].indexOf(">") + 1);
      var temp = line[i].indexOf("<", line[i].indexOf("<") + 1);
      var indexOfEnd = line[i].indexOf("<", temp + 1);
      //console.log(line[i].substring(indexOfBeginning + 1, indexOfEnd));
      wholeClasses.push(line[i].substring(indexOfBeginning + 1, indexOfEnd));
    }
  }

  return wholeClasses;
}

function fetchTimesOfRecits(text, sectionName)
{
  var line = text.split("\n");
  var arrayLength =line.length;
  var lineNumOfClass = 0;

  for(var i = 0; i < arrayLength; i++)
  {
    if(line[i].includes(sectionName))
    {
      lineNumOfClass = i;
      break;
    }
  }

  for (x = lineNumOfClass + 1; x < arrayLength; x++)
  {
    if(line[x].includes("<td class=\"dddefault\">") && (line[x].includes(" am ") || line[x].includes(" pm ") || line[x].includes("TBA")))
    {
      indexOfBeginning = line[x].indexOf(">");
      indexOfEnd = line[x].indexOf("<", indexOfBeginning + 1);
      console.log(line[x].substring(indexOfBeginning + 1, indexOfEnd));
    }
    else if(line[x].includes("</table>"))
    {
      break;
    }
  }
}

function fetchDiscussionsAndRecitations(text, coursename)
{
  var courseRecit = coursename + "R";
  var courseDiscussion = coursename + "D";
  var courseLab = coursename + "L";

  var wholeClasses = FetchClasses(text);
  for(var i = 0; i < wholeClasses.length; i++)
  {
    if(wholeClasses[i].includes(courseRecit) || wholeClasses[i].includes(courseDiscussion) || wholeClasses[i].includes(courseLab))
    {
      console.log(wholeClasses[i]);
    }
  }
}


function fetchEmailOfInstructor(text, instructorname)
{
  var line = text.split("\n");
  var arrayLength = line.length;

  for(var i = 0; i < arrayLength; i++)
  {
    if(line[i].includes(instructorname))
    {
      var matchGroup = line[i].match(/<a href\="(.*?)"/g); 
      var instructorMailto = matchGroup[0].match(/(?<=\")(.*?)(?=\")/g);
      var indexOfBegin = matchGroup[0].indexOf(":");
      var instructorEmail = matchGroup[0].substring(indexOfBegin + 1, matchGroup[0].length - 1);
      console.log(instructorEmail);
      break;
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
  }).then(function(){
    fetchEmailOfInstructor(textToFetch, "Hülya Görür Atabaş");
  }).then(function(){
    fetchDiscussionsAndRecitations(textToFetch, "SPS 102");
  }).then(function(){
    fetchTimesOfRecits(textToFetch, "IF 100R - A2");
  });