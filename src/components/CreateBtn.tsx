import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  addItem: () => void;
}

const CreateBtn: React.FC<IProps> = ({ addItem: handleClickAdd }) => {
  return (
    <Link to="/create">
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={() => {
          handleClickAdd();
        }}
      >
        创建一条新的记录
      </button>
    </Link>
  );
};

export default CreateBtn;
