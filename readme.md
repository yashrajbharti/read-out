# Read Aloud Web Component

### _"Just Read Out"_ – A Simple Way to Bring Voice to Your Content!

## Overview

The **Read Aloud Web Component** is a customizable, lightweight component that allows you to add text-to-speech functionality to any web page. With built-in support for the Web Speech API, it provides a seamless reading experience by listening to your voice and highlighting the words as they are read aloud.

## Features

- **Web Speech API Integration**: Uses the browser's native speech recognition capabilities.
- **Customizable Text**: Style your paragraph any way you like—functionality stays intact.
- **Language Flexibility**: Set the language for speech recognition through a simple `lang` attribute.
- **Live Word Highlighting**: Highlights the current word being read for easy tracking.
- **Cross-Browser Compatibility**: Works in browsers that support the Web Speech API.

## How to Use

1. Add the custom component to your HTML:

   ```html
   <read-aloud-component lang="en-US">
     <p slot="paragraph">The quick brown fox jumps over the lazy dog.</p>
     <button slot="start-btn">Start Reading</button>
   </read-aloud-component>
   ```

2. Style the component's elements (paragraph and button) as desired using CSS.

3. That's it! Click "Start Reading," and the text will be read out loud while highlighting each word.

## Requirements

- A browser with Web Speech API support (Chrome, Safari, Edge, etc.).

## Installation

Just include the JavaScript file in your project:

```html
<script src="app.js"></script>
```

And you’re good to go!
