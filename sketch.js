let angleSlider;
let customN1Slider, customN2Slider;
let n1 = 1.0;
let n2 = 1.51;
let canvasWidth = 1920;
let canvasHeight = 1080;
let materialSelect1, materialSelect2;
let customN1 = false, customN2 = false;

let materials = {
    "Luft": 1.00,
    "Rudeglas": 1.51,
    "Laboratorieglas": 1.47,
    "Plexiglas": 1.49,
    "Vand": 1.33,
    "Sprit": 1.36,
    "Glycerol": 1.47
};

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    angleMode(DEGREES);
    
    angleSlider = createSlider(0, 90, 30, 1);
    angleSlider.position(20, 20);
    angleSlider.style('width', '200px');
    
    materialSelect1 = createSelect();
    materialSelect1.position(20, 50);
    for (let mat in materials) {
        materialSelect1.option(mat);
    }
    materialSelect1.selected("Luft");
    materialSelect1.changed(() => customN1 = false);
    
    materialSelect2 = createSelect();
    materialSelect2.position(20, 80);
    for (let mat in materials) {
        materialSelect2.option(mat);
    }
    materialSelect2.selected("Rudeglas");
    materialSelect2.changed(() => customN2 = false);
    
    customN1Slider = createSlider(1.0, 10.0, 1.0, 0.01);
    customN1Slider.position(20, 110);
    customN1Slider.input(() => customN1 = true);
    
    customN2Slider = createSlider(1.0, 10.0, 1.51, 0.01);
    customN2Slider.position(20, 140);
    customN2Slider.input(() => customN2 = true);
}

function draw() {
    background(220);
    
    let incidentAngle = angleSlider.value();
    if (customN1) {
        n1 = customN1Slider.value();
    } else {
        n1 = materials[materialSelect1.value()];
    }
    
    if (customN2) {
        n2 = customN2Slider.value();
    } else {
        n2 = materials[materialSelect2.value()];
    }
    
    let refractedAngle = asin((n1 / n2) * sin(incidentAngle));
    
    drawInterface(incidentAngle, refractedAngle);
    drawLightRays(incidentAngle, refractedAngle);
}

function drawInterface(incidentAngle, refractedAngle) {
    stroke(0);
    strokeWeight(2);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    
    fill(0);
    textSize(24);
    text(`Indfaldsvinkel: ${incidentAngle.toFixed(1)}°`, 20, 180);
    text(`Brydningsvinkel: ${isNaN(refractedAngle) ? 'Totalrefleksion' : refractedAngle.toFixed(1) + '°'}`, 20, 210);
    text(`Materiale 1: ${customN1 ? "Custom" : materialSelect1.value()} (n1 = ${n1.toFixed(2)})`, 20, 240);
    text(`Materiale 2: ${customN2 ? "Custom" : materialSelect2.value()} (n2 = ${n2.toFixed(2)})`, 20, 270);
}

function drawLightRays(incidentAngle, refractedAngle) {
    let centerX = width / 2;
    let centerY = height / 2;
    let rayLength = 300;
    
    let incidentX = centerX - rayLength * cos(incidentAngle);
    let incidentY = centerY - rayLength * sin(incidentAngle);
    stroke(255, 0, 0);
    strokeWeight(3);
    line(incidentX, incidentY, centerX, centerY);
    
    if (!isNaN(refractedAngle)) {
        let refractedX = centerX + rayLength * cos(refractedAngle);
        let refractedY = centerY + rayLength * sin(refractedAngle);
        stroke(0, 0, 255);
        line(centerX, centerY, refractedX, refractedY);
    } else {
        let reflectedX = centerX + rayLength * cos(incidentAngle);
        let reflectedY = centerY - rayLength * sin(incidentAngle);
        stroke(255, 165, 0);
        line(centerX, centerY, reflectedX, reflectedY);
    }
}