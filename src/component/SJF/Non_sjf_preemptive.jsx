import findTurnAroundTime from "./findTurnAroundTime";

export function findWaitingTime2(datas) {
  const waiting_time = Array(datas.length).fill(0);
  const completion_time = Array(datas.length).fill(0);
  const running_process_ids = []; // Mảng để lưu ID của tiến trình đang chạy
  let remaining_time = datas.map((data) => data[2]); // Thời gian xử lý
  let complete = 0;
  let t = 0;

  while (complete < datas.length) {
    let min_index = -1;
    let min_burst_time = Number.MAX_VALUE;

    // Tìm tiến trình sẵn sàng với thời gian xử lý ngắn nhất
    for (let j = 0; j < datas.length; j++) {
      if (
        datas[j][1] <= t && // Thời gian đến
        remaining_time[j] > 0 && // Tiến trình chưa hoàn thành
        remaining_time[j] < min_burst_time // Tìm tiến trình ngắn nhất
      ) {
        min_burst_time = remaining_time[j];
        min_index = j;
      }
    }

    if (min_index === -1) {
      // Nếu không có tiến trình nào sẵn sàng, tăng thời gian
      t++;
      // Nếu không có tiến trình chạy, có thể thêm null vào mảng
      running_process_ids.push(null);
      continue;
    }

    // Cập nhật ID của tiến trình đang chạy
    running_process_ids.push(datas[min_index][0]);

    // Thực hiện tiến trình
    t += remaining_time[min_index]; // Cập nhật thời gian hoàn thành
    completion_time[min_index] = t; // Ghi lại thời gian hoàn thành

    // Tính toán thời gian chờ
    waiting_time[min_index] =
      completion_time[min_index] - datas[min_index][1] - datas[min_index][2];
    if (waiting_time[min_index] < 0) waiting_time[min_index] = 0; // Đảm bảo không âm

    remaining_time[min_index] = 0; // Đánh dấu tiến trình đã hoàn thành
    complete++; // Tăng số tiến trình đã hoàn thành
  }

  return { waiting_time, completion_time, running_process_ids };
}

export function getProcessDetails2(datas) {
  let { waiting_time, completion_time, running_process_ids } =
    findWaitingTime2(datas);
  const turn_around_time = findTurnAroundTime(datas, waiting_time);
  const arrival_time = datas.map((data) => data[1]);
  const p = [...completion_time].sort((a, b) => a - b);
  p.unshift(Math.min(...arrival_time));
  p.pop();
  const q = [...p];
  for (let i = 1; i < p.length; i++) p[i] = p[i] - q[i - 1];

  const process_schedule = p.map((item, idx) => ({
    process_id: running_process_ids[idx],
    start_time: item,
  }));

  console.log(waiting_time);
  console.log(process_schedule);

  localStorage.setItem("processSchedule", JSON.stringify(process_schedule));

  return datas.map((data, index) => ({
    id: data[0],
    arrival_time: data[1],
    burst_time: data[2],
    waiting_time: waiting_time[index],
    turnaround_time: turn_around_time[index],
    completion_time: completion_time[index],
  }));
}
