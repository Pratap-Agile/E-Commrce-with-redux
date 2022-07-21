import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ADD, DLT, REMOVE } from "../redux/actions/actions";

const CardsDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const history = useNavigate();

  const dispatch = useDispatch();

  const getData = useSelector((state) => state.cartreducer.carts);

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id;
    });
    setData(compareData);
  };

  // add data event
  const send = (e) => {
    dispatch(ADD(e));
  };

  //remove one

  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        <section className="container mt-3">
          <div className="iteamsdetails">
            {data.map((ele, key) => {
              return (
                <div key={ele.id}>
                  <div className="items_img">
                    <img src={ele.imgdata} alt="img" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong> Restaurant </strong> : {ele.rname}
                          </p>
                          <p>
                            <strong> Price </strong> : ₹ {ele.price}
                          </p>
                          <p>
                            <strong> Dishes </strong> : {ele.address}
                          </p>
                          <p>
                            <strong> Total </strong> : ₹ {ele.price * ele.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span
                              style={{ fontSize: 24 }}
                              onClick={
                                ele.qnty <= 1
                                  ? () => dlt(ele.id)
                                  : () => remove(ele)
                              }
                            >
                              <b>-</b>
                            </span>
                            <span style={{ fontSize: 24 }}>{ele.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => send(ele)}
                            >
                              <b>+</b>
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating : </strong>
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {ele.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review : </strong>
                            <span>{ele.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove : </strong>
                            <span>
                              <i
                                onClick={() => dlt(ele.id)}
                                className="fas fa-trash"
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
