import "./Info.css";
import { Row, Col } from "react-bootstrap";

export default function Infos() {
  const data = JSON.parse(localStorage.getItem("process"));
  if (!data) {
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
  let infos = data.map((p) => [
    p.id,
    p.arrival_time,
    p.burst_time,
    p.completion_time,
    p.waiting_time,
    p.turnaround_time,
  ]);

  return (
    <Row className='table'>
      <Row className='table_heading'>
        <Col lg={2}>Process ID</Col>
        <Col lg={2}>Arrival Time</Col>
        <Col lg={2}>Burst Time</Col>
        <Col lg={2}>Completed Time</Col>
        <Col lg={2}>Waiting Time</Col>
        <Col lg={2}>Turnaround Time</Col>
      </Row>
      {infos.map((info, idx) => (
        <Row className='table_content' key={idx}>
          {info.map((item, jdx) => (
            <Col lg={2} key={jdx}>
              {item}
            </Col>
          ))}
        </Row>
      ))}
    </Row>
  );
}
