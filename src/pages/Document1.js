import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from './host'
import { Button, Form, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default function Document1() {
var [carusel_image,setdocumentImage]=useState([])


function getdocument() {
    axios.get(`${url}/api/document`).then(res=>{
setdocumentImage(res.data)
    })
}
function Deletedocument(id) {
axios.delete(`${url}/api/document/${id}`).then(res=>{
    message.success("rasm o`chirildi")
    getdocument()
}).catch(err=>{
    message.error("xatolik yuz berdi")
})    
}
useEffect(()=>{
getdocument()
},[])
const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalOpen1, setIsModalOpen1] = useState(false);

const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
var data =new FormData()
data.append("image",document.querySelector('#modal_data_file').files[0])
axios.post(`${url}/api/document`,data).then(res=>{
    handleCancel()
    message.success("yangi rasm joylandi")
    getdocument()
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
  axios.put(`${url}/api/document/${select_id}`,data).then(res=>{
      handleCancel1()
      message.success("Yangi rasmga o`zgartitildi")
      getdocument()
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
        <h3>document uchun link yarating</h3>
        {carusel_image.length==0?(<Button style={{marginBottom:'20px'}} type="primary" onClick={showModal}>
        Create document
      </Button>):(<div className="document_images">
    {carusel_image.map((item,key)=>{
        return <div key={key} className='document_card'  >
          <a href={item.image}>url document</a><br />
            <Button  type="primary" onClick={()=>{showModal1();setSelectId(item.id)}} >edit</Button> <Button onClick={()=>Deletedocument(item.id)} danger>delete</Button>
        </div>
    })}
</div>)}
      
<br />




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
