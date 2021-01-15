import React, { FC } from 'react';
import { Button } from 'antd';
import './index.less';

interface PropsType {
  type: '403' | '404' | '500';
  desc: string;
  img: string;
}

const Exception: FC<PropsType> = ({ type, desc, img }) => (
  <div className="ceu-comp-exception">
    <div className="exception-main">
      <div className="exception-img">
        <div
          className="img-ele"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
      <div className="exception-content">
        <h1>{type}</h1>
        <div className="exception-desc">{desc}</div>
        <div className="exception-action">
          <Button
            type="primary"
            onClick={() => {
              window.location.replace('/');
            }}
          >
            返回首页
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Exception;
