
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import url from './host';
import axios from 'axios';
import Carousel from './Carousel';
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
    axios.get(`${url}/api/dolor_course`).then(res=>{
setTop(res.data)
    })
  }
  function postTop() {
    var data=new FormData()
    data.append('dollor',document.querySelector('.InputcategoryId41').value)
    axios.post(`${url}/api/dolor_course`,data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
    getTop()
    message.success("bajarildi")
    handleCancel()
    }).catch(err=>{
message.error("not create top category")
    })
  }
  function getBest() {
    axios.get(`${url}/api/tokensklad`).then(res=>{
    setBest(res.data)
    })
  }
  function postBest() {
    var data=new FormData()
    data.append('token',document.querySelector('.InputcategoryId21').value)
    axios.post(`${url}/api/tokensklad`,data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
    getBest()
    message.success("bajarildi")
    handleCancel1()
    }).catch(err=>{
message.error("not create top category")
    })
  }
  
function putTop() {
  var data=new FormData()
  data.append('dollor',document.querySelector('.InputcategoryId31').value)
  axios.put(`${url}/api/dolor_course/${top[0].id}` , data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res=>{
  getTop()
  message.success("bajarildi")
  handleCancel()
  }).catch(err=>{
message.error("not create top category")
  })
}
function putBest() {
  var data=new FormData()
    data.append('token',document.querySelector('.InputcategoryId11').value)
    axios.put(`${url}/api/tokensklad/${Best[0].id}`,data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
    getBest()
    message.success("bajarildi")
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
      
<a href="https://base64.guru/converter/encode/text">Base64</a><br />
      {Best.length==0?(<Button type="primary" onClick={showModal}> Eng Moysklad tokeni Base64 ko`rinishda kiriting
      </Button>):(
        <Form.Item
      label="Moysklad token"
      name="InputcategoryId"
      rules={[
        {
          required: true,
          message: 'Iltimos base64ni kiriting!',
        },
      ]}
    >
      <Input defaultValue={Best[0].token} className='InputcategoryId11' />
      <Button onClick={()=>{putBest()}} type="primary" style={{marginTop:'10px'}}>Moysklad token</Button>
    </Form.Item>
      )}
       
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
      <Input className='InputcategoryId21' />
    </Form.Item>

</Form>
      </Modal>
{top.length==0?( <Button  style={{marginTop:'10px'}} type="primary" onClick={showModal1}>
        Dollor kursini yarating
      </Button>):(
         <Form.Item
         label="Dollor kursi"
         name="InputcategoryId"
         rules={[
           {
             required: true,
             message: 'Iltimos somni kiriting!',
           },
         ]}
       >
         <Input  defaultValue={top[0].dollor} className='InputcategoryId31' />
      <Button style={{marginTop:'10px'}} onClick={()=>putTop()} type="primary">Top Tovarlar</Button>
       </Form.Item>
      )}
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
      label="1 dollor qancha"
      name="InputcategoryId"
      rules={[
        {
          required: true,
          message: 'Iltimos Category IDni kiriting!',
        },
      ]}
    >
      <Input className='InputcategoryId41' /> so`m
    </Form.Item>

</Form>
      </Modal>


    </div>
  )
}
