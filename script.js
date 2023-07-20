let recognition;
let spokenText = '';
let isListening = false;
let recognitionInProgress = false; // Flag to track if speech recognition is ongoing

function initializeSpeechRecognition() {
  recognition = new window.webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false; // Disable interim results for faster and more accurate final results

  recognition.onresult = (event) => {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript;

    // Split the spokenText into an array of words
    const spokenWords = spokenText.trim().split(' ');

    // Split the new transcript into an array of words
    const newWords = transcript.trim().split(' ');

    // Concatenate the arrays and filter out duplicates
    const uniqueWords = [...new Set([...spokenWords, ...newWords])];

    // Join the words back into a string with spaces
    spokenText = uniqueWords.join(' ');

    // Update the text box only when recognition is not in progress
    if (!recognitionInProgress) {
      updateTextBox();
    }
  };

  recognition.onend = () => {
    // Restart recognition if it was not explicitly stopped
    if (isListening) {
      recognition.start();
    }
  };
}

function toggleSpeechRecognition() {
  if (!recognition) {
    initializeSpeechRecognition();
  }

  if (!isListening) {
    document.getElementById('voiceButton').textContent = "Listening...";
    recognition.start();
    isListening = true;
  } else {
    document.getElementById('voiceButton').textContent = "Voice to Text";
    recognitionInProgress = false; // Set recognitionInProgress to false when stopping
    recognition.stop();
    isListening = false;
  }
}

function updateTextBox() {
  recognitionInProgress = true; // Set recognitionInProgress to true before updating text
  // Update the text box with the latest spoken text (live)
  textBox.innerText = spokenText.trim();
  recognitionInProgress = false; // Set recognitionInProgress back to false after updating
}

function populateVoices() {
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = '<option value="default">Select Voice</option>';

  const voices = window.speechSynthesis.getVoices();

  // Separate male and female voices
  const maleVoices = voices.filter(voice => voice.name.includes('Male'));
  const femaleVoices = voices.filter(voice => voice.name.includes('Female'));

  // Add male voices to the select drop-down
  maleVoices.forEach(voice => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.text = `${voice.name} (${voice.lang}) - Male`;
    voiceSelect.appendChild(option);
  });

  // Add female voices to the select drop-down
  femaleVoices.forEach(voice => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.text = `${voice.name} (${voice.lang}) - Female`;
    voiceSelect.appendChild(option);
  });
}
function changeVoice() {
  // Get the selected voice from the drop-down menu
  const voiceSelect = document.getElementById("voiceSelect");
  const selectedVoice = voiceSelect.options[voiceSelect.selectedIndex].value;

  // Store the selected voice in localStorage
  localStorage.setItem("selectedVoice", selectedVoice);
}


// Populate voices when the page is loaded
window.addEventListener("DOMContentLoaded", () => {
  populateVoices();

  var textBox = document.querySelector(".text-box");
  var spaceFlag = false;
  var imageTimeout;
  var clickedImage = null; 
  
  
  // Add this code inside the "DOMContentLoaded" event listener
const cameraButton = document.getElementById("cameraButton");
cameraButton.addEventListener("click", toggleCamera);

// Add this code inside the "DOMContentLoaded" event listener
const takePhotoButton = document.getElementById("takePhotoButton");
takePhotoButton.addEventListener("click", capturePhoto);

// Store the reference to the clicked image

  // Rest of the code remains the same...
});




// Rest of the code remains the same...

// Rest of the code remains the same...

// Rest of the code remains the same...


// Rest of the code remains the same...



// Rest of the code remains the same...


// Rest of the code remains the same...


// Rest of the code remains the same...



// Rest of the code remains the same...



