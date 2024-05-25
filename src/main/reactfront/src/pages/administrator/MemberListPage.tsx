import React, { useState } from 'react';
import { members, Member } from '../../types/administrator/membersData';
import {
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import GenericTable from '../../components/genericTable/GenericTable';
import { Box, Typography } from '@mui/material';
import SearchBox from '../../components/common/search/SearchBox';
import { Search } from '../../styles/administrator/MemberListPage.styles';
import GenericButton from '../../components/common/genericButton/GenericButton';

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

  const handleAuthorityChange = (id: string, newAuthority: string) => {
    setFilteredMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, authority: newAuthority } : member,
      ),
    );
  };

  const handleSave = () => {
    console.log('변경사항 저장됨:', filteredMembers);
    alert('변경사항이 저장되었습니다.');
  };

  const columns = [
    { id: 'id', label: '번호', width: 70 },
    { id: 'email', label: '이메일', width: 150 },
    { id: 'name', label: '이름', width: 80 },
    { id: 'nickname', label: '닉네임', width: 80 },
    { id: 'phonenumber', label: '전화번호', width: 90 },
    { id: 'birthday', label: '생년월일', width: 90 },
    { id: 'joindate', label: '가입일', width: 90 },
    { id: 'unregister', label: '탈퇴유무', width: 50 },
    { id: 'authority', label: '권한', width: 50 },
  ];

  return (
    <Box sx={{ minHeight: '600px' }}>
      <Search>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Fit On 회원목록
        </Typography>
        <SearchBox onSearch={handleSearch} />
      </Search>
      <GenericTable
        columns={columns}
        data={filteredMembers}
        renderRow={(member: Member) => (
          <TableRow key={member.id}>
            <TableData>{member.id}</TableData>
            <TableData>{member.email}</TableData>
            <TableData>{member.name}</TableData>
            <TableData>{member.nickname}</TableData>
            <TableData>{member.phonenumber}</TableData>
            <TableData>{member.birthday}</TableData>
            <TableData>{member.joindate}</TableData>
            <TableData>{member.unregister ? 'Yes' : 'No'}</TableData>
            <TableData>
              <select
                value={member.authority || 'User'}
                onChange={(e) =>
                  handleAuthorityChange(member.id, e.target.value)
                }
                style={{ border: 'none' }}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </TableData>
          </TableRow>
        )}
        includeCheckboxes={false}
      />
      <Box sx={{ position: 'relative' }}>
        <GenericButton
          style={{ position: 'absolute', right: '0', top: '-35px' }}
          onClick={handleSave}
        >
          수정
        </GenericButton>
      </Box>
    </Box>
  );
};

export default MemberListPage;
