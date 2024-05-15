import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 2px 5px 10px 2px rgba(0, 0, 0, 0.1);
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ced4da;
  color: #333333;
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
  font-weight: bold;

  h2 {
    margin: 0;
  }

  button {
    background: none;
    border: none;
    color: #333333;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover {
      color: #666666;
    }
  }
`;

export const DayNames = styled.ol`
  display: flex;
  background: #ced4da;
  color: #333333;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    flex: 1;
    text-align: center;
    padding: 1rem 0;
  }
`;

export const Days = styled.ol`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background: #e5e5e5;
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
`;

export const Day = styled.li`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.5rem;
  height: 8rem;
  max-width: 10rem;
  min-width: 7rem;
  overflow: hidden;

  &.outside {
    background: #f2f2f2;
  }
`;

export const Date = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 0.5em;
`;

export const Event = styled.div`
  --dot-color: #33cc33;
  background: #fbfbfb;
  box-shadow: 0.25em 0.25em 1em 0 rgba(0, 0, 0, 0.05) inset;
  font-size: 0.875rem;
  padding: 0.5rem;
  line-height: 1.5em;
  border-radius: 0.5em;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  overflow: hidden; /* 내용이 넘치면 숨기기 */

  &::before {
    content: '';
    width: 0.5em;
    height: 0.5em;
    margin-right: 0.5em;
    background: var(--dot-color);
    border-radius: 100%;
    flex-shrink: 0;
  }

  &.work {
    --dot-color: #3366cc;
  }

  &.personal {
    --dot-color: #cccc33;
  }

  &.celebration {
    --dot-color: #cc3366;
  }
`;
