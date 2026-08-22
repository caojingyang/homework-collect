// ============================================================
// 管理后台 - 文件收集页面 collect.js
// 功能：登录、文件树、预览、重命名、删除、下载、存储统计
// ============================================================

// API 地址：由 config.js 中的 API_BASE 定义，若未加载则回退到同源 /api
const API = typeof API_BASE !== 'undefined' ? API_BASE : '/api';
// 直连 Cloudflare Worker 的备用地址（绕过 CloudBase 代理）
// 优先使用 config.js 中的 DIRECT_API_BASE，否则回退到同源 /api（适用于 Cloudflare Pages）
const DIRECT_API = typeof DIRECT_API_BASE !== 'undefined' ? DIRECT_API_BASE : '/api';
// 标记直连是否可用（首次失败后不再尝试）
let directApiAvailable = null; // null=未知, true=可用, false=不可用

const $ = (sel) => document.querySelector(sel);
const app = document.getElementById('app');

// ---- 全局状态 ----
let adminPassword = '';
let fileTree = null;
let totalFiles = 0;
let selectedFiles = new Set();
let storageData = null;
let currentBlobUrl = null; // 预览用的 blob URL，关闭时回收

// ---- 注入额外样式（补充 style.css 中没有的组件） ----
const extraStyles = document.createElement('style');
extraStyles.textContent = `
/* ===== 登录页面 ===== */
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 24px;
}
.login-card {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  padding: 40px 32px;
  max-width: 380px;
  width: 100%;
  text-align: center;
}
.login-icon { font-size: 48px; margin-bottom: 12px; }
.login-card h2 { font-size: 20px; margin-bottom: 6px; }
.login-sub { color: var(--text-light); font-size: 14px; margin-bottom: 24px; }
.login-alert { margin-bottom: 12px; text-align: left; }

/* ===== 管理面板头部 ===== */
.admin-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.admin-toolbar .toolbar-title {
  font-size: 17px;
  font-weight: 700;
}
.toolbar-btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.toolbar-btns .btn {
  width: auto;
  padding: 8px 16px;
  font-size: 14px;
  flex-shrink: 0;
}

/* ===== 存储统计面板 ===== */
.storage-card {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  margin-bottom: 16px;
}
.storage-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.storage-head h3 { font-size: 16px; font-weight: 700; }
.backup-tag {
  background: var(--success-light);
  color: #166534;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.storage-summary {
  display: flex;
  gap: 32px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}
.storage-summary-item { display: flex; flex-direction: column; }
.storage-summary-label { font-size: 12px; color: var(--text-light); }
.storage-summary-value { font-size: 22px; font-weight: 700; }
.storage-locations { display: grid; gap: 14px; }
.storage-loc {
  background: var(--bg);
  border-radius: 10px;
  padding: 14px 16px;
}
.storage-loc-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}
.storage-loc-name { font-weight: 600; font-size: 14px; }
.storage-loc-type {
  background: var(--border);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  color: var(--text-light);
}
.storage-loc-binding {
  font-size: 11px;
  color: var(--text-light);
}
.storage-loc-stats {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-light);
  margin-bottom: 8px;
}
.progress-track {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #818cf8);
  border-radius: 4px;
  transition: width 0.6s ease;
}

/* ===== 选择栏 ===== */
.selection-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 10px 20px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.selection-bar .btn { width: auto; padding: 8px 16px; font-size: 14px; }
.selection-count { font-size: 14px; font-weight: 600; flex: 1; }

/* ===== 文件树 ===== */
.tree-container {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.tree-empty {
  padding: 48px 24px;
  text-align: center;
  color: var(--text-light);
}
.tree-empty-icon { font-size: 48px; margin-bottom: 8px; }

/* 文件夹节点 */
.folder-node { border-bottom: 1px solid var(--border); }
.folder-node:last-child { border-bottom: none; }
.folder-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}
.folder-header:hover { background: var(--bg); }
.folder-arrow {
  font-size: 10px;
  width: 12px;
  text-align: center;
  transition: transform 0.25s ease;
  color: var(--text-light);
  flex-shrink: 0;
}
.folder-node.open > .folder-header .folder-arrow { transform: rotate(90deg); }
.folder-icon { font-size: 18px; flex-shrink: 0; }
.folder-name { font-weight: 600; font-size: 15px; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.folder-badge {
  background: var(--primary-light);
  color: var(--primary);
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

/* 平滑展开/折叠动画 (grid-template-rows 技巧) */
.folder-children {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}
.folder-children-inner {
  overflow: hidden;
  min-height: 0;
}
.folder-node.open > .folder-children {
  grid-template-rows: 1fr;
}

/* 文件项 */
.file-list-area { padding: 0; }
.file-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border);
  transition: background 0.15s;
}
.file-row:last-child { border-bottom: none; }
.file-row:hover { background: var(--bg); }
.file-row.bak-row { background: #fffbeb; }
.file-row.bak-row:hover { background: #fef3c7; }

.file-check {
  width: 18px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
  accent-color: var(--primary);
}
.file-row .file-icon { font-size: 20px; width: 28px; text-align: center; flex-shrink: 0; }
.file-row .file-info { flex: 1; min-width: 0; }
.file-row .file-name-text {
  font-size: 14px;
  font-weight: 500;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-row .file-meta-text {
  font-size: 12px;
  color: var(--text-light);
}
.file-row .file-actions {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}
.act-btn {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.act-btn:hover { background: var(--border); }
.act-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* 淡入动画 */
.fade-in { animation: fadeInUp 0.35s ease; }
@keyframes fadeInUp {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ===== Modal ===== */
/* 注意：必须覆盖 style.css 中 .modal-overlay 的 visibility:hidden
   style.css 用 .active 类，而本脚本用 .show 类，不覆盖会导致弹窗不可见 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;
  padding: 16px;
}
.modal-overlay.show {
  opacity: 1;
  visibility: visible;
}
.modal-box {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  transform: scale(0.92);
  transition: transform 0.25s ease;
}
.modal-overlay.show .modal-box { transform: scale(1); }
.modal-box.modal-lg { max-width: 800px; }
.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.modal-head h3 { font-size: 17px; font-weight: 700; }
.modal-close-btn {
  width: 32px; height: 32px;
  border: none;
  border-radius: 50%;
  background: var(--bg);
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  flex-shrink: 0;
}
.modal-close-btn:hover { background: var(--border); }
.modal-body { padding: 20px; overflow-y: auto; }
.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}
.modal-foot .btn { width: auto; padding: 10px 20px; font-size: 14px; }
.modal-input {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  font-size: 15px;
  color: var(--text);
  background: var(--card);
}
.modal-input:focus { outline: none; border-color: var(--primary); }
.rename-current { margin-bottom: 10px; color: var(--text-light); font-size: 13px; }
.rename-ext-hint { margin-top: 8px; color: var(--text-light); font-size: 12px; }
.confirm-warning { margin-top: 10px; color: #d97706; font-weight: 600; font-size: 14px; }
.confirm-warning.danger { color: var(--danger); }

/* 预览 */
.preview-body {
  padding: 16px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  background: #f9fafb;
}
.preview-img { max-width: 100%; max-height: 68vh; border-radius: 8px; }
.preview-iframe { width: 100%; height: 68vh; border: none; border-radius: 8px; }
.preview-video { max-width: 100%; max-height: 68vh; border-radius: 8px; }
.preview-unsupported {
  flex-direction: column;
  gap: 16px;
  text-align: center;
}
.preview-unsupported-icon { font-size: 56px; }
.preview-unsupported-text { color: var(--text-light); font-size: 15px; }

/* ===== Toast ===== */
/* 注意：必须覆盖 style.css 中 .toast 的 animation 属性
   style.css 用 animation 控制 toast 动画，本脚本用 transition + .show 类
   不覆盖会导致 toast 位置错误且无法正常显示/隐藏 */
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-120px);
  padding: 12px 24px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
  box-shadow: var(--shadow-lg);
  max-width: 92%;
  text-align: center;
  animation: none;
}
.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
  visibility: visible;
}
.toast-success { background: var(--success); }
.toast-error { background: var(--danger); }
.toast-info { background: var(--primary); }
.toast-warning { background: var(--warning); }

/* ===== 下载进度 ===== */
.dl-file-list { max-height: 280px; overflow-y: auto; margin: 12px 0; }
.dl-file-row {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 0; border-bottom: 1px solid var(--border);
  font-size: 13px;
}
.dl-file-row:last-child { border-bottom: none; }
.dl-file-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dl-file-status { font-size: 12px; font-weight: 600; flex-shrink: 0; }
.dl-file-status.pending { color: var(--text-light); }
.dl-file-status.downloading { color: var(--primary); }
.dl-file-status.done { color: var(--success); }
.dl-file-status.error { color: var(--danger); }
.dl-file-status.zipping { color: var(--warning); }
.dl-progress-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--text-light); margin-top: 12px; margin-bottom: 6px; }

/* ===== 响应式 ===== */
@media (max-width: 640px) {
  .admin-toolbar { flex-direction: column; align-items: stretch; }
  .toolbar-btns { justify-content: stretch; }
  .toolbar-btns .btn { flex: 1; padding: 10px 8px; font-size: 13px; }
  .storage-summary { gap: 20px; }
  .storage-summary-value { font-size: 18px; }
  .file-row { flex-wrap: wrap; padding: 8px 12px; }
  .file-row .file-actions { width: 100%; justify-content: flex-end; }
  .act-btn { width: 40px; height: 40px; }
  .folder-header { padding: 10px 12px; }
  .modal-box { max-width: 100%; }
  .modal-foot .btn { flex: 1; }
}
`;
document.head.appendChild(extraStyles);

