// js/password-tool.js
(function () {
  const panel = document.getElementById('password-panel');

  panel.innerHTML = `
    <div class="card">
      <div class="options-row">
        <label>长度: <span id="password-length-value">16</span></label>
        <input type="range" id="password-length" min="8" max="64" value="16" style="flex: 1;">
      </div>
      <div class="options-row">
        <label><input type="checkbox" id="password-upper" checked> 大写字母 (A-Z)</label>
        <label><input type="checkbox" id="password-lower" checked> 小写字母 (a-z)</label>
      </div>
      <div class="options-row">
        <label><input type="checkbox" id="password-digits" checked> 数字 (0-9)</label>
        <label><input type="checkbox" id="password-symbols" checked> 特殊字符 (!@#$%^&*)</label>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary" id="password-generate-btn">🔐 生成密码</button>
        <button class="btn btn-secondary" id="password-copy-btn">📋 复制</button>
      </div>
      <div class="output-area" id="password-output" style="font-size: 1.1rem; letter-spacing: 2px;"></div>
      <div class="strength-bar" id="password-strength-bar"></div>
      <div class="info" id="password-info">选择参数后点击生成</div>
    </div>
  `;

  const lengthSlider = document.getElementById('password-length');
  const lengthValue = document.getElementById('password-length-value');
  const upperCheck = document.getElementById('password-upper');
  const lowerCheck = document.getElementById('password-lower');
  const digitsCheck = document.getElementById('password-digits');
  const symbolsCheck = document.getElementById('password-symbols');
  const generateBtn = document.getElementById('password-generate-btn');
  const copyBtn = document.getElementById('password-copy-btn');
  const output = document.getElementById('password-output');
  const strengthBar = document.getElementById('password-strength-bar');
  const info = document.getElementById('password-info');

  lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
  });

  function getStrength(password) {
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 20) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  }

  function generatePassword() {
    let charset = '';
    if (upperCheck.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowerCheck.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (digitsCheck.checked) charset += '0123456789';
    if (symbolsCheck.checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      output.textContent = '';
      info.textContent = '';
      strengthBar.className = 'strength-bar';
      info.innerHTML = '<span class="error">请至少选择一种字符类型</span>';
      return;
    }

    const length = parseInt(lengthSlider.value);
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset[array[i] % charset.length];
    }

    output.textContent = password;
    const strength = getStrength(password);
    strengthBar.className = `strength-bar ${strength}`;
    const labels = { weak: '弱', medium: '中等', strong: '强' };
    info.textContent = `密码强度: ${labels[strength]} | 长度: ${length} | 字符集: ${charset.length} 个字符`;
  }

  async function copyPassword() {
    const text = output.textContent;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    const span = document.createElement('span');
    span.className = 'success';
    span.textContent = '✓ 已复制';
    copyBtn.after(span);
    setTimeout(() => span.remove(), 1500);
  }

  generateBtn.addEventListener('click', generatePassword);
  copyBtn.addEventListener('click', copyPassword);
})();
