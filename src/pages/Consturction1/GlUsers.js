import { Button, Checkbox, Image, Modal, Select, Space, Table, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../host'

export default function GlFood() {
const [isModalOpen11,setIsModalOpen11]=useState(false)
const [isModalOpen12,setIsModalOpen12]=useState(false)
const [isModalOpen13,setIsModalOpen13]=useState(false)
const [checkFile,setCheckFile]=useState()
const [selectId,setSelectId]=useState(0)
const [gl_users,setgl_users]=useState(0)
const [foods,setfoods]=useState([])
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
function getgl_users(params) {
  axios.get(`${url}/api/gl_users`).then(res=>{
    setgl_users(res.data)
  }) 
}
function creategl_users() {
  var postdata=new FormData()
  postdata.append("user_ca_id",Selectfoods)
  axios.post(`${url}/api/gl_users`,postdata).then(res=>{
      message.success("create new data")
      setIsModalOpen11(false)
      getgl_users()
  }).catch(err=>{
  message.error("not create")
  setIsModalOpen11(false)
  })
 
   }
function updategl_users() {
    var postdata=new FormData()
    postdata.append("user_ca_id",Selectfoods)
    axios.put(`${url}/api/gl_users/${selectId}`,postdata).then(res=>{
        message.success("create new data")
        setIsModalOpen13(false)
        getgl_users()
    }).catch(err=>{
    message.error("not create")
    setIsModalOpen13(false)
    })
   
     }

function deletegl_users() {
  axios.delete(`${url}/api/gl_users/${selectId}`,).then(res=>{
    setIsModalOpen12(false)
    getgl_users()
    message.success("delete gl_users")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen12(false)
  })  
}

const gl_userscolumn = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Image',
    dataIndex: 'name',
    render: (_,text) => <Image src={text.image} height={"40px"}/>,
  },

{
  title: 'name',
  dataIndex: 'name',
  key: 'name',
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
     }}
     >  Edit</Button>
    <Button danger onClick={()=>{
      setIsModalOpen12(true)
      setSelectId(record.id)
    }} >Delete</Button>
    </Space>
  ),
},
];


var [Selectfoods,SetSelectfoods]=useState()
useEffect(()=>{
axios.get(`${url}/api/gl_users`).then(res=>{
setgl_users(res.data)
axios.get(`${url}/api/users`).then(res=>{
  setfoods(res.data)
  })
}).catch(err=>{
  axios.get(`${url}/api/users`).then(res=>{
    setfoods(res.data)
    })
})
},[])

  return (
    <div style={{width:'100%',maxWidth:'700px'}}>


<div style={{display:'flex',
flexWrap:'wrap',
justifyContent:'space-around'}}>
<div style={{width:'100%',maxWidth:'700px',marginTop:'40px'}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> <h2>Users</h2> <Button type='primary'  onClick={()=>{
    setIsModalOpen11(true)
   }
   } >create</Button>  </div>
   <div className="table-responsive">  
   <Table  columns={gl_userscolumn} pagination={{pageSize:'4'}} style={{width:'100%'}} dataSource={gl_users} /></div></div>
</div>




{/* gl_users */}
<Modal title="Осторожность" open={isModalOpen11} onOk={()=>creategl_users()} onCancel={()=>setIsModalOpen11(false)}>
<label htmlFor="">foods</label><br />
          <Select style={{width:'90%'}} id="marka" onChange={(e) => {
            SetSelectfoods(e);console.log(e);
          }} >
            {foods.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.name}</Select.Option>
            })}
          </Select>
</Modal>
<Modal title="Осторожность" open={isModalOpen12} onOk={()=>deletegl_users()} onCancel={()=>setIsModalOpen12(false)}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
</Modal>
 <Modal title="Осторожность" open={isModalOpen13} onOk={()=>updategl_users()} onCancel={()=>setIsModalOpen13(false)}>
 <Select style={{width:'90%'}} id="marka" onChange={(value) => {
            SetSelectfoods(value)
          }} >
            {foods.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.name}</Select.Option>
            })}
  </Select>

</Modal>
    </div>
  )
}
