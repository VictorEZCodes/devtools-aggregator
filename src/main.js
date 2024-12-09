import './styles/main.css';
import { marked } from 'marked';
import { Dashboard } from './components/Dashboard';
import feather from 'feather-icons';

// Creating the initial HTML structure
document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Dev Tools Aggregator
        </h1>
        <div class="flex gap-4">
          <div class="relative">
            <select id="tool-selector" class="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">Select a tool...</option>
              <option value="json">JSON Formatter</option>
              <option value="base64">Base64 Encoder/Decoder</option>
              <option value="url">URL Encoder/Decoder</option>
              <option value="regex">Regex Tester</option>
              <option value="hash">Hash Generator</option>
              <option value="uuid">UUID Generator</option>
              <option value="timestamp">Timestamp Converter</option>
              <option value="markdown">Markdown Previewer</option>
              <option value="color">Color Converter</option>
              <option value="jwt">JWT Decoder</option>
              <option value="http">HTTP Request Tester</option>
              <option value="css">CSS Minifier</option>
              <option value="jsonToCsv">JSON to CSV Converter</option>
            </select>
          </div>
          <button id="theme-toggle" class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            ${feather.icons['moon'].toSvg({ class: 'w-5 h-5' })}
          </button>
        </div>
      </div>
    </header>
    <main id="dashboard-container" class="max-w-7xl mx-auto py-6"></main>
  </div>
