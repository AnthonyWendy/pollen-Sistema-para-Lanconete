import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import {
    PageContainer,
    PageTitle,
    ErrorMessage,
} from "../../components/mainComponents";

import { PageArea } from "./styled";

import useApi from "../../helpers/api";

const Page = () => {
    const api = useApi();

    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        const body = {};

        if (!user) {
            setError("ID é obrigatório");
            setDisabled(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Senhas não conferem");
            setDisabled(false);
            return;
        }

        if (name.trim() !== "") body.name = name;
        if (password.trim() !== "") body.password = password;

        const json = await api.updateUser(user, body);

        if (!json.error) {
            window.location.reload();
            return;
        } else {
            if (Object.keys(json.error).length > 0) {
                let errorMsg = "";
                for (let key in json.error) {
                    errorMsg += json.error[key].msg + "\n";
                }
                setError(errorMsg);
            } else {
                setError(json.error);
            }
        }

        setDisabled(false);
    };

    const handleExclude = async () => {
        setDisabled(true);
        setError("");
        if (!user) {
            setError("ID é obrigatório");
            setDisabled(false);
            return;
        }

        const json = await api.deleteUser(user);

        if (!json.error) {
            window.location.reload();
            return;
        } else {
            setError(json.error);
        }

        setDisabled(false);
    };

    useEffect(() => {
        const getUsers = async () => {
            const json = await api.getUsers();
            setUsers(json);
        };
        getUsers();
    }, []);

    return (
        <PageArea>
            <div className="container-cadastro">
                <h2> Edite o usuário </h2>
                <form onSubmit={handleSubmit}>
                    <div className="area">
                        <label>
                            <h3>Usuário:</h3>
                            <select
                                disabled={disabled}
                                onChange={(e) => setUser(e.target.value)}
                            >
                                <option value="">Selecione um usuário</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {(user.id, user.name)}
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
                        <label>
                            <h3>Senha:</h3>
                            <input
                                type="password"
                                disabled={disabled}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="area">
                        <label>
                            <h3>Confirmar senha:</h3>
                            <input
                                type="password"
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </label>
                    </div>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={handleExclude}
                            >
                                Excluir usuario
                            </button>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>
                                Alterar Cadastro
                            </button>
                        </div>
                    </label>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </form>
            </div>
        </PageArea>
    );
};

export default Page;
