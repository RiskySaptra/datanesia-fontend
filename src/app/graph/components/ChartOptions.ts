import { ApexOptions } from "apexcharts";

const chartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    id: "apexchart",
  },
  xaxis: {
    type: "datetime",
    tickAmount: 2,
  },
  yaxis: {
    opposite: true,
    labels: {
      offsetX: -10,
      formatter: (val: string | number | number[], opts?: any) => {
        return val + "%";
      },
    },
  },

  dataLabels: {
    formatter: (val: string | number | number[], opts?: any) => {
      return val + "%";
    },
  },
  tooltip: {
    x: {
      format: "dd MMMM yyyy ",
    },
    y: {
      formatter: function (value: any) {
        return value + "%";
      },
    },
  },

  legend: { horizontalAlign: "left" },
};

export default chartOptions;