// ============================================================
// 工具函数
// ============================================================

function formatSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  return (bytes / 1073741824).toFixed(2) + ' GB';
}

function getFileIcon(file) {
  // 优先使用服务端标记
  if (file.isImage) return '\u{1F4F7}';
  if (file.isVideo) return '\u{1F3AC}';
  if (file.isPptx) return '\u{1F4CA}';
  if (file.isZip) return '\u{1F4E6}';
  if (file.isBak) return '\u{1F5C2}\u{FE0F}';
  if (file.isDoc) return '\u{1F4C4}';
  // 扩展名兜底
  const ext = (file.ext || '').toLowerCase();
  if (!ext) return '\u{1F4C4}';
  if (['jpg','jpeg','png','gif','webp','bmp','heic','svg','tiff'].includes(ext)) return '\u{1F4F7}';
  if (['mp4','mov','avi','wmv','flv','mkv','webm'].includes(ext)) return '\u{1F3AC}';
  if (['ppt','pptx'].includes(ext)) return '\u{1F4CA}';
  if (['zip','rar','7z','tar','gz'].includes(ext)) return '\u{1F4E6}';
  if (ext === 'bak') return '\u{1F5C2}\u{FE0F}';
  return '\u{1F4C4}';
}

function getFileType(file) {
  if (file.isImage) return 'image';
  if (file.isVideo) return 'video';
  const ext = (file.ext || '').toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (file.isDoc || ['doc','docx','txt','rtf','md'].includes(ext)) return 'doc';
  if (file.isPptx || ['ppt','pptx'].includes(ext)) return 'ppt';
  if (file.isZip || ['zip','rar','7z','tar','gz'].includes(ext)) return 'archive';
  if (file.isBak || ext === 'bak') return 'bak';
  return 'other';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

// 递归统计文件夹内文件总数
function countFilesRecursive(node) {
  let count = (node._files || []).length;
  for (const key of Object.keys(node)) {
    if (key !== '_files' && typeof node[key] === 'object' && node[key] !== null) {
      count += countFilesRecursive(node[key]);
    }
  }
  return count;
}

// 中文数字映射
const CHINESE_NUM_MAP = { '一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10, '十一':11,'十二':12,'十三':13,'十四':14,'十五':15,'十六':16,'十七':17,'十八':18,'十九':19,'二十':20 };

// 从文件夹名中提取数字用于排序
function extractFolderNumber(name) {
  // 先尝试提取阿拉伯数字
  const m = name.match(/(\d+)/);
  if (m) return parseInt(m[1]);
  // 尝试中文数字
  const cnM = name.match(/[一二三四五六七八九十]+/);
  if (cnM) return CHINESE_NUM_MAP[cnM[0]] || 999;
  return 999;
}

// 按编号大小排序文件夹 key
function sortFolderKeys(keys) {
  return keys.sort((a, b) => extractFolderNumber(a) - extractFolderNumber(b));
}

// ============================================================
// API 封装
// ============================================================

// 通用 fetch（带鉴权头），返回原始 Response
// 对于下载相关请求，如果 CloudBase 代理失败，自动尝试直连 Cloudflare Worker
async function apiFetch(url, options = {}) {
  const headers = { 'X-Admin-Password': adminPassword, ...(options.headers || {}) };
  
  // 构造 CloudBase 代理 URL
  const proxyUrl = url.startsWith('/api/') ? API + url.substring(4) : url;
  
  // 构造直连 URL（同源，绕过 CloudBase 代理）
  const directUrl = url.startsWith('/api/') ? DIRECT_API + url.substring(4) : url;
  
  // 判断是否是下载相关请求（需要回退）
  const isDownloadReq = url.includes('/download/');
  
  // 如果直连已确认可用，且是下载请求，优先使用直连
  if (isDownloadReq && directApiAvailable === true) {
    try {
      const res = await fetch(directUrl, { ...options, headers });
      if (res.status === 401 || res.status === 403) {
        showToast('登录已过期，请重新登录', 'error');
        adminPassword = '';
        selectedFiles.clear();
        closeModal();
        renderLogin();
        throw new Error('未授权');
      }
      return res;
    } catch (e) {
      console.warn('[apiFetch] 直连失败，回退到代理:', e.message);
      directApiAvailable = false;
    }
  }
  
  // 尝试 CloudBase 代理
  const res = await fetch(proxyUrl, { ...options, headers });
  // 401/403 表示密码失效，跳回登录
  if (res.status === 401 || res.status === 403) {
    showToast('登录已过期，请重新登录', 'error');
    adminPassword = '';
    selectedFiles.clear();
    closeModal();
    renderLogin();
    throw new Error('未授权');
  }
  
  // 对于下载请求，如果代理返回错误，尝试直连
  if (isDownloadReq && !res.ok && directApiAvailable !== false) {
    console.warn(`[apiFetch] 代理返回 ${res.status}，尝试直连...`);
    try {
      const directRes = await fetch(directUrl, { ...options, headers });
      if (directRes.ok) {
        console.log('[apiFetch] 直连成功，后续下载请求将优先使用直连');
        directApiAvailable = true;
        return directRes;
      }
    } catch (e) {
      console.warn('[apiFetch] 直连也不可用:', e.message);
      directApiAvailable = false;
    }
  }
  
  return res;
}

// JSON 请求封装
async function apiJSON(url, options = {}) {
  // 将 /api/xxx 转换为 API + /xxx，支持跨域代理
  const fullUrl = url.startsWith('/api/') ? API + url.substring(4) : url;
  const headers = { 'X-Admin-Password': adminPassword, ...(options.headers || {}) };
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }
  const res = await fetch(fullUrl, { ...options, headers });
  if (res.status === 401 || res.status === 403) {
    showToast('登录已过期，请重新登录', 'error');
    adminPassword = '';
    selectedFiles.clear();
    closeModal();
    renderLogin();
    return { success: false, error: '未授权' };
  }
  try {
    return await res.json();
  } catch {
    return { success: false, error: '服务器返回了无效的响应' };
  }
}

// ============================================================
// Toast 通知
// ============================================================

function showToast(msg, type = 'info') {
  // 移除已有 toast
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================================
// Modal 系统
// ============================================================

function showModal(innerHTML, options = {}) {
  // 先移除旧 modal（不触发 blob 回收，因为可能是更新内容）
  const old = document.querySelector('.modal-overlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal-box ${options.large ? 'modal-lg' : ''}">${innerHTML}</div>`;
  document.body.appendChild(overlay);

  requestAnimationFrame(() => overlay.classList.add('show'));

  // 点击遮罩关闭（可配置关闭）
  if (options.closeOnOutside !== false) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  return overlay;
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('show');
  setTimeout(() => {
    overlay.remove();
    // 回收预览 blob URL
    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
      currentBlobUrl = null;
    }
  }, 250);
}

// 暴露到全局供 onclick 使用
window.closeModal = closeModal;

// Escape 键关闭 modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============================================================
// 登录页面
// ============================================================

function renderLogin() {
  app.innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-icon">\u{1F512}</div>
        <h2>管理员登录</h2>
        <p class="login-sub">请输入管理员密码以进入后台</p>
        <div id="loginAlert" class="login-alert"></div>
        <input type="password" class="text-input" id="loginPwd"
               placeholder="管理员密码" autocomplete="current-password"
               style="margin-bottom:14px;" />
        <button class="btn btn-primary" id="loginBtn">登录</button>
      </div>
    </div>
  `;

  const pwdInput = $('#loginPwd');
  const loginBtn = $('#loginBtn');
  const alertEl = $('#loginAlert');
  pwdInput.focus();

  const doLogin = async () => {
    const pwd = pwdInput.value.trim();
    if (!pwd) {
      showToast('请输入密码', 'error');
      return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = '验证中...';
    alertEl.innerHTML = '';

    try {
      const data = await apiJSON('/api/verify', {
        method: 'POST',
        headers: { 'X-Admin-Password': pwd },
      });
      if (data.success) {
        adminPassword = pwd;
        showToast('登录成功', 'success');
        renderMain();
      } else {
        showToast(data.error || '密码错误', 'error');
        alertEl.innerHTML = `<div class="alert alert-error">${escapeHtml(data.error || '密码错误')}</div>`;
        loginBtn.disabled = false;
        loginBtn.textContent = '登录';
        pwdInput.focus();
        pwdInput.select();
      }
    } catch (err) {
      showToast('网络连接失败', 'error');
      alertEl.innerHTML = `<div class="alert alert-error">网络连接失败，请检查后重试</div>`;
      loginBtn.disabled = false;
      loginBtn.textContent = '登录';
    }
  };

  loginBtn.addEventListener('click', doLogin);
  pwdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doLogin();
  });
}

// ============================================================
// 管理主面板
// ============================================================

function renderMain() {
  app.innerHTML = `
    <div class="admin-toolbar">
      <div class="toolbar-title">\u{1F4CB} 文件列表</div>
      <div class="toolbar-btns">
        <button class="btn btn-secondary" id="refreshBtn">\u{1F504} 刷新</button>
        <button class="btn btn-secondary" id="batchBtn">\u{2B07}\u{FE0F} 下载选中</button>
        <button class="btn btn-primary" id="downloadAllBtn">\u{1F4E6} 全部下载</button>
        <button class="btn btn-danger" id="logoutBtn">退出</button>
      </div>
    </div>
    <div id="storagePanel"></div>
    <div id="selectionBar" class="selection-bar" style="display:none;">
      <span class="selection-count" id="selectionCount">已选择 0 个文件</span>
      <button class="btn btn-primary" id="batchDownloadBtn">下载选中</button>
      <button class="btn btn-secondary" id="clearSelectionBtn">取消选择</button>
    </div>
    <div id="treeContainer" class="tree-container">
      <div class="loading"><div class="spinner"></div>正在加载文件列表...</div>
    </div>
  `;

  // 绑定事件
  $('#refreshBtn').addEventListener('click', () => {
    loadFileTree();
    loadStorage();
  });
  $('#batchBtn').addEventListener('click', () => {
    if (selectedFiles.size === 0) {
      showToast('请先勾选要下载的文件', 'warning');
      return;
    }
    batchDownload([...selectedFiles]);
  });
  $('#downloadAllBtn').addEventListener('click', downloadAll);
  $('#logoutBtn').addEventListener('click', () => {
    adminPassword = '';
    selectedFiles.clear();
    closeModal();
    renderLogin();
  });
  $('#batchDownloadBtn').addEventListener('click', () => {
    batchDownload([...selectedFiles]);
  });
  $('#clearSelectionBtn').addEventListener('click', () => {
    selectedFiles.clear();
    updateSelectionBar();
    document.querySelectorAll('.file-check').forEach(cb => cb.checked = false);
  });

  // 加载数据
  loadFileTree();
  loadStorage();
}

// ============================================================
// 文件树加载与渲染
// ============================================================

async function loadFileTree() {
  const container = $('#treeContainer');
  if (!container) return;
  container.innerHTML = '<div class="loading"><div class="spinner"></div>正在加载文件列表...</div>';

  try {
    const data = await apiJSON('/api/list');
    if (data.success) {
      fileTree = data.tree;
      totalFiles = data.total;
      renderFileTree();
    } else {
      container.innerHTML = `<div class="tree-empty"><div class="tree-empty-icon">\u{1F4E1}</div><p>加载失败：${escapeHtml(data.error || '未知错误')}</p></div>`;
      showToast('加载文件列表失败', 'error');
    }
  } catch (err) {
    container.innerHTML = `<div class="tree-empty"><div class="tree-empty-icon">\u{1F4E1}</div><p>网络错误</p></div>`;
    showToast('网络错误', 'error');
  }
}

function renderFileTree() {
  const container = $('#treeContainer');
  if (!container) return;

  if (!fileTree || Object.keys(fileTree).length === 0) {
    container.innerHTML = `
      <div class="tree-empty">
        <div class="tree-empty-icon">\u{1F4C2}</div>
        <p>暂无文件</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  container.classList.add('fade-in');

  // 渲染顶层文件夹（作业），按编号大小排序
  for (const hwKey of sortFolderKeys(Object.keys(fileTree))) {
    const hwNode = fileTree[hwKey];
    container.insertAdjacentHTML('beforeend', buildFolderHTML(hwKey, hwNode, 0));
  }

  // 绑定事件
  bindFolderEvents();
  bindFileEvents();
}

// 递归构建文件夹 HTML
// level 0 = 作业, level 1 = 活动, level 2 = 姓名
function buildFolderHTML(name, node, level) {
  const fileCount = countFilesRecursive(node);
  const subKeys = sortFolderKeys(Object.keys(node).filter(k => k !== '_files' && typeof node[k] === 'object' && node[k] !== null));
  const files = node._files || [];

  const icons = ['\u{1F4DA}', '\u{1F3AF}', '\u{1F464}']; // 📚 🎯 👤
  const icon = icons[level] || '\u{1F4C1}';
  const paddingLeft = 16 + level * 24;

  let html = `
    <div class="folder-node${level === 0 ? ' open' : ''}" data-level="${level}">
      <div class="folder-header" style="padding-left:${paddingLeft}px;">
        <span class="folder-arrow">\u{25B6}</span>
        <span class="folder-icon">${icon}</span>
        <span class="folder-name">${escapeHtml(name)}</span>
        <span class="folder-badge">${fileCount}</span>
      </div>
      <div class="folder-children"><div class="folder-children-inner">
  `;

  // 子文件夹
  for (const subKey of subKeys) {
    html += buildFolderHTML(subKey, node[subKey], level + 1);
  }

  // 文件列表
  if (files.length > 0) {
    html += '<div class="file-list-area">';
    for (const file of files) {
      html += buildFileHTML(file, level);
    }
    html += '</div>';
  }

  html += `</div></div></div>`;
  return html;
}

// 构建文件行 HTML
function buildFileHTML(file, parentLevel) {
  const icon = getFileIcon(file);
  const sizeStr = formatSize(file.size);
  const fileType = getFileType(file);
  const isBak = file.isBak;
  const key = file.key;
  const name = file.name;
  const paddingLeft = 16 + (parentLevel + 1) * 24;

  // 备份文件不可预览/重命名，但仍可下载/删除
  const canPreview = !isBak;
  const canRename = !isBak;

  return `
    <div class="file-row${isBak ? ' bak-row' : ''}" style="padding-left:${paddingLeft}px;">
      <input type="checkbox" class="file-check" data-key="${escapeHtml(key)}" ${isBak ? 'disabled' : ''} />
      <span class="file-icon">${icon}</span>
      <div class="file-info">
        <span class="file-name-text">${escapeHtml(name)}${isBak ? ' <span class="badge badge-bak">备份</span>' : ''}</span>
        <span class="file-meta-text">${sizeStr}</span>
      </div>
      <div class="file-actions">
        <button class="act-btn btn-preview" title="预览" data-key="${escapeHtml(key)}" data-name="${escapeHtml(name)}" data-type="${fileType}" data-size="${file.size || 0}" ${canPreview ? '' : 'disabled'}>\u{1F441}\u{FE0F}</button>
        <button class="act-btn btn-download" title="下载" data-key="${escapeHtml(key)}" data-name="${escapeHtml(name)}" data-size="${file.size || 0}">\u{2B07}\u{FE0F}</button>
        <button class="act-btn btn-rename" title="重命名" data-key="${escapeHtml(key)}" data-name="${escapeHtml(name)}" ${canRename ? '' : 'disabled'}>\u{270F}\u{FE0F}</button>
        <button class="act-btn btn-delete" title="删除" data-key="${escapeHtml(key)}" data-name="${escapeHtml(name)}">\u{1F5D1}\u{FE0F}</button>
      </div>
    </div>
  `;
}

// 绑定文件夹展开/折叠
function bindFolderEvents() {
  document.querySelectorAll('.folder-header').forEach(header => {
    header.addEventListener('click', () => {
      const node = header.parentElement;
      node.classList.toggle('open');
    });
  });
}

// 绑定文件操作按钮
function bindFileEvents() {
  // 预览
  document.querySelectorAll('.btn-preview').forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      previewFile(btn.dataset.key, btn.dataset.name, btn.dataset.type, parseInt(btn.dataset.size) || 0);
    });
  });

  // 下载
  document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      downloadFile(btn.dataset.key, btn.dataset.name, parseInt(btn.dataset.size) || 0);
    });
  });

  // 重命名
  document.querySelectorAll('.btn-rename').forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showRenameModal(btn.dataset.key, btn.dataset.name);
    });
  });

  // 删除
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showDeleteConfirm(btn.dataset.key, btn.dataset.name);
    });
  });

  // 复选框
  document.querySelectorAll('.file-check').forEach(cb => {
    cb.addEventListener('click', (e) => e.stopPropagation());
    cb.addEventListener('change', () => {
      if (cb.checked) {
        selectedFiles.add(cb.dataset.key);
      } else {
        selectedFiles.delete(cb.dataset.key);
      }
      updateSelectionBar();
    });
  });
}

