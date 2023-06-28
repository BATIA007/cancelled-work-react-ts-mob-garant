import styles from "./history.module.scss";
import sprite from "../../../assets/images/svg/sprite.svg";

const history = [
  {
    replenish: true,
    money: "21, 500₽",
    card: "2819",
    date: "5 янв",
    time: "02:26",
  },
  {
    replenish: false,
    money: "125, 300₽",
    card: "2819",
    date: "31 дек",
    time: "01:18",
  },
  {
    replenish: true,
    money: "1, 000$",
    card: "2819",
    date: "21 ноя",
    time: "00:41",
  },
  {
    replenish: false,
    money: "11, 250₽",
    card: "2819",
    date: "24 окт",
    time: "23:28",
  },
  {
    replenish: true,
    money: "5, 500₴",
    card: "2819",
    date: "11 окт",
    time: "22:29",
  },
  {
    replenish: true,
    money: "21, 500₽",
    card: "2819",
    date: "5 янв",
    time: "21:26",
  },
  {
    replenish: false,
    money: "125, 300₽",
    card: "2819",
    date: "31 дек",
    time: "20:18",
  },
  {
    replenish: true,
    money: "1, 000$",
    card: "2819",
    date: "21 ноя",
    time: "19:41",
  },
  {
    replenish: false,
    money: "11, 250₽",
    card: "2819",
    date: "24 окт",
    time: "18:28",
  },
  {
    replenish: true,
    money: "5, 500₴",
    card: "2819",
    date: "11 окт",
    time: "17:29",
  },
  {
    replenish: true,
    money: "21, 500₽",
    card: "2819",
    date: "5 янв",
    time: "16:26",
  },
  {
    replenish: false,
    money: "125, 300₽",
    card: "2819",
    date: "31 янв",
    time: "15:18",
  },
  {
    replenish: true,
    money: "1, 000$",
    card: "2819",
    date: "21 ноя",
    time: "14:41",
  },
  {
    replenish: false,
    money: "11, 250₽",
    card: "2819",
    date: "24 окт",
    time: "13:28",
  },
  {
    replenish: true,
    money: "5, 500₴",
    card: "2819",
    date: "11 окт",
    time: "12:29",
  },
];

export const InvestHistory: React.FC = () => {
  return (
    <div className={styles.history}>
      <div className={styles.history__wrapper + " wrapper"}>
        <ul className={styles.history__list}>
          {history.map((data) => (
            <li key={data.time} className={styles.history__link}>
              <span
                className={
                  styles.history__icon +
                  ` ${data.replenish ? null : styles.history__icon_withdraw}`
                }
              >
                <svg width="12" height="13" viewBox="0 0 17 18">
                  <use xlinkHref={`${sprite}#add`} />
                </svg>
              </span>
              <div className={styles.history__withdraw}>
                <span className={styles.history__money}>
                  {data.replenish ? "+" : "-"} {data.money}
                </span>
                <span className={styles.history__card}>
                  с карты **{data.card}
                </span>
              </div>
              <time
                dateTime="2021-01-05 16:26"
                className={styles.history__from}
              >
                <span className={styles.history__date}>{data.date}</span>
                <span className={styles.history__time}>{data.time}</span>
              </time>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
