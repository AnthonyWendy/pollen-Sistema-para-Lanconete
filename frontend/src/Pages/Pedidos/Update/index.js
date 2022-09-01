import React, { useMemo, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../helpers/api";
import 'react-perfect-scrollbar/dist/css/styles.css';

import { PageArea } from "./styled";
import { ErrorMessage } from "../../../components/mainComponents";

let timer;
let cont = 0;
let contP = 0;
let sir = 0;

const Page = () => {

    const situacoes = ["Finalizada","Atendido", "Esperando", "Recolher pedidos"];
    
    const api = useApi();

    const { id } = useParams();
    const [comanda, setComanda] = useState({});

    const [final, setFinal] = useState(false);

    const [pix, setPix] = useState(0);
    const [debito, setDebito] = useState(0);
    const [credito, setCredito] = useState(0);

    const [soma, setSoma] = useState(0);
    const [total, setTotal] = useState(0);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [ID, setID] = useState("");
    const [price, setPrice] = useState(0);
    const [sit, setSit] = useState("");
    const [q, setQ] = useState("");
    
    const [listProducts, setListProducts] = useState([]);//vai receber os pedidos da comanda e os novos pedidos
    const [listProducts1, setListProducts1] = useState([]);//vai receber os novos pedidos

    const [remove, setRemove] = useState([]);//vai receber quem vair sair

    const [produtos, setProdutos] = useState([]);

    const priceFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
        minimumIntegerDigits: "2",
    });


    useEffect(() => {
        const getComanda = async () => {
            const json = await api.getComanda(id);
            if(!json.error){
                setComanda(json);
                setListProducts(json.pedidos);
                setPrice(parseFloat(json.valor_final));   
                setSoma(parseFloat(json.valor_final));   
                cont = json.pedidos.length;
                setSit(json.situacao);
            }
        }
        getComanda();
    },[]);
    
    useEffect(() => {
        const getProduto = async () => {

            const json = await api.getProducts({limit: 0, q});

            if(!json.error){
                setProdutos(json.products);
            }
        };

        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(getProduto, 500)


    }, [q]);

    useEffect(() => {
        setTotal((pix+debito+credito)-soma);
        console.log(pix+debito+credito - soma)
        // console.log(total, pix, soma, debito, credito);
    }, [pix, debito, credito, soma]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        let errors = [];


        if(price){
            price.toString().replace(".", ",");
        }

        const comanda = { 
                remove,
                listProducts1,
                sit,
                price
        };
        console.log(comanda, id);

        const json = await api.updateComanda(id, comanda);
        
        // window.location.reload()

    };

    return (
        <PageArea>
            <div className="container-cadastro">
                <div className="pad">
                    <h2>Comanda #{comanda.id_comanda} da mesa {comanda.mesa}, {comanda.User && comanda.User.name}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="teste">
                        <div className="area nome-garcom">
                                <h3>Situação</h3>
                                <select onChange={(e) => setSit(e.target.value)}>
                                        <option value="">Selecione</option>
                                        {situacoes.map((situacao) => (
                                            <option
                                                key={sit}
                                                value={sir++}
                                            >
                                                {situacao}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                        </div>

                        <div className="teste">
                            <div className="left produtos">
                                <h3>Produtos</h3>
                                <div className="search">
                                        {/* <img src="lupa.png"/> */}
                                        <input 
                                            type="text"
                                            value={q}
                                            onChange={e => setQ(e.target.value)}
                                            />
                                        <ul>
                                            {produtos.map((product) => (
                                                <li
                                                    key={product.id_produto}
                                                    value={product.id_produto}
                                                >
                                                    <label>
                                                        {product.Produto ? product.Produto.nm_produto: product.nm_produto} 
                                                        <button type="button"
                                                                onClick={() => {
                                                                    setListProducts([...listProducts, {...product, uuid:cont++ }])
                                                                    setListProducts1([...listProducts1, {...product, uuid:cont++ } ])
                                                                    setPrice(price+parseFloat(product.valor))
                                                                    setQ("")
                                                                }}
                                                                >Adicionar</button>
                                                    </label>
                                                    <hr/>
                                                </li>
                                            ))}
                                        </ul>
                                </div>                                
                            </div>
                            <div className="right">
                                <h3>Lista de Pedidos </h3>
                                    <div className="lista-pedidos">
                                        <ul>
                                            {listProducts.map((product) => (
                                                                                                
                                                <li
                                                    key={contP}
                                                >
                                                    <label>
                                                        {product.Produto ? product.Produto.nm_produto: product.nm_produto} 
                                                        <h3>R$ {product.Produto ? product.Produto.valor: product.valor}</h3>
                                                        <button className="retirar"
                                                            type="button"
                                                            onClick={() => { 
                                                                const remover = comanda.pedidos.find((product1) => {
                                                                    return product1.id == product.id;
                                                                });

                                                                if(remover){
                                                                    setRemove([...remove, remover ]);

                                                                    const copy = [];
                                                                    for(let i=0; i <listProducts.length; i++){
                                                                        if(listProducts[i].id != product.id){
                                                                            copy.push(listProducts[i]);
                                                                        }
                                                                    }
                                                                    setListProducts(copy);
                                                                }else {
                                                                    const copy = [];
                                                                    for(let i=0; i <listProducts.length; i++){
                                                                        if(listProducts[i].uuid != product.uuid){
                                                                            copy.push(listProducts[i]);
                                                                        }
                                                                    }
                                                                    setListProducts(copy);
                                                                }
                                                                setPrice(price-parseFloat(product.valor))
                                                            }}
                                                            >
                                                            {product.cancelado ? "Cancelado":"Remover"}
                                                        </button>
                                                    </label>
                                                    <hr/>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="price">
                                        <label>Valor total: 
                                            <h3>{priceFormatter.format(price)}
                                            </h3>
                                        </label>
                                    </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="area">
                                <button>alterar</button>
                            </div>
                            <div className="area">
                                <button
                                    onClick={() => {
                                        setFinal(!final);
                                    }}>finalizar</button>
                            </div>
                        </div>                                                            
                        <div className="area">
                            {error && <ErrorMessage>{error}</ErrorMessage>}
                        </div>

                        <div className={final ? "paga":"nao"}>
                            <label>
                                <h4>Pix</h4>
                                <input 
                                    autoFocus
                                    type="number"
                                    value={pix}
                                    onChange={(e) => setPix(parseFloat(e.target.value))}
                                />
                            </label>
                            <label>
                                <h4>Crédito</h4>
                                <input 
                                    autoFocus
                                    type="number"
                                    value={debito}
                                    onChange={(e) => setDebito(parseFloat(e.target.value))}
                                />
                            </label>
                            <label>
                                <h4>Crédito</h4>
                                <input 
                                    type="number"
                                    value={credito}
                                    onChange={(e) => setCredito(parseFloat(e.target.value))}    
                                />
                            </label>
                            <label>
                                <h4>Valor restante</h4>
                                <span> {total} </span>
                            </label>
                            <label>
                                <button>Fechar Comanda</button>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </PageArea>
    );
};
export default Page;
