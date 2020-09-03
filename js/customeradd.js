$(function(){
  //根据id区分 按钮是新增还是编辑
  let customerId = null
  //console.dir(window.location.href)
  let params = window.location.href.queryURLParams()
 console.log(params);
 //根据有无id进行回显
 if(params.hasOwnProperty("id")){
    customerId = params.id
     getBaseInfo()
 }
 //编辑回显
async function getBaseInfo(){
  let result = await axios.get("/customer/info",{
      params:{customerId}
  })
  if(result.code === 0){
       result = result.data
       console.log(result);
         $(".username").val(result.name)
        result.sex == 0 ? $("#man").prop('checked',true) :$("#woman").prop('checked',true)
          $(".useremail").val(result.email)
          $(".userphone").val(result.phone)
          $(".userqq").val(result.QQ)
          $(".userweixin").val(result.weixin)
         $(".type").val(result.type)
         $(".address").val(result.address)
      return
  }
  alert("编辑不成功~")
  customerId= null
 }
    function checkname(){
        let val = $(".username").val().trim()
        //校验非空
        if(val.length==0){
            $(".spanusername").html("此项必填项").css("color","red")
            return false;
        }

        $(".spanusername").html("用户名可用").css("color","green")
        return true
    }
    function checkemail(){
        let val = $(".useremail").val().trim()
        //校验非空
        if(val.length==0){
            $(".spanuseremail").html("此项必填项~").css("color","red")
            return false;
        }
        //校验（2~10位 中文
        if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val)){
            $(".spanuseremail").html("邮箱格式不正确").css("color","red")
            return false
        }
        $(".spanuseremail").html("邮箱合法").css("color","green")
        return true
    }
    function checkephone(){
        let val = $(".userphone").val().trim()
        //校验非空
        if(val.length==0){
            $(".spanuserphone").html("此项必填项~").css("color","red")
            return false;
        }
        //校验（2~10位 中文
        // /^1[3456789]\d{9}$/
        if(!/^1[3456789]\d{9}$/.test(val)){
            $(".spanuserphone").html("请输入正确手机号").css("color","red")
            return false
        }
        $(".spanuserphone").html("")
        return true
    }
    function checkeqq(){
        let val = $(".userqq").val().trim()
        //校验非空
        if(val.length==0){
            $(".spanuserqq").html("此项必填项~").css("color","red")
            return false;
        }
        
        if(!/^\d+$/.test(val)){
            $(".spanuserqq").html("请输入正确QQ").css("color","red")
            return false
        }
        $(".spanuserqq").html("")
        return true
    }
    function checkeweixin(){
        let val = $(".userweixin").val().trim()
        //校验非空
        if(val.length==0){
            $(".spanuserweixin").html("此项必填项~").css("color","red")
            return false;
        }
        
        if(!/^[-_a-zA-Z0-9]{5,19}$/.test(val)){
            $(".spanuserweixin").html("请输入正确微信号").css("color","red")
            return false
        }
        $(".spanuserweixin").html("")
        return true
    }
    $(".username").blur(checkname)
    //验证邮箱
    $(".useremail").blur(checkemail)
    //验证phone
    $(".userphone").blur(checkephone)
    //验证QQ
    $(".userqq").blur(checkeqq)
    //验证微信
    $(".userweixin").blur(checkeweixin)

    //通过验证 进行添加客户
    $(".submit").click(async function(){
        if(!checkemail()||!checkephone()||!checkname()||!checkeqq()||!checkeweixin()){
            alert("数据不合法！")
            return;
        }
        //提交合法数据
        let params = {
            name:$(".username").val().trim(),
            sex:$("#man").prop("checked") ? 0:1,
            email:$(".useremail").val().trim(),
            phone:$(".userphone").val().trim(),
            QQ:$(".userqq").val().trim(),
            weixin:$(".userweixin").val().trim(),
            type:$(".type").val(),
            address:$(".address").val().trim(),
           
        }
        //根据customerId进行编辑
        if(customerId){
            params.customerId = customerId;
            let result = await axios.post("/customer/update",params)
            if(result.code ===0){
                alert("修改数据成功")
                window.location.href = "customerlist.html?lx=my"
                return
            }
            alert("网络不给力，稍后再试")
            return
        }
     //进行添加
      let result = await axios.post("/customer/add",params)
      if(result.code === 0){
          alert("添加客户成功")
          window.location.href = "customerlist.html?lx=my"
          return
      }
      alert("网络不给力~~")
      return
    })
})