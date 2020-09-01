$(function () {
    // departmentlist()
    // async function departmentlist() {
    //     let result = await queryDepart();
    //     console.log(result.data);
    //     if (result.code !== 0) return
    //     let str =``;
    //     result.data.forEach(item => {
    //         let {
    //             id,
    //             name,
    //             desc
    //         } = item;
    //         str +=`<tr>
	// 			<td class="w10">${id}</td>
	// 			<td class="w20">${name}</td>
	// 			<td class="w40">${desc}</td>
	// 			<td class="w20" userId="${id}">
	// 				<a href="javascript:;" id= "bj">编辑</a>
    //                 <a href="javascript:;" id ="sc">删除</a>
    //             </td>
    //             </tr>`
    //     })
    //     $("tbody").html(str)
    // }

    showUserList()
   async function showUserList(){
    let result = await axios.get("/department/list")
   // console.log(result.data);
   if (result.code !== 0) return
   let str =``;
   result.data.forEach(item => {
       let {
           id,
           name,
           desc
       } = item;
       str +=`<tr>
           <td class="w10">${id}</td>
           <td class="w20">${name}</td>
           <td class="w40">${desc}</td>
           <td class="w20" userId="${id}">
               <a href="javascript:;" id= "bj">编辑</a>
               <a href="javascript:;" id ="sc">删除</a>
           </td>
           </tr>`
   })
   $("tbody").html(str)
    }



})