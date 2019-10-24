const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp();
Page({
  data: {
    banners:[],
    canIUse: "",
    swiperMaxNumber: 0,
    swiperCurrent: 0,
    height: wx.getSystemInfoSync().windowHeight
  },
  onLoad:function(){
    const _this = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
    const app_show_pic_version = wx.getStorageSync('app_show_pic_version')
    if (app_show_pic_version && app_show_pic_version == CONFIG.version) {
      wx.switchTab({
        url: '/pages/index/index',
      });
    } else {
      // 展示启动页
      WXAPI.banners({
        type: 'app'
      }).then(function (res) {
        if (res.code == 700) {
          wx.switchTab({
            url: '/pages/index/index',
          });
        } else {
          _this.setData({
            banners: res.data,
            swiperMaxNumber: res.data.length
          });
        }
      }).catch(function (e) {
        wx.switchTab({
          url: '/pages/index/index',
        });
      })
    }
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称     
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              that.setData({
                canIUse: res.userInfo
              })
              setTimeout(that.toLogin, 2000)
            }
          })
        }
      }
    })
  },
  toLogin: function () {// 前往授权登录界面
    wx.switchTab({
      url: '../../pages/index/index',
    })
  },
  getUserInfo: function (e) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({ userInfo: res.userInfo })
        app.globalData.userInfo = res.userInfo;
        var nickName = res.userInfo.nickName;
        var avatarUrl = res.userInfo.avatarUrl;
        var gender = res.userInfo.gender;
        wx.login({
          success: res => {
            wx.request({
              method: 'get',
              url: 'http://localhost/yibao/index.php/Home/index/user',
              data: {
                code: res.code,
                nickName: nickName,
                avatarUrl: avatarUrl,
                gender: gender
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log("success!!!!!!!")
                console.log(res.data)
                wx.setStorageSync('openid', res.data.openid)
              },
              fail: function () {
                console.log("fail");
              }
            })
            wx.switchTab({
              url: '../../pages/index/index',
            }) //成功时跳转 
          }
        })
      },
      fail: function () {
        that.showSettingToast('需要授权位置信息');//失败了跳转
      }
    })
    if (app.globalData.userInfo == null) {
      if (e.detail.userInfo != null) {
        app.globalData.userInfo = e.detail.userInfo
      }
    }
  },

  showSettingToast: function (e) {
    var that = this;
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success(res) {
              console.log(res.authSetting);
              if (res.authSetting['scope.userInfo'] == true) {
                wx.switchTab({//成功时跳转 
                  url: '../../pages/index/index',
                })
              } else {
                that.showSettingToast('需要授权位置信息');
              }
            }
          })
        }
      }
    })
  
  },
  onShow:function(){
    
  },
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  goToIndex: function (e) {
    WXAPI.addTempleMsgFormid({
      token: wx.getStorageSync('token'),
      type: 'form',
      formId: e.detail.formId
    })
    if (app.globalData.isConnected) {
      wx.setStorage({
        key: 'app_show_pic_version',
        data: CONFIG.version
      })
      wx.switchTab({
        url: '/pages/index/index',
      });
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
  }
});