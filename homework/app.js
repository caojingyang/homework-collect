// 高二（13）班暑期德育作业收集 - 前端逻辑
// API 地址：由 config.js 中的 API_BASE 定义，若未加载则回退到同源 /api
const API = typeof API_BASE !== 'undefined' ? API_BASE : '/api';
let CONFIG = null;

const state = {
  step: 1,
  homework: null,
  activity: null,
  name: null,
  workName: '',
  areaFiles: {},    // { areaId: [File, ...] }
  psychFile: null,  // 心理感悟文件 (File 对象)
  maxFileSize: 25 * 1024 * 1024, // 默认 25MB，从 API 更新
};

let submitting = false; // 防止重复提交

// ============ 样式注入（进度条 / Toast / 动画 / 勾选）============
function injectStyles() {
  const css = `
@keyframes fadeInUp { from { opacity: 0; } to { opacity: 1; } }
.animate-in { animation: fadeInUp 0.4s ease both; }

.upload-progress-card { text-align: center; }
.upload-progress-title { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.upload-progress-sub { font-size: 13px; color: var(--text-light); margin-bottom: 12px; }
.upload-file-list { text-align: left; background: #fafbfc; border-radius: 10px; padding: 10px 14px; margin: 12px 0; max-height: 180px; overflow-y: auto; }
.upload-file-name { font-size: 13px; color: var(--text); padding: 3px 0; display: flex; align-items: center; gap: 6px; }
.upload-file-name .fsize { color: var(--text-light); font-size: 12px; margin-left: auto; flex-shrink: 0; }
.upload-status { font-size: 12px; font-weight: 600; margin-left: auto; flex-shrink: 0; }
.upload-status.pending { color: var(--text-light); }
.upload-status.uploading { color: var(--primary); }
.upload-status.done { color: var(--success); }
.upload-status.error { color: var(--danger); }
.upload-status.zipping { color: var(--warning); }

.progress-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--text-light); margin-top: 14px; margin-bottom: 6px; }
.progress-bar { position: relative; width: 100%; height: 18px; background: var(--border); border-radius: 9px; overflow: hidden; }
.progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, var(--primary), var(--primary-dark)); border-radius: 9px; transition: width 0.25s ease; }
.progress-text { font-weight: 600; color: var(--primary); }

.toast-container { position: fixed; top: 16px; left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; flex-direction: column; gap: 8px; width: calc(100% - 32px); max-width: 420px; pointer-events: none; }
.toast { pointer-events: auto; padding: 12px 16px; border-radius: 10px; font-size: 14px; font-weight: 500; color: #fff; box-shadow: 0 6px 20px rgba(0,0,0,0.18); animation: toastIn 0.3s ease both; word-break: break-word; }
.toast.error { background: var(--danger); }
.toast.success { background: var(--success); }
.toast.info { background: var(--primary); }
.toast.fade-out { animation: toastOut 0.3s ease both; }
@keyframes toastIn { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes toastOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-14px); } }

.checkmark-wrap { display: flex; justify-content: center; margin-bottom: 12px; }
.checkmark { width: 72px; height: 72px; }
.checkmark-circle { stroke: var(--success); stroke-width: 3; fill: none; stroke-dasharray: 166; stroke-dashoffset: 166; animation: ck-circle 0.6s cubic-bezier(0.65,0,0.45,1) forwards; }
.checkmark-check { stroke: var(--success); stroke-width: 4; fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 48; stroke-dashoffset: 48; animation: ck-check 0.4s cubic-bezier(0.65,0,0.45,1) 0.5s forwards; }
@keyframes ck-circle { to { stroke-dashoffset: 0; } }
@keyframes ck-check { to { stroke-dashoffset: 0; } }

/* ===== 上传选择 Action Sheet（手机端） ===== */
.capture-overlay {
  position: fixed; inset: 0; z-index: 5000;
  background: rgba(0,0,0,0);
  display: flex; align-items: flex-end; justify-content: center;
  transition: background 0.25s ease;
}
.capture-overlay.show { background: rgba(0,0,0,0.45); }
.capture-sheet {
  background: var(--glass-bg-strong, rgba(255,255,255,0.92));
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px 20px 0 0;
  width: 100%; max-width: 500px;
  padding: 8px 0 0;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 -8px 30px rgba(0,0,0,0.15);
  padding-bottom: env(safe-area-inset-bottom, 0);
}
.capture-overlay.show .capture-sheet { transform: translateY(0); }
.capture-sheet-title {
  text-align: center; font-size: 13px; color: var(--text-light, #6b7280);
  padding: 10px 0 6px; font-weight: 500;
}
.capture-option {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: calc(100% - 24px); margin: 0 12px;
  padding: 15px 16px; border: none;
  background: transparent; border-radius: 12px;
  font-size: 16px; font-weight: 600; color: var(--text, #1e1b4b);
  cursor: pointer; transition: background 0.15s ease;
  border-bottom: 1px solid rgba(226,232,240,0.6);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.capture-option:last-child { border-bottom: none; }
.capture-option:active { background: rgba(99,102,241,0.08); }
.capture-option.cancel {
  color: var(--danger, #ef4444);
  margin-top: 8px; border-radius: 12px;
  border-top: 8px solid rgba(238,238,238,0.5);
}

/* ===== 浮动按钮 ===== */
.float-btn {
  position: fixed;
  bottom: 24px;
  z-index: 9000;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  white-space: nowrap;
}
.float-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.25); }
.float-btn:active { transform: translateY(0); }
.float-btn-left {
  left: 20px;
  background: var(--primary, #6366f1);
  color: #fff;
}
.float-btn-right {
  right: 20px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  color: var(--text, #1e1b4b);
  border: 1px solid rgba(99,102,241,0.15);
}
.float-btn-icon { font-size: 18px; }

/* ===== 状态弹窗 ===== */
.status-overlay {
  position: fixed; inset: 0; z-index: 8000;
  background: rgba(0,0,0,0);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.25s ease;
  padding: 16px;
}
.status-overlay.show { background: rgba(0,0,0,0.45); }
.status-modal {
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  width: 100%; max-width: 560px;
  max-height: 85vh;
  display: flex; flex-direction: column;
  transform: scale(0.92);
  transition: transform 0.25s ease;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.status-overlay.show .status-modal { transform: scale(1); }
.status-modal-head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(226,232,240,0.8);
  flex-shrink: 0;
}
.status-modal-head h3 { font-size: 17px; font-weight: 700; }
.status-close-btn {
  width: 32px; height: 32px;
  border: none; border-radius: 50%;
  background: rgba(0,0,0,0.06);
  cursor: pointer; font-size: 15px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
  flex-shrink: 0;
}
.status-close-btn:hover { background: rgba(0,0,0,0.12); }
.status-modal-body { padding: 16px 24px; overflow-y: auto; }
.status-summary {
  display: flex; gap: 20px; flex-wrap: wrap;
  padding-bottom: 14px; margin-bottom: 14px;
  border-bottom: 1px solid rgba(226,232,240,0.6);
}
.status-summary-item { display: flex; flex-direction: column; }
.status-summary-label { font-size: 12px; color: var(--text-light, #6b7280); }
.status-summary-value { font-size: 22px; font-weight: 700; }
.status-hw-group { margin-bottom: 16px; }
.status-hw-title {
  font-size: 15px; font-weight: 700;
  margin-bottom: 8px;
  display: flex; align-items: center; gap: 8px;
}
.status-hw-badge {
  background: rgba(99,102,241,0.12);
  color: var(--primary, #6366f1);
  padding: 2px 10px; border-radius: 20px;
  font-size: 12px; font-weight: 600;
}
.status-act-group { margin-bottom: 12px; }
.status-act-title {
  font-size: 13px; font-weight: 600;
  color: var(--text-light, #6b7280);
  margin-bottom: 6px; padding-left: 4px;
}
.status-person-row {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px;
  border-radius: 10px;
  margin-bottom: 4px;
  transition: background 0.15s;
}
.status-person-row:hover { background: rgba(0,0,0,0.03); }
.status-check-icon {
  width: 22px; height: 22px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  flex-shrink: 0;
}
.status-check-icon.done {
  background: rgba(34,197,94,0.15);
  color: #16a34a;
}
.status-check-icon.pending {
  background: rgba(239,68,68,0.12);
  color: #dc2626;
}
.status-person-name { flex: 1; font-size: 14px; font-weight: 500; }
.status-person-meta { font-size: 12px; color: var(--text-light, #6b7280); flex-shrink: 0; }
.status-loading { text-align: center; padding: 40px; color: var(--text-light, #6b7280); }
.status-spinner {
  width: 32px; height: 32px;
  border: 3px solid rgba(99,102,241,0.2);
  border-top-color: var(--primary, #6366f1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 12px;
}
@keyframes spin { to { transform: rotate(360deg); } }
`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

// ============ 工具函数 ============
function getExt(name) {
  const parts = name.split('.');
  return parts.length < 2 ? '' : parts.pop().toLowerCase();
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / 1048576).toFixed(1) + 'MB';
}

