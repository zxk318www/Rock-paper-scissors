
var numAi = 0
var timer
Page({
  data:{
    //控制按钮是否可点击
    btnState:false,
    //记录获胜次数
    winNum:0,
    //中间的话“Ho~ You Win”
    gameResult:'',
    gameResultCode:false,
    //用户选择的图片
    imgUserSrc:'../../image/wenhao.png',
    //电脑随机的图片
    imageAiScr:'../../image/wenhao.png',
    //石头剪刀布图片数组
    srcs:[
      '../../image/shitou.png',
      '../../image/jiandao.png',
      '../../image/bu.png'
    ],
    tzModel:false,
    wjModel:false,
    chooseNum:0,
    remake:false
  },

  //生命周期，刚进来
  onLoad: function () {
    //获取本地缓存“已经获胜的次数”
    // var oldWinNum = wx.getStorageSync('winNum');
    // //如果有缓存，那么赋值，否则为0
    // if(oldWinNum != null && oldWinNum !=''){
    //    this.data.winNum = oldWinNum;
    // }
 
  },

  //用户选择按钮
  changeForChoose(e){
    
      if(this.data.btnState == true){
        return;
      }

      //获取数组中用户的，石头剪刀布相应的图片。
      this.setData({
          imageUserScr:this.data.srcs[e.currentTarget.id],
          chooseNum:parseInt(this.data.chooseNum)+1
      });
      //清除计时器
      clearInterval(timer);

      //获取数据源
      var user = this.data.imageUserScr;
      var ai = this.data.imageAiScr;
      var num = this.data.winNum;
      var str = '0.0~\n你输了!';

      //判断是否获胜
      if( user == "../../image/shitou.png" && ai == "../../image/jiandao.png"){
         //获胜后增加次数、改变文字内容、从新缓存获胜次数
         num++;
         str = 'Ho~\n你赢了!';
         wx.setStorageSync('winNum', num);
      };
      if(user == "../../image/jiandao.png" && ai == "../../image/bu.png"){
         num++;
         str = 'Ho~\n你赢了!';
         wx.setStorageSync('winNum', num);
      };
      if(user== "../../image/bu.png" && ai == "../../image/shitou.png"){
         num++;
         str = 'Ho~\n你赢了!';
         wx.setStorageSync('winNum', num);
      };

      //如果平局
      if(user == ai){
         str = '平局!';
         //平局 则不计入次数内
         
          this.setData({
            chooseNum:parseInt(this.data.chooseNum)-1
          })
         
        
      }

      //刷新数据
      this.setData({
          winNum:num,
          gameResult:str,
          btnState:true
      });
  },

  //开启计时器
  timerGo(){
    timer = setInterval(this.move,100);
  },

  //ai滚动方法
  move(){
    
    //随机产生下标
    var ran = Math.random()*3
    numAi = Math.floor(ran)
   
    this.setData({
        //获取数组中Ai的，石头剪刀布相应的图片。
        imageAiScr: this.data.srcs[numAi],
    })
    
  },

  again(){
      
      if(this.data.wjModel  && this.data.chooseNum>4){
        this.getResult();
        if(this.data.gameResultCode){
          wx.showModal({
            title: '你这么牛X',
            content: '你爸妈知道么。。。',
          })
        }else{
          wx.showModal({
            title: '你已经输了',
            content: '还不服气就重新开始吧。。。',
          })
        }
       
        return;
      }
      //控制按钮
      if(this.data.btnState == false){
        return;
      }
      //从新开始计时器
      this.timerGo();
      //刷新数据
      this.setData({
          btnState:false,
          gameResult:'',
          imageUserScr:'../../image/wenhao.png'
      });
  },
  //挑战模式
  tz(){
    this.remake();
    this.setData({

      tzModel:true,
      chooseNum:0
    })
    this.timerGo()
  },
  //五局三胜模式
  wj(){
    this.remake();
    this.setData({

      wjModel:true,
      chooseNum:0
    })
    this.timerGo()
  },
  getResult(){
    //赢得次数
    var wincs = this.data.winNum;
    
    if(this.data.wjModel){
      if(wincs>=3){
        console.log("胜利")
        this.setData({
          gameResultCode:true
        })
      }else{
        console.log("失败")
      }
    }
    this.setData({
      remake:true
    })
  },
  remake(){
    this.setData({
      wjModel:false,
      tzModel:false,
      remake:false,
      btnState:false,
      gameResult:'',
      winNum:0,
      chooseNum:0
    })
  }
})