import { PureComponent } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { dataPieChart } from "../data";

export default class PieChartComponent extends PureComponent {
     render() {
          return (
               <PieChart width={400} height={400}>
                    <Pie
                         data={dataPieChart}
                         dataKey="percent"
                         nameKey="Độ tuổi"
                         cx="50%"
                         cy="50%"
                         outerRadius={150}
                         fill="#8884d8"
                         label
                    >
                         {dataPieChart.map((entry, index) => (
                              <Cell key={entry["Độ tuổi"]} fill={entry.color} />
                         ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
               </PieChart>
          );
     }
}
