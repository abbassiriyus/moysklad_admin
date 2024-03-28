
import React, { Component } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import axios from "axios";
import url from "./host";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const {  Content } = Layout;


export default class SignIn extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

function loginIn() {
  var data =new FormData()
  data.append("phone",document.querySelector("#email").value)
  data.append("password",document.querySelector("#parol").value)
  axios.post(`${url}/api/login`,data).then(res=>{
    sessionStorage.setItem('token',res.data.access)
   setTimeout(() => {
    window.location.reload()
   }, 1000);
  }).catch(err=>{
    alert("xato")
  })
}
    return (
      <>
        <Layout className="layout-default layout-signin" style={{minHeight:'100vh',display:'flex',alignItems:'center',width:'100%'}}>
          
          <Content className="signin" style={{width:'100%'}}>
            <Row style={{alignItems:'center',flexWrap:'wrap'}} gutter={[24, 0]} justify="space-around">
              <Col
                style={{width:'500px',flex:'100%',maxWidth: '500px',marginInlineStart:'0px'}}
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your email and password to sign in
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Phone"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone!",
                      },
                    ]}
                  >
                    <input style={{width:'100%'}} placeholder="phone" id-="email" />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <input style={{width:'100%'}} placeholder="Password" id="parol" />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item>

                  <Form.Item>
                    <Button
                    onClick={()=>loginIn()}
                      type="primary"  
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12,flex:'100%' ,maxWidth: '30%'}}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} style={{maxWidth: '100%'}} alt="" />
              </Col>
            </Row>
          </Content>
       
        </Layout>
      </>
    );
  }
}