function formatSpeed(bytesPerSec) {
  if (!bytesPerSec || bytesPerSec < 1) return '0 B/s';
  if (bytesPerSec < 1024) return bytesPerSec.toFixed(0) + ' B/s';
  if (bytesPerSec < 1048576) return (bytesPerSec / 1024).toFixed(1) + ' KB/s';
  return (bytesPerSec / 1048576).toFixed(2) + ' MB/s';
}

function cleanWorkName(name) {
  if (!name) return '';
  return name.trim().replace(/[《《\[]/g, '').replace(/[》》\]]/g, '');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// 是否移动端（综合 UA + 触摸 + 屏幕宽度判断，避免触屏笔记本误判）
function isMobile() {
  const ua = navigator.userAgent || '';
  // 1. 移动端 UA 直接判定
  if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)) return true;
  // 2. 触摸支持 + 小屏幕（≤768px）判定为移动端
  const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const smallScreen = window.innerWidth <= 768;
  return hasTouch && smallScreen;
}

// 是否 iOS（iPhone / iPad / iPod Touch）
// iOS WebKit 对 file input 的处理与其他浏览器不同，需要特殊优化
function isIOS() {
  const ua = navigator.userAgent || '';
  return /iphone|ipad|ipod/i.test(ua);
}

// 判断上传区域是否支持图片（接受 image/*）
function areaSupportsImageCapture(area) {
  return (area.accept || '').toLowerCase().includes('image/');
}

// 判断上传区域是否支持视频（接受 .mp4 / .mov / video/*）
function areaSupportsVideoCapture(area) {
  const a = (area.accept || '').toLowerCase();
  return a.includes('.mp4') || a.includes('.mov') || a.includes('video/');
}

// 判断上传区域是否支持相册选择（图片或视频）
function areaSupportsMedia(area) {
  return areaSupportsImageCapture(area) || areaSupportsVideoCapture(area);
}

// 从 area.exts 构建 accept 字符串（使用具体扩展名，不含通配符）
// 这样移动端会唤起文件管理器而非媒体选择器
// 若 exts 缺失则回退到 area.accept，确保不会因字段缺失而报错
function buildFileAcceptFromExts(area) {
  if (!area.exts || !Array.isArray(area.exts) || area.exts.length === 0) {
    return area.accept || '';
  }
  return area.exts.map(e => '.' + e).join(',');
}

// 从 area 中提取相册 accept（image/*, video/*）
function buildGalleryAccept(area) {
  const parts = [];
  if (areaSupportsImageCapture(area)) parts.push('image/*');
  if (areaSupportsVideoCapture(area)) parts.push('video/*');
  return parts.join(',');
}

// 移动端即时响应：移动端用 touchstart（即时），桌面端用 click；
// touchstart 上调用 preventDefault 阻止后续幽灵 click，并以 click 作为兜底。
function fastClick(el, callback) {
  if (!el) return;
  el.style.touchAction = 'manipulation';
  let lastTouch = 0;
  if (isMobile()) {
    el.addEventListener('touchstart', (e) => {
      if (el.disabled) return;
      e.preventDefault();                 // 阻止幽灵 click 与 300ms 延迟
      lastTouch = Date.now();
      callback(e);
    }, { passive: false });
  }
  el.addEventListener('click', (e) => {
    if (el.disabled) return;
    if (Date.now() - lastTouch < 500) return; // 忽略 touchstart 之后的幽灵 click
    callback(e);
  });
}

// ============ 配置读取辅助 ============
function getHwConfig() {
  return CONFIG.homeworks[state.homework];
}
function getActConfig() {
  const hw = getHwConfig();
  if (!hw || !hw.hasActivity) return null;
  return hw.activities[state.activity];
}
function getAreas() {
  const hw = getHwConfig();
  if (!hw) return [];
  if (hw.hasActivity) {
    const act = getActConfig();
    return act ? act.areas : [];
  }
  return hw.areas || [];
}
function getNames() {
  const hw = getHwConfig();
  if (!hw) return [];
  if (hw.hasActivity) {
    const act = getActConfig();
    return act ? act.names : [];
  }
  return hw.names || [];
}

// 需要作品名称
function needsWorkName() {
  const act = getActConfig();
  return act && act.needsWorkName;
}

// 步骤数
function totalSteps() {
  const hw = getHwConfig();
  return hw && hw.hasActivity ? 4 : 3;
}

// ============ Toast 通知 ============
function ensureToastContainer() {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

function showToast(msg, type = 'error') {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 300);
  }, 3500);
}

// ============ 入场动画 ============
function triggerAnimation(el) {
  if (!el) return;
  el.classList.remove('animate-in');
  void el.offsetWidth; // 强制回流以重启动画
  el.classList.add('animate-in');
  clearTimeout(el._animTimer);
  el._animTimer = setTimeout(() => {
    el.classList.remove('animate-in');
  }, 450);
}

