/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import url from "../../pages/host";
import axios from "axios";
import { useEffect, useState } from "react";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const [LineChart,setLineChart]=useState(lineChart)
  const [Loading,setLoading]=useState(true)

  useEffect(()=>{

    var diagrama=[]
    axios.get(`${url}/api/product`).then(res=>{
      for (let i = 0; i < 12; i++) {
        diagrama.push(0)
        for (let j = 0; j < res.data.length; j++) {
          if (res.data[j].time_create.slice(5,7)==`${i}`.padStart(2,'0')) {
            var a=res.data[j]?1:0
            diagrama[i]=diagrama[i]+a*1
          }
        }
      }
      var a=lineChart
      a.series[0].data=diagrama
      setLineChart(a)
    })

    var diagrama1=[]
    axios.get(`${url}/auth/users`).then(res=>{
      const Filter=res.data.filter(item=>item.position_id==3)
      for (let i = 0; i < 12; i++) {
        diagrama1.push(0)
        for (let j = 0; j < Filter.length; j++) {
          if (Filter[j].time_create.slice(5,7)==`${i}`.padStart(2,'0')) {
            var a=Filter[j]?1:0
            diagrama1[i]=diagrama1[i]+a*1
          }
        }
      }
      var a=lineChart
      setLoading(false)
      a.series[1].data=diagrama1
      setLineChart(a)
    })

  },[])

  return (
    <>
      <div style={{maxWidth:'100%'}}  className="linechart">
        <div>
          <Title level={5}>Products and orders</Title>
          <Paragraph className="lastweek">
            than month {/*<span className="bnb2">+30%</span>*/}
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div>
      </div>
      {!Loading?<div><ReactApexChart
        className="full-width"
        options={LineChart.options}
        series={LineChart.series}
        type="area"
        height={350}
        width={"100%"}
      /></div>:<div>Loading..</div>}
      
    </>
  );
}

export default LineChart;
