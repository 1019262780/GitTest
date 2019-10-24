import WxValidate from '../login/WxValidate.js';
var zhenzisms = require('../../utils/zhenzisms.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnstate:"default",
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    code: '',
    second: 60
  },

  onLoad: function (options) {

    /**
     * 4-1(先初始化表单)
     */
    this.initValidate();
  },



  showToast(error) {
    wx.showToast({
      title: error.msg,
      showCancel: false,
      icon:'none',
      duration:1000
    })
  },


  submitForm(e) {
    /**
     * 4-3(表单提交校验)
     */
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showToast(error)
      return false

    }
    /**
       * 这里添写验证成功以后的逻辑
     * 
       */
    //验证通过以后->
    this.submitInfo(params);
  },

  /**
   * 表单-提交
  */
  submitInfo(params) {
    // form提交
    let form = params;
    console.log('将要提交的表单信息：', form);

    wx.showToast({
      title: '提交成功！！！！',
    })
    wx.navigateTo({
      url: '../zhuce/zhuce'
    })
  },
  bindPhoneInput(e) {
    // console.log(e.detail.value);
    var val = e.detail.value;
    this.setData({
      phone: val
    })
    if (val != '') {
      this.setData({
        hidden: false,
        btnValue: '获取验证码'
      })
    } else {
      this.setData({
        hidden: true
      })
    }
  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    // console.log('获取验证码');
    var that = this;
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '101370', 'MTE5NTU4OGUtZDNkMy00MGZlLTg5YWEtN2M1Y2U3NjZhM2Qz');
    zhenzisms.client.send(function (res) {
      if (res.data.code == 0) {
        that.timer();
        return;
      }
      wx.showToast({
        title: res.data.data,
        icon: 'none',
        duration: 2000
      })
    }, '13211213141', '验证码为:3322');

  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  /**
   * 表单-验证字段
   */
  
  initValidate() {
    // 创建实例对象
   
    /**
     * 4-2(配置规则)
     */
    const rules = {
      name: {
        required: true,
        name:true,
      },
      idcard: {
        required: true,
        idcard: true,

      },
      password: {
        required: true,
        password: true,
      },
      password1: {
        required: true,
        equalTo: "password",
      },
      tel: {
        required: true,
        tel: true,

      },
      // 配置false可关闭验证
      regcode: {
        required: true,
        minlength: 4
      },
      assistance: {
        required: true,
        assistance: true,

      },

    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入姓名',
        name: '只能为英文或中文',
      },
      tel: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',

      },
      idcard: {
        required: '请输入身份证号码',
        idcard: '请输入正确的身份证号码',

      },
      password: {
        required: '请输入密码',
        password: '密码必须包含数字和字母',
      },
      password1: {
        required: '请确认密码',
        equalTo: '两次密码不一致',
      },
      regcode: {
        required: '请输入验证码',
        minlength: '请输入正确的验证码'

      },
      assistance: {
        required: '请勾选 《顺风男服务协议》'

      },
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
    /**
     * 也可以自定义验证规则
     */
     this.WxValidate.addMethod('assistance', (value, param) => {
      return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)

    }, '请勾选 《顺风男服务协议》')
  }
});