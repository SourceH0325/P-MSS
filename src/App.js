import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {

  let Today = new Date(),
    Year = Today.getFullYear(),
    Month = (Today.getMonth() + 1),
    Day = Today.getDate();

    Month = (Month < 10) ? '0' + Month : Month;
    Day = (Day < 10) ? '0' + Day : Day;

  let Today_show = Year + '.' + Month + '.' + Day;

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.post(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.REACT_APP_NEIS_API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530254&MLSV_YMD=20220905`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  if (!data) {
    return console.log('로딩중...');
  }

  let MEAL = data.mealServiceDietInfo[1].row[0].DDISH_NM;
  console.log(MEAL);
  let MEAL2 = MEAL.replace(/\s/g,'');
  let MEAL3 = MEAL2.replace(/<br\/>/g, '\n'); 
  let MEAL4 = MEAL3.replace(/ *\([^)]*\) */g, '');

  
  return (
    <div>

      <h1 className="text-center font-gongb text-5xl sm:text-6xl text-[#787878] mt-10 mb-20">TIMESTAMP</h1>

      <div className="w-full px-3 grid gap-0 md:grid-cols-5 md:grid-rows-2 grid-cols-1 grid-rows-5">
        <div className="text-center text-[#787878]">
          <h1 className="font-gongb text-4xl">수학</h1>
          <p>6교시</p>
        </div>

        <div className="text-center text-[#787878]">
          <h1 className="font-gongb text-4xl md:pt-2 md:pl-0 pl-4 rotate-90 md:rotate-0">{'<'}</h1>
        </div>

        <div className="text-center text-[#f1f1f1]">
          <h1 className="font-gongb text-4xl">전자회로</h1>
          <p className="text-[#787878]">5교시</p>
        </div>

        <div className="text-center text-[#787878]">
          <h1 className="font-gongb text-4xl md:pt-2 md:pl-0 pl-4 rotate-90 md:rotate-0">{'<'}</h1>
        </div>

        <div className="text-center text-[#787878]">
          <h1 className="font-gongb text-4xl">문학</h1>
          <p>4교시</p>
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

      <h1 className="text-center font-gongb text-6xl text-[#787878] mt-20 mb-20">FOOD</h1>
      <div className="text-center text-[#f1f1f1] text-4xl">
        <h1 className="mt-5 mb-5 whitespace-pre-line leading-relaxed">{MEAL4}</h1>
      </div>

      <div className="text-center text-[#787878] text-sm mt-20">
        <p>© 2022. SourceH</p>
        <p>{Today_show}</p>
      </div>
    </div>
  );
}

export default App;
