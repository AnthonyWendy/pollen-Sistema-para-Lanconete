import React, { useEffect, useState, useRef } from "react";

import useApi from "../../../helpers/api";

import { PageArea } from "./styled";
import { ErrorMessage } from "../../../components/mainComponents";

const Page = () => {

    const api = useApi();

    const [name, setName] = useState("");

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        if (!name.trim()) {
            setError("Nome é obrigatório");
            console.log(error);
            setDisabled(false);
            return;
        }

        console.log(name);
        const json = await api.addFormasPagamentos(name);

        if (!json.error) {
            window.location.reload();
        } else {
            setError(json.error);
        }

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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="teste">
                            <div className="left produtos">
                                <h3>Pedidos</h3>
                                <div className="search">
                                        <img src="lupa.png"/>
                                        <input type="search"/>
                                </div>
                                <h4>Lista de Pedidos</h4>
                                <div className="lista-pedidos">
                                    <p>Pastel</p>
                                </div>
                            </div>
                            <div className="right">

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
