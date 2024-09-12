export default function findTurnAroundTime(datas, waiting_time) {
  const turn_around_time = [];
  console.log(waiting_time);
  for (let i = 0; i < datas.length; i++) {
    turn_around_time[i] = waiting_time[i] + datas[i][2]; // TAT = WT + BT
  }
  return turn_around_time;
}
