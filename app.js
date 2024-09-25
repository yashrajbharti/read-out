// app.js

const startBtn = document.getElementById("start-btn");
const textToRead = document.getElementById("text-to-read");

// Predefined text paragraph split into words
const paragraphText =
  "The quick brown fox jumps over the lazy dog. This is a sample paragraph to read out loud.".split(
    " "
  );
let currentWordIndex = 0;

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if ("SpeechRecognition" in window) {
  console.log("Web Speech API is supported");

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"; // Set language to match the paragraph's language
  recognition.interimResults = true;
  recognition.continuous = true;

  // Start speech recognition
  startBtn.addEventListener("click", () => {
    recognition.start();
    highlightCurrentWord();
  });

  // Function to highlight the current word being read
  function highlightCurrentWord() {
    const words = paragraphText
      .map((word, index) => {
        return index === currentWordIndex
          ? `<span class="highlighted">${word}</span>`
          : word;
      })
      .join(" ");

    textToRead.innerHTML = words;
  }

  // Function to strip punctuation from words
  function stripPunctuation(word) {
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  }

  // Process speech recognition results
  recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript
      .trim()
      .toLowerCase();

    let currentWord = stripPunctuation(
      paragraphText[currentWordIndex].toLowerCase()
    );

    if (transcript.includes(currentWord)) {
      currentWordIndex++; // Move to the next word
      highlightCurrentWord(); // Underline the next word

      // Stop recognition if the entire paragraph is read
      if (currentWordIndex >= paragraphText.length) {
        recognition.stop();
        alert("Reading completed!");
      }
    }
  };

  // Handle speech recognition errors
  recognition.onerror = (event) => {
    console.error(`Error occurred: ${event.error}`);
  };

  recognition.onend = () => {
    if (currentWordIndex < paragraphText.length) {
      recognition.start(); // Restart recognition if reading isn't complete
    }
  };
} else {
  console.log("Web Speech API is not supported in this browser.");
  textToRead.textContent = "Web Speech API is not supported in this browser.";
}
