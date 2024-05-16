import * as React from 'react';

import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SearchBox from '../common/search/SearchBox';
import GenericTable from '../genericTable/GenericTable';
import {
  TableData,
  Table,
  TableHead,
  TableRow,
} from '../genericTable/GenericTable.styles';
import ButtonNewPost from '../common/button/ButtonNewPost';

interface BoardProps {
  selectedCategory: string | number | null;
}

const Board: React.FC<BoardProps> = ({ selectedCategory }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 게시글 필터링 로직 (검색 + 카테고리)
  const filteredPosts = React.useMemo(() => {
    let filtered = examplePosts;

    // 카테고리 필터링
    if (selectedCategory === '베스트') {
      // 베스트 카테고리일 경우 특별한 정렬 로직 적용
      filtered = filtered
        .filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => {
          // 1순위: 좋아요 수가 많은 순서
          if (b.like !== a.like) {
            return b.like - a.like;
          }
          // 2순위: 좋아요/조회수 비율이 높은 순서 (조회수가 0이면 분모를 1로 처리하여 오류 방지)
          const ratioA = a.like / (a.view || 1);
          const ratioB = b.like / (b.view || 1);
          if (ratioB !== ratioA) {
            return ratioB - ratioA;
          }
          // 3순위: 최신 게시글 순서 (나중에 작성된 글이 먼저 온다)
          return b.created_at.getTime() - a.created_at.getTime();
        });
    } else if (selectedCategory) {
      // 다른 카테고리 선택 시 그 카테고리에 해당하는 게시글만 필터
      filtered = filtered.filter(
        (post) =>
          post.category === selectedCategory &&
          post.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      // 카테고리가 선택되지 않았을 때는 검색어만으로 필터링
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  const handleRowClick = (id: string, isSelected: boolean) => {
    const post = examplePosts.find((p) => p.id === id);
    if (post) navigate(`/post/${post.no}`, { state: { post } });
  };
  const columns = [
    { id: 'title', label: 'Title', width: 200 },
    { id: 'category', label: 'Category', width: 50 },
    { id: 'author', label: 'Author', width: 40 },
    { id: 'like', label: 'Likes', width: 30 },
    { id: 'view', label: 'Views', width: 30 },
  ];

  const renderRow = (
    post: Post,
    isSelected: boolean,
    onSelect: (userId: string, isSelected: boolean) => void,
  ) => (
    <TableRow key={post.no} onClick={() => onSelect(post.id, isSelected)}>
      <TableData
        style={{
          paddingLeft: '20px',
          paddingRight: '20px',
          textAlign: 'left',
          width: 200,
        }}
      >
        {post.title}
      </TableData>
      <TableData style={{ textAlign: 'center', width: 50 }}>
        {post.category}
      </TableData>
      <TableData style={{ textAlign: 'center', width: 40 }}>
        {post.id}
      </TableData>
      <TableData style={{ textAlign: 'center', width: 30 }}>
        {post.like}
      </TableData>
      <TableData style={{ textAlign: 'center', width: 30 }}>
        {post.view}
      </TableData>
    </TableRow>
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
        <Box sx={{}}>
          <ButtonNewPost />
        </Box>
        <Box sx={{ width: '40%' }}>
          <SearchBox onSearch={setSearchTerm} />
        </Box>
      </Box>
      <GenericTable<Post>
        data={examplePosts}
        columns={columns}
        rowsPerPage={20}
        renderRow={(item, isSelected) =>
          renderRow(item, isSelected, handleRowClick)
        }
      />
    </Box>
  );
};

export default Board;

type Post = {
  no: number;
  title: string;
  id: string;
  content: string;
  category: string;
  writtenTime: string;
  like: number;
  view: number;
  created_at: Date;
  updated_at: Date;
  comments: Comment[];
};

function createPostData(
  no: number,
  title: string,
  id: string,
  content: string,
  category: string,
  writtenTime: string,
  like: number,
  view: number,
  comments: Comment[],
): Post {
  return {
    no,
    title,
    id,
    content,
    category,
    writtenTime,
    like,
    view,
    created_at: new Date(),
    updated_at: new Date(),
    comments,
  };
}

// 예시 더미 게시글 생성
const examplePosts: Post[] = [
  createPostData(
    1,
    '홈트레이닝으로 건강 지키기',
    '유저1',
    '집에서 할 수 있는 간단한 홈트레이닝 방법을 소집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.집에서 할 수 있는 간단한 홈트레이닝 방법을 소개합니다.',
    '홈트레이닝',
    '2024-04-24T09:00:00',
    15,
    200,
    [],
  ),
  createPostData(
    2,
    '헬스장 가이드: 초보자를 위한 팁',
    '유저2',
    '헬스장에서 운동을 시작한 초보자가 알아야 할 필수 팁들에 대해 설명합니다.',
    '헬스',
    '2024-04-25T09:30:00',
    25,
    150,
    [],
  ),
  createPostData(
    3,
    '코어 운동의 기본',
    'post03',
    '코어 근육을 강화하는 데 효과적인 몇 가지 기본적인 운동 방법은 다음과 같습니다. \n플랭크(Plank):팔꿈치와 발끝을 바닥에 대고 몸을 일직선으로 만드세요. 이 자세를 30초에서 1분간 유지합니다. 허리가 처지지 않도록 주의하세요.\n크런치(Crunch):등을 바닥에 대고 무릎을 구부립니다. 손은 머리 뒤에 두고, 어깨가 바닥에서 들리도록 상체를 들어 올리세요. 이 동작을 15-20회 반복합니다.\n러시안 트위스트(Russian Twist):바닥에 앉아 무릎을 구부리고 발을 바닥에 둡니다. 상체를 약간 뒤로 기울이고 양손을 가슴 앞에서 모아 좌우로 상체를 돌립니다. 이 동작을 각 쪽으로 10-15회 반복합니다.\n레그 레이즈(Leg Raise):바닥에 누워 다리를 함께 모은 상태에서 천천히 들어 올렸다가 내리세요. 이 동작을 10-15회 반복합니다.\n버드 독(Bird Dog):네발기기 자세에서 한쪽 팔과 반대쪽 다리를 동시에 들어 올려 일직선이 되도록 하고 5초간 유지한 후 원래 자세로 돌아옵니다. 각 쪽으로 10-15회 반복합니다.\n사이드 플랭크(Side Plank):옆으로 누운 자세에서 한쪽 팔꿈치와 발의 옆면으로 몸을 지탱하고, 몸을 옆으로 들어 올려 일직선을 만듭니다. 각 쪽으로 30초에서 1분간 유지합니다.\n각 운동은 코어 근육의 다른 부위를 목표로 하며, 규칙적으로 수행하면 전반적인 코어 강화에 도움이 됩니다. 운동 전에는 가벼운 스트레칭으로 몸을 준비하고, 운동 후에도 스트레칭을 해서 근육을 이완시켜 주는 것이 좋습니다. 운동 강도는 자신의 체력과 능력에 맞추어 조절해야 하며, 동작을 정확하게 수행하는 것이 중요합니다. 처음 시작할 때는 트레이너의 지도를 받거나 운동 영상을 참고하여 정확한 자세를 익히는 것이 도움이 될 수 있습니다.',
    '운동 정보',
    '2024-04-26T09:00:00',
    20,
    300,
    [],
  ),
  createPostData(
    4,
    '요가 입문자를 위한 가이드',
    'post04',
    '요가를 처음 시작하는 사람들을 위한 기초 가이드입니다.',
    '요가',
    '2024-04-27T10:00:00',
    18,
    250,
    [],
  ),
  createPostData(
    5,
    '걷기 운동의 장점',
    'post05',
    '매일 걷기 운동을 하는 것의 건강상의 이점을 설명합니다.',
    '건강',
    '2024-04-28T11:00:00',
    15,
    220,
    [],
  ),
  createPostData(
    6,
    '프리 웨이트 트레이닝 팁',
    'post06',
    '프리 웨이트를 사용한 트레이닝 팁을 공유합니다.',
    '피트니스',
    '2024-04-29T12:00:00',
    25,
    320,
    [],
  ),
  createPostData(
    7,
    '실내 자전거 트레이닝 가이드',
    'post07',
    '실내에서 자전거 트레이닝을 하는 방법을 소개합니다.',
    '유산소',
    '2024-04-30T13:00:00',
    22,
    210,
    [],
  ),
  createPostData(
    8,
    '마라톤 준비하기',
    'post08',
    '마라톤을 준비하는 데 필요한 기본 사항을 알려드립니다.',
    '유산소',
    '2024-05-01T09:00:00',
    30,
    400,
    [],
  ),
  createPostData(
    9,
    '스웨덴식 걷기의 모든 것',
    'post09',
    '스웨덴식 걷기 운동 방법과 그 효과에 대해 설명합니다.',
    '건강',
    '2024-05-02T10:00:00',
    10,
    150,
    [],
  ),
  createPostData(
    10,
    '근력 강화를 위한 스트레칭',
    'post10',
    '근력을 강화하기 위한 스트레칭 방법을 소개합니다.',
    '피트니스',
    '2024-05-03T11:00:00',
    35,
    500,
    [],
  ),
  // 10개 추가
  createPostData(
    11,
    '파워리프팅 기초',
    'post11',
    '파워리프팅을 시작하기 전 알아야 할 기초 지식을 공유합니다.',
    '피트니스',
    '2024-05-04T12:00:00',
    12,
    110,
    [],
  ),
  createPostData(
    12,
    '효과적인 유산소 운동 방법',
    'post12',
    '효과적으로 유산소 운동을 하는 방법을 소개합니다.',
    '유산소',
    '2024-05-05T13:00:00',
    28,
    330,
    [],
  ),
  createPostData(
    13,
    '건강한 식단의 중요성',
    'post13',
    '운동과 더불어 건강한 식단이 왜 중요한지 설명합니다.',
    '식단',
    '2024-05-06T09:00:00',
    40,
    600,
    [],
  ),
  createPostData(
    14,
    '피트니스 앱 추천',
    'post14',
    '운동을 도와줄 수 있는 최고의 피트니스 앱들을 추천합니다.',
    '기술',
    '2024-05-07T10:00:00',
    18,
    290,
    [],
  ),
  createPostData(
    15,
    '홈트레이닝 기구 소개',
    'post15',
    '집에서 사용할 수 있는 효과적인 홈트레이닝 기구들을 소개합니다.',
    '피트니스',
    '2024-05-08T11:00:00',
    20,
    310,
    [],
  ),
  // 15개 추가
  createPostData(
    16,
    '아쿠아 피트니스의 이점',
    'post16',
    '물속에서 하는 운동, 아쿠아 피트니스의 건강상 이점을 설명합니다.',
    '운동',
    '2024-05-09T12:00:00',
    25,
    450,
    [],
  ),
  createPostData(
    17,
    '다이어트 성공 팁',
    'post17',
    '다이어트에 성공하기 위한 실용적인 팁을 공유합니다.',
    '건강',
    '2024-05-10T13:00:00',
    30,
    500,
    [],
  ),
  createPostData(
    18,
    '크로스핏 입문 가이드',
    'post18',
    '크로스핏을 시작하는 데 도움이 될 입문 가이드를 제공합니다.',
    '맨몸운동',
    '2024-05-11T09:00:00',
    35,
    550,
    [],
  ),
  createPostData(
    19,
    '테니스 초보자 가이드',
    'post19',
    '테니스를 처음 시작하는 사람들을 위한 기본 가이드입니다.',
    '스포츠',
    '2024-05-12T10:00:00',
    15,
    250,
    [],
  ),
  createPostData(
    20,
    '유연성 향상을 위한 요가',
    'post20',
    '유연성을 향상시킬 수 있는 요가 동작을 소개합니다.',
    '요가',
    '2024-05-13T11:00:00',
    22,
    420,
    [],
  ),
  // 20개 추가
  createPostData(
    21,
    '집에서 하는 명상 가이드',
    'post21',
    '집에서 쉽게 할 수 있는 명상 기술을 알려드립니다.',
    '요가',
    '2024-05-14T12:00:00',
    10,
    190,
    [],
  ),
  createPostData(
    22,
    '밸런스 볼 운동 방법',
    'post22',
    '밸런스 볼을 사용한 운동 방법을 소개합니다.',
    '운동',
    '2024-05-15T13:00:00',
    18,
    310,
    [],
  ),
  createPostData(
    23,
    '올바른 러닝 폼',
    'post23',
    '러닝을 할 때 올바른 폼을 유지하는 방법을 알려드립니다.',
    '유산소',
    '2024-05-16T09:00:00',
    27,
    380,
    [],
  ),
  createPostData(
    24,
    '스포츠 부상 예방',
    'post24',
    '스포츠를 할 때 발생할 수 있는 부상을 예방하는 방법을 설명합니다.',
    '건강',
    '2024-05-17T10:00:00',
    15,
    200,
    [],
  ),
  createPostData(
    25,
    '맨몸 운동 루틴',
    'post25',
    '헬스장 기구 없이 맨몸으로 할 수 있는 운동 루틴을 소개합니다.',
    '맨몸운동',
    '2024-05-18T11:00:00',
    22,
    350,
    [],
  ),
  createPostData(
    26,
    '건강한 아침 식사',
    'post26',
    '하루를 시작할 때 건강하게 먹을 수 있는 아침 식사 메뉴를 제안합니다.',
    '식단',
    '2024-05-19T12:00:00',
    30,
    450,
    [],
  ),
  createPostData(
    27,
    '자전거 타기의 이점',
    'post27',
    '정기적으로 자전거를 타는 것의 건강상 이점을 설명합니다.',
    '유산소',
    '2024-05-20T13:00:00',
    35,
    520,
    [],
  ),
  createPostData(
    28,
    '자전거 타기의 이점2',
    'post28',
    '정기적으로 자전거를 타는 것의 건강상 이점을 설명합니다.',
    '유산소',
    '2024-05-21T13:00:00',
    30,
    200,
    [],
  ),
  createPostData(
    29,
    '자전거 타기의 이점3',
    'post29',
    '정기적으로 자전거를 타는 것의 건강상 이점을 설명합니다.',
    '유산소',
    '2024-05-22T13:00:00',
    10,
    100,
    [],
  ),
  // 여기에 더 많은 포스트를 추가할 수 있습니다.
];
