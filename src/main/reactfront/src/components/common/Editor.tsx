// https://codepen.io/alexkrolick/pen/xgyOXQ/left?editors=0010#0
// https://github.com/zenoamaro/react-quill?tab=readme-ov-file
import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);

const StyledReactQuill = styled(ReactQuill)`
  .ql-editor {
    min-height: 500px;
    height: 100%;
  }
`;

interface EditorProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ placeholder, value, onChange }) => {
  const handleChange = (html: string) => {
    onChange(html);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
  ];

  return (
    <div>
      <StyledReactQuill
        theme="snow"
        onChange={handleChange}
        value={value}
        modules={modules}
        formats={formats}
        bounds={'.app'}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Editor;
