import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import {
    PageContainer,
    PageTitle,
    ErrorMessage,
} from "../../components/mainComponents";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import { PageArea } from "./styled";

import useApi from "../../helpers/api";

const Page = () => {
    const api = useApi();

    const fileField = useRef();
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [inative, setInative] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        const data = new FormData();

        name !== "" && data.append("name", name);
        description !== "" && data.append("description", description);
        price !== "" && data.append("price", price);
        category !== "" && data.append("category", category);
        inative !== "" && data.append("inative", inative);

        selectedIngredients.length !== 0 &&
            (await api.putIngredientFormProduto(id, {
                ingredients: selectedIngredients,
            }));
        console.log(ingredients);
        console.log(selectedIngredients);

        if (fileField.current.files.length > 0) {
            for (let i = 0; i < fileField.current.files.length; i++) {
                data.append("img", fileField.current.files[i]);
            }
        }

        const json = await api.updateProduct(data, id);
        if (!json.error) {
            navigate(`/product/${id}`);
            return;
        } else {
            setError(json.error);
        }

        setDisabled(false);
    };

    useEffect(() => {
        const getIngredient = async () => {
            const ingre = await api.getIngredients();
            setIngredients(ingre.ingredientes);
        };
        const getProduct = async () => {
            const prod = await api.getIngredienteFromProduct(id);

            return prod.ingredients;
        };

        getIngredient();
        getProduct().then((data) => {
            const selected = [];
            for (const ingredient of data) {
                selected.push(ingredient.id_ingrediente);
            }
            setSelectedIngredients(selected);
        });
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const clist = await api.getCategories();
            setCategories(clist.categories);
        };
        getCategories();
    }, []);

    const priceMask = createNumberMask({
        prefix: "R$ ",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ".",
        allowDecimal: true,
        decimalSymbol: ",",
    });

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedIngredients(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

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

    return (
        <PageArea>
            <div className="container-cadastro">
                <h2> Edite o produto </h2>
                <form onSubmit={handleSubmit}>
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
                            <h3>Categoria</h3>

                            <select
                                disabled={disabled}
                                onChange={(e) => setCategory(e.target.value)}
                            >
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
                            <h3>Preço</h3>

                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$ 0,00"
                                disabled={disabled}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="area">
                        <h3>Descrição</h3>

                        <input
                            disabled={disabled}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                    </div>

                    <div className="area">
                        <label>
                            <h3>Imagens</h3>

                            <input
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </label>
                    </div>

                    <div className="area">
                        <label>
                            <h3>Ingredientes:</h3>

                            <Select
                                className="selectIngredient"
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedIngredients}
                                onChange={handleChange}
                                input={<OutlinedInput />}
                                // selected.join(', ')
                                renderValue={(selected) => {
                                    let names = [];

                                    for (const ingredient of ingredients)
                                        if (
                                            selected.includes(
                                                ingredient.id_ingrediente
                                            )
                                        )
                                            names.push(
                                                ingredient.nm_ingrediente
                                            );
                                    return names.join(", ");
                                }}
                                MenuProps={MenuProps}
                            >
                                {ingredients.map((ingredient) => (
                                    <MenuItem
                                        key={ingredient.id_ingrediente}
                                        value={ingredient.id_ingrediente}
                                    >
                                        <Checkbox
                                            checked={selectedIngredients.includes(
                                                ingredient.id_ingrediente
                                            )}
                                        />
                                        <ListItemText
                                            primary={ingredient.nm_ingrediente}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </label>
                    </div>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Alterar Anúncio</button>
                        </div>
                    </label>
                </form>
            </div>
        </PageArea>
    );
};

export default Page;
