$(function(){
    function checkname(){
        let val = $(".inpBox>input").val().trim()
        //校验非空
        if(val.length==0){
            $(".spanusername").html("此项必填项").css("color","red")
            return false;
        }
        $(".spanusername").html("部门名可用").css("color","green")
        return true
    }
    $(".inpBox>input").blur(checkname)
    $(".submit").click(async function(){
        if(!checkname()){
            alert("部门名不合法")
            return
        }
   //提交合法数据
        let params = {
            name:$(".inpBox>input").val().trim(),
            desc:$(".inpBox>textarea").val().trim()
        }
      let result = await axios.post("/department/add",params)
      if(result.code === 0){
          alert("添加部门成功")
          window.location.href = "departmentlist.html"
          return
      }
      alert("网络不给力~~")
    })
})