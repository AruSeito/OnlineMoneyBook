import React from "react";

interface IProps {
  income: number;
  outcome: number;
}

const TotalPrice = (props: IProps) => {
  const { income, outcome } = props;
  return (
    <div className="d-flex justify-content-between align-items-center">
      <span>收入: {income ? income : "-"}</span>
      <span>支出: {outcome ? outcome : "-"}</span>
    </div>
  );
};

export default TotalPrice;
