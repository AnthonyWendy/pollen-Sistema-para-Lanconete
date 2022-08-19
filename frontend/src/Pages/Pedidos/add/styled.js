import styled from "styled-components";

export const PageArea = styled.div`


    padding: 20px;
    .container-cadastro {
        width: 1300px;
        height: calc(95vh - 50px);
        margin: auto;
        border-radius: 7px;
        
        background: #242424;
        
        font-size: 15px;
        font-family: "Inter", sans-serif;
        color: #fb0043;
        
        .pad{
            padding: 20px;
        }

        form {
            display: block;
            margin-top: 20px;
            .area {
                padding: 10px 0px 10px 45px;
                width: 95%;
            }

            .selecao {
                border: 1px solid red;
                width: 70vw;
                height:10vw;
            }

            button {
                width: 350px;
                height: 50px;

                text-align: center;
                font-family: "Inter", sans-serif;
                font-weight: 800;
                font-size: 20px;
                color: #fb0043;

                background: #141414;
                border-width: 0px 2px 2px 0px;
                border-style: solid;
                border-color: rgba(36, 36, 36, 0.56);

                cursor: pointer;

                &:hover {
                    border-color: #fb0043;
                }
            }

            input,
            select {
                padding: 10px;
                height: 50px;
                width: 350px;
                border: 1px solid #141414;
                background: #242424;
                outline: none;
                color: #fb0043;
                padding-left: 10px;
                font-size: 15px;
                transition: border-color 150ms ease-in-out;
                &:hover,
                :focus {
                    border-color: #fb0043;
                }
            }

            input::placeholder {
                font-style: italic;
                font-weight: 200;
            }
        }

        .teste{
            display: flex;
            justify-content: space-evenly;
            .right{
                width: 47.5%;
                height: 100px;
            }
            .left{
                background-color: #ffff;
                display: block;
                width: 47.5%;
                height: 100px;
            }
        }
    }
`;
