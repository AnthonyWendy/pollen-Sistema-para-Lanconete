import styled from "styled-components";

export const Fake = styled.div`
    background-color: #ddd;
    height: ${(props) => props.height || 20}px;
`;

export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;
    width: 100vw;
    justify-content: center;

    .box {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 4px #999;
        margin-bottom: 20px;
        width: 600px;
        height: 480px;
    }

    .box--padding {
        padding: 10px;
    }

    .leftSide {
        margin: auto;

        .box {
            display: flex;
        }

        .productImage {
            width: 320px;
            height: 320px;
            margin-right: 20px;

            .each-slide img {
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: Cover;
                height: 320px;
            }
        }
    }

    .productInfo {
        flex: 1;

        .name {
            margin-bottom: 20px;

            h2 {
                margin: 0;
                margin-top: 20px;
            }

            small {
                color: #999;
            }
        }

        .productDesc {
            padding-right: 20px;

            p {
                word-wrap: break-word;
                text-overflow: ellipsis;
                width: 200px;
            }
            small {
                color: #999;
            }
        }

        a {
            color: #fb0043;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }

    .area-ingredientes{
        margin:  10px 0px 20px 0px;

        h3{
            margin-bottom: 5px;
        }

        ul{
            list-style: none;
        }
    }
`;
