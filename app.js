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
    this.initSpeechRecognition();
  }

  static get observedAttributes() {
    return ["lang", "highlight", "voice", "rate"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "highlight" && newValue === "false") {
      this.highlight = false;
    }
    if (name === "rate") {
      this.speechRate = parseFloat(newValue);
    }
    if (name === "voice") {
      this.selectedVoice = newValue;
    }
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
    const highlight = this.getAttribute("highlight") !== "false";
    const voice = this.getAttribute("voice") || "default";
    const rate = parseFloat(this.getAttribute("rate")) || 1;

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
          currentWordIndex,
          highlight
        );
      });

      this.highlightCurrentWord = (
        paragraphElement,
        paragraphText,
        index,
        highlight
      ) => {
        if (highlight) {
          const words = paragraphText
            .map((word, idx) => {
              return idx === index
                ? `<span class="highlighted-read-out">${word}</span>`
                : word;
            })
            .join(" ");
          paragraphElement.innerHTML = words;
        } else {
          paragraphElement.innerHTML = paragraphText.join(" ");
        }
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
            currentWordIndex,
            highlight
          );

          if (currentWordIndex >= paragraphText.length) {
            recognition.stop();

            this.dispatchEvent(
              new CustomEvent("reading-complete", {
                detail: { message: "Reading completed" },
              })
            );
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
