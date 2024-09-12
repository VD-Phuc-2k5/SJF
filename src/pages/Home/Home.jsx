import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { getProcessDetails1 } from "../../component/SJF/Sjf_preemptive";
import { getProcessDetails2 } from "../../component/SJF/Non_sjf_preemptive";
import { findWaitingTime1 } from "../../component/SJF/Sjf_preemptive";
import { findWaitingTime2 } from "../../component/SJF/Non_sjf_preemptive";
import findavgTime from "../../component/SJF/findavgTime";
import findThroughput from "../../component/SJF/findThroughput";
import ToastComponent from "../../component/Toast/Toast";
import Infos from "../../pages/Infos/Infos";
import GanttChart from "../Chart/Chart";
import "./Home.css";

function isStringNumber(input) {
  const trimmedInput = input.trim();
  return trimmedInput !== "" && !isNaN(trimmedInput);
}

export default function Home() {
  const [processId, setProcessId] = useState(1);
  const [dataTable, setDataTable] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [type, setType] = useState("preemptive");
  const [averageTurnaroundTime, setAverageTurnaroundTime] = useState(0);
  const [averageWaitingTime, setAverageWaitingTime] = useState(0);
  const [throughput, setThroughput] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);

  const handleClick = () => {
    const Process_ID = processId;
    const Arrival_Time = document.getElementById("Arrival_Time").value;
    const Burst_Time = document.getElementById("Burst_Time").value;

    if (
      !isStringNumber(Arrival_Time) ||
      !isStringNumber(Burst_Time) ||
      Number.parseFloat(Arrival_Time) < 0 ||
      Number.parseFloat(Burst_Time) < 0
    ) {
      setToastVisible(true);
      return;
    }

    const newData = [
      Process_ID,
      Number.parseFloat(Arrival_Time),
      Number.parseFloat(Burst_Time),
    ];
    const newDataTable = [...dataTable];
    newDataTable.splice(processId - 1, 0, newData);
    if (Process_ID <= 3) newDataTable.pop();
    setDataTable(newDataTable);
    setProcessId((prev) => prev + 1);
    document.getElementById("Arrival_Time").value = "";
    document.getElementById("Burst_Time").value = "";
  };

  const calculateHandle = () => {
    let datas = dataTable.filter(
      (data) => JSON.stringify(data) !== `["","",""]`
    );
    if (datas.length === 0) {
      setToastVisible(true);
      return;
    }

    // Chuyển đổi dữ liệu
    datas = datas.map((data) => data.map((item) => Number.parseFloat(item)));

    // Lưu dữ liệu
    localStorage.setItem("datas", JSON.stringify(datas));

    let process, wt;
    if (type === "preemptive") {
      process = getProcessDetails1(datas);
      const { waiting_time } = findWaitingTime1(datas);
      wt = waiting_time;
    } else {
      process = getProcessDetails2(datas);
      const { waiting_time } = findWaitingTime2(datas);
      wt = waiting_time;
    }

    const { avg_waiting_time, avg_turnAround_time } = findavgTime(datas, wt);
    setAverageTurnaroundTime(avg_turnAround_time);
    setAverageWaitingTime(avg_waiting_time);
    setThroughput(findThroughput(datas));
    localStorage.setItem("process", JSON.stringify(process));
  };

  return (
    <Row>
      <ToastComponent
        message={"Dữ liệu còn trống hoặc không phải là số!"}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
      <Col className='wrap-table'>
        <Row className='table'>
          <Row className='table_heading'>
            <Col>Process ID</Col>
            <Col>Arrival Time</Col>
            <Col>Burst Time</Col>
          </Row>
          {dataTable.map((data, rowIndex) => (
            <Row className='table_row' key={rowIndex}>
              {data.map((item, idx) => (
                <Col key={idx}>{item}</Col>
              ))}
            </Row>
          ))}
        </Row>
      </Col>
      <Col className='InputForm'>
        <Row className='addForm'>
          <Row>
            <Form.Group className='Process_ID' as={Col} lg={4}>
              <Form.Label htmlFor='Process_ID'>Process ID</Form.Label>
              <Form.Control id='Process_ID' value={processId} readOnly />
            </Form.Group>
            <Form.Group className='Arrival_Time' as={Col} lg={4}>
              <Form.Label htmlFor='Arrival_Time'>Arrival Time</Form.Label>
              <Form.Control id='Arrival_Time' placeholder='Arrival Time' />
            </Form.Group>
            <Form.Group className='Burst_Time' as={Col} lg={4}>
              <Form.Label htmlFor='Burst_Time'>Burst Time</Form.Label>
              <Form.Control id='Burst_Time' placeholder='Burst Time' />
            </Form.Group>
          </Row>
          <Button type='button' className='add-btn' onClick={handleClick}>
            Add Process
          </Button>
        </Row>
        <Col className='activeForm'>
          <Col>
            <p>Select Scheduling Method</p>
            <Form.Select
              aria-label='Default select example'
              onChange={(e) => setType(e.target.value)}>
              <option value='preemptive'>Preemptive</option>
              <option value='non-preemptive'>Non-preemptive</option>
            </Form.Select>
          </Col>
          <Button
            type='button'
            className='calculate-btn'
            onClick={calculateHandle}>
            Calculate
          </Button>
        </Col>
        <Col className='resultForm'>
          <Row>
            <Form.Group className='Average_Turnaround_Time' as={Col} lg={4}>
              <Form.Label htmlFor='Average_Turnaround_Time'>
                Average Turnaround Time
              </Form.Label>
              <Form.Control
                id='Average_Turnaround_Time'
                value={averageTurnaroundTime}
                readOnly
              />
            </Form.Group>
            <Form.Group className='Average_Waiting_Time' as={Col} lg={4}>
              <Form.Label htmlFor='Average_Waiting_Time'>
                Average Waiting Time
              </Form.Label>
              <Form.Control
                id='Average_Waiting_Time'
                value={averageWaitingTime}
                readOnly
              />
            </Form.Group>
            <Form.Group className='Throughput' as={Col} lg={4}>
              <Form.Label htmlFor='Throughput'>Throughput</Form.Label>
              <Form.Control id='Throughput' value={throughput} readOnly />
            </Form.Group>
          </Row>
        </Col>
      </Col>
      <Infos />
      <GanttChart />
    </Row>
  );
}
