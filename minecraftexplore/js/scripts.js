function phraseChange(){

var rText = ["We <3 blocks",
              "Sssssss...",
              "Dinnerbone is a babe"];
        var randNo = Math.floor(rText.length*Math.random());
        
        var ytt = document.getElementById('yellowtextthing');

        ytt.innerHTML = rText[randNo];
}