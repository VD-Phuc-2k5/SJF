import findTurnAroundTime from "./findTurnAroundTime";
import mergeProcesses from "./mergedProcesses";

export function findWaitingTime1(datas) {
  const waiting_time = [];
  const completion_time = [];
  const process_schedule = []; // Mảng để lưu thông tin tiến trình
  let remaining_time = datas.map((data) => data[2]);
  let complete = 0,
    t = 0,
    min = Number.MAX_VALUE;
  let shortest = 0,
    finish_time;
  let check = false;

  while (complete !== datas.length) {
    for (let j = 0; j < datas.length; j++) {
      if (
        datas[j][1] <= t &&
        remaining_time[j] < min &&
        remaining_time[j] > 0
      ) {
        min = remaining_time[j];
        shortest = j;
        check = true;
      }
    }

    if (!check) {
      t++;
      continue;
    }

    // Lưu thông tin về tiến trình
    const start_time = t;
    process_schedule.push({
      process_id: datas[shortest][0], // ID của tiến trình
      start_time: start_time,
    });

    remaining_time[shortest]--;

    min = remaining_time[shortest];
    if (min === 0) min = Number.MAX_VALUE;

    if (remaining_time[shortest] === 0) {
      complete++;
      check = false;

      finish_time = t + 1;
      completion_time[shortest] = finish_time;

      waiting_time[shortest] =
        finish_time - datas[shortest][2] - datas[shortest][1];

      if (waiting_time[shortest] < 0) waiting_time[shortest] = 0;
    }

    t++;
  }

  return { waiting_time, completion_time, process_schedule };
}

export function getProcessDetails1(datas) {
  let { waiting_time, completion_time, process_schedule } =
    findWaitingTime1(datas);
  const turn_around_time = findTurnAroundTime(datas, waiting_time);
  process_schedule = mergeProcesses(process_schedule);
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
