import React, { useState } from "react";
import useApi from "../../helpers/api";
import { Link } from "react-router-dom";
import { Login, PageArea } from "./styled";
import { doLogin } from "../../helpers/authHandler";
import { ErrorMessage } from "../../components/mainComponents";

const Page = () => {

    const [disabled, setDisabled] = useState(false);

    return (
        <PageArea>
            <Login>
                <div className="container">
                    <div className="area-title">
                        <h2>pollen</h2>
                        <hr />
                    </div>
                    <div className="form">
                        <label className="area">
                            <div className="area-input">
                                <Link to="/pedidos">Pedidos</Link>
                            </div>
                        </label>
                        <label className="area">
                            <div className="area-input">
                                <Link to="/" disabled={disabled}>Configurações   </Link>
                            </div>
                        </label>
                    </div>
                </div>
            </Login>
        </PageArea>
    );
};
export default Page;
