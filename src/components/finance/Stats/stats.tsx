import { MouseEventHandler, useEffect, useState } from "react";
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
import Calendar from "./Calendar/calendar";
import { CSSTransition } from "react-transition-group";
import { formaterDate, strRandom } from "../../invest/Stats/stats";

const tabs = ["Дата", "Сегодня", "Неделя", "Месяц", "Все время"];

const data0 = [
  {
    name: "05:00",
    val1: 100,
    val2: 0,
  },
  {
    name: "08:00",
    val1: 50,
    val2: 100,
  },
  {
    name: "11:00",
    val1: 300,
    val2: 0,
  },
  {
    name: "14:00",
    val1: 0,
    val2: 0,
  },
  {
    name: "17:00",
    val1: 0,
    val2: 500,
  },
  {
    name: "20:00",
    val1: 400,
    val2: 210,
  },
  {
    name: "23:00",
    val1: 0,
    val2: 0,
  },
  {
    name: "02:00",
    val1: 0,
    val2: 210,
  },
];

const data1 = [
  {
    name: "05:00",
    val1: 100,
    val2: 0,
  },
  {
    name: "08:00",
    val1: 50,
    val2: 100,
  },
  {
    name: "11:00",
    val1: 300,
    val2: 0,
  },
  {
    name: "14:00",
    val1: 0,
    val2: 0,
  },
  {
    name: "17:00",
    val1: 0,
    val2: 500,
  },
  {
    name: "20:00",
    val1: 400,
    val2: 210,
  },
  {
    name: "23:00",
    val1: 0,
    val2: 0,
  },
  {
    name: "02:00",
    val1: 0,
    val2: 210,
  },
];

const data2 = [
  {
    name: "Пн",
    val1: 1000,
    val2: 200,
  },
  {
    name: "Вт",
    val1: 0,
    val2: 0,
  },
  {
    name: "Ср",
    val1: 1400,
    val2: 200,
  },
  {
    name: "Чт",
    val1: 3000,
    val2: 0,
  },
  {
    name: "Пт",
    val1: 760,
    val2: 500,
  },
  {
    name: "Сб",
    val1: 210,
    val2: 400,
  },
  {
    name: "Вс",
    val1: 0,
    val2: 4000,
  },
];

const data3 = [
  {
    name: "1-3",
    val1: 5000,
    val2: 400,
  },
  {
    name: "3-6",
    val1: 4200,
    val2: 3000,
  },
  {
    name: "6-9",
    val1: 600,
    val2: 0,
  },
  {
    name: "9-12",
    val1: 0,
    val2: 8000,
  },
  {
    name: "12-15",
    val1: 3200,
    val2: 1800,
  },
  {
    name: "15-18",
    val1: 700,
    val2: 0,
  },
  {
    name: "18-21",
    val1: 5000,
    val2: 3000,
  },
  {
    name: "21-24",
    val1: 2000,
    val2: 4000,
  },
  {
    name: "24-27",
    val1: 1800,
    val2: 6500,
  },
  {
    name: "27-30",
    val1: 8000,
    val2: 0,
  },
];

const data4 = [
  {
    name: "1-3",
    val1: 5000,
    val2: 400,
  },
  {
    name: "3-6",
    val1: 4200,
    val2: 3000,
  },
  {
    name: "6-9",
    val1: 600,
    val2: 0,
  },
  {
    name: "9-12",
    val1: 0,
    val2: 8000,
  },
  {
    name: "12-15",
    val1: 3200,
    val2: 1800,
  },
  {
    name: "15-18",
    val1: 700,
    val2: 0,
  },
  {
    name: "18-21",
    val1: 5000,
    val2: 3000,
  },
  {
    name: "21-24",
    val1: 2000,
    val2: 4000,
  },
  {
    name: "24-27",
    val1: 1800,
    val2: 6500,
  },
  {
    name: "27-30",
    val1: 8000,
    val2: 0,
  },
];

export const FinanceStats: React.FC = () => {
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
        <StatsList />
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
    val1: number;
    val2: number;
  }[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const sum1 = Math.round(data.reduce((sum, current) => sum + current.val1, 0));
  const sum2 = Math.round(data.reduce((sum, current) => sum + current.val2, 0));

  let arr: number[] = [];
  data.forEach((obj) => arr.push(obj.val1 + obj.val2));
  const gradient1 = strRandom();
  const gradient2 = strRandom();

  function getFormatNumbers(num: number) {
    const number = Math.round(num).toString();
    return number.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1, ");
  }

  return (
    <div className={styles.chart}>
      <div className={styles.chart__top}>
        <div className={styles.chart__left}>
          <span className={styles.chart__numbers}>
            {getFormatNumbers(sum1 + sum2)} ₴
          </span>
          <span className={styles.chart__text}>Заработано</span>
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
              id={gradient1}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientTransform="rotate(-90)"
            >
              <stop offset="5%" stopColor="#7037E5" />
              <stop offset="95%" stopColor="#9B58EE" />
            </linearGradient>
            <linearGradient
              id={gradient2}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientTransform="rotate(-90)"
            >
              <stop offset="5%" stopColor="#33D373" />
              <stop offset="95%" stopColor="#24A797" />
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
            type="number"
            domain={[0, "auto"]}
            fontSize={12}
            color="#7D7A83"
            fontWeight={500}
            orientation="right"
            tickCount={2}
            axisLine={false}
            tickLine={false}
            tickFormatter={(num) => `${getFormatNumbers(num)} ₴`}
            mirror={true}
          />
          <Bar
            radius={4}
            fill={`url(#${gradient1})`}
            stackId="a"
            dataKey="val1"
          />
          <Bar
            radius={4}
            fill={`url(#${gradient2})`}
            stackId="a"
            dataKey="val2"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className={styles.chart__bottom}>
        <div className={styles.chart__deposit}>
          <span className={styles.chart__line}></span>
          <span className={styles.chart__sum_text}>Пополнено</span>
          <span className={styles.chart__sum_value}>
            {getFormatNumbers(sum2)} ₴
          </span>
        </div>
        <div className={styles.chart__withdraw}>
          <span
            className={styles.chart__line + ` ${styles.chart__line_purple}`}
          ></span>
          <span className={styles.chart__sum_text}>Выведено</span>
          <span className={styles.chart__sum_value}>
            {getFormatNumbers(sum1)} ₴
          </span>
        </div>
      </div>
    </div>
  );
};

const StatsList: React.FC = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.list__item}>
        <FinancePieChart />
        <p className={styles.list__flex}>
          <span className={styles.list__info}>Оплачено</span>
          <span className={styles.list__value}>2000₴</span>
        </p>
      </li>
      <li className={styles.list__item}>
        <span className={styles.list__icon}>
          <svg width={18} height={18} viewBox="0 0 18 18">
            <use xlinkHref={`${sprite}#circle-part`} />
          </svg>
        </span>
        <p className={styles.list__flex}>
          <span className={styles.list__info}>Доход партнеров</span>
          <span className={styles.list__value}>12, 489₴</span>
        </p>
      </li>
    </ul>
  );
};

const pieData = [
  {
    name: "Вчера",
    value: 1,
  },
  {
    name: "Сегодня",
    value: 2,
  },
];

const FinancePieChart: React.FC = () => {
  const COLORS = ["rgba(255,255,255,0.2)", `url(#colorAbc)`];

  return (
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
        data={pieData}
      >
        {pieData.map((entry, index) => (
          <Cell
            strokeWidth={0}
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};
