import { NavLink } from "react-router-dom";
import styles from "./invest.module.scss";

export const Invest: React.FC = () => {
  return (
    <header className={styles.invest}>
      <svg
        width={0}
        height={0}
        fill="none"
        style={{ position: "absolute", top: "-500px" }}
      >
        <defs>
          <linearGradient id="colorQwe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#33D373" />
            <stop offset="95%" stopColor="#24A797" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.invest__wrapper + " wrapper"}>
        <h1 className={styles.invest__title + " title"}>Инвестиции</h1>
      </div>
      <InvestNav />
    </header>
  );
};

const InvestNav: React.FC = () => {
  function setActive({ isActive }: { isActive: boolean }) {
    return isActive
      ? `${styles.nav__item} ${styles.nav__item_active}`
      : styles.nav__item;
  }
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/invest/stats">
            Статистика
          </NavLink>
        </li>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/invest/plans">
            Покупка юнитов
          </NavLink>
        </li>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/invest/withdraw">
            Вывести
          </NavLink>
        </li>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/invest/history">
            История
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