function updateSelectionBar() {
  const bar = $('#selectionBar');
  if (!bar) return;
  if (selectedFiles.size > 0) {
    bar.style.display = 'flex';
    $('#selectionCount').textContent = `已选择 ${selectedFiles.size} 个文件`;
  } else {
    bar.style.display = 'none';
  }
}

// ============================================================
// 文件预览
// ============================================================

async function previewFile(key, filename, fileType, fileSize) {
  // 回收之前的 blob URL
  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = null;
  }

  // 不支持预览的格式
  if (['doc', 'ppt', 'archive', 'bak', 'other'].includes(fileType)) {
    showModal(`
      <div class="modal-head">
        <h3>${escapeHtml(filename)}</h3>
        <button class="modal-close-btn" onclick="closeModal()">\u{2715}</button>
      </div>
      <div class="preview-body preview-unsupported">
        <div class="preview-unsupported-icon">\u{1F4E6}</div>
        <p class="preview-unsupported-text">无法预览此格式，请下载后查看</p>
        <button class="btn btn-primary" style="width:auto;padding:10px 24px;"
                onclick="closeModal(); downloadFile('${escapeHtml(key)}', '${escapeHtml(filename)}', ${fileSize || 0})">\u{2B07}\u{FE0F} 下载文件</button>
      </div>
    `, { closeOnOutside: true });
    return;
  }

  // 显示加载中
  showModal(`
    <div class="modal-head">
      <h3>${escapeHtml(filename)}</h3>
      <button class="modal-close-btn" onclick="closeModal()">\u{2715}</button>
    </div>
    <div class="preview-body">
      <div class="loading"><div class="spinner"></div>加载中...</div>
      <div class="dl-progress-row" style="margin-top:12px;">
        <span>加载进度</span>
        <span id="dl-progress-detail">${formatSize(0)} / ${formatSize(fileSize || 0)}</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar-fill" id="dl-progress-fill" style="width:0%"></div>
      </div>
    </div>
  `, { closeOnOutside: true });

  try {
    // 使用统一下载函数（支持大文件分块），preview 和 download 端点返回的内容相同
    const blob = await fetchFileBlob(key, fileSize, (downloaded, total, speed) => {
      const percent = total > 0 ? Math.round((downloaded / total) * 100) : 0;
      updateDlProgress(percent);
      updateDlDetail(downloaded, total, speed);
    });
    currentBlobUrl = URL.createObjectURL(blob);

    let previewHtml = '';
    if (fileType === 'image') {
      previewHtml = `<img src="${currentBlobUrl}" alt="${escapeHtml(filename)}" class="preview-img" />`;
    } else if (fileType === 'pdf') {
      previewHtml = `<iframe src="${currentBlobUrl}" class="preview-iframe" title="${escapeHtml(filename)}"></iframe>`;
    } else if (fileType === 'video') {
      previewHtml = `<video src="${currentBlobUrl}" controls autoplay class="preview-video"></video>`;
    }

    showModal(`
      <div class="modal-head">
        <h3>${escapeHtml(filename)}</h3>
        <button class="modal-close-btn" onclick="closeModal()">\u{2715}</button>
      </div>
      <div class="preview-body">${previewHtml}</div>
    `, { closeOnOutside: true });
  } catch (err) {
    closeModal();
    showToast(err.message || '预览加载失败', 'error');
  }
}

