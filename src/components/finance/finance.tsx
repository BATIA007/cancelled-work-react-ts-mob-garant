import styles from "./finance.module.scss";
import sprite from "../../assets/images/svg/sprite.svg";

import React from "react";
import { NavLink } from "react-router-dom";

export const Finance: React.FC = () => {
  return (
    <header className={styles.finance}>
      <div className={styles.finance__wrapper + " wrapper"}>
        <svg
          style={{ position: "absolute", top: "-500px" }}
          width={0}
          height={0}
          fill="none"
          viewBox="0 0 0 0"
        >
          <defs>
            <linearGradient id="colorAbc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#33D373" />
              <stop offset="95%" stopColor="#24A797" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.finance__container}>
          <h1 className={styles.finance__title + " title"}>Финансы</h1>
          <div className={styles.finance__balance}>
            <div className={styles.finance__left}>
              <span className={styles.finance__grn}>78,460.99₴</span>
              <p className={styles.finance__convert}>
                2,790.45$
                <span className={styles.finance__rubles}>209, 280₽</span>
              </p>
            </div>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              className={styles.finance__right}
            >
              <use xlinkHref={`${sprite}#balance`} />
            </svg>
          </div>
        </div>
      </div>
      <FinanceNav />
    </header>
  );
};

const FinanceNav: React.FC = () => {
  function setActive({ isActive }: { isActive: boolean }) {
    return isActive
      ? `${styles.nav__item} ${styles.nav__item_active}`
      : styles.nav__item;
  }
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/finance/deposit">
            Пополнить
          </NavLink>
        </li>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/finance/withdraw">
            Вывести
          </NavLink>
        </li>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/finance/history">
            История
          </NavLink>
        </li>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/finance/stats">
            Статистика
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
