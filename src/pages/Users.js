import {
  Row,
  Col,
  Card,
  Radio,

  Table,
  Button,
  Avatar,
  Typography,
  Input,
  Modal,
  Image,

} from "antd";

import axios from "axios";
import { useEffect, useState } from "react";

import url from "./host.js";
import "./user.css";





function newUser() {
  document.querySelector('#modalMaybe').style="background-color:blue"
}
function Tables() {

  var [data,setData]=useState([])
  var [userModal,setUserModal] =useState(false)
  var [userId,setUserId]=useState()


  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "12%",
  },
  {
    title: "image",
    dataIndex: "image",
    render: (_,item)=><Image src={item.image} style={{width:'40px',height:'40px'}} />,
    width: "12%",
  },
  {
    title: "name",
    dataIndex: "name",
    width: "12%",
  },
  {
    title: "address",
    dataIndex: "address",
    width: "12%",
  },
   {
    title: "city",
    dataIndex: "city",
    width: "12%",
  },
  {
    title: "country",
    dataIndex: "country",
    width: "12%",
  },
  
  {
    title: "username",
    key: "username",
    dataIndex: "username",
    width: "12%",
  },
  {
    title: "phone",
    key: "phone",
    dataIndex: "phone",
    width: "12%",
  },
  {
    title: "email",
    key: "email",
    dataIndex: "email",
    width: "12%",
  },
  {
    title: "password",
    key: "password",
    dataIndex: "password",
    width: "12%",
  },
  {
    title: "delete",
    key: "delete",
    render: (_,item)=><Radio.Button onClick={()=>{DeleteData(item.id)}} >delete</Radio.Button>,
    width: "12%",
  },
  {
    title: "edit",
    key: "edit",
    render: (_,item)=><Radio.Button onClick={()=>{UserEditOpen(item)}}>edit</Radio.Button>,
    width: "10%",
  },

]; 

function UserEditOpen(item){
setUserModal(true)
setUserId(item.id)
setTimeout(() => {
document.querySelector("#name1").value=item.name
document.querySelector("#lastname1").value=item.lastname
document.querySelector("#username1").value=item.username
document.querySelector("#phone1").value=item.phone
document.querySelector("#email1").value=item.email
document.querySelector("#about_me1").value=item.about_me
document.querySelector("#address1").value=item.address
document.querySelector("#country1").value=item.country
document.querySelector("#city1").value=item.city
document.querySelector("#password1").value=item.password
}, 1000);
}

function putUser(){
  var data=new FormData()
  data.append("name",document.querySelector("#name1").value)
  data.append("lastname",document.querySelector("#lastname1").value)
  data.append("username",document.querySelector("#username1").value)
  data.append("phone",document.querySelector("#phone1").value)
  data.append("email",document.querySelector("#email1").value)
  data.append("about_me",document.querySelector("#about_me1").value)
  data.append("address",document.querySelector("#address1").value)
  data.append("skitka",document.querySelector("#country1").value)
  data.append("city",document.querySelector("#city1").value)
  data.append("password",document.querySelector("#password1").value)
axios.put(`${url}/api/users/${userId}`,data).then(res=>{
alert("Сохранено в нашей базе данных")
setUserModal(false)
axios.get(`${url}/api/users`).then(res=>{
  setData(res.data)
  console.log(res.data);
})
})
.catch(err=>{
  alert("Недостаточно информации")
})
}


function DeleteData(key){
  axios.delete(`${url}/api/users/${key}`).then(res=>{
    alert("Удалено")
    axios.get(`${url}/api/users`).then(res1=>{
      setData(res1.data)
    })
  
  }).catch(err=>{
    alert("Не удалось удалить")
  })
}
function postData() {
  var data=new FormData()
  data.append("name",document.querySelector("#name").value)
  data.append("lastname",document.querySelector("#lastname").value)
  data.append("username",document.querySelector("#username").value)
  data.append("phone",document.querySelector("#phone").value)
  data.append("email",document.querySelector("#email").value)
  data.append("about_me",document.querySelector("#about_me").value)

  data.append("password",document.querySelector("#password").value)
axios.post(`${url}/api/users`,data).then(res=>{
alert("Сохранено в нашей базе данных")
axios.get(`${url}/api/users`).then(res=>{
  setData(res.data)
})
})
.catch(err=>{
  alert("Недостаточно информации")
})

}

