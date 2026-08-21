// deploy: 2026-08-16-v3 storage=cloudinary
// src/config.js
var CONFIG = {
  title: "\u9AD8\u4E00\uFF0813\uFF09\u73ED\u6691\u671F\u5FB7\u80B2\u4F5C\u4E1A\u6536\u96C6\u7CFB\u7EDF",
  iconUrl: "https://s41.ax1x.com/2026/07/01/pmdtqLF.png",
  classLabel: "\u9AD8\u4E00\uFF0813\uFF09\u73ED",
  homeworks: {
    "\u4F5C\u4E1A1": {
      label: "\u4F5C\u4E1A1",
      hasActivity: false,
      names: ["\u8521\u6B23\u745C", "\u9648\u9A8F\u6615", "\u8D75\u5B50\u7433"],
      // 单文件上传，.docx 或 .pdf
      areas: [
        {
          id: "single",
          label: "\u4E0A\u4F20\u7535\u5B50\u6587\u6863",
          hint: "\u8BF7\u5C06\u6240\u6709\u4F5C\u54C1\u6574\u7406\u4E3A\u4E00\u4EFD\u7535\u5B50\u6587\u6863\uFF08Word \u6216 PDF\uFF09\uFF0C\u4EC5\u652F\u6301 .docx \u6216 .pdf \u683C\u5F0F",
          accept: ".docx,.pdf",
          exts: ["docx", "pdf"],
          multiple: false,
          maxFiles: 1,
          // 文件名: 一书一世界 高一（13）班{姓名}.{ext}
          nameTemplate: "\u4E00\u4E66\u4E00\u4E16\u754C \u9AD8\u4E00\uFF0813\uFF09\u73ED{name}"
        }
      ]
    },
    "\u4F5C\u4E1A2": {
      label: "\u4F5C\u4E1A2",
      hasActivity: true,
      activities: {
        "\u6D3B\u52A8\u4E00": {
          label: "\u6D3B\u52A8\u4E00",
          names: ["\u66F9\u656C\u6768", "\u6D2A\u9AD8\u8FDC", "\u5C39\u5434\u5B50\u6052"],
          // 两个区域分别提交
          areas: [
            {
              id: "record",
              label: "AI\u4F7F\u7528\u601D\u7EF4\u8FC7\u7A0B\u8BB0\u5F55\u5355",
              hint: "\u8BF7\u4E0A\u4F20 AI\u4F7F\u7528\u601D\u7EF4\u8FC7\u7A0B\u8BB0\u5F55\u5355\uFF0C\u652F\u6301 .docx / .pdf / .xlsx / \u56FE\u7247\u683C\u5F0F",
              accept: ".docx,.pdf,.xlsx,image/*",
              exts: ["docx", "pdf", "xlsx", "jpg", "jpeg", "png", "gif", "webp", "bmp", "heic"],
              multiple: false,
              maxFiles: 1,
              nameTemplate: "\u9AD8\u4E00\uFF0813\uFF09\u73ED{name}\u300AAI\u4F7F\u7528\u601D\u7EF4\u8FC7\u7A0B\u8BB0\u5F55\u5355\u300B"
            },
            {
              id: "manual",
              label: "\u300A\u6211\u7684AI\u4F7F\u7528\u8BF4\u660E\u4E66\u300B",
              hint: "\u8BF7\u4E0A\u4F20\u300A\u6211\u7684AI\u4F7F\u7528\u8BF4\u660E\u4E66\u300B\uFF0C\u652F\u6301 .docx / .pdf / \u56FE\u7247\u683C\u5F0F",
              accept: ".docx,.pdf,image/*",
              exts: ["docx", "pdf", "jpg", "jpeg", "png", "gif", "webp", "bmp", "heic"],
              multiple: false,
              maxFiles: 1,
              nameTemplate: "\u9AD8\u4E00\uFF0813\uFF09\u73ED{name}\u300A\u6211\u7684AI\u4F7F\u7528\u8BF4\u660E\u4E66\u300B"
            }
          ]
        },
        "\u6D3B\u52A8\u4E8C": {
          label: "\u6D3B\u52A8\u4E8C",
          names: ["\u9C8D\u8C37\u6B4C", "\u7F57\u68A6\u96EA", "\u5B97\u94B0\u6668"],
          needsWorkName: true,
          // 图片形式，1~2个文件
          areas: [
            {
              id: "photo",
              label: "\u6F2B\u753B\u53CA\u5FC3\u7406\u611F\u609F\u62CD\u7167",
              hint: "\u8BF7\u4E0A\u4F20\u6F2B\u753B\u53CA\u5FC3\u7406\u611F\u609F\u7167\u7247\uFF0C\u4EC5\u652F\u6301\u56FE\u7247\u683C\u5F0F\uFF0C\u5141\u8BB8\u4E0A\u4F20 1~2 \u4E2A\u6587\u4EF6",
              accept: "image/*",
              exts: ["jpg", "jpeg", "png", "gif", "webp", "bmp", "heic"],
              multiple: true,
              maxFiles: 2,
              needsPsychSelect: true,
              // 若上传2个文件需选择"心理感悟"项
              nameTemplate: "\u9AD8\u4E00\uFF0813\uFF09\u73ED{name}\u300A{workName}\u300B",
              psychSuffix: "\uFF08\u5FC3\u7406\u611F\u609F\uFF09",
              afterSubmitMsg: "\u63D0\u4EA4\u6210\u529F\uFF01\u5F00\u5B66\u65F6\u4F1A\u7EDF\u4E00\u6536\u96C6\uFF0C\u8BF7\u59A5\u5584\u4FDD\u7BA1\u539F\u7A3F\u3002"
            }
          ]
        }
      }
    },
    "\u4F5C\u4E1A3": {
      label: "\u4F5C\u4E1A3",
      hasActivity: true,
      activities: {
        "\u6D3B\u52A8\u4E00": {
          label: "\u6D3B\u52A8\u4E00",
          names: ["\u66F9\u661F\u701A", "\u590F\u6D69\u5CA9", "\u6768\u6DFB\u7FFC"],
          needsWorkName: true,
          areas: [
            {
              id: "multi",
              label: "\u4E0A\u4F20\u4F5C\u54C1",
              hint: "\u652F\u6301 .docx / .pdf / .mp4 / .mov / \u56FE\u7247\u683C\u5F0F\uFF0C\u5141\u8BB8\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6\u3002docx \u548C pdf \u5404\u4EC5\u5141\u8BB8\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6\u3002",
              accept: ".docx,.pdf,.mp4,.mov,image/*",
              exts: ["docx", "pdf", "mp4", "mov", "jpg", "jpeg", "png", "gif", "webp", "bmp", "heic"],
              multiple: true,
              maxFiles: 20,
              // docx 最多1个, pdf 最多1个
              singleExts: ["docx", "pdf"],
              // 图片/视频多个则压缩
              zipExts: ["mp4", "mov", "jpg", "jpeg", "png", "gif", "webp", "bmp", "heic"],
              nameTemplate: "\u9AD8\u4E00\uFF0813\uFF09\u73ED{name}\u300A{workName}\u300B",
              zipNumbered: true
            }
          ]
        },
        "\u6D3B\u52A8\u4E8C": {
          label: "\u6D3B\u52A8\u4E8C",
          names: ["\u8521\u5CFB\u7199", "\u9756\u6C38\u8BDA", "\u5510\u4E00\u6668", "\u738B\u5B87\u7693"],
          needsWorkName: true,
          areas: [
            {
              id: "multi",
              label: "\u4E0A\u4F20\u4F5C\u54C1",
              hint: "\u652F\u6301 .mp4 / .mov / .pptx \u683C\u5F0F\uFF0C\u5141\u8BB8\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6\u3002pptx \u4EC5\u5141\u8BB8\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6\u3002",
              accept: ".mp4,.mov,.pptx",
              exts: ["mp4", "mov", "pptx"],
              multiple: true,
              maxFiles: 20,
              singleExts: ["pptx"],
              zipExts: ["mp4", "mov"],
              nameTemplate: "\u9AD8\u4E00\uFF0813\uFF09\u73ED{name}\u300A{workName}\u300B",
              zipNumbered: true,
              numberedSuffix: true
              // 所有文件含编号
            }
          ]
        },
        "\u6D3B\u52A8\u4E09": {
          label: "\u6D3B\u52A8\u4E09",
          names: ["\u5D14\u8D24\u4FCA", "\u5F3A\u4E3D\u654F", "\u738B\u6B23\u60A6"],
          areas: [
            {
              id: "process",
              label: "\u5B9E\u8DF5\u8FC7\u7A0B",
              hint: "\u4E0A\u4F20\u5B9E\u8DF5\u8FC7\u7A0B\u6587\u4EF6\uFF0C\u652F\u6301 .mp4 / .mov / \u56FE\u7247\u683C\u5F0F\uFF0C\u5141\u8BB8\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6",
              accept: ".mp4,.mov,image/*",
              exts: ["mp4", "mov", "jpg", "jpeg", "png", "gif", "webp", "bmp", "heic"],
              multiple: true,
              maxFiles: 20,
              zipExts: ["mp4", "mov", "jpg", "jpeg", "png", "gif", "webp", "bmp", "heic"],
              nameTemplate: "\u9AD8\u4E00\uFF0813\uFF09\u73ED{name}\u5B9E\u8DF5\u8FC7\u7A0B",
              zipNumbered: true
            },
            {
              id: "reflection",
              label: "\u5B9E\u8DF5\u611F\u609F",
              hint: "\u4E0A\u4F20\u5B9E\u8DF5\u611F\u609F\uFF0C\u4EC5\u652F\u6301 .docx \u6216 .pdf \u683C\u5F0F\uFF0C\u4EC5\u5141\u8BB8\u4E00\u4E2A\u6587\u4EF6",
              accept: ".docx,.pdf",
              exts: ["docx", "pdf"],
              multiple: false,
              maxFiles: 1,
              nameTemplate: "\u9AD8\u4E00\uFF0813\uFF09\u73ED{name}\u5B9E\u8DF5\u611F\u609F"
            }
          ]
        }
      }
    }
  }
};
function getFolderPrefix(homework, activity, name) {
  let prefix = `${homework}/`;
  if (activity) prefix += `${activity}/`;
  prefix += `${name}/`;
  return prefix;
}
function cleanWorkName(name) {
  if (!name) return "";
  let cleaned = name.trim();
  cleaned = cleaned.replace(/[《《\[]/g, "").replace(/[》》\]]/g, "");
  return cleaned;
}
function getExt(filename) {
  const parts = filename.split(".");
  if (parts.length < 2) return "";
  return parts.pop().toLowerCase();
}
function isExtAllowed(ext, allowedExts) {
  return allowedExts.includes(ext.toLowerCase());
}
var IMAGE_EXTS = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "heic"];
function isImage(ext) {
  return IMAGE_EXTS.includes(ext.toLowerCase());
}

