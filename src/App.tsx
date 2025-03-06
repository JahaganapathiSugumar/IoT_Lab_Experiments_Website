import React, { useState, useEffect } from 'react';
import { Code, Car, Camera, TrafficCone, Waves, Globe, Calculator, Terminal, FileCode, Server, Cpu } from 'lucide-react';


const ExperimentCard = ({ title, code, image, video, icon: Icon, delay }) => {
  const [showCode, setShowCode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`group bg-white rounded-xl shadow-lg overflow-hidden mb-8 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="relative">
        {image && (
          <div className="h-48 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        )}
        {Icon && (
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-3 rounded-full shadow-lg transform transition-transform duration-300 group-hover:rotate-12">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-3 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">IoT Lab</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        
        {video && (
          <div className="mb-6 rounded-lg overflow-hidden shadow-md">
            <iframe 
              width="100%" 
              height="315" 
              src={video}
              title={`${title} Demo`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        )}

        <div className="space-y-4">
          {code && (
            <button
              onClick={() => setShowCode(!showCode)}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center space-x-2 font-medium transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Code className="w-5 h-5" />
              <span>{showCode ? "Hide Code" : "View Code"}</span>
            </button>
          )}
          
          {showCode && code && (
            <div className="mt-4 space-y-3 animate-fadeIn">
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm leading-relaxed">
                  <code>{code}</code>
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    // Could add toast notification here
                  }}
                  className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium opacity-90 hover:opacity-100 transform hover:scale-105 active:scale-95"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


function VisitorCounter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Simulate fetching visitor count from localStorage
    const storedCount = localStorage.getItem('visitorCount');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
    
    // Increment count for this visit
    const newCount = initialCount + 1;
    setCount(newCount);
    localStorage.setItem('visitorCount', newCount.toString());
  }, []);
  
  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center space-x-2">
      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      <span className="font-medium">{count} Visitors</span>
    </div>
  );
}

function ReferenceNote() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-8 mx-auto max-w-7xl">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>The experiments and code snippets provided here are for reference purposes only. They may not exactly match the demonstrations in the videos. Pin configurations and specific implementations might vary based on your hardware setup and requirements.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const experiments = [
    {
      title: "Smart Parking System",
      icon: Car,
      image: "https://media.istockphoto.com/id/951751478/vector/isometric-parking-assist-system-vector-illustration-car-technology-with-sensors-sensors.jpg?s=2048x2048&w=is&k=20&c=x7gGPoMdYPriR5vZUK9WFePnOg1bUwj6HpbVN8gE5Es=",
      video: "https://www.youtube.com/embed/jTCXP3qENm4",
      code: `import RPi.GPIO as GPIO
import time
import requests
import smtplib
from email.mime.text import MIMEText

GPIO.setmode(GPIO.BCM)

TRIG = 17
ECHO = 27
LED_RED = 23
LED_GREEN = 22

GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)
GPIO.setup(LED_GREEN, GPIO.OUT)
GPIO.setup(LED_RED, GPIO.OUT)

api = "Api_key"
URL = "https://api.thingspeak.com/update"

smtp_server = "smtp.gmail.com"
port = 587
email = "Your_Email"
password = "Password(Key)"
receiver = "receiver_Email"
sent = False

def send():
    global sent
    if not sent:
        try:
            subject = "for checking"
            body = "Parking slot is occupied"
            msg = MIMEText(body)
            msg["Subject"] = subject
            msg["From"] = email
            msg["To"] = receiver

            server = smtplib.SMTP(smtp_server, port)
            server.starttls()
            server.login(email, password)
            server.sendmail(email, receiver, msg.as_string())
            server.quit()

            print("Email sent successfully")
            sent = True
        except Exception as e:
            print(e)

def measure():
    GPIO.output(TRIG, GPIO.LOW)
    time.sleep(0.1)
    GPIO.output(TRIG, GPIO.HIGH)
    time.sleep(0.00001)
    GPIO.output(TRIG, GPIO.LOW)

    while GPIO.input(ECHO) == GPIO.LOW:
        pulse_start = time.time()

    while GPIO.input(ECHO) == GPIO.HIGH:
        pulse_end = time.time()

    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17150
    return distance

def sendToThingSpeak(distance):
    payload = {"api_key": api, "field1": distance}
    try:
        response = requests.post(URL, data=payload)
        if response.status_code == 200:
            print("Data sent successfully")
        else:
            print(response.status_code)
    except Exception as e:
        print(e)

try:
    while True:
        distance = measure()
        print(distance)

        if distance < 100:
            GPIO.output(LED_RED, GPIO.HIGH)
            GPIO.output(LED_GREEN, GPIO.LOW)
            send()
            print("Parking space occupied")
        else:
            GPIO.output(LED_GREEN, GPIO.HIGH)
            GPIO.output(LED_RED, GPIO.LOW)
            print("Parking space available")

        sendToThingSpeak(distance)
        time.sleep(1)
except KeyboardInterrupt:
    GPIO.cleanup()`
    },
    {
      title: "Pi Cam",
      icon: Camera,
      image: "https://media.istockphoto.com/id/1436912460/photo/of-electrical-engineering-programming-microcomputers-raspberry-pi-4b-w-heatsink-nvidia-jetson.jpg?s=2048x2048&w=is&k=20&c=GMtk3jbSOTYMv36O-DF2l8vk8E_7-j5BB3BHkdfnFBE=",
      video: "https://www.youtube.com/embed/4juRS43VmRQ",
      code: `from subprocess import call
import time
import os
import glob
import smtplib
import base64
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
import subprocess

gmail_user = "Your_Email"
gmail_pwd = "Your_Email_Password"
FROM = "from_mail"
TO = ["to_mail"]
i = 1

while i:
    subprocess.Popen("raspistill -o cam4.jpg", shell=True)
    time.sleep(5)
    msg = MIMEMultipart()
    time.sleep(1)
    msg['Subject'] = "testing msg sent from python"
    time.sleep(5)
    fp = open("cam4.jpg", "rb")
    time.sleep(1)
    img = MIMEImage(fp.read())
    fp.close()
    time.sleep(1)
    msg.attach(img)
    time.sleep(1)

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        print("smtp gmail")
        server.ehlo()
        server.starttls()
        server.login(gmail_user, gmail_pwd)
        print("sending mail from python")
        server.sendmail(FROM, TO, msg.as_string())
        server.close()
        print("successfully sent the mail")
    except:
        print("failed to send mail")`
    },
    {
      title: "Traffic Light With Raspberry Pi",
      icon: TrafficCone,
      image: "https://media.istockphoto.com/id/1436912460/photo/of-electrical-engineering-programming-microcomputers-raspberry-pi-4b-w-heatsink-nvidia-jetson.jpg?s=2048x2048&w=is&k=20&c=GMtk3jbSOTYMv36O-DF2l8vk8E_7-j5BB3BHkdfnFBE=",
      video: "https://www.youtube.com/embed/ad0nMEHoah0",
      code: `import RPi.GPIO as GPIO
from time import sleep

# Suppress warnings
GPIO.setwarnings(False)

# Set GPIO mode to BOARD (physical pin numbering)
GPIO.setmode(GPIO.BOARD)

# Define pin numbers
pins = [3, 5, 11]

# Set up GPIO pins as output
for pin in pins:
    GPIO.setup(pin, GPIO.OUT)

try:
    while True:
        for pin in pins:
            GPIO.output(pin, GPIO.HIGH)
            sleep(2)
            GPIO.output(pin, GPIO.LOW)
            sleep(1)
except KeyboardInterrupt:
    print("Exiting gracefully...")

finally:
    # Cleanup GPIO settings before exiting
    GPIO.cleanup()`
    },
    {
      title: "S3 BUCKET CREATION",
      icon: Calculator,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
      video: "https://www.youtube.com/embed/iCv46OlYDpM"
    },
    {
      title: "EC2 INSTANCE CREATION",
      icon: Calculator,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
      video: "https://www.youtube.com/embed/V08HDQLyPYA",
    },
    {
      title: "Ultrasonic with Thinkspeak",
      icon: Globe,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      video: "https://www.youtube.com/embed/SRmb_q97VS4"
    },
    {
      title: "Ultrasonic with Thinkspeak (Write)",
      icon: Waves,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
      code: `import time
import urllib.request
import RPi.GPIO as GPIO

trig = 2
echo = 4
Thing = "https://api.thingspeak.com/update?api_key=Your_Api_Key"

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(trig, GPIO.OUT)
GPIO.setup(echo, GPIO.IN)

def read_distance():
    GPIO.output(trig, True)
    time.sleep(1)
    GPIO.output(trig, False)
    pulse_st = time.time()
    while GPIO.input(echo) == 0:
        pulse_st = time.time()
    pulse_end = time.time()
    while GPIO.input(echo) == 1:
        pulse_end = time.time()
    pulse_dur = pulse_end - pulse_st
    distance = pulse_dur * 17150
    distance = round(distance, 2)
    return distance

while True:
    distance = read_distance()
    print(distance)
    url = Thing + '&field1={:.2f}'.format(distance)
    urllib.request.urlopen(url)
    time.sleep(1)`
    },
    {
      title: "Ultrasonic with Thinkspeak (Read)",
      icon: Globe,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      code: `import requests
import RPi.GPIO as gp
gp.setwarnings(False)

url = "https://api.thingspeak.com/channels/Channel_Id/feeds.json"
response = requests.get(url, verify=False)

data = response.json()
print("Data from the ThingSpeak.com using Read API:")
feeds = data.get('feeds', [])
for entry in feeds:
    field1 = entry.get("field1")
    print(field1)`
    },
    {
      title: "WebPage Traffic Control using 3 lights",
      icon: FileCode,
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=800",
      video: "https://www.youtube.com/embed/zmfGr69LXs4",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LED</title>
</head>
<body>
    <form method ="get" action ="web.php">
        <input type ="hidden" name ="led" value= "1">
        <button type="submit" name ="state" value="on">ON</button>
        <button type="submit" name ="state" value="off">OFF</button>
    </form>
    <form action="web.php" method ="get">
        <input type="hidden" name ="led" value = "2">
        <button type="submit" name ="state" value="on">ON</button>
        <button type="submit" name ="state" value="off">OFF</button>
    </form>
    <form action="web.php" method ="get">
        <input type="hidden" name ="led" value = "3">
        <button type="submit" name ="state" value="on">ON</button>
        <button type="submit" name ="state" value="off">OFF</button>
    </form>
    <?php
        if(isset($_GET['led']) && isset($_GET['state'])){
            $led = intval($_GET['led']);
            $state = $_GET['state'];
            if($led == 1)
            {
                $pin = 17;
            }
            else if($led == 2)
            {
                $pin = 27;
            }
            else if($led == 3)
            {
                $pin = 22;
            }
            if($state == "on")
            {
                $gpio_on = shell_exec("/usr/local/bin/gpio -g write $pin 1");
                echo "LED is on";
            }
            else if($state == "off")
            {
                $gpio_off = shell_exec("/usr/local/bin/gpio -g write $pin 0");
                echo "LED is off";
            }
        }
    ?>
</body>
</html>`
    },
    {
      title: "Transfer a file from one bucket to the other using Lambda",
      icon: Server,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      video: "https://www.youtube.com/embed/hs6VEYQpCVM",
      code: `import json
import boto3
import time

def lambda_handler(event, context):
    start_time = time.time()
    print(f"Received event: {json.dumps(event)}")

    source_bucket = event['source_bucket']
    destination_bucket = event['destination_bucket']
    file_key = event['file_key']

    s3 = boto3.client('s3')

    try:
        print(f"Starting file copy from {source_bucket} to {destination_bucket} for file: {file_key}")
        
        s3.copy_object(
            CopySource={'Bucket': source_bucket, 'Key': file_key},
            Bucket=destination_bucket,
            Key=file_key
        )

        elapsed_time = time.time() - start_time
        print(f"File copied successfully in {elapsed_time:.2f} seconds")
        
        return {
            'statusCode': 200,
            'body': json.dumps(f"File {file_key} transferred successfully in {elapsed_time:.2f} seconds.")
        }

    except Exception as e:
        print(f"Error copying file: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error copying file: {str(e)}")
        }
`
    },
    {
      title: "Lambda Function Test JSON",
      icon: Code,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      code: `{
    "source_bucket": "value",
    "destination_bucket": "value",
    "file_key": "value"
}`
    },
    {
      title: "Arithmetic Calculator using Lambda",
      icon: Calculator,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
      video: "https://www.youtube.com/embed/zmfGr69LXs4",
      code: `export const handler = async (event) => {
    let {operation,num1,num2} = event;
    let result = 0;
    switch(operation) {
      case 1:
        result = num1 + num2;
        break;
      case 2:
        result = num1 - num2;
        break;
      case 3:
        result = num1 * num2;
        break;
      case 4:
        result = num1 / num2;
        break;
      default:
        result = -1;
        break;
    }
    
    const response = {
      statusCode: 200,
      body: result
    };
    return response;
};`
    },
    {
      title: "Arithmetic Calculator HTML Interface",
      icon: FileCode,
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arithmetic Operations</title>
</head>
<body>
    <h1>Perform Arithmetic Operations</h1>
    <form id="calcForm">
        <input type="number" id="num1" placeholder="Enter first number" required>
        <input type="number" id="num2" placeholder="Enter second number" required>
        <select id="operation">
            <option value="1">Add</option>
            <option value="2">Subtract</option>
            <option value="3">Multiply</option>
            <option value="4">Divide</option>
        </select>
        <button type="submit">Calculate</button>
    </form>
    <h2>Result: <span id="result">N/A</span></h2>
    <script>
        document.getElementById('calcForm').addEventListener('submit', async function (e) {
            e.preventDefault();

            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            const operation = parseInt(document.getElementById('operation').value);

            // Replace with your API Gateway URL
            const apiUrl = "<endpoint-of-api>";

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ num1, num2, operation })
            });

            const result = await response.json();
            console.log(result);
            document.getElementById('result').textContent = result.body || 'Error';
        });
    </script>
