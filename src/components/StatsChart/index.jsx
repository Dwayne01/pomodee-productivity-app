import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import AvatarImg from '../AvatarImg';

const StatsGraphContainer = styled.div`
  .title-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  @media screen and (min-width: 1200px) {
    width: 100%;
    h2.stats-title {
      margin-left: 8%;
    }
    p.stats-date {
      margin-left: 10%;
      margin-bottom: 50px;
    }
  }
`;

const StatsChart = (props) => {
  /* ========================================================
    Dynamically show the day label (Sun - Sat)
  ======================================================== */
  const dayOfWeekStr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayDay = new Date().getDay();
  let day1dayAgo;
  let day2daysAgo;
  let day3daysAgo;
  let day4daysAgo;
  let day5daysAgo;
  let day6daysAgo;

  if (todayDay - 1 < 0) {
    day1dayAgo = todayDay - 1 + 7;
  } else {
    day1dayAgo = todayDay - 1;
  }

  if (todayDay - 2 < 0) {
    day2daysAgo = todayDay - 2 + 7;
  } else {
    day2daysAgo = todayDay - 2;
  }

  if (todayDay - 3 < 0) {
    day3daysAgo = todayDay - 3 + 7;
  } else {
    day3daysAgo = todayDay - 3;
  }

  if (todayDay - 4 < 0) {
    day4daysAgo = todayDay - 4 + 7;
  } else {
    day4daysAgo = todayDay - 4;
  }

  if (todayDay - 5 < 0) {
    day5daysAgo = todayDay - 5 + 7;
  } else {
    day5daysAgo = todayDay - 5;
  }

  if (todayDay - 6 < 0) {
    day6daysAgo = todayDay - 6 + 7;
  } else {
    day6daysAgo = todayDay - 6;
  }

  /* ========================================================
    Put cycles in cyclesArray according to "completedAT"
  ======================================================== */

  const cyclesArray = props.user.cycleDetail;

  const cyclesToday = [];
  const cycles1dayAgo = [];
  const cycles2daysAgo = [];
  const cycles3daysAgo = [];
  const cycles4daysAgo = [];
  const cycles5daysAgo = [];
  const cycles6daysAgo = [];

  const nowTimeStamp = Date.now();
  const today = new Date(nowTimeStamp);

  /* These 7 variables are for <h2> content */
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();
  const sixDaysAgoTimeStamp = nowTimeStamp - 518400000; // = 6 days
  const sixDaysAgo = new Date(sixDaysAgoTimeStamp);
  const sixDaysAgoMonth = sixDaysAgo.getMonth() + 1;
  const sixDaysAgoDate = sixDaysAgo.getDate();
  const sixDaysAgoDay = sixDaysAgo.getDay();

  /* Get the timestamp of the start of each date: 6 days ago - today */
  const startOfToday = today.setHours(0, 0, 0, 0);
  const startOf1DayAgo = startOfToday - 86400000;
  const startOf2DaysAgo = startOf1DayAgo - 86400000;
  const startOf3DaysAgo = startOf2DaysAgo - 86400000;
  const startOf4DaysAgo = startOf3DaysAgo - 86400000;
  const startOf5DaysAgo = startOf4DaysAgo - 86400000;
  const startOf6DaysAgo = startOf5DaysAgo - 86400000;

  for (let i = 0; i < cyclesArray.length; i++) {
    if (cyclesArray[i].completedAt >= startOfToday) {
      cyclesToday.push(cyclesArray[i]);
    } else if (cyclesArray[i].completedAt < startOfToday && cyclesArray[i].completedAt >= startOf1DayAgo) {
      cycles1dayAgo.push(cyclesArray[i]);
    } else if (cyclesArray[i].completedAt < startOf1DayAgo && cyclesArray[i].completedAt >= startOf2DaysAgo) {
      cycles2daysAgo.push(cyclesArray[i]);
    } else if (cyclesArray[i].completedAt < startOf2DaysAgo && cyclesArray[i].completedAt >= startOf3DaysAgo) {
      cycles3daysAgo.push(cyclesArray[i]);
    } else if (cyclesArray[i].completedAt < startOf3DaysAgo && cyclesArray[i].completedAt >= startOf4DaysAgo) {
      cycles4daysAgo.push(cyclesArray[i]);
    } else if (cyclesArray[i].completedAt < startOf4DaysAgo && cyclesArray[i].completedAt >= startOf5DaysAgo) {
      cycles5daysAgo.push(cyclesArray[i]);
    } else if (cyclesArray[i].completedAt < startOf5DaysAgo && cyclesArray[i].completedAt >= startOf6DaysAgo) {
      cycles6daysAgo.push(cyclesArray[i]);
    }
  }

  /* Chart configuration */

  const chartData = {
    labels: [
      dayOfWeekStr[day6daysAgo],
      dayOfWeekStr[day5daysAgo],
      dayOfWeekStr[day4daysAgo],
      dayOfWeekStr[day3daysAgo],
      dayOfWeekStr[day2daysAgo],
      dayOfWeekStr[day1dayAgo],
      dayOfWeekStr[todayDay]
    ],
    datasets: [
      {
        data: [
          cycles6daysAgo.length,
          cycles5daysAgo.length,
          cycles4daysAgo.length,
          cycles3daysAgo.length,
          cycles2daysAgo.length,
          cycles1dayAgo.length,
          cyclesToday.length
        ],
        fill: true,
        backgroundColor: '#3928B1',
        pointBackgroundColor: '#F34506',
        pointStyle: 'circle',
        pointRadius: 5,
        tension: 0.47
      }
    ]
  };

  const options = {
    scales: {
      y: {
        grace: '10%',
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <StatsGraphContainer>
      <div className="title-row">
        <div>
          <h2 className="stats-title">{props.user.username}'s Stats:</h2>
          <p className="stats-date">
            &nbsp;{sixDaysAgoMonth}/{sixDaysAgoDate}({dayOfWeekStr[sixDaysAgoDay]}) - {todayMonth}/{todayDate}(
            {dayOfWeekStr[todayDay]})
          </p>
        </div>
        {props.user && (
          <AvatarImg style={{ borderRadius: 50 }} height={70} width={70} avatarId={props.user.avatar || 1} />
        )}
      </div>
      <Line data={chartData} options={options} />
    </StatsGraphContainer>
  );
};

export default StatsChart;
