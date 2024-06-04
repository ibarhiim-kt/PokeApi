import React from "react";
import { useState,useEffect } from "react";
import Axios from "axios";
import axios from 'axios';
export default function Home(){

    const[poki,setPoki] = useState("");
    const[pokiChoosen,setPokiChoosen] = useState(false); 
    const[galleryDisplay,setGalleryDisplay] = useState(true);  
    const[pokemonList, setPokemonList] = useState([]);
    const[nextPage,setNextpage] = useState(null);
    const[prevPage,setPrevpage] = useState(null);
    const[pokiDetail,setPokiDetail] = useState({
            name:"",
            species:"",
            img:"",
            hp:"",
            attack: "",
            defense: "",
            types: "",
    });
    const searchPoki=()=>{
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${poki}`).then((response)=>{
            
            setPokiDetail({
            name:poki,
            species:response.data.species.name,
            img:response.data.sprites.front_default,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            types: response.data.types[0].type.name,
            });
            setPokiChoosen(true);
            setGalleryDisplay(false);
        });      
    };
    const reset=()=>{
        setPokiChoosen(false);
        setGalleryDisplay(true);
    }
    const fetchPokemonList = async (url) => {
    try {
      const response = await axios.get(url);
      const promises = response.data.results.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return res.data;
      });
      const pokemonDetails = await Promise.all(promises);
      setPokemonList(pokemonDetails);
      setNextpage(response.data.next);
      setPrevpage(response.data.previous);
    } catch (error) {
      console.error("Error fetching the Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemonList("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  }, []);
    return(
        <div>
        <div className="bg-[#EF5350]">
        <div className=" max-w-[1280px] m-[auto] max-1050px:max-w-[900px]
        max-1050px:px-[10px] max-800px:max-w-[700px] max-550px:max-w-[350px]">
        <div className="py-[30px] pl-[15px] max-w-[180px] max-550px:pl-[10px]">
        <img src="pokeLogo.png" alt="img" className="w-[150px] max-550px:w-[100px]"/>
        </div>
        <div className=" flex flex-col items-center pb-[50px]">
        <h1 className="text-[50px] max-800px:text-[40px] max-550px:text-[25px]">Poki Images</h1>
        {/* <div className="w-screen sticky top-0 flex justify-center "> */}
        <div className="flex max-w-[600px] ">
        <input type="text" placeholder="Search your favourite pokemon" className="w-[500px] h-[40px] pl-[20px] rounded-tl-[5px] rounded-bl-[5px] max-800px:w-[350px] 
        max-550px:w-[200px] max-550px:text-[10px]" 
        onChange={(event)=>{setPoki(event.target.value);
        }}/>
        <button className="bg-[pink] px-[10px] rounded-tr-[5px] rounded-br-[5px]" onClick={searchPoki}><img src="searchIcon.svg" alt="" /></button>
        {/* <button className="w-[200px] bg-[pink]" onClick={reset}></button> */}
        {/* </div> */}
        </div>
        </div>
        </div>        
        </div>
        
        <div className="displayData flex justify-center ">               
                {!pokiChoosen?(""):(
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
                )}
      
        </div>
        <div>
                {!galleryDisplay?(""):(
                <>
            <div className="bg-[pink]">
            <div className="grid grid-cols-4 m-[auto] justify-items-center max-w-[1280px]
             max-1050px:max-w-[900px] max-1050px:px-[10px] max-1050px:grid-cols-3 max-800px:max-w-[700px] max-800px:grid-cols-2 max-550px:max-w-[350px] 
             max-550px:grid-cols-1" >
                    {pokemonList.map((pokemon) => (
                    <div key={pokemon.id} className="w-[250px] p-[10px] m-[20px]
                    flex flex-col items-center border-[2px] rounded-[50px] border-[#EF5350] bg-[#ef535072]">
                            <h1 className="text-[25px] font-semibold">{pokemon.name}</h1>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name}
                            className="w-[150px] h-[150px]" />
                            <p className="text-[20px]">ID: {pokemon.id}</p>
                            <p className="text-[20px]">Height: {pokemon.height}</p>
                            <p className="text-[20px]">Weight: {pokemon.weight}</p>
                        </div>
                    ))}
                </div>
                </div>
                <div className="max-w-[1280px] m-[auto] max-1050px:max-w-[900px] 
                max-800px:max-w-[700px] max-550px:max-w-[350px]">
                    {nextPage && <button onClick={()=>fetchPokemonList(nextPage)}>Next</button>}
                    {prevPage && (<button onClick={()=>fetchPokemonList(prevPage)}>Pre</button>)}
                    {/* <Pagination count={10} /> */}

                </div>
                </>
                )}
            </div>
        </div>
    )
}