</body>
</html>`
    },
    {
      title: "Connect to AWS EC2 instance SSH from Windows",
      icon: Terminal,
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
      video: "https://www.youtube.com/embed/UlwWgyyq0Gc",
    },
    {
      title: "COOJA SIMULATOR",
      icon: Globe,
      image: "https://plus.unsplash.com/premium_photo-1687119905703-fb52ba5e7c93?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      video: "https://www.youtube.com/embed/IwaCfjVKXzM",
    }
    
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Experiments' },
    { id: 'raspberry', name: 'Raspberry Pi' },
    { id: 'aws', name: 'AWS & Lambda' },
    { id: 'sensors', name: 'Sensors' },
    { id: 'web', name: 'Web Control' },
    { id: 'cooja', name: 'Cooja Simulator' }
  ];

  const filteredExperiments = experiments.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    
    if (activeCategory === 'raspberry') {
      return matchesSearch && (
        exp.title.includes('Pi') || 
        exp.title.includes('GPIO') || 
        exp.title.includes('Traffic Light')
      );
    }
    
    if (activeCategory === 'aws') {
      return matchesSearch && (
        exp.title.includes('Lambda') || 
        exp.title.includes('AWS') || 
        exp.title.includes('bucket')||
        exp.title.includes('EC2 INSTANCE CREATION')||
        exp.title.includes('S3 BUCKET CREATION')
      );
    }
    
    if (activeCategory === 'sensors') {
      return matchesSearch && (
        exp.title.includes('Ultrasonic') || 
        exp.title.includes('Sensor') || 
        exp.title.includes('Parking')
      );
    }
    
    if (activeCategory === 'web') {
      return matchesSearch && (
        exp.title.includes('WebPage') || 
        exp.title.includes('HTML') || 
        exp.title.includes('Interface')
      );
    }
    
    if (activeCategory === 'cooja') {
      return matchesSearch && (
        exp.title.includes('COOJA SIMULATOR')
      );
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section with Animated Background */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-16 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
          <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
          
          {/* Animated Circles */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeIn">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
                IoT Lab Experiments
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 animate-fadeIn animation-delay-300">
              A comprehensive collection of IoT experiments and code samples for hands-on learning
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto animate-fadeIn animation-delay-600">
              <input
                type="text"
                placeholder="Search experiments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Category Filters */}
      <div className="bg-white shadow-md py-4 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <ReferenceNote />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {filteredExperiments.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {filteredExperiments.map((exp, index) => (
              <ExperimentCard key={index} {...exp} delay={index * 100} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No experiments found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
      
      {/* Visitor Counter */}
      <VisitorCounter />
      
      {/* Copyright Notice */}
      <div className="text-center py-6 bg-white border-t border-gray-200">
        <p className="text-gray-600">
          Developed and Maintained by <strong className="text-gray-800">The KEC IOT Developers</strong>
        </p>
        <p className="text-gray-500 text-sm mt-1">
          © {new Date().getFullYear()} IoT Lab Experiments. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;