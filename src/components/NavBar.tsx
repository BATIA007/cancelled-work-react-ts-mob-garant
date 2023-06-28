import { NavLink, Outlet, useLocation } from "react-router-dom";
import sprite from "../assets/images/svg/sprite.svg";
import styles from "./NavBar.module.scss";

export const FooterNav: React.FC = () => {
  function setActive({ isActive }: { isActive: boolean }) {
    return isActive
      ? `${styles.footer__item} ${styles.footer__item_active}`
      : styles.footer__item;
  }

  const location = useLocation();

  return (
    <>
      <Outlet />
      <footer className={styles.footer}>
        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__link}>
              <NavLink className={setActive} to="/deals">
                <svg
                  className={styles.footer__icon}
                  width={19}
                  height={20}
                  viewBox="0 0 19 20"
                  fill="#7D7A83"
                >
                  <use xlinkHref={`${sprite}#deals`} />
                </svg>
                <span className={styles.footer__text}>Сделки</span>
              </NavLink>
            </li>
            <li className={styles.footer__link}>
              <NavLink
                className={
                  location.pathname.includes("/finance")
                    ? `${styles.footer__item} ${styles.footer__item_active}`
                    : styles.footer__item
                }
                to="/finance/deposit"
              >
                <svg
                  className={styles.footer__icon}
                  width={21}
                  height={18}
                  viewBox="0 0 21 18"
                  fill="#7D7A83"
                >
                  <use xlinkHref={`${sprite}#finance`} />
                </svg>
                <span className={styles.footer__text}>Финансы</span>
              </NavLink>
            </li>
            <li className={styles.footer__link}>
              <NavLink
                className={
                  location.pathname.includes("/invest")
                    ? `${styles.footer__item} ${styles.footer__item_active}`
                    : styles.footer__item
                }
                to="/invest/stats"
              >
                <svg
                  className={styles.footer__icon}
                  width={21}
                  height={20}
                  viewBox="0 0 21 20"
                  fill="#7D7A83"
                >
                  <use xlinkHref={`${sprite}#invest`} />
                </svg>
                <span className={styles.footer__text}>Инвестиции</span>
              </NavLink>
            </li>
            <li className={styles.footer__link}>
              <NavLink className={setActive} to="/profile">
                <svg
                  className={styles.footer__icon}
                  width={21}
                  height={20}
                  viewBox="0 0 21 20"
                  fill="#7D7A83"
                >
                  <use xlinkHref={`${sprite}#profile`} />
                </svg>
                <span className={styles.footer__text}>Профиль</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};
