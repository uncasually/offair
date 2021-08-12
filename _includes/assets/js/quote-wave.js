//////////////////////////////
/* - QUOTE WAVE ANIMATION - */
//////////////////////////////

var darkgrey = "#0e4033";
//var divWidth = parseInt(d3.select("#quote-wave").style("width"));
var divWidth = document.getElementById('quote-wave').offsetWidth;
var divHeight = document.getElementById('quote-wave').clientHeight;
var margin = {
  top: 200,
  right: 0,
  bottom: 0,
  left: -100
};
var width = divWidth - margin.left - margin.right;
var height = divHeight;
//console.log(divWidth, width, height);
//SVG container
var svg = d3
  .select("#quote-wave")
  // Container class to make it responsive.
  //.classed("svg-container", true) 
  .append("svg")
  //.attr("preserveAspectRatio", "xMinYMin meet")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  //.attr("viewBox", "0 0 600 400")
  // Class to make it responsive.
  //.classed("svg-content-responsive", true)
  .append("g")
  //.attr("width", 600)
  //.attr("height", 400)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y-%m-%d"); // timeParse is added in version v4
var angle = (50 * Math.PI) / 180;
var radius = 455;
var newXmargin = margin.left;
var n;
//Round number to 2 behind the decimal
function round2(num) {
  return Math.round((num + 0.00001) * 100) / 100;
} //round2
function calculateGrid() {
  //How many circles fit in one "row"
  var s = width / Math.cos(angle);
  var numCircle = Math.min(4, Math.floor(s / (2 * radius)));
  //I don't want 1 circle
  if (numCircle === 1) numCircle = 2;
  //If it's not an exact fit, make it so
  radius = Math.min(radius, round2(s / numCircle / 2));

  //Locations for the textPath
  var xLocArc = new Array(numCircle + 1);
  for (var i = 0; i <= numCircle; i++) {
    xLocArc[i] = round2(2 * i * radius * Math.cos(angle));
  } //for i

  //New width & divide margins so it will sit in the center
  width = xLocArc[numCircle];
  newXmargin = round2((divWidth - width) / 2);
  //svg.attr("transform", "translate(" + newXmargin + "," + margin.top + ")");

  return { xLocArc: xLocArc, numCircle: numCircle };
} //function calculateGrid

var grid = calculateGrid();
var quotes = [
  { quote: "We create deeper experiences with music" },
  { quote: "OFFAIR" },
  { quote: "Listen with intention" },
  { quote: "OFFAIR" },
  { quote: "Your favorite artist’s side project" },
  { quote: "OFFAIR" },
  { quote: "Music to experience" },
  { quote: "OFFAIR" }
];
drawQuoteWave("", quotes);
function drawQuoteWave(error, quotes) {
  n = 4;

  //Create the outer circular path
  svg
    .append("path")
    .attr("class", "circle-path")
    .attr("id", "circle-word-path")
    //.style("stroke", "#9d9d9d")
    .attr("d", calculateSnakePath(grid, n));

  //Create the text itself
  var wordString = " ";
  quotes.forEach(function (d, i) {
    wordString = wordString + d.quote + "\u00A0\u00A0";
  });
  //console.log(wordString);

  //Create text on path
  var quoteWave = svg
    .append("text")
    .attr("class", "circle-path-text noselect")
    .style("fill", "none")
    .attr("dy", "0.17em")
    .append("textPath")
    .attr("id", "top-word-string")
    .style("text-anchor", "middle")
    .style("fill", darkgrey)
    .attr("xlink:href", "#circle-word-path")
    .attr("startOffset", "0%")
    .text(wordString + "\u00A0\u00A0" + wordString);

  repeat();
  //animateQuoteWave();
} //function drawQuoteWave

function calculateSnakePath(grid, n) {
  var pos = 0,
    add = 1;
  function newPos() {
    if (pos === grid.numCircle) {
      add = -1;
    } else if (pos === 0) {
      add = 1;
    }
    pos = pos + add;
  } //newPos

  var xOld = 0,
    yOld = 0,
    sweep = 0,
    switchSide = 1;

  var path = "M0,0 ";

  //Construct the custom SVG paths out of arcs
  for (var i = 1; i <= n; i++) {
    //For the inbetween circles
    //console.log(i, "inbetween");
    newPos();
    x = grid.xLocArc[pos];
    y = yOld + round2(1.5 * radius * Math.sin(angle));
    path =
      path +
      " A" +
      radius +
      "," +
      radius +
      " 0 0," +
      sweep +
      " " +
      x +
      "," +
      y +
      " ";
    xOld = x;
    yOld = y;
    sweep = sweep ? 0 : 1;
  } //for i

  //Adjust the height of the SVG
  height = yOld;
  d3.select("#quote-wave svg").attr(
    "height",
    height + margin.top + margin.bottom
  );

  return path;
} //function calculateSnakePath

//function animateQuoteWave() {
function repeat() {
  var animateQuoteWave = d3.select("#top-word-string")
    .transition("move")
    .duration(180000)
    .ease(d3.easeLinear)
    .attr("startOffset", "100%")
    .transition("move")
    .duration(180000)
    .ease(d3.easeLinear)
    .attr("startOffset", "0%")
    .on("end", repeat);
  } ;//function animateQuoteWave
