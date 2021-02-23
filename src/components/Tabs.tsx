import React from "react";

interface IState {
  activeIndex: number;
}

interface IProps {
  children: React.ReactElement | Array<React.ReactElement>;
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export class Tabs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
  }
  handleChangeTab = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    this.setState({
      activeIndex: index,
    });
    this.props.onTabChange(index);
  };
  render() {
    const { children } = this.props;
    const { activeIndex } = this.state;
    return (
      <ul className="nav nav-tabs nav-fill my-4">
        {React.Children.map(children, (child, index) => {
          const activeClassName =
            activeIndex === index ? "nav-link active" : "nav-link";
          return (
            <li className="nav-item">
              <a
                href="#"
                className={activeClassName}
                onClick={(e) => {
                  this.handleChangeTab(e, index);
                }}
              >
                {child}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export const Tab: React.FC<{}> = ({ children }) => <>{children}</>;
