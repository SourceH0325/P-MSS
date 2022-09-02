function App() {

  let Today = new Date(),
    Year = Today.getFullYear(),
    Month = (Today.getMonth()+1),
    Day = Today.getDate();

    Month = (Month < 10) ? '0' + Month : Month;
    Day = (Day < 10) ? '0' + Day : Day;

  let Today_show = Year + '.' + Month + '.' + Day;
  
  return (
    <div>

      <h1 className="text-center font-gongb text-6xl text-[#787878] mt-10 mb-20">TIMESTAMP</h1>

      <div className="w-full px-3 grid gap-0 grid-cols-5 grid-rows-2">
        <div className="text-center text-[#787878]">
          <h1 className="font-gongb text-4xl">수학</h1>
          <p>PM 12:00 ~ PM 12:50</p>
        </div>

        <div className="text-center text-[#787878]">
          <h1 className="font-gongb text-4xl pt-2">{'<'}</h1>
        </div>

        <div className="text-center text-[#f1f1f1]">
          <h1 className="font-gongb text-4xl">체육</h1>
          <p className="text-[#787878]">AM 11:00 ~ AM 11:50</p>
        </div>

        <div className="text-center text-[#787878]">
          <h1 className="font-gongb text-4xl pt-2">{'<'}</h1>
        </div>

        <div className="text-center text-[#787878]">
          <h1 className="font-gongb text-4xl">문학</h1>
          <p>AM 10:00 ~ AM 10:50</p>
        </div>
        
      </div>

      <div className="text-[#37393C] absolute right-52 rotate-45">
        <i className="fa-solid fa-play fa-8x"></i>
      </div>

      <div className="text-[#37393C] absolute bottom-32 right-52 rotate-45">
        <i className="fa-solid fa-square fa-8x"></i>
      </div>

      <div className="text-[#37393C] absolute bottom-98 left-52 rotate-45">
        <i className="fa-solid fa-face-laugh fa-8x"></i>
      </div>

      <div className="text-[#37393C] absolute bottom-32 left-52 rotate-45">
        <i className="fa-solid fa-book fa-8x"></i>
      </div>

      <h1 className="text-center font-gongb text-6xl text-[#787878] mt-20 mb-20">FOOD</h1>
      <div className="text-center text-[#f1f1f1] text-4xl">
        <h1 className="mt-5 mb-5">김치볶음밥</h1>
        <h1 className="mt-5 mb-5">달걀실파국</h1>
        <h1 className="mt-5 mb-5">알감자조림</h1>
        <h1 className="mt-5 mb-5">오이지무침</h1>
        <h1 className="mt-5 mb-5">훈제오리부추무침</h1>
      </div>

      <div className="text-center text-[#787878] text-sm mt-20">
        <p>© 2022. SourceH</p>
        <p>{Today_show}</p>
      </div>
    </div>
  );
}

export default App;