// ============================================================
// 重命名
// ============================================================

function showRenameModal(key, filename) {
  // 去掉扩展名作为默认值
  const lastDot = filename.lastIndexOf('.');
  const nameWithoutExt = lastDot > 0 ? filename.substring(0, lastDot) : filename;
  const ext = lastDot > 0 ? filename.substring(lastDot + 1) : '';

  showModal(`
    <div class="modal-head">
      <h3>\u{270F}\u{FE0F} 重命名文件</h3>
      <button class="modal-close-btn" onclick="closeModal()">\u{2715}</button>
    </div>
    <div class="modal-body">
      <p class="rename-current">当前文件名：${escapeHtml(filename)}</p>
      <input type="text" class="modal-input" id="renameInput" value="${escapeHtml(nameWithoutExt)}" />
      ${ext ? `<p class="rename-ext-hint">扩展名 .${escapeHtml(ext)} 将自动保留</p>` : '<p class="rename-ext-hint">该文件无扩展名</p>'}
    </div>
    <div class="modal-foot">
      <button class="btn btn-secondary" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" id="renameConfirmBtn">确认重命名</button>
    </div>
  `);

  const input = $('#renameInput');
  input.focus();
  input.select();

  const doRename = async () => {
    const newName = input.value.trim();
    if (!newName) {
      showToast('请输入新文件名', 'error');
      return;
    }

    const btn = $('#renameConfirmBtn');
    btn.disabled = true;
    btn.textContent = '处理中...';

    try {
      const data = await apiJSON('/api/rename', {
        method: 'POST',
        body: { oldKey: key, newName },
      });
      if (data.success) {
        showToast('重命名成功', 'success');
        closeModal();
        loadFileTree();
        loadStorage();
      } else {
        showToast(data.error || '重命名失败', 'error');
        btn.disabled = false;
        btn.textContent = '确认重命名';
      }
    } catch (err) {
      showToast('网络错误，重命名失败', 'error');
      btn.disabled = false;
      btn.textContent = '确认重命名';
    }
  };

  $('#renameConfirmBtn').addEventListener('click', doRename);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doRename();
  });
}

