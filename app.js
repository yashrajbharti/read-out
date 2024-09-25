class ReadAloudComponent extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");

    container.innerHTML = `
      <slot name="paragraph"></slot>
      <slot name="start-btn"></slot>
    `;

    shadow.appendChild(container);

    const style = document.createElement("style");
    style.textContent = `
      .highlighted {
        text-decoration: underline;
        color: red;
      }
    `;
    shadow.appendChild(style);
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const paragraphElement = this.querySelector('[slot="paragraph"]');
    const startBtn = this.querySelector('[slot="start-btn"]');

    if (!paragraphElement) {
      console.error("No paragraph found!");
      return;
    }

    const paragraphText = paragraphElement.textContent.trim().split(" ");
    let currentWordIndex = 0;

    const language = this.getAttribute("lang") || "en-US";
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if ("SpeechRecognition" in window) {
      console.log("Web Speech API is supported");

      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = true;
      recognition.continuous = true;

      startBtn.addEventListener("click", () => {
        recognition.start();
        this.highlightCurrentWord(
          paragraphElement,
          paragraphText,
          currentWordIndex
        );
      });

      this.highlightCurrentWord = (paragraphElement, paragraphText, index) => {
        const words = paragraphText
          .map((word, idx) => {
            return idx === index
              ? `<span class="highlighted-read-out">${word}</span>`
              : word;
          })
          .join(" ");
        paragraphElement.innerHTML = words;
      };

      this.stripPunctuation = (word) => {
        return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      };

      recognition.onresult = (event) => {
        let transcript = event.results[event.resultIndex][0].transcript
          .trim()
          .toLowerCase();
        let currentWord = this.stripPunctuation(
          paragraphText[currentWordIndex].toLowerCase()
        );

        if (transcript.includes(currentWord)) {
          currentWordIndex++;
          this.highlightCurrentWord(
            paragraphElement,
            paragraphText,
            currentWordIndex
          );

          if (currentWordIndex >= paragraphText.length) {
            recognition.stop();
            alert("Reading completed!");
          }
        }
      };

      recognition.onerror = (event) => {
        console.error(`Error occurred: ${event.error}`);
      };
      recognition.onend = () => {
        if (currentWordIndex < paragraphText.length) {
          recognition.start();
        }
      };
    } else {
      console.log("Web Speech API is not supported in this browser.");
      paragraphElement.textContent =
        "Web Speech API is not supported in this browser.";
    }
  }
}

customElements.define("read-aloud-component", ReadAloudComponent);
