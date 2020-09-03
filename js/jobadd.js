$(function(){
    //职位选中框处理
    let  checkList = $(".inpBox3").find('input[type="checkbox"]')
    console.log(checkList);
    newCheckList = Array.from(checkList)
    //职位添加
    $(".submit").click(async function(){
      
        let str=[]
        newCheckList .forEach(item=>{
            if($(item).prop("checked")){
                str +=`${$(item).val()}|`   
                
            }
        })
        console.log(str);
        //提交合法数据
        let params = {
            inpBox:$(".zhiwu").val().trim(),
            desc:$(".miaoshu").val().trim(),
            // power:$(".inpBox3 input").val(),
            power:str
        }
        //根据userid进行编辑
        // if(userId){
        //     params.userId = userId;
        //     let result = await axios.post("/user/update",params)
        //     if(result.code ===0){
        //         alert("修改数据成功")
        //         window.location.href = "userList.html"
        //         return
        //     }
        //     alert("网络不给力，稍后再试")
        //     return
        // }
        //进行添加
      let result = await axios.post("/job/add",params)
      if(result.code === 0){
          alert("添加职位成功")
          window.location.href = "joblist.html"
          return
      }
      alert("网络不给力~~")
    })
})