import React, { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import axios from 'axios';

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
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (html: string) => {
    onChange(html);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await axios.post('/api/routine/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const imageUrl = response.data;
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection();
          quill?.insertEmbed(range?.index || 0, 'image', imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
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
        ref={quillRef}
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
