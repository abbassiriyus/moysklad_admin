import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from './host'
import { Button, Form, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default function Homiy() {
var [carusel_image,sethomiyImage]=useState([])


function gethomiy() {
    axios.get(`${url}/api/homiy`).then(res=>{
sethomiyImage(res.data)
    })
}
function Deletehomiy(id) {
axios.delete(`${url}/api/homiy/${id}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}).then(res=>{
    message.success("rasm o`chirildi")
    gethomiy()
}).catch(err=>{
    message.error("xatolik yuz berdi")
})    
}
useEffect(()=>{
gethomiy()
},[])
const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalOpen1, setIsModalOpen1] = useState(false);

const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
var data =new FormData()
data.append("image",document.querySelector('#modal_data_file').files[0])
axios.post(`${url}/api/homiy`,data, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}).then(res=>{
    handleCancel()
    message.success("yangi rasm joylandi")
    gethomiy()
}).catch(err=>{
    message.error("xatolik")
})
};
const handleCancel = () => {
  setIsModalOpen(false);
};
var [select_id,setSelectId]=useState(0)
const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
  var data =new FormData()
  data.append("image",document.querySelector('#modal_data_file1').files[0])
  axios.put(`${url}/api/homiy/${select_id}`,data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
      handleCancel1()
      message.success("Yangi rasmga o`zgartitildi")
      gethomiy()
  }).catch(err=>{
      message.error("xatolik")
  })
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  return (
    <div>
        <br />
        <h3>Homiylarni karouseldagi rasmlari</h3>
        <Button style={{marginBottom:'20px'}} type="primary" onClick={showModal}>
        Create homiy
      </Button>
<br />
<div style={{display:'flex',flexWrap:'wrap',gap:'30px'}} className="homiy_images">
    {carusel_image.map((item,key)=>{
        return <div style={{height:'180px'}} key={key} className='homiy_card'  >
            <img  style={{height:'50%'}} src={item.image} alt="" /><br />
            <Button  type="primary" onClick={()=>{showModal1();setSelectId(item.id)}} >edit</Button> <Button onClick={()=>Deletehomiy(item.id)} danger>delete</Button>
        </div>
    })}
</div>



      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <Form>
     <Form.Item label="Image" valuePropName="fileList">
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

      <Modal title="Basic Modal" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
     <Form>
     <Form.Item label="Image" valuePropName="fileList">
    <div className='file_input' listType="picture-card"> 
      <input type="file" className='get_datainput' id="modal_data_file1" />
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
