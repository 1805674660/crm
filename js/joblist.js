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
})