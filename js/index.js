$(function(){
    //获取点击事件元素
    let $navBoxList = $(".navBox>a")
    let $itemBoxlist = null

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
        console.log(power);
        //userhandle|departhandle|jobhandle|customerall
        let str =``;
        if(power.includes("userhandle")){
            str +=`
            <div class="itemBox" text = "员工管理">
				<h3>
					<i class="iconfont icon-yuangong"></i>
					员工管理
				</h3>
				<nav class="item">
					<a href="page/userlist.html" target="iframeBox">员工列表</a>
					<a href="page/useradd.html" target="iframeBox">新增员工</a>
				</nav>
			</div>
            `
        }
        if(power.includes("departhandle")){
            str +=`
            <div class="itemBox" text = "部门管理">
				<h3>
					<i class="iconfont icon-yuangong"></i>
					部门管理
				</h3>
				<nav class="item">
					<a href="page/departmentlist.html" target="iframeBox">部门列表</a>
					<a href="page/departmentadd.html" target="iframeBox">部门员工</a>
				</nav>
			</div>
            `
        }
        
        if(power.includes("jobhandle")){
            str +=`
            <div class="itemBox" text = "职位管理">
				<h3>
					<i class="iconfont icon-yuangong"></i>
				    职位管理
				</h3>
				<nav class="item">
					<a href="page/joblist.html" target="iframeBox">职位列表</a>
					<a href="page/jobadd.html" target="iframeBox">新增职位</a>
				</nav>
			</div>
            `
        }
        
        if(power.includes("customerall")){
            str +=`
            <div class="itemBox" text = "客户管理">
				<h3>
					<i class="iconfont icon-kehuguanli"></i>
					客户管理
				</h3>
				<nav class="item">
					<a href="page/customerlist.html" target="iframeBox">我的客户</a>
					<a href="page/customerlist.html" target="iframeBox">全部客户</a>
					<a href="page/customeradd.html" target="iframeBox">新增客户</a>
				</nav>
			</div>
            `
        }
    $(".menuBox").html(str)
     $itemBoxlist = $(".menuBox").find(".itemBox")
    })
    //控制组织结构和客户管理点击切换
    function handGroup(index){
        //分两组
        let $group1 = $itemBoxlist.filter((_,item)=>{
            let text = $(item).attr("text");
            return text ==="客户管理"
        })
        let $group2 = $itemBoxlist.filter((_,item)=>{
            let text = $(item).attr("text");
            return /^(员工管理|部门管理|职位管理)/.test(text)
        }) 
        //控制哪一组显示
    if(index ===0){
        $group1.css("display","block")
        $group2.css("display","none")
    }else if(index ===1){
        $group1.css("display","none")
        $group2.css("display","block")
    }
    }
   
    //实现tab选项卡
    $plan.add(power=>{
        //控制默认显示哪一个
        //  let text = $(".navBox>a").html().trim()
        let initIndex = power.includes("customerall")? 0:1;
        $navBoxList.eq(initIndex).addClass("active").siblings().removeClass("active")
        console.log(initIndex);
        handGroup(initIndex)
        //点击切换
        $navBoxList.click(function(){
            let index = $(this).index()
            let text = $(this).html().trim()
            //再点击之前 做权限
            if((text === "组织结构")&& !/(userhandle|departhandle|jobhandle)/.test(power)){
                alert("你没有权限访问！")
                return
            }
         //  initIndex= index
         console.log(text);
           console.log(initIndex);
            //if(index === initIndex) return
            $(this).addClass("active").siblings().removeClass("active")
            iframe(text)
            handGroup(index)
        })
    })
    //控制默认iframe的src
    $plan.add(power=>{
        if(power.includes("customerall")){
            $(".iframeBox").attr("src","page/customerlist.html")
        }
    })
   function iframe(text){

  
      
        console.log(text);
        if(text.includes("客户管理")){
            $(".iframeBox").attr("src","page/customerlist.html")
        }else if(text.includes("组织结构")){
            $(".iframeBox").attr("src","page/userlist.html")
       }
     }

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
        power.code === 0 ? power =power.power:null
       
        $plan.fire(power,baseInfo)

    }
})