import { Button,  Image, Modal, Select, Space, Table, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../host'

export default function GlDesert() {
const [isModalOpen11,setIsModalOpen11]=useState(false)
const [isModalOpen12,setIsModalOpen12]=useState(false)
const [isModalOpen13,setIsModalOpen13]=useState(false)

const [selectId,setSelectId]=useState(0)
const [gl_desert,setgl_desert]=useState(0)
const [foods,setfoods]=useState([])

function getgl_desert(params) {
  axios.get(`${url}/api/gl_desert`).then(res=>{
    setgl_desert(res.data)
    axios.get(`${url}/api/foods`).then(res=>{
      setfoods(res.data)
      })
    }).catch(err=>{
      axios.get(`${url}/api/foods`).then(res=>{
        setfoods(res.data)
        })
    }) 
}
function creategl_desert() {
  var postdata=new FormData()
  postdata.append("food_ca_id",Selectfoods)
  axios.post(`${url}/api/gl_desert`,postdata).then(res=>{
      message.success("create new data")
      setIsModalOpen11(false)
      getgl_desert()
  }).catch(err=>{
  message.error("not create")
  setIsModalOpen11(false)
  })
 
   }
function updategl_desert() {
    var postdata=new FormData()
    postdata.append("food_ca_id",Selectfoods)
    axios.put(`${url}/api/gl_desert/${selectId}`,postdata).then(res=>{
        message.success("create new data")
        setIsModalOpen13(false)
        getgl_desert()
    }).catch(err=>{
    message.error("not create")
    setIsModalOpen13(false)
    })
   
     }

function deletegl_desert() {
  axios.delete(`${url}/api/gl_desert/${selectId}`,).then(res=>{
    setIsModalOpen12(false)
    getgl_desert()
    message.success("delete gl_desert")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen12(false)
  })  
}

function deletegl_desert() {
  axios.delete(`${url}/api/gl_desert/${selectId}`,).then(res=>{
    setIsModalOpen13(false)
    axios.get(`${url}/api/gl_desert`).then(res=>{
      setgl_desert(res.data)
    })
    message.success("delete gl_desert")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen13(false)
  })  
}

const gl_desertcolumn = [
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
  title: 'foods_name',
  dataIndex: 'foods_name',
  key: 'foods_name',
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
axios.get(`${url}/api/gl_desert`).then(res=>{
setgl_desert(res.data)
axios.get(`${url}/api/foods`).then(res=>{
  setfoods(res.data)
  })
}).catch(err=>{
  axios.get(`${url}/api/foods`).then(res=>{
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
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> <h2>ПОПУЛЯРНЫЕ ДЕСЕРТЫ</h2> <Button type='primary'  onClick={()=>{
    setIsModalOpen11(true)
   }
   } >create</Button>  </div>
   <div className="table-responsive">  
   <Table  columns={gl_desertcolumn} pagination={{pageSize:'4'}} style={{width:'100%'}} dataSource={gl_desert} /></div></div>
</div>




{/* gl_desert */}
<Modal title="Осторожность" visible={isModalOpen11} onOk={()=>creategl_desert()} onCancel={()=>setIsModalOpen11(false)}>
<label htmlFor="">foods</label><br />
          <Select style={{width:'90%'}} id="marka" onChange={(e) => {
            SetSelectfoods(e);console.log(e);
          }} >
            {foods.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.foods_name}</Select.Option>
            })}
          </Select>
</Modal>
<Modal title="Осторожность" visible={isModalOpen12} onOk={()=>deletegl_desert()} onCancel={()=>setIsModalOpen12(false)}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
</Modal>
 <Modal title="Осторожность" visible={isModalOpen13} onOk={()=>updategl_desert()} onCancel={()=>setIsModalOpen13(false)}>
 <Select style={{width:'90%'}} id="marka" onChange={(value) => {
            SetSelectfoods(value)
          }} >
            {foods.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.title}</Select.Option>
            })}
          </Select>

</Modal>
    </div>
  )
}