// ============================================================
// 删除（二次确认）
// ============================================================

function showDeleteConfirm(key, filename) {
  // 第一次确认
  showModal(`
    <div class="modal-head">
      <h3>\u{26A0}\u{FE0F} 删除确认</h3>
      <button class="modal-close-btn" onclick="closeModal()">\u{2715}</button>
    </div>
    <div class="modal-body">
      <p>即将删除文件：<strong>${escapeHtml(filename)}</strong></p>
      <p class="confirm-warning">确定要删除此文件吗？此操作不可撤销。</p>
    </div>
    <div class="modal-foot">
      <button class="btn btn-secondary" onclick="closeModal()">取消</button>
      <button class="btn btn-danger" id="deleteStep1Btn">确定删除</button>
    </div>
  `);

  $('#deleteStep1Btn').addEventListener('click', () => {
    // 第二次确认
    const modalBox = document.querySelector('.modal-box');
    if (!modalBox) return;
    modalBox.innerHTML = `
      <div class="modal-head">
        <h3>\u{26A0}\u{FE0F} 再次确认</h3>
        <button class="modal-close-btn" onclick="closeModal()">\u{2715}</button>
      </div>
      <div class="modal-body">
        <p>文件：<strong>${escapeHtml(filename)}</strong></p>
        <p class="confirm-warning danger">再次确认删除：文件将被永久移除，包括备份。</p>
      </div>
      <div class="modal-foot">
        <button class="btn btn-secondary" onclick="closeModal()">取消</button>
        <button class="btn btn-danger" id="deleteStep2Btn">永久删除</button>
      </div>
    `;

    $('#deleteStep2Btn').addEventListener('click', async () => {
      const btn = $('#deleteStep2Btn');
      btn.disabled = true;
      btn.textContent = '删除中...';

      try {
        const data = await apiJSON('/api/delete', {
          method: 'POST',
          body: { key, confirm: true },
        });
        if (data.success) {
          showToast('删除成功', 'success');
          closeModal();
          selectedFiles.delete(key);
          loadFileTree();
          loadStorage();
        } else {
          showToast(data.error || '删除失败', 'error');
          btn.disabled = false;
          btn.textContent = '永久删除';
        }
      } catch (err) {
        showToast('网络错误，删除失败', 'error');
        btn.disabled = false;
        btn.textContent = '永久删除';
      }
    });
  });
}

// ============================================================
// 下载（带进度显示）
// ============================================================

// 暴露到全局供 modal onclick 使用
window.downloadFile = downloadFile;

// CloudBase SCF 响应体限制 6MB，超过 5MB 的文件需要分块下载
const CHUNK_THRESHOLD = 5 * 1024 * 1024; // 5MB
const CHUNK_MAX_RETRIES = 3; // 每个分块最大重试次数
const CHUNK_RETRY_DELAY = 1000; // 重试间隔（毫秒）

