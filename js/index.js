$(function(){
    init();

    //运用订阅和发布
    //回调
    let $plan = $.Callbacks()
    //订阅
    $plan.add((_,baseInfo)=>{
        //渲染用户回显
        $(".baseBox span").html(`你好，${baseInfo.name || ''}`)

        //实现退出登录
        $(".baseBox>a").click(async function(){
            let result = await axios.get("/user/signout")
            if(result.code == 0){
                window.location.href = "login.html"
                return
            }
            alert("网络不给力")
        })

    })
    $plan.add((power)=>{
        
    })
    async function init(){
        let result = await axios.get("/user/login")
        if(result.code !=0){
            alert("你还没有登录，请先登录。。。")
            window.location.href="login.html"
            return
        }
        //表示你成功登录了
        let [power,baseInfo] = await axios.all([
            axios.get("/user/power"),
            axios.get("/user/info")
        ])
        baseInfo.code === 0 ? baseInfo =baseInfo.data:null
        $plan.fire(power,baseInfo)

    }
})