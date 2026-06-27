// js/json-tool.js
(function () {
  const panel = document.getElementById('json-panel');

  panel.innerHTML = `
    <div class="card">
      <label for="json-input">输入 JSON:</label>
      <textarea id="json-input" placeholder='{"key": "value"}'></textarea>
      <div class="btn-row" style="margin-top: 12px;">
        <button class="btn btn-primary" id="json-format-btn">✨ 格式化</button>
        <button class="btn btn-secondary" id="json-minify-btn">📦 压缩</button>
        <button class="btn btn-secondary" id="json-copy-btn">📋 复制</button>
        <button class="btn btn-secondary" id="json-clear-btn">清空</button>
      </div>
      <div class="output-area" id="json-output"></div>
      <div class="info" id="json-info"></div>
    </div>
  `;

  const input = document.getElementById('json-input');
  const formatBtn = document.getElementById('json-format-btn');
  const minifyBtn = document.getElementById('json-minify-btn');
  const copyBtn = document.getElementById('json-copy-btn');
  const clearBtn = document.getElementById('json-clear-btn');
  const output = document.getElementById('json-output');
  const info = document.getElementById('json-info');

  function countKeys(obj) {
    let count = 0;
    function traverse(o) {
      if (o && typeof o === 'object') {
        const keys = Array.isArray(o) ? o : Object.keys(o);
        for (const k of (Array.isArray(o) ? o : Object.keys(o))) {
          count++;
          traverse(typeof k === 'object' && k ? k : (Array.isArray(o) ? k : o[k]));
        }
      }
    }
    traverse(obj);
    return count;
  }

  function processJSON(minify) {
    const raw = input.value.trim();
    if (!raw) {
      output.innerHTML = '<span class="error">请输入 JSON 内容</span>';
      info.textContent = '';
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const result = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
      output.textContent = result;
      const keys = countKeys(parsed);
      info.textContent = `✓ 有效 JSON | ${new Blob([raw]).size} 字节 → ${new Blob([result]).size} 字节 | ${keys} 个键`;
    } catch (err) {
      output.innerHTML = `<span class="error">JSON 解析失败: ${err.message}</span>`;
      info.textContent = '';
    }
  }

  formatBtn.addEventListener('click', () => processJSON(false));
  minifyBtn.addEventListener('click', () => processJSON(true));

  async function copyResult() {
    const text = output.textContent;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    const span = document.createElement('span');
    span.className = 'success';
    span.textContent = '✓ 已复制';
    copyBtn.after(span);
    setTimeout(() => span.remove(), 1500);
  }

  function clearAll() {
    input.value = '';
    output.textContent = '';
    info.textContent = '';
  }

  copyBtn.addEventListener('click', copyResult);
  clearBtn.addEventListener('click', clearAll);
})();
