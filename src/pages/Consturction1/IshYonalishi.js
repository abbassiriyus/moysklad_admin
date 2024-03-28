import { Button, Checkbox, Image, Modal, Space, Table, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../host'

export default function Glotzif() {
const [isModalOpen11,setIsModalOpen11]=useState(false)
const [isModalOpen12,setIsModalOpen12]=useState(false)
const [isModalOpen13,setIsModalOpen13]=useState(false)
const [checkFile,setCheckFile]=useState()
const [selectId,setSelectId]=useState(0)
const [ishyonalishi,setishyonalishi]=useState(0)
function onFile11(e){
  setCheckFile(e.target.checked)
     if(e.target.checked){
     document.querySelector("#image11").type="file"
     }else{
       document.querySelector("#image11").type="text"
     }
   }


function onFile13(e){
    setCheckFile(e.target.checked)
       if(e.target.checked){
       document.querySelector("#image13").type="file"
       }else{
         document.querySelector("#image13").type="text"
       }
     }

function createishyonalishi() {
  var postdata=new FormData()
  postdata.append("title",document.querySelector("#title11").value)
  axios.post(`${url}/api/ishyonalishi`,postdata).then(res=>{
      message.success("create new data")
      setIsModalOpen11(false)
  axios.get(`${url}/api/ishyonalishi`).then(res=>{
      setishyonalishi(res.data)
  })
  }).catch(err=>{
  message.error("not create")
  setIsModalOpen11(false)
  })
 
   }
function updateishyonalishi() {
    var postdata=new FormData()
    postdata.append("title",document.querySelector("#title13").value)
    axios.put(`${url}/api/ishyonalishi/${selectId}`,postdata).then(res=>{
        message.success("create new data")
        setIsModalOpen13(false)
    axios.get(`${url}/api/ishyonalishi`).then(res=>{
        setishyonalishi(res.data)
    })
    }).catch(err=>{
    message.error("not create")
    setIsModalOpen13(false)
    })
   
     }

function deleteishyonalishi() {
  axios.delete(`${url}/api/ishyonalishi/${selectId}`,).then(res=>{
    setIsModalOpen12(false)
    axios.get(`${url}/api/ishyonalishi`).then(res2=>{
      setishyonalishi(res2.data)
    })
    message.success("delete ishyonalishi")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen12(false)
  })  
}

const ishyonalishicolumn = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
{
  title: 'title',
  dataIndex: 'title',
  key: 'title',
},
{
  title: 'Action',
  key: 'action',
  render: (_, record) => (
    <Space size="middle">
     <Button  type="dashed"
     onClick={()=>{
      setSelectId(record.id)
      setIsModalOpen13(true)
   setTimeout(() => {
    document.querySelector("#title13").value=record.title
   }, 900);
     }}
     >Edit</Button>
    <Button danger onClick={()=>{
      setIsModalOpen12(true)
      setSelectId(record.id)
    }} >Delete</Button>
    </Space>
  ),
},
];



useEffect(()=>{
axios.get(`${url}/api/ishyonalishi`).then(res=>{
setishyonalishi(res.data)
})
},[])

  return (
    <div style={{width:'100%',maxWidth:'700px'}}>


<div style={{display:'flex',
flexWrap:'wrap',
justifyContent:'space-around'}}>
<div style={{width:'100%',maxWidth:'700px',marginTop:'40px'}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> <h2 >Направление работы</h2> <Button type='primary'  onClick={()=>{
    setIsModalOpen11(true)
   }
   } >create</Button>  </div>
   <div className="table-responsive">  <Table  columns={ishyonalishicolumn} pagination={{pageSize:'4'}} style={{width:'100%'}} dataSource={ishyonalishi} /></div></div>
</div>




{/* ishyonalishi */}
<Modal title="Осторожность" visible={isModalOpen11} onOk={()=>createishyonalishi()} onCancel={()=>setIsModalOpen11(false)}>
    <input id='title11' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
</Modal>
<Modal title="Осторожность" visible={isModalOpen12} onOk={()=>deleteishyonalishi()} onCancel={()=>setIsModalOpen12(false)}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
</Modal>
 <Modal title="Осторожность" visible={isModalOpen13} onOk={()=>updateishyonalishi()} onCancel={()=>setIsModalOpen13(false)}>
 <input id='title13' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
</Modal>
    </div>
  )
}
