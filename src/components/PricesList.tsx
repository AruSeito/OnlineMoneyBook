import React from "react";
import { Link } from "react-router-dom";
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
          <span className="col-1 badge badge-primary ">
            <i className={`fa ${item.category.iconName} itemIcon`}></i>
          </span>
          <span className="col-5">{item.title}</span>
          <span className="col-2 font-weight-bold">{`${
            item.category.type === "income" ? "+" : "-"
          }${item.price}元`}</span>
          <span className="col-2">{item.date}</span>

          <Link
            to={`/editor/${item.id}`}
            onClick={() => {
              handleChangeItem(item);
            }}
          >
            <i className="fa fa-pencil"></i>
          </Link>
          <a
            href="#"
            onClick={() => {
              handleDelItem(item);
            }}
          >
            <i className="fa fa-trash"></i>
          </a>
        </li>
      ))}
    </ul>
  );
};
export default PricesList;
