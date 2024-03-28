import { Button, Checkbox, Image, Modal, Select, Space, Table, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../host'

export default function OshpazdanTaom() {
const [isModalOpen11,setIsModalOpen11]=useState(false)
const [isModalOpen12,setIsModalOpen12]=useState(false)
const [isModalOpen13,setIsModalOpen13]=useState(false)
const [checkFile,setCheckFile]=useState()
const [selectId,setSelectId]=useState(0)
const [oshpazdan_taom,setoshpazdan_taom]=useState(0)
const [Category,setCategory]=useState([])
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
function getoshpazdan_taom(params) {
  axios.get(`${url}/api/oshpazdan_taom`).then(res=>{
    setoshpazdan_taom(res.data)
  }) 
}
function createoshpazdan_taom() {
  var postdata=new FormData()
  postdata.append("food_ca_id",SelectCategory)
  axios.post(`${url}/api/oshpazdan_taom`,postdata).then(res=>{
      message.success("create new data")
      setIsModalOpen11(false)
      getoshpazdan_taom()
  }).catch(err=>{
  message.error("not create")
  setIsModalOpen11(false)
  })
 
   }
function updateoshpazdan_taom() {
    var postdata=new FormData()
    postdata.append("food_ca_id",SelectCategory)
    axios.put(`${url}/api/oshpazdan_taom/${selectId}`,postdata).then(res=>{
        message.success("create new data")
        setIsModalOpen13(false)
        getoshpazdan_taom()
    }).catch(err=>{
    message.error("not create")
    setIsModalOpen13(false)
    })
   
     }

function deleteoshpazdan_taom() {
  axios.delete(`${url}/api/oshpazdan_taom/${selectId}`,).then(res=>{
    setIsModalOpen12(false)
    getoshpazdan_taom()
    message.success("delete oshpazdan_taom")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen12(false)
  })  
}

const oshpazdan_taomcolumn = [
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


var [SelectCategory,SetSelectCategory]=useState()
useEffect(()=>{
axios.get(`${url}/api/oshpazdan_taom`).then(res=>{
setoshpazdan_taom(res.data)
axios.get(`${url}/api/category`).then(res=>{
  setCategory(res.data)
  })
})
},[])

  return (
    <div style={{width:'100%',maxWidth:'700px'}}>


<div style={{display:'flex',
flexWrap:'wrap',
justifyContent:'space-around'}}>
<div style={{width:'100%',maxWidth:'700px',marginTop:'40px'}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> <h2 >Блюда от поваров</h2> <Button type='primary'  onClick={()=>{
    setIsModalOpen11(true)
   }
   } >create</Button>  </div>
   <div className="table-responsive">  
   <Table  columns={oshpazdan_taomcolumn} pagination={{pageSize:'4'}} style={{width:'100%'}} dataSource={oshpazdan_taom} /></div></div>
</div>




{/* oshpazdan_taom */}
<Modal title="Осторожность" visible={isModalOpen11} onOk={()=>createoshpazdan_taom()} onCancel={()=>setIsModalOpen11(false)}>
<label htmlFor="">Category</label><br />
          <Select style={{width:'90%'}} id="marka" onChange={(e) => {
            SetSelectCategory(e);console.log(e);
          }} >
            {Category.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.title}</Select.Option>
            })}
          </Select>
</Modal>
<Modal title="Осторожность" visible={isModalOpen12} onOk={()=>deleteoshpazdan_taom()} onCancel={()=>setIsModalOpen12(false)}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
</Modal>
 <Modal title="Осторожность" visible={isModalOpen13} onOk={()=>updateoshpazdan_taom()} onCancel={()=>setIsModalOpen13(false)}>
 <Select style={{width:'90%'}} id="marka" onChange={(value) => {
            SetSelectCategory(value)
          }} >
            {Category.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.title}</Select.Option>
            })}
          </Select>

</Modal>
    </div>
  )
}
