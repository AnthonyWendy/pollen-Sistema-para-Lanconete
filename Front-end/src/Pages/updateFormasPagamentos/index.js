import React, { useEffect, useState, useRef } from "react";

import useApi from "../../helpers/api";

import { PageArea } from "./styled";
import { ErrorMessage } from "../../components/mainComponents";

const Page = () => {
    const api = useApi();

    const [name, setName] = useState("");

    const [formas, setFormas] = useState([]);
    const [ID, setID] = useState("");
    const [forma, setForma] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getFormas = async () => {
            const json = await api.getFormaspagamentos();
            if(!json.error) {
                setFormas(json.formasPagamento);
            }
        };
        getFormas();
    }, []);

    useEffect(() => {
        for(const cat of formas){
            if(cat.idformapagamento == ID) {
                setForma(cat);
                break;  
            }
        }
    }, [ID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        if (!name.trim()) {
            setError("Nome é obrigatório");
            setDisabled(false);
            return;
        }

        console.log(name);
        if(ID === ""){
            setError("Forma de pagamento não foi selecionada")
            return;
        }
        
        const json = await api.updateFormasPagamento(ID ,name);

        if (!json.error) {
            window.location.reload();
        } else {
            setError(json.error);
        }

        setDisabled(false);
    };

    const toggleCat = async () => {
        setDisabled(true);
        setError("");

        const json = await api.toggleFormaspagamentos(ID);
        console.log(json);

        if (!json.error) {
            setDisabled(false);
            for(let cat of formas){
                if(cat.idformapagamento){
                    cat.flsituacao = !cat.flsituacao;
                    setForma(cat);
                    break;
                }
            }            

            return;
        } else {
            setError(json.error);
        }
        setDisabled(false);
    };

    return (
        <PageArea>
            <div className="container-cadastro">
                <h2>Alterar de forma de pagamento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="area">
                    <label>
                            <h3>forma de pagamento:</h3>
                            <select onChange={(e) => setID(e.target.value)}>
                                <option value="">Selecione</option>
                                {formas.map((cat) => (
                                    <option
                                        key={cat.idformapagamento}
                                        value={cat.idformapagamento}
                                    >
                                        {cat.nomeformapagamento}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="area">
                        <label>
                            <h3>Nome:</h3>
                            <input
                                type="text"
                                disabled={disabled}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="area">
                        <button disabled={disabled}>alterar</button>
                    </div>

                    <div className="area">
                        <button
                            disabled={disabled}
                            type="button"
                            onClick={toggleCat}
                        >
                            {forma.flsituacao ? "desativar" : "ativar"}
                        </button>
                    </div>

                    <div className="area">
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </div>
                </form>
            </div>
        </PageArea>
    );
};
export default Page;
