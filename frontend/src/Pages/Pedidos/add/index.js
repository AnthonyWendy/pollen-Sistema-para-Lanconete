import React, { useMemo, useEffect, useState, useRef } from "react";

import useApi from "../../../helpers/api";
import 'react-perfect-scrollbar/dist/css/styles.css';

import { PageArea } from "./styled";
import { ErrorMessage } from "../../../components/mainComponents";

const Page = () => {

    const api = useApi();

    const [mesa, setMesa] = useState("");
    const [garcom, setGarcom] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [ID, setID] = useState("");
    const [busca, setBusca] = useState([]);
    const [price, setPrice] = useState(0);
    
    const [tomate, setTomate] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [garcons, setGarcons] = useState([]);

    
    

    useEffect(() => {
        const getGarcons = async () => {
            const json = await api.getUsers();
            if(!json.error){
                setGarcons(json);
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
            const json = await api.getProducts();
            if(!json.error){
                setProdutos(json.products);
            }
        };
        getProduto();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        if (!mesa.trim()) {
            setError("Nome é obrigatório");
            console.log(error);
            setDisabled(false);
            return;
        }


        // if (!json.error) {
        //     window.location.reload();
        // } else {
        //     setError(json.error);
        // }

        setDisabled(false);
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
                                        {garcons.map((garcom) => (
                                            <option
                                                key={garcom.id_garcom}
                                                value={garcom.id_garcom}
                                            >
                                                {garcom.name}
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
                                            value={busca}
                                            onChange={e => setBusca(e.target.value)}
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
                                                                    setTomate([...tomate, product])
                                                                    setPrice(price+parseFloat(product.valor))
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
                                <h3>Lista de Pedidos</h3>
                                    <div className="lista-pedidos">
                                        <ul>
                                            {tomate.map((product) => (
                                                <li
                                                    key={product.id_produto}
                                                    value={product.id_produto}
                                                >
                                                    <label>
                                                        {product.nm_produto} 
                                                        <h3>R$ {product.valor}</h3>
                                                    </label>
                                                    <hr/>
                                                </li>
                                            ))}
                                        </ul>
                                    <div className="price">
                                        <label>Valor total: <h3>{price}</h3></label>
                                    </div>
                                    </div>
                            </div>
                        </div>

                        <div className="area">
                            <button>cadastrar</button>
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