function speakText() {
  const messageContent = textBox.innerText;
  const utterance = new SpeechSynthesisUtterance(messageContent);
  utterance.lang = "en-US"; // Set the language for speech synthesis

  // Get the selected voice from the drop-down menu
  const voiceSelect = document.getElementById("voiceSelect");
  
  const selectedVoice = localStorage.getItem("selectedVoice");
  

  if (selectedVoice !== "default") {
    utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name === selectedVoice);
  }

  // Optional: Set additional properties for the speech synthesis, if needed
  // utterance.volume = 1; // 0 to 1
  // utterance.rate = 1; // 0.1 to 10
  // utterance.pitch = 1; // 0 to 2

  window.speechSynthesis.speak(utterance);
}

// Rest of the code remains the same...


// Rest of the code remains the same...


// Rest of the code remains the same...


// Rest of the code remains the same...


function populateVoices() {
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = '<option value="default">Select Voice</option>';

  const voices = window.speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.text = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Populate voices when the page is loaded
window.addEventListener("DOMContentLoaded", () => {
  populateVoices();

  var textBox = document.querySelector(".text-box");
  var spaceFlag = false;
  var imageTimeout;
  var clickedImage = null; // Store the reference to the clicked image

  textBox.addEventListener("keydown", function(event) {
    if (event.key === " ") {
      spaceFlag = true;
    }
  });

  textBox.addEventListener("keyup", function(event) {
    if (event.key === " " && spaceFlag) {
      clearTimeout(imageTimeout); // Clear any previous timeout
      var message = textBox.innerText;
      var caretPosition = getCaretPosition(textBox);

      if (message.trim().endsWith("space")) {
        var imageTags = '<img src="astronaut-g9c1b70390_1920.png" alt="Space Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("rocket")) {
        var imageTags = '<img src="rocket-gc9c7b6b03_1920.jpg" alt="Rocket Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("messi")) {
        var imageTags = '<img src="lionel-messi-g8892bc3a8_1920.jpg" alt="Messi Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      }  else if (message.trim().endsWith("Messi")) {
        var imageTags = '<img src="lionel-messi-g8892bc3a8_1920.jpg" alt="Messi Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("ronaldo")) {
        var imageTags = '<img src="cristiano-ronaldo-g95e5ddd86_1920.png" alt="ronaldo Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      }  else if (message.trim().endsWith("Ronaldo")) {
        var imageTags = '<img src="cristiano-ronaldo-g95e5ddd86_1920.png" alt="ronaldo Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("football")) {
        var imageTags = '<img src="soccer-g8e507349e_1920.jpg" alt="football Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      }  else if (message.trim().endsWith("Football")) {
        var imageTags = '<img src="soccer-g8e507349e_1920.jpg" alt="football Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("modi")) {
        var imageTags = '<img src="modi-g9d057b13e_1920.jpg" alt="Modi Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("Modi")) {
        var imageTags = '<img src="modi-g9d057b13e_1920.jpg" alt="Modi Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("putin")) {
        var imageTags = '<img src="putin-g61e46c756_1920.jpg" alt="putin Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      }  else if (message.trim().endsWith("Putin")) {
        var imageTags = '<img src="putin-g61e46c756_1920.jpg" alt="putin Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("biden")) {
        var imageTags = '<img src="joe-biden-g6ee0c1e5d_1920.jpg" alt="biden Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      }  else if (message.trim().endsWith("Biden")) {
        var imageTags = '<img src="joe-biden-g6ee0c1e5d_1920.jpg" alt="biden Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("king")) {
        var imageTags = '<img src="king-g672888e99_1920.jpg" alt="king Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("lion")) {
        var imageTags = '<img src="lion-gd8a8e712f_1920.jpg" alt="lion Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("politics")) {
        var imageTags = '<img src="direction-gf5df8d266_1920.jpg" alt="politics Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      } else if (message.trim().endsWith("coding")) {
        var imageTags = '<img src="programming-gf27b85057_1920.jpg" alt="coding Image" class="resizable-image" style="width: 150px; height: 150px;">';
        textBox.innerHTML += imageTags;
      }
      // Add more conditions for other words and their respective images

      imageTimeout = setTimeout(function() {
        var messageContent = textBox.innerHTML;
        var updatedMessage = messageContent.replace(/<img[^>]+>/gi, "");
        textBox.innerHTML = updatedMessage;
        setCaretPosition(textBox, caretPosition);
      }, 3000);

      spaceFlag = false;
    }

    if (event.key !== " ") {
      clearTimeout(imageTimeout);
      spaceFlag = false;
    }
  });

  textBox.addEventListener("click", function(event) {
    var target = event.target;
    if (target.classList.contains("resizable-image")) {
      clearTimeout(imageTimeout);
      clickedImage = target; // Store the reference to the clicked image
    }
  });

  var sendButton = document.querySelector(".send-button");
  sendButton.addEventListener("click", function() {
    var messageContent = textBox.innerHTML;
    localStorage.setItem("messageContent", messageContent);
    var width = textBox.offsetWidth;
    var height = textBox.offsetHeight;
    localStorage.setItem("messageWidth", width);
    localStorage.setItem("messageHeight", height);
    window.open("message.html", "_blank");
  });

  function getCaretPosition(element) {
    // Function to get caret position
    // Implementation omitted for brevity
  }

  function setCaretPosition(element, caretPos) {
    // Function to set caret position
    // Implementation omitted for brevity
  }
});
// Rest of the code remains the same...
// ... Rest of the code ...

// ... Rest of the code ...

let cameraStream = null;
let cameraOn = false;
let canvas = null;
let imageTaken = false;

// Function to toggle camera
function toggleCamera() {
  if (!cameraOn) {
    startCamera();
  } else {
    if (imageTaken) {
      // Stop the camera if an image has been taken
      stopCamera();
      imageTaken = false;
    } else {
      capturePhoto();
      imageTaken = true;
    }
  }
}

function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("getUserMedia is not supported in this browser");
    return;
  }

  const constraints = { video: { facingMode: "environment" } }; // Use the back camera if available

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      cameraStream = stream;
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 150;

      const textBox = document.querySelector(".text-box");
      const cameraContainer = document.createElement("div");
      cameraContainer.classList.add("camera-container");
      cameraContainer.appendChild(video);
      textBox.appendChild(cameraContainer);
      cameraOn = true;
      document.getElementById("cameraButton").textContent = "Take Photo";
    })
    .catch((error) => {
      console.error("Error accessing the camera: ", error);
    });
    // ... Rest of the code ...

    cameraOn = true;
    document.getElementById("cameraButton").textContent = "Take Photo";


