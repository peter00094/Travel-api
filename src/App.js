import React, { Component } from 'react';
import './App.css';
import RateSort from './RateSort.js';
import List from './List.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],//json容器
      isLoaded: false,//判斷串接成功與否
      rateSort: "rating_desc",//預設排序方式為評分高到低
    }
  }

  componentDidMount() {
    // 會等render跑完再進行

    fetch("https://interview.tripresso.com/tour/search")
      .then(res => res.json()) //轉成JSON格式
      .then(res => {
        this.setState({
          isLoaded: true,
          items: res
        })
      });
  }
  handleRateSort = (e) => {
    console.log(e.target.value);
    this.setState({ rateSort: e.target.value });//存入排序方式
  }

  render() {

    let { isLoaded, items } = this.state;

    if (!isLoaded) {//確認api是否連接成功
      return <div>Loading...</div>;
    }
    else {
      //對評分進行排序
      const sortedData = items.data.tour_list.sort((a, b) => {
        if (this.state.rateSort === "rating_desc") {
          return (b.rating) - (a.rating)
        }

        else if (this.state.rateSort === "rating_asc") {
          return (a.rating) - (b.rating)
        }

        else if (this.state.rateSort === "price_desc") {
          return (b.min_price) - (a.min_price)
        }

        else {
          return (a.min_price) - (b.min_price)
        }
      })

      return (
        <div style={{ margin: "20px" }} className="App">
          {/* 排序選單 */}
          <RateSort handleSort={this.handleRateSort}></RateSort>
          {/* 將資料印出 */}
          <List data={sortedData}></List>
        </div>

      );
    }

  }
}
export default App;

