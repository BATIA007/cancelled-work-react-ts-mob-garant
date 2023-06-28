import styles from "./stats.module.scss";
import sprite from "../../../assets/images/svg/sprite.svg";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { MouseEventHandler, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Calendar from "./Calendar/calendar";

const tabs = ["Дата", "Сегодня", "Неделя", "Месяц", "Все время"];

const data0 = [
  {
    name: "05:00",
    val: 3,
  },
  {
    name: "08:00",
    val: 5,
  },
  {
    name: "11:00",
    val: 11,
  },
  {
    name: "14:00",
    val: 12,
  },
  {
    name: "17:00",
    val: 0,
  },
  {
    name: "20:00",
    val: 1,
  },
  {
    name: "23:00",
    val: 6,
  },
  {
    name: "02:00",
    val: 2,
  },
];

const data1 = [
  {
    name: "05:00",
    val: 3,
  },
  {
    name: "08:00",
    val: 5,
  },
  {
    name: "11:00",
    val: 11,
  },
  {
    name: "14:00",
    val: 12,
  },
  {
    name: "17:00",
    val: 0,
  },
  {
    name: "20:00",
    val: 1,
  },
  {
    name: "23:00",
    val: 6,
  },
  {
    name: "02:00",
    val: 2,
  },
];

const data2 = [
  {
    name: "Пн",
    val: 8,
  },
  {
    name: "Вт",
    val: 3,
  },
  {
    name: "Ср",
    val: 0,
  },
  {
    name: "Чт",
    val: 41,
  },
  {
    name: "Пт",
    val: 12,
  },
  {
    name: "Сб",
    val: 1,
  },
  {
    name: "Вс",
    val: 21,
  },
];

const data3 = [
  {
    name: "1-3",
    val: 123,
  },
  {
    name: "3-6",
    val: 412,
  },
  {
    name: "6-9",
    val: 131,
  },
  {
    name: "9-12",
    val: 251,
  },
  {
    name: "12-15",
    val: 182,
  },
  {
    name: "15-18",
    val: 77,
  },
  {
    name: "18-21",
    val: 35,
  },
  {
    name: "21-24",
    val: 148,
  },
  {
    name: "24-27",
    val: 272,
  },
  {
    name: "27-30",
    val: 191,
  },
];

const data4 = [
  {
    name: "1-3",
    val: 123,
  },
  {
    name: "3-6",
    val: 412,
  },
  {
    name: "6-9",
    val: 131,
  },
  {
    name: "9-12",
    val: 251,
  },
  {
    name: "12-15",
    val: 182,
  },
  {
    name: "15-18",
    val: 77,
  },
  {
    name: "18-21",
    val: 35,
  },
  {
    name: "21-24",
    val: 148,
  },
  {
    name: "24-27",
    val: 272,
  },
  {
    name: "27-30",
    val: 191,
  },
];

export const InvestStats: React.FC = () => {
  const [tab, setTab] = useState<number>(0);
  const [activeData, setData] = useState(data0);

  useEffect(() => {
    if (tab === 0) setData(data0);
    if (tab === 1) setData(data1);
    if (tab === 2) setData(data2);
    if (tab === 3) setData(data3);
    if (tab === 4) setData(data4);
  }, [tab]);

  return (
    <div className={styles.stats}>
      <ul className={styles.stats__tabs}>
        {tabs.map((text, index) => (
          <Tab
            key={text}
            isActive={tab === index}
            handleActive={() => setTab(index)}
            text={text}
          />
        ))}
      </ul>
      <div className={styles.stats__wrapper + " wrapper"}>
        <Chart data={activeData} />
        <StatsBlock />
      </div>
    </div>
  );
};

interface CustomDateProps {
  date: Date | null;
  handleDate: MouseEventHandler;
  isOpen: boolean;
  handleClose: MouseEventHandler;
  endDate: Date;
  handleEndDate: any;
}

const CustomDate: React.FC<CustomDateProps> = ({
  date,
  handleDate,
  isOpen,
  handleClose,
  endDate,
  handleEndDate,
}) => {
  function handleClick(event: any) {
    const el = event.target;
    if (el) {
      if (!el.closest(".calendar")) {
        handleClose(event);
      }
    }
  }

  return (
    <CSSTransition classNames="opacity" in={isOpen} unmountOnExit timeout={300}>
      <Calendar
        selectDate={date}
        hadnleClick={handleClick}
        endDate={endDate}
        onChangeEnd={handleEndDate}
        onChange={handleDate}
      />
    </CSSTransition>
  );
};

interface TabProps {
  text: string;
  isActive: boolean;
  handleActive: any;
}

const Tab: React.FC<TabProps> = ({ text, isActive, handleActive }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleDateTab = () => {
    handleActive();
    setOpen(true);
  };

  return (
    <>
      {text === "Дата" ? (
        <li
          onClick={handleDateTab}
          className={
            styles.stats__tab + ` ${isActive ? styles.stats__tab_active : ""}`
          }
        >
          <svg
            className={styles.stats__tab_icon}
            width={18}
            height={18}
            viewBox="0 0 18 18"
          >
            <use xlinkHref={`${sprite}#date`} />
          </svg>
          <CustomDate
            date={date}
            isOpen={isOpen}
            endDate={endDate}
            handleEndDate={(date: Date) => setEndDate(date)}
            handleDate={(date) => setDate(date)}
            handleClose={() => setOpen(false)}
          />
          {date ? formaterDate(date, endDate) : "Дата"}
        </li>
      ) : (
        <li
          onClick={handleActive}
          className={
            styles.stats__tab + ` ${isActive ? styles.stats__tab_active : ""}`
          }
        >
          {text}
        </li>
      )}
    </>
  );
};

interface ChartProps {
  data: {
    name: string;
    val: number;
  }[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const sum = data.reduce((sum, current) => sum + current.val, 0);

  const gradient = strRandom();

  return (
    <div className={styles.chart}>
      <div className={styles.chart__top}>
        <div className={styles.chart__left}>
          <span className={styles.chart__numbers}>{sum}</span>
          <span className={styles.chart__text}>Кол-во регистраций</span>
        </div>
        <button className={styles.chart__button}>
          <svg fill="none" width={16} height={17} viewBox="0 0 16 17">
            <use xlinkHref={`${sprite}#chart`} />
          </svg>
        </button>
      </div>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart
          barSize={12}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          data={data}
        >
          <defs>
            <linearGradient
              id={gradient}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientTransform="rotate(-90)"
            >
              <stop offset="5%" stopColor="#7037E5" />
              <stop offset="95%" stopColor="#9B58EE" />
            </linearGradient>
          </defs>
          <XAxis
            style={{ fontSize: 12, fontWeight: 500, color: "#7D7A83" }}
            axisLine={false}
            tickLine={false}
            dataKey="name"
            height={18}
            padding={{ right: 60 }}
          />
          <YAxis
            fontSize={12}
            color="#7D7A83"
            fontWeight={500}
            orientation="right"
            tickCount={2}
            axisLine={false}
            tickLine={false}
            mirror={true}
          />
          <Bar radius={4} fill={`url(#${gradient})`} dataKey="val" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const pieData0 = [
  {
    name: "Вчера",
    value: 1,
  },
  {
    name: "Сегодня",
    value: 2,
  },
];

const pieData1 = [
  {
    name: "Прошлая неделя",
    value: 3,
  },
  {
    name: "Эта неделя",
    value: 12,
  },
];

const pieData2 = [
  {
    name: "Прошлый квартал",
    value: 9,
  },
  {
    name: "Этот квартал",
    value: 11,
  },
];

const pieDatas = [pieData0, pieData1, pieData2];

const StatsBlock: React.FC = () => {
  return (
    <div className={styles.block}>
      <h4 className={styles.block__title}>Скорость роста</h4>
      <ul className={styles.block__list}>
        {pieDatas.map((data) => (
          <InvestPieChart key={data[0].name} data={data} />
        ))}
      </ul>
    </div>
  );
};

interface PieChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const InvestPieChart: React.FC<PieChartProps> = ({ data }) => {
  const COLORS = ["#B081EB", `url(#colorQwe)`];

  return (
    <li className={styles.block__link}>
      <div className={styles.block__left}>
        <PieChart
          width={40}
          height={40}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Pie
            outerRadius={20}
            innerRadius={11}
            paddingAngle={15}
            cornerRadius={3}
            dataKey="value"
            strokeWidth={0}
            data={data}
          >
            {data.map((entry, index) => (
              <Cell
                strokeWidth={0}
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className={styles.block__grid}>
          <span className={styles.block__info}>{data[1].name}</span>
          <span className={styles.block__value}>+{data[1].value}%</span>
        </div>
      </div>
      <div className={styles.block__right}>
        <span className={styles.block__info}>{data[0].name}</span>
        <span className={styles.block__value_purple}>+{data[0].value}%</span>
      </div>
    </li>
  );
};

export const formaterDate = (date: any, endDate: Date) => {
  let localDate: string = "";
  const num1 = date.valueOf();
  const num2 = endDate.valueOf();
  const monthDateStart = date.toLocaleString("ru", { month: "long" });
  const monthDateEnd = endDate.toLocaleString("ru", { month: "long" });
  const monthStart =
    monthDateStart === "март" || monthDateStart === "август"
      ? monthDateStart + "а"
      : monthDateStart.slice(0, monthDateStart.length - 1) + "я";
  const monthEnd =
    monthDateEnd === "март" || monthDateEnd === "август"
      ? monthDateEnd + "а"
      : monthDateEnd.slice(0, monthDateEnd.length - 1) + "я";

  if (num1 === num2) {
    localDate = `${date.getDate()} ${monthEnd}`;
  } else if (
    num1 < num2 &&
    date.getFullYear() === endDate.getFullYear() &&
    date.getMonth() === endDate.getMonth()
  ) {
    localDate = `${date.getDate()}-${endDate.getDate()} ${monthEnd}`;
  } else if (
    num1 < num2 &&
    date.getFullYear() === endDate.getFullYear() &&
    date.getMonth() < endDate.getMonth()
  ) {
    localDate = `${date.getDate()} ${monthStart} - ${endDate.getDate()} ${monthEnd}`;
  } else if (num1 < num2 && date.getFullYear() < endDate.getFullYear()) {
    localDate = `${date.getDate()} ${monthStart} ${date.getFullYear()} - ${endDate.getDate()} ${monthEnd} ${endDate.getFullYear()}`;
  }
  return localDate;
};

export function strRandom() {
  const alphabet: string = "qwertyuiopasdfghjklzxcvbnm";
  let word: string = "";
  for (let i = 0; i < 6; i++) {
    word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
  }
  return word;
}
