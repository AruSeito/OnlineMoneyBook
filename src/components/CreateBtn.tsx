import React from "react";

interface IProps {
  addItem: () => void;
}

const CreateBtn: React.FC<IProps> = ({ addItem: handleClickAdd }) => {
  return (
    <button
      type="button"
      className="btn btn-primary btn-block"
      onClick={() => {
        handleClickAdd();
      }}
    >
      创建一条新的记录
    </button>
  );
};

export default CreateBtn;
