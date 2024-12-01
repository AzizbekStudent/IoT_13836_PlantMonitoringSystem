### Project Information:
- **Project Name**: Plant Monitoring System
- **Student ID**: 00013836
- **Module Name**: Internet of Things (IoT)

### Project Description:
This is the webpage for monitoring data that was received from sensors.
Sensors send the data to Arduino Uno, which collects set of information from 5 sensors and sends it to ESP8266 Wi-Fi module.
Then ESP8266 Wi-Fi module sends data to Firebase realtime database through this link "https://iot-cw-251df-default-rtdb.firebaseio.com/"
Then this webpage gets that data and visualiaze it to the end-user

### Features:
- **Real time data access
- **Remote control of actuator such as buzzer and smd rgb

### Technologies Used:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Real-time Database)
- **Libraries**: 
  - [Chart.js](https://www.chartjs.org/) for linegraph
  - Firebase SDK for real-time data management

### Setup Instructions:
1. **Clone this repository** to your local machine:
    ```bash
    git clone https://github.com/yourusername/plant-monitoring-system.git
    ```
2. **Open the project folder** and navigate to the `index.html` file.
3. **Configure Firebase**:
    - Go to Firebase Console and create a project. (Optional)
    - Replace the `firebaseConfig` values with your Firebase project credentials in the code. but better to use already included one to avoid issues

4. **Open the `index.html` file** in any browser. (Opera, Chrome, Mozilla and etc.)

### How to Use:
- **View Sensor Data**: The live data for temperature, humidity, water level, flame, and plant height.
- **Control Buzzer**: Click the "Buzzer" button to turn it on/off.
- **Change Flame Status**: Toggle the flame detection status with the "Change Flame Status" button. (This feature is created for just in case situation, cause there is problem with interval of ESP8266 Wi-Fi module to send data to Firebase and it is sometimes lagging)
- **Adjust RGB Color**: Use the sliders to set the RGB values for color control.

