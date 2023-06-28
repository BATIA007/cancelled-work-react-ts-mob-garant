import styles from "./profile.module.scss";
import avatar from "../../assets/images/profile/avatar.png";
import bank from "../../assets/images/profile/bank.png";
import sprite from "../../assets/images/svg/sprite.svg";
import prize from "../../assets/images/profile/prize.png";
import { NavLink } from "react-router-dom";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export const Profile: React.FC = () => {
  return (
    <div className={styles.profile + " page"}>
      <div className={styles.profile__wrapper + " wrapper"}>
        <Avatar />
        <h1 className={styles.profile__name + " title"}>Арсен Березовский</h1>
        <ReferalButton />
        <Information />
        <Verification />
        <FooterProfile />
      </div>
    </div>
  );
};

const Avatar: React.FC = () => {
  const isAvatar: boolean = false;
  return (
    <div className={styles.profile__avatar}>
      {isAvatar ? (
        <img src={avatar} alt="avatar" className={styles.profile__image} />
      ) : (
        <span className={styles.profile__non_avatar}>
          <svg width={25} height={24}>
            <use xlinkHref={`${sprite}#camera`} />
          </svg>
        </span>
      )}
    </div>
  );
};

const Information: React.FC = () => {
  const [isEdit, setEdit] = useState<boolean>(false);

  return (
    <div className={styles.info}>
      <div className={styles.info__top}>
        <span className={styles.info__text}>Личная информация</span>
        <button
          onClick={() => setEdit(!isEdit)}
          className={
            styles.info__button + ` ${isEdit ? styles.info__button_active : ""}`
          }
        >
          {isEdit ? "Сохранить" : "Изменить"}
        </button>
      </div>
      <div className={styles.info__main}>
        <CustomInput
          readonly={!isEdit}
          text="Имя"
          type="text"
          defaultValue="Арсен"
        />
        <CustomInput
          readonly={!isEdit}
          text="Фамлия"
          type="text"
          defaultValue="Березовский"
        />
        <CustomInput
          readonly={!isEdit}
          text="Отчество"
          type="text"
          defaultValue="Сергеевич"
        />
        <CustomInput
          readonly={!isEdit}
          text="Email"
          type="email"
          defaultValue="arsenberezovski44@gmail.com"
        />
        <CustomInput
          readonly={!isEdit}
          text="Номер телефона"
          type="tel"
          defaultValue="+38 0** *** ** 85"
        />
      </div>
    </div>
  );
};

interface CustomInputProps {
  text: string;
  type: string;
  defaultValue: string;
  readonly: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  text,
  type,
  defaultValue,
  readonly,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setFocus] = useState<boolean>(false);

  return (
    <div
      onClick={() => (readonly ? null : inputRef.current?.focus())}
      className={
        styles.input__container +
        ` ${isFocus ? styles.input__container_focus : ""}`
      }
    >
      <span className={styles.input__text}>{text}</span>
      <input
        ref={inputRef}
        readOnly={readonly}
        defaultValue={defaultValue}
        type={type}
        onFocus={() => (readonly ? null : setFocus(true))}
        onBlur={() => (readonly ? null : setFocus(false))}
        className={styles.input__enter}
      />
    </div>
  );
};

const Verification: React.FC = () => {
  return (
    <div className={styles.verif}>
      <h2 className={styles.verif__title}>
        <span className={styles.verif__icon}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <use xlinkHref={`${sprite}#face-id`} />
          </svg>
        </span>
        Верификация
      </h2>
      <p className={styles.verif__subtitle}>
        Она нужна, чтобы получить возможность пользоваться нашим сервисом
        наполную.
      </p>
      <ul className={styles.verif__list}>
        <li className={styles.verif__item}>
          <span className={styles.verif__bank}></span>
          <span className={styles.verif__text}>Сервис</span>
        </li>
        <li className={styles.verif__item}>
          <span className={styles.verif__bank}>
            <img className={styles.verif__image} src={bank} alt="bank" />
          </span>
          <span className={styles.verif__text}>Bank ID</span>
        </li>
      </ul>
    </div>
  );
};

