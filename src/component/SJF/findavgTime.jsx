import findTurnAroundTime from "./findTurnAroundTime";

export default function findavgTime(datas, waiting_time) {
  const turn_around_time = findTurnAroundTime(datas, waiting_time);

  console.log(datas.length);
  console.log(turn_around_time);

  let total_waiting = 0;
  let total_turnAroundTime = 0;

  for (let i = 0; i < datas.length; i++) {
    total_waiting += waiting_time[i];
    total_turnAroundTime += turn_around_time[i];
  }

  return {
    avg_waiting_time: total_waiting / datas.length,
    avg_turnAround_time: total_turnAroundTime / datas.length,
  };
}
