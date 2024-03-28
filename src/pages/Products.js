import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  message,
  Button,
  Modal,
  Input,
  Select,
  Image
} from "antd";

import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "./host";
import TextArea from "antd/es/input/TextArea";



function Tables(props) {
  var [category, setCategory] = useState(props.category)
  var [data, setData] = useState([])
  const [mark, SetMark] = useState([])
  const [homiy, SetHomiy] = useState([])
  const [selectMarka, SetSelectMarka] = useState(null)
  const [selectcategory, SetSelectCategory] = useState(null)
  const [deleteid, setDeleteId] = useState()
  const [isModalOpen12, setIsModalOpen12] = useState(false)
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  function deteteData(params) {
    setDeleteId(params)
    showModal1()
  }
  const handleOk1 = () => {
 axios.delete(`${url}/api/foods/${deleteid}`).then(res=>{
  message.success("delete data")
  handleCancel1()
  axios.get(`${url}/api/foods`).then(res => {
    setData(res.data)

  })
 }).catch(err=>{
  message.error("no delete")
 })
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel12 = () => {
    setIsModalOpen12(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);


  function PostProduct(params) {
    var data = new FormData()
    data.append("description", document.querySelector("#description").value)
    data.append("foods_name", document.querySelector("#foods_name").value)
    data.append("portion", document.querySelector("#portion").value)
    data.append("weight", document.querySelector("#weight").value)
    data.append("preparation_time", document.querySelector("#preparation_time").value)
    data.append("storage_condition", document.querySelector("#storage_condition").value)
    data.append("calorie", document.querySelector("#calorie").value)
    data.append("proteins", document.querySelector("#proteins").value)
    data.append("oils", document.querySelector("#oils").value)
    data.append("user_povar_id", selectMarka)
    data.append("category_id", selectcategory)
    data.append("dastafka_us", document.querySelector("#dastafka_us").value)
    data.append("carbs", document.querySelector("#carbs").value)
    data.append("packages", document.querySelector("#packages").value)
    data.append("price", document.querySelector("#price").value)
    data.append("image", document.querySelector("#image").value)
    axios.post(`${url}/api/foods`, data).then(res => {
      message.success("Create new Product")
      setIsModalOpen(false)
      axios.get(`${url}/api/foods`).then(res => {
        setData(res.data)
    
      })
    }).catch(err => {
      message.error("don't create")
      setIsModalOpen(false)
    })
  }
  function PutProduct() {
    var data = new FormData()
    data.append("description", document.querySelector("#description1").value)
    data.append("foods_name", document.querySelector("#foods_name1").value)
    data.append("portion", document.querySelector("#portion1").value)
    data.append("weight", document.querySelector("#weight1").value)
    data.append("preparation_time", document.querySelector("#preparation_time1").value)
    data.append("storage_condition", document.querySelector("#storage_condition1").value)
    data.append("calorie", document.querySelector("#calorie1").value)
    data.append("proteins", document.querySelector("#proteins1").value)
    data.append("oils", document.querySelector("#oils1").value)
    data.append("user_povar_id", selectMarka)
    data.append("category_id", selectcategory)
    data.append("dastafka_us", document.querySelector("#dastafka_us1").value)
    data.append("carbs", document.querySelector("#carbs1").value)
    data.append("packages", document.querySelector("#packages1").value)
    data.append("price", document.querySelector("#price1").value)
    data.append("image", document.querySelector("#image1").value)
    axios.put(`${url}/api/foods/${deleteid}`, data).then(res => {
      message.success("update")
      axios.get(`${url}/api/foods`).then(res => {
        setData(res.data)
      })
      setIsModalOpen12(false)
    }).catch(err => {
      message.error("Error don't update")
      setIsModalOpen12(false)
    })
  }
  function openPutData(putdata) {
    setIsModalOpen12(true)
    setTimeout(() => {
      document.querySelector("#description1").value = putdata.description
      document.querySelector("#foods_name1").value = putdata.foods_name
      document.querySelector("#portion1").value = putdata.portion
      document.querySelector("#weight1").value = putdata.weight
      document.querySelector("#preparation_time1").value = putdata.preparation_time
      document.querySelector("#storage_condition1").value = putdata.storage_condition
      document.querySelector("#calorie1").value = putdata.calorie
      document.querySelector("#proteins1").value = putdata.proteins
      document.querySelector("#oils1").value = putdata.oils
      document.querySelector("#marka1").value = putdata.user_povar_id
      document.querySelector("#category1").value = putdata.category_id
      document.querySelector("#dastafka_us1").value = putdata.dastafka_us
      document.querySelector("#carbs1").value = putdata.carbs
      document.querySelector("#price1").value = putdata.price
      document.querySelector("#packages1").value = putdata.packages
      document.querySelector("#image1").value = putdata.image
    }, 900);
    setDeleteId(putdata.id)
  }
  useEffect(() => {
    setCategory(props.category)
  })
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  useEffect(() => {
axios.get(`${url}/api/foods`).then(res=>{
  setData(res.data)
  axios.get(`${url}/api/users`).then(res2=>{
    SetMark(res2.data)
       })
})
  }, [])
  function filterData1() {
    axios.get(`${url}/api/foods`).then(res=>{
      setData(res.data)
    })
  }
  const filterData = (id) => {
    axios.get(`${url}/api/foods`).then(res=>{
      var a=res.data.filter(item=>item.category_id==id)
      setData(a)
   

    })
  }
  function handleSearch(params) {
    axios.get(`${url}/api/marka`).then(res => {
      SetMark(res.data)
      axios.get(`${url}/api/homeiy`).then(res1 => {
        SetHomiy(res1.data)
        axios.get(`${url}/api/product`).then(res2 => {
          for (let i = 0; i < res2.data.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
              if (res.data[j].id === res2.data[i].marka) {
                res2.data[i].marka_name = res.data[j].title
              }
              for (let j = 0; j < res1.data.length; j++) {
                if (res1.data[j].id === res2.data[i].homiy_id) {
                  res2.data[i].homiy = res1.data[j].title
                  res2.data[i].image = res1.data[j].image
                }
              }
              for (let j = 0; j < category.length; j++) {
                if (category[j].id == res2.data[i].category) {
                  res2.data[i].category_name = category[j].title
                }
              }
            }
          }
          var a = res2.data.filter(item => (item.category_name.includes(params) || item.description.includes(params) || item.marka_name.includes(params)))
          setData(a)
        })
      })
    })
  }
  const columns = [
    {
      title: "Food image",
      dataIndex: "image",
      render: (_, item) => <Image style={{ height: "30px" }} alt="no image" src={item.image} />,
      width: "5%",
    },
    {
      title: "foods_name",
      dataIndex: "foods_name",
      key: "foods_name",
    },
    {
      title: "portion",
      dataIndex: "portion",
      key: "portion",
    },
    {
      title: "weight",
      key: "weight",
      dataIndex: "weight",
    },
    {
      title: "preparation_time",
      key: "preparation_time",
      dataIndex: "preparation_time",
    },
    {
      title: "storage_condition",
      key: "storage_condition",
      dataIndex: "storage_condition",
    },
    {
      title: "calorie",
      key: "calorie",
      dataIndex: "calorie",
    },
    {
      title: "proteins",
      key: "proteins",
      dataIndex: "proteins",
    },
    {
      title: "oils",
      key: "oils",
      dataIndex: "oils",
    },
    {
      title: "description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "dastafka_us",
      key: "dastafka_us",
      dataIndex: "dastafka_us",
    }, {
      title: "carbs",
      key: "carbs",
      dataIndex: "carbs",
    },
    {
      title: "packages",
      key: "packages",
      dataIndex: "packages",
    },
    {
      title: "mark",
      key: "mark",
      dataIndex: "mark",
    },
    {
      title: "mark_org",
      key: "mark_org",
      dataIndex: "mark_org",
    },
    {
      title: "Производитель",
      dataIndex: "user_image",
      render: (_, item) => <Image style={{ height: "30px" }} alt="no image" src={item.user_image} />,
      width: "5%",
    },
    {
      title: "USER",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Delete",
      render: (_, item) => <Button onClick={() => { deteteData(item.id) }} danger>Delete</Button>,
    },
    {
      title: "Edit",
      render: (_, item) => <Button onClick={() => { openPutData(item) }} type="dashed">Edit</Button>,
    },
  ];
  return (
    <>
      <div className="tabled">
        <br />
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Product table"
              extra={
                <div style={{ paddingBottom: '10px', paddingTop: '10px' }}>

                  <Radio.Group onChange={() => onChange} defaultValue="a">
                    <Radio.Button onClick={() => filterData1()} value="ss">All</Radio.Button>
                    {category.map(item => {
                      return <Radio.Button onClick={() => filterData(item.id)} value={item.id}>{item.title}</Radio.Button>
                    })}
                    <Button style={{ marginLeft: '20px' }} onClick={showModal} type="primary" >Create Product
                    </Button>
                  </Radio.Group>
                  <input onKeyUp={(e) => { handleSearch(e.target.value) }} style={{ marginBottom: '10px', marginTop: '10px' }} type="text" />
                </div>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  className="ant-border-space"
                />
              </div>
            </Card>


          </Col>
        </Row>
  <Modal title="Create food" open={isModalOpen} onOk={() => PostProduct()} onCancel={handleCancel}>
          <input placeholder="foods_name" id="foods_name" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="portion" id="portion" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="weight" id="weight" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="preparation_time" id="preparation_time" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="storage_condition" id="storage_condition" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="calorie" id="calorie" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="proteins" id="proteins" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="oils" id="oils" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <TextArea style={{width:'90%'}} placeholder="description" id="description" onChange={onChange} />
          <br />
          <br />
          <label htmlFor="">user</label><br />
          <Select style={{width:'90%'}} id="marka" onChange={(value) => {
            SetSelectMarka(value)
          }} >
            {mark.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.name}</Select.Option>
            })}
          </Select>
          <br />
          <br />
          <label htmlFor="">Category</label>
          <Select style={{width:'90%'}} width="90%" id="category" onChange={(value) => {
            SetSelectCategory(value)
          }}>
            {category.map(item => {
              return <Select.Option value={item.id}>{item.title}</Select.Option>
            })}
          </Select>
          <br />
          <br />
          <input id="dastafka_us" placeholder="dastafka_us" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
          <input id="carbs" placeholder="carbs" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
          <input id="packages" placeholder="packages" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
          <input id="price" placeholder="price" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
          <input id="image" placeholder="image" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
        </Modal>
        <Modal title="Осторожность" open={isModalOpen1} onOk={() => handleOk1()} onCancel={handleCancel1}>
          <p>Вы уверены, что хотите удалить эту информацию? Это может привести к плохим последствиям.</p>
        </Modal>
        <Modal title="Edit foods" open={isModalOpen12} onOk={() => PutProduct()} onCancel={handleCancel12}>
        <input placeholder="foods_name" id="foods_name1" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="portion" id="portion1" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="weight" id="weight1" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="preparation_time" id="preparation_time1" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="storage_condition" id="storage_condition1" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="calorie" id="calorie1" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="proteins" id="proteins1" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <input placeholder="oils" id="oils1" type="text" showCount  onChange={onChange} />
          <br />
          <br />
          <TextArea style={{width:'90%'}} placeholder="description" id="description1" onChange={onChange} />
          <br />
          <br />
          <label htmlFor="">user</label><br />
          <Select style={{width:'90%'}} id="marka1" onChange={(value) => {
            SetSelectMarka(value)
          }} >
            {mark.map(item => {
              return <Select.Option value={item.id}> {item.id} {item.name}</Select.Option>
            })}
          </Select>
          <br />
          <br />
          <label htmlFor="">Category</label>
          <Select style={{width:'90%'}} width="90%" id="category1" onChange={(value) => {
            SetSelectCategory(value)
          }}>
            {category.map(item => {
              return <Select.Option value={item.id}>{item.title}</Select.Option>
            })}
          </Select>
          <br />
          <br />
          <input id="dastafka_us1" placeholder="dastafka_us" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
          <input id="carbs1" placeholder="carbs" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
          <input id="packages1" placeholder="packages" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
          <input id="price1" placeholder="price" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
          <input id="image1" placeholder="image" type="text" showCount  allowClear onChange={onChange} />
          <br />
          <br />
        </Modal>

      </div>
    </>
  );
}

export default Tables;
