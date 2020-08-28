//对ajax进行二次封装
axios.defaults.baseURL = "http://127.0.0.1:8888";

//数据以表单的形式给服务器
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//配置为true 后台的请求都会带上 
axios.defaults.withCredentials = true

//数据格式name= 3&age = 4
axios.defaults.transformRequest = function (data) {
    if (!data) return data;
    let result = ``;
    for (let attr in data) {
        if (!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`;
    }
    return result.substring(1);
};

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
          //返回一个失败的promiss
          return Promise.reject(reason)
      })