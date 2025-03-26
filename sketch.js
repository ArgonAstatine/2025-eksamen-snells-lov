let angleSlider;
let n1 = 1.0; // Refractive index of air
let n2 = 1.51; // Default to window glass
let canvasWidth = 1920;
let canvasHeight = 1080;
let materialSelect1, materialSelect2;

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
    
    // Opret en skyder til at justere indfaldsvinklen
    angleSlider = createSlider(0, 90, 30, 1);
    angleSlider.position(20, 20);
    angleSlider.style('width', '200px');
    
    // Dropdown menu for at vælge materiale til n1
    materialSelect1 = createSelect();
    materialSelect1.position(20, 50);
    for (let mat in materials) {
        materialSelect1.option(mat);
    }
    materialSelect1.selected("Luft");
    
    // Dropdown menu for at vælge materiale til n2
    materialSelect2 = createSelect();
    materialSelect2.position(20, 80);
    for (let mat in materials) {
        materialSelect2.option(mat);
    }
    materialSelect2.selected("Rudeglas");
}

function draw() {
    background(220);
    
    let incidentAngle = angleSlider.value();
    n1 = materials[materialSelect1.value()];
    n2 = materials[materialSelect2.value()];
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
    text(`Indfaldsvinkel: ${incidentAngle.toFixed(1)}°`, 20, 120);
    text(`Brydningsvinkel: ${isNaN(refractedAngle) ? 'Total refleksion' : refractedAngle.toFixed(1) + '°'}`, 20, 150);
    text(`Materiale 1: ${materialSelect1.value()} (n1 = ${n1.toFixed(2)})`, 20, 180);
    text(`Materiale 2: ${materialSelect2.value()} (n2 = ${n2.toFixed(2)})`, 20, 210);
}

function drawLightRays(incidentAngle, refractedAngle) {
    let centerX = width / 2;
    let centerY = height / 2;
    let rayLength = 300;
    
    // Indkommende lysstråle
    let incidentX = centerX - rayLength * cos(incidentAngle);
    let incidentY = centerY - rayLength * sin(incidentAngle);
    stroke(255, 0, 0);
    strokeWeight(3);
    line(incidentX, incidentY, centerX, centerY);
    
    // Brydnings- eller reflekteret stråle
    if (!isNaN(refractedAngle)) {
        let refractedX = centerX + rayLength * cos(refractedAngle);
        let refractedY = centerY + rayLength * sin(refractedAngle);
        stroke(0, 0, 255);
        line(centerX, centerY, refractedX, refractedY);
    } else {
        // Total refleksion
        let reflectedX = centerX - rayLength * cos(incidentAngle);
        let reflectedY = centerY + rayLength * sin(incidentAngle);
        stroke(255, 165, 0);
        line(centerX, centerY, reflectedX, reflectedY);
    }
}