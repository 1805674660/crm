$(function(){
    let lx = "my"
    let limit = 10;
    let page = 1
    //渲染分页
    let totalPage = 1;
    let total = 0
    let params = window.location.href.queryURLParams()
    //console.log(params);
    params.lx ? lx=params.lx : null
    //console.log(lx);
    //获取客户列表
    // let type = ""
    showCustmerList()
    async function showCustmerList(){
        let result = await axios.get("/customer/list",{
            params:{
                lx,
                type:$(".selectBox").val(),
                search:$(".searchInp").val().trim(),
                limit,
                page
            }
        })
        
        if(result.code !==0) return alert("网络不给力")

        totalPage = parseInt(result.totalPage)
        total = parseInt(result.total)

        result = result.data
        let str =``;
        result.forEach(item=>{
            let {
                id,
                name,
                sex,
                email,
                phone,
                QQ,
                weixin,
                type,
                address,
                userName
            } = item;
            str +=`<tr>
            <td class="w8">${name}</td>
            <td class="w5">${sex==0?'男':'女'}</td>
            <td class="w10">${email}</td>
            <td class="w10">${phone}</td>
            <td class="w10">${weixin}</td>
            <td class="w10">${QQ}</td>
            <td class="w5">${type}</td>
            <td class="w8">${userName}</td>
            <td class="w20">${address}</td>
            <td class="w14" customerId="${id}">
                <a href="javascript:;">编辑</a>
                <a href="javascript:;">删除</a>
                <a href="visit.html?id=${id}" id="hf">回访记录</a>
            </td>
        </tr>`
        })
        $("tbody").html(str)

        //分页
        if(totalPage>1){
            str = ``;
            page>1 ?str+=`<a href="javascript:;">上一页</a>`:null;
            str +=`<ul class="pageNum">`;
            for(let i=1;i<=totalPage;i++){
                str +=`<li class="${i==page?'active':''}">${i}</li>`
            }
            str +=`</ul>`;
            page<totalPage ? str +=`<a href ="javascript:;">下一页</a>`:null;
            $(".pageBox").html(str)
        }
    }
    //模糊查询
    handle()
    function handle(){
        $(".selectBox").change(showCustmerList);
        $(".searchInp").blur(function(){
            showCustmerList()
        })
    }
    //使用事件委托实现分页功能
    $(".pageBox").click(e=>{
        let target = e.target,
        tag = target.tagName,
        text = target.innerHTML,
        temp = page;
        if(tag === "A"){
            if(text ==="上一页"){ temp--;}
            if(text ==="下一页"){ temp++;}
        }
        if(tag === "LI"){
            temp = parseInt(text)
        }
        temp !== page ?(page=temp,showCustmerList()) : null
    })
    //编辑删除功能回访功能
    delegete()
    function delegete(){
          $("tbody").on("click","a", async e=>{
              console.log(e);
              let target = e.target,
                  tag = target.tagName
                  text = target.innerHTML.trim()
                  if(tag === "A"){
                      let customerId = $(target).parent().attr("customerId")
                      //代表你点击了编辑或修改密码
                      if(text === "编辑"){
                       window.location.href = `customeradd.html?id=${customerId}`
                          return
                      }
                      if(text === "删除"){
                        if(confirm("你确定删除吗？")){
                            //console.log(params); 
                           let result1 =await axios.get("/customer/delete",{params:{customerId}})
                            if(result1.code !==0) return
                            alert("删除成功")
                            showCustmerList()
                            return
                        }
                        return
                       }
               
                  }
          })
      }


})