// ============ 渲染步骤指示器 ============
function renderSteps() {
  const el = document.getElementById('steps');
  const total = totalSteps();
  const labels = getHwConfig()?.hasActivity
    ? ['作业类别', '活动选择', '身份确认', '作品上传']
    : ['作业类别', '身份确认', '作品上传'];

  let html = '';
  for (let i = 1; i <= total; i++) {
    const cls = i === state.step ? 'active' : i < state.step ? 'done' : '';
    html += `<div class="step ${cls}"><span class="step-num">${i < state.step ? '✓' : i}</span><span>${labels[i - 1]}</span></div>`;
    if (i < total) html += '<div class="step-line"></div>';
  }
  el.innerHTML = html;
}

// ============ 渲染主流程 ============
// 移动端点击穿透防护：render() 后短暂屏蔽所有 click 事件，
// 防止 touchstart 触发的 DOM 替换后，浏览器在相同坐标触发新元素的 click
let _clickGuard = null;

function render() {
  renderSteps();
  const content = document.getElementById('content');
  const hw = getHwConfig();

  if (state.step === 1) {
    content.innerHTML = renderHomeworkStep();
  } else if (state.step === 2 && hw?.hasActivity) {
    content.innerHTML = renderActivityStep();
  } else if ((state.step === 2 && !hw?.hasActivity) || (state.step === 3 && hw?.hasActivity)) {
    content.innerHTML = renderNameStep();
  } else {
    content.innerHTML = renderUploadStep();
  }

  attachListeners();
  triggerAnimation(content);

  // 移动端：放置透明遮罩层吸收 render() 后 350ms 内的残余 click 事件
  // 防止 touchstart 触发页面切换后，浏览器在相同坐标误触新元素
  if (isMobile()) {
    if (_clickGuard) _clickGuard.remove();
    _clickGuard = document.createElement('div');
    _clickGuard.style.cssText = 'position:fixed;inset:0;z-index:9998;cursor:default;';
    document.body.appendChild(_clickGuard);
    const guard = _clickGuard;
    setTimeout(() => {
      if (guard.parentNode) guard.remove();
      if (_clickGuard === guard) _clickGuard = null;
    }, 350);
  }
}

// Step 1: 选择作业
function renderHomeworkStep() {
  const keys = Object.keys(CONFIG.homeworks);
  return `
    <div class="card">
      <div class="section-title">请选择您要提交的作业类别</div>
      <div class="option-grid cols-3">
        ${keys.map(k => `
          <button class="option-btn ${state.homework === k ? 'selected' : ''}" data-homework="${k}">${k}</button>
        `).join('')}
      </div>
    </div>
    <button class="btn btn-primary" id="next-btn" ${state.homework ? '' : 'disabled'}>继续</button>
  `;
}

// Step 2: 选择活动
function renderActivityStep() {
  const hw = getHwConfig();
  const keys = Object.keys(hw.activities);
  return `
    <div class="card">
      <div class="section-title">${state.homework} - 请选择您参与的具体活动</div>
      <div class="option-grid cols-${keys.length}">
        ${keys.map(k => `
          <button class="option-btn ${state.activity === k ? 'selected' : ''}" data-activity="${k}">${k}</button>
        `).join('')}
      </div>
    </div>
    <div class="btn-row">
      <button class="btn btn-secondary" id="prev-btn">返回</button>
      <button class="btn btn-primary" id="next-btn" ${state.activity ? '' : 'disabled'}>继续</button>
    </div>
  `;
}

// Step 3: 选择姓名
function renderNameStep() {
  const names = getNames();
  return `
    <div class="card">
      <div class="section-title">请确认提交者身份</div>
      <select class="name-select" id="name-select">
        <option value="">选择您的姓名...</option>
        ${names.map(n => `<option value="${n}" ${state.name === n ? 'selected' : ''}>${n}</option>`).join('')}
      </select>
    </div>
    <div class="btn-row">
      <button class="btn btn-secondary" id="prev-btn">返回</button>
      <button class="btn btn-primary" id="next-btn" ${state.name ? '' : 'disabled'}>继续</button>
    </div>
  `;
}

// Step 4: 上传文件
function renderUploadStep() {
  const areas = getAreas();
  const wn = needsWorkName();
  let html = '<div id="alert-area"></div>';

  // 作品名称输入
  if (wn) {
    html += `
      <div class="card">
        <label class="input-label">作品名称</label>
        <input type="text" class="text-input" id="work-name" placeholder="请输入作品名称" value="${escapeHtml(state.workName)}">
        <div class="input-hint">如已添加书名号，系统将自动处理，无需重复添加</div>
      </div>
    `;
  }

  // 各区域上传
  for (const area of areas) {
    html += renderUploadZone(area);
  }

  html += `
    <div class="btn-row">
      <button class="btn btn-secondary" id="prev-btn">返回</button>
      <button class="btn btn-primary" id="submit-btn">提交作品</button>
    </div>
  `;

  return html;
}

