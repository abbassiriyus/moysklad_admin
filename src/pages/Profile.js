import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import url from './host';
import axios from 'axios';
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
  const handleOk = () => {
    setIsModalOpen(false);
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
  function getBest() {
    axios.get(`${url}/api/best_seller`).then(res=>{
setBest(res.data)
    })
  }

useEffect(()=>{
  getTop();
  getBest()
})  

  return (
    <div>
      

      {Best.length==0?(<Button type="primary" onClick={showModal}> Eng kop sotilgan categoriyasi
      </Button>):(
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
      <Input className='InputcategoryId' />
    </Form.Item>
      )}
       
       <br />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
      <Input className='InputcategoryId' />
    </Form.Item>

</Form>
      </Modal>
{top.length==0?( <Button  style={{marginTop:'10px'}} type="primary" onClick={showModal1}>
        Top Tavarlar
      </Button>):(
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
         <Input className='InputcategoryId' />
       </Form.Item>
      )}
     
      <br />
      <Modal title="Basic Modal" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
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
      <Input className='InputcategoryId' />
    </Form.Item>

</Form>
      </Modal>


    </div>
  )
}
