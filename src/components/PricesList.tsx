import React from "react";
interface ICategory {
  id: string;
  name: string;
  type: "income" | "outcome";
  iconName: string;
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

const PricesList: React.FC<IProps> = ({
  items,
  handleChangeItem,
  handleDelItem,
}) => {
  return (
    <ul className="list-group list-group-flush">
      {items.map((item) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={item.id}
        >
          <span className="col-1 badge badge-primary">
            <i className={`fa ${item.category.iconName}`}></i>
          </span>
          <span className="col-5">{item.title}</span>
          <span className="col-2 font-weight-bold">{`${
            item.category.type === "income" ? "+" : "-"
          }${item.price}元`}</span>
          <span className="col-2">{item.date}</span>

          <i
            className="fa fa-pencil"
            onClick={() => {
              handleChangeItem(item);
            }}
          />
          <i
            className="fa fa-trash"
            onClick={() => {
              handleDelItem(item);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
export default PricesList;
