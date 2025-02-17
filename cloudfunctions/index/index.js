/**
 * 首页查询数据列表
 * 
 * @author: fwei
 * @create: 2024-01-15
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    // 1.release - 正式
    // 2.test    - 测试
    // env: 'test'
    env: 'miya-1ge4i0ca163c1fd5'
});

// 初始化数据库连接
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();

    // 我参与的数据
    let apply = await db.collection('apply').where({
        openid: wxContext.OPENID
    }).limit(1000).orderBy('createTime', 'desc').get();
    
    return {
        event,
        data: apply.data,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}