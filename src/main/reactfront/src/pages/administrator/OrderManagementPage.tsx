import React, { useState } from 'react';
import {Box, Typography, Button, TextField, Select, MenuItem, Checkbox} from '@mui/material';
import GenericTable from '../../components/genericTable/GenericTable';
import { TableRow, TableData } from '../../components/genericTable/GenericTable.styles';
import GenericButton from '../../components/common/genericButton/GenericButton';

// 주문 데이터 타입 정의
interface Order {
    id: string;
    orderDate: string;
    orderNumber: string;
    customerName: string;
    orderMethod: string;
    phoneNumber: string;
    amount: number;
    status: string;
}

// 샘플 주문 데이터
const sampleOrders: Order[] = [
    { id: '1', orderDate: '2023-07-31 14:12', orderNumber: '160531141234776', customerName: '김철수', orderMethod: '무통장입금', phoneNumber: '010-1234-5678', amount: 18000, status: '주문접수' },
    { id: '2', orderDate: '2023-07-31 14:11', orderNumber: '160531141140222', customerName: '이영희', orderMethod: '카드결제', phoneNumber: '010-2345-6789', amount: 23000, status: '주문취소' },
    { id: '3', orderDate: '2023-07-31 14:10', orderNumber: '160531141035975', customerName: '박지민', orderMethod: '간편결제', phoneNumber: '010-3456-7890', amount: 13000, status: '결제완료' },
];

const OrderManagementPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(sampleOrders);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('customerName');

    const handleSearch = () => {
        // 검색 로직 구현
    };

    const handleStatusChange = (orderId: string, newStatus: string) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const handleExcelDownload = () => {
        // 엑셀 다운로드 로직 구현
    };

    const handleBulkStatusChange = () => {
        // 상태 일괄 변경 로직 구현
    };

    const handlePrintOrders = () => {
        // 주문서 출력 로직 구현
    };

    const columns = [
        { id: 'orderDate', label: '주문일', width: 120 },
        { id: 'orderNumber', label: '주문번호', width: 150 },
        { id: 'customerName', label: '주문자명', width: 100 },
        { id: 'orderMethod', label: '주문방법', width: 100 },
        { id: 'phoneNumber', label: '전화번호', width: 120 },
        { id: 'amount', label: '주문금액', width: 100 },
        { id: 'status', label: '주문상태', width: 120 },
    ];

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>Fit On 주문관리</Typography>

            {/* 진행상태 버튼 */}
            <Box sx={{ mb: 2 }}>
                {['전체', '주문접수(1)', '결제완료(1)', '배송준비중(0)', '배송처리', '배송완료', '주문취소', '미주문'].map((status) => (
                    <Button key={status} variant="contained" sx={{ mr: 1, mb: 1 }}>{status}</Button>
                ))}
            </Box>

            {/* 기간 검색 */}
            <Box sx={{ mb: 2 }}>
                <TextField
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <TextField
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <Button variant="outlined">오늘</Button>
                <Button variant="outlined">어제</Button>
                <Button variant="outlined">1주일</Button>
                <Button variant="outlined">1개월</Button>
            </Box>

            {/* 조건 검색 */}
            <Box sx={{ mb: 2 }}>
                <Select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    sx={{ mr: 1 }}
                >
                    <MenuItem value="customerName">주문자명</MenuItem>
                    <MenuItem value="orderNumber">주문번호</MenuItem>
                </Select>
                <TextField
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <Button variant="contained" onClick={handleSearch}>검색</Button>
            </Box>

            {/* 주문 목록 테이블 */}
            <GenericTable
                columns={columns}
                data={orders}
                renderRow={(order: Order) => (
                    <TableRow key={order.id}>
                        <TableData>
                            <Checkbox
                                // checked={selectedItems.includes(item.productId)}
                                // onChange={() => handleSelectItem(item.productId)}
                            />
                        </TableData>
                        <TableData>{order.orderDate}</TableData>
                        <TableData>{order.orderNumber}</TableData>
                        <TableData>{order.customerName}</TableData>
                        <TableData>{order.orderMethod}</TableData>
                        <TableData>{order.phoneNumber}</TableData>
                        <TableData>{order.amount.toLocaleString()} 원</TableData>
                        <TableData>
                            <Select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                sx={{ minWidth: 120 }}
                            >
                                <MenuItem value="주문접수">주문접수</MenuItem>
                                <MenuItem value="결제완료">결제완료</MenuItem>
                                <MenuItem value="배송준비중">배송준비중</MenuItem>
                                <MenuItem value="배송처리">배송처리</MenuItem>
                                <MenuItem value="배송완료">배송완료</MenuItem>
                                <MenuItem value="주문취소">주문취소</MenuItem>
                            </Select>
                        </TableData>
                    </TableRow>
                )}
                includeCheckboxes={true}
            />

            {/* 하단 버튼 */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <GenericButton onClick={handleBulkStatusChange}>상태일괄변경</GenericButton>
                    <GenericButton onClick={handlePrintOrders}>주문서출력</GenericButton>
                </Box>
                <GenericButton onClick={handleExcelDownload}>엑셀파일 저장</GenericButton>
            </Box>
        </Box>
    );
};

export default OrderManagementPage;