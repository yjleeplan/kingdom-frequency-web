import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const PagePC = () => {
  return (
    <>
      <div className='on-pc-icon'>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </div>
      <span className='on-pc-status-code'>
        403
      </span>
      <span className='on-pc-status-message'>
        모바일 전용웹 입니다. 모바일로 접속 해주세요.
      </span>
    </>
  );
};

export default PagePC;