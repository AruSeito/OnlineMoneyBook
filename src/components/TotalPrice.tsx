import React from "react";

export interface IProps {
  income: number;
  outcome: number;
}

const TotalPrice: React.FC<IProps> = ({ income = 0, outcome = 0 }) => {
  return (
    <div className="row">
      <div className="col">
        <h5 className="income">
          收入: <span>{income}</span>
        </h5>
      </div>
      <div className="col">
        <h5 className="outcome">
          支出: <span>{outcome}</span>
        </h5>
      </div>
    </div>
  );
};

export default TotalPrice;
