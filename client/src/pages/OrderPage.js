import { useSelector } from "react-redux";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const { isLoggedIn, loginUser } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const response = await fetch(
            "https://vtechshop-be.onrender.com/api/getOrdersByUser",
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const resData = await response.json();
          setOrders(resData);
          console.log(resData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [isLoggedIn]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between bg-secondary bg-opacity-10 align-items-center h-100 py-5">
        <h1 className="mb-0 mx-5 py-5 fw-normal fst-italic">HISTORY</h1>
        <p className="mb-0 mx-5 py-5 fst-italic fw-light">HISTORY</p>
      </div>
      <div className="fw-light fst-italic my-5">
        <div className="d-flex">
          <div className="col-12">
            <table className="table table-borderless">
              <thead>
                <tr className="text-center">
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    ID ORDER
                  </th>
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    ID USER
                  </th>
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    NAME
                  </th>
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    PHONE
                  </th>
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    ADDRESS
                  </th>
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    TOTAL
                  </th>
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    DELIVERY
                  </th>
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    STATUS
                  </th>
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    DETAIL
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => {
                  return (
                    <tr key={order._id} className="text-center">
                      <td>{order._id}</td>
                      <td>{order.user._id}</td>
                      <td>{order.user.fullName}</td>
                      <td>{order.user.phone}</td>
                      <td>{order.user.address}</td>
                      <td>{order.totalPrice.toLocaleString("vi-VN")} VND</td>
                      <td>
                        {order.status === "completed"
                          ? "Delivered successfully"
                          : order.status === "awaiting shipment"
                          ? "Being delivered"
                          : "Waiting for progressing"}
                      </td>
                      <td>
                        {order.status === "completed"
                          ? "Complete the order"
                          : "Waiting for pay"}
                      </td>
                      <td>
                        <Link
                          className="py-1 px-1 text-decoration-none border border-2 fst-normal"
                          to={`${order._id}`}
                          target="_blank"
                        >
                          View <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
