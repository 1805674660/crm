$(function(){
   let  jobId = null
   let params = window.location.href.queryURLParams()
   if(params.hasOwnProperty("id")){
    jobId  = params.id
    getBaseInfo()
}
async function getBaseInfo(){
    let result = await axios.get("/job/info",{
        params:{jobId}
    })
    if(result.code === 0){
        
         result = result.data
        //  console.log(result);
           $(".zhiwu").val(result.name)
            $(".miaoshu").val(result.desc)
        //    $(".inpBox3").val(result.power)
          return
    }
    alert("编辑不成功~")
    jobId = null
   }
    //职位选中框处理
    let  checkList = $(".inpBox3").find('input[type="checkbox"]')
    console.log(checkList);
    newCheckList = Array.from(checkList)
    //职位添加
    $(".submit").click(async function(){
        let name=$(".zhiwu").val().trim()
       let desc = $(".miaoshu").val().trim()
        if(name&&desc){
            let str=[]
            newCheckList .forEach(item=>{
                if($(item).prop("checked")){
                    str +=`${$(item).val()}|`   
                    
                }
            })
            let newstr =  str.slice(0,-1)
            console.log(newstr);
            //提交合法数据
            let params = {
                name,
                desc,
                // power:$(".inpBox3 input").val(),
                power:newstr
            }
            //根据userid进行编辑
            if(jobId){
                params.jobId = jobId;
                let result = await axios.post("/job/update",params)
                if(result.code ===0){
                    alert("修改数据成功")
                    window.location.href = "jobList.html"
                    return
                }
                alert("网络不给力，稍后再试")
                return
            }
            //进行添加
          let result = await axios.post("/job/add",params)
          if(result.code === 0){
              alert("添加职位成功")
              window.location.href = "joblist.html"
              return
          }
          alert("网络不给力~~")
        }else{
            alert("职位名称和描述不能为空")
        }
       
    })
})