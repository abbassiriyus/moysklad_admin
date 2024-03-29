
import React, { useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import url from './host';
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
export default function Home() {
  var [company,setCompany]=useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
const handleOk = () => {
var data=new FormData()
console.log(formItemLayout);
data.append("phone",document.querySelector('.InputNumber').value )
data.append("email",document.querySelector('.InputEmail').value )
data.append("address",document.querySelector(".InputAddress").value )
data.append("facebook",document.querySelector('.InputFacebook').value )
data.append("lan",document.querySelector('.InputLanguation').value )
data.append("lac",document.querySelector(".InputLocation").value )
data.append("telegram",document.querySelector('.InputTelegram').value )
data.append("youtobe",document.querySelector(".InputYoutube").value )
data.append("instagram",document.querySelector('.InputInstagram').value )
data.append("image", document.querySelector('#modal_data_file').files[0])

axios.post(`${url}/api/company`,data).then(res=>{
  message.success("Companiya yaratildi")
  handleCancel()
  getCompany()
}).catch(err=>{
  message.error("xato qayta urunib ko`ring")
handleCancel()
})
  };
  const UpdateCompany = () => {
    var data=new FormData()
    console.log(formItemLayout);
    data.append("phone",document.querySelector('.InputNumber1').value )
    data.append("email",document.querySelector('.InputEmail1').value )
    data.append("address",document.querySelector(".InputAddress1").value )
    data.append("facebook",document.querySelector('.InputFacebook1').value )
    data.append("lan",document.querySelector('.InputLanguation1').value )
    data.append("lac",document.querySelector(".InputLocation1").value )
    data.append("telegram",document.querySelector('.InputTelegram1').value )
    data.append("youtobe",document.querySelector(".InputYoutube1").value )
    data.append("instagram",document.querySelector('.InputInstagram1').value )
    data.append("image", document.querySelector("#data_put_image").files[0])
    
    axios.put(`${url}/api/company/${company[0].id}`,data).then(res=>{
      message.success("Companiya yaratildi")
      handleCancel()
    }).catch(err=>{
      message.error("xato qayta urunib ko`ring")
    handleCancel()
    })
      };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getCompany=()=>{
axios.get(`${url}/api/company`).then(res=>{
setCompany(res.data)
console.log(res.data);
}).catch(err=>{
  message.error("not get Company data")
})
  }
useEffect(()=>{
getCompany()
},[])



  return (
    <div>
      {company.length==0?(<Button type="primary" onClick={showModal}>
      Create Company
      </Button>):(
<div className="cards">
  <img src={company[0].image} style={{height:'70px'}} alt="no logo" />
<Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="Address"
      name="InputAddress"
      rules={[
        {
          required: true,
          message: 'Iltimos manzilni kiriting!',
        },
      ]}
    >
      <Input defaultValue={company[0].address} className='InputAddress1' />
    </Form.Item>

    <Form.Item
      label="Email"
      name="InputEmail"
      rules={[
        {
          required: true,
          message: 'Iltimos emailni kiriting!',
        },
      ]}
    >
      <Input defaultValue={company[0].email} className='InputEmail1' />
    </Form.Item>
    <Form.Item
      label="Facebook"
      name="InputFacebook"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input defaultValue={company[0].facebook} className='InputFacebook1' />
    </Form.Item>
    <Form.Item
      label="Telegram"
      name="InputTelegram"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input defaultValue={company[0].telegram} className='InputTelegram1' />
    </Form.Item>
    <Form.Item
      label="Youtobe"
      name="InputYoutube"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputYoutube1' defaultValue={company[0].youtobe}  />
    </Form.Item>
    <Form.Item
      label="Instagram"
      name="InputInstagram"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputInstagram1' defaultValue={company[0].instagram} />
    </Form.Item>
    <Form.Item
      label="Languation"
      name="InputLanguation"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputLanguation1' defaultValue={company[0].lan} />
    </Form.Item>
    <Form.Item
      label="Location"
      name="InputLocation"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputLocation1' defaultValue={company[0].lac} />
    </Form.Item>
    <Form.Item
      label="Phone"
      name="InputNumber"
      rules={[
        {
          required: true,
          message: 'Iltimos raqamni kititing!',
        },
      ]}
    >
      <Input
      defaultValue={company[0].phone}
        style={{
          width: '100%',
        }}
         type='number'
        className='InputNumber1'
      />
    </Form.Item>
    <Form.Item label="Logo" valuePropName="fileList">
     <div className='file_input'   listType="picture-card"> <input type="file" id='data_put_image' className='get_datainput' />
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </div>
        </Form.Item>
        <Button type="primary" onClick={()=>{UpdateCompany()}} style={{marginLeft:'20%'}}>Update Company</Button>
  </Form>
</div>

      )}
      
      <Modal title="Create Company" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="Address"
      name="InputAddress"
      rules={[
        {
          required: true,
          message: 'Iltimos manzilni kiriting!',
        },
      ]}
    >
      <Input className='InputAddress' />
    </Form.Item>

    <Form.Item
      label="Email"
      name="InputEmail"
      rules={[
        {
          required: true,
          message: 'Iltimos emailni kiriting!',
        },
      ]}
    >
      <Input className='InputEmail' />
    </Form.Item>
    <Form.Item
      label="Facebook"
      name="InputFacebook"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputFacebook' />
    </Form.Item>
    <Form.Item
      label="Telegram"
      name="InputTelegram"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputTelegram' />
    </Form.Item>
    <Form.Item
      label="Youtobe"
      name="InputYoutube"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputYoutube' />
    </Form.Item>
    <Form.Item
      label="Instagram"
      name="InputInstagram"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputInstagram' />
    </Form.Item>
    <Form.Item
      label="Languation"
      name="InputLanguation"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputLanguation' />
    </Form.Item>
    <Form.Item
      label="Location"
      name="InputLocation"
      rules={[
        {
          required: true,
          message: 'Iltimos linkni kititing!',
        },
      ]}
    >
      <Input className='InputLocation' />
    </Form.Item>
    <Form.Item
      label="Phone"
      name="InputNumber"
      rules={[
        {
          required: true,
          message: 'Iltimos raqamni kititing!',
        },
      ]}
    >
      <Input
        style={{
          width: '100%',
        }}
         type='number'
        className='InputNumber'
      />
    </Form.Item>
    <Form.Item label="Logo" valuePropName="fileList">
    <div className='file_input' listType="picture-card"> 
    <input type="file" className='get_datainput' id="modal_data_file" />
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </div>
        </Form.Item>
  </Form>
      </Modal>

    </div>
  )
}
