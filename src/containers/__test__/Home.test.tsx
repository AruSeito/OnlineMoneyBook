import { mount, ReactWrapper } from "enzyme";
import React from "react";
import CreateBtn from "../../components/CreateBtn";
import MonthPicker from "../../components/MonthPicker";
import NavBar from "../../components/NavBar";
import PricesList from "../../components/PricesList";
import TotalPrice from "../../components/TotalPrice";
import { parseToYearAndMonth } from "../../utility";
import Home from "../Home";

let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
describe("测试Home页", () => {
  beforeEach(() => {
    wrapper = mount(<Home />);
  });
  it("测试各组件渲染情况", () => {
    const currentDate = parseToYearAndMonth();
    expect(wrapper.find(PricesList).length).toEqual(1);
    expect(wrapper.find(CreateBtn).length).toEqual(1);
    expect(wrapper.find(NavBar).props().activeTab).toEqual("list");
    expect(wrapper.find(NavBar).length).toEqual(1);
    expect(wrapper.find(MonthPicker).length).toEqual(1);
    expect(wrapper.find(MonthPicker).props().year).toEqual(currentDate.year);
    expect(wrapper.find(MonthPicker).props().month).toEqual(currentDate.month);
    expect(wrapper.find(TotalPrice).length).toEqual(1);
    expect(wrapper.find(PricesList).props().items.length).toEqual(1);
  });
  it("测试NavBar交互", () => {
    wrapper.find(".nav-item a").last().simulate("click");
    expect(wrapper.find(PricesList).length).toEqual(0);
    expect(wrapper.find(".chart-title").length).toEqual(1);
  });
  it("测试PriceList数据显示", () => {
    wrapper.find(".dropdown-toggle").simulate("click");
    wrapper.find(".months-range .dropdown-item").at(2).simulate("click");
    expect(wrapper.find(MonthPicker).props().month).toEqual(3);
    expect(wrapper.find(PricesList).props().items.length).toEqual(2);
  });
  it("测试点击新建按钮", () => {
    wrapper.find(CreateBtn).simulate("click");
    expect(wrapper.find(PricesList).props().items.length).toEqual(2);
    expect(wrapper.state("itemList")[0]).toEqual({
      id: "4",
      title: "新建的数据",
      price: 100,
      date: "2021-02-23",
      category: {
        id: "2",
        name: "理财",
        type: "income",
        iconName: "fa-plane",
      },
    });
  });
  it("测试点击修改按钮", () => {
    wrapper.find(".list-group-item a").first().simulate("click");
    expect(wrapper.find(PricesList).props().items[0].title).toEqual(
      "修改后的标题"
    );
  });
  it("测试点击修改按钮", () => {
    wrapper.find(".list-group-item a").last().simulate("click");
    expect(wrapper.find(PricesList).props().items.length).toEqual(0);
  });
});
