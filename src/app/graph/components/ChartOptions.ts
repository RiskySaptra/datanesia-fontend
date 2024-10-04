import { ApexOptions } from "apexcharts";

const chartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    id: "apexchart-example",
  },
  xaxis: {
    type: "datetime",
    tickAmount: 2,
  },
  yaxis: { opposite: true },
  legend: { horizontalAlign: "left" },
};

export default chartOptions;
