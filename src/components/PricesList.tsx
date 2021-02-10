import React from "react";

interface ICategory {
  id: string;
  name: string;
  type: "income" | "outcome";
}

export interface IItem {
  id: string;
  title: string;
  price: number;
  date: string;
  category: ICategory;
}
interface IProps {
  items: Array<IItem>;
  handleChangeItem: (item: IItem) => void;
  handleDelItem: (item: IItem) => void;
}

const PricesList = (props: IProps) => {
  const { items, handleChangeItem, handleDelItem } = props;
  return (
    <ul className="list-group list-group-flush">
      {items.map((item) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={item.id}
        >
          <span className="col-1 badge badge-primary">
            {item.category.name}
          </span>
          <span className="col-5">{item.title}</span>
          <span className="col-2 font-weight-bold">{`${
            item.category.type === "income" ? "+" : "-"
          }${item.price}`}</span>
          <span className="col-2">{item.date}</span>
          <button
            className="col-1 btn btn-primary"
            onClick={() => {
              handleChangeItem(item);
            }}
          >
            编辑
          </button>
          <button
            className="col-1 btn btn-danger"
            onClick={() => {
              handleDelItem(item);
            }}
          >
            删除
          </button>
        </li>
      ))}
    </ul>
  );
};
export default PricesList;
