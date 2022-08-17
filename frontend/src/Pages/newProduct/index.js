import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

import useApi from "../../helpers/api";

import { PageArea } from "./styled";
import { ErrorMessage } from "../../components/mainComponents";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const Page = () => {
    const api = useApi();
    const fileField = useRef();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [Ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        const getIngredient = async () => {
            const ingre = await api.getIngredients();
            setIngredients(ingre.ingredientes);
            console.log(ingre.ingredientes);
        }
        getIngredient();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats.categories);
        };
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");
        let errors = [];

        if (!title.trim()) {
            errors.push("Título é obrigatório");
        }
        if (!category) {
            errors.push("Categoria é obrigatória");
        }

        if (errors.length !== 0) {
            setError(errors.join("\n"));
            setDisabled(false);
            return;
        }

        const fData = new FormData();

        fData.append("name", title);
        fData.append("category", category);
        fData.append("price", price);
        fData.append("description", desc);
        fData.append("ingredients",JSON.stringify(selectIngredients));
        // fData.append("desc", desc);
        if (fileField.current) {
            if (fileField.current.files.length > 0) {
                for (let i = 0; i < fileField.current.files.length; i++) {
                    fData.append("img", fileField.current.files[i]);
                }
            }
        }

        const json = await api.addProduct(fData);

        if (!json.error) {
            // navigate(`/ad/${json.id}`);
            navigate("/");
            return;
        } else {
            setError(json.error);
        }

        setDisabled(false);
    };

    const priceMask = createNumberMask({
        prefix: "R$ ",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ".",
        allowDecimal: true,
        decimalSymbol: ",",
    });

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    
    const [selectIngredients, setSelectIngredients] = useState([]);
    
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectIngredients(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
            );
    };
    

    return (
        <PageArea>
            <div className="container-cadastro">
                <h2>Cadastro de produto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="area">
                        <label>
                            <h3>Nome:</h3>
                            <input
                                type="text"
                                disabled={disabled}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="area">
                        <label>
                            <h3>Categoria:</h3>
                            <select
                                disabled={disabled}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                {categories &&
                                    categories.map((i) => (
                                        <option
                                            key={i.id_categoria}
                                            value={i.id_categoria}
                                        >
                                            {i.nm_categoria}
                                        </option>
                                    ))}
                            </select>
                        </label>
                    </div>

                    <div className="area">
                        <label>
                            <h3>Descrição:</h3>
                            <input
                                className="desc"
                                type="text"
                                disabled={disabled}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="area">
                        <label>
                            <h3>Preço:</h3>
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$"
                                disabled={disabled}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="area">
                        <label>
                            <h3>Imagens:</h3>
                            <input
                                type="file"
                                ref={fileField}
                                disabled={disabled}
                                multiple
                            />
                        </label>
                    </div>

                    <div className="area">
                        <label>
                            <h3>Ingredientes:</h3>

                            
                                
                                <Select className="selectIngredient"
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectIngredients}
                                onChange={handleChange}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    let names = [];
                                    
                                    for(const ingredient of Ingredients) 
                                        if(selected.includes(ingredient.id_ingrediente))
                                            names.push(ingredient.nm_ingrediente);
                                    return names.join(', ');
                                }}
                                MenuProps={MenuProps}
                                >
                                {Ingredients.map((ingredient) => (
                                    <MenuItem key={ingredient.id_ingrediente} value={ingredient.id_ingrediente}>
                                    <Checkbox checked={selectIngredients.includes(ingredient.id_ingrediente)} />
                                    <ListItemText primary={ingredient.nm_ingrediente}/>
                                    </MenuItem>
                                )
                                
                                )}
                        
                                </Select>
                            
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