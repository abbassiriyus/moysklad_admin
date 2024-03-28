import React, { useEffect, useState } from 'react'
import { message, Button, Card, Checkbox, Col, Input, Modal, Row, Image } from 'antd';
import "./stylee.css";
import url from './host.js';
import axios from 'axios';
import Products from "./Products.js"
const { TextArea } = Input;
export default function CardsProduct({ post }) {
  var [category, setCategory] = useState([])
  var [checkFile, setCheckFile] = useState(false)
  var [checkFile1, setCheckFile1] = useState(false)



  var [data, setdata] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  
  const [deleteid,setDeleteId]=useState(-1)
  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleOk1 = () => {
    setIsModalOpen1(false); 
    axios.delete(`${url}/api/category/${deleteid}`).then(res=>{
    message.success('deleted');
    axios.get(`${url}/api/category`).then(res => {
      var a = res.data
      for (let i = 0; i < a.length; i++) {
        if (i == 0) {
          a[i].check = true
        } else {
          a[i].check = false
        }
      }
      setCategory(res.data)
    })
  }).catch(err=>{
    message.error("don't delete")
  })
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    
  };
  const showModal2 = (params) => {
    setIsModalOpen2(true);
   
  
setTimeout(() => { 
  setCheckFile1(false)
  document.querySelector("#file1").type="text"
  setDeleteId(params)
  var a=category.filter(item=>item.id==params)
  document.querySelector("#title1").value=a[0].title
  if(a[0].image.includes("http")){
    document.querySelector("#file1").value=a[0].image  
  }else{
    document.querySelector("#file1").value=url+'/'+a[0].image  
  }
}, 900);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  
function setCheck(key) {
for (let i = 0; i < category.length; i++) {
 if (key==i) {
 document.querySelectorAll('.tickCircle')[key].innerHTML=`<i class='bx bx-check'></i>` 
 document.querySelectorAll('.ant-card-body')[key].style=`border:2px solid orange;border-radius:10px` 
 }else{
  document.querySelectorAll('.tickCircle')[i].innerHTML=`<div></div>` 
  document.querySelectorAll('.ant-card-body')[i].style=`border: none` 
}}}
function postData(){
  var data=new FormData()
  data.append("title",document.querySelector("#title").value)
  if(checkFile){
  data.append("image",document.querySelector("#file").files[0])
  }else{
  data.append("image",document.querySelector("#file").value)
  }
  axios.post(`${url}/api/category`,data).then(res=>{
   message.success(" Created ")
   axios.get(`${url}/api/category`).then(res => {
    var a = res.data
    for (let i = 0; i < a.length; i++) {
      if (i == 0) {
        a[i].check = true
      } else {
        a[i].check = false
      }

    }
    setCategory(res.data)

  })
  setIsModalOpen(false);
}).catch(err=>{
 message.error("don't create")
  setIsModalOpen(false);
})
}
function onFile(e){
 setCheckFile(e.target.checked)
  if(e.target.checked){
  document.querySelector("#file").type="file"
  }else{
    document.querySelector("#file").type="text"
  }
}
function onFile1(e){
  setCheckFile1(e.target.checked)
   if(e.target.checked){
   document.querySelector("#file1").type="file"
   }else{
     document.querySelector("#file1").type="text"
   }
 }
function deteteData(params) {
setDeleteId(params)
showModal1()
}
function putData() {

  var data=new FormData()
  data.append("title",document.querySelector("#title1").value)
  if(checkFile1){
  data.append("image",document.querySelector("#file1").files[0])
  }else{
  data.append("image",document.querySelector("#file1").value)
  }
  axios.put(`${url}/api/category/${deleteid}`,data).then(res=>{
   message.success(" Update ")
   handleCancel2()
   axios.get(`${url}/api/category`).then(res => {
    var a = res.data
    for (let i = 0; i < a.length; i++) {
      if (i == 0) {
        a[i].check = true
      } else {
        a[i].check = false
      }
    }
    setCategory(res.data)
  })
  setIsModalOpen(false);
}).catch(err=>{
 message.error("don't update")
  setIsModalOpen(false);
})
}
  useEffect(() => {
    axios.get(`${url}/api/category`).then(res => {
      var a = res.data
      for (let i = 0; i < a.length; i++) {
        if (i == 0) {
          a[i].check = true
        } else {
          a[i].check = false
        }

      }
      setCategory(res.data)

    })
  }, [])

  return (
    <div>
     <h2>Category Product</h2>
     <Button style={{marginBottom:"20px"}} type="primary" onClick={()=>showModal()}>
       Create Category
      </Button>
      <Modal title="Basic Modal" visible={isModalOpen} onOk={()=>postData()} onCancel={()=>handleCancel()}>
      <input id='title' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <Checkbox onChange={(e)=>onFile(e)}>file</Checkbox>
    <input type='text' id='file' placeholder='image'  />
    <br />
    <br />
      </Modal>

      {category.length === 0 ? (<div>no category beton</div>) : (<Row gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}>{category.map((item, key) => {
        return <Col style={{flex:'100%',maxWidth:'240px',marginBottom:'10px'}} onClick={() => { setCheck(key) }} span={4} xs={24} xl={4} sm={6} md={6} >
          <div className="imgNameFour">
            <Card bordered={false} >
              <div className="tickCircle">{item.check?(<i class='bx bx-check'></i>):(<div></div>)}</div>
              <center><Image width={'100%'} height={'120px'} src={item.image} alt="no image" className='imgProductFour' />
                <h4>{item.title}</h4>
                <div className="icons"  style={{fontSize:'23px',display:'flex',justifyContent:'space-around'}}><i class='bx bxs-trash' style={{cursor:'pointer'}} onClick={()=>{deteteData(item.id)}} ></i><i class='bx bx-edit' onClick={()=>showModal2(item.id)} ></i></div>
                </center>
            </Card>
          </div>
        </Col>
      })} </Row>)}
      <Modal title="Basic Modal" visible={isModalOpen2} onOk={()=>putData()} onCancel={()=>handleCancel2()}>
      <input id='title1' showCount maxLength={50} placeholder='title'  />
    <br />
    <br />
    <Checkbox onChange={(e)=>onFile1(e)}>file</Checkbox>
    <input type='text' id='file1' placeholder='image'  />
    <br />
    <br />
      </Modal>
      <Modal title="Осторожность" visible={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
    <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
      </Modal>
      <Products category={category} />
    </div>
  )
}