// 渲染单个上传区域
function renderUploadZone(area) {
  const files = state.areaFiles[area.id] || [];
  const hasFiles = files.length > 0;
  const mobile = isMobile();
  const canCapture = mobile && areaSupportsMedia(area);

  let html = `<div class="card" data-area="${area.id}">`;
  html += `<div class="section-title">${area.label}</div>`;
  html += `<div class="upload-hint">${area.hint}</div>`;
  html += `<div class="upload-area ${hasFiles ? 'has-file' : ''}" id="drop-${area.id}">`;
  html += `<div class="upload-icon">📎</div>`;
  // 手机端不显示拖拽提示；支持照片/视频时提示"点击选择照片或文件"
  if (mobile) {
    if (canCapture) {
      html += `<div class="upload-text"><strong>点击选择照片或文件</strong></div>`;
    } else {
      html += `<div class="upload-text"><strong>点击选取文件</strong></div>`;
    }
  } else {
    html += `<div class="upload-text"><strong>点击选取文件</strong> 或将文件拖拽至此</div>`;
  }
  // 所有设备统一使用具体扩展名（如 .jpg,.png,.mp4,.docx,.pdf）
  // 不使用通配符（如 image/*），避免部分浏览器将文件选择器限制为仅显示图片
  const fileAccept = buildFileAcceptFromExts(area);
  html += `<input type="file" id="input-${area.id}" ${area.multiple ? 'multiple' : ''} accept="${fileAccept}" style="display:none">`;
  html += `</div>`;

  // 文件列表
  if (files.length > 0) {
    html += '<div class="file-list">';
    files.forEach((f, idx) => {
      html += `
        <div class="file-item">
          <span class="file-name">📄 ${f.name}</span>
          <span class="file-size">${formatSize(f.size)}</span>
          <button class="file-remove" data-area="${area.id}" data-idx="${idx}">✕</button>
        </div>
      `;
    });
    html += '</div>';
  }

  // 心理感悟选择（作业2活动二，2个文件时）
  if (area.needsPsychSelect && files.length === 2) {
    html += `
      <div class="psych-select">
        <label>请选择哪个文件是"心理感悟"</label>
        <div class="psych-options">
          ${files.map((f, idx) => `
            <label class="psych-option">
              <input type="radio" name="psych" value="${idx}" ${state.psychFile === f ? 'checked' : ''}>
              <span>📄 ${f.name}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  html += '</div>';
  return html;
}

// ============ 事件绑定 ============
function attachListeners() {
  // 选择作业
  document.querySelectorAll('[data-homework]').forEach(btn => {
    fastClick(btn, () => {
      state.homework = btn.dataset.homework;
      state.activity = null;
      state.name = null;
      state.areaFiles = {};
      render();
    });
  });

  // 选择活动
  document.querySelectorAll('[data-activity]').forEach(btn => {
    fastClick(btn, () => {
      state.activity = btn.dataset.activity;
      state.name = null;
      state.areaFiles = {};
      render();
    });
  });

  // 选择姓名
  const nameSelect = document.getElementById('name-select');
  if (nameSelect) {
    nameSelect.onchange = () => {
      state.name = nameSelect.value;
      const next = document.getElementById('next-btn');
      if (next) next.disabled = !state.name;
    };
  }

  // 作品名称
  const workNameInput = document.getElementById('work-name');
  if (workNameInput) {
    workNameInput.oninput = () => {
      state.workName = workNameInput.value;
    };
  }

  // 文件上传区域
  const mobile = isMobile();
  const areas = getAreas();
  for (const area of areas) {
    const dropZone = document.getElementById(`drop-${area.id}`);
    const fileInput = document.getElementById(`input-${area.id}`);
    if (!dropZone || !fileInput) continue;

    fileInput.onchange = (e) => {
      hideFilePickerLoading();
      handleFiles(area, e.target.files);
    };

    // iOS 上若用户取消选择（未触发 onchange），通过 focus 事件检测返回
    window.addEventListener('focus', () => {
      setTimeout(() => hideFilePickerLoading(), 500);
    }, { once: true });

    if (mobile && areaSupportsMedia(area)) {
      // 手机端 + 支持照片/视频：弹出选择 Action Sheet（从相册 / 从手机文件）
      // 使用 click 事件而非 fastClick(touchstart)，因为 iOS WebKit 仅允许在 click 事件中触发 file input
      dropZone.addEventListener('click', () => {
        showCaptureSheet(area, (action) => {
          if (action === 'cancel' || !action) return;
          if (action === 'gallery') {
            // 从相册选择：使用 image/* 或 video/* 通配符唤起相册
            triggerGalleryInput(area);
          } else if (action === 'file') {
            // 从手机文件中选择：静态 input 已使用具体扩展名，直接点击唤起文件管理器
            if (isIOS()) showFilePickerLoading();
            fileInput.click();
          }
        });
      });
    } else {
      // 电脑端或不支持照片/视频的区域：使用 click 事件直接打开文件选择器
      // 不使用 fastClick(touchstart)，因为 iOS WebKit 不允许在 touchstart 中触发 file input
      dropZone.addEventListener('click', () => {
        if (isIOS()) showFilePickerLoading();
        fileInput.click();
      });
    }

    // 拖拽上传：仅电脑端绑定
    if (!mobile) {
      dropZone.ondragover = (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      };
      dropZone.ondragleave = () => dropZone.classList.remove('dragover');
      dropZone.ondrop = (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(area, e.dataTransfer.files);
      };
    }
  }

  // 删除文件
  document.querySelectorAll('.file-remove').forEach(btn => {
    fastClick(btn, () => {
      const areaId = btn.dataset.area;
      const idx = parseInt(btn.dataset.idx);
      const files = state.areaFiles[areaId] || [];
      const removed = files[idx];
      if (state.psychFile === removed) state.psychFile = null;
      files.splice(idx, 1);
      state.areaFiles[areaId] = files;
      render();
    });
  });

  // 心理感悟选择
  document.querySelectorAll('input[name="psych"]').forEach(radio => {
    radio.onchange = () => {
      const idx = parseInt(radio.value);
      const photoArea = getAreas().find(a => a.needsPsychSelect);
      if (photoArea) {
        const files = state.areaFiles[photoArea.id] || [];
        state.psychFile = files[idx] || null;
      }
    };
  });

  // 下一步
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) {
    fastClick(nextBtn, () => {
      if (nextBtn.disabled) return;
      if (validateCurrentStep()) {
        state.step++;
        render();
        window.scrollTo(0, 0);
      }
    });
  }

  // 上一步
  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) {
    fastClick(prevBtn, () => {
      state.step--;
      render();
      window.scrollTo(0, 0);
    });
  }

  // 提交
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    fastClick(submitBtn, submitFiles);
  }

  // 为所有交互元素添加 touchAction，消除移动端点击延迟
  document.querySelectorAll('button, select, input, label.psych-option, .option-btn, .upload-area, .file-remove, .btn').forEach(el => {
    el.style.touchAction = 'manipulation';
  });
}

// ============ 处理文件选择 ============
function handleFiles(area, fileList) {
  const files = Array.from(fileList);
  const existing = state.areaFiles[area.id] || [];

  for (const f of files) {
    const ext = getExt(f.name);

    // 验证扩展名
    if (!isFileAllowed(f, area)) {
      showAlert(`文件 "${f.name}" 格式不支持，请上传：${area.hint}`, 'error');
      return; // 停止上传
    }

    // 验证大小
    if (f.size > state.maxFileSize) {
      const limitMB = Math.round(state.maxFileSize / (1024 * 1024));
      showAlert(`文件 "${f.name}" 超过 ${limitMB}MB 限制`, 'error');
      return;
    }

    // 检查单文件扩展名（如 docx, pdf, pptx 只能一个）
    if (area.singleExts && area.singleExts.includes(ext)) {
      const hasSame = existing.some(ef => getExt(ef.name) === ext);
      if (hasSame) {
        showAlert(`${area.label}中 .${ext} 文件仅允许上传一个`, 'error');
        return;
      }
    }

    existing.push(f);
  }

  // 检查最大文件数
  if (existing.length > area.maxFiles) {
    showAlert(`${area.label}最多上传 ${area.maxFiles} 个文件`, 'error');
    existing.splice(area.maxFiles);
  }

  state.areaFiles[area.id] = existing;
  render();
}

// 检查文件是否允许
// 优先使用 area.exts（与服务端验证一致），缺失时回退到解析 area.accept
function isFileAllowed(file, area) {
  const ext = getExt(file.name);
  if (!ext) return false;

  // 优先使用 exts 数组（与服务端 isExtAllowed 逻辑一致）
  if (area.exts && Array.isArray(area.exts) && area.exts.length > 0) {
    return area.exts.includes(ext);
  }

  // 回退：解析 area.accept 字符串
  if (area.accept && area.accept.includes('image/')) {
    const imgExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'heic'];
    if (imgExts.includes(ext)) return true;
  }

  const extList = (area.accept || '')
    .split(',')
    .map(s => s.trim().replace(/^\./, '').toLowerCase())
    .filter(s => !s.includes('/'));

  return extList.includes(ext);
}

