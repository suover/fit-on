import React, { useState } from 'react';
import {
  CalendarWrapper,
  CalendarHeader,
  DayNames,
  Days,
  Day,
  Date,
  Event as EventStyle,
} from './Calendar.styles';

interface Event {
  title: string;
  type: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new window.Date());

  // 임시 데이터
   // 임시 데이터
   const events: { [key: number]: Event[] } = {
     1: [{ title: '루틴', type: 'work' }],
 //     5: [{ title: '루틴', type: 'personal' }],
     12: [{ title: '루틴', type: 'celebration' }],
 //     20: [{ title: '루틴', type: 'work' }],
     25: [{ title: '루틴', type: 'celebration' }],
 //     30: [{ title: '루틴', type: 'celebration' }],
   };

  const renderDays = () => {
    const startOfMonth = new window.Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const endOfMonth = new window.Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const daysArray = [];

    for (let i = 0; i < startDay; i++) {
      daysArray.push(
        <Day key={`empty-start-${i}`} className="outside">
          <Date>&nbsp;</Date>
        </Day>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(
        <Day key={day}>
          <Date>{day}</Date>
          {events[day]?.map((event: Event, index: number) => (
            <EventStyle key={index} className={event.type}>
              {event.title}
            </EventStyle>
          ))}
        </Day>,
      );
    }

    return daysArray;
  };

  const prevMonth = () => {
    setCurrentDate(
      new window.Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new window.Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <button onClick={prevMonth}>←</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth}>→</button>
      </CalendarHeader>
      <DayNames>
        <li>일요일</li>
        <li>월요일</li>
        <li>화요일</li>
        <li>수요일</li>
        <li>목요일</li>
        <li>금요일</li>
        <li>토요일</li>
      </DayNames>
      <Days>{renderDays()}</Days>
    </CalendarWrapper>
  );
};

export default Calendar;
