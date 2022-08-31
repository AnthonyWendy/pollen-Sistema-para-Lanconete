import React, { useMemo, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../helpers/api";
import 'react-perfect-scrollbar/dist/css/styles.css';

import { PageArea } from "./styled";
import { ErrorMessage } from "../../../components/mainComponents";

let timer;
let cont = 0;
let contP = 0;
let sir = 0;

const Page = () => {

    const situacoes = ["Finalizada","Atendido", "Esperando", "Recolher pedidos"];
    
    const api = useApi();

    const { id } = useParams();
    const [comanda, setComanda] = useState({});

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [ID, setID] = useState("");
    const [price, setPrice] = useState(0);
    const [sit, setSit] = useState("");
    const [q, setQ] = useState("");
    
    const [listProducts, setListProducts] = useState([]);//vai receber os pedidos da comanda e os novos pedidos

    const [listProducts1, setListProducts1] = useState([]);//vai receber os novos pedidos

    const [produtos, setProdutos] = useState([]);
    const [garcons, setGarcons] = useState([]);

    const priceFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
        minimumIntegerDigits: "2",
    });


    useEffect(() => {
        const getComanda = async () => {
            const json = await api.getComanda(id);
            if(!json.error){
                setComanda(json);
                setListProducts(json.pedidos);
                console.log(listProducts);
                cont = json.pedidos.length;
            }
        }
        getComanda();
    },[]);
    
    useEffect(() => {
        const getProduto = async () => {

            const json = await api.getProducts({limit: 0, q});

            if(!json.error){
                setProdutos(json.products);
            }
        };

        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(getProduto, 500)


    }, [q]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        let errors = [];

        
        if(!ID){
            errors.push("Informe o nome do garçom!");
        }
        console.log(ID)

        if(price){
            price.toString().replace(".", ",");
        }


        if(errors.length === 0){
            const comanda = { ID, listProducts, price};


            const json = await api.addComanda(comanda);
            
            // window.location.reload()
        }
    };

    return (
        <PageArea>
            <div className="container-cadastro">
                <div className="pad">
                    <h2>Comanda #{comanda.id_comanda} da mesa {comanda.mesa}, {comanda.User && comanda.User.name}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="teste">
                        <div className="area nome-garcom">
                                <h3>Situação</h3>
                                <select onChange={(e) => setSit(e.target.value)}>
                                        <option value="">Selecione</option>
                                        {situacoes.map((situacao) => (
                                            <option
                                                value={sir++}
                                            >
                                                {situacao}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                        </div>

                        <div className="teste">
                            <div className="left produtos">
                                <h3>Produtos</h3>
                                <div className="search">
                                        {/* <img src="lupa.png"/> */}
                                        <input 
                                            type="text"
                                            value={q}
                                            onChange={e => setQ(e.target.value)}
                                            />
                                        <ul>
                                            {produtos.map((product) => (
                                                <li
                                                    key={product.id_produto}
                                                    value={product.id_produto}
                                                >
                                                    <label>
                                                        {product.Produto ? product.Produto.nm_produto: product.nm_produto} 
                                                        <button type="button"
                                                                onClick={() => {
                                                                    setListProducts([...listProducts, {...product, uuid:cont++ }])
                                                                    setListProducts1([...listProducts1, {...product, uuid:cont++ } ])
                                                                    setQ("")
                                                                }}
                                                                >Adicionar</button>
                                                    </label>
                                                    <hr/>
                                                </li>
                                            ))}
                                        </ul>
                                </div>                                
                            </div>
                            <div className="right">
                                <h3>Lista de Pedidos </h3>
                                    <div className="lista-pedidos">
                                        <ul>
                                            {listProducts.map((product) => (
                                                                                                
                                                <li
                                                    key={contP}
                                                >
                                                    <label>
                                                        {product.Produto ? product.Produto.nm_produto: product.nm_produto} 
                                                        <h3>R$ {product.Produto ? product.Produto.valor: product.nm_produto}</h3>
                                                        <button className="retirar"
                                                            type="button"
                                                            // onClick={() => {
                                                            //     console.log(listProducts[product.uuid])
                                                                
                                                            //     setListProducts(listProducts.filter((productf) => {
                                                            //         return productf.uuid != product.uuid
                                                            //     }))
                                                                
                                                            //     setPrice(price-parseFloat(product.valor))
                                                            // }
                                                            // }
                                                            >
                                                            {product.cancelado ? "Cancelado":"Remover"}
                                                        </button>
                                                    </label>
                                                    <hr/>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="price">
                                        <label>Valor total: <h3>{priceFormatter.format(price)}</h3></label>
                                    </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="area">
                                <button>cadastrar</button>
                            </div>

                            <div className="area">
                                <button className="fim">finalizar</button>
                            </div>
                        </div>
                                                            
                        <div className="area">
                            {error && <ErrorMessage>{error}</ErrorMessage>}
                        </div>
                    </form>
                </div>
            </div>
        </PageArea>
    );
};
export default Page;
