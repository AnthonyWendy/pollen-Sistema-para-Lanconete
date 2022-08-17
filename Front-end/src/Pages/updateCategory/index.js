import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useApi from "../../helpers/api";

import { PageArea } from "./styled";
import { ErrorMessage } from "../../components/mainComponents";

const Page = () => {
    const api = useApi();

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [categories, setCategories] = useState([]);
    const [ID, setID] = useState("");
    const [category, setCategory] = useState({});

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getCategories = async () => {
            const json = await api.getCategories();
            if (!json.error) {
                setCategories(json.categories);
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        for (const cat of categories) {
            if (cat.id_categoria == ID) {
                setCategory(cat);
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
            console.log(error);
            setDisabled(false);
            return;
        }
        const json = await api.updateCategory(ID, name);

        if (!json.error) {
            window.location.reload();
            return;
        } else {
            setError(json.error);
        }

        setDisabled(false);
    };

    const toggleCat = async () => {
        setDisabled(true);
        setError("");

        const json = await api.toggleCategory(ID);

        if (!json.error) {
            setDisabled(false);
            for (let cat of categories) {
                if (cat.id_categoria == ID) {
                    cat.flsituacao = !cat.flsituacao;
                    setCategory(cat);
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
                <h2>Atualizar categoria</h2>
                <form onSubmit={handleSubmit}>
                    <div className="area">
                        <label>
                            <h3>Categoria:</h3>
                            <select onChange={(e) => setID(e.target.value)}>
                                <option value="">Selecione</option>
                                {categories.map((cat) => (
                                    <option
                                        key={cat.id_categoria}
                                        value={cat.id_categoria}
                                    >
                                        {cat.nm_categoria}
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
                        <button
                            disabled={disabled}
                            type="button"
                            onClick={toggleCat}
                        >
                            {category.flsituacao ? "desativar" : "ativar"}
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
