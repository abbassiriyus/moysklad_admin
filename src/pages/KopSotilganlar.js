import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import url from './host'
import axios from 'axios'

export default function KopSotilganlar() {
var [locading,setLoading]=useState(false)
var [AllCategory,setAllCategory]=useState([])
var [key_1,setKey_1]=useState(0)
    function getAllCategory() {
        axios.get(`${url}/api/category/all`).then(res=>{
          setAllCategory(res.data)
axios.get(`${url}/api/best_seller`).then(res2=>{
if(res2.data.length>0){
setKey_1(res2.data[0].category_id)

}
setLoading(true)
console.log(res.data,res2.data);
})})}

function EditData(e) {
    var data= new FormData
    data.append("category_id",e.target.value)
    axios.get(`${url}/api/best_seller`).then(res2=>{
        if(res2.data.length<1){
axios.post(`${url}/api/best_seller`,data).then(res=>{
    message.success("ko'p sotuvlar bo`limi yaratildi");
    getAllCategory()
}).catch(err=>{
    message.error("xatolik yuz berdi")
})
        }else{
            axios.put(`${url}/api/best_seller/${res2.data[0].id}`,data).then(res=>{
    getAllCategory()

                message.success("ko'p sotuvlar bo`limi O`zgartirildi")
            }).catch(err=>{
                message.error("xatolik yuz berdi")
            })
        }
    } )  
}
useEffect(()=>{
getAllCategory()
},[])

  return (<>
   {locading?(<div>
<select className='toptovar_selelct' onChange={(e)=>EditData(e)} value={key_1} name="" id="">
    {AllCategory.map((item,key)=>{
        return <option  value={item.id}>{item.pathName.length>0?item.pathName+">":""}{item.name}</option>
    })} 
</select>


    </div>):(<></>)}</>
  )
}
