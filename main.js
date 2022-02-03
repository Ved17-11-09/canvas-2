function preload() {
     classifier = ml5.imageClassifier('DoodleNet') ;
}

function draw() {
    strokeWeight(10) ;
    stroke(0) ;
    if (mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY) ;
    }
}

function setup() {
    Canvas = createCanvas(300,300) ;
    Canvas.center() ;
    background("white") ;
    Canvas.mouseReleased(classifyCanvas) ;
    synth = window.speechSynthesis ;
}

function clearCanvas() {
    background("white") ;
}

function classifyCanvas() {
    classifier.classify(Canvas, gotResults) ;
}

function gotResults(error,result) {
    if (error) {
        console.error(error) ;
    }
    else {
        console.log(result) ;
        document.getElementById("label1").innerHTML = result[0].label ;
        document.getElementById("confidence1").innerHTML = Math.round(result[0].confidence * 100) + "%" ;

        utterthis = new SpeechSynthesisUtterance(result[0].label) ;
        synth.speak(utterthis) ;

    }
}