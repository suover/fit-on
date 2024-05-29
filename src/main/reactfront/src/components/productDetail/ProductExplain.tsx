import React, { useState } from 'react';
import styled from 'styled-components';
// import BasicTabs from '../tab/Tab';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import ProductDescription from '../tab/ProductDescription';
import productImage from '../../assets/img/image011.png';
import ReviewCombine from '../tab/ReviewCombine';
import QuestionModal from '../tab/QuestionModal';
import { questions as initialQuestions, Question } from '../../types/Question';
import QuestionBoard from '../tab/QuestionBoard';
import Editor from '../common/Editor';
import { Product } from '../../types/DataInterface';
interface ProductExplainProps {
  product: Product;
}
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`;
//하단 상품 상세 Tab 부분
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

// const ProductExplain = () => {
const ProductExplain: React.FC<ProductExplainProps> = ({ product }) => {
  const [value, setValue] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const handleSave = (newQuestion: Question) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const ProductDetail = () => {
  //   return <Box dangerouslySetInnerHTML={{ __html: product.content }} />;
  // };

  // 리뷰 및 상품 질문에서 productId 를 받아서 관련된 내용들 불러오게하기
  return (
    <div>
      <TabContainer>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                '.MuiTab-root': { fontSize: '1.1rem', fontWeight: 'bold' },
              }}
            >
              <Tab label="상품 설명" {...A11yProps(0)} />
              <Tab label="리뷰" {...A11yProps(1)} />
              <Tab label="상품 문의" {...A11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box dangerouslySetInnerHTML={{ __html: product.content }}>
              {/* <ProductDetail /> */}
            </Box>
            <ProductDescription src={product.imageUrl} alt="상품설명" />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ReviewCombine />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <QuestionModal onSave={handleSave} />
            <QuestionBoard questions={questions} />
          </CustomTabPanel>
        </Box>
      </TabContainer>
    </div>
  );
};

export default ProductExplain;
