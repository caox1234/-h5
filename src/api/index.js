import request from '@/utils/request';
// 获取年终奖数据
function getInfo(data) {
    return request({
        url: '/home/nzj/get_nzj',
        method: 'get',
        data
    });
}

export default {
    getInfo,
};
