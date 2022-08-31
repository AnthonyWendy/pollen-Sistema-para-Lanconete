import styled from "styled-components";

export const PageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  h3{ 
    font-size: 16px;
  }

  .comandas-list {
    width: 1200px;
    height: 800px;
    margin-top: 20px;
    
  }

  .card-comanda {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    

    width: 70%;
    max-height: 800px;
    border-radius: 15px;
    margin: auto;
    margin-top: 20px;
    
    color: #fb0043;
    background: #141414;
    
    .cabecalho {
      background: #242424;
      border-radius: 15px;

      border-width: 0.2px 2px 2px 0.2px;
      border-style: solid;
      border-color: #0d0d0d;

      margin: 10px 0px 10px 0px;
      padding: 10px 14px; //cima lado
      width: 80%;

      display: flex;
      justify-content: space-between;
    }

    .list-items{
      width: 80%;
      max-height: 500px;
      margin: 0px 10px 5px 0px;;
      
      small {
        display: flex;
        justify-content: space-between;
        margin-right: 10px;
      }
      
      ul{
        font-size: 18px;
        margin: 0px 10px 0px 50px;
        height: 100%;
        overflow-y: scroll;
        
        
        li {
          list-style-type: none;

          hr{
            height: 1px;
            margin: 5px 2px 5px 0px;
            border-color: #fb0043;
          }
        }
      }
  
      ul::-webkit-scrollbar{
        background: #fb0043;
        width: 3px;
        border-radius: 6px;
      }
    }

    .footer {
      width: 100%;
      display: flex;
      justify-content: center;

      margin: 10px 0px;

      h3 {
        left: 0;
      }
      
    }
  
    button {
      width: 350px;
      height: 25px;

      text-align: center;
      font-family: "Inter", sans-serif;
      font-weight: 800;
      font-size: 20px;
      color: #fb0043;

      background: #242424;
      border-width: 1px 2px 2px 1px;
      border-style: solid;
      border-color: #0d0d0d;;

      cursor: pointer;

      &:hover {
          border-width: 0px 2px 2px 0px;
          border-color: #fb0043;
      }
    }

  }
`;
