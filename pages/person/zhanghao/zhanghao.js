var num = 0;
Page({
  data: {
    viewBg: 'http://106.12.109.65/yousai_img/new.png'
  },
  changeBg() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg: 'http://106.12.109.65/yousai_img/new.pnggreen'
      })
    } else {
      this.setData({
        viewBg: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  }
})