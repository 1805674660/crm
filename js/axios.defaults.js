//对ajax进行二次封装
axios.defaults.baseURL = "http://localhost:8888"

//数据以表单的形式给服务器
axios.defaults.headers['Content-Type'] = 'addlication/x-www-form-urlencoded'

//数据格式name= 3&age = 4
axios.defaults.transformRequset = function(data){
    if(!data) return data;
    let result = ""
    for(let attr in data){
        if (!data.hasOwnProperty(attr)) break
        result +=`&${attr}=${data[attr]}`
    }
}

//axios请求拦截器
axios.interceptors.request.use(config =>{
      return config
    })

    //axios响应拦截器
axios.interceptors.response.use(response =>{
        return response.data
      },reason=>{
          //如果路径出错了，通过返回404 
          if(reason.response){
              switch (String(reason.response.status)){
                  case "404":
                      alert("当前请求的地址不存在！")
                      break;

                default:
                    break;
              }
          }
          //返回一个失败的promise
          return Promise.reject(reason)
      })