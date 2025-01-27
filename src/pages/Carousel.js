import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from './host'
import { Button, Form, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default function Carousel() {
var [carusel_image,setCarouselImage]=useState([])







function getCarousel() {
    axios.get(`${url}/api/carousel`).then(res=>{
setCarouselImage(res.data)
    })
}
function DeleteCarousel(id) {
axios.delete(`${url}/api/carousel/${id}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}).then(res=>{
    message.success("rasm o`chirildi")
    getCarousel()
}).catch(err=>{
    message.error("xatolik yuz berdi")
})    
}
useEffect(()=>{
getCarousel()
getAllCategory()
},[])
const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalOpen1, setIsModalOpen1] = useState(false);
const [isChecked, setIsChecked] = useState(false);
var [allCategory,setAllCategory]=useState([])
var [select_key,setSelectKey]=useState(0)


function getAllCategory() {
  axios.get(`${url}/api/category/all`).then(res=>{
    setAllCategory(res.data)
  })
}

const handleCheckboxChange = (event) => {
  setIsChecked(event.target.checked);
};

const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
var data =new FormData()

console.log(document.querySelector('#title_ss_11').value);
console.log(isChecked);
if(isChecked){
 data.append('title',document.querySelector('#title_ss__12').value) 
}else{
 data.append('title',allCategory[document.querySelector('#title_ss_11').value].name) 

}
data.append('category_id',allCategory[document.querySelector('#title_ss_11').value].id)
data.append("image",document.querySelector('#modal_data_file').files[0])
axios.post(`${url}/api/carousel`,data, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}).then(res=>{
    handleCancel()
    message.success("yangi rasm joylandi")
    getCarousel()
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
  if(isChecked){
   data.append('title',document.querySelector('#title_ss_22').value)
  }else{
    data.append('title',allCategory[document.querySelector('#title_ss_21').value].name)
   
  }
   data.append('category_id',allCategory[document.querySelector('#title_ss_21').value].id)
  data.append("image",document.querySelector('#modal_data_file1').files[0])
  axios.put(`${url}/api/carousel/${select_id}`,data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
      handleCancel1()
      message.success("Yangi rasmga o`zgartitildi")
      getCarousel()
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
        <h3>Asosiy oynadagi rasmni boshqarish</h3>
        <Button style={{marginBottom:'20px'}} type="primary" onClick={showModal}>
        Create Carousel
      </Button>
<br />
<div className="carousel_images">
    {carusel_image.map((item,key)=>{
        return <div key={key} className='carousel_card'  >
          <h3>{item.title}</h3>
            <img src={item.image} alt="" /><br />
            <Button  type="primary" onClick={()=>{
              showModal1();
              setSelectId(item.id);
              allCategory.map((item2,key2)=>{
if(item.category_id===item2.id){
  setSelectKey(key2)
}
              })}} >edit</Button> <Button onClick={()=>DeleteCarousel(item.id)} danger>delete</Button>
        </div>
    })}
</div>



      <Modal title="Asosiy oynadagi reklamali oyna yaratish" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <Form>
      <p>title</p>
      <input type="checkbox" id='chackbox_1'  checked={isChecked}
        onChange={handleCheckboxChange} /> qayta nomlash <br />
      <input placeholder='nom kiriting' style={{ display: isChecked ? 'block' : 'none' }} type="text" className='title_ss' id='title_ss__12' />
      <br />
      <p>Group</p>
      <select name="" className='title_ss'  id="title_ss_11">
       {allCategory && allCategory.length > 0 && allCategory.map((item,key)=>{
        return <option value={key}>{item.pathName.length>0?item.pathName+" > ":""}{item.name}</option>
       })} 
        
      </select>
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

      <Modal title="Tanlanganni  o`zgartirish" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
     <Form>
     <p>title</p>
     <input type="checkbox" id='chackbox_1'  checked={isChecked}
        onChange={handleCheckboxChange} /> qayta nomlash <br />
     <input type="text" defaultValue={allCategory[select_key]?allCategory[select_key].name:''} className='title_ss' id='title_ss_22' placeholder='nom kiriting' style={{ display: isChecked ? 'block' : 'none' }} />
     <br />
     <p>Group</p>
      <select name="" className='title_ss' defaultValue={select_key}  id="title_ss_21">
       {allCategory && allCategory.length > 0 && allCategory.map((item,key)=>{
        return <option value={key}>{item.pathName.length>0?item.pathName+" > ":""}{item.name}</option>
       })} 
       
        
      </select>
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
