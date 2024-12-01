// Student ID: 00013836
const firebaseConfig = {
    apiKey: "AIzaSyCSahPxmZBaKzWGzhTx4mNr8XPu8nBuCc8",
    authDomain: "iot-cw-251df.firebaseapp.com",
    databaseURL: "https://iot-cw-251df-default-rtdb.firebaseio.com",
    projectId: "iot-cw-251df",
    storageBucket: "iot-cw-251df.firebasestorage.app",
    messagingSenderId: "488232361280",
    appId: "1:488232361280:web:9618cc302654435a76aea5",
    measurementId: "G-MV37X2TTRH"
  };


firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var Ref_temperature = database.ref('Temperature');
var Ref_humidity = database.ref('Humidity');
var Ref_Height = database.ref('Height');
var Ref_Flame = database.ref('Flame');
var Ref_Water = database.ref('Water');
var Ref_Red = database.ref('color/Red');
var Ref_Green = database.ref('color/Green');
var Ref_Blue = database.ref('color/Blue');


// Global variables
var TemperatureVal = 0;
var HumidityVal = 0;
var FlameVal = 0;
var HeightVal =0;
var WaterVal = 0;


 
Ref_humidity.on('value', function(getdata1){
    var humidity = getdata1.val();
    document.getElementById('humidity').innerHTML = "Humidity: " + humidity + "%";

    var RoundFill = document.getElementById('RoundFill_Radius');
    var FilledPercentage = document.getElementById('RoundFill_Percentage');

    RoundFill.style.setProperty('--fill-percent', humidity + '%');
    FilledPercentage.textContent = humidity + "%";

    HumidityVal = humidity;
    updateChart();
})

Ref_temperature.on('value', function(getdata2){
    var temp = getdata2.val();
    document.getElementById('temperature').innerHTML ="Temperature: " + temp + "&#8451;";

    var minTemp = 0; 
    var maxTemp = 50; 
    var heightPercentage = Math.max(0, Math.min(100, ((temp - minTemp) / (maxTemp - minTemp)) * 100));

    document.getElementById('temperatureLevel').style.height = heightPercentage + "%";
    TemperatureVal = temp;
    updateChart();
})

Ref_Height.on('value', function(getdata3){
    var height = getdata3.val();
    document.getElementById('height').innerHTML ="Height: " + height + " sm";


    var heightFill = document.getElementById('height_Fill');
    var maxPlantHeight = 20; 
    var fillPercentage = Math.min(100, (height / maxPlantHeight) * 100);
    heightFill.style.height = fillPercentage + "%";
    HeightVal = height;
    updateChart();
})

Ref_Flame.on('value', function(getdata4){
    var flame = getdata4.val();
    var flameVisual = document.getElementById('flameIcon');

    if(flame == 1){
        document.getElementById('flame').innerHTML ="Fire status: " + "There is fire";
        flameVisual.style.display = "block"; 
    }
    else{
        document.getElementById('flame').innerHTML ="Fire status: " + "Everything is ok";
        flameVisual.style.display = "none"; 
    }
    FlameVal = flame;
    updateChart();
})

Ref_Water.on('value', function(getdata5){
    var water = getdata5.val();
    document.getElementById('water').innerHTML = "water value is: " + water;

    WaterVal = water;
    updateChart();

    var waterStatus = document.getElementById('water_Fill');

    var fillPercentage = Math.min(100, (water / 700) * 100);
    waterStatus.style.width = fillPercentage + "%";

    if (water > 0 && water <= 100) {
        waterStatus.innerHTML = "Need to water";
        waterStatus.style.color = "#ffffff";
        waterStatus.style.backgroundColor = "#ff0000"; 
    } else if (water > 100 && water <= 300) {
        waterStatus.innerHTML = "somehow good";
        waterStatus.style.color = "#ffffff";
        waterStatus.style.backgroundColor = "#ffa500"; 
    } else if (water > 300 && water <= 700) {
        waterStatus.innerHTML = "Water status: Water level is enough in soil";
        waterStatus.style.color = "#ffffff";
        waterStatus.style.backgroundColor = "#00ff00"; 
    } else {
        waterStatus.innerHTML = "Water status: Value out of range";
        waterStatus.style.backgroundColor = "#e0e0e0"; 
    }
    
})

var index=0;
var btn=document.getElementById("buzzer");

function press() {
    index++;
    if (index%2==1) {
        database.ref('BuzzerStatus').set(1);
        document.getElementById('buzzer').innerHTML="Buzzer Acive";
        document.getElementById('buzzer').style.backgroundColor = `rgb(0,255,0)`;
    }
    else {
    database.ref('BuzzerStatus').set(0);
    document.getElementById('buzzer').innerHTML="Buzzer turned off";
    document.getElementById('buzzer').style.backgroundColor = `rgb(255,0,0)`;
    }
}

function setRGBValues() {
    var red = document.getElementById("red").value;
    var green = document.getElementById("green").value;
    var blue = document.getElementById("blue").value;

    red = Math.min(255, Math.max(0, red));    
    green = Math.min(255, Math.max(0, green));
    blue = Math.min(255, Math.max(0, blue));

    database.ref('color/Red').set(red);
    database.ref('color/Green').set(green);
    database.ref('color/Blue').set(blue);

    document.getElementById('ColorPreviewCube').style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}


function pressFlame(){
    index++;
    if(index%2 == 1){
        database.ref('Flame').set(1);
        document.getElementById('flameBtn').style.backgroundColor = 'rgb(255,0,0)';
    }
    else{
        database.ref('Flame').set(0);
        document.getElementById('flameBtn').style.backgroundColor = 'rgb(0,255,255)';
    }
}


// Displaying charts
const ctx = document.getElementById('dataChart').getContext('2d');
const dataChart = new Chart(ctx, {
    type: 'line',  
    data: {
        labels: ['Temperature', 'Humidity', 'Water', 'Flame', 'Height'], 
        datasets: [{
            label: 'Sensor Data from FireBase',
            data: [TemperatureVal, HumidityVal, WaterVal, FlameVal, HeightVal], 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
      
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


function updateChart() {
    dataChart.data.datasets[0].data = [TemperatureVal, HumidityVal, WaterVal, FlameVal, HeightVal];
    dataChart.update();
}