// 前端 MIME 类型映射（与后端 getContentTypeForExt 保持一致）
// 用于分块下载合并时设置正确的 Blob 类型
const MIME_MAP = {
  // 图片
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif',
  webp: 'image/webp', bmp: 'image/bmp', heic: 'image/heic', svg: 'image/svg+xml',
  tiff: 'image/tiff', tif: 'image/tiff', ico: 'image/x-icon',
  // 视频
  mp4: 'video/mp4', mov: 'video/quicktime', avi: 'video/x-msvideo',
  mkv: 'video/x-matroska', flv: 'video/x-flv', wmv: 'video/x-ms-wmv',
  webm: 'video/webm', m4v: 'video/x-m4v', '3gp': 'video/3gpp',
  mpeg: 'video/mpeg', mpg: 'video/mpeg',
  // 音频
  mp3: 'audio/mpeg', wav: 'audio/wav', m4a: 'audio/mp4', aac: 'audio/aac',
  flac: 'audio/flac', ogg: 'audio/ogg', wma: 'audio/x-ms-wma',
  // 文档
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xls: 'application/vnd.ms-excel',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ppt: 'application/vnd.ms-powerpoint',
  txt: 'text/plain', rtf: 'application/rtf', csv: 'text/csv',
  md: 'text/markdown', html: 'text/html', htm: 'text/html',
  // 压缩包
  zip: 'application/zip', rar: 'application/vnd.rar',
  '7z': 'application/x-7z-compressed', tar: 'application/x-tar',
  gz: 'application/gzip', gzip: 'application/gzip', bz2: 'application/x-bzip2',
  // 其他
  json: 'application/json', xml: 'application/xml',
  js: 'application/javascript', css: 'text/css',
};

// 从文件 key 中提取 Content-Type
function getContentTypeFromKey(key) {
  const filename = key.split('/').pop();
  const parts = filename.split('.');
  if (parts.length < 2) return 'application/octet-stream';
  const ext = parts.pop().toLowerCase();
  return MIME_MAP[ext] || 'application/octet-stream';
}

// 延迟函数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 分块下载大文件，返回 Blob（使用 /api/download/chunk 端点，避免 Worker 加载整个文件到内存）
// 优化：并行下载多个分块，大幅提升速度
// 兼容 COS：后端对 COS 文件返回 chunkCount=1（通过 Range 透明处理），此时走流式下载以实时显示进度
async function fetchBlobChunked(key, totalSize, onChunkProgress) {
  console.log('[fetchBlobChunked] 开始分块下载', { key, totalSize });

  // Step 1: 获取文件分块信息（带重试）
  let info = null;
  for (let attempt = 0; attempt <= CHUNK_MAX_RETRIES; attempt++) {
    const infoRes = await apiFetch(`/api/download/info?key=${encodeURIComponent(key)}`);
    if (infoRes.ok) {
      const data = await infoRes.json();
      if (data.success) {
        info = data;
        break;
      }
    }
    if (attempt < CHUNK_MAX_RETRIES) {
      console.log(`[fetchBlobChunked] 获取分块信息重试 ${attempt + 1}/${CHUNK_MAX_RETRIES}`);
      await sleep(CHUNK_RETRY_DELAY * (attempt + 1));
    } else {
      const errData = infoRes.ok ? await infoRes.json().catch(() => ({})) : {};
      throw new Error(errData.error || `获取文件信息失败（${infoRes.status}）`);
    }
  }

  const chunkCount = info.chunkCount || 1;
  const storage = info.storage || '';
  console.log(`[fetchBlobChunked] 分块数: ${chunkCount}, 存储类型: ${storage || '未知'}, 大小: ${totalSize}`);

  // 单分块场景（如 COS 大文件，后端通过 Range 请求透明返回完整文件）：
  // 使用流式下载逐块读取并实时报告进度，避免 arrayBuffer() 一次性加载且无进度反馈
  if (chunkCount === 1) {
    return downloadChunkStreamed(key, 0, chunkCount, totalSize, onChunkProgress);
  }

  const chunks = new Array(chunkCount);
  let downloaded = 0;

  // Step 2: 下载单个分块（带重试）
  async function downloadChunk(chunkIndex) {
    let chunkBuf = null;
    let lastError = null;

    for (let attempt = 0; attempt <= CHUNK_MAX_RETRIES; attempt++) {
      try {
        const res = await apiFetch(`/api/download/chunk?key=${encodeURIComponent(key)}&chunkIndex=${chunkIndex}`);
        if (res.ok) {
          chunkBuf = await res.arrayBuffer();
          break;
        }
        const errData = await res.json().catch(() => ({}));
        lastError = new Error(errData.error || `分块 ${chunkIndex + 1}/${chunkCount} 下载失败（HTTP ${res.status}）`);
        console.warn(`[fetchBlobChunked] 分块 ${chunkIndex + 1}/${chunkCount} 失败 (HTTP ${res.status}), 重试 ${attempt + 1}/${CHUNK_MAX_RETRIES}`);
      } catch (err) {
        lastError = err;
        console.warn(`[fetchBlobChunked] 分块 ${chunkIndex + 1}/${chunkCount} 异常: ${err.message}, 重试 ${attempt + 1}/${CHUNK_MAX_RETRIES}`);
      }

      if (attempt < CHUNK_MAX_RETRIES) {
        await sleep(CHUNK_RETRY_DELAY * (attempt + 1));
      }
    }

    if (!chunkBuf) {
      throw lastError || new Error(`分块 ${chunkIndex + 1}/${chunkCount} 下载失败`);
    }

    return new Uint8Array(chunkBuf);
  }

  // Step 3: 并行下载所有分块（最多 4 个并发）
  const MAX_CONCURRENT = Math.min(4, chunkCount);
  const chunkIndices = Array.from({ length: chunkCount }, (_, i) => i);

  // 使用并发池模式
  let currentIndex = 0;
  async function worker() {
    while (currentIndex < chunkCount) {
      const idx = currentIndex++;
      const chunk = await downloadChunk(idx);
      chunks[idx] = chunk;
      downloaded += chunk.byteLength;
      if (onChunkProgress) onChunkProgress(downloaded, totalSize);
    }
  }

  // 启动 MAX_CONCURRENT 个 worker 并等待全部完成
  const workers = [];
  for (let w = 0; w < MAX_CONCURRENT; w++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  console.log(`[fetchBlobChunked] 下载完成, 总大小: ${downloaded}, 并发数: ${MAX_CONCURRENT}`);
  const blobContentType = getContentTypeFromKey(key);
  return new Blob(chunks, { type: blobContentType });
}

// 统一的文件下载函数：小文件直接下载，大文件分块下载
// onProgress 回调接收 (downloadedBytes, totalBytes, speedBps) 三个参数
async function fetchFileBlob(key, fileSize, onProgress) {
  const startTime = Date.now();

  function reportProgress(downloaded, total) {
    if (!onProgress) return;
    const elapsed = (Date.now() - startTime) / 1000;
    const speed = elapsed > 0 ? downloaded / elapsed : 0;
    onProgress(downloaded, total, speed);
  }

  if (fileSize && fileSize > CHUNK_THRESHOLD) {
    return fetchBlobChunked(key, fileSize, (downloaded, total) => {
      reportProgress(downloaded, total);
    });
  }
  // 小文件直接下载
  const res = await apiFetch(`/api/download?key=${encodeURIComponent(key)}`);
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || '下载失败');
  }
  return responseToBlobWithProgress(res, (percent) => {
    const downloaded = Math.round(fileSize * percent / 100);
    reportProgress(downloaded, fileSize);
  });
}

