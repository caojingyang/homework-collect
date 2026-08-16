// ============================================================
// 部署配置文件
// API 通过 CloudBase 云函数代理访问 Cloudflare 后端
// ============================================================

// API 后端地址（CloudBase 云函数代理）
// 代理转发请求到 Cloudflare Workers，解决国内无法直连 Cloudflare 的问题
const API_BASE = 'https://wh12z213-d4gi5jt764f91a558.service.tcloudbase.com/api';

// Cloudflare Worker 直连地址（下载失败时的回退备用地址）
// 在 CloudBase 静态托管上，同源 /api 不存在，需使用 Worker 直连地址
const DIRECT_API_BASE = 'https://homework.wh12z213.ddns.ge/api';
