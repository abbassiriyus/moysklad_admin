import { Button, Checkbox, Image, Modal, Select, Space, Table, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from './host'

export default function GlCategory() {
const [isModalOpen11,setIsModalOpen11]=useState(false)
const [isModalOpen12,setIsModalOpen12]=useState(false)
const [isModalOpen13,setIsModalOpen13]=useState(false)
const [checkFile,setCheckFile]=useState()
const [selectId,setSelectId]=useState(0)
const [header_category,setheader_category]=useState(0)
const [Category,setCategory]=useState([])
function onFile11(e){
  setCheckFile(e.target.checked)
     if(e.target.checked){
     document.querySelector("#image11").type="file"
     }else{
       document.querySelector("#image11").type="text"
     }
   }



function getheader_category(params) {
  axios.get(`${url}/api/header_category`).then(res=>{
    setheader_category(res.data)
  }) 
}
function createheader_category() {
  var postdata=new FormData()
  postdata.append("category_id",SelectCategory)
  axios.post(`${url}/api/header_category`,postdata).then(res=>{
      message.success("create new data")
      setIsModalOpen11(false)
      getheader_category()
  }).catch(err=>{
  message.error("not create")
  setIsModalOpen11(false)
  })
 
   }
function updateheader_category() {
    var postdata=new FormData()
    postdata.append("category_id",SelectCategory)
    axios.put(`${url}/api/header_category/${selectId}`,postdata).then(res=>{
        message.success("create new data")
        setIsModalOpen13(false)
        getheader_category()
    }).catch(err=>{
    message.error("not create")
    setIsModalOpen13(false)
    })
   
     }

function deleteheader_category() {
  axios.delete(`${url}/api/header_category/${selectId}`,).then(res=>{
    setIsModalOpen12(false)
    axios.get(`${url}/api/header_category`).then(res2=>{
      setheader_category(res2.data)
    })
    message.success("delete header_category")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen12(false)
  })  
}

const header_categorycolumn = [
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
  title: 'category_title',
  dataIndex: 'category_title',
  key: 'category_title',
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
axios.get(`${url}/api/header_category`).then(res=>{
setheader_category(res.data)
axios.get(`${url}/api/Category`).then(res=>{
  setCategory(res.data)
  })
}).catch(err=>{
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
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> <h2 >ПОПУЛЯРНЫЕ БЛЮДА</h2> <Button type='primary'  onClick={()=>{
    setIsModalOpen11(true)
   }
   } >create</Button>  </div>
   <div className="table-responsive">  
   <Table  columns={header_categorycolumn} pagination={{pageSize:'4'}} style={{width:'100%'}} dataSource={header_category} /></div></div>
</div>




{/* header_category */}
<Modal title="Осторожность" visible={isModalOpen11} onOk={()=>createheader_category()} onCancel={()=>setIsModalOpen11(false)}>
<label htmlFor="">Category</label><br />
          <Select style={{width:'90%'}} id="marka" onChange={(e) => {
            SetSelectCategory(e);console.log(e);
          }} >
            {Category.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.category_title}</Select.Option>
            })}
          </Select>
</Modal>
<Modal title="Осторожность" visible={isModalOpen12} onOk={()=>deleteheader_category()} onCancel={()=>setIsModalOpen12(false)}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
</Modal>
 <Modal title="Осторожность" visible={isModalOpen13} onOk={()=>updateheader_category()} onCancel={()=>setIsModalOpen13(false)}>
 <Select style={{width:'90%'}} id="marka" onChange={(value) => {
            SetSelectCategory(value)
          }} >
            {Category.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.category_title}</Select.Option>
            })}
          </Select>

</Modal>
    </div>
  )
}
