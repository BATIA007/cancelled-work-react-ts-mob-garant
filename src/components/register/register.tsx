import styles from "./register.module.scss";
import sprite from "../../assets/images/sprite.svg";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const Register1: React.FC = () => {
  return (
    <div className={styles.register + " page"}>
      <div className={styles.register__wrapper + " wrapper"}>
        <div className={styles.register__center}>
          <h1 className={styles.register__title}>
            <svg width={257} height={67} viewBox="0 0 171 45">
              <use xlinkHref={`${sprite}#logo`} />
            </svg>
          </h1>
          <p className={styles.register__subtitle}>
            Территория безопасных сделок
          </p>
        </div>
        <Link to="/register/phone">
          <Button w={14} h={19} icon="phone" text="Войти по номеру телефона" />
        </Link>
      </div>
    </div>
  );
};

export const Register2: React.FC = () => {
  const [disable, setDisable] = useState<boolean>(true);
  const buttonProps = { w: 18, h: 18, icon: "message", text: "Получить код" };

  return (
    <div className={styles.login + " page"}>
      <div className={styles.login__wrapper + " wrapper"}>
        <Arrow link="/register" />
        <h1 className={styles.login__title + " title"}>
          Вход в <span className="purpure">garant</span>
        </h1>
        <p className={styles.login__subtitle}>
          Введите свой номер и мы отправим вам проверочный код.
        </p>
        <div className={styles.login__form}>
          <div className={styles.login__fieldset}>
            <SelectList />
            <CustomInput
              handleDisable={(isDisable: boolean) => setDisable(isDisable)}
            />
          </div>
        </div>
        {disable ? (
          <Button {...buttonProps} />
        ) : (
          <Link to="/register/phone/code">
            <Button {...buttonProps} />
          </Link>
        )}
      </div>
    </div>
  );
};

const phoneNumbers = [38, 375, 7];

interface stateParams {
  isOpen: boolean;
  activePhone: number;
}

const SelectList: React.FC = () => {
  const [open, setOpen] = useState<stateParams>({
    isOpen: false,
    activePhone: 38,
  });

  return (
    <div
      onClick={() =>
        setOpen((prev) => ({
          isOpen: !prev.isOpen,
          activePhone: prev.activePhone,
        }))
      }
      className={
        styles.login__select_container +
        ` ${open.isOpen ? styles.login__select_active : ""}`
      }
    >
      <span className={styles.login__input_info}>Страна</span>
      <ul className={styles.login__select}>
        <li
          className={styles.login__option + " " + styles.login__option_active}
        >
          +{open.activePhone}
        </li>
        {phoneNumbers.map((link) => (
          <SelectLink
            key={link}
            num={link}
            handleClick={(num: number) =>
              setOpen((prev) => ({ isOpen: !prev.isOpen, activePhone: num }))
            }
          />
        ))}
      </ul>
    </div>
  );
};

interface SelectLinkProps {
  num: number;
  handleClick: Function;
}

const SelectLink: React.FC<SelectLinkProps> = ({ num, handleClick }) => {
  function clickHandle(event: any) {
    handleClick(num);
    event?.stopPropagation();
  }

  return (
    <li onClick={clickHandle} className={styles.login__option}>
      +{num}
    </li>
  );
};

function normalizePhoneNumber(value: string, isDelete: boolean) {
  if (value.length === 3 || value.length === 7 || value.length === 10) {
    if (isDelete) {
      return value.slice(0, value.length - 1);
    }
    return value + "-";
  }
  return value.replace(/[^0-9-]/g, "");
}

interface CustomInputProps {
  handleDisable: Function;
}

const CustomInput: React.FC<CustomInputProps> = ({ handleDisable }) => {
  const lineRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");

  function handleFocus() {
    if (lineRef.current) {
      lineRef.current.classList.add("input-line-active");
    }
  }

  function handleBlur() {
    if (lineRef.current) {
      lineRef.current.classList.remove("input-line-active");
    }
  }

  function handleChange(event: any) {
    const { value } = event.target;
    const isDelete: boolean = event.nativeEvent.data === null ? true : false;
    setValue(normalizePhoneNumber(value, isDelete));
    value.length === 13 ? handleDisable(false) : handleDisable(true);
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={styles.login__input_container}
    >
      <span className={styles.login__input_info}>Номер телефона</span>
      <input
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="000-000-00-00"
        inputMode="numeric"
        type="tel"
        maxLength={13}
        onChange={handleChange}
        value={value}
        className={styles.login__number}
      />
      <span ref={lineRef} className="input-line"></span>
    </div>
  );
};

export const Register3: React.FC = () => {
  return (
    <div className={styles.checking + " page"}>
      <div className={styles.checking__wrapper + " wrapper"}>
        <Arrow link="/register/phone" />
        <h1 className={styles.checking__title + " title"}>
          Введите 4–значный код
        </h1>
        <p className={styles.checking__subtitle}>
          Пожалуйста, введите код, который мы отправили вам на номер +38 0** ***
          *2 85
        </p>
        <InputGroups />
        <p className={styles.checking__more}>
          Не пришел код?{" "}
          <Link to="/profile">
            <span className={styles.checking__span}>Отправить заново</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

const InputGroups: React.FC = () => {
  const [isFocus, setFocus] = useState<number>(0);

  function handleChange(event: any) {
    const { value } = event.target;
    if (/\d/.test(value)) {
      setFocus(isFocus + 1);
    } else {
      event.target.value = "";
    }
  }

  return (
    <div className={styles.checking__group}>
      <CustomInputCode isFocus={0} handleChange={handleChange} />
      <CustomInputCode
        isFocus={isFocus === 1 ? true : false}
        handleChange={handleChange}
      />
      <CustomInputCode
        isFocus={isFocus === 2 ? true : false}
        handleChange={handleChange}
      />
      <CustomInputCode
        isFocus={isFocus === 3 ? true : false}
        handleChange={handleChange}
      />
    </div>
  );
};

interface InputCodeProps {
  isFocus: boolean | number;
  handleChange: ChangeEventHandler;
}

const CustomInputCode: React.FC<InputCodeProps> = ({
  isFocus,
  handleChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isFocus === 0) {
      setTimeout(() => {
        inputRef.current?.focus();
        lineRef.current?.classList.add("input-line-active");
      }, 400);
    } else if (isFocus) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isFocus]);

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={styles.checking__input_container}
    >
      <input
        type="tel"
        onChange={handleChange}
        maxLength={1}
        inputMode="numeric"
        onBlur={() => lineRef.current?.classList.remove("input-line-active")}
        onFocus={() => lineRef.current?.classList.add("input-line-active")}
        className={styles.checking__input}
        ref={inputRef}
      />
      <span ref={lineRef} className="input-line"></span>
    </div>
  );
};

interface ArrowProps {
  link: string;
}

export const Arrow: React.FC<ArrowProps> = ({ link }) => {
  return (
    <Link to={link}>
      <span className="arrow">
        <svg width="20" height="22">
          <use xlinkHref={`${sprite}#arrow`} />
        </svg>
      </span>
    </Link>
  );
};

interface ButtonProps {
  w: number;
  h: number;
  icon: string;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ w, h, icon, text }) => {
  return (
    <button className={styles.register__button + " button"}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
        <use xlinkHref={`${sprite}#${icon}`} />
      </svg>
      <span className="button-text">{text}</span>
    </button>
  );
};
