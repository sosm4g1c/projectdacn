import React, { useEffect, useState } from "react";

function TimerComponent({ isRunning }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval); // Dừng bộ đếm khi isRunning là false
    }

    return () => {
      clearInterval(interval); // Đảm bảo clear interval khi component unmount hoặc khi isRunning thay đổi
    };
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return <div>{formatTime(seconds)}</div>;
}

export default TimerComponent;
