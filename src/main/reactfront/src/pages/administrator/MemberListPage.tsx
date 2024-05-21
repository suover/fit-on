import React, { useState } from 'react';
import { members, Member } from '../../types/administrator/membersData';
import {
  Container,
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import GenericTable from '../../components/genericTable/GenericTable';
import { Typography } from '@mui/material';
import SearchBox from '../../components/common/search/SearchBox';
import { Search } from '../../styles/administrator/MemberListPage.styles';

const MemberListPage: React.FC = () => {
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(members);

  const handleSearch = (query: string) => {
    const filtered = members.filter(
      (member) =>
        member.id.includes(query) ||
        member.email.includes(query) ||
        member.name.includes(query) ||
        member.nickname.includes(query) ||
        member.phonenumber.includes(query) ||
        member.birthday.includes(query) ||
        member.joindate.includes(query),
    );
    setFilteredMembers(filtered);
  };

  const columns = [
    { id: 'id', label: '번호', width: 70 },
    { id: 'email', label: '이메일', width: 150 },
    { id: 'password', label: '비밀번호', width: 80 },
    { id: 'name', label: '이름', width: 80 },
    { id: 'nickname', label: '닉네임', width: 80 },
    { id: 'phonenumber', label: '전화번호', width: 90 },
    { id: 'birthday', label: '생년월일', width: 90 },
    { id: 'joindate', label: '가입일', width: 90 },
    { id: 'unregister', label: '탈퇴유무', width: 50 },
  ];
  return (
    <Container
      style={{
        marginLeft: '45px',
        marginRight: '45px',
        marginTop: '100px',
        height: '700px',
      }}
    >
      <Search>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Fit On 회원목록
        </Typography>
        <SearchBox onSearch={handleSearch} styleProps={{ width: '200px' }} />
      </Search>

      <GenericTable
        columns={columns}
        data={filteredMembers}
        renderRow={(member: Member) => (
          <TableRow key={member.id}>
            <TableData>{member.id}</TableData>
            <TableData>{member.email}</TableData>
            <TableData>{member.password}</TableData>
            <TableData>{member.name}</TableData>
            <TableData>{member.nickname}</TableData>
            <TableData>{member.phonenumber}</TableData>
            <TableData>{member.birthday}</TableData>
            <TableData>{member.joindate}</TableData>
            <TableData>{member.unregister ? 'Yes' : 'No'}</TableData>
          </TableRow>
        )}
        includeCheckboxes={false}
      />
    </Container>
  );
};

export default MemberListPage;
