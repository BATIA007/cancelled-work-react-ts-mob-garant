import React from "react";
import styles from "./calendar.module.scss";
import classnames from "classnames";
import * as calendar from "./indexCalendar";

interface Props {
  date: any;
  onChange: any;
  years: any;
  monthNames: any;
  weekDayNames: any;
  hadnleClick: any;
  selectDate: Date | null;
  endDate: Date;
  onChangeEnd: any;
}

export default class Calendar extends React.Component<Props> {
  static defaultProps = {
    date: new Date(),
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    weekDayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    onChange: Function.prototype,
    onChangeEnd: Function.prototype,
  };

  state: any = {
    date: this.props.date,
    endDate: this.props.endDate,
    currentDate: new Date(),
    selectedDate: this.props.selectDate,
  };

  get year() {
    return this.state.date.getFullYear();
  }

  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDate();
  }

  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1);

    this.setState({ date });
  };

  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1);

    this.setState({ date });
  };

  handleNextYearhButtonClick = () => {
    const date = new Date(this.year + 1, this.month);

    this.setState({ date });
  };

  handleDayClick = (date: any) => {
    if (this.state.selectedDate !== null && date < this.state.selectedDate) {
      this.setState({
        selectedDate: date,
        endDate: date,
      });
    } else {
      this.setState((prev: any) => ({
        endDate: prev.endDate.valueOf() === date.valueOf() ? new Date() : date,
        selectedDate:
          prev.endDate.valueOf() === date.valueOf() ? null : prev.selectedDate,
      }));

      if (this.state.selectedDate === null) {
        this.setState({ selectedDate: date });
      }
    }
  };

  handleClick = this.props.hadnleClick;

  componentDidMount() {
    setTimeout(() => document.addEventListener("click", this.handleClick), 300);
  }

  componentDidUpdate() {
    this.props.onChange(this.state.selectedDate);
    this.props.onChangeEnd(this.state.endDate);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  render() {
    const { years, monthNames, weekDayNames } = this.props;
    const { currentDate, selectedDate, endDate } = this.state;

    const monthData = calendar.getMonthData(this.year, this.month);

    return (
      <div className={styles.calendar + " calendar"}>
        <header>
          <div className={styles.calendar__flex}>
            <span className={styles.calendar__month}>
              {monthNames[this.month]} {this.year}
            </span>
            <button
              onClick={this.handleNextYearhButtonClick}
              className={styles.calendar__year_next}
            ></button>
          </div>
          <div>
            <button
              className={styles.button__prev}
              onClick={this.handlePrevMonthButtonClick}
            ></button>
            <button
              className={styles.button__next}
              onClick={this.handleNextMonthButtonClick}
            ></button>
          </div>
        </header>

        <table>
          <thead>
            <tr>
              {weekDayNames.map((name: any) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {monthData.map((week: any, index: any) => (
              <tr key={index} className={styles.week}>
                {week.map((date: any, index: any) =>
                  date ? (
                    <td
                      key={index}
                      className={classnames(styles.day, {
                        disable:
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate()
                          ).valueOf() <
                          new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate()
                          ).valueOf(),
                        selected:
                          date >= selectedDate &&
                          date <= endDate &&
                          selectedDate !== null
                            ? true
                            : false,
                      })}
                      onClick={() =>
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          currentDate.getDate()
                        ).valueOf() >=
                        new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate()
                        ).valueOf()
                          ? this.handleDayClick(date)
                          : null
                      }
                    >
                      {date.getDate()}
                    </td>
                  ) : (
                    <td key={index} />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
