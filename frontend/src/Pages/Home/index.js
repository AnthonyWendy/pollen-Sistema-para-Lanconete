import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ProductItem from "../../components/partials/Product";
import { PageContainer } from "../../components/mainComponents";
import { PageArea, SearchArea } from "./styled";

import useApi from "../../helpers/api";

const itemPerPage = 8;

const Page = () => {
    const api = useApi();

    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const q = searchParams.get("q");

    const getProducts = async () => {
        setLoading(true);
        let offset = (currentPage - 1) * itemPerPage;

        const json = await api.getProducts({
            limit: itemPerPage,
            offset: offset,
            q: q,
        });
        setProducts(json.products);

        if (q) setTotalProducts(json.products.length);
        else setTotalProducts(json.total);

        setLoading(false);
    };

    useEffect(() => {
        if (products.length === 0) {
            setPageCount(0);
            return;
        }

        setPageCount(Math.ceil(totalProducts / itemPerPage));

        if (pageCount > 10) setPageCount(10);
    }, [totalProducts]);

    useEffect(() => {
        getProducts();
    }, [currentPage, location]);

    let pagination = [];

    for (let i = 0; i < pageCount; i++) {
        pagination.push(i + 1);
    }

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET">
                            <input
                                name="q"
                                type="text"
                                placeholder="O que você procura?"
                            ></input>
                            <button> Pesquisar </button>
                        </form>
                    </div>
                </PageContainer>
            </SearchArea>

            <PageContainer>
                <PageArea>
                    <h2>Produtos</h2>
                    {loading && products.length === 0 && (
                        <div className="loading"> Carregando... </div>
                    )}

                    {!loading && products.length === 0 && (
                        <div className="loading">
                            {" "}
                            Nenhum produto encontrado{" "}
                        </div>
                    )}

                    <div className="productsList">
                        {products.map((product, index) => (
                            <ProductItem key={index} product={product} />
                        ))}
                    </div>

                    {pageCount > 1 && (
                        <div className="pagination">
                            {pagination.map((page, index) => (
                                <div
                                    onClick={() => setCurrentPage(page)}
                                    key={index}
                                    className={
                                        page === currentPage
                                            ? "pageItem active"
                                            : "pageItem"
                                    }
                                >
                                    {page}
                                </div>
                            ))}

                            <div
                                onClick={() => {
                                    if (currentPage < pageCount)
                                        setCurrentPage(currentPage + 1);
                                }}
                                className={
                                    "pageItem wide" +
                                    (currentPage === pageCount
                                        ? " disabled"
                                        : "")
                                }
                            >
                                {" "}
                                Próxima Página{" "}
                            </div>
                        </div>
                    )}

                    <hr />
                </PageArea>
            </PageContainer>
        </>
    );
};

export default Page;
