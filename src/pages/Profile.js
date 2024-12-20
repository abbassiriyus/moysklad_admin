import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import url from './host';
import axios from 'axios';
import Carousel from './Carousel';
import Homiy from './Homiy';

import Document1 from "./Document1.js"
import MinCon from "./MiniCon.js" 
import Toptovar from './Toptovar.js';
import KopSotilganlar from './KopSotilganlar.js';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
var [top,setTop]=useState([])
var [Best,setBest]=useState([])

  function getTop() {
    axios.get(`${url}/api/top_tovar`).then(res=>{
setTop(res.data)
    })
  }
  function postTop() {
    var data=new FormData()
    data.append('category_id',document.querySelector('.InputcategoryId4').value)
    axios.post(`${url}/api/top_tovar`,data).then(res=>{
    getTop()
    handleCancel()
    }).catch(err=>{
message.error("not create top category")
    })
  }
  function getBest() {
    axios.get(`${url}/api/best_seller`).then(res=>{
    setBest(res.data)
    })
  }
  function postBest() {
    var data=new FormData()
    data.append('category_id',document.querySelector('.InputcategoryId2').value)
    axios.post(`${url}/api/best_seller`,data).then(res=>{
    getBest()
    handleCancel1()
    }).catch(err=>{
message.error("not create top category")
    })
  }
  
function putTop() {
  var data=new FormData()
  data.append('category_id',document.querySelector('.InputcategoryId3').value)
  axios.put(`${url}/api/top_tovar/${top[0].id}` , data).then(res=>{
  getTop()
  handleCancel()
  }).catch(err=>{
message.error("not create top category")
  })
}
function putBest() {
  var data=new FormData()
    data.append('category_id',document.querySelector('.InputcategoryId1').value)
    axios.put(`${url}/api/best_seller/${Best[0].id}`,data).then(res=>{
    getBest()
    handleCancel1()
    }).catch(err=>{
message.error("not create top category")
    })
}



useEffect(()=>{
  getTop();
  getBest()
},[])  

  return (
    <div>
      

  <span> Kop Sotilgan:</span>
     <KopSotilganlar/>
    
       
       <br />
      <Modal title="Basic Modal" open={isModalOpen} onOk={postBest} onCancel={handleCancel}>
      <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="categoryId"
      name="InputcategoryId"
      rules={[
        {
          required: true,
          message: 'Iltimos Category IDni kiriting!',
        },
      ]}
    >
      <Input className='InputcategoryId2' />
    </Form.Item>

</Form>
      </Modal>
<span>Top Tovarlar:</span><Toptovar/>
  <MinCon/> 
     <Document1/>
     <Carousel/>
 <Homiy/>
      <br />
      <Modal title="Basic Modal" open={isModalOpen1} onOk={postTop} onCancel={handleCancel1}>
      <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="categoryId"
      name="InputcategoryId"
      rules={[
        {
          required: true,
          message: 'Iltimos Category IDni kiriting!',
        },
      ]}
    >
      <Input className='InputcategoryId4' />
    </Form.Item>

</Form>
      </Modal>


    </div>
  )
}