function all1(id) {
  axios.get(`${url}/api/users`).then(res=>{
    if(id==0){
    setData(res.data)
    }else{
  var pover=[]
  var user=[]
axios.get(`${url}/api/user_povar`).then(res2=>{

for (let i = 0; i < res.data.length; i++) {
var userb=true
for (let j = 0;j<res2.data.length; j++) {
if(res.data[i].id===res2.data[j].user_id){
userb=false
}
}
if(userb){
user.push(res.data[i])
}else{
pover.push(res.data[i])
}
} 
if(id==1){
setData(pover)
  }
  if(id==2){
setData(user)
  }
})
 
    }
  })
}

useEffect(()=>{
  axios.get(`${url}/api/users`).then(res=>{
    setData(res.data)
  })
},[])

  return (
    <div>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="All users"
              extra={
                <div>
                  <Radio.Group onChange={onChange} defaultValue="a">

                     <Radio.Button onClick={()=>all1(0)} value="a1">Все</Radio.Button> 
                     <Radio.Button onClick={()=>all1(1)} value="a2">Шеф-повар</Radio.Button> 
                     <Radio.Button onClick={()=>all1(2)} value="a3">Пользователь</Radio.Button> 
                    <Radio.Button onClick={()=>{document.querySelector("#modalMaybe").style="display:flex"}} value="b">create</Radio.Button>

                  </Radio.Group>
                </div>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>


        <div id="modalMaybe" className="Modal">
        <div className="modalMaybe" style={{position:'relative'}}  >
          <div className="twoOneModal">
            <div className="one">
          <br /><label htmlFor="name">name</label><br />
          <input type="text" placeholder="name" id="name"/>
          <br /><label htmlFor="lastname">lastname</label><br />
          <input type="text" placeholder="lastname" id="lastname"/>
          <br /><label htmlFor="username">Username</label><br />
          <input type="text" placeholder="username" id="username"/>
          <br /><label htmlFor="phone">Phone</label><br />
          <input type="text" placeholder="phone" id="phone"/>
         
          <br /><label htmlFor="email">Email</label><br />
          <input type="text" placeholder="email" id="email"/>
         
            <br /><label htmlFor="address">address</label><br />
          <input type="text" placeholder="address" id="address"/>
          <br /><label htmlFor="about_me">about_me</label><br />
          <input type="text" placeholder="about_me" id="about_me"/>
        
          <br /><label htmlFor="password">Password</label><br />
          <input type="text" placeholder="password" id="password"/>
          </div>
          <Button className="buttonExit" onClick={()=>{;document.querySelector("#modalMaybe").style="display:none"}}  >x</Button>
          </div><br />
          <div className="buttonsSend">
<Button className="buttonSend" type="primary" onClick={()=>{postData();newUser()}}>Create</Button>

    </div>
        </div>
        </div>
     
      </div>
      <Modal title="User" visible={userModal} onOk={()=>putUser()} onCancel={()=>setUserModal(false)}>
      <div className="one">
      <br /><label htmlFor="name1">name</label><br />
      <input type="text" placeholder="name" id="name1"/>
      <br /><label htmlFor="lastname1">lastname</label><br />
      <input type="text" placeholder="lastname" id="lastname1"/>
      <br /><label htmlFor="username1">Username</label><br />
      <input type="text" placeholder="username" id="username1"/>
      <br /><label htmlFor="phone1">Phone</label><br />
      <input type="text" placeholder="phone" id="phone1"/>
     
      <br /><label htmlFor="email1">Email</label><br />
      <input type="text" placeholder="email" id="email1"/>
    
    
      <br /><label htmlFor="address1">address</label><br />
      <input type="text" placeholder="address" id="address1"/>
      <br /><label htmlFor="city1">city</label><br />
      <input type="text" placeholder="city" id="city1"/>
      <br /><label htmlFor="country1">country</label><br />
      <input type="text" placeholder="country" id="country1"/>
      <br /><label htmlFor="about_me1">about_me</label><br />
      <textarea style={{width:'90%',border:'1px solid grey',paddingTop:'10px',paddingBottom:'10px'}} type="text" placeholder="about_me" id="about_me1"/>
      <br /><label htmlFor="password1">Password</label><br />
      <input type="text" placeholder="password" id="password1"/>
      </div>
      </Modal>
    </div>
  );
}

export default Tables;
