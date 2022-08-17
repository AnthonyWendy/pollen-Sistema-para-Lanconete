import styled from "styled-components";

export const HeaderArea = styled.div`
    background-color: #141414;

    height: 50px;

    .container {
        display: flex;
        max-width: 1000px;
        margin: auto;
        height: 100%;
        align-items: center;
    }

    a {
        text-decoration: none;
    }

    .title {
        flex: 1;
        color: #fb0043;
    }

    nav {
        padding-top: 10px;
        padding-bottom: 10px;

        ul,
        li {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        ul {
            display: flex;
            align-items: center;
            height: 40px;
        }
        li {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;
            a,
            span {
                color: #fb0043;
                font-size: 18px;
                border: 0;
                background: none;
                cursor: pointer;
                outline: none;
            }
        }
        .button {
            width: 100px;
            a {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            &:hover {
                background-color: #242424;
            }
        }
    }

    @media (max-width: 768px) {
        height: auto;
        .container {
            flex-direction: column;
        }
        .logo {
            justify-content: center;
            margin: 20px 0;
        }
        nav ul {
            flex-direction: column;
            height: auto;
        }
        nav li {
            margin: 10px 20px;
        }
    }
`;