`;

const dashboard = new Dashboard();
document.getElementById('dashboard-container').appendChild(dashboard.render());

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  themeToggle.innerHTML = feather.icons[isDark ? 'sun' : 'moon'].toSvg({ class: 'w-5 h-5' });
});

// Tool creation functions
function createJsonFormatter(card) {
  const formatBtn = card.querySelector('.format-btn');
  const copyBtn = card.querySelector('.copy-btn');
  const textarea = card.querySelector('textarea');

  formatBtn?.addEventListener('click', () => {
    try {
      const inputText = textarea.value.trim();
      if (!inputText) {
        alert('Please enter some JSON');
        return;
      }
      const json = JSON.parse(inputText);
      textarea.value = JSON.stringify(json, null, 2);
    } catch (e) {
      alert('Invalid JSON: ' + e.message);
    }
  });

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textarea.value);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `${feather.icons['check'].toSvg({ class: 'w-4 h-4' })} Copied!`;
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      alert('Failed to copy: ' + err.message);
    }
  });
}

function createBase64Tool(card) {
  const encodeBtn = card.querySelector('.encode-btn');
  const decodeBtn = card.querySelector('.decode-btn');
  const copyBtn = card.querySelector('.copy-btn');
  const textarea = card.querySelector('textarea');

  encodeBtn?.addEventListener('click', () => {
    try {
      const text = textarea.value.trim();
      if (!text) {
        alert('Please enter some text');
        return;
      }
      textarea.value = btoa(text);
    } catch (e) {
      alert('Encoding failed: ' + e.message);
    }
  });

  decodeBtn?.addEventListener('click', () => {
    try {
      const text = textarea.value.trim();
      if (!text) {
        alert('Please enter some base64');
        return;
      }
      textarea.value = atob(text);
    } catch (e) {
      alert('Decoding failed: ' + e.message);
    }
  });

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textarea.value);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `${feather.icons['check'].toSvg({ class: 'w-4 h-4' })} Copied!`;
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      alert('Failed to copy: ' + err.message);
    }
  });
}

function createUrlTool(card) {
  const encodeBtn = card.querySelector('.encode-btn');
  const decodeBtn = card.querySelector('.decode-btn');
  const copyBtn = card.querySelector('.copy-btn');
  const textarea = card.querySelector('textarea');

  encodeBtn?.addEventListener('click', () => {
    try {
      const text = textarea.value.trim();
      if (!text) {
        alert('Please enter some text');
        return;
      }
      textarea.value = encodeURIComponent(text);
    } catch (e) {
      alert('Encoding failed: ' + e.message);
    }
  });

  decodeBtn?.addEventListener('click', () => {
    try {
      const text = textarea.value.trim();
      if (!text) {
        alert('Please enter some encoded URL');
        return;
      }
      textarea.value = decodeURIComponent(text);
    } catch (e) {
      alert('Decoding failed: ' + e.message);
    }
  });

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textarea.value);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `${feather.icons['check'].toSvg({ class: 'w-4 h-4' })} Copied!`;
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      alert('Failed to copy: ' + err.message);
    }
  });
}

function createRegexTester(card) {
  const testBtn = card.querySelector('.test-btn');
  const regexInput = card.querySelector('.regex-input');
  const testStringInput = card.querySelector('.test-string-input');
  const resultArea = card.querySelector('.result-area');

  testBtn?.addEventListener('click', () => {
    try {
      const regex = new RegExp(regexInput.value);
      const testString = testStringInput.value;
      const matches = testString.match(regex);
      resultArea.value = matches ? matches.join('\n') : 'No matches found';
    } catch (e) {
      alert('Invalid regex: ' + e.message);
    }
  });
}

function createHashGenerator(card) {
  const generateBtn = card.querySelector('.generate-btn');
  const algorithmSelect = card.querySelector('.algorithm-select');
  const inputText = card.querySelector('.input-text');
  const resultArea = card.querySelector('.result-area');

  generateBtn?.addEventListener('click', async () => {
    try {
      const text = inputText.value;
      const algorithm = algorithmSelect.value;
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      resultArea.value = hashHex;
    } catch (e) {
      alert('Hash generation failed: ' + e.message);
    }
  });
}

function createUuidGenerator(card) {
  const generateBtn = card.querySelector('.generate-btn');
  const resultArea = card.querySelector('.result-area');
  const copyBtn = card.querySelector('.copy-btn');

  generateBtn?.addEventListener('click', () => {
    const uuid = crypto.randomUUID();
    resultArea.value = uuid;
  });

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(resultArea.value);
      alert('UUID copied to clipboard');
    } catch (err) {
      alert('Failed to copy: ' + err.message);
    }
  });
}

function createTimestampConverter(card) {
  const convertToDateBtn = card.querySelector('.convert-to-date-btn');
  const convertToTimestampBtn = card.querySelector('.convert-to-timestamp-btn');
  const timestampInput = card.querySelector('.timestamp-input');
  const dateInput = card.querySelector('.date-input');

  convertToDateBtn?.addEventListener('click', () => {
    const timestamp = parseInt(timestampInput.value, 10);
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp);
      dateInput.value = date.toISOString();
    } else {
      alert('Invalid timestamp');
    }
  });

  convertToTimestampBtn?.addEventListener('click', () => {
    const date = new Date(dateInput.value);
    if (!isNaN(date.getTime())) {
      timestampInput.value = date.getTime();
    } else {
      alert('Invalid date');
    }
  });
}

function createMarkdownPreviewer(card) {
  const textarea = card.querySelector('.markdown-input');
  const previewArea = card.querySelector('.preview-area');

  // Set initial preview
  previewArea.innerHTML = marked.parse(textarea.value || '');

  textarea?.addEventListener('input', () => {
    const markdownText = textarea.value;
    previewArea.innerHTML = marked.parse(markdownText);
  });
}

function createColorConverter(card) {
  const hexInput = card.querySelector('.hex-input');
  const rgbInput = card.querySelector('.rgb-input');
  const hslInput = card.querySelector('.hsl-input');
  const convertBtn = card.querySelector('.convert-btn');

  convertBtn?.addEventListener('click', () => {
    try {
      const hex = hexInput.value.trim();
      const rgb = hexToRgb(hex);
      const hsl = rgbToHsl(rgb);
      rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    } catch (e) {
      alert('Invalid color format');
    }
  });
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function rgbToHsl({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function createJwtDecoder(card) {
  const decodeBtn = card.querySelector('.decode-btn');
  const jwtInput = card.querySelector('.jwt-input');
  const resultArea = card.querySelector('.result-area');

  decodeBtn?.addEventListener('click', () => {
    try {
      const jwt = jwtInput.value.trim();
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      resultArea.value = JSON.stringify(payload, null, 2);
    } catch (e) {
      alert('Invalid JWT');
    }
  });
}

function createHttpRequestTester(card) {
  const sendBtn = card.querySelector('.send-btn');
  const urlInput = card.querySelector('.url-input');
  const methodSelect = card.querySelector('.method-select');
  const responseArea = card.querySelector('.response-area');

  sendBtn?.addEventListener('click', async () => {
    try {
      const url = urlInput.value.trim();
      const method = methodSelect.value;
      const response = await fetch(url, { method });
      const data = await response.text();
      responseArea.value = data;
    } catch (e) {
      alert('Request failed: ' + e.message);
    }
  });
}

function createCssMinifier(card) {
  const minifyBtn = card.querySelector('.minify-btn');
  const cssInput = card.querySelector('.css-input');
  const resultArea = card.querySelector('.result-area');

  minifyBtn?.addEventListener('click', () => {
    const css = cssInput.value;
    const minifiedCss = css.replace(/\s+/g, ' ').trim();
    resultArea.value = minifiedCss;
  });
}

function createJsonToCsvConverter(card) {
  const convertBtn = card.querySelector('.convert-btn');
  const jsonInput = card.querySelector('.json-input');
  const resultArea = card.querySelector('.result-area');

  convertBtn?.addEventListener('click', () => {
    try {
      const json = JSON.parse(jsonInput.value);
      const csv = jsonToCsv(json);
      resultArea.value = csv;
    } catch (e) {
      alert('Invalid JSON');
    }
  });
}

function jsonToCsv(json) {
  const keys = Object.keys(json[0]);
  const csvRows = [keys.join(',')];
  for (const row of json) {
    const values = keys.map(key => JSON.stringify(row[key], replacer));
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
}

function replacer(key, value) {
  return value === null ? '' : value;
}

// Tool templates
const toolTemplates = {
  json: {
    title: 'JSON Formatter',
    content: `<div class="space-y-4">
      <textarea 
        class="w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Paste your JSON here..."
      ></textarea>
      <div class="flex gap-2">
        <button class="format-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
          ${feather.icons['check'].toSvg({ class: 'w-4 h-4' })}
          Format
        </button>
        <button class="copy-btn px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2">
          ${feather.icons['copy'].toSvg({ class: 'w-4 h-4' })}
          Copy
        </button>
      </div>
    </div>`,
    action: createJsonFormatter
  },
  base64: {
    title: 'Base64 Encoder/Decoder',
    content: `<div class="space-y-4">
      <textarea 
        class="w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Enter text to encode/decode..."
      ></textarea>
      <div class="flex gap-2">
        <button class="encode-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
          ${feather.icons['lock'].toSvg({ class: 'w-4 h-4' })}
          Encode
        </button>
        <button class="decode-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
          ${feather.icons['unlock'].toSvg({ class: 'w-4 h-4' })}
          Decode
        </button>
        <button class="copy-btn px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2">
          ${feather.icons['copy'].toSvg({ class: 'w-4 h-4' })}
          Copy
        </button>
      </div>
    </div>`,
    action: createBase64Tool
  },
  url: {
    title: 'URL Encoder/Decoder',
    content: `<div class="space-y-4">
      <textarea 
        class="w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Enter URL to encode/decode..."
      ></textarea>
      <div class="flex gap-2">
        <button class="encode-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
          ${feather.icons['lock'].toSvg({ class: 'w-4 h-4' })}
          Encode
        </button>
        <button class="decode-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
          ${feather.icons['unlock'].toSvg({ class: 'w-4 h-4' })}
          Decode
        </button>
        <button class="copy-btn px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2">
          ${feather.icons['copy'].toSvg({ class: 'w-4 h-4' })}
          Copy
        </button>
      </div>
    </div>`,
    action: createUrlTool
  },
  regex: {
    title: 'Regex Tester',
    content: `<div class="space-y-4">
      <input 
        class="regex-input w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter regex pattern..."
      />
      <textarea 
        class="test-string-input w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Enter test string..."
      ></textarea>
      <button class="test-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
        ${feather.icons['search'].toSvg({ class: 'w-4 h-4' })}
        Test
      </button>
      <textarea 
        class="result-area w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Results..."
        readonly
      ></textarea>
    </div>`,
    action: createRegexTester
  },
  hash: {
    title: 'Hash Generator',
    content: `<div class="space-y-4">
      <select class="algorithm-select w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
        <option value="SHA-1">SHA-1</option>
        <option value="SHA-256">SHA-256</option>
        <option value="SHA-384">SHA-384</option>
        <option value="SHA-512">SHA-512</option>
      </select>
      <textarea 
        class="input-text w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Enter text to hash..."
      ></textarea>
      <button class="generate-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
        ${feather.icons['hash'].toSvg({ class: 'w-4 h-4' })}
        Generate
      </button>
      <textarea 
        class="result-area w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Hash result..."
        readonly
      ></textarea>
    </div>`,
    action: createHashGenerator
  },
  uuid: {
    title: 'UUID Generator',
    content: `<div class="space-y-4">
    <button class="generate-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
      ${feather.icons['hash'].toSvg({ class: 'w-4 h-4' })}
      Generate UUID
    </button>
    <textarea 
      class="result-area w-full h-10 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
      placeholder="UUID will appear here..."
      readonly
    ></textarea>
    <button class="copy-btn px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2">
      ${feather.icons['copy'].toSvg({ class: 'w-4 h-4' })}
      Copy
    </button>
  </div>`,
    action: createUuidGenerator
  },
  timestamp: {
    title: 'Timestamp Converter',
    content: `<div class="space-y-4">
      <input 
        class="timestamp-input w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter timestamp..."
      />
      <button class="convert-to-date-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
        ${feather.icons['calendar'].toSvg({ class: 'w-4 h-4' })}
        Convert to Date
      </button>
      <input 
        class="date-input w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter date..."
      />
      <button class="convert-to-timestamp-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
        ${feather.icons['clock'].toSvg({ class: 'w-4 h-4' })}
        Convert to Timestamp
      </button>
    </div>`,
    action: createTimestampConverter
  },
  markdown: {
    title: 'Markdown Previewer',
    content: `<div class="flex flex-col h-full gap-4">
      <textarea 
        class="markdown-input w-full h-[200px] p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono resize-none"
        placeholder="Enter Markdown text..."
      ># Markdown Preview Example
  
  This is a **bold text** example.
  
  ## Lists
  - Item 1
  - Item 2
    - Nested item
  
  ## Links
  [OpenAI](https://openai.com)
  
  ## Code
  \`\`\`javascript
  console.log('Hello World');
  \`\`\`</textarea>
      <div class="preview-area prose dark:prose-invert w-full h-[200px] p-4 border rounded dark:bg-gray-700 dark:border-gray-600 overflow-auto">
      </div>
    </div>`,
    action: createMarkdownPreviewer
  },
  color: {
    title: 'Color Converter',
    content: `<div class="space-y-4">
      <input 
        class="hex-input w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter HEX color..."
      />
      <button class="convert-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
        ${feather.icons['refresh-cw'].toSvg({ class: 'w-4 h-4' })}
        Convert
      </button>
      <input 
        class="rgb-input w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="RGB will appear here..."
        readonly
      />
      <input 
        class="hsl-input w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="HSL will appear here..."
        readonly
      />
    </div>`,
    action: createColorConverter
  },
  jwt: {
    title: 'JWT Decoder',
    content: `<div class="space-y-4">
      <textarea 
        class="jwt-input w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Enter JWT here..."
      ></textarea>
      <button class="decode-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
        ${feather.icons['unlock'].toSvg({ class: 'w-4 h-4' })}
        Decode
      </button>
      <textarea 
        class="result-area w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Decoded payload will appear here..."
        readonly
      ></textarea>
    </div>`,
    action: createJwtDecoder
  },
  http: {
    title: 'HTTP Request Tester',
    content: `<div class="space-y-4">
      <input 
        class="url-input w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter URL..."
      />
      <select class="method-select w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <button class="send-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
        ${feather.icons['send'].toSvg({ class: 'w-4 h-4' })}
        Send Request
      </button>
      <textarea 
        class="response-area w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Response will appear here..."
        readonly
      ></textarea>
    </div>`,
    action: createHttpRequestTester
  },
  css: {
    title: 'CSS Minifier',
    content: `<div class="space-y-4">
      <textarea 
        class="css-input w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Enter CSS here..."
      ></textarea>
      <button class="minify-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
        ${feather.icons['scissors'].toSvg({ class: 'w-4 h-4' })}
        Minify
      </button>
      <textarea 
        class="result-area w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Minified CSS will appear here..."
        readonly
      ></textarea>
    </div>`,
    action: createCssMinifier
  },
  jsonToCsv: {
    title: 'JSON to CSV Converter',
    content: `<div class="space-y-4">
      <textarea 
        class="json-input w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="Enter JSON array here..."
      ></textarea>
      <button class="convert-btn px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2">
        ${feather.icons['file-text'].toSvg({ class: 'w-4 h-4' })}
        Convert to CSV
      </button>
      <textarea 
        class="result-area w-full h-32 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
        placeholder="CSV will appear here..."
        readonly
      ></textarea>
    </div>`,
    action: createJsonToCsvConverter
  }
};

// Tool selector functionality
const toolSelector = document.getElementById('tool-selector');
toolSelector.addEventListener('change', () => {
  const selectedTool = toolSelector.value;
  if (selectedTool && toolTemplates[selectedTool]) {
    const tool = toolTemplates[selectedTool];
    dashboard.addTool(
      `${selectedTool}-${Date.now()}`,
      tool.title,
      tool.content,
      tool.action
    );
    toolSelector.value = ''; // Reset selector
  }
});

const initialTool = toolTemplates.json;
dashboard.addTool('json-formatter', initialTool.title, initialTool.content, initialTool.action);