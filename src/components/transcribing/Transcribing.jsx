import React from 'react'

export default function Transcribing(props) {
    const {downloading} = props;

  return (
    <div className='flex items-center flex-1 flex-col justify-center gap-10 md:gap-14 pb-24 p-4'>
        <div className='flex flex-col gap-2 sm:gap-4 items-center'>
            <h1 className="font-bold text-5xl sm:text-6xl md::text-7xl">
            <span className="text-blue-950 bold">Tr</span>
            <span className="text-blue-900 bold">an</span>
            <span className="text-blue-800 bold">sc</span>
            <span className="text-blue-700 bold">ri</span>
            <span className="text-blue-600 bold">bi</span>
            <span className="text-blue-500 bold">ng</span>
          </h1>
          <p> {!downloading ? "warming up cylidners" : "core cylinders engaged"} </p>
        </div>
        <div className='flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full'>
            {[0,1,2].map(val => {
                return <div key={val} className={`rounded-md h-2 sm:h-3 bg-slate-400 loading loading${val}`}></div>
            })}
        </div>
    </div>
  )
}
