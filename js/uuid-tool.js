// js/uuid-tool.js
(function () {
  const panel = document.getElementById('uuid-panel');

  panel.innerHTML = `
    <div class="card">
      <div class="btn-row">
        <button class="btn btn-primary" id="uuid-generate-btn">生成 UUID</button>
        <button class="btn btn-secondary" id="uuid-copy-btn">📋 复制全部</button>
        <button class="btn btn-secondary" id="uuid-clear-btn">清空</button>
      </div>
      <div class="options-row">
        <label>数量:
          <select id="uuid-count">
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
        <label>
          <input type="checkbox" id="uuid-uppercase"> 大写
        </label>
      </div>
      <div class="output-area" id="uuid-output"></div>
      <div class="info" id="uuid-info"></div>
    </div>
  `;

  const generateBtn = document.getElementById('uuid-generate-btn');
  const copyBtn = document.getElementById('uuid-copy-btn');
  const clearBtn = document.getElementById('uuid-clear-btn');
  const output = document.getElementById('uuid-output');
  const countSelect = document.getElementById('uuid-count');
  const uppercaseCheck = document.getElementById('uuid-uppercase');
  const info = document.getElementById('uuid-info');

  function generateUUIDs() {
    const count = parseInt(countSelect.value);
    const uuids = [];
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID();
      if (uppercaseCheck.checked) uuid = uuid.toUpperCase();
      uuids.push(uuid);
    }
    output.textContent = uuids.join('\n');
    info.textContent = `已生成 ${count} 个 UUID v4`;
  }

  async function copyAll() {
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
    output.textContent = '';
    info.textContent = '';
  }

  generateBtn.addEventListener('click', generateUUIDs);
  copyBtn.addEventListener('click', copyAll);
  clearBtn.addEventListener('click', clearAll);
})();
