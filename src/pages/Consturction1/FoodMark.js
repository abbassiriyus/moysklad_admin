import { Button, Checkbox, Image, Modal, Select, Space, Table, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../host'

export default function Glotzif() {
const [isModalOpen11,setIsModalOpen11]=useState(false)
const [isModalOpen12,setIsModalOpen12]=useState(false)
const [isModalOpen13,setIsModalOpen13]=useState(false)
const [checkFile,setCheckFile]=useState()
const [selectId,setSelectId]=useState(0)
const [foodmark,setfoodmark]=useState(0)
const [foods,setfoods]=useState([])
function onFile11(e){
  setCheckFile(e.target.checked)
     if(e.target.checked){
     document.querySelector("#image11").type="file"
     }else{
       document.querySelector("#image11").type="text"
     }
   }
   var [Selectfoods,SetSelectfoods]=useState()
   var [Selectfoods1,SetSelectfoods1]=useState()
function onFile13(e){
    setCheckFile(e.target.checked)
       if(e.target.checked){
       document.querySelector("#image13").type="file"
       }else{
         document.querySelector("#image13").type="text"
       }
     }

function createfoodmark() {
  var postdata=new FormData()
  postdata.append("user_id",Selectfoods)
  postdata.append("my_id",Selectfoods1)
  postdata.append("description",document.querySelector("#description11").value)
  postdata.append("mark",document.querySelector("#mark11").value)
  axios.post(`${url}/api/foodmark`,postdata).then(res=>{
      message.success("create new data")
      setIsModalOpen11(false)
  axios.get(`${url}/api/foodmark`).then(res=>{
      setfoodmark(res.data)
  })
  }).catch(err=>{
  message.error("not create")
  setIsModalOpen11(false)
  })
 
   }
function updatefoodmark() {
    var postdata=new FormData()
    postdata.append("user_id",Selectfoods)
    postdata.append("description",document.querySelector("#description13").value)
    postdata.append("mark",document.querySelector("#mark13").value) 
    axios.put(`${url}/api/foodmark/${selectId}`,postdata).then(res=>{
        message.success("create new data")
        setIsModalOpen13(false)
    axios.get(`${url}/api/foodmark`).then(res=>{
        setfoodmark(res.data)
    })
    }).catch(err=>{
    message.error("not create")
    setIsModalOpen13(false)
    })
   
     }

function deletefoodmark() {
  axios.delete(`${url}/api/foodmark/${selectId}`,).then(res=>{
    setIsModalOpen12(false)
    axios.get(`${url}/api/foodmark`).then(res2=>{
      setfoodmark(res2.data)
    })
    message.success("delete foodmark")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen12(false)
  })  
}

const foodmarkcolumn = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
{
  title: 'user_id',
  dataIndex: 'user_id',
  key: 'user_id',
},
{
  title: 'description',
  dataIndex: 'description',
  key: 'description',
},
{
  title: 'mark',
  dataIndex: 'mark',
  key: 'mark',
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
    document.querySelector("#user_id13").value=record.user_id
    document.querySelector("#description13").value=record.description
    document.querySelector("#mark13").value=record.mark
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
axios.get(`${url}/api/foodmark`).then(res=>{
setfoodmark(res.data)
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
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> <h2 >User mark</h2> <Button type='primary'  onClick={()=>{
    setIsModalOpen11(true)
   }
   } >create</Button>  </div>
   <div className="table-responsive">  <Table  columns={foodmarkcolumn} pagination={{pageSize:'4'}} style={{width:'100%'}} dataSource={foodmark} /></div></div>
</div>




{/* foodmark */}
<Modal title="Осторожность" visible={isModalOpen11} onOk={()=>createfoodmark()} onCancel={()=>setIsModalOpen11(false)}>
   <label htmlFor="">Человек, которому был сделан комментарий</label><br />
    <Select style={{width:'90%'}} id="user_id11" onChange={(e) => {
            SetSelectfoods(e);console.log(e);
          }} >
            {foods.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.name}</Select.Option>
            })}
          </Select>
          <br />
    <br />
    <label htmlFor="">Мне</label> <br />
    <Select style={{width:'90%'}} id="user_id111" onChange={(e) => {
            SetSelectfoods1(e);console.log(e);
          }} >
            {foods.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.name}</Select.Option>
            })}
          </Select>
          <br />
    <br />
    <textarea style={{width:'90%',minHeight:'200px',border:'1px solid grey'}} id='description11' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <input id='mark11'  type='number' placeholder='mark'  />
    <br />
    <br />
    <br />
    <br />
   
</Modal>
<Modal title="Осторожность" visible={isModalOpen12} onOk={()=>deletefoodmark()} onCancel={()=>setIsModalOpen12(false)}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
</Modal>
 <Modal title="Осторожность" visible={isModalOpen13} onOk={()=>updatefoodmark()} onCancel={()=>setIsModalOpen13(false)}>
 <label htmlFor="">Человек, которому был сделан комментарий</label><br />
    <Select style={{width:'90%'}} id="user_id13" onChange={(e) => {
            SetSelectfoods(e);console.log(e);
          }} >
            {foods.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.name}</Select.Option>
            })}
        </Select>

        <Select style={{width:'90%'}} id="user_id131" onChange={(e) => {
            SetSelectfoods1(e);console.log(e);
          }} >
            {foods.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.name}</Select.Option>
            })}
          </Select>
    <textarea  style={{width:'90%',minHeight:'200px',border:'1px solid grey'}} id='description13' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <input id='mark13' showCount maxLength={50} placeholder='mark'  />
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
