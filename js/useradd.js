$(function(){

    //根据id区分 按钮是新增还是编辑
    let userId = null
    //console.dir(window.location.href)
    let params = window.location.href.queryURLParams()
   console.log(params);
   //根据有无id进行回显
   if(params.hasOwnProperty("id")){
       userId = params.id
       getBaseInfo()
   }
   //编辑回显
  async function getBaseInfo(){
    let result = await axios.get("/user/info",{
        params:{userId}
    })
    if(result.code === 0){
        
         result = result.data
         console.log(result);
           $(".username").val(result.name)
              result.sex == 0 ? $("#man").prop('checked',true) :$("#woman").prop('checked',true)
            $(".useremail").val(result.email)
            $(".userphone").val(result.phone)
           $(".userdepartment").val(result.departmentId)
            jobId:$(".userjob").val(result.jobId)
           $(".userdesc").val(result.desc)
        return
    }
    alert("编辑不成功~")
    userId = null
   }
    //调用回显
    initDeptAndJob()

    //渲染显示部门职务函数
   async function initDeptAndJob(){

    //获取缓存中的部门 职务信息
        let departmentData = await queryDepart()
        let jobData = await queryJob()
        // console.log(departmentData);
        // console.log(jobData);
        if(departmentData.code ===0){
            departmentData = departmentData.data;
            let str=``;
            departmentData.forEach(item=>{
                str += `<option value = "${item.id}">${item.name}</option>`
            })
            $(".userdepartment").html(str)
        }
        if(jobData.code ===0){
            jobData = jobData.data;
            let str=``;
            jobData.forEach(item=>{
                str += `<option value = "${item.id}">${item.name}</option>`
            })
            $(".userjob").html(str)
        }
    }

    //失去焦点时 校验数据
    //验证用户名
    function checkname(){
        let val = $(".username").val().trim()
        //校验非空
        if(val.length==0){
            $(".spanusername").html("此项必填项").css("color","red")
            return false;
        }
        //校验（2~10位 中文
        if(!/^[\u4e00-\u9fa5]{2,10}$/.test(val)){
            $(".spanusername").html("名字必须为2~10位汉字~").css("color","red")
            return false
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
        if(!/^1[3456789]\d{9}$/.test(val)){
            $(".spanuserphone").html("请输入正确手机号").css("color","red")
            return false
        }
        $(".spanuserphone").html("")
        return true
    }

    $(".username").blur(checkname)
    //验证邮箱
    $(".useremail").blur(checkemail)
    //验证phone
    $(".userphone").blur(checkephone)

    //进行数据添加 和数据编剧
    $(".submit").click(async function(){
        if(!checkemail()||!checkephone()||!checkname()){
            alert("数据不合法！")
            return;
        }
        //提交合法数据
        let params = {
            name:$(".username").val().trim(),
            sex:$("#man").prop("checked") ? 0:1,
            email:$(".useremail").val().trim(),
            phone:$(".userphone").val().trim(),
            departmentId:$(".userdepartment").val(),
            jobId:$(".userjob").val(),
            desc:$(".userdesc").val().trim()
        }
        //根据userid进行编辑
        if(userId){
            params.userId = userId;
            let result = await axios.post("/user/update",params)
            if(result.code ===0){
                alert("修改数据成功")
                window.location.href = "userList.html"
                return
            }
            alert("网络不给力，稍后再试")
            return
        }
        //进行添加
      let result = await axios.post("/user/add",params)
      if(result.code === 0){
          alert("添加员工成功")
          window.location.href = "userlist.html"
          return
      }
      alert("网络不给力~~")
    })
})