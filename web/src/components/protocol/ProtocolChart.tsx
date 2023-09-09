import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer
} from "recharts";

const ProtocolChart: any = (props: any) => {
  const { firstchart, secondchart, thirdchart, fourthchart, totalVal } = props
  const totalValueforPercentage = firstchart + secondchart + thirdchart + fourthchart;
  const green = firstchart / totalValueforPercentage;
  const red = secondchart / totalValueforPercentage;
  const yellow = thirdchart / totalValueforPercentage;
  const gray = fourthchart / totalValueforPercentage
  const dataPie = [
    { name: "Group A", value: red },
    { name: "Group B", value: green },
    { name: "Group C", value: gray },
    { name: "Group D", value: yellow }
  ];

  const dataArea = [
    {
      name: "Page A",
      uv: 2000,
      pv: 1400,
      amt: 1400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: "Page H",
      uv: 1490,
      pv: 4300,
      amt: 2100
    }
  ];

  const COLORS = ["#DA4A54", "#61B373", "#C2C3D0", "#FFAF10"];

  return (
    <div className="protocol-chart">
      <div className="protocol-chart-area" style={{ height: "300px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dataPie}
              innerRadius={60}
              outerRadius={90}
              dataKey="value"

            >
              {dataPie.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div
        className="protocol-chart-area"
        style={{ height: "200px", marginTop: "20px" }}
      >
        <ResponsiveContainer>
          <AreaChart data={dataArea}>
            <Area type="natural" dataKey="uv" stroke="#efefef" fill="#DA4A54" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProtocolChart;
