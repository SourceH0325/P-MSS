import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function App() {

  let Today = new Date(),
    Year = Today.getFullYear(),
    Month = (Today.getMonth() + 1),
    Day = Today.getDate();
    
    Month = (Month < 10) ? '0' + Month : Month;
    Day = (Day < 10) ? '0' + Day : Day;

  let [API_TODAY, setAPI_TODAY] = useState(Year + Month + Day);
  let API_TODAY_GO = API_TODAY.replace(/[-]/g, '');
  let Today_show = Year + "-" + Month + "-" + Day;

  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);

  useEffect(() => {
    axios.post(`https://open.neis.go.kr/hub/hisTimetable?KEY=${process.env.REACT_APP_NEIS_API}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530254&ALL_TI_YMD=${API_TODAY_GO}&AY=2022&SEM=2&GRADE=2&CLASS_NM=2`)
      .then(response => {
        setData1(response.data);
      })
    console.log({API_TODAY_GO});
  }, [API_TODAY_GO]);

  useEffect(() => {
    axios.post(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.REACT_APP_NEIS_API}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530254&MLSV_YMD=${API_TODAY_GO}`)
      .then((response) => {
        setData(response.data);
      });
    console.log({API_TODAY_GO});
  }, [API_TODAY_GO]);

  if (!data) {
    return console.log('급식 데이터 로딩중...');
  }

  if (!data1) {
    return console.log('시간표 데이터 로딩중...');
  }

  if (!data || !data.mealServiceDietInfo) { // 급식 데이터가 없으면

    return (
      <div>

        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full text-center">
          <div className="text-center text-[#f1f1f1]">
            <h1 className="text-3xl sm:text-4xl">수업이 없습니다!</h1>
          </div>
        </div>

        <div className="text-[#37393C] absolute bottom-98 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-play fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-square fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-98 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-face-laugh fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-book fa-8x"></i>
        </div>

        <h1 className="text-center font-gongb text-6xl text-[#787878] mt-20 mb-20">MEALS</h1>
        <div className="text-center text-[#f1f1f1] text-3xl sm:text-4xl">
          <h1 className="mt-5 mb-5">급식이 없습니다!</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <p>© 2022. SourceH</p>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={Today_show}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
          <p>SET DATE: {API_TODAY_GO}</p>
        </div>
      </div>
    )
  } else if (!data1 || !data1.hisTimetable) { // 시간표 데이터가 없으면
    return (
      <div>

        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full text-center">
          <div className="text-center text-[#f1f1f1]">
            <h1 className="text-3xl sm:text-4xl">수업이 없습니다!</h1>
          </div>
        </div>

        <div className="text-[#37393C] absolute bottom-98 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-play fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-square fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-98 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-face-laugh fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-book fa-8x"></i>
        </div>

        <h1 className="text-center font-gongb text-6xl text-[#787878] mt-20 mb-20">MEALS</h1>
        <div className="text-center text-[#f1f1f1] text-3xl sm:text-4xl">
          <h1 className="mt-5 mb-5">급식이 없습니다!</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <p>© 2022. SourceH</p>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={Today_show}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
          <p>SET DATE: {API_TODAY_GO}</p>
        </div>
      </div>
    )
  } else if (!data1 || !data1.hisTimetable[1].row[4]) { // 5교시 데이터가 없으면

    let TIME1 = data1.hisTimetable[1].row[0].ITRT_CNTNT;
    let TIME1_R = TIME1.replace(/\s/g,'');
    let TIME1_RE = TIME1_R.replace('*', '');

    let TIME2 = data1.hisTimetable[1].row[1].ITRT_CNTNT;
    let TIME2_R = TIME2.replace(/\s/g,'');
    let TIME2_RE = TIME2_R.replace('*', '');

    let TIME3 = data1.hisTimetable[1].row[2].ITRT_CNTNT;
    let TIME3_R = TIME3.replace(/\s/g,'');
    let TIME3_RE = TIME3_R.replace('*', '');

    let TIME4 = data1.hisTimetable[1].row[3].ITRT_CNTNT;
    let TIME4_R = TIME4.replace(/\s/g,'');
    let TIME4_RE = TIME4_R.replace('*', '');

    let MEAL = data.mealServiceDietInfo[1].row[0].DDISH_NM;
    let MEAL2 = MEAL.replace(/\s/g,'');
    let MEAL3 = MEAL2.replace(/<br\/>/g, '\n'); 
    let MEAL4 = MEAL3.replace(/ *\([^)]*\) */g, '');
    let MEAL5 = MEAL4.replace(/[a-z]/g, '');

    return (
      <div>

        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full px-3 grid gap-0 md:grid-cols-4 md:grid-rows-2 grid-cols-1 grid-rows-4">

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME1_RE}</h1>
            <p className="text-[#787878]">1교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME2_RE}</h1>
            <p className="text-[#787878]">2교시</p>
          </div>
          
          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME3_RE}</h1>
            <p className="text-[#787878]">3교시</p>
          </div>

          <div className="text-center text-[#f1f1f1]">
            <h1 className="font-gongb text-3xl">{TIME4_RE}</h1>
            <p className="text-[#787878]">4교시</p>
          </div>

        </div>

        <div className="text-[#37393C] absolute bottom-98 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-play fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-square fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-98 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-face-laugh fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-book fa-8x"></i>
        </div>

        <h1 className="text-center font-gongb text-6xl text-[#787878] mt-20 mb-20">MEALS</h1>
        <div className="text-center text-[#f1f1f1] text-3xl md:text-4xl">
          <h1 className="mt-5 mb-5 whitespace-pre-line leading-relaxed">{MEAL5}</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <p>© 2022. SourceH</p>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={Today_show}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
          <p>SET DATE: {API_TODAY_GO}</p>
        </div>
      </div>
    )
  } else if (!data1 || !data1.hisTimetable[1].row[6]) { // 6교시 데이터가 있으면

    let TIME1 = data1.hisTimetable[1].row[0].ITRT_CNTNT;
    let TIME1_R = TIME1.replace(/\s/g,'');
    let TIME1_RE = TIME1_R.replace('*', '');

    let TIME2 = data1.hisTimetable[1].row[1].ITRT_CNTNT;
    let TIME2_R = TIME2.replace(/\s/g,'');
    let TIME2_RE = TIME2_R.replace('*', '');

    let TIME3 = data1.hisTimetable[1].row[2].ITRT_CNTNT;
    let TIME3_R = TIME3.replace(/\s/g,'');
    let TIME3_RE = TIME3_R.replace('*', '');

    let TIME4 = data1.hisTimetable[1].row[3].ITRT_CNTNT;
    let TIME4_R = TIME4.replace(/\s/g,'');
    let TIME4_RE = TIME4_R.replace('*', '');

    let TIME5 = data1.hisTimetable[1].row[4].ITRT_CNTNT;
    let TIME5_R = TIME5.replace(/\s/g,'');
    let TIME5_RE = TIME5_R.replace('*', '');

    let TIME6 = data1.hisTimetable[1].row[5].ITRT_CNTNT;
    let TIME6_R = TIME6.replace(/\s/g,'');
    let TIME6_RE = TIME6_R.replace('*', '');

    let MEAL = data.mealServiceDietInfo[1].row[0].DDISH_NM;
    let MEAL2 = MEAL.replace(/\s/g,'');
    let MEAL3 = MEAL2.replace(/<br\/>/g, '\n'); 
    let MEAL4 = MEAL3.replace(/ *\([^)]*\) */g, '');
    let MEAL5 = MEAL4.replace(/[a-z]/g, '');

    return (
      <div>

        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full px-3 grid gap-0 md:grid-cols-6 md:grid-rows-2 grid-cols-1 grid-rows-6">

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME1_RE}</h1>
            <p className="text-[#787878]">1교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME2_RE}</h1>
            <p className="text-[#787878]">2교시</p>
          </div>
          
          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME3_RE}</h1>
            <p className="text-[#787878]">3교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME4_RE}</h1>
            <p className="text-[#787878]">4교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME5_RE}</h1>
            <p className="text-[#787878]">5교시</p>
          </div>

          <div className="text-center text-[#f1f1f1]">
            <h1 className="font-gongb text-3xl">{TIME6_RE}</h1>
            <p className="text-[#787878]">6교시</p>
          </div>

        </div>

        <div className="text-[#37393C] absolute bottom-98 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-play fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-square fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-98 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-face-laugh fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-book fa-8x"></i>
        </div>

        <h1 className="text-center font-gongb text-6xl text-[#787878] mt-20 mb-20">MEALS</h1>
        <div className="text-center text-[#f1f1f1] text-3xl md:text-4xl">
          <h1 className="mt-5 mb-5 whitespace-pre-line leading-relaxed">{MEAL5}</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <p>© 2022. SourceH</p>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={Today_show}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
          <p>SET DATE: {API_TODAY_GO}</p>
        </div>
      </div>
    )
  } else { // 위에 있는 조건이 아닐 경우

    let TIME1 = data1.hisTimetable[1].row[0].ITRT_CNTNT;
    let TIME1_R = TIME1.replace(/\s/g,'');
    let TIME1_RE = TIME1_R.replace('*', '');

    let TIME2 = data1.hisTimetable[1].row[1].ITRT_CNTNT;
    let TIME2_R = TIME2.replace(/\s/g,'');
    let TIME2_RE = TIME2_R.replace('*', '');

    let TIME3 = data1.hisTimetable[1].row[2].ITRT_CNTNT;
    let TIME3_R = TIME3.replace(/\s/g,'');
    let TIME3_RE = TIME3_R.replace('*', '');

    let TIME4 = data1.hisTimetable[1].row[3].ITRT_CNTNT;
    let TIME4_R = TIME4.replace(/\s/g,'');
    let TIME4_RE = TIME4_R.replace('*', '');

    let TIME5 = data1.hisTimetable[1].row[4].ITRT_CNTNT;
    let TIME5_R = TIME5.replace(/\s/g,'');
    let TIME5_RE = TIME5_R.replace('*', '');

    let TIME6 = data1.hisTimetable[1].row[5].ITRT_CNTNT;
    let TIME6_R = TIME6.replace(/\s/g,'');
    let TIME6_RE = TIME6_R.replace('*', '');

    let TIME7 = data1.hisTimetable[1].row[6].ITRT_CNTNT;
    let TIME7_R = TIME7.replace(/\s/g,'');
    let TIME7_RE = TIME7_R.replace('*', '');

    let MEAL = data.mealServiceDietInfo[1].row[0].DDISH_NM;
    let MEAL2 = MEAL.replace(/\s/g,'');
    let MEAL3 = MEAL2.replace(/<br\/>/g, '\n'); 
    let MEAL4 = MEAL3.replace(/ *\([^)]*\) */g, '');
    let MEAL5 = MEAL4.replace(/[a-z]/g, '');

    return (
      <div>

        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full px-3 grid gap-0 md:grid-cols-7 md:grid-rows-2 grid-cols-1 grid-rows-7">

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME1_RE}</h1>
            <p className="text-[#787878]">1교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME2_RE}</h1>
            <p className="text-[#787878]">2교시</p>
          </div>
          
          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME3_RE}</h1>
            <p className="text-[#787878]">3교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME4_RE}</h1>
            <p className="text-[#787878]">4교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME5_RE}</h1>
            <p className="text-[#787878]">5교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">{TIME6_RE}</h1>
            <p className="text-[#787878]">6교시</p>
          </div>

          <div className="text-center text-[#f1f1f1]">
            <h1 className="font-gongb text-3xl">{TIME7_RE}</h1>
            <p className="text-[#787878]">7교시</p>
          </div>

        </div>

        <div className="text-[#37393C] absolute bottom-98 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-play fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 right-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-square fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-98 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-face-laugh fa-8x"></i>
        </div>

        <div className="text-[#37393C] absolute bottom-32 left-52 rotate-45 hidden lg:block">
          <i className="fa-solid fa-book fa-8x"></i>
        </div>

        <h1 className="text-center font-gongb text-6xl text-[#787878] mt-20 mb-20">MEALS</h1>
        <div className="text-center text-[#f1f1f1] text-3xl md:text-4xl">
          <h1 className="mt-5 mb-5 whitespace-pre-line leading-relaxed">{MEAL5}</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <p>© 2022. SourceH</p>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={Today_show}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
          <p>SET DATE: {API_TODAY_GO}</p>
        </div>
      </div>
    )
  }
}