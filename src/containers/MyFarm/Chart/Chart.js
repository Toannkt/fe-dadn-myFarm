/** @format */

import React, { Component } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";

// const data = [
//       {
//             time: "1",
//             uv: 8000.2,
//             // amt: 2400,
//       },
//       {
//             time: "2",
//             uv: 3000,
//             // amt: 2210,
//       },
//       {
//             time: "3",
//             uv: 2000,
//             // amt: 2290,
//       },
//       {
//             time: "4",
//             uv: 2780,
//             // amt: 2000,
//       },
//       {
//             time: "5",
//             uv: 18990,
//       },
//       {
//             time: "5",
//             uv: 2390,
//       },
//       {
//             time: "6",
//             uv: 3490,
//       },
//       {
//             time: "7",
//             uv: 3490,
//       },
//       {
//             time: "8",
//             uv: 3490,
//       },
//       {
//             time: "9",
//             uv: 3490,
//       },
//       {
//             time: "10",
//             uv: 3490,
//       },
// ];

export default class Example extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }

      render() {
            let dataArr = this.props.data;
            let value = [];
            let valueTime = [];
            for (let i = 0; i < dataArr.length; i++) {
                  value[i] = parseFloat(dataArr[i].value);
            }
            console.log("value[]: ", value);
            let root = moment(dataArr[dataArr.length - 1].updatedAt).format("YYYY-MM-DD hh:mm:ss");
            let timeRoot = new Date(root);
            let valueTimeRoot = timeRoot.getTime();
            for (let i = 0; i < dataArr.length; i++) {
                  let a = moment(dataArr[i].updatedAt).format("YYYY-MM-DD hh:mm:ss");
                  let b = new Date(a);
                  let c = b.getTime();
                  valueTime[dataArr.length - i - 1] = (valueTimeRoot - c) / 1000;
            }
            console.log("valueTime[]: ", valueTime);
            let data = [];
            for (let i = 0; i < dataArr.length; i++) {
                  data[i] = { uv: value[i], time: valueTime[i] };
            }
            console.log("data: ", data);
            return (
                  <div className='dashboard-history' style={{ height: "200px" }}>
                        <ResponsiveContainer width='100%' height='100%'>
                              <AreaChart
                                    width={500}
                                    height={400}
                                    data={data}
                                    margin={{
                                          top: 10,
                                          right: 30,
                                          left: 0,
                                          bottom: 0,
                                    }}
                              >
                                    <CartesianGrid strokeDasharray='3 3' />
                                    <XAxis dataKey='time' />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                              </AreaChart>
                        </ResponsiveContainer>
                  </div>
            );
      }
}