// ... Rest of the code ...

}

function stopCamera() {
  if (cameraStream) {
    const videoTracks = cameraStream.getVideoTracks();
    videoTracks.forEach((track) => track.stop());
    cameraStream = null;
    cameraOn = false;
    const cameraContainer = document.querySelector(".camera-container");
    const textBox = document.querySelector(".text-box");
    textBox.removeChild(cameraContainer);
    document.getElementById("cameraButton").textContent = "Camera";
  }
  document.getElementById("cameraButton").textContent = "Camera";
}


function capturePhoto() {
  if (cameraStream) {
    const video = document.querySelector("video");
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL(); // Convert canvas content to data URL

    // Create a new image element
    const imageElement = new Image();
    imageElement.src = dataURL;

    // Set the desired width and height for the image
    const desiredWidth = 200;
    const desiredHeight = 150;
    imageElement.width = desiredWidth;
    imageElement.height = desiredHeight;

    // Create a new div element to hold the image
    const newImageDiv = document.createElement("div");
    newImageDiv.appendChild(imageElement);

    // Insert the image div at the caret position in the text box
    const textBox = document.querySelector(".text-box");
    textBox.appendChild(newImageDiv);
  }
}



// ... Rest of the code ...

document.querySelector(".text-box").addEventListener("dblclick", function(event) {
  var target = event.target;
  if (target.tagName.toLowerCase() === "img") {
    target.remove(); // Remove the image on double-click
  }
});
function toggleCamera() {
  if (!cameraOn) {
    startCamera();
  } else {
    capturePhoto();
    stopCamera();
  }
}

// Rest of the code remains the same...
