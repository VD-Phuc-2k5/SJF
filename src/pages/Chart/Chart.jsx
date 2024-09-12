import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js/auto";
import { Row } from "react-bootstrap";
import "./Chart.css";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins
);

const GanttChart = () => {
  const processSchedule = JSON.parse(localStorage.getItem("processSchedule"));
  const datas = JSON.parse(localStorage.getItem("datas"));

  // Kiểm tra dữ liệu
  if (!processSchedule || !datas) {
    return (
      <div className='No_info'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-emoji-frown no-info-icon'
          viewBox='0 0 16 16'>
          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
          <path d='M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5' />
        </svg>
      </div>
    );
  }

  let completed_time = 0;
  for (let i = 0; i < datas.length; i++) completed_time += datas[i][2];

  // Tạo dữ liệu cho biểu đồ
  const data = processSchedule.map((item, index) => {
    let start_time = 0;
    for (let i = 0; i <= index; i++)
      start_time += processSchedule[i].start_time;
    const end_time =
      index < processSchedule.length - 1
        ? processSchedule[index + 1].start_time + start_time
        : completed_time;

    return {
      x: `P${item.process_id}`,
      y: [start_time, end_time],
    };
  });

  const chartData = {
    labels: data.map((item) => item.x),
    datasets: [
      {
        label: "Process Duration",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình biểu đồ
  const options = {
    scales: {
      x: { stacked: true },
      y: {
        label: {
          display: true,
          text: "Time",
        },
        stacked: true,
        type: "linear",
        min: 0,
        ticks: {
          display: true,
          callback: (value) => {
            return value;
          },
        },
      },
    },
  };

  return (
    <Row className='Chart-wrap'>
      <Bar data={chartData} options={options} />
    </Row>
  );
};

export default GanttChart;