// 从 Response 流式读取为 Blob，并追踪进度
async function responseToBlobWithProgress(res, onProgress) {
  const contentLength = parseInt(res.headers.get('Content-Length') || '0');
  const contentType = res.headers.get('Content-Type') || 'application/octet-stream';
  if (!res.body || typeof res.body.getReader !== 'function') {
    const blob = await res.blob();
    onProgress(100);
    return blob;
  }
  const reader = res.body.getReader();
  const chunks = [];
  let receivedLength = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    receivedLength += value.length;
    if (contentLength > 0) {
      onProgress(Math.round((receivedLength / contentLength) * 100));
    }
  }
  return new Blob(chunks, { type: contentType });
}

// 从 Response 流式读取为 Blob，通过 onReceivedBytes 回调报告已接收字节数
// 适用于单分块大文件（如 COS），可实时显示下载进度而不依赖 Content-Length
async function streamResponseToBlob(res, onReceivedBytes) {
  // 从响应头获取 Content-Type，用于创建正确类型的 Blob
  const contentType = res.headers.get('Content-Type') || 'application/octet-stream';
  if (!res.body || typeof res.body.getReader !== 'function') {
    const blob = await res.blob();
    if (onReceivedBytes) onReceivedBytes(blob.size);
    return blob;
  }
  const reader = res.body.getReader();
  const chunks = [];
  let receivedLength = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    receivedLength += value.length;
    if (onReceivedBytes) onReceivedBytes(receivedLength);
  }
  return new Blob(chunks, { type: contentType });
}

// 流式下载单个分块（带进度与重试）
// 适用于 COS 等单分块大文件：通过 ReadableStream 逐块读取，实时报告已接收字节数
async function downloadChunkStreamed(key, chunkIndex, chunkCount, totalSize, onProgress) {
  let lastError = null;
  for (let attempt = 0; attempt <= CHUNK_MAX_RETRIES; attempt++) {
    try {
      const res = await apiFetch(`/api/download/chunk?key=${encodeURIComponent(key)}&chunkIndex=${chunkIndex}`);
      if (res.ok) {
        return await streamResponseToBlob(res, (received) => {
          if (onProgress) onProgress(received, totalSize);
        });
      }
      const errData = await res.json().catch(() => ({}));
      lastError = new Error(errData.error || `分块 ${chunkIndex + 1}/${chunkCount} 下载失败（HTTP ${res.status}）`);
      console.warn(`[downloadChunkStreamed] 分块 ${chunkIndex + 1}/${chunkCount} 失败 (HTTP ${res.status}), 重试 ${attempt + 1}/${CHUNK_MAX_RETRIES}`);
    } catch (err) {
      lastError = err;
      console.warn(`[downloadChunkStreamed] 分块 ${chunkIndex + 1}/${chunkCount} 异常: ${err.message}, 重试 ${attempt + 1}/${CHUNK_MAX_RETRIES}`);
    }
    if (attempt < CHUNK_MAX_RETRIES) {
      await sleep(CHUNK_RETRY_DELAY * (attempt + 1));
    }
  }
  throw lastError || new Error(`分块 ${chunkIndex + 1}/${chunkCount} 下载失败`);
}

function updateDlFileStatus(idx, status, text) {
  const el = document.getElementById(`dl-file-status-${idx}`);
  if (el) {
    el.className = `dl-file-status ${status}`;
    el.textContent = text;
  }
}

function updateDlProgress(percent) {
  const fill = document.getElementById('dl-progress-fill');
  const text = document.getElementById('dl-progress-text');
  if (fill) fill.style.width = percent + '%';
  if (text) text.textContent = percent + '%';
}

function updateDlDetail(downloaded, total, speed) {
  const detailEl = document.getElementById('dl-progress-detail');
  if (!detailEl) return;
  const pct = total > 0 ? Math.round((downloaded / total) * 100) : 0;
  detailEl.textContent = `${formatSize(downloaded)} / ${formatSize(total)}  ·  ${formatSpeed(speed)}  ·  ${pct}%`;
}

function formatSpeed(bytesPerSec) {
  if (!bytesPerSec || bytesPerSec < 1) return '0 B/s';
  if (bytesPerSec < 1024) return bytesPerSec.toFixed(0) + ' B/s';
  if (bytesPerSec < 1048576) return (bytesPerSec / 1024).toFixed(1) + ' KB/s';
  return (bytesPerSec / 1048576).toFixed(2) + ' MB/s';
}

// 单文件下载（带进度，大文件自动分块）
async function downloadFile(key, filename, fileSize) {
  const fname = filename || (key ? key.split('/').pop() : 'download');
  const totalSize = fileSize || 0;

  showModal(`
    <div class="modal-head">
      <h3>\u{2B07}\u{FE0F} 正在下载</h3>
      <button class="modal-close-btn" onclick="closeModal()">\u{2715}</button>
    </div>
    <div class="modal-body">
      <div class="dl-file-list">
        <div class="dl-file-row">
          <span class="dl-file-name">${escapeHtml(fname)}</span>
          <span class="dl-file-status downloading" id="dl-file-status-0">准备中...</span>
        </div>
      </div>
      <div class="dl-progress-row">
        <span>下载进度</span>
        <span id="dl-progress-detail">${formatSize(0)} / ${formatSize(totalSize)}</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar-fill" id="dl-progress-fill" style="width:0%"></div>
      </div>
    </div>
  `, { closeOnOutside: false });

  try {
    const blob = await fetchFileBlob(key, fileSize, (downloaded, total, speed) => {
      const percent = total > 0 ? Math.round((downloaded / total) * 100) : 0;
      const statusEl = document.getElementById('dl-file-status-0');
      if (statusEl) statusEl.textContent = `下载中 ${percent}%`;
      updateDlProgress(percent);
      updateDlDetail(downloaded, total, speed);
    });

    const statusEl = document.getElementById('dl-file-status-0');
    if (statusEl) { statusEl.className = 'dl-file-status done'; statusEl.textContent = '\u2713 完成'; }
    updateDlProgress(100);
    const detailEl = document.getElementById('dl-progress-detail');
    if (detailEl) detailEl.textContent = `${formatSize(totalSize)} / ${formatSize(totalSize)}  ·  完成`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fname;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setTimeout(() => closeModal(), 800);
  } catch (err) {
    if (err.message !== '未授权') {
      const statusEl = document.getElementById('dl-file-status-0');
      if (statusEl) { statusEl.className = 'dl-file-status error'; statusEl.textContent = '失败'; }
      showToast(err.message || '下载失败', 'error');
    }
  }
}

