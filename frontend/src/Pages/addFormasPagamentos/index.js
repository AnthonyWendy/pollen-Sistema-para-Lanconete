import React, { useEffect, useState, useRef } from "react";

import useApi from "../../helpers/api";

import { PageArea } from "./styled";
import { ErrorMessage } from "../../components/mainComponents";

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
                <h2>Cadastro de forma de pagamento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="area">
                        <label>
                            <h3>Forma de Pagamento:</h3>
                            <input
                                autoFocus
                                type="text"
                                disabled={disabled}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="area">
                        <button>cadastrar</button>
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
