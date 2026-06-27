// js/json-tool.js
(function () {
  const panel = document.getElementById('json-panel');

  panel.innerHTML = `
    <div class="card">
      <label for="json-input">输入 JSON:</label>
      <textarea id="json-input" placeholder='{"key": "value"}'></textarea>
      <div class="btn-row">
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
    function traverse(val) {
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        for (const key of Object.keys(val)) {
          count++;
          traverse(val[key]);
        }
      } else if (Array.isArray(val)) {
        for (const item of val) {
          traverse(item);
        }
      }
    }
    traverse(obj);
    return count;
  }

  function getDataType(val) {
    if (val === null) return 'null';
    if (Array.isArray(val)) return `Array(${val.length})`;
    return typeof val;
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
      const type = getDataType(parsed);
      info.textContent = `✓ 有效 JSON | ${new Blob([raw]).size}B → ${new Blob([result]).size}B | 类型: ${type} | ${keys} 个键`;
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
