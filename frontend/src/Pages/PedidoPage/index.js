import React, { useMemo, useEffect, useState, useRef } from "react";

import useApi from "../../helpers/api";
import "react-perfect-scrollbar/dist/css/styles.css";

import { PageArea } from "./styled";
import { ErrorMessage } from "../../components/mainComponents";

const Page = () => {
  const api = useApi();

  const situacoes = ["Finalizada","Atendido", "Esperando", "Recolher pedidos"];

  const [comandas, setComandas] = useState([]);
  const [error, setError] = useState("");

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
    minimumIntegerDigits: "2",
  });

  useEffect(() => {
    const getComandas = async () => {
      const json = await api.getComandas();
      
      if(!json.error){
        setComandas(json);
        console.log(comandas);
      }
    }
    getComandas();
  },[]);

  
  return (
    <PageArea>
      <div className="comandas-list">
        
          
          {comandas.map((comanda) => (
            <>
            <div className="card-comanda">
              <div className="cabecalho">
                <h3>Mesa: #{comanda.mesa}</h3>
                <h3>{
                  situacoes[comanda.situacao]
                }</h3>
                  
              </div>
              <div className="list-items">
                <h3>Pedidos</h3>
                <ul>
                  {comanda.pedidos.map((pedido) => (

                    <li
                      key={pedido.id}
                    >
                      <small>{pedido.Produto.nm_produto}<h4>
                            {priceFormatter.format(pedido.Produto.valor)}</h4></small>
                      
                    </li>
                  ))}
                  <li>
                    <hr></hr>
                    <small>Valor final: 
                      <h3>{priceFormatter.format(comanda.valor_final)}</h3>
                    </small>
                </li>
                </ul>
              </div>   
              <div className="footer">
                <button
                  onClick={() => {
                    window.location.href = `/comanda/update/${comanda.id_comanda}`;

                  }}
                  >Alterar</button>
              </div>
          </div>
        </>
          ))}

        
      </div>
    </PageArea>
  );
};
export default Page;
