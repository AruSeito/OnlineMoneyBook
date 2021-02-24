import React from "react";

export interface category {
  id: string;
  name: string;
  type: "income" | "outcome";
  inconName: string;
}

export interface IProps {
  categories: Record<string, any>;
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
          {categories.map((category: category, index: string) => {
            const activeClassName =
              selectedCategoryId === category.id ? "active" : null;
            return (
              <div className="col-3 category-item" key={index}>
                <button
                  type="button"
                  onClick={() => {
                    this.selectCategory(category);
                  }}
                  className={`btn btn-outline-primary  ${activeClassName}`}
                >
                  <i className={`fa ${category.inconName}`} />
                  {category.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CategorySelector;