const ReferalButton: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const el: any = document.querySelector(".page")?.parentElement;
    if (el) {
      isOpen ? (el.style.overflowY = "hidden") : (el.style.overflowY = "auto");
    }
  }, [isOpen]);

  return (
    <>
      <Button
        w={18}
        h={18}
        icon="prize"
        text="Пригласите друга, получите по 50₴!"
        dopClass={styles.referal__button}
        handleClick={() => setOpen(true)}
      />
      <CSSTransition
        in={isOpen}
        unmountOnExit
        classNames="fade-in"
        timeout={400}
      >
        <Referal handleClose={() => setOpen(false)} />
      </CSSTransition>
    </>
  );
};

interface ReferalProps {
  handleClose: MouseEventHandler;
}

const Referal: React.FC<ReferalProps> = ({ handleClose }) => {
  const codeRef = useRef<HTMLInputElement>(null);
  const [isCopyed, setCopy] = useState<boolean>(false);

  function copyCode() {
    if (codeRef.current) {
      codeRef.current.select();
      codeRef.current.setSelectionRange(0, 99999);
      document.execCommand("copy");
      codeRef.current.value += " ";
      codeRef.current.value = codeRef.current.value.slice(0, -1);
      setCopy(true);
    }
  }

  return (
    <div className={styles.referal}>
      <div className={styles.referal__wrapper}>
        <button
          onClick={handleClose}
          className={styles.referal__close}
        ></button>
        <div className={styles.referal__prize}>
          <img src={prize} alt="prize" className={styles.referal__image} />
        </div>
        <h3 className={styles.referal__title}>Подари себе и другу по 50₴!</h3>
        <p className={styles.referal__subtitle}>
          Отправьте другу промокод и он получит скидку 50₴ на оплату подписки
          или задания, а вы 50₴ на счет!
        </p>
        <div className={styles.referal__bottom}>
          <div className={styles.referal__copy}>
            <span className={styles.referal__code}>
              <input
                readOnly
                defaultValue="fp4760883"
                ref={codeRef}
                className={styles.referal__code_text}
              />
            </span>
            <button onClick={copyCode} className={styles.referal__button_copy}>
              {isCopyed ? (
                <>
                  <svg
                    fill="#ffffff"
                    stroke="#ffffff"
                    style={{ marginRight: 12 }}
                    width={14}
                    height={10}
                    viewBox="0 0 14 10"
                  >
                    <use xlinkHref={`${sprite}#nice`} />
                  </svg>
                  Готово
                </>
              ) : (
                "Копировать"
              )}
            </button>
          </div>
          <div className={styles.referal__rule}>
            <span className={styles.referal__rules}>
              Правила начисления 50₴
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FooterProfile: React.FC = () => {
  return (
    <>
      <FooterProfileNav />
      <p className={styles.nav__copyright}>
        Garant Inc. Политика Конфиденциальности и Условия Пользовния.
      </p>
      <ul className={styles.nav__socials}>
        <li className={styles.nav__social}>
          <a href="https://www.instagram.com/" target="_blank">
            <svg width={25} height={26} viewBox="0 0 25 26" fill="#7D7A83">
              <use xlinkHref={`${sprite}#instagram`} />
            </svg>
          </a>
        </li>
        <li className={styles.nav__social}>
          <a href="https://www.facebook.com/" target="_blank">
            <svg width={25} height={24} viewBox="0 0 25 24" fill="#7D7A83">
              <use xlinkHref={`${sprite}#facebook`} />
            </svg>
          </a>
        </li>
      </ul>
    </>
  );
};

const FooterProfileNav: React.FC = () => {
  function setActive({ isActive }: { isActive: boolean }) {
    return isActive
      ? `${styles.nav__item} ${styles.nav__item_active}`
      : styles.nav__item;
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/profile/about">
            О сервисе
          </NavLink>
        </li>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/profile/help">
            Вопросы и поддержка
          </NavLink>
        </li>
        <li className={styles.nav__link}>
          <NavLink className={setActive} to="/">
            Выйти из аккаунта
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

interface ButtonProps {
  w: number;
  h: number;
  icon: string;
  text: string;
  dopClass?: string;
  handleClick?: MouseEventHandler;
}

export const Button: React.FC<ButtonProps> = ({
  w,
  h,
  icon,
  text,
  dopClass,
  handleClick,
}) => {
  return (
    <button onClick={handleClick} className={`button ${dopClass}`}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
        <use xlinkHref={`${sprite}#${icon}`} />
      </svg>
      <span className="button-text">{text}</span>
    </button>
  );
};
