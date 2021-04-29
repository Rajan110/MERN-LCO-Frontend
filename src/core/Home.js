import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";

import { getAllProducts } from "./helper/coreapicalls";

const Home = () => {
  const [error, setError] = useState("");
  const [products, setProducts] = useState(null);

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error?.message);
      } else {
        setProducts(data.products);
      }
    });
    //catch((err) => {
    //  console.log(err);
    //});
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Home Page" description="Welcome, to the store!!">
      <div className="row text-center">
        {products &&
          products.map((prod, index) => {
            return (
              <div className="col-4 mb-4" key={index}>
                <Card product={prod} />
              </div>
            );
          })}
      </div>
    </Base>
  );
};

export default Home;
