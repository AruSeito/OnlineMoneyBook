import React from "react";
import { category } from "./CategorySelector";

export interface IProps {
  handleFormSubmit: () => void;
  handleCancelSubmit: () => void;
  item?: category;
}
interface IState {
  title?: string;
  price?: string;
  date?: string;
  message?: string;
  validDataPass?: boolean;
}

class PriceForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      validDataPass: true,
      message: "",
    };
  }
  handleTitleChange = (value: string) => {
    this.setState({
      title: value,
    });
  };
  handlePriceChange = (value: string) => {
    this.setState({
      price: value,
    });
  };
  handleDateChange = (value: string) => {
    this.setState({
      date: value,
    });
  };
  checkValue = (e: React.FormEvent<HTMLFormElement>) => {
    const { title, price, date } = this.state;
    if (
      title &&
      title.length > 0 &&
      price &&
      price.length > 0 &&
      date &&
      date.length > 0
    ) {
      this.setState({
        validDataPass: true,
      });
      this.props.handleFormSubmit();
    } else {
      this.setState({
        validDataPass: false,
        message: "请填充必填项",
      });
    }
    e.preventDefault();
  };
  render() {
    const { validDataPass } = this.state;
    return (
      <div>
        <form onSubmit={this.checkValue}>
          <div className="form-group">
            <label htmlFor="title">* 标题</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="请输入标题"
              value={this.state.title}
              onChange={(e) => {
                this.handleTitleChange(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">* 金额</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">¥</span>
              </div>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="请输入金额"
                value={this.state.price}
                onChange={(e) => {
                  this.handlePriceChange(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="date">* 日期</label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="请输入日期"
              value={this.state.date}
              onChange={(e) => {
                this.handleDateChange(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary submit-form">
            确认
          </button>
          <button type="button" className="btn btn-secondary submit-cancle">
            关闭
          </button>
        </form>
        {!validDataPass && (
          <div className="alert alert-danger message" role="alert">
            {this.state.message}
          </div>
        )}
      </div>
    );
  }
}

export default PriceForm;