// src/storage.js
var INDEX_PREFIX = "idx:";
var CB_SCF_BASE = "https://wh12z213-d4gi5jt764f91a558.service.tcloudbase.com/api";
var CB_ADMIN_PWD = "@cjyC8Y26@";
function getStorageType(env) {
  if (env.BUCKET) return "r2";
  if (env.CB_STORAGE_ENABLED === "true" || env.CB_STORAGE_ENABLED === "1") return "cloudbase";
  if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) return "cloudinary";
  if (env.COS_SECRET_ID && env.COS_SECRET_KEY && env.COS_BUCKET) return "cos";
  if (env.KV) return "kv";
  return null;
}
function getMaxFileSize(env) {
  if (env.BUCKET) return 250 * 1024 * 1024;
  if (env.CB_STORAGE_ENABLED) return 5 * 1024 * 1024;
  if (env.CLOUDINARY_CLOUD_NAME) return 10 * 1024 * 1024;
  if (env.COS_SECRET_ID) return 250 * 1024 * 1024;
  if (env.KV) return 250 * 1024 * 1024;
  return 0;
}
// 调用 CloudBase SCF 函数（内部使用）
async function cbCall(path, options = {}) {
  const url = CB_SCF_BASE + path;
  const headers = {
    "X-Admin-Password": CB_ADMIN_PWD,
    ...options.headers,
  };
  if (options.body && typeof options.body === "string") {
    headers["Content-Type"] = "application/json";
  }
  const resp = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body,
  });
  return resp;
}
async function cbJson(path, options = {}) {
  const resp = await cbCall(path, options);
  return await resp.json();
}
function hasBackup(env) {
  return !!(env.KV_BACKUP || env.BUCKET_BACKUP);
}
var ENC_PREFIX = "b64_";
function encodeSegment(segment) {
  if (!segment) return segment;
  const lastDot = segment.lastIndexOf(".");
  let name, ext;
  if (lastDot > 0) {
    name = segment.substring(0, lastDot);
    ext = segment.substring(lastDot);
  } else {
    name = segment;
    ext = "";
  }
  if (/^[a-zA-Z0-9_-]+$/.test(name)) return segment;
  const bytes = new TextEncoder().encode(name);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  const encoded = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return ENC_PREFIX + encoded + ext;
}
function decodeSegment(segment) {
  if (!segment) return segment;
  const lastDot = segment.lastIndexOf(".");
  let name, ext;
  if (lastDot > 0) {
    name = segment.substring(0, lastDot);
    ext = segment.substring(lastDot);
  } else {
    name = segment;
    ext = "";
  }
  if (!name.startsWith(ENC_PREFIX)) return segment;
  try {
    let b64 = name.substring(ENC_PREFIX.length).replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes) + ext;
  } catch {
    return segment;
  }
}
function encodeKey(key) {
  return key.split("/").map(encodeSegment).join("/");
}
function decodeKey(encodedKey) {
  return encodedKey.split("/").map(decodeSegment).join("/");
}
// COS 辅助函数
function cosCamSafeUrlEncode(str) {
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}
function cosObj2str(obj, lowerCaseKey) {
  const list = [];
  const keyList = Object.keys(obj).sort();
  for (const key of keyList) {
    let val = obj[key] === undefined || obj[key] === null ? '' : '' + obj[key];
    const k = lowerCaseKey ? cosCamSafeUrlEncode(key).toLowerCase() : cosCamSafeUrlEncode(key);
    val = cosCamSafeUrlEncode(val) || '';
    list.push(k + '=' + val);
  }
  return list.join('&');
}
async function hmacSha1Hex(key, data) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(data));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function sha1Hex(data) {
  const enc = new TextEncoder();
  const hash = await crypto.subtle.digest('SHA-1', enc.encode(data));
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function getCosHost(env) {
  return `${env.COS_BUCKET}.cos.${env.COS_REGION}.myqcloud.com`;
}
async function cosGetAuth(env, method, key, queryParams, expires) {
  const host = getCosHost(env);
  const headers = { Host: host };
  const pathname = '/' + key.replace(/^\//, '');
  const now = Math.floor(Date.now() / 1000) - 1;
  const exp = now + (expires || 3600);
  const qSignTime = now + ';' + exp;
  const qKeyTime = qSignTime;
  const qHeaderList = Object.keys(headers).sort().map(k => cosCamSafeUrlEncode(k).toLowerCase()).join(';');
  const qUrlParamList = Object.keys(queryParams || {}).sort().map(k => cosCamSafeUrlEncode(k).toLowerCase()).join(';');
  const signKey = await hmacSha1Hex(env.COS_SECRET_KEY, qKeyTime);
  const formatString = [method.toLowerCase(), pathname, cosObj2str(queryParams || {}, true), cosObj2str(headers, true), ''].join('\n');
  const res = await sha1Hex(formatString);
  const stringToSign = ['sha1', qSignTime, res, ''].join('\n');
  const qSignature = await hmacSha1Hex(signKey, stringToSign);
  return ['q-sign-algorithm=sha1', 'q-ak=' + env.COS_SECRET_ID, 'q-sign-time=' + qSignTime, 'q-key-time=' + qKeyTime, 'q-header-list=' + qHeaderList, 'q-url-param-list=' + qUrlParamList, 'q-signature=' + qSignature].join('&');
}
async function cosPresignedUrl(env, method, key, queryParams, expires) {
  const host = getCosHost(env);
  const pathname = '/' + key.replace(/^\//, '');
  const auth = await cosGetAuth(env, method, key, queryParams || {}, expires);
  let url = `https://${host}${pathname}?${auth}`;
  const paramStr = Object.keys(queryParams || {}).sort().map(k => `${cosCamSafeUrlEncode(k)}=${cosCamSafeUrlEncode(queryParams[k])}`).join('&');
  if (paramStr) url += '&' + paramStr;
  return url;
}
// COS API 调用
async function cosInitiateMultipart(env, key) {
  const url = await cosPresignedUrl(env, 'post', key, { uploads: '' }, 3600);
  const resp = await fetch(url, { method: 'POST' });
  if (!resp.ok) throw new Error('COS initiate multipart failed: ' + resp.status);
  const xml = await resp.text();
  const match = xml.match(/<UploadId>([^<]+)<\/UploadId>/);
  if (!match) throw new Error('COS initiate: no UploadId');
  return match[1];
}
async function cosUploadPart(env, key, uploadId, partNumber, data) {
  const url = await cosPresignedUrl(env, 'put', key, { partNumber: String(partNumber), uploadId }, 3600);
  const resp = await fetch(url, { method: 'PUT', body: data });
  if (!resp.ok) throw new Error(`COS upload part ${partNumber} failed: ${resp.status}`);
  return resp.headers.get('etag');
}
async function cosCompleteMultipart(env, key, uploadId, parts) {
  const url = await cosPresignedUrl(env, 'post', key, { uploadId }, 3600);
  const xml = '<CompleteMultipartUpload>' + parts.map(p => `<Part><PartNumber>${p.PartNumber}</PartNumber><ETag>${p.ETag}</ETag></Part>`).join('') + '</CompleteMultipartUpload>';
  const resp = await fetch(url, { method: 'POST', body: xml, headers: { 'Content-Type': 'application/xml' } });
  if (!resp.ok) throw new Error('COS complete multipart failed: ' + resp.status);
}
async function cosAbortMultipart(env, key, uploadId) {
  try {
    const url = await cosPresignedUrl(env, 'delete', key, { uploadId }, 3600);
    await fetch(url, { method: 'DELETE' });
  } catch {}
}
async function cosDeleteObject(env, key) {
  const url = await cosPresignedUrl(env, 'delete', key, {}, 3600);
  const resp = await fetch(url, { method: 'DELETE' });
  return resp.ok;
}
async function cosHeadObject(env, key) {
  const url = await cosPresignedUrl(env, 'head', key, {}, 3600);
  const resp = await fetch(url, { method: 'HEAD' });
  if (!resp.ok) return null;
  return { size: parseInt(resp.headers.get('content-length') || '0'), contentType: resp.headers.get('content-type') };
}
async function cosGetObject(env, key, range) {
  const url = await cosPresignedUrl(env, 'get', key, {}, 3600);
  const headers = {};
  if (range) headers['Range'] = range;
  const resp = await fetch(url, { method: 'GET', headers });
  if (!resp.ok) return null;
  const size = parseInt(resp.headers.get('content-length') || '0');
  const contentRange = resp.headers.get('content-range');
  return { body: resp.body, size, contentType: resp.headers.get('content-type'), contentRange, status: resp.status };
}
async function cosPutObject(env, key, data, contentType) {
  const url = await cosPresignedUrl(env, 'put', key, {}, 3600);
  const headers = {};
  if (contentType) headers['Content-Type'] = contentType;
  const resp = await fetch(url, { method: 'PUT', body: data, headers });
  if (!resp.ok) throw new Error('COS put object failed: ' + resp.status);
}
function getCloudinaryResourceType(key) {
  const ext = (key.split(".").pop() || "").toLowerCase();
  const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "heic", "svg", "tiff", "ico"];
  const videoExts = ["mp4", "mov", "avi", "mkv", "flv", "wmv", "webm", "m4v"];
  if (imageExts.includes(ext)) return "image";
  if (videoExts.includes(ext)) return "video";
  return "raw";
}
async function generateSignature(paramsToSign, apiSecret) {
  const sorted = Object.keys(paramsToSign).sort();
  const stringToSign = sorted.map((k) => `${k}=${paramsToSign[k]}`).join("&");
  const data = new TextEncoder().encode(stringToSign + apiSecret);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function uploadToCloudinary(env, key, data) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  const timestamp2 = Math.floor(Date.now() / 1e3);
  const encodedKey = encodeKey(key);
  const resourceType = getCloudinaryResourceType(key);
  let bytes;
  if (data instanceof ArrayBuffer) bytes = new Uint8Array(data);
  else if (data instanceof Uint8Array) bytes = data;
  else if (data instanceof Blob) bytes = new Uint8Array(await data.arrayBuffer());
  else if (data instanceof ReadableStream) bytes = new Uint8Array(await new Response(data).arrayBuffer());
  else bytes = new TextEncoder().encode(data);
  const size = bytes.length;
  const blob = new Blob([bytes], { type: "application/octet-stream" });
  const paramsToSign = {
    public_id: encodedKey,
    timestamp: timestamp2.toString(),
    overwrite: "true"
  };
  const signature = await generateSignature(paramsToSign, apiSecret);
  const formData = new FormData();
  formData.append("file", blob, key.split("/").pop() || "file");
  formData.append("public_id", encodedKey);
  formData.append("timestamp", timestamp2.toString());
  formData.append("api_key", apiKey);
  formData.append("signature", signature);
  formData.append("overwrite", "true");
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    { method: "POST", body: formData }
  );
  const result = await response.json();
  if (result.error) throw new Error(`Cloudinary: ${result.error.message}`);
  return {
    size,
    secure_url: result.secure_url,
    public_id: result.public_id,
    format: result.format,
    resource_type: result.resource_type,
    bytes: result.bytes,
    created_at: result.created_at
  };
}
function getCloudinaryDirectUrl(env, key) {
  const encodedKey = encodeKey(key);
  const resourceType = getCloudinaryResourceType(key);
  return `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${encodedKey}`;
}
function getCloudinaryUrl(env, key) {
  return getCloudinaryDirectUrl(env, key);
}
async function generateUploadParams(env, key) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  const timestamp2 = Math.floor(Date.now() / 1e3);
  const encodedKey = encodeKey(key);
  const resourceType = getCloudinaryResourceType(key);
  const paramsToSign = {
    public_id: encodedKey,
    timestamp: timestamp2.toString(),
    overwrite: "true"
  };
  const signature = await generateSignature(paramsToSign, apiSecret);
  return {
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    params: {
      public_id: encodedKey,
      timestamp: timestamp2.toString(),
      api_key: apiKey,
      signature,
      overwrite: "true"
    },
    resourceType,
    encodedKey
  };
}
async function deleteFromCloudinary(env, key) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  const timestamp2 = Math.floor(Date.now() / 1e3);
  const encodedKey = encodeKey(key);
  const resourceType = getCloudinaryResourceType(key);
  const paramsToSign = { public_id: encodedKey, timestamp: timestamp2.toString() };
  const signature = await generateSignature(paramsToSign, apiSecret);
  const formData = new FormData();
  formData.append("public_id", encodedKey);
  formData.append("timestamp", timestamp2.toString());
  formData.append("api_key", apiKey);
  formData.append("signature", signature);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`,
    { method: "POST", body: formData }
  );
  const result = await response.json();
  return result;
}
async function listFromCloudinary(env, prefix = "") {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  const auth = btoa(`${apiKey}:${apiSecret}`);
  const encodedPrefix = prefix ? encodeKey(prefix) : "";
  const resourceTypes = ["image", "raw", "video"];
  let allResources = [];
  for (const rt of resourceTypes) {
    let nextCursor = null;
    do {
      const params = new URLSearchParams({
        type: "upload",
        max_results: "500"
      });
      if (encodedPrefix) params.append("prefix", encodedPrefix);
      if (nextCursor) params.append("next_cursor", nextCursor);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/${rt}?${params}`,
        { headers: { "Authorization": `Basic ${auth}` } }
      );
      const data = await response.json();
      if (data.error) {
        break;
      }
      allResources = allResources.concat(data.resources || []);
      nextCursor = data.next_cursor;
    } while (nextCursor);
  }
  return allResources.map((r) => ({
    key: decodeKey(r.public_id),
    size: r.bytes || 0,
    uploaded: r.created_at || null,
    contentType: r.format || null,
    url: r.secure_url
  }));
}
async function headCloudinary(env, key) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  const auth = btoa(`${apiKey}:${apiSecret}`);
  const encodedKey = encodeKey(key);
  const resourceType = getCloudinaryResourceType(key);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload/${encodeURIComponent(encodedKey)}`,
    { headers: { "Authorization": `Basic ${auth}` } }
  );
  if (response.status === 404) return null;
  const data = await response.json();
  if (data.error) return null;
  return {
    key,
    size: data.bytes || 0,
    uploaded: data.created_at || null
  };
}
async function storeMetadata(env, key, metadata) {
  if (!env.KV) return;
  const metaKey = INDEX_PREFIX + key;
  const metaValue = JSON.stringify(metadata);
  const kvMeta = { size: metadata.size || 0, uploaded: metadata.uploaded || null, chunked: metadata.chunked || false };
  await env.KV.put(metaKey, metaValue, { metadata: kvMeta });
  if (hasBackup(env)) {
    try {
      await env.KV_BACKUP.put(metaKey, metaValue, { metadata: kvMeta });
    } catch {
    }
  }
}
async function deleteMetadata(env, key) {
  if (!env.KV) return;
  const metaKey = INDEX_PREFIX + key;
  await env.KV.delete(metaKey);
  if (hasBackup(env)) {
    try {
      await env.KV_BACKUP.delete(metaKey);
    } catch {
    }
  }
}
async function putObject(env, key, data, metadata = {}) {
  const storageType = getStorageType(env);
  if (storageType === "cloudbase") {
    // CloudBase 存储：通过 SCF 函数上传
    let buf;
    if (data instanceof Uint8Array) buf = data;
    else if (data instanceof ArrayBuffer) buf = new Uint8Array(data);
    else buf = new Uint8Array(data);
    // 分块转换 base64，避免 call stack 溢出
    const CHUNK = 0x8000;
    let binary = "";
    for (let i = 0; i < buf.length; i += CHUNK) {
      binary += String.fromCharCode.apply(null, buf.subarray(i, i + CHUNK));
    }
    const b64 = btoa(binary);
    const resp = await cbJson("/upload", {
      method: "POST",
      body: JSON.stringify({
        key,
        fileContent: b64,
        contentType: metadata.contentType || null,
        size: buf.length,
      }),
    });
    if (!resp.success) throw new Error(resp.error || "CloudBase 上传失败");
    return;
  }
  if (storageType === "cloudinary") {
    const result = await uploadToCloudinary(env, key, data);
    const meta = {
      size: result.size,
      uploaded: (/* @__PURE__ */ new Date()).toISOString(),
      contentType: metadata.contentType || result.format || null,
      cloudinaryUrl: result.secure_url,
      ...metadata
    };
    await storeMetadata(env, key, meta);
  } else if (storageType === "r2") {
    let body = data;
    if (data instanceof Uint8Array) body = data.buffer;
    const dataSize = body.byteLength || body.size || 0;
    await env.BUCKET.put(key, body, { customMetadata: metadata });
    if (env.KV) {
      await storeMetadata(env, key, {
        size: dataSize,
        uploaded: (/* @__PURE__ */ new Date()).toISOString(),
        ...metadata
      });
    }
  } else if (storageType === "kv") {
    let buf;
    if (data instanceof ArrayBuffer) buf = data;
    else if (data instanceof Uint8Array) buf = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    else if (data instanceof Blob) buf = await data.arrayBuffer();
    else if (data instanceof ReadableStream) buf = await new Response(data).arrayBuffer();
    else buf = data;
    const size = buf.byteLength || buf.size || 0;
    const CHUNK_SIZE = 20 * 1024 * 1024;
    if (size > CHUNK_SIZE) {
      const chunkCount = Math.ceil(size / CHUNK_SIZE);
      for (let i = 0; i < chunkCount; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, size);
        const chunkData = buf.slice(start, end);
        await env.KV.put(`${key}__chunk_${i}`, chunkData);
      }
      await storeMetadata(env, key, {
        size,
        uploaded: (/* @__PURE__ */ new Date()).toISOString(),
        contentType: metadata.contentType || null,
        chunked: true,
        chunkCount,
        ...metadata
      });
    } else {
      await env.KV.put(key, buf, {
        metadata: { ...metadata, size, uploaded: (/* @__PURE__ */ new Date()).toISOString() }
      });
      await storeMetadata(env, key, {
        size,
        uploaded: (/* @__PURE__ */ new Date()).toISOString(),
        contentType: metadata.contentType || null,
        ...metadata
      });
    }
  }
}
async function getObject(env, key, range) {
  const storageType = getStorageType(env);
  if (storageType === "cloudbase") {
    // CloudBase 存储：通过 SCF 函数下载
    const resp = await cbCall("/download?key=" + encodeURIComponent(key));
    if (!resp.ok) return null;
    const buf = await resp.arrayBuffer();
    return {
      body: buf,
      size: buf.byteLength,
      totalSize: buf.byteLength,
      uploaded: null,
      contentType: resp.headers.get("Content-Type"),
      arrayBuffer: async () => buf,
    };
  }
  if (storageType === "cloudinary") {
    let url = null;
    if (env.KV) {
      try {
        const meta = await env.KV.get(INDEX_PREFIX + key, { type: "json" });
        if (meta && meta.cloudinaryUrl) url = meta.cloudinaryUrl;
      } catch {
      }
    }
    if (!url) url = getCloudinaryUrl(env, key);
    const fetchOpts = range ? { headers: { Range: range } } : {};
    const response = await fetch(url, fetchOpts);
    if (!response.ok && response.status !== 206) return null;
    // 解析 Content-Range 获取总文件大小（Range 请求时）
    let totalSize = parseInt(response.headers.get("Content-Length") || "0");
    const contentRange = response.headers.get("Content-Range");
    if (contentRange) {
      const m = contentRange.match(/bytes \d+-\d+\/(\d+)/);
      if (m) totalSize = parseInt(m[1]);
    }
    return {
      body: response.body,
      size: parseInt(response.headers.get("Content-Length") || "0"),
      totalSize: totalSize,
      contentRange: contentRange,
      uploaded: null,
      contentType: response.headers.get("Content-Type"),
      arrayBuffer: () => response.arrayBuffer()
    };
  } else if (storageType === "r2") {
    let r2Range = undefined;
    if (range) {
      const m = range.match(/bytes=(\d+)-(\d*)/);
      if (m) {
        const offset = parseInt(m[1]);
        const end = m[2] ? parseInt(m[2]) : undefined;
        r2Range = { offset, length: end !== undefined ? end - offset + 1 : undefined };
      }
    }
    const obj = r2Range ? await env.BUCKET.get(key, { range: r2Range }) : await env.BUCKET.get(key);
    if (!obj) return null;
    // Range 请求时需要获取总文件大小
    let totalSize = obj.size;
    if (r2Range) {
      const head = await env.BUCKET.head(key);
      if (head) totalSize = head.size;
    }
    return {
      body: obj.body,
      size: obj.size,
      totalSize: totalSize,
      uploaded: obj.uploaded,
      contentType: obj.httpMetadata?.contentType,
      arrayBuffer: () => obj.arrayBuffer()
    };
  } else if (storageType === "kv") {
    const meta = await env.KV.get(INDEX_PREFIX + key, { type: "json" });
    if (meta && meta.chunked) {
      const chunks = [];
      let totalSize = 0;
      for (let i = 0; i < meta.chunkCount; i++) {
        const chunk = await env.KV.get(`${key}__chunk_${i}`, { type: "arrayBuffer" });
        if (!chunk) return null;
        chunks.push(new Uint8Array(chunk));
        totalSize += chunk.byteLength;
      }
      const merged = new Uint8Array(totalSize);
      let offset = 0;
      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.byteLength;
      }
      return {
        body: merged.buffer,
        size: totalSize,
        totalSize,
        uploaded: meta.uploaded || null,
        contentType: meta.contentType || null,
        arrayBuffer: async () => merged.buffer
      };
    }
    const result = await env.KV.getWithMetadata(key, { type: "arrayBuffer" });
    if (!result.value) {
      if (meta) {
        return null;
      }
      return null;
    }
    return {
      body: result.value,
      size: result.value.byteLength,
      totalSize: result.value.byteLength,
      uploaded: result.metadata?.uploaded || (meta && meta.uploaded) || null,
      contentType: result.metadata?.contentType || (meta && meta.contentType) || null,
      arrayBuffer: async () => result.value
    };
  }
  if (storageType === "cos") {
    const obj = await cosGetObject(env, key, range);
    if (!obj) return null;
    return obj;
  }
  return null;
}
async function listObjects(env, prefix, excludeBak = true) {
  const storageType = getStorageType(env);
  if (storageType === "cloudbase") {
    // CloudBase 存储：通过 SCF 函数列表
    const resp = await cbJson("/list");
    if (!resp.success) return [];
    const result = [];
    function collectFiles(node, currentPath) {
      if (node._files) {
        for (const f of node._files) {
          if (excludeBak && f.isBak) continue;
          if (prefix && !f.key.startsWith(prefix)) continue;
          result.push({
            key: f.key,
            size: f.size || 0,
            uploaded: f.uploaded || null,
          });
        }
      }
      for (const k in node) {
        if (k === "_files") continue;
        collectFiles(node[k], currentPath + k + "/");
      }
    }
    if (resp.tree) collectFiles(resp.tree, "");
    return result;
  }
  if (storageType === "cloudinary") {
    const resources = await listFromCloudinary(env, prefix);
    return resources.filter((r) => !excludeBak || !r.key.endsWith(".bak"));
  } else if (storageType === "r2") {
    const result = [];
    let cursor;
    do {
      const listed = await env.BUCKET.list({ cursor, prefix, limit: 1e3 });
      for (const obj of listed.objects) {
        if (excludeBak && obj.key.endsWith(".bak")) continue;
        result.push({ key: obj.key, size: obj.size, uploaded: obj.uploaded });
      }
      cursor = listed.truncated ? listed.cursor : null;
    } while (cursor);
    return result;
  } else if (storageType === "kv") {
    const result = [];
    let cursor;
    const listPrefix = INDEX_PREFIX + (prefix || "");
    do {
      const listed = await env.KV.list({ prefix: listPrefix, cursor, limit: 1e3 });
      for (const k of listed.keys) {
        const originalKey = k.name.slice(INDEX_PREFIX.length);
        if (excludeBak && originalKey.endsWith(".bak")) continue;
        result.push({ key: originalKey, size: k.metadata?.size || 0, uploaded: k.metadata?.uploaded || null });
      }
      cursor = listed.list_complete ? null : listed.cursor;
    } while (cursor);
    return result;
  }
  return [];
}
async function listAllObjects(env) {
  return await listObjects(env, "", false);
}
async function listAllObjectsWithBackup(env, excludeBak = true) {
  const storageType = getStorageType(env);
  if (storageType === "cloudbase") {
    // CloudBase 存储：备份文件在同一存储中，直接返回列表
    return await listObjects(env, "", excludeBak);
  }
  if (storageType === "cloudinary") {
    const primary2 = await listObjects(env, "", excludeBak);
    const keySet2 = new Set(primary2.map((o) => o.key));
    if (hasBackup(env)) {
      let cursor;
      do {
        const listed = await env.KV_BACKUP.list({ prefix: INDEX_PREFIX, cursor, limit: 1e3 });
        for (const k of listed.keys) {
          const originalKey = k.name.slice(INDEX_PREFIX.length);
          if (excludeBak && originalKey.endsWith(".bak")) continue;
          if (!keySet2.has(originalKey)) {
            primary2.push({ key: originalKey, size: k.metadata?.size || 0, uploaded: k.metadata?.uploaded || null });
            keySet2.add(originalKey);
          }
        }
        cursor = listed.list_complete ? null : listed.cursor;
      } while (cursor);
    }
    return primary2;
  }
  const primary = await listObjects(env, "", excludeBak);
  const keySet = new Set(primary.map((o) => o.key));
  if (hasBackup(env)) {
    const backupBinding = env.BUCKET_BACKUP || env.KV_BACKUP;
    const isBackupR2 = !!env.BUCKET_BACKUP;
    let backupList = [];
    if (isBackupR2) {
      let cursor;
      do {
        const listed = await env.BUCKET_BACKUP.list({ cursor, limit: 1e3 });
        for (const obj of listed.objects) {
          if (excludeBak && obj.key.endsWith(".bak")) continue;
          backupList.push({ key: obj.key, size: obj.size, uploaded: obj.uploaded });
        }
        cursor = listed.truncated ? listed.cursor : null;
      } while (cursor);
    } else {
      let cursor;
      do {
        const listed = await env.KV_BACKUP.list({ prefix: INDEX_PREFIX, cursor, limit: 1e3 });
        for (const k of listed.keys) {
          const originalKey = k.name.slice(INDEX_PREFIX.length);
          if (excludeBak && originalKey.endsWith(".bak")) continue;
          backupList.push({ key: originalKey, size: k.metadata?.size || 0, uploaded: k.metadata?.uploaded || null });
        }
        cursor = listed.list_complete ? null : listed.cursor;
      } while (cursor);
    }
    for (const obj of backupList) {
      if (!keySet.has(obj.key)) {
        primary.push(obj);
        keySet.add(obj.key);
      }
    }
  }
  return primary;
}
async function deleteObject(env, key) {
  const storageType = getStorageType(env);
  if (storageType === "cloudbase") {
    // CloudBase 存储：通过 SCF 函数删除
    await cbJson("/delete", {
      method: "POST",
      body: JSON.stringify({ keys: [key] }),
    });
    return;
  }
  if (storageType === "cloudinary") {
    await deleteFromCloudinary(env, key);
    await deleteMetadata(env, key);
  } else if (storageType === "r2") {
    await env.BUCKET.delete(key);
  } else if (storageType === "kv") {
    const meta = await env.KV.get(INDEX_PREFIX + key, { type: "json" });
    if (meta && meta.chunked) {
      for (let i = 0; i < meta.chunkCount; i++) {
        await env.KV.delete(`${key}__chunk_${i}`);
      }
    }
    await env.KV.delete(key);
    await deleteMetadata(env, key);
  }
  if (storageType === "cos") {
    // 删除 COS 对象
    await cosDeleteObject(env, key);
    // 清理 COS 上传临时数据
    const uploadId = await env.KV.get(`cos_upload:${key}`);
    if (uploadId) {
      await cosAbortMultipart(env, key, uploadId);
      await env.KV.delete(`cos_upload:${key}`);
      await env.KV.delete(`cos_parts:${key}`);
    }
    // 删除 KV 元数据
    await deleteMetadata(env, key);
  }
  if (hasBackup(env)) {
    const backupBinding = env.BUCKET_BACKUP || env.KV_BACKUP;
    try {
      await backupBinding.delete(key);
    } catch {
    }
    if (storageType === "cloudinary") {
      try {
        await env.KV_BACKUP.delete(INDEX_PREFIX + key);
      } catch {
      }
    }
  }
}
async function renameObject(env, oldKey, newKey) {
  const data = await getObject(env, oldKey);
  if (!data) throw new Error("\u539F\u6587\u4EF6\u4E0D\u5B58\u5728");
  const buf = await data.arrayBuffer();
  await putObject(env, newKey, buf, {
    size: data.size,
    uploaded: data.uploaded,
    contentType: data.contentType
  });
  await deleteObject(env, oldKey);
  return { oldKey, newKey, size: data.size };
}
async function getStorageStats(env) {
  const locations = [];
  const storageType = getStorageType(env);
  const primaryObjs = await listAllObjects(env);
  let primarySize = 0;
  let primaryCount = 0;
  for (const obj of primaryObjs) {
    // 跳过备份文件
    if (obj.key.endsWith(".bak")) continue;
    primarySize += obj.size || 0;
    primaryCount++;
  }
  let primaryTypeName, primaryBinding;
  if (storageType === "cloudbase") {
    primaryTypeName = "CloudBase \u4e91\u5b58\u50a8";
    primaryBinding = "CB_STORAGE";
  } else if (storageType === "cloudinary") {
    primaryTypeName = "Cloudinary (25GB \u514D\u8D39)";
    primaryBinding = "CLOUDINARY";
  } else if (storageType === "r2") {
    primaryTypeName = "Cloudflare R2";
    primaryBinding = "BUCKET";
  } else if (storageType === "cos") {
    primaryTypeName = "\u817E\u8BAF\u4E91 COS (50GB\u514D\u8D39)";
    primaryBinding = "COS";
  } else {
    primaryTypeName = "Cloudflare KV";
    primaryBinding = "KV";
  }
  locations.push({
    name: "\u4E3B\u5B58\u50A8",
    type: primaryTypeName,
    fileCount: primaryCount,
    totalSize: primarySize,
    binding: primaryBinding
  });
  if (hasBackup(env)) {
    const isBackupR2 = !!env.BUCKET_BACKUP;
    let backupSize = 0;
    let backupCount = 0;
    if (storageType === "cloudinary") {
      let cursor;
      do {
        const listed = await env.KV_BACKUP.list({ prefix: INDEX_PREFIX, cursor, limit: 1e3 });
        for (const k of listed.keys) {
          backupCount++;
        }
        cursor = listed.list_complete ? null : listed.cursor;
      } while (cursor);
    } else if (isBackupR2) {
      let cursor;
      do {
        const listed = await env.BUCKET_BACKUP.list({ cursor, limit: 1e3 });
        for (const obj of listed.objects) {
          backupSize += obj.size || 0;
          backupCount++;
        }
        cursor = listed.truncated ? listed.cursor : null;
      } while (cursor);
    } else {
      let cursor;
      do {
        const listed = await env.KV_BACKUP.list({ cursor, limit: 1e3 });
        for (const k of listed.keys) {
          backupSize += k.metadata?.size || 0;
          backupCount++;
        }
        cursor = listed.list_complete ? null : listed.cursor;
      } while (cursor);
    }
    locations.push({
      name: "\u5907\u4EFD\u5B58\u50A8",
      type: env.BUCKET_BACKUP ? "Cloudflare R2 (\u5907\u4EFD)" : "Cloudflare KV (\u5907\u4EFD)",
      fileCount: backupCount,
      totalSize: backupSize,
      binding: env.BUCKET_BACKUP ? "BUCKET_BACKUP" : "KV_BACKUP"
    });
  }
  return {
    locations,
    totalFiles: primaryCount,
    totalSize: locations.reduce((s, l) => s + l.totalSize, 0),
    backupEnabled: hasBackup(env)
  };
}
async function headObject(env, key) {
  const storageType = getStorageType(env);
  if (storageType === "cloudbase") {
    // CloudBase 存储：通过 SCF 函数获取文件信息
    const resp = await cbJson("/list");
    if (!resp.success) return null;
    function findInTree(node, targetKey) {
      if (node._files) {
        for (const f of node._files) {
          if (f.key === targetKey) return f;
        }
      }
      for (const k in node) {
        if (k === "_files") continue;
        const found = findInTree(node[k], targetKey);
        if (found) return found;
      }
      return null;
    }
    if (!resp.tree) return null;
    const file = findInTree(resp.tree, key);
    if (!file) return null;
    return { key, size: file.size || 0, uploaded: file.uploaded || null };
  }
  if (storageType === "cloudinary") {
    return await headCloudinary(env, key);
  } else if (storageType === "r2") {
    const obj = await env.BUCKET.head(key);
    if (!obj) return null;
    return { key, size: obj.size, uploaded: obj.uploaded };
  } else if (storageType === "kv") {
    const result = await env.KV.getWithMetadata(key);
    if (result.value || result.metadata) {
      return { key, size: result.metadata?.size || 0, uploaded: result.metadata?.uploaded || null };
    }
    const meta = await env.KV.get(INDEX_PREFIX + key, { type: "json" });
    if (meta) {
      return { key, size: meta.size || 0, uploaded: meta.uploaded || null };
    }
    return null;
  }
  if (storageType === "cos") {
    const meta = await env.KV.get(INDEX_PREFIX + key, { type: "json" });
    if (meta) return { key, size: meta.size, uploaded: meta.uploaded, contentType: meta.contentType };
    const head = await cosHeadObject(env, key);
    if (!head) return null;
    return { key, size: head.size, contentType: head.contentType };
  }
  return null;
}

// node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  // determined by compression function
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
  d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i = 0; i < d.length; ++i) {
    if (d[i])
      t.push({ s: i, f: d[i] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return { t: et, l: 0 };
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return { t: v, l: 1 };
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i2].f ? i0++ : i2++];
    r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i = 1; i < s; ++i) {
    if (t2[i].s > maxSym)
      maxSym = t2[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t2[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>= lft;
    while (dt > 0) {
      var i2_2 = t2[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t2[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return { t: new u8(tr), l: mbt };
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return { c: cl.subarray(0, cli), n: s };
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    ++lcfreq[lclt[i] & 31];
  for (var i = 0; i < lcdt.length; ++i)
    ++lcfreq[lcdt[i] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    var sym = syms[i];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, sym >> 23 & 31), p += fleb[len];
      var dst = sym & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[sym]), p += ll[sym];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
  var s = st.z || dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var lst = st.l;
  var pos = (st.r || 0) & 7;
  if (lvl) {
    if (pos)
      w[0] = st.r >> 3;
    var opt = deo[lvl - 1];
    var n = opt >> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
    for (; i + 2 < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    for (i = Math.max(i, wi); i < s; ++i) {
      syms[li++] = dat[i];
      ++lf[dat[i]];
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst) {
      st.r = pos & 7 | w[pos / 8 | 0] << 3;
      pos -= 7;
      st.h = head, st.p = prev, st.i = i, st.w = wi;
    }
  } else {
    for (var i = st.w || 0; i < s + lst; i += 65535) {
      var e = i + 65535;
      if (e >= s) {
        w[pos / 8 | 0] = lst;
        e = s;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i, e));
    }
    st.i = s;
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = /* @__PURE__ */ function() {
  var t = new Int32Array(256);
  for (var i = 0; i < 256; ++i) {
    var c = i, k = 9;
    while (--k)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t[i] = c;
  }
  return t;
}();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i = 0; i < d.length; ++i)
        cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  if (!st) {
    st = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u8(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
var mrg = function(a, b) {
  var o = {};
  for (var k in a)
    o[k] = a[k];
  for (var k in b)
    o[k] = b[k];
  return o;
};
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
var fltn = function(d, p, t, o) {
  for (var k in d) {
    var val = d[k], n = p + k, op = o;
    if (Array.isArray(val))
      op = mrg(o, val[1]), val = val[0];
    if (ArrayBuffer.isView(val))
      t[n] = [val, op];
    else {
      t[n += "/"] = [new u8(0), op];
      fltn(val, n, t, o);
    }
  }
};
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i = 0; i < str.length; ++i)
      ar_1[i] = str.charCodeAt(i);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
var exfl = function(ex) {
  var le = 0;
  if (ex) {
    for (var k in ex) {
      var l = ex[k].length;
      if (l > 65535)
        err(9);
      le += l + 4;
    }
  }
  return le;
};
var wzh = function(d, b, f, fn, u, c, ce, co) {
  var fl2 = fn.length, ex = f.extra, col = co && co.length;
  var exl = exfl(ex);
  wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
  if (ce != null)
    d[b++] = 20, d[b++] = f.os;
  d[b] = 20, b += 2;
  d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
  d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
  var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
  if (y < 0 || y > 119)
    err(10);
  wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
  if (c != -1) {
    wbytes(d, b, f.crc);
    wbytes(d, b + 4, c < 0 ? -c - 2 : c);
    wbytes(d, b + 8, f.size);
  }
  wbytes(d, b + 12, fl2);
  wbytes(d, b + 14, exl), b += 16;
  if (ce != null) {
    wbytes(d, b, col);
    wbytes(d, b + 6, f.attrs);
    wbytes(d, b + 10, ce), b += 14;
  }
  d.set(fn, b);
  b += fl2;
  if (exl) {
    for (var k in ex) {
      var exf = ex[k], l = exf.length;
      wbytes(d, b, +k);
      wbytes(d, b + 2, l);
      d.set(exf, b + 4), b += 4 + l;
    }
  }
  if (col)
    d.set(co, b), b += col;
  return b;
};
var wzf = function(o, b, c, d, e) {
  wbytes(o, b, 101010256);
  wbytes(o, b + 8, c);
  wbytes(o, b + 10, c);
  wbytes(o, b + 12, d);
  wbytes(o, b + 16, e);
};
function zipSync(data, opts) {
  if (!opts)
    opts = {};
  var r = {};
  var files = [];
  fltn(data, "", r, opts);
  var o = 0;
  var tot = 0;
  for (var fn in r) {
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var compression = p.level == 0 ? 0 : 8;
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    if (s > 65535)
      err(11);
    var d = compression ? deflateSync(file, p) : file, l = d.length;
    var c = crc();
    c.p(file);
    files.push(mrg(p, {
      size: file.length,
      crc: c.d(),
      c: d,
      f,
      m,
      u: s != fn.length || m && com.length != ms,
      o,
      compression
    }));
    o += 30 + s + exl + l;
    tot += 76 + 2 * (s + exl) + (ms || 0) + l;
  }
  var out = new u8(tot + 22), oe = o, cdl = tot - o;
  for (var i = 0; i < files.length; ++i) {
    var f = files[i];
    wzh(out, f.o, f, f.f, f.u, f.c.length);
    var badd = 30 + f.f.length + exfl(f.extra);
    out.set(f.c, f.o + badd);
    wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
  }
  wzf(out, o, files.length, cdl, oe);
  return out;
}

// src/upload.js
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
function error(msg, status = 400) {
  return json({ success: false, error: msg }, status);
}
function timestamp() {
  const d = /* @__PURE__ */ new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}
async function backupExisting(env, prefix, name) {
  const existing = await listObjects(env, prefix, true);
  if (existing.length === 0) return null;
  const files = {};
  for (const obj of existing) {
    const data = await getObject(env, obj.key);
    if (!data) continue;
    const buf = await data.arrayBuffer();
    const filename = obj.key.split("/").pop();
    files[filename] = new Uint8Array(buf);
  }
  const zipped = zipSync(files);
  const bakName = `\u9AD8\u4E00\uFF0813\uFF09\u73ED${name}_${timestamp()}.bak`;
  await putObject(env, prefix + bakName, zipped);
  for (const obj of existing) {
    await deleteObject(env, obj.key);
  }
  return { count: existing.length, name: bakName };
}
function sortByOriginalName(files) {
  return [...files].sort((a, b) => a.name.localeCompare(b.name, "zh"));
}
async function handleUpload(request, env) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return error("\u65E0\u6CD5\u89E3\u6790\u4E0A\u4F20\u6570\u636E");
  }
  const homework = formData.get("homework");
  const activity = formData.get("activity") || "";
  const name = formData.get("name");
  const workName = cleanWorkName(formData.get("workName") || "");
  const psychIndex = parseInt(formData.get("psychIndex") ?? "-1");
  const areaFilesRaw = formData.get("areaFiles") || "{}";
  let areaFiles;
  try {
    areaFiles = JSON.parse(areaFilesRaw);
  } catch {
    return error("\u533A\u57DF\u6587\u4EF6\u6620\u5C04\u683C\u5F0F\u9519\u8BEF");
  }
  const hwConfig = CONFIG.homeworks[homework];
  if (!hwConfig) return error("\u65E0\u6548\u7684\u4F5C\u4E1A\u9879\u76EE");
  let actConfig = null;
  if (hwConfig.hasActivity) {
    actConfig = hwConfig.activities[activity];
    if (!actConfig) return error("\u65E0\u6548\u7684\u6D3B\u52A8\u9879\u76EE");
  }
  const validNames = hwConfig.hasActivity ? actConfig.names : hwConfig.names;
  if (!validNames.includes(name)) return error("\u65E0\u6548\u7684\u59D3\u540D");
  const files = [];
  let i = 0;
  while (true) {
    const f = formData.get(`file_${i}`);
    if (!f) break;
    if (f instanceof File) {
      files.push({ file: f, name: f.name, ext: getExt(f.name), size: f.size });
    }
    i++;
  }
  if (files.length === 0) return error("\u8BF7\u81F3\u5C11\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");
  const maxSize = getMaxFileSize(env);
  for (const f of files) {
    if (f.size > maxSize) {
      const limitMB = Math.round(maxSize / (1024 * 1024));
      return error(`\u6587\u4EF6 "${f.name}" \u8D85\u8FC7 ${limitMB}MB \u9650\u5236\uFF0C\u8BF7\u538B\u7F29\u540E\u518D\u4E0A\u4F20`);
    }
  }
  const areas = hwConfig.hasActivity ? actConfig.areas : hwConfig.areas;
  if (hwConfig.hasActivity && actConfig.needsWorkName && !workName) {
    return error("\u8BF7\u8F93\u5165\u4F5C\u54C1\u540D\u79F0");
  }
  const processed = [];
  for (const area of areas) {
    const indices = areaFiles[area.id] || [];
    const areaFilesList = indices.map((idx) => files[idx]).filter((f) => f !== void 0);
    if (areaFilesList.length === 0) continue;
    for (const f of areaFilesList) {
      if (!isExtAllowed(f.ext, area.exts)) {
        return error(`\u6587\u4EF6 "${f.name}" \u683C\u5F0F\u4E0D\u652F\u6301\u3002${area.label}\u4EC5\u652F\u6301\uFF1A${area.exts.join(", ")}`);
      }
    }
    if (areaFilesList.length > area.maxFiles) {
      return error(`${area.label}\u6700\u591A\u4E0A\u4F20 ${area.maxFiles} \u4E2A\u6587\u4EF6`);
    }
    if (area.singleExts) {
      for (const ext of area.singleExts) {
        const count = areaFilesList.filter((f) => f.ext === ext).length;
        if (count > 1) {
          return error(`${area.label}\u4E2D .${ext} \u6587\u4EF6\u4EC5\u5141\u8BB8\u4E0A\u4F20\u4E00\u4E2A`);
        }
      }
    }
    const prefix2 = getFolderPrefix(homework, activity, name);
    const baseName = area.nameTemplate.replace("{name}", name).replace("{workName}", workName);
    if (area.needsPsychSelect) {
      if (areaFilesList.length === 1) {
        const f = areaFilesList[0];
        const fileName = `${baseName}.${f.ext}`;
        const data = await f.file.arrayBuffer();
        processed.push({ key: prefix2 + fileName, data });
      } else {
        for (let j = 0; j < areaFilesList.length; j++) {
          const f = areaFilesList[j];
          const actualIdx = indices[j];
          const fileName = actualIdx === psychIndex ? `${baseName}${area.psychSuffix}.${f.ext}` : `${baseName}.${f.ext}`;
          const data = await f.file.arrayBuffer();
          processed.push({ key: prefix2 + fileName, data });
        }
      }
      continue;
    }
    if (area.zipExts && area.multiple) {
      const zipFiles = areaFilesList.filter((f) => area.zipExts.includes(f.ext));
      const singleFiles = areaFilesList.filter((f) => !area.zipExts.includes(f.ext));
      for (const f of singleFiles) {
        const fileName = `${baseName}.${f.ext}`;
        const data = await f.file.arrayBuffer();
        processed.push({ key: prefix2 + fileName, data });
      }
      if (zipFiles.length === 1) {
        const f = zipFiles[0];
        const fileName = area.numberedSuffix ? `${baseName}\uFF081\uFF09.${f.ext}` : `${baseName}.${f.ext}`;
        const data = await f.file.arrayBuffer();
        processed.push({ key: prefix2 + fileName, data });
      } else if (zipFiles.length > 1) {
        const sorted = sortByOriginalName(zipFiles);
        const zipContents = {};
        for (let j = 0; j < sorted.length; j++) {
          const f = sorted[j];
          const num = j + 1;
          const innerName = `${baseName}\uFF08${num}\uFF09.${f.ext}`;
          const data = await f.file.arrayBuffer();
          zipContents[innerName] = new Uint8Array(data);
        }
        const zipped = zipSync(zipContents);
        const zipName = `${baseName}.zip`;
        processed.push({ key: prefix2 + zipName, data: zipped });
      }
      continue;
    }
    if (!area.multiple || areaFilesList.length === 1) {
      const f = areaFilesList[0];
      const fileName = `${baseName}.${f.ext}`;
      const data = await f.file.arrayBuffer();
      processed.push({ key: prefix2 + fileName, data });
    } else {
      for (let j = 0; j < areaFilesList.length; j++) {
        const f = areaFilesList[j];
        const fileName = `${baseName}\uFF08${j + 1}\uFF09.${f.ext}`;
        const data = await f.file.arrayBuffer();
        processed.push({ key: prefix2 + fileName, data });
      }
    }
  }
  if (processed.length === 0) {
    return error("\u6CA1\u6709\u6709\u6548\u7684\u6587\u4EF6\u53EF\u4E0A\u4F20");
  }
  const prefix = getFolderPrefix(homework, activity, name);
  let backupInfo = null;
  try {
    backupInfo = await backupExisting(env, prefix, name);
  } catch (e) {
    return error(`\u5907\u4EFD\u65E7\u6587\u4EF6\u5931\u8D25: ${e.message}`);
  }
  const stored = [];
  for (const item of processed) {
    try {
      await putObject(env, item.key, item.data);
      stored.push(item.key.split("/").pop());
    } catch (e) {
      return error(`\u5B58\u50A8\u6587\u4EF6\u5931\u8D25: ${e.message}`);
    }
  }
  let afterMsg = null;
  for (const area of areas) {
    if (areaFiles[area.id] && areaFiles[area.id].length > 0 && area.afterSubmitMsg) {
      afterMsg = area.afterSubmitMsg;
    }
  }
  return json({
    success: true,
    message: "\u4E0A\u4F20\u6210\u529F\uFF01",
    files: stored,
    backup: backupInfo,
    afterSubmitMsg: afterMsg
  });
}
async function handleMigrateStore(request, env) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return error2("\u65E0\u6CD5\u89E3\u6790\u8BF7\u6C42");
  }
  const { key, size, chunkCount, contentType } = body;
  if (!key) return error2("\u7F3A\u5C11 key \u53C2\u6570");
  const storageType = getStorageType(env);
  if (storageType !== "kv" || !env.KV) {
    return error2("\u8FC1\u79FB\u4EC5\u652F\u6301 KV \u5B58\u50A8\u6A21\u5F0F");
  }
  await storeMetadata(env, key, {
    size: size || 0,
    uploaded: (/* @__PURE__ */ new Date()).toISOString(),
    contentType: contentType || null,
    chunked: true,
    chunkCount: chunkCount || 1
  });
  return json2({ success: true, key, size, chunkCount });
}
async function handleUploadPrepare(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return error("\u65E0\u6CD5\u89E3\u6790\u8BF7\u6C42");
  }
  const { homework, activity: activityRaw, name, workName: rawWorkName, files: fileMetas, areaFiles: areaFilesMap, psychIndex: psychRaw } = body;
  const activity = activityRaw || "";
  const workName = cleanWorkName(rawWorkName || "");
  const psychIndex = parseInt(psychRaw ?? "-1");
  const hwConfig = CONFIG.homeworks[homework];
  if (!hwConfig) return error("\u65E0\u6548\u7684\u4F5C\u4E1A\u9879\u76EE");
  let actConfig = null;
  if (hwConfig.hasActivity) {
    actConfig = hwConfig.activities[activity];
    if (!actConfig) return error("\u65E0\u6548\u7684\u6D3B\u52A8\u9879\u76EE");
  }
  const validNames = hwConfig.hasActivity ? actConfig.names : hwConfig.names;
  if (!validNames.includes(name)) return error("\u65E0\u6548\u7684\u59D3\u540D");
  if (!fileMetas || !Array.isArray(fileMetas) || fileMetas.length === 0) {
    return error("\u8BF7\u81F3\u5C11\u4E0A\u4F20\u4E00\u4E2A\u6587\u4EF6");
  }
  const files = fileMetas.map((m) => ({
    name: m.name,
    ext: getExt(m.name),
    size: m.size || 0
  }));
  const maxSize = getMaxFileSize(env);
  for (const f of files) {
    if (f.size > maxSize) {
      const limitMB = Math.round(maxSize / (1024 * 1024));
      return error(`\u6587\u4EF6 "${f.name}" \u8D85\u8FC7 ${limitMB}MB \u9650\u5236\uFF0C\u8BF7\u538B\u7F29\u540E\u518D\u4E0A\u4F20`);
    }
  }
  const areas = hwConfig.hasActivity ? actConfig.areas : hwConfig.areas;
  if (hwConfig.hasActivity && actConfig.needsWorkName && !workName) {
    return error("\u8BF7\u8F93\u5165\u4F5C\u54C1\u540D\u79F0");
  }
  const items = [];
  for (const area of areas) {
    const indices = areaFilesMap && areaFilesMap[area.id] || [];
    const areaFilesWithIdx = indices.map((idx) => ({ file: files[idx], origIdx: idx })).filter((item) => item.file !== void 0);
    if (areaFilesWithIdx.length === 0) continue;
    const fileList = areaFilesWithIdx.map((a) => a.file);
    for (const f of fileList) {
      if (!isExtAllowed(f.ext, area.exts)) {
        return error(`\u6587\u4EF6 "${f.name}" \u683C\u5F0F\u4E0D\u652F\u6301\u3002${area.label}\u4EC5\u652F\u6301\uFF1A${area.exts.join(", ")}`);
      }
    }
    if (fileList.length > area.maxFiles) {
      return error(`${area.label}\u6700\u591A\u4E0A\u4F20 ${area.maxFiles} \u4E2A\u6587\u4EF6`);
    }
    if (area.singleExts) {
      for (const ext of area.singleExts) {
        const count = fileList.filter((f) => f.ext === ext).length;
        if (count > 1) {
          return error(`${area.label}\u4E2D .${ext} \u6587\u4EF6\u4EC5\u5141\u8BB8\u4E0A\u4F20\u4E00\u4E2A`);
        }
      }
    }
    const prefix2 = getFolderPrefix(homework, activity, name);
    const baseName = area.nameTemplate.replace("{name}", name).replace("{workName}", workName);
    if (area.needsPsychSelect) {
      if (areaFilesWithIdx.length === 1) {
        const a = areaFilesWithIdx[0];
        const fileName = `${baseName}.${a.file.ext}`;
        items.push({ type: "file", key: prefix2 + fileName, sourceIdx: a.origIdx });
      } else {
        for (const a of areaFilesWithIdx) {
          const fileName = a.origIdx === psychIndex ? `${baseName}${area.psychSuffix}.${a.file.ext}` : `${baseName}.${a.file.ext}`;
          items.push({ type: "file", key: prefix2 + fileName, sourceIdx: a.origIdx });
        }
      }
      continue;
    }
    if (area.zipExts && area.multiple) {
      const zipList = areaFilesWithIdx.filter((a) => area.zipExts.includes(a.file.ext));
      const singleList = areaFilesWithIdx.filter((a) => !area.zipExts.includes(a.file.ext));
      for (const a of singleList) {
        const fileName = `${baseName}.${a.file.ext}`;
        items.push({ type: "file", key: prefix2 + fileName, sourceIdx: a.origIdx });
      }
      if (zipList.length === 1) {
        const a = zipList[0];
        const fileName = area.numberedSuffix ? `${baseName}\uFF081\uFF09.${a.file.ext}` : `${baseName}.${a.file.ext}`;
        items.push({ type: "file", key: prefix2 + fileName, sourceIdx: a.origIdx });
      } else if (zipList.length > 1) {
        const sorted = [...zipList].sort((a, b) => a.file.name.localeCompare(b.file.name, "zh"));
        const zipEntries = sorted.map((a, j) => ({
          name: `${baseName}\uFF08${j + 1}\uFF09.${a.file.ext}`,
          sourceIdx: a.origIdx
        }));
        const zipName = `${baseName}.zip`;
        items.push({ type: "zip", key: prefix2 + zipName, zipEntries });
      }
      continue;
    }
    if (!area.multiple || areaFilesWithIdx.length === 1) {
      const a = areaFilesWithIdx[0];
      const fileName = `${baseName}.${a.file.ext}`;
      items.push({ type: "file", key: prefix2 + fileName, sourceIdx: a.origIdx });
    } else {
      for (let j = 0; j < areaFilesWithIdx.length; j++) {
        const a = areaFilesWithIdx[j];
        const fileName = `${baseName}\uFF08${j + 1}\uFF09.${a.file.ext}`;
        items.push({ type: "file", key: prefix2 + fileName, sourceIdx: a.origIdx });
      }
    }
  }
  if (items.length === 0) return error("\u6CA1\u6709\u6709\u6548\u7684\u6587\u4EF6\u53EF\u4E0A\u4F20");
  const prefix = getFolderPrefix(homework, activity, name);
  const storageType = getStorageType(env);
  let afterMsg = null;
  for (const area of areas) {
    if (areaFilesMap[area.id] && areaFilesMap[area.id].length > 0 && area.afterSubmitMsg) {
      afterMsg = area.afterSubmitMsg;
    }
  }
  if (storageType === "kv") {
    for (const item of items) {
      item.filename = item.key.split("/").pop();
    }
    return json({
      success: true,
      items,
      chunkSize: 3 * 1024 * 1024,
      afterSubmitMsg: afterMsg
    });
  }
  if (storageType === "cos") {
    const cosChunkSize = 5 * 1024 * 1024; // COS 最小分片5MB
    for (const item of items) {
      item.filename = item.key.split("/").pop();
    }
    return json({
      success: true,
      items,
      chunkSize: cosChunkSize,
      afterSubmitMsg: afterMsg
    });
  }
  let backupInfo = null;
  try {
    backupInfo = await backupExisting(env, prefix, name);
  } catch (e) {
    return error(`\u5907\u4EFD\u65E7\u6587\u4EF6\u5931\u8D25: ${e.message}`);
  }
  for (const item of items) {
    const up = await generateUploadParams(env, item.key);
    item.uploadUrl = up.uploadUrl;
    item.uploadParams = up.params;
    item.resourceType = up.resourceType;
    item.filename = item.key.split("/").pop();
  }
  return json({
    success: true,
    items,
    backup: backupInfo,
    afterSubmitMsg: afterMsg
  });
}
async function handleUploadComplete(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return error("\u65E0\u6CD5\u89E3\u6790\u8BF7\u6C42");
  }
  const { homework, items: uploadResults } = body;
  const hwConfig = CONFIG.homeworks[homework];
  if (!hwConfig) return error("\u65E0\u6548\u7684\u4F5C\u4E1A\u9879\u76EE");
  const stored = [];
  for (const item of uploadResults) {
    const meta = {
      size: item.size || item.bytes || 0,
      uploaded: (/* @__PURE__ */ new Date()).toISOString(),
      contentType: item.format || null,
      cloudinaryUrl: item.secure_url
    };
    await storeMetadata(env, item.key, meta);
    stored.push(item.key.split("/").pop());
  }
  return json({
    success: true,
    message: "\u4E0A\u4F20\u6210\u529F\uFF01",
    files: stored
  });
}
async function handleUploadChunk(request, env) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return error("\u65E0\u6CD5\u89E3\u6790\u4E0A\u4F20\u6570\u636E");
  }
  const fileKey = formData.get("fileKey");
  const chunkIndex = parseInt(formData.get("chunkIndex"));
  const data = formData.get("data");
  if (!fileKey || isNaN(chunkIndex) || !data) {
    return error("\u7F3A\u5C11\u53C2\u6570 fileKey/chunkIndex/data");
  }
  const chunkData = await data.arrayBuffer();
  const storageType = getStorageType(env);
  if (storageType === "cos" || env.COS_SECRET_ID) {
    // COS 分片上传
    // 检查是否已有 UploadId
    const uploadIdKey = `cos_upload:${fileKey}`;
    let uploadId = await env.KV.get(uploadIdKey);

    if (!uploadId) {
      // 初始化分片上传
      uploadId = await cosInitiateMultipart(env, fileKey);
      await env.KV.put(uploadIdKey, uploadId);
      await env.KV.put(`cos_parts:${fileKey}`, JSON.stringify([]));
    }

    // 上传分片到 COS
    const partNumber = chunkIndex + 1; // COS partNumber 从1开始
    const etag = await cosUploadPart(env, fileKey, uploadId, partNumber, chunkData);

    // 记录 part 信息
    const partsKey = `cos_parts:${fileKey}`;
    const parts = JSON.parse(await env.KV.get(partsKey) || '[]');
    parts.push({ PartNumber: partNumber, ETag: etag });
    await env.KV.put(partsKey, JSON.stringify(parts));

    return json({ success: true, chunkIndex });
  }
  if (!env.KV) return error("KV \u5B58\u50A8\u672A\u914D\u7F6E");
  await env.KV.put(`${fileKey}__chunk_${chunkIndex}`, chunkData);
  return json({ success: true, chunkIndex });
}
async function handleUploadFinalize(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return error("\u65E0\u6CD5\u89E3\u6790\u8BF7\u6C42");
  }
  const storageType = getStorageType(env);
  if (storageType === "cos") {
    const { fileKey, chunkCount, filename, homework: hw, activity: act, name: nm, size: sz, contentType: ct } = body;

    // 获取 UploadId 和 parts
    const uploadIdKey = `cos_upload:${fileKey}`;
    const partsKey = `cos_parts:${fileKey}`;
    const uploadId = await env.KV.get(uploadIdKey);
    const parts = JSON.parse(await env.KV.get(partsKey) || '[]');

    if (uploadId && parts.length > 0) {
      // 完成 COS 分片上传
      await cosCompleteMultipart(env, fileKey, uploadId, parts);

      // 清理临时数据
      await env.KV.delete(uploadIdKey);
      await env.KV.delete(partsKey);
    }

    // 存储元数据
    await storeMetadata(env, fileKey, {
      size: sz || 0,
      uploaded: new Date().toISOString(),
      contentType: ct || null,
      chunked: false,
      storage: 'cos'
    });

    return json({
      success: true,
      message: "\u4E0A\u4F20\u6210\u529F\uFF01",
      files: [filename || fileKey.split("/").pop()]
    });
  }
  const { homework, activity: activityRaw, name, workName: rawWorkName, files: uploadFiles } = body;
  const activity = activityRaw || "";
  const workName = cleanWorkName(rawWorkName || "");
  const hwConfig = CONFIG.homeworks[homework];
  if (!hwConfig) return error("\u65E0\u6548\u7684\u4F5C\u4E1A\u9879\u76EE");
  let actConfig = null;
  if (hwConfig.hasActivity) {
    actConfig = hwConfig.activities[activity];
    if (!actConfig) return error("\u65E0\u6548\u7684\u6D3B\u52A8\u9879\u76EE");
  }
  const validNames = hwConfig.hasActivity ? actConfig.names : hwConfig.names;
  if (!validNames.includes(name)) return error("\u65E0\u6548\u7684\u59D3\u540D");
  if (!uploadFiles || !Array.isArray(uploadFiles) || uploadFiles.length === 0) {
    return error("\u6CA1\u6709\u6587\u4EF6\u53EF\u5B58\u50A8");
  }
  const prefix = getFolderPrefix(homework, activity, name);
  let backupInfo = null;
  try {
    backupInfo = await backupExisting(env, prefix, name);
  } catch (e) {
    return error(`\u5907\u4EFD\u65E7\u6587\u4EF6\u5931\u8D25: ${e.message}`);
  }
  const stored = [];
  for (const file of uploadFiles) {
    await storeMetadata(env, file.key, {
      size: file.size || 0,
      uploaded: (/* @__PURE__ */ new Date()).toISOString(),
      contentType: file.contentType || null,
      chunked: true,
      chunkCount: file.chunkCount || 1
    });
    stored.push(file.key.split("/").pop());
  }
  let afterMsg = null;
  const areas = hwConfig.hasActivity ? actConfig.areas : hwConfig.areas;
  for (const area of areas) {
    if (area.afterSubmitMsg) {
      afterMsg = area.afterSubmitMsg;
      break;
    }
  }
  return json({
    success: true,
    message: "\u4E0A\u4F20\u6210\u529F\uFF01",
    files: stored,
    backup: backupInfo,
    afterSubmitMsg: afterMsg
  });
}
function json2(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
function error2(msg, status = 400) {
  return json2({ success: false, error: msg }, status);
}
function checkAuth(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  const password = request.headers.get("X-Admin-Password") || "";
  const expected = env.ADMIN_PASSWORD || "";
  if (!expected) return { ok: false, msg: "\u7BA1\u7406\u5458\u5BC6\u7801\u672A\u914D\u7F6E" };
  if (token === expected || password === expected) return { ok: true };
  return { ok: false, msg: "\u5BC6\u7801\u9519\u8BEF" };
}
async function listFiles(env) {
  const allObjects = await listAllObjects(env);
  const tree = {};
  for (const obj of allObjects) {
    const parts = obj.key.split("/");
    let node = tree;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!node[parts[i]]) node[parts[i]] = {};
      node = node[parts[i]];
    }
    const filename = parts[parts.length - 1];
    if (!node._files) node._files = [];
    const ext = getExt(filename);
    node._files.push({
      key: obj.key,
      name: filename,
      size: obj.size,
      uploaded: obj.uploaded,
      isBak: filename.endsWith(".bak"),
      ext,
      isImage: isImage(ext),
      isVideo: ["mp4", "mov"].includes(ext),
      isDoc: ["docx", "pdf", "xlsx"].includes(ext),
      isPptx: ext === "pptx",
      isZip: ext === "zip"
    });
  }
  return { tree, total: allObjects.length };
}
async function handleVerify(request, env) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  return json2({ success: true, message: "\u9A8C\u8BC1\u6210\u529F" });
}
async function handleList(request, env) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  const { tree, total } = await listFiles(env);
  return json2({ success: true, tree, total });
}
// 公开接口：返回作业提交情况（不需要鉴权，仅返回提交状态，不含文件内容）
async function handleStatus(env) {
  const allObjects = await listAllObjects(env);
  // 构建已提交集合：key 格式为 "作业X/活动Y/姓名/文件名"
  const submittedSet = {};
  for (const obj of allObjects) {
    const parts = obj.key.split("/");
    if (parts.length >= 3) {
      const hwKey = parts[0];
      const actKey = parts.length >= 4 ? parts[1] : null;
      const name = actKey ? parts[2] : parts[1];
      const fileKey = actKey ? parts[3] : parts[2];
      if (fileKey && !fileKey.endsWith(".bak")) {
        const folderKey = actKey ? `${hwKey}/${actKey}/${name}` : `${hwKey}/${name}`;
        if (!submittedSet[folderKey]) {
          submittedSet[folderKey] = { count: 0, lastUploaded: null };
        }
        submittedSet[folderKey].count++;
        if (obj.uploaded) {
          const ts = new Date(obj.uploaded).getTime();
          if (!submittedSet[folderKey].lastUploaded || ts > submittedSet[folderKey].lastUploaded) {
            submittedSet[folderKey].lastUploaded = obj.uploaded;
          }
        }
      }
    }
  }
  // 根据 CONFIG 构建完整名单及提交状态
  const result = {};
  for (const [hwKey, hw] of Object.entries(CONFIG.homeworks)) {
    if (hw.hasActivity) {
      for (const [actKey, act] of Object.entries(hw.activities)) {
        for (const name of act.names) {
          const folderKey = `${hwKey}/${actKey}/${name}`;
          const sub = submittedSet[folderKey] || { count: 0, lastUploaded: null };
          if (!result[hwKey]) result[hwKey] = {};
          if (!result[hwKey][actKey]) result[hwKey][actKey] = [];
          result[hwKey][actKey].push({
            name,
            submitted: sub.count > 0,
            fileCount: sub.count,
            lastUploaded: sub.lastUploaded,
          });
        }
      }
    } else {
      for (const name of (hw.names || [])) {
        const folderKey = `${hwKey}/${name}`;
        const sub = submittedSet[folderKey] || { count: 0, lastUploaded: null };
        if (!result[hwKey]) result[hwKey] = {};
        if (!result[hwKey]["__default__"]) result[hwKey]["__default__"] = [];
        result[hwKey]["__default__"].push({
          name,
          submitted: sub.count > 0,
          fileCount: sub.count,
          lastUploaded: sub.lastUploaded,
        });
      }
    }
  }
  // 统计
  let totalExpected = 0, totalSubmitted = 0;
  for (const hw of Object.values(result)) {
    for (const act of Object.values(hw)) {
      totalExpected += act.length;
      totalSubmitted += act.filter(s => s.submitted).length;
    }
  }
  // totalFiles 仅统计非备份文件
  const nonBackupFiles = allObjects.filter(o => !o.key.endsWith(".bak")).length;
  return json2({ success: true, status: result, totalExpected, totalSubmitted, totalFiles: nonBackupFiles });
}
async function handleDownload(request, env, url) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  const key = url.searchParams.get("key");
  if (!key) return error2("\u7F3A\u5C11\u6587\u4EF6 key \u53C2\u6570");
  const rangeHeader = request.headers.get("Range");
  const obj = await getObject(env, key, rangeHeader || undefined);
  if (!obj) return error2("\u6587\u4EF6\u4E0D\u5B58\u5728", 404);
  const filename = key.split("/").pop();
  const headers = new Headers();
  headers.set("Content-Type", obj.contentType || "application/octet-stream");
  headers.set("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
  headers.set("Accept-Ranges", "bytes");
  if (rangeHeader && obj.contentRange) {
    // Cloudinary 已返回 Content-Range，直接转发
    headers.set("Content-Range", obj.contentRange);
    headers.set("Content-Length", obj.size);
    return new Response(obj.body, { status: 206, headers });
  } else if (rangeHeader) {
    const m = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (m) {
      const start = parseInt(m[1]);
      const end = m[2] ? parseInt(m[2]) : start + obj.size - 1;
      const total = obj.totalSize || (obj.size + start);
      headers.set("Content-Range", `bytes ${start}-${end}/${total}`);
      headers.set("Content-Length", obj.size);
      return new Response(obj.body, { status: 206, headers });
    }
  }
  headers.set("Content-Length", obj.size);
  return new Response(obj.body, { headers });
}
async function handleDownloadInfo(request, env, url) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  const key = url.searchParams.get("key");
  if (!key) return error2("\u7F3A\u5C11\u6587\u4EF6 key \u53C2\u6570");
  const storageType = getStorageType(env);
  let fileSize = 0;
  let chunkCount = 1;
  let chunkSize = 3 * 1024 * 1024;
  let contentType = null;
  if (storageType === "cos" && env.COS_SECRET_ID) {
    const meta = await env.KV.get(INDEX_PREFIX + key, { type: "json" });
    if (meta) {
      return json2({ success: true, key, size: meta.size || 0, chunkCount: 1, chunkSize: meta.size || 0, contentType: meta.contentType || null, storage: "cos" });
    }
    // 元数据不存在，尝试从 COS HEAD 获取
    const head = await cosHeadObject(env, key);
    if (!head) return error2("\u6587\u4EF6\u4E0D\u5B58\u5728", 404);
    return json2({ success: true, key, size: head.size, chunkCount: 1, chunkSize: head.size, contentType: head.contentType, storage: "cos" });
  }
  if (storageType === "kv" && env.KV) {
    const meta = await env.KV.get(INDEX_PREFIX + key, { type: "json" });
    if (!meta) {
      // 元数据不存在，检查是否有分块数据
      const chunk0 = await env.KV.get(`${key}__chunk_0`, { type: "arrayBuffer" });
      if (chunk0) {
        // 分块文件但元数据丢失，尝试探测分块数量
        let count = 0;
        let totalSize = 0;
        for (let i = 0; i < 100; i++) {
          const c = await env.KV.get(`${key}__chunk_${i}`, { type: "arrayBuffer" });
          if (!c) break;
          count++;
          totalSize += c.byteLength;
        }
        if (count > 0) {
          fileSize = totalSize;
          chunkCount = count;
          return json2({ success: true, key, size: fileSize, chunkCount, chunkSize, contentType });
        }
      }
      // 检查是否为非分块文件
      const result = await env.KV.getWithMetadata(key);
      if (!result.value && !result.metadata) return error2("\u6587\u4EF6\u4E0D\u5B58\u5728", 404);
      fileSize = result.metadata?.size || result.value.byteLength || 0;
      contentType = result.metadata?.contentType || null;
      chunkCount = 1;
    } else {
      fileSize = meta.size || 0;
      contentType = meta.contentType || null;
      chunkCount = meta.chunked ? meta.chunkCount : 1;
    }
  } else {
    const obj = await headObject(env, key);
    if (!obj) return error2("\u6587\u4EF6\u4E0D\u5B58\u5728", 404);
    fileSize = obj.size || 0;
  }
  return json2({
    success: true,
    key,
    size: fileSize,
    chunkCount,
    chunkSize,
    contentType
  });
}
async function handleDownloadChunk(request, env, url) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  const key = url.searchParams.get("key");
  const chunkIndex = parseInt(url.searchParams.get("chunkIndex") || "0");
  if (!key) return error2("\u7F3A\u5C11\u6587\u4EF6 key \u53C2\u6570");
  const storageType = getStorageType(env);
  if (storageType === "cos" || env.COS_SECRET_ID) {
    // COS: 直接从 COS 下载（支持 Range）
    const rangeHeader = request.headers.get("Range");
    const obj = await cosGetObject(env, key, rangeHeader || undefined);
    if (!obj) return error2("\u6587\u4EF6\u4E0D\u5B58\u5728", 404);
    const headers = new Headers();
    headers.set("Content-Type", obj.contentType || "application/octet-stream");
    headers.set("Content-Length", obj.size);
    if (obj.contentRange) headers.set("Content-Range", obj.contentRange);
    headers.set("Accept-Ranges", "bytes");
    return new Response(obj.body, { status: obj.status || 200, headers });
  }
  if (storageType !== "kv" || !env.KV) {
    return error2("\u5206\u5757\u4E0B\u8F7D\u4EC5\u652F\u6301 KV \u5B58\u50A8\u6A21\u5F0F");
  }
  const meta = await env.KV.get(INDEX_PREFIX + key, { type: "json" });
  if (!meta) {
    // 元数据不存在时，尝试直接读取分块（元数据可能丢失但分块仍在）
    const chunk = await env.KV.get(`${key}__chunk_${chunkIndex}`, { type: "arrayBuffer" });
    if (chunk) {
      return new Response(chunk, {
        headers: { "Content-Type": "application/octet-stream", "Content-Length": chunk.byteLength }
      });
    }
    // 尝试读取整个文件（非分块存储的文件）
    if (chunkIndex === 0) {
      const result = await env.KV.get(key, { type: "arrayBuffer" });
      if (!result) return error2("\u6587\u4EF6\u4E0D\u5B58\u5728", 404);
      return new Response(result, {
        headers: { "Content-Type": "application/octet-stream", "Content-Length": result.byteLength }
      });
    }
    return error2(`\u5206\u5757 ${chunkIndex} \u4E0D\u5B58\u5728`, 404);
  }
  if (meta.chunked) {
    const chunk = await env.KV.get(`${key}__chunk_${chunkIndex}`, { type: "arrayBuffer" });
    if (!chunk) return error2(`\u5206\u5757 ${chunkIndex} \u4E0D\u5B58\u5728`, 404);
    return new Response(chunk, {
      headers: { "Content-Type": "application/octet-stream", "Content-Length": chunk.byteLength }
    });
  }
  // 非分块文件，chunkIndex=0 时返回整个文件
  if (chunkIndex > 0) return error2(`\u5206\u5757 ${chunkIndex} \u4E0D\u5B58\u5728`, 404);
  const result = await env.KV.get(key, { type: "arrayBuffer" });
  if (!result) return error2("\u6587\u4EF6\u4E0D\u5B58\u5728", 404);
  return new Response(result, {
    headers: { "Content-Type": "application/octet-stream", "Content-Length": result.byteLength }
  });
}
async function handlePreview(request, env, url) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  const key = url.searchParams.get("key");
  if (!key) return error2("\u7F3A\u5C11\u6587\u4EF6 key \u53C2\u6570");
  const rangeHeader = request.headers.get("Range");
  const obj = await getObject(env, key, rangeHeader || undefined);
  if (!obj) return error2("\u6587\u4EF6\u4E0D\u5B58\u5728", 404);
  const filename = key.split("/").pop();
  const ext = getExt(filename);
  const headers = new Headers();
  let contentType = "application/octet-stream";
  if (isImage(ext)) {
    contentType = `image/${ext === "jpg" ? "jpeg" : ext}`;
  } else if (ext === "pdf") {
    contentType = "application/pdf";
  } else if (ext === "mp4" || ext === "mov") {
    contentType = `video/${ext}`;
  } else if (ext === "docx") {
    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else if (ext === "xlsx") {
    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  } else if (ext === "pptx") {
    contentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  }
  headers.set("Content-Type", contentType);
  headers.set("Content-Disposition", `inline; filename*=UTF-8''${encodeURIComponent(filename)}`);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "no-cache");
  if (rangeHeader && obj.contentRange) {
    // Cloudinary 已返回 Content-Range，直接转发
    headers.set("Content-Range", obj.contentRange);
    headers.set("Content-Length", obj.size);
    return new Response(obj.body, { status: 206, headers });
  } else if (rangeHeader) {
    const m = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (m) {
      const start = parseInt(m[1]);
      const end = m[2] ? parseInt(m[2]) : start + obj.size - 1;
      const total = obj.totalSize || (obj.size + start);
      headers.set("Content-Range", `bytes ${start}-${end}/${total}`);
      headers.set("Content-Length", obj.size);
      return new Response(obj.body, { status: 206, headers });
    }
  }
  headers.set("Content-Length", obj.size);
  return new Response(obj.body, { headers });
}
async function handleRename(request, env) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return error2("\u65E0\u6CD5\u89E3\u6790\u8BF7\u6C42");
  }
  const { oldKey, newName } = body;
  if (!oldKey || !newName) return error2("\u7F3A\u5C11\u53C2\u6570 oldKey \u6216 newName");
  const parts = oldKey.split("/");
  const oldName = parts.pop();
  const ext = getExt(oldName);
  let finalName = newName.trim();
  if (ext && !getExt(finalName)) {
    finalName = `${finalName}.${ext}`;
  }
  const newKey = [...parts, finalName].join("/");
  if (oldKey === newKey) return json2({ success: true, message: "\u540D\u79F0\u672A\u53D8\u5316", newKey });
  const existing = await headObject(env, newKey);
  if (existing) return error2("\u76EE\u6807\u540D\u79F0\u5DF2\u5B58\u5728\uFF0C\u8BF7\u4F7F\u7528\u5176\u4ED6\u540D\u79F0");
  try {
    const result = await renameObject(env, oldKey, newKey);
    return json2({ success: true, message: "\u91CD\u547D\u540D\u6210\u529F", oldKey: result.oldKey, newKey: result.newKey });
  } catch (e) {
    return error2(`\u91CD\u547D\u540D\u5931\u8D25: ${e.message}`);
  }
}
async function handleDelete(request, env) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return error2("\u65E0\u6CD5\u89E3\u6790\u8BF7\u6C42");
  }
  const { key, confirm } = body;
  if (!key) return error2("\u7F3A\u5C11\u53C2\u6570 key");
  if (!confirm) return error2("\u9700\u8981\u4E8C\u6B21\u786E\u8BA4");
  try {
    const obj = await headObject(env, key);
    if (!obj) return error2("\u6587\u4EF6\u4E0D\u5B58\u5728", 404);
    await deleteObject(env, key);
    return json2({ success: true, message: "\u5220\u9664\u6210\u529F", key });
  } catch (e) {
    return error2(`\u5220\u9664\u5931\u8D25: ${e.message}`);
  }
}
async function handleStorage(request, env) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  try {
    const stats = await getStorageStats(env);
    return json2({ success: true, ...stats });
  } catch (e) {
    return error2(`\u83B7\u53D6\u5B58\u50A8\u7EDF\u8BA1\u5931\u8D25: ${e.message}`);
  }
}
async function handleBatch(request, env) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return error2("\u65E0\u6CD5\u89E3\u6790\u8BF7\u6C42");
  }
  const keys = body.keys || [];
  const downloadAll = body.all === true;
  let objects = [];
  if (downloadAll) {
    objects = await listAllObjectsWithBackup(env, true);
  } else {
    for (const key of keys) {
      if (key.endsWith(".bak")) continue;
      const obj = await headObject(env, key);
      if (obj) objects.push(obj);
    }
  }
  if (objects.length === 0) return error2("\u6CA1\u6709\u53EF\u4E0B\u8F7D\u7684\u6587\u4EF6");
  const zipContents = {};
  for (const obj of objects) {
    const data = await getObject(env, obj.key);
    if (!data) continue;
    const buf = await data.arrayBuffer();
    zipContents[obj.key] = new Uint8Array(buf);
  }
  const zipped = zipSync(zipContents);
  return new Response(zipped, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent("\u9AD8\u4E00\uFF0813\uFF09\u73ED\u6691\u671F\u5FB7\u80B2\u4F5C\u4E1A.zip")}`
    }
  });
}
async function handleBatchList(request, env) {
  const auth = checkAuth(request, env);
  if (!auth.ok) return error2(auth.msg, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return error2("\u65E0\u6CD5\u89E3\u6790\u8BF7\u6C42");
  }
  const keys = body.keys || [];
  const downloadAll = body.all === true;
  let objects = [];
  if (downloadAll) {
    objects = await listAllObjectsWithBackup(env, true);
  } else {
    for (const key of keys) {
      if (key.endsWith(".bak")) continue;
      const obj = await headObject(env, key);
      if (obj) objects.push(obj);
    }
  }
  if (objects.length === 0) return error2("\u6CA1\u6709\u53EF\u4E0B\u8F7D\u7684\u6587\u4EF6");
  const storageType = getStorageType(env);
  const fileList = objects.map((obj) => ({
    key: obj.key,
    name: obj.key.split("/").pop(),
    size: obj.size || 0,
    uploaded: obj.uploaded || null,
    url: storageType === "cloudinary" ? getCloudinaryDirectUrl(env, obj.key) : null
  }));
  return json2({ success: true, files: fileList });
}
async function handleConfig(env) {
  const maxFileSize = getMaxFileSize(env);
  return json2({
    title: CONFIG.title,
    iconUrl: CONFIG.iconUrl,
    maxFileSize,
    backupEnabled: hasBackup(env),
    homeworks: Object.fromEntries(
      Object.entries(CONFIG.homeworks).map(([key, hw]) => [
        key,
        {
          label: hw.label,
          hasActivity: hw.hasActivity,
          names: hw.names,
          activities: hw.activities ? Object.fromEntries(
            Object.entries(hw.activities).map(([ak, av]) => [
              ak,
              {
                label: av.label,
                names: av.names,
                needsWorkName: av.needsWorkName || false,
                areas: av.areas.map((a) => ({
                  id: a.id,
                  label: a.label,
                  hint: a.hint,
                  accept: a.accept,
                  exts: a.exts || null,
                  multiple: a.multiple,
                  maxFiles: a.maxFiles,
                  needsPsychSelect: a.needsPsychSelect || false,
                  singleExts: a.singleExts || null,
                  afterSubmitMsg: a.afterSubmitMsg || null
                }))
              }
            ])
          ) : null,
          areas: hw.areas ? hw.areas.map((a) => ({
            id: a.id,
            label: a.label,
            hint: a.hint,
            accept: a.accept,
            exts: a.exts || null,
            multiple: a.multiple,
            maxFiles: a.maxFiles,
            needsPsychSelect: a.needsPsychSelect || false,
            singleExts: a.singleExts || null,
            afterSubmitMsg: a.afterSubmitMsg || null
          })) : null
        }
      ])
    )
  });
}

