// js/obfuscate-tool.js
(function () {
  const panel = document.getElementById('obfuscate-panel');

  panel.innerHTML = `
    <div class="card">
      <label for="obfuscate-input">输入 JavaScript 代码:</label>
      <textarea id="obfuscate-input" placeholder="// 在此粘贴 JavaScript 代码..."></textarea>
      <div class="btn-row" style="margin-top: 12px;">
        <button class="btn btn-primary" id="obfuscate-btn">🔀 混淆</button>
        <button class="btn btn-secondary" id="obfuscate-copy-btn">📋 复制结果</button>
        <button class="btn btn-secondary" id="obfuscate-clear-btn">清空</button>
      </div>
      <div class="output-area" id="obfuscate-output"></div>
      <div class="info" id="obfuscate-info"></div>
    </div>
  `;

  const input = document.getElementById('obfuscate-input');
  const obfuscateBtn = document.getElementById('obfuscate-btn');
  const copyBtn = document.getElementById('obfuscate-copy-btn');
  const clearBtn = document.getElementById('obfuscate-clear-btn');
  const output = document.getElementById('obfuscate-output');
  const info = document.getElementById('obfuscate-info');

  async function loadObfuscator() {
    try {
      const module = await import('https://esm.sh/javascript-obfuscator@4.1.1');
      return module.default;
    } catch (e) {
      throw new Error('无法加载混淆库，请检查网络连接');
    }
  }

  obfuscateBtn.addEventListener('click', async () => {
    const code = input.value.trim();
    if (!code) {
      output.innerHTML = '<span class="error">请输入要混淆的代码</span>';
      return;
    }

    obfuscateBtn.textContent = '⏳ 混淆中...';
    obfuscateBtn.disabled = true;

    try {
      const JavaScriptObfuscator = await loadObfuscator();
      const result = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 0.75,
      });
      output.textContent = result.getObfuscatedCode();
      info.textContent = `原始大小: ${new Blob([code]).size} 字节 | 混淆后: ${new Blob([result.getObfuscatedCode()]).size} 字节`;
    } catch (err) {
      output.innerHTML = `<span class="error">混淆失败: ${err.message}</span>`;
    } finally {
      obfuscateBtn.textContent = '🔀 混淆';
      obfuscateBtn.disabled = false;
    }
  });

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
