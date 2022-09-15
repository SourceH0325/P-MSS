import axios from 'axios';
import React, { useState, useEffect } from 'react';
import loading from './styles/load.gif';

export default function App() {

  let Today = new Date(),
    Year = Today.getFullYear(),
    Month = (Today.getMonth() + 1),
    Day = Today.getDate();
    
    Month = (Month < 10) ? '0' + Month : Month;
    Day = (Day < 10) ? '0' + Day : Day;

  let [API_TODAY, setAPI_TODAY] = useState(Year + "-" + Month + "-" + Day);
  let API_TODAY_GO = API_TODAY.replace(/[-]/g, '');

  const [MealData, setMealData] = useState(null);
  const [TimetableData, setTimetableData] = useState(null);

  useEffect(() => {
    axios.post(`https://open.neis.go.kr/hub/hisTimetable?KEY=${process.env.REACT_APP_NEIS_API}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530254&ALL_TI_YMD=${API_TODAY_GO}&AY=2022&SEM=2&GRADE=2&CLASS_NM=2`)
      .then(response => {
        setTimetableData(response.data);
      });
  }, [API_TODAY_GO]);

  useEffect(() => {
    axios.post(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.REACT_APP_NEIS_API}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530254&MLSV_YMD=${API_TODAY_GO}`)
      .then((response) => {
        setMealData(response.data);
      });
  }, [API_TODAY_GO]);

  if (!MealData || !TimetableData) {
    return (
      <div>
        <div className="flex justify-center items-center w-screen h-screen">
          <img src={loading} alt='loading' />
        </div>
      </div>
    );
  }

  if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "수학Ⅰ") { // 월요일 AND 7교시

    console.log('월요일 AND 7교시');

    let MEAL_1 = MealData.mealServiceDietInfo[1].row[0].DDISH_NM;
    let MEAL_2 = MEAL_1.replace(/\s/g,'');
    let MEAL_3 = MEAL_2.replace(/<br\/>/g, '\n'); 
    let MEAL_4 = MEAL_3.replace(/ *\([^)]*\) */g, '');
    let MEAL_E = MEAL_4.replace(/[a-z]/g, '');

    return (
      <div>
        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full px-3 grid gap-0 md:grid-cols-7 md:grid-rows-2 grid-cols-1 grid-rows-7">

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">수학</h1>
            <p className="text-[#787878]">1교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">체육</h1>
            <p className="text-[#787878]">2교시</p>
          </div>
          
          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">하드웨어성능구현</h1>
            <p className="text-[#787878]">3교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">하드웨어성능구현</h1>
            <p className="text-[#787878]">4교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">제2외국어</h1>
            <p className="text-[#787878]">5교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">문학</h1>
            <p className="text-[#787878]">6교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">영어</h1>
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
          <h1 className="mt-5 mb-5 whitespace-pre-line leading-relaxed">{MEAL_E}</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <a href='https://github.com/SourceH0325'><p>© 2022. SourceH</p></a>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={API_TODAY}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
        </div>
      </div>
    );
  } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "한국사") { // 화요일 AND 7교시

    console.log('화요일 AND 7교시');

    let MEAL_1 = MealData.mealServiceDietInfo[1].row[0].DDISH_NM;
    let MEAL_2 = MEAL_1.replace(/\s/g,'');
    let MEAL_3 = MEAL_2.replace(/<br\/>/g, '\n'); 
    let MEAL_4 = MEAL_3.replace(/ *\([^)]*\) */g, '');
    let MEAL_E = MEAL_4.replace(/[a-z]/g, '');

    return (
      <div>
        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full px-3 grid gap-0 md:grid-cols-7 md:grid-rows-2 grid-cols-1 grid-rows-7">

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">한국사</h1>
            <p className="text-[#787878]">1교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">진로활동</h1>
            <p className="text-[#787878]">2교시</p>
          </div>
          
          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">문학</h1>
            <p className="text-[#787878]">3교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">물리학</h1>
            <p className="text-[#787878]">4교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">하드웨어성능구현</h1>
            <p className="text-[#787878]">5교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">하드웨어성능구현</h1>
            <p className="text-[#787878]">6교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">하드웨어성능구현</h1>
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
          <h1 className="mt-5 mb-5 whitespace-pre-line leading-relaxed">{MEAL_E}</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <a href='https://github.com/SourceH0325'><p>© 2022. SourceH</p></a>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={API_TODAY}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
        </div>
      </div>
    );
  } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "물리학Ⅰ") { // 수요일 AND 6교시

    console.log('수요일 AND 6교시');

    let MEAL_1 = MealData.mealServiceDietInfo[1].row[0].DDISH_NM;
    let MEAL_2 = MEAL_1.replace(/\s/g,'');
    let MEAL_3 = MEAL_2.replace(/<br\/>/g, '\n'); 
    let MEAL_4 = MEAL_3.replace(/ *\([^)]*\) */g, '');
    let MEAL_E = MEAL_4.replace(/[a-z]/g, '');

    return (
      <div>
        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full px-3 grid gap-0 md:grid-cols-6 md:grid-rows-2 grid-cols-1 grid-rows-6">

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">물리학</h1>
            <p className="text-[#787878]">1교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">중국어</h1>
            <p className="text-[#787878]">2교시</p>
          </div>
          
          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">수학</h1>
            <p className="text-[#787878]">3교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">문학</h1>
            <p className="text-[#787878]">4교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">한국사</h1>
            <p className="text-[#787878]">5교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">영어</h1>
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
          <h1 className="mt-5 mb-5 whitespace-pre-line leading-relaxed">{MEAL_E}</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <a href='https://github.com/SourceH0325'><p>© 2022. SourceH</p></a>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={API_TODAY}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
        </div>
      </div>
    );
  } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "체육") { // 목요일 AND 7교시

    console.log('목요일 AND 7교시');

    let MEAL_1 = MealData.mealServiceDietInfo[1].row[0].DDISH_NM;
    let MEAL_2 = MEAL_1.replace(/\s/g,'');
    let MEAL_3 = MEAL_2.replace(/<br\/>/g, '\n'); 
    let MEAL_4 = MEAL_3.replace(/ *\([^)]*\) */g, '');
    let MEAL_E = MEAL_4.replace(/[a-z]/g, '');

    return (
      <div>
        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full px-3 grid gap-0 md:grid-cols-7 md:grid-rows-2 grid-cols-1 grid-rows-7">

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">체육</h1>
            <p className="text-[#787878]">1교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">한국사</h1>
            <p className="text-[#787878]">2교시</p>
          </div>
          
          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">정보통신</h1>
            <p className="text-[#787878]">3교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">정보통신</h1>
            <p className="text-[#787878]">4교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">정보통신</h1>
            <p className="text-[#787878]">5교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">정보통신</h1>
            <p className="text-[#787878]">6교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">물리학</h1>
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
          <h1 className="mt-5 mb-5 whitespace-pre-line leading-relaxed">{MEAL_E}</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <a href='https://github.com/SourceH0325'><p>© 2022. SourceH</p></a>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={API_TODAY}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
        </div>
      </div>
    );
  } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "전자 회로") { // 금요일 AND 6교시

    console.log('금요일 AND 6교시');

    let MEAL_1 = MealData.mealServiceDietInfo[1].row[0].DDISH_NM;
    let MEAL_2 = MEAL_1.replace(/\s/g,'');
    let MEAL_3 = MEAL_2.replace(/<br\/>/g, '\n'); 
    let MEAL_4 = MEAL_3.replace(/ *\([^)]*\) */g, '');
    let MEAL_E = MEAL_4.replace(/[a-z]/g, '');

    return (
      <div>
        <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>

        <div className="w-full px-3 grid gap-0 md:grid-cols-6 md:grid-rows-2 grid-cols-1 grid-rows-6">

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">전자회로</h1>
            <p className="text-[#787878]">1교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">전자회로</h1>
            <p className="text-[#787878]">2교시</p>
          </div>
          
          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">전자회로</h1>
            <p className="text-[#787878]">3교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">전자회로</h1>
            <p className="text-[#787878]">4교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">자율활동</h1>
            <p className="text-[#787878]">5교시</p>
          </div>

          <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
            <h1 className="font-gongb text-3xl">자율활동</h1>
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
          <h1 className="mt-5 mb-5 whitespace-pre-line leading-relaxed">{MEAL_E}</h1>
        </div>

        <div className="text-center text-[#787878] text-sm mt-20">
          <a href='https://github.com/SourceH0325'><p>© 2022. SourceH</p></a>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={API_TODAY}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
        </div>
      </div>
    );
  } else {

    console.log('NO DATA');

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
          <a href='https://github.com/SourceH0325'><p>© 2022. SourceH</p></a>
          <p>Bucheon Technical High School</p>
          <input
            type="date"
            value={API_TODAY}
            onChange={(e) => setAPI_TODAY(e.target.value)}
            className="text-center bg-[#212529] focus:outline-none select-none"
          />
        </div>
      </div>
    );
  }
}