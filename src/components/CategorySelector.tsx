import React from "react";

export interface category {
  id: string;
  name: string;
  type: "income" | "outcome";
  inconName: string;
}

export interface IProps {
  categories: Array<category>;
  handleSelectCategory: (category: category) => void;
  selectedCategory?: category;
}
interface IState {
  selectedCategoryId: string | undefined;
}

class CategorySelector extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedCategoryId: props.selectedCategory && props.selectedCategory.id,
    };
  }

  selectCategory = (category: category) => {
    this.setState({
      selectedCategoryId: category.id,
    });
    this.props.handleSelectCategory(category);
    // event.preventDefault();
  };

  render() {
    const { categories, selectedCategory } = this.props;
    const { selectedCategoryId } = this.state;
    return (
      <div className="category-select-component">
        <div className="row">
          {categories.map((category, index) => {
            const activeClassName =
              selectedCategoryId === category.id ? "active" : null;
            return (
              <div
                className={`category-item col-3 ${activeClassName}`}
                key={index}
                onClick={() => {
                  this.selectCategory(category);
                }}
              >
                <i className={`fa ${category.inconName}`} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CategorySelector;
