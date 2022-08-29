import React, { useMemo, useEffect, useState, useRef } from "react";

import useApi from "../../../helpers/api";
import "react-perfect-scrollbar/dist/css/styles.css";

import { PageArea } from "./styled";
import { ErrorMessage } from "../../../components/mainComponents";

const Page = () => {
  const api = useApi();
  return (
    <PageArea>
      <div className="comandas-list">
        <div className="card-comanda">
          <div className="cabecalho">
            <h3>Mesa: #001</h3>
            <h3>ATENDIDO</h3>
              
          </div>
           <div className="list-items">
            <h3>Pedidos</h3>
            <ul>
              <li>
                <small>Pastel</small>
                <div className="situacao"></div>
              </li>
              <li>
                <small>Café</small>
                <div className="situacao"></div>
              </li>
              <li>
                <small>Brigadeiro</small>
                <div className="situacao"></div>
              </li>
            </ul>
          </div> 
          <div className="footer">
            <h3>R$ 10,00</h3>
            <button>Alterar</button>
          </div>

        </div>
        
      </div>
    </PageArea>
  );
};
export default Page;
