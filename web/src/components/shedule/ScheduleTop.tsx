import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../app/redux/reducer/dateForData";

const ScheduleTeam: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [lastItem, setLastItem] = useState<boolean>(true);

  
  const dateArray: any[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    // console.log(formattedDate);
    const isToday = i === 0;
    dateArray.push(isToday ? `<strong>${formattedDate}</strong>` : formattedDate);
  }
  dateArray.reverse();
  const dateArr = dateArray.pop();

  const todays = new Date();
  const day = String(todays.getDate()).padStart(2, '0');
  const month = String(todays.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = today.getFullYear();
  const formattedDates = `${day}.${month}.${year}`;

  //useDispatch from redux
  const dispatch = useDispatch()

  const showDate = (dates: any) => {
    setLastItem(false);
    setSelectedItem(dates);
    // console.log(dates.split('.').reverse().join('-'))
    dispatch(
      add(dates.split('.').reverse().join('-'))
    );

  }

  const lastDatefunc = (formattedDate:any)=>{
    showDate(formattedDate);
    setLastItem(true);

  }

  return (
    <div className="sheduleteam-top">
      {/* <p className="sheduleteam-top-item">12.01.2022</p>
      <p className="sheduleteam-top-item">13.01.2022</p>
      <p className="sheduleteam-top-item">14.01.2022</p>
      <p className="sheduleteam-top-item">15.01.2022</p>
      <p className="sheduleteam-top-item">16.01.2022</p>
      <p className="sheduleteam-top-item">17.01.2022</p>
      <p className="sheduleteam-top-item">18.01.2022</p> */}
      {dateArray.map((item: any, index: number) => {
        // return <p key={index} className="sheduleteam-top-item "><strong>{item}</strong></p>
        return <p className="sheduleteam-top-item " style={{fontWeight: selectedItem === item ? 'bold' : 'normal'}} onClick={() => showDate(item)} key={index}>{item}</p>
      })}
      <p style={{ fontWeight: lastItem === true ? 'bold' : 'normal' }} onClick={() => lastDatefunc(formattedDates)} className="sheduleteam-top-item">{formattedDates}</p>
    </div>
  );
};

export default ScheduleTeam;
