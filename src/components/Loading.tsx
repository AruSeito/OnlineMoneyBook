import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="loading-component text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">加载中......</span>
      </div>
    </div>
  );
};

export default Loading;
