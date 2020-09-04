$(function(){
    showjobList()
    async function showjobList(){
     let result = await axios.get("/job/list")
    // console.log(result.data);
    if (result.code !== 0) return
    let str =``;
    result.data.forEach(item => {
        let {
            id,
            name,
            desc,
            power
        } = item;
        str +=` <tr>
				<td class="w8">${id}</td>
				<td class="w10">${name}</td>
				<td class="w20">${desc}</td>
				<td class="w50">${power}</td>
				<td class="w12" jobId ="${id}">
					<a href="javascript:;">编辑</a>
					<a href="javascript:;">删除</a>
				</td>
			</tr>`
           
    })
    $("tbody").html(str)
     }
     delegete()
     function delegete(){
         $("tbody").on("click","a",async e=>{
             let target = e.target
             tag = target.tagName
             text = target.innerHTML.trim()
            if(tag === "A"){
                let jobId = $(target).parent().attr("jobId")
                if(text === "编辑"){
                    window.location.href = `jobadd.html?id=${jobId}`
                    return
                }
                if(text ==="删除"){
                    if(confirm("你确定删除吗？")){
                        //console.log(params); 
                       let result1 =await axios.get("/job/delete",{params:{jobId}})
                        if(result1.code !==0) return
                        alert("删除成功")
                        showjobList()
                        return
                    }
                    return
                }
            }
         })
     }
})