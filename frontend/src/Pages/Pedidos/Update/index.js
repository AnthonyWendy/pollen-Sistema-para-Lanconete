import React, { useMemo, useEffect, useState, useRef } from "react";

import useApi from "../../../helpers/api";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { v4 as uuidv4 } from 'uuid';

import { PageArea } from "./styled";
import { ErrorMessage } from "../../../components/mainComponents";

let timer;
let cont = 0;

const Page = () => {


    
    const api = useApi();

    
    const [mesa, setMesa] = useState("");
    const [garcom, setGarcom] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [ID, setID] = useState("");
    const [price, setPrice] = useState(0);
    const [q, setQ] = useState("");
    
    const [listProducts, setListProducts] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [garcons, setGarcons] = useState([]);

    const priceFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
        minimumIntegerDigits: "2",
    });

    useEffect(() => {
        const getGarcons = async () => {
            const json = await api.getUsers();
            if(!json.error){
                setGarcons(json);
                console.log(garcons)
            }
        }
        getGarcons();
    }, []);
    
    useEffect(() => {
        for(const cat of garcons){
            if(cat._id == ID){
                setGarcom(cat);
                break;
            }
        }
    });
    
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

        if (!mesa) {
            errors.push("Informe o número da mesa!");
        }
        if(!ID){
            errors.push("Informe o nome do garçom!");
        }
        console.log(ID)

        if(price){
            price.toString().replace(".", ",");
        }


        if(errors.length === 0){
            const comanda = {mesa, ID, listProducts, price};


            const json = await api.addComanda(comanda);
            
            // window.location.reload()
        }
    };

    return (
        <PageArea>
            <div className="container-cadastro">
                <div className="pad">
                    <h2>Cadastro da comanda</h2>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="teste">
                            <div className="area mesa">
                                <h3>Número da mesa:</h3>
                                <input
                                    autoFocus
                                    type="text"
                                    disabled={disabled}
                                    value={mesa}
                                    onChange={(e) => setMesa(e.target.value)}
                                    />
                            </div>
                            <div className="area nome-garcom">
                                <h3>Garçom:</h3>
                                <select onChange={(e) => setID(e.target.value)}>
                                        <option value="">Selecione</option>
                                        {garcons.map((garcom1) => (
                                            <option
                                                key={garcom1._id}
                                                value={garcom1._id}
                                            >
                                                {garcom1.name}
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
                                                        {product.nm_produto} 
                                                        <button type="button"
                                                                onClick={() => {
                                                                    setListProducts([...listProducts, {...product, uuid:cont++ }  ])
                                                                    setPrice(price+parseFloat(product.valor))
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
                                                    key={product.uuid}
                                                    value={product.id_produto}
                                                >
                                                    <label>
                                                        {product.nm_produto} 
                                                        <h3>R$ {product.valor}</h3>
                                                        <button className="retirar"
                                                            type="button"
                                                            onClick={() => {
                                                                console.log(listProducts[product.uuid])
                                                                
                                                                setListProducts(listProducts.filter((productf) => {
                                                                    return productf.uuid != product.uuid
                                                                }))
                                                                
                                                                setPrice(price-parseFloat(product.valor))
                                                            }
                                                            }
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
