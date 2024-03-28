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
const [gl_otzif,setgl_otzif]=useState(0)
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

function creategl_otzif() {
  var postdata=new FormData()
  postdata.append("fullname",document.querySelector("#fullname11").value)
  postdata.append("deskription",document.querySelector("#deskription11").value)
  postdata.append("servis",document.querySelector("#servis11").value)
  if(checkFile){
  postdata.append("image",document.querySelector("#image11").files[0])   
  }else{
  postdata.append("image",document.querySelector("#image11").value)    
  }
  
  axios.post(`${url}/api/gl_otzif`,postdata).then(res=>{
      message.success("create new data")
      setIsModalOpen11(false)
  axios.get(`${url}/api/gl_otzif`).then(res=>{
      setgl_otzif(res.data)
  })
  }).catch(err=>{
  message.error("not create")
  setIsModalOpen11(false)
  })
 
   }
function updategl_otzif() {
    var postdata=new FormData()
    postdata.append("fullname",document.querySelector("#fullname13").value)
    postdata.append("deskription",document.querySelector("#deskription13").value)
    postdata.append("servis",document.querySelector("#servis13").value)
    if(checkFile){
    postdata.append("image",document.querySelector("#image13").files[0])   
    }else{
    postdata.append("image",document.querySelector("#image13").value)    
    }
    
    axios.put(`${url}/api/gl_otzif/${selectId}`,postdata).then(res=>{
        message.success("create new data")
        setIsModalOpen13(false)
    axios.get(`${url}/api/gl_otzif`).then(res=>{
        setgl_otzif(res.data)
    })
    }).catch(err=>{
    message.error("not create")
    setIsModalOpen13(false)
    })
   
     }

function deletegl_otzif() {
  axios.delete(`${url}/api/gl_otzif/${selectId}`,).then(res=>{
    setIsModalOpen12(false)
    axios.get(`${url}/api/gl_otzif`).then(res2=>{
      setgl_otzif(res2.data)
    })
    message.success("delete gl_otzif")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen12(false)
  })  
}

const gl_otzifcolumn = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Image',
    dataIndex: 'name',
    render: (_,text) => <Image src={text.image} height={"40px"}/>,
  },{
  title: 'fullname',
  dataIndex: 'fullname',
  key: 'fullname',
},
{
  title: 'servis',
  dataIndex: 'servis',
  key: 'servis',
},
{
  title: 'deskription',
  dataIndex: 'deskription',
  key: 'deskription',
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
    document.querySelector("#deskription13").value=record.deskription
    document.querySelector("#servis13").value=record.servis
    document.querySelector("#image13").value=record.image
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
axios.get(`${url}/api/gl_otzif`).then(res=>{
setgl_otzif(res.data)
})
},[])

  return (
    <div style={{width:'100%',maxWidth:'700px'}}>


<div style={{display:'flex',
flexWrap:'wrap',
justifyContent:'space-around'}}>
<div style={{width:'100%',maxWidth:'700px',marginTop:'40px'}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> <h2 >User mark in header</h2> <Button type='primary'  onClick={()=>{
    setIsModalOpen11(true)
   }
   } >create</Button>  </div>
   <div className="table-responsive">  <Table  columns={gl_otzifcolumn} pagination={{pageSize:'4'}} style={{width:'100%'}} dataSource={gl_otzif} /></div></div>
</div>




{/* gl_otzif */}
<Modal title="Осторожность" open={isModalOpen11} onOk={()=>creategl_otzif()} onCancel={()=>setIsModalOpen11(false)}>
    <input id='fullname11' showCount maxLength={50} placeholder='fullname'  />
    <br />
    <br />
    <textarea style={{width:'90%',minHeight:'200px',border:'1px solid grey'}} id='deskription11' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <input id='servis11' showCount maxLength={50} placeholder='servis'  />
    <br />
    <br />
    <br />
    <br />
    <Checkbox onChange={(e)=>onFile11(e)}>file</Checkbox>
    <input type='text' id='image11' placeholder='image'  />
</Modal>
<Modal title="Осторожность" open={isModalOpen12} onOk={()=>deletegl_otzif()} onCancel={()=>setIsModalOpen12(false)}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
</Modal>
 <Modal title="Осторожность" open={isModalOpen13} onOk={()=>updategl_otzif()} onCancel={()=>setIsModalOpen13(false)}>
 <input id='fullname13' showCount maxLength={50} placeholder='fullname'  />
    <br />
    <br />
    <textarea  style={{width:'90%',minHeight:'200px',border:'1px solid grey'}} id='deskription13' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <input id='servis13' showCount maxLength={50} placeholder='servis'  />
    <br />
    <br />
    <br />
    <br />
    <Checkbox onChange={(e)=>onFile13(e)}>file</Checkbox>
    <input type='text' id='image13' placeholder='image'  />
</Modal>
    </div>
  )
}
