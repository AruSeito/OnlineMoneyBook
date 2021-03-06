import React from "react";
import { FormatMonth } from "../utility";

interface IState {
  isOpend: boolean;
  selectedYear: number;
}
interface IProps {
  year: number;
  month: number;
  changeDate: (year: number, month: number) => void;
}
class MonthPicker extends React.Component<IProps, IState> {
  ref: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpend: false,
      selectedYear: this.props.year,
    };
    this.ref = React.createRef();
  }

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
    });
  };
  handleChangeMonth = (e: any, month: number) => {
    e.preventDefault();
    this.setState({
      isOpend: false,
    });
    this.props.changeDate(this.state.selectedYear, month);
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
    const { year, month } = this.props;
    const { isOpend, selectedYear } = this.state;
    const monthRange = this.rangYearOrMonth(12, 1);
    const yearRange = this.rangYearOrMonth(9, -4).map(
      (value) => value + selectedYear
    );
    return (
      <div className="dropdown month-picker-component" ref={this.ref}>
        <h4>选择月份</h4>
        <button
          className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={this.handleDropDown}
        >
          {selectedYear}年{FormatMonth(month)}月
        </button>
        {isOpend && (
          <div className="dropdown-menu" style={{ display: "block" }}>
            <div className="row">
              <div className="col border-right years-range">
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
              <div className="col months-range">
                {monthRange.map((monthNum, index) => (
                  <a
                    key={index}
                    href="#"
                    className={
                      monthNum === month
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
