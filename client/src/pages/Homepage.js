import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategoty] = useState("Pizzas");
  const categories = [
    {
      name: "Pizzas",
      imageURL:
        "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900",
    },
    {
      name: "Burgers",
      imageURL:
        "https://asset.kompas.com/crops/yqHUrUMME2QSGILGvNH-LYuTdns=/12x51:892x637/780x390/data/photo/2022/03/05/622358ed771fb.jpg",
    },
    {
      name: "Drinks",
      imageURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20191120-blackberry-virgin-mojito-delish-ehg-4719-1583519572.jpg?crop=0.668xw:1.00xh;0.0929xw,0&resize=640:*",
    },
  ];
  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>

      <div className="d-flex categories">
        {categories.map((category) => {
          return <div
            onClick={() => setSelectedCategoty(category.name)}
            className={`d-flex category ${selectedCategory === category.name && 'selected-category'}`}>
            <h4>{category.name}</h4>
            <img src={category.imageURL} height='60' width='80' />
          </div>
        })}
      </div>

      <Row gutter={20}>

        {itemsData.filter((i) => i.category === selectedCategory).map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Homepage;
