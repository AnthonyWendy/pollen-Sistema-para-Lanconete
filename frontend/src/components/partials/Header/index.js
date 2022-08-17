import React, { useState } from "react";
import { HeaderArea } from "./styled";
import { Link, useLocation } from "react-router-dom";

import { isLogged, doLogout } from "../../../helpers/authHandler";

import DropdownComponent from "../Dropdown";

const Header = (props) => {
    const [logged, setLogged] = useState(isLogged());

    const handleLogout = () => {
        doLogout();
        window.location.href = "/";
    };
    const location = useLocation();

    // render header only if pathname is not login;

    if (location.pathname !== "/login" && location.pathname !== "/principal" )
        return (
            <HeaderArea>
                <div className="container">
                    <Link to="/" className="title">
                        <h2>pollen</h2>
                    </Link>
                    <nav>
                        <ul>
                            {logged && (
                                <>
                                    <li>
                                        <DropdownComponent placeholder="atualizar...">
                                            <li>
                                                <Link to="/category/update">
                                                    categoria
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/ingredient/update">
                                                    ingrediente
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/user/update">
                                                    pessoa
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/formaspagamento/update">
                                                    forma de pagamento
                                                </Link>
                                            </li>
                                        </DropdownComponent>
                                    </li>

                                    <li>
                                        <DropdownComponent placeholder="adicionar...">
                                            <li>
                                                <Link to="/product/add">
                                                    produto
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/category/add">
                                                    categoria
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/ingredient/add">
                                                    ingrediente
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/signup">pessoa</Link>
                                            </li>
                                            <li>
                                                <Link to="/formaspagamento/add">
                                                    forma de pagamento
                                                </Link>
                                            </li>
                                        </DropdownComponent>
                                    </li>
                                    <li
                                        className="button"
                                        onClick={handleLogout}
                                    >
                                        <span>sair</span>
                                    </li>
                                </>
                            )}

                            {!logged && (
                                <>
                                    <li className="button">
                                        <Link to="/login">login</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </HeaderArea>
        );
};
export default Header;
