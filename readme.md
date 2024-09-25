# 🎙️ **Read Aloud Web Component**

### _"Just Read Out"_ – A Simple, Powerful Way to Bring Voice to Your Content!

![Demo for read out](https://github.com/user-attachments/assets/7ae9d27f-2362-4f12-9ed2-7337b70a9e8e)

## Overview

The **Read Aloud Web Component** is a customizable, lightweight solution that allows you to add **text-to-speech** functionality to any webpage. With built-in support for the **Web Speech API**, it provides a seamless reading experience, highlighting words as they are read aloud.

[LAUNCH DEMO](https://yashrajbharti.github.io/read-out/)

---

## ✨ Features

- **🎤 Web Speech API Integration**: Uses the browser's native speech recognition capabilities.
- **📝 Customizable Text**: Style your text any way you like—functionality stays intact.
- **🌍 Language Flexibility**: Set the speech language through a simple `lang` attribute.
- **🔍 Live Word Highlighting**: Automatically highlights the current word being read.
- **🌐 Cross-Browser Compatibility**: Works in browsers that support the Web Speech API (Chrome, Safari, Edge, etc.).

---

## 🚀 How to Use

1. **Add the custom component to your HTML:**

   ```html
   <read-aloud-component lang="en-US">
     <p slot="paragraph">The quick brown fox jumps over the lazy dog.</p>
     <button slot="start-btn">Start Reading</button>
   </read-aloud-component>
   ```

2. **Style the component** (paragraph and button) with CSS as desired.

   ```css
   read-aloud-component {
     display: block;
     margin: 20px 0;
   }

   read-aloud-component p {
     font-size: 1.2em;
     color: #333;
   }

   read-aloud-component button {
     background-color: #007bff;
     color: white;
     border: none;
     border-radius: 5px;
     padding: 10px 15px;
     cursor: pointer;
     transition: background-color 0.3s ease;
   }

   read-aloud-component button:hover {
     background-color: #0056b3;
   }
   ```

3. **Start the reading session!** Click "Start Reading," and the text will be read aloud while highlighting each word.

---

## 📋 Attributes and Methods

| Attribute   | Type    | Description                                                 | Default Value |
| ----------- | ------- | ----------------------------------------------------------- | ------------- |
| `lang`      | String  | Defines the language for speech recognition (`en-US`, etc.) | `en-US`       |
| `highlight` | Boolean | Enables/disables live word highlighting                     | `true`        |
| `voice`     | String  | Selects the voice for speech output (native browser voices) | `default`     |
| `rate`      | Number  | Controls the speech speed (0.1 - 10)                        | `1`           |

### Available Methods

| Method            | Description                           | Usage Example             |
| ----------------- | ------------------------------------- | ------------------------- |
| `startReading()`  | Starts reading the content aloud.     | `element.startReading()`  |
| `stopReading()`   | Stops the current reading session.    | `element.stopReading()`   |
| `pauseReading()`  | Pauses the speech temporarily.        | `element.pauseReading()`  |
| `resumeReading()` | Resumes speech from the paused point. | `element.resumeReading()` |

---

## 🎯 Example Usage

```html
<read-aloud-component lang="en-GB" highlight="true" rate="1.2">
  <p slot="paragraph">
    A journey of a thousand miles begins with a single step.
  </p>
  <button slot="start-btn">Read Aloud</button>
</read-aloud-component>
```

With this example:

- The **text is read in British English** (`en-GB`).
- **Word highlighting** is enabled.
- The **reading speed is slightly faster** than normal (`rate="1.2"`).

---

## 🛠️ Installation

1. Include the JavaScript file in your project:

   ```html
   <script src="app.js"></script>
   ```

   OR USE `unpkg`

   ```html
   <script src="https://unpkg.com/read-aloud-component@1.0.1/app.js"></script>
   ```

You're ready to go! Simply add the component to your HTML and style it.

#### [NPM LINK](https://www.npmjs.com/package/read-aloud-component)

## 💻 Browser Support

Works on all major browsers with Web Speech API support:

- **Google Chrome**
- **Safari**
- **Microsoft Edge**

---

Enhance the accessibility of your website by making it more engaging and easier to use with the **Read Aloud Web Component**! 😃
