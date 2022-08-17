import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

import { PageArea, Fake } from "./styled";

import { isLogged } from "../../helpers/authHandler";
import useApi from "../../helpers/api";

const Page = () => {
    const api = useApi();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [ingredient, setIngredient] = useState([]);

    useEffect(() => {
        const getIngredients = async (id) => {
            const ingrediente = await api.getIngredienteFromProduct(id);

            setIngredient(ingrediente.ingredients);
        };
        getIngredients(id);
    }, [id]);

    useEffect(() => {
        const getProduct = async (id) => {
            const product = await api.getProduct(id);
            setProduct(product);
            setLoading(false);
        };
        getProduct(id);

        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [id]);

    return (
        <PageArea>
            <div className="leftSide">
                <div className="box">
                    <div className="productImage">
                        {loading && <Fake height={300} />}
                        {product.images && (
                            <Carousel indicators={false}>
                                {product.images.map((img, k) => {
                                    return (
                                        <div key={k} className="each-slide">
                                            <img
                                                src={`${api.getApi()}/media/${
                                                    img.url
                                                }`}
                                                alt=""
                                            />
                                        </div>
                                    );
                                })}
                            </Carousel>
                        )}
                        {!product.images && <Fake height={300} />}
                    </div>
                    <div className="productInfo">
                        <div className="name">
                            {loading && <Fake height={20} />}

                            <h2>{product.nm_produto}</h2>
                        </div>

                        {loading && <Fake height={20} />}
                        <div className="price">
                            Preço:{" "}
                            <span>
                                <b>R$ {product.valor}</b>
                            </span>
                        </div>
                        <div className="productDesc">
                            {loading && <Fake height={100} />}
                            <br />
                            <p>{product.descricaoproduto} </p>
                            <hr />
                            {product.views && (
                                <small>Visualizações : {product.views}</small>
                            )}
                        </div>
                        <div className="area-ingredientes">
                            {ingredient.length !== 0 && (
                                <>
                                    <h3>Ingredientes:</h3>

                                    <ul>
                                        {ingredient.map((i) => {
                                            return <li>{i.nm_ingrediente}</li>;
                                        })}
                                    </ul>
                                </>
                            )}
                        </div>
                        {isLogged() && (
                            <Link to={`/product/edit/${id}`}> editar </Link>
                        )}
                    </div>
                </div>
            </div>
        </PageArea>
    );
};

export default Page;
