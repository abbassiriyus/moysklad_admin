import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from './host';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message, Table, Image } from 'antd';
import { CiStar } from "react-icons/ci";
import { FaKickstarterK } from "react-icons/fa";




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
export default function Users() {

  var [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  var [ischecked, setIsChecked] = useState(false)
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  var [selectid, setSelectId] = useState(0)
  var [dataSource2, setDataSourcle2] = useState([])
  var [data_all, setAll] = useState([])

  const showModal = () => {
    setIsModalOpen(true);
  };



  const handleOk = () => {
    var data = new FormData()
    if (ischecked) {
      data.append("category_title", document.querySelector('.InputCategoryTitle').value)
    } else {
      data.append("category_title", data_all[document.querySelector('#InputcategoryId__24').value].name)
    }
    data.append("category_id", data_all[document.querySelector('#InputcategoryId__24').value].id)
    data.append("subcategory", subCategory)
    data.append("image", document.querySelector('#modal_data_file').files[0])
    axios.post(`${url}/api/category`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      message.success("Category yaratildi")
      handleCancel()
      getData()
    }).catch(err => {
      message.error("xato qayta urunib ko`ring")
      handleCancel()
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function getData() {
    axios.get(`${url}/api/category`).then(res => {
      setData(res.data)
    }).catch(err => {
      message.error("don`t get category")
    })
  }


  const handleOk1 = () => {
    var data = new FormData()
if (ischecked) {
  data.append("category_title", document.querySelector('.InputCategoryTitle1').value)
}else{
  data.append("category_title", data_all[document.querySelector('#InputcategoryId__24').value].name)
}
    data.append("category_id", data_all[document.querySelector('#InputcategoryId__24').value].id)
    data.append("subcategory", subCategory)
    if (document.querySelector('#modal_data_file1').files[0]) {
      data.append("image", document.querySelector('#modal_data_file1').files[0])
    } else {
      data.append("image", selectid.image)
    }

    axios.put(`${url}/api/category/${selectid.id}`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {

      message.success("Category o`zgartitildi")
      handleCancel1()
      getData()
      getSubCategory(selectid)
    }).catch(err => {
      message.error("xato qayta urunib ko`ring")
      handleCancel1()
    })
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const handleOk2 = () => {
    axios.delete(`${url}/api/category/${selectid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      getData()
      handleCancel2()
    }).catch(err => {
      message.error("Category not delete")
      handleCancel2()
    })
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };


  var getallCategory = () => {
    axios.get(`${url}/api/category/all`).then(res => {
      setAll(res.data)

    }).catch(err => {
      message.error("not get all category")
    })
  }


  function getSubCategory(id) {
    var a = [...data]
    var d = a.filter(item => (item.subcategory == id))
    setDataSourcle2(d)
  }


  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Categorya Nomi',
      dataIndex: 'category_title',
    },
    {
      title: 'type',
      render: (_, item) => {
          return item.subcategory === 0 ? <div><FaKickstarterK /></div> : <><CiStar /> <CiStar /></>;
      },
  },
    {
      title: 'Delete',
      render: (_,item)=><Button danger onClick={() => { setSelectId(item.id); setIsModalOpen2(true) }} >Delete</Button>,
    },
  ];

  const columns2 = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Category_title',
      dataIndex: 'category_title',
      key: 'category_title',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (_, item) => <><Image style={{ width: '50px' }} src={item.image} alt="" /></>
    },
    {
      title: 'delete',
      dataIndex: 'delete',
      render: (_, item) => <><Button danger onClick={() => { setSelectId(item.id); setIsModalOpen2(true) }} >Delete</Button></>
    },
    {
      title: 'edit',
      dataIndex: 'edit',
      render: (_, item) => <><Button onClick={() => {setSelectId(item); setIsModalOpen1(true) }} type="dashed" >Edit</Button></>
    },
  ];
  useEffect(() => {
    getData()
    getallCategory()
  }, [])

var [keyedit,setKeyEdit]=useState(0)
  var [subCategory, setSubCategory] = useState(0)
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create {subCategory == 0 ? ('Category') : ('SubCategory')}
      </Button>

      {subCategory !== 0 ? (<>
        <Button onClick={() => { setSubCategory(0) }} style={{ marginLeft: '20px' }} type="primary">Ortga</Button>
        <h2 style={{ marginTop: '20px' }}>Subcategoriya</h2><br />
        <Table dataSource={dataSource2} columns={columns2} /></>) : (<> <h2 style={{ marginTop: '20px' }}>Categoriya</h2><br /><div className="category_cards">

          {data.map((item, key) => {
            if (item.subcategory == 0) {
              return <div className="category_card">
                <img src={item.image} onClick={() => { setSubCategory(item.id); getSubCategory(item.id) }} alt="no image" />
                <h3 className="title" onClick={() => { setSubCategory(item.id); getSubCategory(item.id) }}>{item.category_title}</h3>
                <p className='id' onClick={() => { setSubCategory(item.id); getSubCategory(item.id) }}>{item.category_id}</p>
                <div className='icons'><DeleteOutlined onClick={() => { setSelectId(item.id); setIsModalOpen2(true) }} style={{ cursor: 'pointer' }} /> <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { setSelectId(item); setIsModalOpen1(true);data_all.map((item2,key2)=>{
                  if(item2.id==item.category_id){
                   setKeyEdit(key2)
                   console.log(item2);
                   
                  }
                })
                 }} /></div>
              </div>
            }

          })}
        </div></>
      )}


      <Modal title={subCategory == 0 ? ('Create Category') : ('Create SubCategory')} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          <p>Categoryni tanlang</p>
          <select className='select_23' name="" id="InputcategoryId__24">
            {data_all.map((item, key) => {
              return <option value={key}>{item.pathName.length > 0 ? item.pathName + " > " : ""}{item.name}</option>
            })}
          </select>

          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <input onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" name="" id="" /> Qayta nomlash</div>
          <p style={{ display: ischecked ? "block" : "none" }}>Categorya nomi:</p>
          <Input style={{ display: ischecked ? "block" : "none", marginBottom: '20px' }} className='InputCategoryTitle' />
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
                > Upload </div>
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Edit Category" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          <p>Categoryni tanlang</p>
          <select className='select_23' name="" defaultValue={keyedit} id="InputcategoryId__24">
            {data_all.map((item, key) => {
              return <option value={key}>{item.pathName.length > 0 ? item.pathName + " > " : ""}{item.name}</option>
            })}
          </select>


          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <input onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" name="" id="" /> Qayta nomlash</div>
          <p style={{ display: ischecked ? "block" : "none" }}>Categorya nomi:</p>
          <Input style={{ display: ischecked ? "block" : "none", marginBottom: '20px' }} className='InputCategoryTitle1' />

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

<Table columns={columns} dataSource={data}/>
      <Modal title="Delete Category" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <p>Siz O`chirayapgan ma`lumot sayt uchun axamiyatli bo`lishi mumkin. rostdan ham o`chirasizmi </p>
      </Modal>


    </div>
  )
}
