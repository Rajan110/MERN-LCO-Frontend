import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import Card from "../core/Card";
import { getAllOrders } from "./helper/adminapicall";

const ManageOrders = () => {
  const { user = null, token } = isAuthenticated();

  const [error, setError] = useState("");
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getAllOrders(user._id, token)
      .then((data) => {
        if (data.error) {
          setError(data.error?.message);
        } else {
          setAllOrders(data.orders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Base title="Manage Orders" description="Manage And Update Orders">
      <div className="h3">Manage Orders</div>
      {allOrders &&
        allOrders.map((order, index) => {
          return (
            <div className="col mb-4" key={index}>
              <h5>Order No : {order._id}</h5>
              <h6>
                Placed On : {new Date(order.createdAt).toLocaleString("en-IN")}
              </h6>
              <h6>Total Amount : {order.amount}</h6>
              <h6>Status : {order.status}</h6>
              <div className="row text-center">
                {order.products &&
                  order.products.map((prod, index) => {
                    return (
                      <div className="col-2">
                        <Card
                          product={prod}
                          addToCart={false}
                          showQuantity={true}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </Base>
  );
};

export default ManageOrders;
