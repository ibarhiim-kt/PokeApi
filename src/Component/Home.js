import React from "react";
import { useState,useEffect } from "react";
import Axios from "axios";
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function Home(){

    // const[poki,setPoki] = useState("");
    // const[pokiChoosen,setPokiChoosen] = useState(false); 
    const[galleryDisplay,setGalleryDisplay] = useState(true);  
    const[pokemonList, setPokemonList] = useState([]);
    console.log(pokemonList, "pokemon list");
    const[page,setPage]=useState(1);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [filterText, setFilterText] = useState("");
    const limit = 20;
    
    
    // const reset=()=>{
    //     setPokiChoosen(false);
    //     setGalleryDisplay(true);
    // }
    const fetchPokemonList = async (page) => {
        const offset = (page-1)*limit;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const promises = response.data.results.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return res.data;        
      });
      const pokemonDetails = await Promise.all(promises);
      setPokemonList(pokemonDetails);
      setFilteredPokemonList(pokemonDetails);
    //   setNextpage(response.data.next);
    //   setPrevpage(response.data.previous);
    } catch (error) {
      console.error("Error fetching the Pokémon:", error);
    }
  };
  useEffect(() => {
    fetchPokemonList(page);
  }, [page]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    if (event.target.value === "") {
      setFilteredPokemonList(pokemonList);
    } else {
      setFilteredPokemonList(
        pokemonList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
   };
//    if (!galleryDisplay) return <div>Loading...</div>;
    return(
        <div className="bg-[pink]">
        <div className="bg-[#EF5350]">
        <div className=" max-w-[1280px] m-[auto] max-1050px:max-w-[900px]
        max-1050px:px-[10px] max-800px:max-w-[700px] max-550px:max-w-[350px]">
        <div className="py-[30px] pl-[15px] max-w-[180px] max-550px:pl-[10px]">
        <img src="pokeLogo.png" alt="img" className="w-[150px] max-550px:w-[100px]"/>
        </div>
        <div className=" flex flex-col items-center pb-[50px]">
        <h1 className="text-[50px] max-800px:text-[40px] max-550px:text-[25px] font-semibold">Poki Images</h1>
        {/* <div className="w-screen sticky top-0 flex justify-center "> */}
        <div className="flex max-w-[600px] ">
        <input type="text" placeholder="Search your favourite pokemon" className="w-[500px] h-[40px] pl-[20px] rounded-[5px] max-800px:w-[350px] 
        max-550px:w-[200px] max-550px:text-[10px] outline-none" 
        onChange={handleFilterChange}/>
        {/* <button className="bg-[pink] px-[10px] rounded-tr-[5px] rounded-br-[5px]" onClick={searchPoki}><img src="searchIcon.svg" alt="" /></button> */}
        {/* <button className="bg-[pink] rounded-[5px] ml-[5px] w-[39px]" onClick={reset}><img src="resetIcon.png" alt="" /></button> */}
        </div>
        </div>
        </div>
        </div>       
        
        {/* <div className="displayData flex justify-center ">               
                {!pokiChoosen?(""):(
                <>                
                <div className="border-[2px] border-[#EF5350] px-[50px] 
                my-[40px] rounded-[50px] pb-[20px] bg-[#ef535072] 
                max-550px:px-[30px] max-550px:pb-[10px]">             
                <img src={pokiDetail.img} className="w-[200px] h-[200px] max-550px:w-[150px] max-550px:h-[150px]"/>
                
                <h1 className="text-[23px] max-550px:text-[18px]"><span className="font-semibold">Name:</span> {pokiDetail.name}</h1>
                <h1 className="text-[23px] max-550px:text-[18px]"><span className="font-semibold">Type:</span> {pokiDetail.types}</h1>                
                <h1 className="text-[23px] max-550px:text-[18px]"><span className="font-semibold">Attack:</span> {pokiDetail.attack}</h1>
                <h1 className="text-[23px] max-550px:text-[18px]"><span className="font-semibold">Defense:</span> {pokiDetail.defense}</h1> 
                <h1 className="text-[23px] max-550px:text-[18px]"><span className="font-semibold">hp:</span> {pokiDetail.hp}</h1>               
                </div>
                </>
                )}      
        </div> */}
        <div> 
        
                {!galleryDisplay?(""):(
                <>        
            <div className="grid grid-cols-4 m-[auto] justify-items-center max-w-[1280px]
             max-1050px:max-w-[900px] max-1050px:px-[10px] max-1050px:grid-cols-3 max-800px:max-w-[700px] max-800px:grid-cols-2 max-550px:max-w-[350px] 
             max-550px:grid-cols-1" >
                    {filteredPokemonList.map((pokemon) => (
                    <a href={`character/${pokemon.id}`} key={pokemon.id} className="cursor-pointer w-[250px] p-[10px] m-[20px] flex flex-col items-center border-[2px] rounded-[50px] border-[#EF5350] bg-[#ef535072]">
                            <h1 className="text-[25px] font-semibold">{pokemon.name}</h1>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name}
                            className="w-[150px] h-[150px]" />
                            <p className="text-[20px]">ID: {pokemon.id}</p>
                            <p className="text-[20px]">Height: {pokemon.height}</p>
                            <p className="text-[20px]">Weight: {pokemon.weight}</p>
                    </a>
                    ))}
                </div>                
            
                <div className="max-w-[1280px] m-[auto] flex justify-center py-[20px]
                     max-1050px:max-w-[900px] max-800px:max-w-[700px] max-550px:max-w-[350px]">
                    
                <Stack spacing={2}>
                <Pagination                
                  count={Math.ceil(1000 / limit)}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  size="large"
                />
                </Stack>
                </div>                
                </>
                )}
            </div>
        </div>
    )
}