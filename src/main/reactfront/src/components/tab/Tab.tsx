import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import ProductDescription from './ProductDescription';
import productImage from '../../assets/img/image011.png';
import ReviewCombine from './ReviewCombine';
import QuestionModal from './QuestionModal';
import { questions as initialQuestions, Question } from '../../types/Question';
import QuestionBoard from './QuestionBoard';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ width: '100%', overflow: 'auto' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: '100%', overflowX: 'auto' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function A11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const handleSave = (newQuestion: Question) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ '.MuiTab-root': { fontSize: '1.1rem', fontWeight: 'bold' } }}
        >
          <Tab label="상품 설명" {...A11yProps(0)} />
          <Tab label="리뷰" {...A11yProps(1)} />
          <Tab label="상품 문의" {...A11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProductDescription src={productImage} alt="상품설명" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ReviewCombine />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <QuestionModal onSave={handleSave} />
        <QuestionBoard questions={questions} />
      </CustomTabPanel>
    </Box>
  );
}
