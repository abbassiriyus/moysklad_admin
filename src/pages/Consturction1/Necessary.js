import { Button, Checkbox, file, Modal, Space, Table, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../host'

export default function Glotzif() {
const [isModalOpen11,setIsModalOpen11]=useState(false)
const [isModalOpen12,setIsModalOpen12]=useState(false)
const [isModalOpen13,setIsModalOpen13]=useState(false)
const [checkFile,setCheckFile]=useState()
const [selectId,setSelectId]=useState(0)
const [necessary,setnecessary]=useState(0)
function onFile11(e){
  setCheckFile(e.target.checked)
     if(e.target.checked){
     document.querySelector("#file11").type="file"
     }else{
       document.querySelector("#file11").type="text"
     }
   }


function onFile13(e){
    setCheckFile(e.target.checked)
       if(e.target.checked){
       document.querySelector("#file13").type="file"
       }else{
         document.querySelector("#file13").type="text"
       }
     }

function createnecessary() {
  var postdata=new FormData()
  postdata.append("title",document.querySelector("#title11").value)
  if(checkFile){
  postdata.append("file",document.querySelector("#file11").files[0])   
  }else{
  postdata.append("file",document.querySelector("#file11").value)    
  }
  
  axios.post(`${url}/api/necessary`,postdata).then(res=>{
      message.success("create new data")
      setIsModalOpen11(false)
  axios.get(`${url}/api/necessary`).then(res=>{
      setnecessary(res.data)
  })
  }).catch(err=>{
  message.error("not create")
  setIsModalOpen11(false)
  })
 
   }
function updatenecessary() {
    var postdata=new FormData()
    postdata.append("title",document.querySelector("#title13").value)
    if(checkFile){
    postdata.append("file",document.querySelector("#file13").files[0])   
    }else{
    postdata.append("file",document.querySelector("#file13").value)    
    }
    
    axios.put(`${url}/api/necessary/${selectId}`,postdata).then(res=>{
        message.success("create new data")
        setIsModalOpen13(false)
    axios.get(`${url}/api/necessary`).then(res=>{
        setnecessary(res.data)
    })
    }).catch(err=>{
    message.error("not create")
    setIsModalOpen13(false)
    })
   
     }

function deletenecessary() {
  axios.delete(`${url}/api/necessary/${selectId}`,).then(res=>{
    setIsModalOpen12(false)
    axios.get(`${url}/api/necessary`).then(res2=>{
      setnecessary(res2.data)
    })
    message.success("delete necessary")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen12(false)
  })  
}

const necessarycolumn = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
 {
  title: 'File',
  dataIndex: 'file',
  key: 'file',
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
    document.querySelector("#fullname13").value=record.fullname
    document.querySelector("#title13").value=record.title
    document.querySelector("#servis13").value=record.servis
    document.querySelector("#file13").value=record.file
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
axios.get(`${url}/api/necessary`).then(res=>{
setnecessary(res.data)
})
},[])

  return (
    <div style={{width:'100%',maxWidth:'700px'}}>


<div style={{display:'flex',
flexWrap:'wrap',
justifyContent:'space-around'}}>
<div style={{width:'100%',maxWidth:'700px',marginTop:'40px'}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> <h2 >Филе для шеф-повара</h2> <Button type='primary'  onClick={()=>{
    setIsModalOpen11(true)
   }
   } >create</Button>  </div>
   <div className="table-responsive">  <Table  columns={necessarycolumn} pagination={{pageSize:'4'}} style={{width:'100%'}} dataSource={necessary} /></div></div>
</div>




{/* necessary */}
<Modal title="Осторожность" visible={isModalOpen11} onOk={()=>createnecessary()} onCancel={()=>setIsModalOpen11(false)}>
    <input style={{width:'90%',border:'1px solid grey'}} id='title11' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <Checkbox onChange={(e)=>onFile11(e)}>file</Checkbox>
    <input type='text' id='file11' placeholder='file'  />
</Modal>
<Modal title="Осторожность" visible={isModalOpen12} onOk={()=>deletenecessary()} onCancel={()=>setIsModalOpen12(false)}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
</Modal>
 <Modal title="Осторожность" visible={isModalOpen13} onOk={()=>updatenecessary()} onCancel={()=>setIsModalOpen13(false)}>
    <input  style={{width:'90%',border:'1px solid grey'}} id='title13' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <Checkbox onChange={(e)=>onFile13(e)}>file</Checkbox>
    <input type='text' id='file13' placeholder='file'  />
</Modal>
    </div>
  )
}
