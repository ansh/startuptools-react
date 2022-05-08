import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DATA = [
  {
    name: "Year 0",
    start: 4000,
    end: 2400,
  },
  {
    name: "Year 1",
    start: 4000,
    end: 4300,
  },
];

export default function App() {
  const [point1, setPoint1] = useState(DATA[0]);
  const [point2, setPoint2] = useState(DATA[1]);
  const [rate, setRate] = useState((((point2.end - point1.end) / point1.end) * 100).toFixed(0));
  const [data, setData] = useState(DATA);

  useEffect(() => {
    setData([point1, point2]);
  }, [point1, point2]);

  useEffect(() => {
    const end = point1.end * (rate / 100 + 1); // calculating point2.end
    setPoint2((previousValue) => {
      return { ...previousValue, end: end };
    });
  }, [point1, rate]);

  return (
    <div>
      <h1>Startup growth calculator</h1>

      <label>Initial position for Revenue</label>
      <input
        type="number"
        value={point1.end}
        onChange={(event) => {
          const value = event.target.value;
          console.log(value);
          setPoint1((previousValue) => {
            return { ...previousValue, end: value };
          });
        }}
      />

      <label>Total fixed costs</label>
      <input
        type="number"
        value={point1.start}
        onChange={(event) => {
          const value = event.target.value;
          console.log(value);
          setPoint1((previousValue) => {
            return { ...previousValue, start: value };
          });
          setPoint2((previousValue) => {
            return { ...previousValue, start: value };
          });
        }}
      />

      <label>Growth Rate</label>
      <input
        type="number"
        value={rate}
        onChange={(event) => {
          const growthRate = event.target.value;
          setRate(growthRate);
        }}
      />

      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="start" stroke="red" />
        <Line type="monotone" dataKey="end" stroke="green" />
      </LineChart>
    </div>
  );
}
