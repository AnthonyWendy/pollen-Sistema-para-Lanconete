import React, { useMemo, useEffect, useState, useRef } from "react";

import useApi from "../../../helpers/api";

import { PageArea } from "./styled";
import { ErrorMessage } from "../../../components/mainComponents";

const Page = () => {

    const api = useApi();

    const [mesa, setMesa] = useState("");
    const [garcom, setGarcom] = useState("");
    const [busca, setBusca] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    
    const [produtos, setProdutos] = useState([]);
    const [garcons, setGarcons] = useState([]);


    useEffect(() => {
        const getListGarcom = async () => {
            const nomes = await api.getUsers();
            setGarcons(nomes);
        }
        getListGarcom();
    }, []);

    useEffect(() => {
        const getProduto = async () => {
            const product = await api.getProducts();
            setProdutos(product);
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
                        {/* <h3>Garçom:</h3>
                        <select onChange={(e) => setID(e.target.value)}>
                                <option value="">Selecione</option>
                                {gacons.map((user) => (
                                    <option
                                        key={ingredient.id_ingrediente}
                                        value={ingredient.id_ingrediente}
                                    >
                                        {ingredient.nm_ingrediente}
                                    </option>
                                ))}
                            </select> */}
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

                                        <div className="listProdutos">
                                          
                                        </div>

                                </div>
                                
                            </div>
                            <div className="right">
                                <h4>Lista de Pedidos</h4>
                                    <div className="lista-pedidos">
                                        <p>Pastel</p>
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
