$(function(){
    $(".submit").click(async function(){
        let account = $(".userName").val().trim()
        let password = $(".userPass").val().trim()

        if(account === "" || password ===""){
            alert("账号密码不能为空")
            return
        }
        password = md5(password)

        //使用axios，这个也是对ajax的封装，这是基于promise的，
        //这样可以不写回调函数，代码如下：
        //发起ajax请求
        // axios.post("/user/login",{
        //     account,
        //     password
        // } ).then(res=>{
        //     console.log(res);
        // }).catch(err=>{
        //     console.log(err);
        // })
    //async+await，是目前最最最优雅的异步解决方案。  
   let res=await axios.post("/user/login",{
        account,
        password
    } )
    if(parseInt(res.code) === 0){
        alert("登陆成功")
        window.location.href = "index.html"
        return
       // 111
    }
    alert("用户名和密码出错了")
    })
})