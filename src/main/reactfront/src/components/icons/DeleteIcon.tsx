import React from 'react';

const DeleteIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    style={{
      fill: 'rgb(158, 171, 180)',
      cursor: 'pointer',
      width: '18px',
      height: '18px',
    }}
  >
    <path d="M436,60h-90V45c0-24.813-20.187-45-45-45h-90c-24.813,0-45,20.187-45,45v15H76c-24.813,0-45,20.187-45,45v30c0,8.284,6.716,15,15,15h16.183L88.57,470.945C90.703,494.406,109.97,512,133.396,512h245.207c23.427,0,42.693-17.594,44.815-40.926L449.817,150H466c8.284,0,15-6.716,15-15v-30C481,80.187,460.813,60,436,60z" />
    <path d="M256,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C271,186.716,264.284,180,256,180z" />
  </svg>
);

export default DeleteIcon;
