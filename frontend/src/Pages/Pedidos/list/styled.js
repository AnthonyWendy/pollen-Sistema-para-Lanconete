import styled from "styled-components";

export const PageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .comandas-list {
    width: 1200px;
    height: 800px;
    margin-top: 20px;
    
  }

  .card-comanda {
    display: block;

    width: 100%;
    max-height: 800px;
    border-radius: 15px;
    
    color: #fb0043;
    background: #141414;
    
    
    border: 1px solid blue;
    
    .cabecalho {
      h3{ 
        font-size: 25px;
      }
      background: #242424;
      border-radius: 15px;

      border-width: 0.2px 2px 2px 0.2px;
      border-style: solid;
      border-color: #0d0d0d;

      margin: 15px 10px 0px 10px;
      padding: 10px 14px; //cima lado
      width: 1150px;

      display: flex;
      justify-content: space-between;
    }

    .list-items{
      padding: 20px 0px 20px 30px;

      small {
        font-size: 20px;
      }
      
      ul{
        padding: 0px 0px 0px 50px;
        overflow-y: scroll;
        
        
        li {
          list-style-type: none;
        }
      }
  
      ul::-webkit-scrollbar{
        background: #fb0043;
        width: 5px;
        border-radius: 6px;
      }
    }

  

  }
`;
