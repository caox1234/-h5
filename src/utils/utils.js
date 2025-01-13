/**
 * 获取阿里云oss地址
 */
export function getImgUrl(url) {
    const OSSUrl = import.meta.env.VITE_OSS_BASE_URL;
    return `${OSSUrl}${url}`;
};