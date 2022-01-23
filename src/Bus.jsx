import React, { useRef } from 'react';

const data = [
    {
      "number": "1-1",
      "timetable": {
        "weekday": [
          { "name": "정류장 A", "arrive": "09:00" },
          { "name": "정류장 b", "arrive": "09:20" },
          { "name": "정류장 D", "arrive": "09:45" },
          { "name": "정류장 e", "arrive": "10:00" },
          { "name": "정류장 F", "arrive": "10:20" },
          { "name": "정류장 a", "arrive": "10:50" }
        ],
        "weekend": []
      }
    },
    {
      "number": "50",
      "timetable": {
        "weekday": [
          { "name": "정류장 a", "arrive": "09:10" },
          { "name": "정류장 B", "arrive": "09:35" },
          { "name": "정류장 E", "arrive": "09:50" },
          { "name": "정류장 f", "arrive": "10:20" },
          { "name": "정류장 G", "arrive": "10:30" }
        ],
        "weekend": []
      }
    },
    {
      "number": "10",
      "timetable": {
        "weekday": [],
        "weekend": [
          { "name": "정류장 a", "arrive": "23:44" },
          { "name": "정류장 B", "arrive": "23:45" },
          { "name": "정류장 E", "arrive": "23:46" },
          { "name": "정류장 f", "arrive": "23:47" },
          { "name": "정류장 G", "arrive": "23:48" }
        ]
      }
    },
    {
      "number": "11",
      "timetable": {
        "weekday": [],
        "weekend": [
          { "name": "정류장 a", "arrive": "23:44" },
          { "name": "정류장 B", "arrive": "23:45" },
          { "name": "정류장 E", "arrive": "23:46" },
          { "name": "정류장 f", "arrive": "23:47" },
          { "name": "정류장 G", "arrive": "23:48" }
        ]
      }
    },
  ];

const Bus = () => {
  const inputVal = useRef();

  const searchHandler = () => {
    // 입력받은 번호들, 스케줄의 버스번호들 보관
    const inputs = inputVal.current.value;
    const inputArr = inputs.split(' ');
    const BusNum = data.map(i => i.number);

    // 시간비교위해 현재시간 정제
    const now = new Date();
    const day = now.getDay();
    const weekend = (day === 0 || day === 6)? true : false;
    const currentHour = now.getHours().toString().length === 1? '0' + now.getHours() : now.getHours();
    const currentMin = now.getMinutes().toString().length === 1? '0' + now.getMinutes() : now.getMinutes();
    const currentTime = currentHour + ':' + currentMin;

    // 입력받은 번호들 for문으로 하나씩
    for(let i=0; i < inputArr.length; i++){
      // 스케줄에 없는 버스 필터링
      let thisNum = inputArr[i];
      if(BusNum.indexOf(thisNum) === -1){
        console.log(`'${thisNum}'번 버스는 존재하지 않습니다.`);
        continue;
      }

      // 주말 or 주중 여부에 따라 해당 버스 스케줄 설정(ex. 주말일 경우 해당버스 주말스케줄로 세팅)
      let timetable = weekend? data.filter(i => i.number === thisNum)[0].timetable.weekend : data.filter(i => i.number === thisNum)[0].timetable.weekday;

      // 주말 or 주중 해당 스케줄 없을 경우 필터링
      if(timetable.length === 0){
        console.log(`'${thisNum}'번 버스는 운행하지 않습니다.`);
        continue;
        
        // 첫 정류장 도착시간보다 빠를 경우
      } else if(currentTime < timetable[0].arrive){
        console.log(`'${thisNum}'번 버스는 '${timetable[0].name}'를 향해 운행하고 있습니다.`);
        continue;

        // 마지막 정류장 도착시간이거나 이후 일 경우
      } else if(currentTime >= timetable[timetable.length-1].arrive){
        console.log(`'${thisNum}'번 버스는 운행이 종료되었습니다.`);
        continue;

        // 스케줄 비교
      } else {
        for(let j=0; j < timetable.length; j++){
          if(currentTime >= timetable[j].arrive && currentTime < timetable[j+1].arrive){
            console.log(`'${thisNum}'번 버스는 '${timetable[j+1].name}'를 향해 운행하고 있습니다.`);
            continue;
          }
        }
      }
    }
  }
  

  return <div>
    <input ref={inputVal} /><button onClick={searchHandler}>search</button>
  </div>;
};

export default Bus;





