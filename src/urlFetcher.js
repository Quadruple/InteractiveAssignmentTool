const fetch = require("node-fetch");
const fs = require('fs');

var classesUrl = 'http://bannerweb.sabanciuniv.edu/schedule-201902.html';

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

async function fetchInstructorsOfAClass(coursename)
{
  var instructors = [];
  var lines = fs.readFileSync('./classes.txt').toString().split("\n");
  var lineNumOfCourse = 0;

  for(var i = 0; i < lines.length; i++)
  {
    if(lines[i].includes("<th class=\"ddlabel\" scope=\"row\""))
    {
      var indexOfBeginning = lines[i].indexOf(">", lines[i].indexOf(">") + 1);
      var temp = lines[i].indexOf("<", lines[i].indexOf("<") + 1);
      var indexOfEnd = lines[i].indexOf("<", temp + 1);
      if (lines[i].substring(indexOfBeginning + 1, indexOfEnd).includes(coursename))
      {
        lineNumOfCourse = i;
        break;
      }
    }
  }

  for(var i = lineNumOfCourse + 1; i < lines.length; i++)
  {
    if(lines[i].includes("<a href=\"mailto:"))
    {
      var matchGroup = lines[i].match(/target\="(.*?)"/g);
      for(var i = 0; i < matchGroup.length; i++)
      {
        var instructorName = matchGroup[i].match(/(?<=\")(.*?)(?=\")/g);
        instructors.push(...instructorName)
      }
      break;
    }
  }
  return instructors
}

//CREATING THE CLASSES.TXT FILE
/* fetch(classesUrl)
  .then(res => res.text())
  .then(body => 
    fs.writeFile('classes.txt', body, (err) => {
      if (err) throw err;
      console.log('Saved!');
    })
  ); */

module.exports = {
  fetchInstructorsOfAClass,
}