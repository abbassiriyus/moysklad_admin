import { Button, Checkbox, Image, Input, Modal, Space, Table, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from './host'
import SizUchun  from './Consturction1/SizUchun.js'
import OshpazdanTaom  from './Consturction1/OshpazdanTaom.js'
import Shirinliklar  from './Consturction1/Shirinliklar.js'
import Soglom  from './Consturction1/Soglom.js'
import GlFood  from './Consturction1/GlFood.js'
import GlDesert  from './Consturction1/GlDesert.js'
import GlProduct from './Consturction1/GlProduct.js'
import GlUsers from './Consturction1/GlUsers.js'
import Glotzif from './Consturction/Glotzif.js'
import Userprog from './Consturction1/Userprog.js'
import IshYonalishi from './Consturction1/IshYonalishi.js'
import Advantages from './Consturction1/Advantages.js'
import Necessary from './Consturction1/Necessary.js'
import FoodMark from './Consturction1/FoodMark.js'





export default function Construction() {
const [isModalOpen4,setIsModalOpen4]=useState(false)
const [isModalOpen5,setIsModalOpen5]=useState(false)
const [isModalOpen11,setIsModalOpen11]=useState(false)
const [isModalOpen12,setIsModalOpen12]=useState(false)
const [isModalOpen13,setIsModalOpen13]=useState(false)
const [checkFile,setCheckFile]=useState()
const [selectId,setSelectId]=useState(0)
const [userCount,setUserCount]=useState(0)
const [gl_desert,setgl_desert]=useState(0)

const [company,setCompany]=useState([])

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
  function updateCompany() {
      var postdata=new FormData()
      postdata.append("email",document.querySelector("#email1").value)
      postdata.append("whatsapp",document.querySelector("#whatsapp1").value)
      postdata.append("vkantakt",document.querySelector("#vkantakt1").value)
      postdata.append("telegram",document.querySelector("#telegram1").value)
      postdata.append("playmarket",document.querySelector("#playmarket1").value)
      postdata.append("app_store",document.querySelector("#app_store1").value)
      postdata.append("okru",document.querySelector("#okru1").value)

      if(checkFile){
      postdata.append("image",document.querySelector("#image1").files[0])   
      }else{
      postdata.append("image",document.querySelector("#image1").value)    
      }
      axios.put(`${url}/api/company/${company[0].id}`,postdata).then(res=>{
          message.success("update] new company")
          setIsModalOpen5(false)
      axios.get(`${url}/api/compony`).then(res=>{
          setCompany(res.data)
      })
      }).catch(err=>{
      message.error("not create")
      setIsModalOpen5(false)
      })
    }
    function onFile62(e){
      setCheckFile(e.target.checked)
         if(e.target.checked){
         document.querySelector("#image1").type="file"
         }else{
           document.querySelector("#image1").type="text"
         }
       }
    function createCompany (){
      var postdata=new FormData()
      postdata.append("email",document.querySelector("#email").value)
      postdata.append("whatsapp",document.querySelector("#whatsapp").value)
      postdata.append("vkantakt",document.querySelector("#vkantakt").value)
      postdata.append("telegram",document.querySelector("#telegram").value)
      postdata.append("okru",document.querySelector("#okru").value)
      postdata.append("app_store",document.querySelector("#app_store").value)
      postdata.append("playmarket",document.querySelector("#playmarket").value)



      if(checkFile){
      postdata.append("image",document.querySelector("#image").files[0])   
      }else{
      postdata.append("image",document.querySelector("#image").value)    
      }
      
      axios.post(`${url}/api/company`,postdata).then(res=>{
          message.success("create new sponsor")
          setIsModalOpen4(false)
      axios.get(`${url}/api/compony`).then(res=>{
          setCompany(res.data)
    
      })
      }).catch(err=>{
      message.error("not create")
      setIsModalOpen4(false)
      })
    
    }
    function onFile61(e){
    setCheckFile(e.target.checked)
       if(e.target.checked){
       document.querySelector("#image").type="file"
       }else{
         document.querySelector("#image").type="text"
       }
     }
function getgl_desert(params) {
  axios.get(`${url}/api/gl_desert`).then(res=>{
    setgl_desert(res.data)
  }) 
}
function creategl_desert() {
  var postdata=new FormData()
  postdata.append("latitude",document.querySelector("#latitude11").value)
  postdata.append("title",document.querySelector("#title11").value)
  postdata.append("longitude",document.querySelector("#longitude11").value)
  if(checkFile){
  postdata.append("image",document.querySelector("#image11").files[0])   
  }else{
  postdata.append("image",document.querySelector("#image11").value)    
  }
  
  axios.post(`${url}/api/gl_desert`,postdata).then(res=>{
      message.success("create new data")
      setIsModalOpen11(false)
  axios.get(`${url}/api/gl_desert`).then(res=>{
      setgl_desert(res.data)
  })
  }).catch(err=>{
  message.error("not create")
  setIsModalOpen11(false)
  })
 
   }
function updategl_desert() {
    var postdata=new FormData()
    postdata.append("latitude",document.querySelector("#latitude13").value)
    postdata.append("title",document.querySelector("#title13").value)
    postdata.append("longitude",document.querySelector("#longitude13").value)
    if(checkFile){
    postdata.append("image",document.querySelector("#image13").files[0])   
    }else{
    postdata.append("image",document.querySelector("#image13").value)    
    }
    
    axios.put(`${url}/api/gl_desert/${selectId}`,postdata).then(res=>{
        message.success("create new data")
        setIsModalOpen13(false)
    axios.get(`${url}/api/gl_desert`).then(res=>{
        setgl_desert(res.data)
    })
    }).catch(err=>{
    message.error("not create")
    setIsModalOpen13(false)
    })
   
     }

function deletegl_desert() {
  axios.delete(`${url}/api/gl_desert/${selectId}`,).then(res=>{
    setIsModalOpen12(false)
    axios.get(`${url}/api/gl_desert`).then(res2=>{
      setgl_desert(res2.data)
    })
    message.success("delete gl_desert")
  }).catch(err=>{
    message.error("NOT delete")
    setIsModalOpen12(false)
  })  
}

const gl_desertcolumn = [
  {
    title: 'Image',
    dataIndex: 'name',
    render: (_,text) => <Image src={text.image} height={"40px"}/>,
  },{
  title: 'latitude',
  dataIndex: 'latitude',
  key: 'latitude',
},
{
  title: 'longitude',
  dataIndex: 'longitude',
  key: 'longitude',
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
    document.querySelector("#latitude13").value=record.latitude
    document.querySelector("#title13").value=record.title
    document.querySelector("#longitude13").value=record.longitude
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
axios.get(`${url}/api/company`).then(res=>{
  setCompany(res.data)
  getgl_desert()
})
},[])

  return (
    <div>

{company.length>0?(<div className="dd" style={{minWidth:'300px',width:'80%',margin:'auto',maxWidth:'500px'}}>
<input style={{marginTop:'40px'}} id="slider" class="customSlider" type="checkbox"/>
  <label for="slider"></label>

<div class="wrapper">
	<div class="top-icons">
		<i
    style={{fontSize:'30px',cursor:'pointer'}}
    onClick={()=>{
      setIsModalOpen5(true)
      setTimeout(() => {
        document.querySelector("#whatsapp1").value=company[0].whatsapp
        document.querySelector("#email1").value=company[0].email
        document.querySelector("#playmarket1").value=company[0].playmarket
        document.querySelector("#app_store1").value=company[0].app_store
        document.querySelector("#vkantakt1").value=company[0].vkantakt
        document.querySelector("#telegram1").value=company[0].telegram
        document.querySelector("#okru1").value=company[0].okru
        document.querySelector("#image1").value=company[0].image
      }, 900);
    }} class="fa fa-pencil"></i>
	</div>
	
	<div class="profile" style={{textAlign:'center'}}>
		<Image height={'120px'}  src={company[0].image} class="thumbnail" />
<p class="title">telegram:{company[0].telegram}</p>
<p class="title">email:{company[0].email}</p>
<p class="title">whatsapp:{company[0].whatsapp}</p>
<p class="title">vkantakt:{company[0].vkantakt}</p>
<p class="title">playmarket:{company[0].playmarket}</p>
<p class="title">app_store:{company[0].app_store}</p>
<p class="title">email:{company[0].email}</p>
	</div>
</div> 
</div>):(
<Button onClick={()=>{setIsModalOpen4(true)
}} type="primary">Create company</Button>)}
<div style={{width:'100%', justifyContent:'space-between', margin:"auto", display:'flex',flexWrap:'wrap',}}>
<SizUchun/>
<OshpazdanTaom/>
<Shirinliklar/>
<Soglom/>
<GlFood/>
<GlDesert/>
<GlProduct/>
<GlUsers/>
<Glotzif/>
<Userprog/>
<IshYonalishi/>
<Advantages/>
<Necessary/>
<FoodMark/>

</div>
    {/* Company */}
    <Modal title="Осторожность" visible={isModalOpen4} onOk={()=>createCompany()} onCancel={()=>setIsModalOpen4(false)}>
   <input id='email' showCount maxLength={50} placeholder='email'  />
    <br />
    <br />
    <input id='whatsapp' showCount maxLength={50} placeholder='whatsapp'  />
    <br />
    <br />
    <input id='vkantakt' showCount maxLength={50} placeholder='vkantakt'  />
    <br />
    <br />
    <input id='telegram' showCount maxLength={50} placeholder='telegram'  />
    <br />
    <br />
    <input id='playmarket' showCount maxLength={50} placeholder='playmarket'  />
    <br />
    <br />
    <input id='app_store' showCount maxLength={50} placeholder='app_store'  />
    <br />
    <br />
    <input id='okru' showCount maxLength={50} placeholder='okru'  />
    <br />
    <br />
    <br />
    <br />
    <Checkbox onChange={(e)=>onFile61(e)}>file</Checkbox>
    <input type='text' id='image' placeholder='image'  />
</Modal>
 <Modal title="Осторожность" visible={isModalOpen5} 
 onOk={()=>updateCompany()} onCancel={()=>setIsModalOpen5(false)}>
   <input id='email1' showCount maxLength={50} placeholder='email'  />
    <br />
    <br />
    <input id='whatsapp1' showCount maxLength={50} placeholder='whatsapp'  />
    <br />
    <br />
    <input id='vkantakt1'  showCount maxLength={50} placeholder='vkantakt'  />
    <br />
    <br />
    <input id='telegram1' showCount maxLength={50} placeholder='telegram'  />
    <br />
    <br />
    <input id='playmarket1' showCount maxLength={50} placeholder='playmarket'  />
    <br />
    <br />
    <input id='app_store1' showCount maxLength={50} placeholder='app_store'  />
    <br />
    <br />
    <input id='okru1' showCount maxLength={50} placeholder='okru'  />
    <br />
    <br />
    <br />
    <br />
    <Checkbox onChange={(e)=>onFile62(e)}>file</Checkbox>
    <input type='text' id='image1' placeholder='image'  />
</Modal>



{/* gl_desert */}
<Modal title="Осторожность" visible={isModalOpen11} onOk={()=>creategl_desert()} onCancel={()=>setIsModalOpen11(false)}>
    <input id='latitude11' showCount maxLength={50} placeholder='latitude'  />
    <br />
    <br />
    <input id='title11' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <input id='longitude11' showCount maxLength={50} placeholder='longitude'  />
    <br />
    <br />
    <br />
    <br />
    <Checkbox onChange={(e)=>onFile11(e)}>file</Checkbox>
    <input type='text' id='image11' placeholder='image'  />
</Modal>
<Modal title="Осторожность" visible={isModalOpen12} onOk={()=>deletegl_desert()} onCancel={()=>setIsModalOpen12(false)}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
</Modal>
 <Modal title="Осторожность" visible={isModalOpen13} onOk={()=>updategl_desert()} onCancel={()=>setIsModalOpen13(false)}>
 <input id='latitude13' showCount maxLength={50} placeholder='latitude'  />
    <br />
    <br />
    <input id='title13' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <input id='longitude13' showCount maxLength={50} placeholder='longitude'  />
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
