import React from "react";

export interface category {
  id: string;
  name: string;
  type: "income" | "outcome";
  iconName: string;
}

export interface IProps {
  categories: Record<string, any>;
  handleSelectCategory: (category: category) => void;
  selectedCategory?: category | null;
}

class CategorySelector extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  selectCategory = (category: category) => {
    this.props.handleSelectCategory(category);
    // event.preventDefault();
  };

  render() {
    const { categories, selectedCategory } = this.props;
    const selectedCategoryId = selectedCategory?.id;
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
                  <i className={`fa ${category.iconName}`} />
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