// ============ 上传选择 Action Sheet（手机端） ============
// 使用回调而非 Promise，确保 input.click() 在用户手势（click 事件）内同步调用
// iOS WebKit 仅允许在 click 事件中触发 file input，touchstart 或 Promise 回调中均无效
function showCaptureSheet(area, callback) {
    const overlay = document.createElement('div');
    overlay.className = 'capture-overlay';

    let optionsHtml = '<div class="capture-sheet-title">选择上传方式</div>';
    optionsHtml += `<button class="capture-option" data-action="gallery">🖼️ 从相册中选择</button>`;
    optionsHtml += `<button class="capture-option" data-action="file">📁 从手机文件中选择</button>`;
    optionsHtml += `<button class="capture-option cancel" data-action="cancel">取消</button>`;

    overlay.innerHTML = `<div class="capture-sheet">${optionsHtml}</div>`;
    document.body.appendChild(overlay);

    // 触发入场动画
    requestAnimationFrame(() => overlay.classList.add('show'));

    function close(action) {
      overlay.classList.remove('show');
      // 同步调用回调，保持在用户手势链内
      callback(action);
      // 延迟移除 DOM 元素，等待动画完成
      setTimeout(() => {
        if (overlay.parentNode) overlay.remove();
      }, 300);
    }

    overlay.querySelectorAll('.capture-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        close(btn.dataset.action);
      });
    });

    // 点击遮罩层取消
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close('cancel');
    });
}

// ============ iOS 文件选择器加载提示 ============
// iOS 上点击 file input 后，文件选择器有 1-2 秒的延迟才弹出
// 在此期间显示加载提示，避免用户以为点击无效而重复点击
let _filePickerOverlay = null;

