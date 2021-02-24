import React from "react";
import { isValidDate } from "../utility";

interface ICItem {
  title: string;
  price: string;
  date: string;
}
export interface IProps {
  handleFormSubmit: ({ title, price, date }: ICItem, editMode: boolean) => void;
  handleFormCancel: () => void;
  item?: Record<string, any>;
}
interface IState {
  message: string;
  validDataPass: boolean;
}

class PriceForm extends React.Component<IProps, IState> {
  titleInput!: HTMLInputElement;
  priceInput!: HTMLInputElement;
  dateInput!: HTMLInputElement;
  constructor(props: IProps) {
    super(props);
    this.state = {
      validDataPass: true,
      message: "",
    };
  }
  checkValue = (e: React.FormEvent<HTMLFormElement>) => {
    const { item, handleFormSubmit } = this.props;
    const editMode = !!item?.id;
    const price = this.priceInput.value.trim();
    const date = this.dateInput.value.trim();
    const title = this.titleInput.value.trim();
    if (price && title && date) {
      if (Number(price) < 0) {
        this.setState({
          validDataPass: false,
          message: "价钱不能为负数",
        });
      } else if (!isValidDate(date)) {
        this.setState({
          validDataPass: false,
          message: "请填写正确的日期格式",
        });
      } else {
        this.setState({
          validDataPass: true,
          message: "",
        });
        if (editMode) {
          handleFormSubmit({ ...item, title, price, date }, editMode);
        } else {
          handleFormSubmit({ title, price, date }, editMode);
        }
      }
    } else {
      this.setState({
        validDataPass: false,
        message: "请填写必填项",
      });
    }
    e.preventDefault();
  };
  render() {
    const { validDataPass } = this.state;
    const title = this.props.item?.title;
    const price = this.props.item?.price;
    const date = this.props.item?.date;

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
              defaultValue={title}
              ref={(input: HTMLInputElement) => (this.titleInput = input)}
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
                defaultValue={price}
                ref={(input: HTMLInputElement) => (this.priceInput = input)}
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
              defaultValue={date}
              ref={(input: HTMLInputElement) => (this.dateInput = input)}
            />
          </div>
          <button type="submit" className="btn btn-primary submit-form mr-3">
            确认
          </button>
          <button
            type="button"
            className="btn btn-secondary submit-cancle"
            onClick={this.props.handleFormCancel}
          >
            关闭
          </button>
        </form>
        {!validDataPass && (
          <div className="alert alert-danger message mt-5" role="alert">
            {this.state.message}
          </div>
        )}
      </div>
    );
  }
}

export default PriceForm;
