import React, { useState, useEffect } from 'react';
import { Question } from '../../types/Question';
import {
  Container,
  TableData,
  TableRow,
} from '../genericTable/GenericTable.styles';
import GenericTable from '../genericTable/GenericTable';

interface QuestionBoardProps {
  questions: Question[];
}

const QuestionBoard: React.FC<QuestionBoardProps> = ({ questions }) => {
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [expandedIds, setExpandedIds] = useState<{ [key: string]: boolean }>(
    {},
  );

  // 부모 컴포넌트로부터 받은 questions가 변경될 때마다 filteredQuestions를 업데이트
  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]); // questions가 변경될 때마다 이 effect가 실행

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id], // 현재 ID의 확장 상태를 토글
    }));
  };

  const columns = [
    { id: 'answer', label: '답변상태', width: 40 },
    { id: 'question', label: '문의내용', width: 290 },
    { id: 'nickname', label: '닉네임', width: 40 },
    { id: 'date', label: '작성일', width: 80 },
  ];
  return (
    <Container
      style={{
        marginLeft: '0px',
        marginTop: '10px',
        height: '700px',
        width: '880px',
      }}
    >
      <GenericTable
        columns={columns}
        data={filteredQuestions}
        renderRow={(questions: Question) => {
          const isExpanded = expandedIds[questions.id] || false;
          const displayContent =
            isExpanded || questions.content.length <= 44
              ? questions.content
              : `${questions.content.substring(0, 44)}...`;
          return (
            <TableRow
              key={questions.id}
              onClick={() => toggleExpand(questions.id)}
            >
              <TableData>{questions.answer ? '답변완료' : '미답변'}</TableData>
              <TableData
                style={{
                  minWidth: '200px',
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textAlign: 'left',
                }}
              >
                {displayContent}
              </TableData>
              <TableData>{questions.nickname}</TableData>
              <TableData>{questions.date}</TableData>
            </TableRow>
          );
        }}
        includeCheckboxes={false}
      />
    </Container>
  );
};

export default QuestionBoard;