// 代理存储操作到 CloudBase SCF storage-api 函数
async function proxyToStorageApi(request, env, subPath) {
  const SCF_URL = "https://wh12z213-d4gi5jt764f91a558.service.tcloudbase.com/storage-api" + subPath;
  const url = new URL(request.url);
  const queryString = url.search || "";
  
  // 构建转发请求
  const headers = new Headers();
  // 转发鉴权头
  const auth = request.headers.get("Authorization");
  if (auth) headers.set("Authorization", auth);
  const adminPwd = request.headers.get("X-Admin-Password") || request.headers.get("x-admin-password");
  if (adminPwd) headers.set("X-Admin-Password", adminPwd);
  // 转发 Content-Type
  const ct = request.headers.get("Content-Type");
  if (ct) headers.set("Content-Type", ct);
  
  const fetchOptions = {
    method: request.method,
    headers,
  };
  
  if (request.method === "POST") {
    const body = await request.text();
    fetchOptions.body = body;
  }
  
  try {
    const resp = await fetch(SCF_URL + queryString, fetchOptions);
    const respHeaders = new Headers();
    // 转发响应头
    const respH = resp.headers;
    if (respH.get("content-type")) respHeaders.set("Content-Type", respH.get("content-type"));
    if (respH.get("content-disposition")) respHeaders.set("Content-Disposition", respH.get("content-disposition"));
    if (respH.get("content-length")) respHeaders.set("Content-Length", respH.get("content-length"));
    if (respH.get("accept-ranges")) respHeaders.set("Accept-Ranges", respH.get("accept-ranges"));
    if (respH.get("cache-control")) respHeaders.set("Cache-Control", respH.get("cache-control"));
    respHeaders.set("Access-Control-Allow-Origin", "*");
    
    const respBody = await resp.arrayBuffer();
    return new Response(respBody, { status: resp.status, headers: respHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: `存储代理失败: ${e.message}` }), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }
}

