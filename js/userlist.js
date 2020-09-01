$(function(){
    let checkList = null
    initDepartMent()

    //渲染显示部门函数
   async function initDepartMent(){
    let result = await queryDepart();
    if(result.code == 0){
        let str = `<option value="0">全部</option>`;
        result.data.forEach(item=>{
           
            str +=`
            <option value = "${item.id}">${item.name}</option>`
        })
        $(".selectBox").html(str)
    }
    }
    //展示员工列表函数
    showUserList()
   async function showUserList(){
    let params = {
        departmentId:$(".selectBox").val(),
        search:$(".searchInp").val().trim()
    }
    let result = await axios.get("/user/list",{params})
   // console.log(result.data);
   if(result.code !==0) return;
   let str =``;
   result.data.forEach(item=>{
       let {
           id,
           name,
           sex,
           email,
           phone,
           department,
           job,
           desc
       } = item;
       str +=`<tr>
       <td class="w3"><input type="checkbox" userId="${id}"></td>
       <td class="w10">${name}</td>
       <td class="w5">${sex==0?'男':'女'}</td>
       <td class="w10">${department}</td>
       <td class="w10">${job}</td>
       <td class="w15">${email}</td>
       <td class="w15">${phone}</td>
       <td class="w20">${desc}</td>
       <td class="w12" userId="${id}">
           <a href="javascript:;">编辑</a>
           <a href="javascript:;" id="sc">删除</a>
           <a href="javascript:;">重置密码</a>
       </td>
       </tr>`
   })
   $("tbody").html(str)
   checkList = $("tbody").find('input[type="checkbox"]')
    }
    //搜索框失去焦点事件
    $(".selectBox").change(showUserList)
    $(".searchInp").blur(function(){
        showUserList()
    })
    //全选处理
    selectHandle()
    function selectHandle(){
        $("#checkAll").click(e=>{
            let checked = $("#checkAll").prop("checked")
            checkList.prop("checked",checked)
        })
    }
    //单选框控制全选框
    $("tbody").on("click","input",e=>{
        if(e.target.tagName === "INPUT"){
            let flag = true;
            newCheckList = Array.from(checkList)
            newCheckList.forEach(item=>{
                if(!$(item).prop("checked")){
                    flag = false
                }
            })
            $("#checkAll").prop("checked",flag)
        }
    })
    //批量删除框
    $(".deleteAll").click(async function(){
        //找到勾选用户的userid 放到一个数组中
        let arr=[];
        [].forEach.call(checkList,item=>{
            if($(item).prop("checked")){
                console.log($(item));
                //选中了
                arr.push($(item).attr('userid'))
            }
        })
        if(arr.length === 0 ){
            alert("你需要先选中一些用户")
            return
        }
        //利用递归遍历arr
        let index = -1
        async function deleteUser(){
            let userId = [++index]
            //递归出口
            if(index>=arr.length){
                alert("已删除员工~")
                showUserList()
                return
            }
            let result =await axios.get("/user/delete",{params:{userId}})
            if(result.code !==0) return
            deleteUser()//递归
        }
        deleteUser()
    })
    //单选删除功能
    $("tbody").on("click","#sc",async function(){
        let params ={
           userId: $(this).parent().attr("userId")
        } 
        if(confirm("你确定删除吗？")){
            console.log(params); 
           let result1 =await axios.get("/user/delete",{params})
            if(result1.code !==0) return
            alert("删除成功")
            showUserList()
            return
        }
        return
    })
    //编辑功能和重置密码
    delegete()
  function delegete(){
        $("tbody").on("click","a", async e=>{
            console.log(e);
            let target = e.target,
                tag = target.tagName
                text = target.innerHTML.trim()
                if(tag === "A"){
                    let userId = $(target).parent().attr("userid")
                    //代表你点击了编辑或修改密码
                    if(text === "编辑"){
                     window.location.href = `useradd.html?id=${userId}`
                        return
                    }
                    if(text === "重置密码"){
                        let flag = confirm("你确定要重置此员工密码吗？")
                        if(!flag) return;
                        let result = await axios.post("/user/resetpassword",{
                            userId
                        })
                        if(result.code === 0 ){
                            alert("重置密码成功请告诉你的员工~")
                            return
                        }
                        return
                    }
                }
        })
    }

})