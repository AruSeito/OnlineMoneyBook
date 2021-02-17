import React from "react";

interface IProps {
  addItem: () => void;
}

const CreateBtn = (props: IProps) => {
  const { addItem: handleClickAdd } = props;
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        handleClickAdd();
      }}
    >
      创建一条新的记录
    </button>
  );
};

export default CreateBtn;
