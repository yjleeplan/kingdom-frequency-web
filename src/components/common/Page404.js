import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Page404 = () => {
  return (
    <>
      <div className='not-found-icon'>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </div>
      <span className='not-found-code'>
        404
      </span>
      <span className='not-found-message'>
        페이지를 찾을 수 없습니다.
      </span>
    </>
  );
};

export default Page404;