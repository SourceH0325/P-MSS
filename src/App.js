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
    setTimetableData(null);
    axios.post(`https://open.neis.go.kr/hub/hisTimetable?KEY=${process.env.REACT_APP_NEIS_API}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530254&ALL_TI_YMD=${API_TODAY_GO}&AY=2022&SEM=2&GRADE=2&CLASS_NM=2`)
      .then(response => {
        setTimetableData(response.data);
      });

    setMealData(null);
    axios.post(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.REACT_APP_NEIS_API}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530254&MLSV_YMD=${API_TODAY_GO}`)
      .then(response => {
        setMealData(response.data);
      });
  }, [API_TODAY_GO]);

  if (!TimetableData || !MealData) {
    return (
      <div>
        <div className="flex justify-center items-center w-screen h-screen">
          <img src={loading} alt='loading' />
        </div>
      </div>
    );
  }
  
  if (!TimetableData || !TimetableData.hisTimetable) {
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
  } else {
    if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "수학Ⅰ") { // 월요일 AND 7교시
      if (!MealData || !MealData.mealServiceDietInfo) { // NO MEAL
        
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

      } else { // YES NEAL

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

      }
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "한국사") { // 화요일 AND 7교시
      if (!MealData || !MealData.mealServiceDietInfo) { // NO NEAL

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
        
      } else { // YES NEAL

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
      }
  
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "물리학Ⅰ") { // 수요일 AND 6교시

      if (!MealData || !MealData.mealServiceDietInfo) { // NO MEAL

        return (
          <div>
            <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMETABLE</h1>
    
            <div className="w-full px-3 grid gap-0 md:grid-cols-6 md:grid-rows-2 grid-cols-1 grid-rows-6">
    
              <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
                <h1 className="font-gongb text-3xl">물리학</h1>
                <p className="text-[#787878]">1교시</p>
              </div>
    
              <div className="text-center text-[#f1f1f1] mb-5 md:mb-0">
                <h1 className="font-gongb text-3xl">제2외국어</h1>
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

      } else { // YES MEAL

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
                <h1 className="font-gongb text-3xl">제2외국어</h1>
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
      }
  
      
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "체육") { // 목요일 AND 7교시

      if (!MealData || !MealData.mealServiceDietInfo) { // NO MEAL

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

      } else { // YES MEAL

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
      }
  
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "전자 회로") { // 금요일 AND 6교시

      if (!MealData || !MealData.mealServiceDietInfo) { // NO MEAL

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

      } else { // YES MEAL

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
      }
  
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "학교장재량휴업일") { // 학교장재량휴업일
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">학교장재량휴업일</h1>
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
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "대체공휴일") { // 대체공휴일
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">대체공휴일</h1>
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
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "추석") { // 추석
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">추석</h1>
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
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "추석연휴") { // 추석연휴
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">추석연휴</h1>
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
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "광복절") { // 광복절
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">광복절</h1>
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
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "현충일") { // 현충일
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">현충일</h1>
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
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "개교기념일") { // 개교기념일
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">개교기념일</h1>
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
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "개천절") { // 개천절
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">개천절</h1>
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
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "어린이날") { // 어린이날
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">어린이날</h1>
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
    } else if (TimetableData.hisTimetable[1].row[0].ITRT_CNTNT === "삼일절") { // 삼일절
      return (
        <div>
          <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">HOLIDAY</h1>
    
          <div className="w-full text-center">
            <div className="text-center text-[#f1f1f1]">
              <h1 className="text-3xl sm:text-4xl">삼일절</h1>
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
    } else { // 토요일 / NO DATA
      
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
}
