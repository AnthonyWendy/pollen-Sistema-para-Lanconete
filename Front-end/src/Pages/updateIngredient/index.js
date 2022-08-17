import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useApi from "../../helpers/api";

import { PageArea } from "./styled";
import { ErrorMessage } from "../../components/mainComponents";

const Page = () => {
    const api = useApi();

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [ingredients, setIngredients] = useState([]);
    const [ID, setID] = useState("");

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getIngredients = async () => {
            const json = await api.getIngredients();
            if (!json.error) {
                setIngredients(json.ingredientes);
            }
        };
        getIngredients();
    }, []);

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
        const json = await api.updateIngredient(ID, name);

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
                <h2>Atualizar ingrediente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="area">
                        <label>
                            <h3>Ingrediente:</h3>
                            <select onChange={(e) => setID(e.target.value)}>
                                <option value="">Selecione</option>
                                {ingredients.map((ingredient) => (
                                    <option
                                        key={ingredient.id_ingrediente}
                                        value={ingredient.id_ingrediente}
                                    >
                                        {ingredient.nm_ingrediente}
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
                        <button disabled={disabled}>alterar nome</button>
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