// src/index.js
var index_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    if (method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Password"
        }
      });
    }
    if (path.startsWith("/api/")) {
      try {
        if (path === "/api/config" && method === "GET") return handleConfig(env);
        if (path === "/api/status" && method === "GET") return handleStatus(env);
        if (path === "/api/upload" && method === "POST") return handleUpload(request, env);
        if (path === "/api/upload/prepare" && method === "POST") return handleUploadPrepare(request, env);
        if (path === "/api/upload/complete" && method === "POST") return handleUploadComplete(request, env);
        if (path === "/api/upload/chunk" && method === "POST") return handleUploadChunk(request, env);
        if (path === "/api/upload/finalize" && method === "POST") return handleUploadFinalize(request, env);
        if (path === "/api/migrate/store" && method === "POST") return handleMigrateStore(request, env);
        if (path === "/api/verify" && method === "POST") return handleVerify(request, env);
        // 管理操作由 Worker 直接处理（支持所有存储类型）
        if (path === "/api/list" && method === "GET") return handleList(request, env);
        if (path === "/api/download" && method === "GET") return handleDownload(request, env, url);
        if (path === "/api/download/info" && method === "GET") return handleDownloadInfo(request, env, url);
        if (path === "/api/download/chunk" && method === "GET") return handleDownloadChunk(request, env, url);
        if (path === "/api/preview" && method === "GET") return handlePreview(request, env, url);
        if (path === "/api/rename" && method === "POST") return handleRename(request, env);
        if (path === "/api/delete" && method === "POST") return handleDelete(request, env);
        if (path === "/api/storage" && method === "GET") return handleStorage(request, env);
        if (path === "/api/batch" && method === "POST") return handleBatch(request, env);
        if (path === "/api/batch-list" && method === "POST") return handleBatchList(request, env);
        return new Response(JSON.stringify({ error: "\u672A\u627E\u5230\u63A5\u53E3" }), {
          status: 404,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      } catch (e) {
        return new Response(
          JSON.stringify({ success: false, error: `\u670D\u52A1\u5668\u9519\u8BEF: ${e.message}` }),
          { status: 500, headers: { "Content-Type": "application/json; charset=utf-8" } }
        );
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  index_default as default
};
