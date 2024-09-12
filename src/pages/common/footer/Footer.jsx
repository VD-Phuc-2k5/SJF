import { Nav } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  const svgImgs = [
    <svg
      key={1}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='bi bi-house-door-fill'
      viewBox='0 0 16 16'>
      <path d='M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5' />
    </svg>,
    <svg
      key={2}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='bi bi-bar-chart-fill'
      viewBox='0 0 16 16'>
      <path d='M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z' />
    </svg>,
    <svg
      key={3}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='bi bi-clipboard2-data-fill'
      viewBox='0 0 16 16'>
      <path d='M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5' />
      <path d='M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1' />
    </svg>,
  ];

  const footerTitle = ["Home", "Chart", "Infos"];
  const path = ["/", "chart", "infos"];

  let [activeIdx, setActiveIdx] = useState(0);

  return (
    <footer>
      <Nav fill variant='tabs' defaultActiveKey='/home'>
        {svgImgs.map((svgImg, idx) => (
          <Nav.Item key={idx} onClick={() => setActiveIdx(idx)}>
            <Link
              to={path[idx]}
              className={activeIdx == idx ? "nav-link active" : "nav-link"}>
              {svgImg}
              <p>{footerTitle[idx]}</p>
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </footer>
  );
}
