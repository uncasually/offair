if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

var darkgrey = "#1d1c1d";
//var divWidth = parseInt(d3.select("#quote-wave").style("width"));
var divWidth = document.getElementById('quote-wave').offsetWidth;
var margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var width = divWidth - margin.left - margin.right;
var height = width;
//console.log(divWidth, width, height);
//SVG container
var svg = d3
  .select("#quote-wave")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y-%m-%d"); // timeParse is added in version v4
var angle = (70 * Math.PI) / 180;
var radius = 255;
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
  svg.attr("transform", "translate(" + newXmargin + "," + margin.top + ")");

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
    .style("stroke", "#9d9d9d")
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
    .duration(140000)
    .ease(d3.easeLinear)
    .attr("startOffset", "100%")
    .transition("move")
    .duration(140000)
    .ease(d3.easeLinear)
    .attr("startOffset", "0%")
    .on("end", repeat);
  } ;//function animateQuoteWave

var Select_List_Data = {
  'choices': { // name of associated select list
    // names match option values in controlling select list
    hold: {
      text: '❓'
    },
    morning: {
      text: ['❓', '🎹', '🎛️', '🎼', '🎵', '🎷','🎚️','🍃'],
      value: ['0', 'piano', 'lofi', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
        },
    evening: {
      text: ['❓', '🎹', '🎛️', '🎼', '🎵', '🎷','🎚️','🍃'],
      value: ['0', 'piano', 'lofi', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
        },
    sleep: {
      text: ['❓', '🎹', '⬜', '🎼', '🎵', '🎷','🎚️','🍃'],
      value: ['0', 'piano', 'noise', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
        },
    focus: {
      text: ['❓', '🎹', '🎛️', '⬜', '🎼', '🎵', '🎷','🎚️'],
      value: ['0', 'piano', 'lofi', 'noise', 'classical', 'acoustic', 'jazz', 'electronic']
        },
    relax: {
      text: ['❓', '🎹', '🎛️', '🎼', '🎵', '🎷','🎚️','🍃'],
      value: ['0', 'piano', 'lofi', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
        },
    cooking: {
      text: ['❓', '🎹', '🎛️', '🎼', '🎵', '🎷','🎚️'],
      value: ['0', 'piano', 'lofi', 'classical', 'acoustic', 'jazz', 'electronic']
        },
    meditation: {
      text: ['❓', '🎹', '🎛️', '⬜', '🎼', '🎵', '🎷','🎚️','🍃'],
      value: ['0', 'piano', 'lofi', 'noise', 'classical', 'acoustic', 'jazz', 'electronic', 'nature']
        }
    }
};

function removeAllOptions(sel, removeGrp) {
    var len, groups, par;
    if (removeGrp) {
        groups = sel.getElementsByTagName('optgroup');
        len = groups.length;
        for (var i=len; i; i--) {
            sel.removeChild( groups[i-1] );
        }
    }

    len = sel.options.length;
    for (var i=len; i; i--) {
        par = sel.options[i-1].parentNode;
        par.removeChild( sel.options[i-1] );
    }
}

function appendDataToSelect(sel, obj) {
    var f = document.createDocumentFragment();
    var labels = [], group, opts;

    function addOptions(obj) {
        var f = document.createDocumentFragment();
        var o;

        for (var i=0, len=obj.text.length; i<len; i++) {
            o = document.createElement('option');
            o.appendChild( document.createTextNode( obj.text[i] ) );

            if ( obj.value ) {
                o.value = obj.value[i];
            }

            f.appendChild(o);
        }
        return f;
    }

    if ( obj.text ) {
        opts = addOptions(obj);
        f.appendChild(opts);
    } else {
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) {
                labels.push(prop);
            }
        }

        for (var i=0, len=labels.length; i<len; i++) {
            group = document.createElement('optgroup');
            group.label = labels[i];
            f.appendChild(group);
            opts = addOptions(obj[ labels[i] ] );
            group.appendChild(opts);
        }
    }
    sel.appendChild(f);
}

document.forms['plForm'].elements['category'].onchange = function(e) {
    var relName = 'choices';
    var relList = this.form.elements[ relName ];
    var obj = Select_List_Data[ relName ][ this.value ];
    removeAllOptions(relList, true);
    appendDataToSelect(relList, obj);
};

(function() {

    var form = document.forms['plForm'];
    var sel = form.elements['category'];
    sel.selectedIndex = 0;
    var relName = 'choices';
    var rel = form.elements[ relName ];
    var data = Select_List_Data[ relName ][ sel.value ];

    appendDataToSelect(rel, data);

}());

$( "form" ).submit(function( event ) {
  //console.log( $( this ).serializeArray() );
  event.preventDefault();
});

$( "#choices" )
  .change(function() {
    var str = "";
    $( "select option:selected" ).each(function() {
      str += $( this ).text() + " ";
    });
    $( "div" ).text( str );
  var fields = $( "form" ).serializeArray();
    $( "div" ).empty();
    var morning = 0
    var evening = 0
    var sleep = 0
    var focus = 0
    var relax = 0
    var cooking = 0
    var meditate = 0
    var piano = 0
    var lofi = 0
    var noise = 0
    var classic = 0
    var acoustic = 0
    var jazz = 0
    var electronic = 0
    var nature = 0
    jQuery.each( fields, function( i, field ) {
      //$( "div" ).append( field.value + " " );

      if (field.value == "morning") { morning = true }
      if (field.value == "evening") { evening = true }
      if (field.value == "sleep") { sleep = true }
      if (field.value == "focus") { focus = true }
      if (field.value == "relax") { relax = true }
      if (field.value == "cooking") { cooking = true }
      if (field.value == "meditation") { meditate = true }
      if (field.value == "piano") { piano = true }
      if (field.value == "lofi") { lofi = true }
      if (field.value == "noise") { noise = true }
      if (field.value == "classical") { classic = true }
      if (field.value == "acoustic") { acoustic = true }
      if (field.value == "jazz") { jazz = true }
      if (field.value == "electronic") { electronic = true }
      if (field.value == "nature") { nature = true }

            //Morning Piano
      if ((morning == true) && (piano == true)) {
        //$( "span" ).text( "Match ☕🎹 Morning Piano" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/4uKuvvMIp02dkJySji7Add?si=LH6ZFLXXRLCr4mwT8ctfRQ" target="_blank">☕🎹</a>');
        return;
      }

      //Morning Lofi
      if ((morning == true) && (lofi == true)) {
        //$( "span" ).text( "Match Morning Lofi" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/4vFrDonS8GZop4WenI9xf2?si=AVaAJ5VmSr2LKXFbUqwRJg" target="_blank">☕🎛️</a>');
        return;
      }

      //Morning Classical
      if ((morning == true) && (classic == true)) {
        //$( "span" ).text( "Match Morning Classical" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/5nJ0JPYiA6ArTbRd8QRqbW?si=RoxGcSb1QLeKA4UdJqAecg" target="_blank">☕🎼</a>');
        return;
      }

      //Morning Acoustic
      if ((morning == true) && (acoustic == true)) {
        //$( "span" ).text( "Match Morning Acoustic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/24M61a0YyLiqnKPisC9XTa?si=zP36n7BpRn2f9T-Mz4_72g" target="_blank">☕🎵</a>');
        return;
      }

      //Morning Jazz
      if ((morning == true) && (jazz == true)) {
        //$( "span" ).text( "Match Morning Jazz" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/19kt9zTTngQyErMQ7mGb5O?si=LFSCfNI9TlqzN8PChcuu9g" target="_blank">☕🎷</a>');
        return;
      }

      //Morning Electronic
      if ((morning == true) && (electronic == true)) {
        //$( "span" ).text( "Match Morning Electronic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/0MZcueIpEnbgl7CFQh04my?si=OhGJ57NxQU6hYb2RE2co1A" target="_blank">☕🎚️</a>');
        return;
      }

      //Morning Nature
      if ((morning == true) && (nature == true)) {
        //$( "span" ).text( "Match Morning Nature" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/7ljmzKm7siQSKF5xDhxrMQ?si=Zq59cp78SgGe9ZPmWwKb8Q" target="_blank">☕🍃</a>');
        return;
      }
      //evening Piano
      if ((evening == true) && (piano == true)) {
        //$( "span" ).text( "Match ☕🎹 evening Piano" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/4sjMQVuhQBgDuv1ORKCQE0?si=kZ4p9POyQ-a_Mh9WdE8WDw" target="_blank">🌆🎹</a>');
        return;
      }

      //evening Lofi
      if ((evening == true) && (lofi == true)) {
        //$( "span" ).text( "Match evening Lofi" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/2dPR6WDlNXGuGQSI8pz2Ro?si=bdDBgCjLRrCPfPkv9OKyyA" target="_blank">🌆🎛️</a>');
        return;
      }

      //evening Classical
      if ((evening == true) && (classic == true)) {
        //$( "span" ).text( "Match evening Classical" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/75Wqs0JumMbH2LC3iC1RHJ?si=JrfesioHTWy9PP3NWtuHUQ" target="_blank">🌆🎼</a>');
        return;
      }

      //evening Acoustic
      if ((evening == true) && (acoustic == true)) {
        //$( "span" ).text( "Match evening Acoustic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/6T5yjTG9miqPUUcSdSKdUW?si=S_1ZtQijSL62sL8YZ0Sj-g" target="_blank">🌆🎵</a>');
        return;
      }

      //evening Jazz
      if ((evening == true) && (jazz == true)) {
        //$( "span" ).text( "Match evening Jazz" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/2aAYyH5Ry9AKDR1jdkxrwa?si=_CRyG5uASiqm1pc6QhasIg" target="_blank">🌆🎷</a>');
        return;
      }

      //evening Electronic
      if ((evening == true) && (electronic == true)) {
        //$( "span" ).text( "Match evening Electronic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/3P7XRYHw9B7c4Fk88gtO0D?si=y9honWzJTAO8_ChLiN-ylg" target="_blank">🌆🎚️</a>');
        return;
      }

      //evening Nature
      if ((evening == true) && (nature == true)) {
        //$( "span" ).text( "Match evening Nature" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/2gD7o0nDrIfg4ygFMRlFoL?si=BVht3_CLQnakQjDwaIW-OQ" target="_blank">🌆🍃</a>');
        return;
      }

      //sleep Piano
      if ((sleep == true) && (piano == true)) {
        //$( "span" ).text( "Match ☕🎹 sleep Piano" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/0qL8FFKv7EzKqJi9XeFROb?si=TNKiqL9lRBW-772tBfQCgA" target="_blank">💤🎹</a>');
        return;
      }

      //sleep noise
      if ((sleep == true) && (noise == true)) {
        //$( "span" ).text( "Match sleep noise" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/6PgjFCYoZPQZMpKMBZlyx5?si=N8Dv6ZQVQEGNnTMDkte_cQ" target="_blank">💤⬜</a>');
        return;
      }

      //sleep Classical
      if ((sleep == true) && (classic == true)) {
        //$( "span" ).text( "Match sleep Classical" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/6SPT0xLAvGhPomqilJVvE9?si=9GgplFNwTd-a-SaiH0DL9w" target="_blank">💤🎼</a>');
        return;
      }

      //sleep Acoustic
      if ((sleep == true) && (acoustic == true)) {
        //$( "span" ).text( "Match sleep Acoustic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/22PGBkwN821RPJyWGEjf2D?si=NbuYojehRl27kcjnqSXS7A" target="_blank">💤🎵</a>');
        return;
      }

      //sleep Jazz
      if ((sleep == true) && (jazz == true)) {
        //$( "span" ).text( "Match sleep Jazz" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/0MYJYuXxmEXKijFK2KtME3?si=k7IZ0a48T6CJR-lwdAoXWQ" target="_blank">💤🎷</a>');
        return;
      }

      //sleep Electronic
      if ((sleep == true) && (electronic == true)) {
        //$( "span" ).text( "Match sleep Electronic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/789DBgO0aJm2Fvrxv1QetN?si=kLq5HkNAT-C11uO8XvQ5vQ" target="_blank">💤🎚️</a>');
        return;
      }

      //sleep Nature
      if ((sleep == true) && (nature == true)) {
        //$( "span" ).text( "Match sleep Nature" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/7g4a30e5k3TXpHCq8T1CXa?si=8YKi82jqTDiX5CR-gVxAXw" target="_blank">💤🍃</a>');
        return;
      }

      //focus Piano
      if ((focus == true) && (piano == true)) {
        //$( "span" ).text( "Match ☕🎹 focus Piano" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/6FGWDti2QLIZBrOe71Uhi5?si=E5DqezJwSJezfjIJjsEQxA" target="_blank">⚙️🎹</a>');
        return;
      }

      //focus Lofi
      if ((focus == true) && (lofi == true)) {
        //$( "span" ).text( "Match focus Lofi" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/4qxwiQjhdc5sl5wlUJaAVO?si=WkE99M4LQ4W4Kou5Bur6aQ" target="_blank">⚙️🎛️</a>');
        return;
      }

      //focus noise
      if ((focus == true) && (noise == true)) {
        //$( "span" ).text( "Match focus noise" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/1yn8hdB7jOZ6iFRp27NetD?si=WCKWAM2SQ9ixdHr02l80bA" target="_blank">⚙️⬜</a>');
        return;
      }

      //focus Classical
      if ((focus == true) && (classic == true)) {
        //$( "span" ).text( "Match focus Classical" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/7j1OEbOgLc5t9JyKO44Drs?si=qd-S_K4CSril83ManfL2CQ" target="_blank">⚙️🎼</a>');
        return;
      }

      //focus Acoustic
      if ((focus == true) && (acoustic == true)) {
        //$( "span" ).text( "Match focus Acoustic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/6Vq29HxIYglzjzv7hrKLIk?si=5OtgqQp6TkuQC-_83I-SHQ" target="_blank">⚙️🎵</a>');
        return;
      }

      //focus Jazz
      if ((focus == true) && (jazz == true)) {
        //$( "span" ).text( "Match focus Jazz" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/4zUQl020wtbJddIa9q1EOe?si=XAQXXFJhSe2mwkwF2JiVnA" target="_blank">⚙️🎷</a>');
        return;
      }

      //focus Electronic
      if ((focus == true) && (electronic == true)) {
        //$( "span" ).text( "Match focus Electronic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/3N01SL7HiBRk2yxgINK62z?si=3ct-JJQpRbyequ9fJ7FwJw" target="_blank">⚙️🎚️</a>');
        return;
      }
      //relax Piano
      if ((relax == true) && (piano == true)) {
        //$( "span" ).text( "Match ☕🎹 relax Piano" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/1uYHZcGvHRpQvmZgKVxJPv?si=w0TQam4DRqSc5zVtx-c9RA" target="_blank">🕯️🎹</a>');
        return;
      }

      //relax Lofi
      if ((relax == true) && (lofi == true)) {
        //$( "span" ).text( "Match relax Lofi" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/0hjElzknFVtdwWmgciGgSt?si=YAtUJM8KSS2mnV76_a3m-A" target="_blank">🕯️🎛️</a>');
        return;
      }

      //relax Classical
      if ((relax == true) && (classic == true)) {
        //$( "span" ).text( "Match relax Classical" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/0Qx1UAHKQBmzgqlbbSB043?si=xpYBZDqrTrSYRYUPLK6eSg" target="_blank">🕯️🎼</a>');
        return;
      }

      //relax Acoustic
      if ((relax == true) && (acoustic == true)) {
        //$( "span" ).text( "Match relax Acoustic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/5mE3qfnuetseWf1dCj21PF?si=VRFqbv33RMGg2FzhXlw4EA" target="_blank">🕯️🎵</a>');
        return;
      }

      //relax Jazz
      if ((relax == true) && (jazz == true)) {
        //$( "span" ).text( "Match relax Jazz" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/6MVnNmLrUBCoJ68R7AOj2N?si=gRzP5QNtT0ykQnGuqJCHOA" target="_blank">🕯️🎷</a>');
        return;
      }

      //relax Electronic
      if ((relax == true) && (electronic == true)) {
        //$( "span" ).text( "Match relax Electronic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/0x4XvzgNNLiTZQ7W2lncBk?si=1Jpl5VTTQtiIrCVjtpcEqw" target="_blank">🕯️🎚️</a>');
        return;
      }

      //relax Nature
      if ((relax == true) && (nature == true)) {
        //$( "span" ).text( "Match relax Nature" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/1XgWwvsFOMy60UQP93c6RO?si=vN-rCOPGSsaT9jcCrH7fBQ" target="_blank">🕯️🍃</a>');
        return;
      }

      //cooking Piano
      if ((cooking == true) && (piano == true)) {
        //$( "span" ).text( "Match ☕🎹 cooking Piano" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/6fM8K7HaLr3c6wy4a4rzBX?si=DMo29ypRT--MMQ4K3F4WOQ" target="_blank">👩‍🍳🎹</a>');
        return;
      }

      //cooking Lofi
      if ((cooking == true) && (lofi == true)) {
        //$( "span" ).text( "Match cooking Lofi" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/5BMiqIJKwuMKnlItTphaaL?si=rtnNloCOS-2EuRmIS6wJQg" target="_blank">"👩‍🍳🎛️</a>');
        return;
      }

      //cooking Classical
      if ((cooking == true) && (classic == true)) {
        //$( "span" ).text( "Match cooking Classical" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/5qq7akiiqd6UAaFfxBXj4F?si=lHITDW-FS3qVq7avL-R5oQ" target="_blank">👩‍🍳🎼</a>');
        return;
      }

      //cooking Acoustic
      if ((cooking == true) && (acoustic == true)) {
        //$( "span" ).text( "Match cooking Acoustic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/0Ew4yuXL6ZLUzRnHGDX34B?si=UDc_-dFRRAmFcG4FDUdqKA" target="_blank">👩‍🍳🎵</a>');
        return;
      }

      //cooking Jazz
      if ((cooking == true) && (jazz == true)) {
        //$( "span" ).text( "Match cooking Jazz" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/0qeQG3PRn6A66cmPP8mRHi?si=EM2JAJn1SQOK_Ww9Ttsedg" target="_blank">👩‍🍳🎷</a>');
        return;
      }

      //cooking Electronic
      if ((cooking == true) && (electronic == true)) {
        //$( "span" ).text( "Match cooking Electronic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/3oDm3tPsWSkYYpx8VwYhF5?si=bNmTHYDjSai_EBWVf2xqiA" target="_blank">👩‍🍳🎚️</a>');
        return;
      }
      //meditate Piano
      if ((meditate == true) && (piano == true)) {
        //$( "span" ).text( "Match ☕🎹 meditate Piano" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/7G1QDdawSJh7MGnzjYKoJv?si=84VV8skZRPWcJyhuv_MrVA" target="_blank">☮️🎹</a>');
        return;
      }

      //meditate Lofi
      if ((meditate == true) && (lofi == true)) {
        //$( "span" ).text( "Match meditate Lofi" ).show();
        $('#link').html('<a href="" target="_blank">☮️🎛️</a>');
        return;
      }

      //meditate noise
      if ((meditate == true) && (noise == true)) {
        //$( "span" ).text( "Match meditate noise" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/4Az5HG3PB97VXQiOue9JlW?si=AnSm3g8XR2-X21iDzXwR2Q" target="_blank">☮️⬜</a>');
        return;
      }

      //meditate Classical
      if ((meditate == true) && (classic == true)) {
        //$( "span" ).text( "Match meditate Classical" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/7dKgBG7Q0jwhVwDCIpqape?si=lNGChPNaQC2jlIQpvFrN9Q" target="_blank">☮️🎼</a>');
        return;
      }

      //meditate Acoustic
      if ((meditate == true) && (acoustic == true)) {
        //$( "span" ).text( "Match meditate Acoustic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/3oWLvrgBKmsoBJIehwNOJ7?si=a04YjBTVRG-L0BXWFMv_1g" target="_blank">☮️🎵</a>');
        return;
      }

      //meditate Jazz
      if ((meditate == true) && (jazz == true)) {
        //$( "span" ).text( "Match meditate Jazz" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/4COa3cD7fi2z1ncPLkNXmz?si=2wgoRue0Sw2cVjnQgLKREg" target="_blank">☮️🎷</a>');
        return;
      }

      //meditate Electronic
      if ((meditate == true) && (electronic == true)) {
        //$( "span" ).text( "Match meditate Electronic" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/1ZI70EGWfGYHol3ytKed1b?si=Vv1B-sKRRbWQTqK-chh64g" target="_blank">☮️🎚️</a>');
        return;
      }

      //meditate Nature
      if ((meditate == true) && (nature == true)) {
        //$( "span" ).text( "Match meditate Nature" ).show();
        $('#link').html('<a href="https://open.spotify.com/playlist/2x9Qc9Ttt25xuoGpFpIMtq?si=c0gtJsu0TD2s_NVnCLwkNw" target="_blank">☮️🍃</a>');
        return;
      }
      else  { $('#link').text( "❓❓" ).show(); }
  //event.preventDefault();
    });
})

  .trigger( "change" );

  // Our array of words
 const moment = [ "mood", "mind", "activity", "experience", "moment" ];

  (function ($) {
    count = 0;
    setInterval(function () {
      $("#moment").fadeOut(600, function () {
        $(this).text(moment[count % moment.length]).fadeIn(600);
      });
      count++;
    }, 2500);
})(jQuery);