// 批量下载（客户端逐个下载 + 打包，带进度）
async function downloadWithProgress(files, zipName) {
  if (!files || files.length === 0) {
    showToast('没有可下载的文件', 'warning');
    return;
  }

  const totalSize = files.reduce((s, f) => s + (f.size || 0), 0);

  showModal(`
    <div class="modal-head">
      <h3>\u{1F4E6} 正在下载并打包 ${files.length} 个文件</h3>
      <button class="modal-close-btn" onclick="closeModal()">\u{2715}</button>
    </div>
    <div class="modal-body">
      <div class="dl-file-list" id="dl-file-list">
        ${files.map((f, i) => `
          <div class="dl-file-row">
            <span class="dl-file-name">${escapeHtml(f.name)}</span>
            <span class="dl-file-status pending" id="dl-file-status-${i}">等待中</span>
          </div>
        `).join('')}
      </div>
      <div class="dl-progress-row">
        <span>总进度</span>
        <span id="dl-progress-detail">${formatSize(0)} / ${formatSize(totalSize)}</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar-fill" id="dl-progress-fill" style="width:0%"></div>
      </div>
    </div>
  `, { closeOnOutside: false });

  try {
    const zipContents = {};
    let completedFiles = 0;
    let downloadedSize = 0;
    const batchStartTime = Date.now();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updateDlFileStatus(i, 'downloading', '下载中...');
      const fileBaseSize = file.size || 0;
      const prevDownloaded = downloadedSize;

      try {
        let blob;
        if (file.url) {
          // 直链下载（Cloudinary CDN，不走 Worker）
          const res = await fetch(file.url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          blob = await responseToBlobWithProgress(res, (percent) => {
            updateDlFileStatus(i, 'downloading', `下载中 ${percent}%`);
            const fileDl = fileBaseSize * percent / 100;
            const overallDl = prevDownloaded + fileDl;
            const overallPct = totalSize > 0 ? Math.round((overallDl / totalSize) * 100) : 0;
            updateDlProgress(overallPct);
            const elapsed = (Date.now() - batchStartTime) / 1000;
            const speed = elapsed > 0 ? overallDl / elapsed : 0;
            updateDlDetail(overallDl, totalSize, speed);
          });
        } else {
          // Worker 代理下载（支持大文件分块）
          blob = await fetchFileBlob(file.key, file.size, (downloaded, total, speed) => {
            const filePct = total > 0 ? Math.round((downloaded / total) * 100) : 0;
            updateDlFileStatus(i, 'downloading', `下载中 ${filePct}%`);
            const overallDl = prevDownloaded + downloaded;
            const overallPct = totalSize > 0 ? Math.round((overallDl / totalSize) * 100) : 0;
            updateDlProgress(overallPct);
            updateDlDetail(overallDl, totalSize, speed);
          });
        }

        downloadedSize += fileBaseSize;
        zipContents[file.key] = new Uint8Array(await blob.arrayBuffer());
        completedFiles++;
        updateDlFileStatus(i, 'done', '\u2713 完成');
        const overallPct = Math.round((completedFiles / files.length) * 100);
        updateDlProgress(overallPct);
      } catch (err) {
        updateDlFileStatus(i, 'error', '失败');
      }
    }

    if (Object.keys(zipContents).length === 0) {
      showToast('所有文件下载失败', 'error');
      return;
    }

    // 客户端打包
    for (let i = 0; i < files.length; i++) {
      const el = document.getElementById(`dl-file-status-${i}`);
      if (el && el.classList.contains('done')) {
        el.className = 'dl-file-status zipping';
        el.textContent = '打包中...';
      }
    }

    const zipped = fflate.zipSync(zipContents);
    const blob = new Blob([zipped], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = zipName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);

    for (let i = 0; i < files.length; i++) {
      const el = document.getElementById(`dl-file-status-${i}`);
      if (el && el.classList.contains('zipping')) {
        el.className = 'dl-file-status done';
        el.textContent = '\u2713 完成';
      }
    }
    updateDlProgress(100);

    showToast(`下载完成，共 ${completedFiles} 个文件`, 'success');
    setTimeout(() => closeModal(), 1000);
  } catch (err) {
    if (err.message !== '未授权') {
      showToast(err.message || '下载失败', 'error');
    }
  }
}

async function batchDownload(keys) {
  if (!keys || keys.length === 0) {
    showToast('请选择要下载的文件', 'warning');
    return;
  }

  showToast('正在获取文件列表...', 'info');

  try {
    const res = await apiFetch('/api/batch-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keys }),
    });
    const data = await res.json();
    if (!data.success) {
      showToast(data.error || '获取文件列表失败', 'error');
      return;
    }
    await downloadWithProgress(data.files, 'batch_download.zip');
  } catch (err) {
    if (err.message !== '未授权') {
      showToast(err.message || '批量下载失败', 'error');
    }
  }
}

async function downloadAll() {
  showToast('正在获取文件列表...', 'info');

  try {
    const res = await apiFetch('/api/batch-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ all: true }),
    });
    const data = await res.json();
    if (!data.success) {
      showToast(data.error || '获取文件列表失败', 'error');
      return;
    }
    await downloadWithProgress(data.files, '高一（13）班暑期德育作业.zip');
  } catch (err) {
    if (err.message !== '未授权') {
      showToast(err.message || '下载失败', 'error');
    }
  }
}

// ============================================================
// 存储统计
// ============================================================

async function loadStorage() {
  const panel = $('#storagePanel');
  if (!panel) return;

  try {
    const data = await apiJSON('/api/storage');
    if (data.success) {
      storageData = data;
      renderStorage(data);
    }
  } catch (err) {
    // 存储统计加载失败不阻塞主流程
  }
}

function renderStorage(data) {
  const panel = $('#storagePanel');
  if (!panel) return;

  const { locations, totalFiles: tFiles, totalSize: tSize } = data;

  // 计算最大存储量用于进度条相对比例
  const maxSize = Math.max(...(locations || []).map(l => l.totalSize || 0), 1);

  let locHtml = '';
  for (const loc of (locations || [])) {
    const percent = ((loc.totalSize || 0) / maxSize * 100).toFixed(1);
    const typeIcon = (loc.type || '').includes('R2') ? '\u{1F4BD}' : '\u{2601}\u{FE0F}';
    locHtml += `
      <div class="storage-loc">
        <div class="storage-loc-head">
          <span class="storage-loc-name">${typeIcon} ${escapeHtml(loc.name)}</span>
          <span class="storage-loc-type">${escapeHtml(loc.type || '')}</span>
          <span class="storage-loc-binding">\u{1F517} ${escapeHtml(loc.binding || '')}</span>
        </div>
        <div class="storage-loc-stats">
          <span>${loc.fileCount || 0} 个文件</span>
          <span>${formatSize(loc.totalSize || 0)}</span>
        </div>
        <div class="progress-track">
          <div class="progress-bar-fill" style="width:${percent}%"></div>
        </div>
      </div>
    `;
  }

  panel.innerHTML = `
    <div class="storage-card fade-in">
      <div class="storage-head">
        <h3>\u{1F4BE} 存储概览</h3>
      </div>
      <div class="storage-summary">
        <div class="storage-summary-item">
          <span class="storage-summary-label">总文件数</span>
          <span class="storage-summary-value">${tFiles || 0}</span>
        </div>
        <div class="storage-summary-item">
          <span class="storage-summary-label">总大小</span>
          <span class="storage-summary-value">${formatSize(tSize || 0)}</span>
        </div>
        <div class="storage-summary-item">
          <span class="storage-summary-label">存储位置</span>
          <span class="storage-summary-value">${(locations || []).length}</span>
        </div>
      </div>
      <div class="storage-locations">
        ${locHtml}
      </div>
    </div>
  `;
}

// ============================================================
// 初始化
// ============================================================
renderLogin();
