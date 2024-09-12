export default function findThroughput(datas) {
  const total_burst_time = datas.reduce((total, data) => total + data[2], 0); // Tổng thời gian xử lý
  return datas.length / total_burst_time; // Thông lượng = số tiến trình / tổng thời gian xử lý
}
