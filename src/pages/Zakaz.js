import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Modal,
} from "antd";
import url from "./host";


export default function Zakaz() {
  var [data, setData] = useState([]);
  var [zakaz, setZakaz] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  var [page, setPage] = useState(0);
  var [VoditelId, setVoditelId] = useState([]);
  var [Voditel, setVoditel] = useState([]);
  var [mashina, setMashina] = useState([]);
  var [Users, setUsers] = useState([]);
  var [Zakaz_id, setZakaz_id] = useState([]);

  function Page(item) {
    setVoditelId(item);
    axios.get(`${url}/api/voditel_zakaz`).then((res) => {
      const Filter = res.data.filter((item1) => item1.zakaz_id == item.id);
      setVoditel(Filter);
      // res.data.map(item1=>{

      // })
    });
    setPage(1);
  }  

  const zakaz1 = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "12%",
    },
    {
      title: "fullname",
      dataIndex: "fullname",
      width: "12%",
    },
    {
      title: "phone",
      key: "phone",
      dataIndex: "phone",
      width: "12%",
    },
    {
      title: "to_my_friend",
      key: "to_my_friend",
      dataIndex: "to_my_friend",
      width: "12%",
    },
    {
      title: "the_city",
      key: "the_city",
      dataIndex: "the_city",
      width: "12%",
    },
    {
      title: "village",
      key: "village",
      dataIndex: "village",
      width: "12%",
    },
    {
      title: "home",
      key: "home",
      dataIndex: "home",
      width: "12%",
    },
    {
      title: "office",
      key: "office",
      dataIndex: "office",
      width: "12%",
    },
    {
      title: "building",
      key: "building",
      dataIndex: "mashina",
      width: "12%",
    },
    {
      title: "convex",
      key: "convex",
      dataIndex: "convex",
      width: "12%",
    },
    {
      title: "date",
      key: "date",
      dataIndex: "date",
      width: "12%",
    },
    {
      title: "time",
      key: "time",
      dataIndex: "time",
      width: "12%",
    },
    {
      title: "food_id",
      key: "food_id",
      dataIndex: "food_id",
      width: "12%",
    },
    {
      title: "creator",
      key: "creator",
      dataIndex: "creator",
      width: "12%",
    },
    {
      title: "Delete",
      key: "Delete",
      render: (_, item) => <Radio.Button onClick={()=>deleteZakaz(item.id)}>Delete</Radio.Button>,
      width: "10%",
    },
  ];

  function deleteZakaz(id){
    axios.delete(`${url}/api/food_seller/${id}`).then(res=>{
       alert("Удалено")
       axios.get(`${url}/api/food_seller`).then((res) => {
        setZakaz(res.data);
      });
    }).catch(err=>{
        alert("Не удалось удалить")
    })
  }

 
  useEffect(() => {
    axios.get(`${url}/api/food_seller`).then((res) => {
      setZakaz(res.data);
    });
  }, []);

  function postZakaz() {
    var formdata = new FormData();
    formdata.append("car_id", document.querySelector("#CarVod").value);
    formdata.append(
      "operator_id",
      document.querySelector("#OperatorVod").value
    );
    formdata.append("zakaz_id", VoditelId.id);

    axios
      .post(`${url}/api/voditel_zakaz`, formdata)
      .then((res) => {
        alert("Добавлен");
        setIsModalOpen(false)
        axios.get(`${url}/api/voditel_zakaz`).then((res) => {
          const Filter = res.data.filter(
            (item1) => item1.zakaz_id == VoditelId.id
          );
          setVoditel(Filter);
        });
      })
      .catch((err) => {
        alert("Не присоединился");
      });
  }
  function putZakaz() {
    var formdata = new FormData();
    formdata.append("car_id", document.querySelector("#CarVod1").value);
    formdata.append("finishing", document.querySelector("#OperatorFini").value);
    
    axios
      .put(`${url}/api/voditel_zakaz/${Zakaz_id}`, formdata)
      .then((res) => {
        alert("Измененный");
        setIsModalOpen1(false)
        axios.get(`${url}/api/voditel_zakaz`).then((res) => {
          const Filter = res.data.filter(
            (item1) => item1.zakaz_id == VoditelId.id
          );
          setVoditel(Filter);
        });
      })
      .catch((err) => {
        alert("Не изменилось");
      });
  }
  const showModalClose = () => {
    setIsModalOpen(false);
  };
  const showModalClose1 = () => {
    setIsModalOpen1(false);
  };




  return (
    <div>
  
   
      
        
            <div className="tabled">
              <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                  <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="All Zakaz"
                  >
                    <div className="table-responsive">
                      <Table
                        columns={zakaz1}
                        dataSource={zakaz}
                        pagination={{ pageSize: "7" }}
                        className="ant-border-space"
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
         
      
      
       

      <Modal
        title="Modal"
        visible={isModalOpen}
        onOk={() => postZakaz()}
        onCancel={() => showModalClose()}
      >
        <label>
          <p>Car</p>
          <select
            name=""
            id="CarVod"
            style={{ width: "90%", height: "35px", border: "1px solid grey" }}
          >
            {mashina.map((item) => {
              return <option value={item.id}>{item.surname}</option>;
            })}
          </select>
        </label>
        <label>
          <p>Operator</p>
          <select
            name=""
            style={{ width: "90%", height: "35px", border: "1px solid grey" }}
            id="OperatorVod"
          >
            {Users.map((item) => {
              return <option value={item.id}>{item.surname}</option>;
            })}
          </select>
        </label>
      </Modal>
      <Modal
      title="Modal"
      visible={isModalOpen1}
      onOk={() => putZakaz()}
      onCancel={() => showModalClose1()}
    >
      <label>
        <p>Car</p>
        <select
          name=""
          id="CarVod1"
          style={{ width: "90%", height: "35px", border: "1px solid grey" }}
        >
          {mashina.map((item) => {
            return <option value={item.id}>{item.surname}</option>;
          })}
        </select>
      </label>
      <label>
        <p>Finishing</p>
        <select
          name=""
          style={{ width: "90%", height: "35px", border: "1px solid grey" }}
          id="OperatorFini"
        >
          <option value={false}>Не доставлен</option>
          <option value={true}>Доставленный</option>
        </select>
      </label>
    </Modal>
    </div>
  );
}
