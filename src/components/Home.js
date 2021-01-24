import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";
import MenuContainer from "./menu/MenuContainer";
import BillContainer from "./bill/BillContainer";
import TableContainer from "./TableContainer";
import SeatContainer from "./seats/SeatContainer";
import Axios from "axios";

import "./Home.scss";

export default function Home(props) {
  const { user } = useContext(UserContext);
  const [menu, setMenu] = useState([]);
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState({});
  const [seat, setSeat] = useState(1);
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    Axios.get("/api/menu").then((res) => {
      setMenu(res.data);
    });
    Axios.get("/api/tables").then((res) => {
      setTables(res.data);
    });
    Axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  if (!user.auth) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="home-main">
      <div className="container">
        <BillContainer
          bill={props.bill}
          tableInfo={table}
          menu={menu}
          setBill={props.setBill}
          setTable={setTable}
          seat={seat}
        />
        <MenuContainer
          menu={menu}
          setBill={props.setBill}
          bill={props.bill}
          seat={seat}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
        <div className="table-selectors">
          <TableContainer
            tables={tables}
            setTable={setTable}
            setBill={props.setBill}
            table={table}
            bill={props.bill}
          />
          <SeatContainer setSeat={setSeat} table={table} seat={seat} />
        </div>
      </div>
    </div>
  );
}
