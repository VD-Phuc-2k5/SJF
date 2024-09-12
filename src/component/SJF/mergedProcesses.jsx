export default function mergeProcesses(processSchedule) {
  const mergedProcesses = [];
  let mergeCount = 1;

  mergedProcesses.push(processSchedule[0]);
  for (let i = 1; i < processSchedule.length; i++) {
    const id = mergedProcesses[mergedProcesses.length - 1].process_id;
    if (processSchedule[i].process_id === id) {
      mergeCount++;
    } else {
      mergedProcesses.push({
        process_id: processSchedule[i].process_id,
        start_time: mergeCount,
      });
      mergeCount = 1;
    }
  }

  return mergedProcesses;
}