function showFilePickerLoading() {
  if (_filePickerOverlay) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 6000;
    background: rgba(0,0,0,0.3);
    display: flex; align-items: center; justify-content: center;
    animation: fadeInUp 0.2s ease;
  `;
  overlay.innerHTML = `
    <div style="
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 28px 36px;
      display: flex; flex-direction: column; align-items: center; gap: 14px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    ">
      <div style="
        width: 36px; height: 36px;
        border: 3px solid #e0e0e0;
        border-top-color: var(--primary, #6366f1);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      "></div>
      <div style="font-size: 14px; font-weight: 600; color: var(--text, #1e1b4b);">
        正在打开文件选择器...
      </div>
      <div style="font-size: 12px; color: var(--text-light, #6b7280);">
        iOS 设备可能需要 1-2 秒，请稍候
      </div>
    </div>
    <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
  `;
  document.body.appendChild(overlay);
  _filePickerOverlay = overlay;
}

function hideFilePickerLoading() {
  if (_filePickerOverlay) {
    _filePickerOverlay.remove();
    _filePickerOverlay = null;
  }
}

// 动态创建 input 触发相册选择（不使用 capture 属性，唤起相册而非相机）
function triggerGalleryInput(area) {
  const input = document.createElement('input');
  input.type = 'file';
  // 使用 image/* 或 video/* 通配符，移动端会唤起相册选择器
  input.accept = buildGalleryAccept(area);
  if (area.multiple) input.multiple = true;
  input.style.display = 'none';
  input.onchange = (e) => {
    hideFilePickerLoading();
    handleFiles(area, e.target.files);
    input.remove();
  };
  // iOS 上若用户取消选择（未触发 onchange），通过 focus 事件检测返回
  window.addEventListener('focus', () => {
    setTimeout(() => hideFilePickerLoading(), 500);
  }, { once: true });
  document.body.appendChild(input);
  if (isIOS()) showFilePickerLoading();
  input.click();
}

// ============ 验证当前步骤 ============
function validateCurrentStep() {
  const hw = getHwConfig();
  if (state.step === 1 && !state.homework) {
    showAlert('请选择您要提交的作业类别', 'error');
    return false;
  }
  if (state.step === 2 && hw?.hasActivity && !state.activity) {
    showAlert('请选择您参与的具体活动', 'error');
    return false;
  }
  if ((state.step === 2 && !hw?.hasActivity) || (state.step === 3 && hw?.hasActivity)) {
    if (!state.name) {
      showAlert('请确认提交者身份', 'error');
      return false;
    }
  }
  return true;
}

// ============ 上传进度 UI ============
function renderUploadProgress(items) {
  return `
    <div class="card upload-progress-card">
      <div class="upload-progress-title">正在安全上传您的作品...</div>
      <div class="upload-progress-sub">直传至云端存储，请保持网络连接</div>
      <div class="upload-file-list" id="upload-file-list">
        ${items.map((item, i) => `
          <div class="upload-file-name" id="upload-item-${i}">
            <span>📄 ${escapeHtml(item.filename)}</span>
            <span class="upload-status pending" id="upload-status-${i}">等待中</span>
          </div>
        `).join('')}
      </div>
      <div class="progress-row">
        <span>总进度</span>
        <span class="progress-text" id="progress-text">0%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" id="progress-fill" style="width:0%"></div>
      </div>
    </div>
  `;
}

function updateItemStatus(idx, status, text) {
  const el = document.getElementById(`upload-status-${idx}`);
  if (el) {
    el.className = `upload-status ${status}`;
    el.textContent = text;
  }
}

function updateTotalProgress(percent) {
  const fill = document.getElementById('progress-fill');
  const text = document.getElementById('progress-text');
  if (fill) fill.style.width = percent + '%';
  if (text) text.textContent = percent + '%';
}

// ============ 直传 Cloudinary（XHR 带实时进度）============
function uploadToCloudinary(uploadUrl, params, blob, filename, onProgress) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', blob, filename);
    for (const [k, v] of Object.entries(params)) {
      formData.append(k, v);
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadUrl);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      try {
        const result = JSON.parse(xhr.responseText);
        if (result.error) {
          reject(new Error(result.error.message || '上传失败'));
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(new Error(`上传失败（HTTP ${xhr.status}）`));
      }
    };

    xhr.onerror = () => reject(new Error('网络连接失败，请检查网络后重试'));
    xhr.ontimeout = () => reject(new Error('上传超时，请重试'));

    xhr.send(formData);
  });
}

// ============ 提交文件（直传 Cloudinary）============
async function submitFiles() {
  if (submitting) return;
  const areas = getAreas();

  // 验证作品名称
  if (needsWorkName() && !state.workName.trim()) {
    showAlert('请输入作品名称', 'error');
    return;
  }

  // 验证每个区域至少有一个文件
  let hasAnyFile = false;
  for (const area of areas) {
    const files = state.areaFiles[area.id] || [];
    if (files.length > 0) {
      hasAnyFile = true;
    } else {
      if (areas.length > 1) {
        showAlert(`请上传"${area.label}"的文件`, 'error');
        return;
      }
    }
  }

  if (!hasAnyFile) {
    showAlert('请至少上传一个文件', 'error');
    return;
  }

  // 心理感悟选择验证
  for (const area of areas) {
    if (area.needsPsychSelect) {
      const files = state.areaFiles[area.id] || [];
      if (files.length === 2 && !state.psychFile) {
        showAlert('请选择哪个文件是"心理感悟"', 'error');
        return;
      }
    }
  }

  // 收集所有文件，建立全局索引
  const allFiles = [];
  const areaFilesMap = {};
  let psychIndex = -1;

  for (const area of areas) {
    const files = state.areaFiles[area.id] || [];
    const indices = [];
    for (const f of files) {
      const globalIdx = allFiles.length;
      allFiles.push(f);
      indices.push(globalIdx);
      if (state.psychFile === f) {
        psychIndex = globalIdx;
      }
    }
    if (indices.length > 0) {
      areaFilesMap[area.id] = indices;
    }
  }

  submitting = true;

  // 检查存储类型：如果 maxFileSize > 10MB，使用直传模式（R2/KV）
  if (CONFIG && CONFIG.maxFileSize > 10 * 1024 * 1024) {
    return submitDirectUpload(allFiles, areaFilesMap, psychIndex);
  }

  // 构建文件元数据（不含实际文件数据，减少传输量）
  const fileMetas = allFiles.map(f => ({ name: f.name, size: f.size }));

  // Step 1: 调用 prepare 获取上传签名
  let prepData;
  try {
    const prepRes = await fetch(`${API}/upload/prepare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        homework: state.homework,
        activity: state.activity || '',
        name: state.name,
        workName: cleanWorkName(state.workName),
        files: fileMetas,
        areaFiles: areaFilesMap,
        psychIndex,
      }),
    });
    prepData = await prepRes.json();
  } catch (e) {
    submitting = false;
    showAlert(`准备上传失败：${e.message}`, 'error');
    return;
  }

  if (!prepData.success) {
    submitting = false;
    showAlert(prepData.error || '准备上传失败', 'error');
    return;
  }

  // 显示上传进度 UI
  const items = prepData.items;
  document.getElementById('content').innerHTML = renderUploadProgress(items);

  // Step 2: 逐个直传到 Cloudinary
  const uploadResults = [];
  let totalUploaded = 0;
  let totalSize = 0;

  // 预计算总大小
  for (const item of items) {
    if (item.type === 'file') {
      totalSize += allFiles[item.sourceIdx].size;
    } else if (item.type === 'zip') {
      // zip 大小预估为所有源文件大小之和（实际会因压缩而变化）
      for (const entry of item.zipEntries) {
        totalSize += allFiles[entry.sourceIdx].size;
      }
    }
  }

  try {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let blob, uploadFilename;

      if (item.type === 'file') {
        // 直接上传源文件
        const sourceFile = allFiles[item.sourceIdx];
        blob = sourceFile;
        uploadFilename = item.filename;
        updateItemStatus(i, 'uploading', '上传中 0%');
      } else if (item.type === 'zip') {
        // 客户端创建 zip
        updateItemStatus(i, 'zipping', '正在打包...');
        const zipContents = {};
        for (const entry of item.zipEntries) {
          const sourceFile = allFiles[entry.sourceIdx];
          const buf = await sourceFile.arrayBuffer();
          zipContents[entry.name] = new Uint8Array(buf);
        }
        const zipped = fflate.zipSync(zipContents);
        blob = new Blob([zipped], { type: 'application/zip' });
        uploadFilename = item.filename;
        updateItemStatus(i, 'uploading', '上传中 0%');
      }

      // 上传到 Cloudinary
      const itemBaseSize = blob.size;
      const result = await uploadToCloudinary(
        item.uploadUrl,
        item.uploadParams,
        blob,
        uploadFilename,
        (percent) => {
          updateItemStatus(i, 'uploading', `上传中 ${percent}%`);
          // 更新总进度
          const itemUploaded = itemBaseSize * percent / 100;
          const overallPercent = totalSize > 0
            ? Math.round(((totalUploaded + itemUploaded) / totalSize) * 100)
            : 0;
          updateTotalProgress(overallPercent);
        }
      );

      totalUploaded += itemBaseSize;
      uploadResults.push({
        key: item.key,
        size: result.bytes || itemBaseSize,
        secure_url: result.secure_url,
        format: result.format,
      });

      updateItemStatus(i, 'done', '✓ 完成');
      updateTotalProgress(Math.round(((i + 1) / items.length) * 100));
    }

    // Step 3: 通知服务器上传完成
    const completeRes = await fetch(`${API}/upload/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        homework: state.homework,
        items: uploadResults,
      }),
    });
    const completeData = await completeRes.json();

    if (completeData.success) {
      // 合并 prepare 和 complete 的数据
      renderSuccess({
        ...completeData,
        backup: prepData.backup,
        afterSubmitMsg: prepData.afterSubmitMsg,
      });
    } else {
      render();
      showAlert(completeData.error || '上传完成但记录失败', 'error');
    }
  } catch (e) {
    render();
    showAlert(`上传出错：${e.message}`, 'error');
  } finally {
    submitting = false;
  }
}

// ============ 分块上传模式（KV 存储后端，并行多线程上传）============
async function submitDirectUpload(allFiles, areaFilesMap, psychIndex) {
  const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB per chunk（CloudBase 6MB 限制下安全）
  const MAX_CONCURRENT_CHUNKS = 5; // 每个文件最多并发上传5个分块
  const MAX_RETRIES = 5; // 每个分块最多重试 5 次
  const RETRY_BASE_DELAY = 800; // 初始重试延迟（毫秒），指数退避

  // Step 1: 调用 prepare 获取文件存储路径
  const fileMetas = allFiles.map(f => ({ name: f.name, size: f.size }));

  let prepData;
  try {
    const prepRes = await fetch(`${API}/upload/prepare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        homework: state.homework,
        activity: state.activity || '',
        name: state.name,
        workName: cleanWorkName(state.workName),
        files: fileMetas,
        areaFiles: areaFilesMap,
        psychIndex,
      }),
    });
    prepData = await prepRes.json();
  } catch (e) {
    submitting = false;
    showAlert(`准备上传失败：${e.message}`, 'error');
    return;
  }

  if (!prepData.success) {
    submitting = false;
    showAlert(prepData.error || '准备上传失败', 'error');
    return;
  }

  const items = prepData.items;
  const serverChunkSize = prepData.chunkSize || CHUNK_SIZE;

  // 预计算总大小和准备 blob
  let totalSize = 0;
  const itemBlobs = [];

  for (const item of items) {
    let blob;
    if (item.type === 'file') {
      blob = allFiles[item.sourceIdx];
    } else if (item.type === 'zip') {
      const zipContents = {};
      for (const entry of item.zipEntries) {
        const buf = await allFiles[entry.sourceIdx].arrayBuffer();
        zipContents[entry.name] = new Uint8Array(buf);
      }
      blob = new Blob([fflate.zipSync(zipContents)], { type: 'application/zip' });
    }
    itemBlobs.push(blob);
    totalSize += blob.size;
  }

  // 显示上传进度 UI（含速度显示）
  document.getElementById('content').innerHTML = `
    <div class="card upload-progress-card animate-in">
      <div class="upload-progress-title">正在上传文件...</div>
      <div class="upload-progress-sub">${items.length} 个文件，共 ${formatSize(totalSize)}</div>
      <div class="upload-file-list" id="uploadFileList">
        ${items.map((item, i) => `
          <div class="upload-file-name" id="file-row-${i}">
            <span>${item.filename || item.key.split('/').pop()}</span>
            <span class="fsize">${formatSize(itemBlobs[i].size)}</span>
            <span class="upload-status pending" id="file-status-${i}">等待中</span>
          </div>
        `).join('')}
      </div>
      <div class="progress-row">
        <span>总进度</span>
        <span class="progress-detail" id="uploadProgressDetail">${formatSize(0)} / ${formatSize(totalSize)}  ·  0 B/s  ·  0%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" id="uploadProgressBar" style="width: 0%"></div>
      </div>
    </div>
  `;

  const uploadStartTime = Date.now();
  let uploadedBytes = 0;

  function updateProgress() {
    const percent = totalSize > 0 ? Math.round((uploadedBytes / totalSize) * 100) : 0;
    const elapsed = (Date.now() - uploadStartTime) / 1000;
    const speed = elapsed > 0 ? uploadedBytes / elapsed : 0;
    const fillEl = document.getElementById('uploadProgressBar');
    const detailEl = document.getElementById('uploadProgressDetail');
    if (fillEl) fillEl.style.width = percent + '%';
    if (detailEl) detailEl.textContent = `${formatSize(uploadedBytes)} / ${formatSize(totalSize)}  ·  ${formatSpeed(speed)}  ·  ${percent}%`;
  }

  // 上传单个分块（带指数退避重试 + 超时控制）
  async function uploadSingleChunk(fileKey, chunkIndex, chunkBlob) {
    let lastError = null;
    const chunkTimeout = 120000; // 单分片超时 120 秒

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), chunkTimeout);
      try {
        const formData = new FormData();
        formData.append('fileKey', fileKey);
        formData.append('chunkIndex', chunkIndex);
        formData.append('data', chunkBlob);

        const chunkRes = await fetch(`${API}/upload/chunk`, {
          method: 'POST',
          body: formData,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        const chunkData = await chunkRes.json();
        if (chunkData.success) {
          return chunkBlob.size;
        }
        lastError = new Error(chunkData.error || `块 ${chunkIndex + 1} 上传失败`);
      } catch (e) {
        clearTimeout(timeoutId);
        if (e.name === 'AbortError') {
          lastError = new Error(`块 ${chunkIndex + 1} 上传超时`);
        } else {
          lastError = e;
        }
      }
      if (attempt < MAX_RETRIES) {
        // 指数退避：800ms → 1.6s → 3.2s → 6.4s → 12.8s
        const delay = RETRY_BASE_DELAY * Math.pow(2, attempt);
        await new Promise(r => setTimeout(r, delay));
      }
    }
    throw lastError;
  }

  const uploadFileInfos = [];

  // Step 2: 逐文件上传（每个文件内并行上传分块）
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const blob = itemBlobs[i];
    const chunkCount = Math.ceil(blob.size / serverChunkSize);

    const statusEl = document.getElementById(`file-status-${i}`);
    if (statusEl) {
      statusEl.className = 'upload-status uploading';
      statusEl.textContent = '上传中';
    }

    if (chunkCount <= 1) {
      // 小文件直接上传（不分块）
      try {
        const size = await uploadSingleChunk(item.key, 0, blob);
        uploadedBytes += size;
        updateProgress();
      } catch (e) {
        if (statusEl) {
          statusEl.className = 'upload-status error';
          statusEl.textContent = '失败';
        }
        render();
        showAlert(`文件 "${item.filename}" 上传失败：${e.message}`, 'error');
        submitting = false;
        return;
      }
    } else {
      // 大文件：并行上传分块
      const chunkUploads = [];
      for (let c = 0; c < chunkCount; c++) {
        const start = c * serverChunkSize;
        const end = Math.min(start + serverChunkSize, blob.size);
        const chunkBlob = blob.slice(start, end);
        chunkUploads.push({ index: c, blob: chunkBlob, size: end - start });
      }

      // 使用并发池模式上传分块
      let chunkIdx = 0;
      let fileFailed = false;
      let fileError = null;

      async function chunkWorker() {
        while (chunkIdx < chunkUploads.length && !fileFailed) {
          const task = chunkUploads[chunkIdx++];
          try {
            await uploadSingleChunk(item.key, task.index, task.blob);
            uploadedBytes += task.size;
            updateProgress();

            // 更新文件状态
            const filePercent = Math.round(((chunkIdx) / chunkCount) * 100);
            if (statusEl) statusEl.textContent = `上传中 ${filePercent}%`;
          } catch (e) {
            fileFailed = true;
            fileError = e;
          }
        }
      }

      // 启动 MAX_CONCURRENT_CHUNKS 个 worker
      const workers = [];
      for (let w = 0; w < Math.min(MAX_CONCURRENT_CHUNKS, chunkCount); w++) {
        workers.push(chunkWorker());
      }
      await Promise.all(workers);

      if (fileFailed) {
        if (statusEl) {
          statusEl.className = 'upload-status error';
          statusEl.textContent = '失败';
        }
        render();
        showAlert(`文件 "${item.filename}" 上传失败：${fileError.message}`, 'error');
        submitting = false;
        return;
      }
    }

    if (statusEl) {
      statusEl.className = 'upload-status done';
      statusEl.textContent = '完成';
    }

    const ext = (item.filename || item.key.split('/').pop()).split('.').pop().toLowerCase();
    const contentTypes = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif',
      webp: 'image/webp', bmp: 'image/bmp', heic: 'image/heic',
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      mp4: 'video/mp4', mov: 'video/quicktime', zip: 'application/zip',
    };

    uploadFileInfos.push({
      key: item.key,
      size: blob.size,
      chunkCount,
      contentType: contentTypes[ext] || 'application/octet-stream',
    });
  }

  // Step 3: 调用 finalize 完成上传
  let finalizeData;
  try {
    const finalizeRes = await fetch(`${API}/upload/finalize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        homework: state.homework,
        activity: state.activity || '',
        name: state.name,
        workName: cleanWorkName(state.workName),
        files: uploadFileInfos,
      }),
    });
    finalizeData = await finalizeRes.json();
  } catch (e) {
    render();
    showAlert(`完成上传失败：${e.message}`, 'error');
    submitting = false;
    return;
  }

  if (finalizeData.success) {
    renderSuccess(finalizeData);
  } else {
    render();
    showAlert(finalizeData.error || '完成上传失败', 'error');
  }
  submitting = false;
}

// ============ 渲染成功页面 ============
function renderSuccess(data) {
  renderSteps();
  let html = `
    <div class="card success-box">
      <div class="checkmark-wrap">
        <svg class="checkmark" viewBox="0 0 52 52">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark-check" fill="none" d="M14 27l5.917 4.917L37 16"/>
        </svg>
      </div>
      <div class="success-title">上传成功！</div>
      <div class="success-msg">
        已成功提交 ${data.files.length} 个文件<br>
        ${data.files.map(f => `<div style="font-size:13px;color:var(--text-light);margin:2px 0;">${f}</div>`).join('')}
      </div>
  `;

  if (data.backup) {
    html += `
      <div class="alert alert-success" style="text-align:left;">
        检测到您之前有提交记录，已将原 ${data.backup.count} 个文件备份为：${data.backup.name}
      </div>
    `;
  }

  if (data.afterSubmitMsg) {
    html += `
      <div class="alert alert-success" style="text-align:left;">
        ${data.afterSubmitMsg}
      </div>
    `;
  }

  html += `
      <button class="btn btn-primary" id="restart-btn" style="margin-top:16px;">完成新提交</button>
    </div>
  `;

  const content = document.getElementById('content');
  content.innerHTML = html;
  triggerAnimation(content);

  fastClick(document.getElementById('restart-btn'), () => {
    state.step = 1;
    state.homework = null;
    state.activity = null;
    state.name = null;
    state.workName = '';
    state.areaFiles = {};
    state.psychFile = null;
    render();
  });

  window.scrollTo(0, 0);
}

// ============ 显示提示 ============
function showAlert(msg, type = 'error') {
  const alertArea = document.getElementById('alert-area');
  if (!alertArea) {
    // 无内联提示区时（步骤 1~3），使用 Toast 替代 alert
    showToast(msg, type);
    return;
  }
  const alertEl = document.createElement('div');
  alertEl.className = `alert alert-${type}`;
  alertEl.textContent = msg;
  alertArea.innerHTML = '';
  alertArea.appendChild(alertEl);
  setTimeout(() => {
    if (alertEl.parentNode) alertEl.remove();
  }, 5000);
}

// ============ 初始化 ============
async function init() {
  try {
    const res = await fetch(`${API}/config`);
    const data = await res.json();
    CONFIG = data;
    if (data.maxFileSize) state.maxFileSize = data.maxFileSize;
    render();
  } catch (e) {
    document.getElementById('content').innerHTML = `
      <div class="card">
        <div class="alert alert-error">加载配置失败：${escapeHtml(e.message)}</div>
      </div>
    `;
  }
}

injectStyles();
init();

// ============================================================
// 浮动按钮 & 作业提交情况弹窗
// ============================================================

function createFloatButtons() {
  // 左下角：作业提交情况
  const leftBtn = document.createElement('button');
  leftBtn.className = 'float-btn float-btn-left';
  leftBtn.id = 'statusBtn';
  leftBtn.innerHTML = '<span class="float-btn-icon">📊</span> 作业提交情况';
  leftBtn.style.touchAction = 'manipulation';
  leftBtn.addEventListener('click', showStatusModal);

  // 右下角：作业收取（进入后台）
  const rightBtn = document.createElement('button');
  rightBtn.className = 'float-btn float-btn-right';
  rightBtn.id = 'adminBtn';
  rightBtn.innerHTML = '<span class="float-btn-icon">🔧</span> 作业收取';
  rightBtn.style.touchAction = 'manipulation';
  rightBtn.addEventListener('click', () => {
    window.location.href = 'collect.html';
  });

  document.body.appendChild(leftBtn);
  document.body.appendChild(rightBtn);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleString('zh-CN', {
    month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

async function showStatusModal() {
  // 创建弹窗骨架
  const overlay = document.createElement('div');
  overlay.className = 'status-overlay';
  overlay.innerHTML = `
    <div class="status-modal">
      <div class="status-modal-head">
        <h3>📊 作业提交情况</h3>
        <button class="status-close-btn">✕</button>
      </div>
      <div class="status-modal-body">
        <div class="status-loading">
          <div class="status-spinner"></div>
          正在加载提交情况...
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));

  // 关闭逻辑
  const closeBtn = overlay.querySelector('.status-close-btn');
  const closeHandler = () => {
    overlay.classList.remove('show');
    setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 250);
  };
  closeBtn.addEventListener('click', closeHandler);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeHandler();
  });

  // 加载数据
  const body = overlay.querySelector('.status-modal-body');
  try {
    const res = await fetch(`${API}/status`);
    const data = await res.json();
    if (!data.success) {
      body.innerHTML = `<div class="status-loading">加载失败：${escapeHtml(data.error || '未知错误')}</div>`;
      return;
    }
    body.innerHTML = renderStatusContent(data);
  } catch (e) {
    body.innerHTML = `<div class="status-loading">加载失败：${escapeHtml(e.message)}</div>`;
  }
}

