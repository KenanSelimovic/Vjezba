import { Link, Redirect } from "react-router-dom";
import "../css/Header.css";
import styled from "styled-components";
import { useState } from "react";
const Header = () => {
const[redirect,setRedirect] =useState(false);
const [searchTerm,setSearchTerm]=useState('');
  const submitHandler=(e)=>{
    
    if(e.key==='Enter'&&e.target.value!=='') {
    console.log('jest')
    setSearchTerm(e.target.value)
    setRedirect(true);
    e.target.value=''

  }
  }
  const switcharo=()=>{
    if(redirect) return <Redirect to={`/players/stats/${searchTerm}`}></Redirect>
  }

  
  return (
    <HeaderWrapper color={'black'}>
      <div>
        {switcharo()}
      </div>
      <Link to="/">
        <img
          className="logo"
          src="https://cdn.nba.com/logos/leagues/logo-nba.svg"
          alt="NBA Logo"
          title="NBA Logo"
        />
        
      </Link>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
      <Input onKeyDown={submitHandler} placeholder="Search players by id"></Input>
      </div>
    </HeaderWrapper>
  );
};
export default Header;

const Input=styled.input`
margin-right:1.5rem;
display:flex;
flex-direction:column;
justify-content:center;
		border: 0;
		outline: 0;
    padding: 0.3rem;
    border-radius:16px;
`

const HeaderWrapper = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  background-color:${props=>props.color};  
  height: 1rem;
  position: sticky;
  top: 0;
  width: 100vw;
  max-width:100%;
  height: 4rem;
`;
