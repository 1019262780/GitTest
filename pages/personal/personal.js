import WxValidate from '../personal/WxValidate.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ['请选择','广州大学华软软件学院','河北金融学院', '保定学院', '河北农业大学', '河北科技大学', '河北地质大学','广州大学'],
    school:0,
    array: ['男', '女'],
    index: 0,
    date: '2016-09-01',
    arr: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'],
    conste: 0,
    region: ['请选择', '请选择', '请选择'],
    customItem: '请选择',
    btnstate:"primary",
    name: '',
    userName1: '',
  },
  bindSchoolChange: function (e) {
    let pages = getCurrentPages();
    let currPage = null; //当前页面
    let prevPage = null; //上一个页面

    if (pages.length >= 2) {
      currPage = pages[pages.length - 1]; //当前页面
      prevPage = pages[pages.length - 2]; //上一个页面
    }
    if (prevPage) {
      prevPage.setData({
        dataFromB: '学校：' + this.data.array1[e.detail.value]
      });
    }
    this.setData({
      school: e.detail.value
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
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
    console.log(e.detail.value);
    //表单数据
    var objData = e.detail.value;
    if (objData.name && objData.userName1 && objData.school && objData.index && objData.date && objData.region && objData.conste) {
      //异步方式储存表单数据
      wx.setStorage({
        key: 'name',
        data: objData.name,
      })
      wx.setStorage({
        key: 'userName1',
        data: objData.userName1,
      })
      wx.setStorage({
        key: 'school',
        data: objData.school,
      })
      wx.setStorage({
        key: 'index',
        data: objData.index,
      })
      
      wx.setStorage({
        key: 'date',
        data: objData.date,
      })
      wx.setStorage({
        key: 'region',
        data: objData.region,
      })
      wx.setStorage({
        key: 'conste',
        data: objData.conste,
      })
    }
  },
  submitInfo(params) {
    // form提交
    let form = params;
    console.log('将要提交的表单信息：', form);

    wx.showToast({
      icon: "loading",
      title: '正在保存！',
      duration: 2000
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 2000)


  },
  onLoad: function (options) {
    this.initValidate();
    var that = this
    wx.getStorage({
      key: 'name',
      success: function (res) {
        that.setData({ name: res.data })
      },
    })
    wx.getStorage({
      key: 'userName1',
      success: function (res) {
        console.log(res.data)
        that.setData({ userName1: res.data })
      },
    })
    wx.getStorage({
      key: 'school',
      success: function (res) {
        console.log(res.data)
        that.setData({ school: res.data })
      },
    })
    wx.getStorage({
      key: 'index',
      success: function (res) {
        console.log(res.data)
        that.setData({ index: res.data })
      },
    })
    wx.getStorage({
      key: 'date',
      success: function (res) {
        console.log(res.data)
        that.setData({ date: res.data })
      },
    })
    wx.getStorage({
      key: 'region',
      success: function (res) {
        console.log(res.data)
        that.setData({ region: res.data })
      },
    })
    wx.getStorage({
      key: 'conste',
      success: function (res) {
        console.log(res.data)
        that.setData({ conste: res.data })
      },
    })
  },
  showToast(error) {
    wx.showToast({
      title: error.msg,
      showCancel: false,
      icon: 'none',
      duration: 2000
    })
  },
 
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindConsteChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      conste: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  introductionTap:function(){
    wx.navigateTo({
      url: '../introduction/introduction',
    })
  },
  initValidate() {
    // 创建实例对象

    /**
     * 4-2(配置规则)
     */
    const rules = {
      name: {
        required: true,
        rangelength:[2,4]
      },
      userName1: {
        required: true,
        maxlength: 8
      },
      

    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '姓名不能为空哦!',
        rangelength: '请输入2~4个汉字',
      },
      userName1: {
        required: '昵称不能为空哦！',
        maxlength: "昵称长度不能大于8哦~"
      },
      
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
    /**
     * 也可以自定义验证规则
     */
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     array1: ['请选择', '广州大学华软软件学院', '河北金融学院', '保定学院', '河北农业大学', '河北科技大学', '河北地质大学', '广州大学'],
//     school: 0,
//     array: ['男', '女'],
//     index: 0,
//     date: '2016-09-01',
//     arr: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
//     conste: 0,
//     region: ['请选择', '请选择', '请选择'],
//     customItem: '请选择',
//     btnstate: "primary",
//     name: '',
//     userName1: '',
//   },
//   submitForm: function (e) {
//     console.log(e.detail.value);
//     //表单数据
    // var objData = e.detail.value;
    // if (objData.name && objData.userName1 && objData.school) {
    //   //异步方式储存表单数据
    //   wx.setStorage({
    //     key: 'name',
    //     data: objData.name,
    //   })
    //   wx.setStorage({
    //     key: 'userName1',
    //     data: objData.userName1,
    //   })
    //   wx.setStorage({
    //     key: 'school',
    //     data: objData.school,
    //   })
//       wx.navigateBack({
//         delta: 1
//       })
//     }

//   },
//   bindPickerChange: function (e) {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       index: e.detail.value
//     })
//   },
//   bindDateChange: function (e) {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       date: e.detail.value
//     })
//   },
//   bindConsteChange: function (e) {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       conste: e.detail.value
//     })
//   },
//   bindRegionChange: function (e) {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       region: e.detail.value
//     })
//   },
//   introductionTap: function () {
//     wx.navigateTo({
//       url: '../introduction/introduction',
//     })
//   },
//   bindSchoolChange: function (e) {
//     let pages = getCurrentPages();
//     let currPage = null; //当前页面
//     let prevPage = null; //上一个页面

//     if (pages.length >= 2) {
//       currPage = pages[pages.length - 1]; //当前页面
//       prevPage = pages[pages.length - 2]; //上一个页面
//     }
//     if (prevPage) {
//       prevPage.setData({
//         dataFromB: '学校：' + this.data.array1[e.detail.value]
//       });
//     }
//     this.setData({
//       school: e.detail.value
//     })
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
    // var that = this
    // wx.getStorage({
    //   key: 'name',
    //   success: function (res) {
    //     that.setData({ name: res.data })
    //   },
    // })
    // wx.getStorage({
    //   key: 'userName1',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({ userName1: res.data })
    //   },
    // })
    // wx.getStorage({
    //   key: 'school',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({ school: res.data })
    //   },
    // })
//   },
 

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
