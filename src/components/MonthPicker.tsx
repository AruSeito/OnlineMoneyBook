import React from "react";

interface IState {
  isOpend: boolean;
  selectedYear: number;
  selectedMonth: number;
}

class MonthPicker extends React.Component<any, IState> {
  ref: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      isOpend: false,
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
    };
    this.ref = React.createRef();
  }
  FormatMonth = (month: number) => {
    return month < 10 ? `0${month}` : month;
  };
  rangYearOrMonth = (number: number, start: number) => {
    const arr: Array<number> = [];
    for (let i = 0; i < number; i++) {
      arr.push(start + i);
    }
    return arr;
  };
  handleChangeYear = (e: any, year: number) => {
    e.preventDefault();
    this.setState({
      selectedYear: year,
      selectedMonth: 0,
    });
  };
  handleChangeMonth = (e: any, month: number) => {
    e.preventDefault();
    this.setState({
      isOpend: false,
      selectedMonth: month,
    });
  };
  handleDropDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.setState({
      isOpend: !this.state.isOpend,
    });
  };
  componentDidMount() {
    document.addEventListener("click", this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }
  handleClick = (event: any) => {
    const node = this.ref.current as HTMLDivElement;
    if (node.contains(event.target)) {
      return;
    }
    this.setState({
      isOpend: false,
    });
  };
  render() {
    const { isOpend, selectedMonth, selectedYear } = this.state;
    const monthRange = this.rangYearOrMonth(12, 1);
    const yearRange = this.rangYearOrMonth(9, -4).map(
      (value) => value + selectedYear
    );
    return (
      <div className="dropdown month-picker" ref={this.ref}>
        <h4>选择月份</h4>
        <button
          className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={this.handleDropDown}
        >
          {selectedYear}年
          {selectedMonth ? this.FormatMonth(selectedMonth) : "--"}月
        </button>
        {isOpend && (
          <div className="dropdown" style={{ display: "block" }}>
            <div className="row">
              <div className="col-2 border-right">
                {yearRange.map((yearNum, index) => (
                  <a
                    key={index}
                    href="#"
                    className={
                      yearNum === selectedYear
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={(e) => {
                      this.handleChangeYear(e, yearNum);
                    }}
                  >
                    {yearNum}年
                  </a>
                ))}
              </div>
              <div className="col-2">
                {monthRange.map((monthNum, index) => (
                  <a
                    key={index}
                    href="#"
                    className={
                      monthNum === selectedMonth
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={(e) => {
                      this.handleChangeMonth(e, monthNum);
                    }}
                  >
                    {monthNum}月
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MonthPicker;
