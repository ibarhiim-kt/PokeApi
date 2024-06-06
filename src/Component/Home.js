import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import {ClipLoader} from "react-spinners";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const[galleryDisplay,setGalleryDisplay] = useState(true);
  const[loader,setLoader] = useState(false);
  const limit = 20;

  // Fetch all Pokémon names and URLs
  const fetchAllPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000`);
      setAllPokemon(response.data.results);
    } catch (error) {
      console.error("Error fetching all Pokémon:", error);
    }
  };

  const fetchPokemonDetails = async (pokemonList) => {
    const promises = pokemonList.map(async (pokemon) => {
      const res = await axios.get(pokemon.url);
      return res.data;
    });
    return Promise.all(promises);
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const fetchPokemonList = async (page) => {
    setLoader(true);
    const offset = (page - 1) * limit;
    try {
      const pokemonSubset = filteredPokemonList.slice(offset, offset + limit);
      const pokemonDetails = await fetchPokemonDetails(pokemonSubset);
      setPokemonList(pokemonDetails);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching the Pokémon:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPokemonList(page);
  }, [page, filteredPokemonList]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = async (event) => {
    const text = event.target.value;
    setFilterText(text);
    if (text === "") {
      setFilteredPokemonList(allPokemon);
    } else {
      const filtered = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPokemonList(filtered);
    }
    setPage(1); // Reset to first page when filter changes
  };

  useEffect(() => {
    if (filterText === "") {
      setFilteredPokemonList(allPokemon);
    }
  }, [allPokemon, filterText]);

  return (
    <div className="bg-[pink]">
      <div className="bg-[#EF5350]">
        <div className="max-w-[1280px] m-[auto] max-1050px:max-w-[900px] max-1050px:px-[10px] max-800px:max-w-[700px] max-550px:max-w-[350px]">
          <div className="py-[30px] pl-[15px] max-w-[180px] max-550px:pl-[10px]">
            <img src="pokeLogo.png" alt="img" className="w-[150px] max-550px:w-[100px]" />
          </div>
          <div className="flex flex-col items-center pb-[50px]">
            <h1 className="text-[50px] max-800px:text-[40px] max-550px:text-[25px] font-semibold">
              Poki Images
            </h1>
            <div className="flex max-w-[600px]">
              <input
                type="text"
                placeholder="Search your favourite pokemon"
                className="w-[500px] h-[40px] pl-[20px] rounded-[5px] max-800px:w-[350px] max-550px:w-[200px] max-550px:text-[10px] outline-none"
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
      {loader ? ( 
          <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color={"#EF5350"} loading={loader}/>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-4 m-[auto] mt-[50px] justify-items-center max-w-[1280px]
              max-1050px:max-w-[900px] max-1050px:px-[10px] max-1050px:grid-cols-3 max-800px:max-w-[700px] max-800px:grid-cols-2 max-550px:max-w-[350px]
              max-550px:grid-cols-1"
            >
              {pokemonList.map((pokemon) => (
                <Link to={`/character/${pokemon.id}`} key={pokemon.id}>
                  <div className="cursor-pointer w-[250px] p-[10px] m-[20px] flex flex-col items-center border-[2px] rounded-[50px] border-[#EF5350] bg-[#ef535072]">
                    <h1 className="text-[25px] font-semibold">{pokemon.name}</h1>
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-[150px] h-[150px]"
                    />
                    <p className="text-[20px]">ID: {pokemon.id}</p>
                    <p className="text-[20px]">Height: {pokemon.height}</p>
                    <p className="text-[20px]">Weight: {pokemon.weight}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="max-w-[1280px] m-[auto] flex justify-center py-[20px] max-1050px:max-w-[900px] max-800px:max-w-[700px] max-550px:max-w-[350px]">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(filteredPokemonList.length / limit)}
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
  );
}