function renderStatusContent(data) {
  const { status, totalExpected, totalSubmitted, totalFiles } = data;
  const submitRate = totalExpected > 0 ? Math.round((totalSubmitted / totalExpected) * 100) : 0;

  let html = `
    <div class="status-summary">
      <div class="status-summary-item">
        <span class="status-summary-label">应交人数</span>
        <span class="status-summary-value">${totalExpected}</span>
      </div>
      <div class="status-summary-item">
        <span class="status-summary-label">已交人数</span>
        <span class="status-summary-value" style="color:#16a34a;">${totalSubmitted}</span>
      </div>
      <div class="status-summary-item">
        <span class="status-summary-label">未交人数</span>
        <span class="status-summary-value" style="color:#dc2626;">${totalExpected - totalSubmitted}</span>
      </div>
      <div class="status-summary-item">
        <span class="status-summary-label">提交率</span>
        <span class="status-summary-value">${submitRate}%</span>
      </div>
    </div>
  `;

  for (const [hwKey, hwData] of Object.entries(status)) {
    // 统计该作业下提交情况
    let hwTotal = 0, hwSubmitted = 0;
    for (const actList of Object.values(hwData)) {
      hwTotal += actList.length;
      hwSubmitted += actList.filter(s => s.submitted).length;
    }
    html += `
      <div class="status-hw-group">
        <div class="status-hw-title">
          ${escapeHtml(hwKey)}
          <span class="status-hw-badge">${hwSubmitted}/${hwTotal}</span>
        </div>
    `;
    for (const [actKey, actList] of Object.entries(hwData)) {
      if (actKey === '__default__') {
        // 无活动的作业，直接列出人员
        for (const p of actList) {
          html += renderPersonRow(p);
        }
      } else {
        html += `<div class="status-act-group">`;
        html += `<div class="status-act-title">${escapeHtml(actKey)}</div>`;
        for (const p of actList) {
          html += renderPersonRow(p);
        }
        html += `</div>`;
      }
    }
    html += `</div>`;
  }
  return html;
}

function renderPersonRow(p) {
  const icon = p.submitted ? '✓' : '✗';
  const iconClass = p.submitted ? 'done' : 'pending';
  const meta = p.submitted
    ? `${p.fileCount}个文件`
    : '未提交';
  return `
    <div class="status-person-row">
      <span class="status-check-icon ${iconClass}">${icon}</span>
      <span class="status-person-name">${escapeHtml(p.name)}</span>
      <span class="status-person-meta">${meta}</span>
    </div>
  `;
}

// 延迟创建浮动按钮（等 DOM 加载完成）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFloatButtons);
} else {
  createFloatButtons();
}
