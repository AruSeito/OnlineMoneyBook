import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import PricesList, { IItem } from "../PricesList";

const itemList: Array<IItem> = [
  {
    id: "1",
    title: "旅行青岛",
    price: 500,
    date: "2020-03-04",
    category: {
      id: "1",
      name: "旅行",
      type: "outcome",
      iconName: "fa-plane",
    },
  },
  {
    id: "2",
    title: "旅行青岛2",
    price: 100,
    date: "2020-03-05",
    category: {
      id: "1",
      name: "旅行",
      type: "outcome",
      iconName: "fa-plane",
    },
  },
  {
    id: "3",
    title: "银行利息",
    price: 100,
    date: "2020-03-05",
    category: {
      id: "2",
      name: "理财",
      type: "income",
      iconName: "fa-plane",
    },
  },
];

const props = {
  items: itemList,
  handleChangeItem: jest.fn(),
  handleDelItem: jest.fn(),
};
let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
describe("测试PricesList组件", () => {
  beforeEach(() => {
    wrapper = shallow(<PricesList {...props} />);
  });
  it("渲染的组件与快照相匹配", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("测试渲染的数据条数", () => {
    expect(wrapper.find(".list-group-item").length).toEqual(itemList.length);
  });
  it("测试渲染的icon", () => {
    const iconList = wrapper.find(".list-group-item").first().find("i");
    expect(iconList.length).toEqual(3);
    expect(iconList.first().props().className).toContain(
      props.items[0].category.iconName
    );
  });
  it("测试事件的回调", () => {
    const firstItem = wrapper.find(".list-group-item").first();
    firstItem.find("a").first().simulate("click");
    expect(props.handleChangeItem).toHaveBeenCalledWith(itemList[0]);
    firstItem.find("a").last().simulate("click");
    expect(props.handleDelItem).toHaveBeenCalledWith(itemList[0]);
  });
});
