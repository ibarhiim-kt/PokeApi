import React,{useState,useEffect} from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";

export default function Detail (){
        const {slug} = useParams();
        const[pokiDetail,setPokiDetail] = useState(null);

        useEffect(() => {
            Axios.get(`https://pokeapi.co/api/v2/pokemon/${slug}`).then((response) => {
              setPokiDetail({
                name: response.data.name,
                species: response.data.species.name,
                img: response.data.sprites.front_default,
                hp: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defense: response.data.stats[2].base_stat,
                types: response.data.types[0].type.name,
              });
            });
          }, [slug]);
        if (!pokiDetail) return <div>Loading...</div>;
    
    return(

        <div className="bg-[pink] ">
        <div className="max-w-[1280px] m-[auto] h-[100vh] flex justify-center 
        max-1050px:max-w-[900px] max-800px:max-w-[700px] max-550px:max-w-350px">
        <div className="w-[90%] flex items-center justify-evenly max-550px:flex-col *:
        max-550px:justify-center">
                <div className="bg-[#ef535072] w-[400px] rounded-[30%] border-[2px]  border-[#EF5350] max-1050px:w-[300px] max-800px:w-[240px] max-550px:mb-[50px]">             
                <img src={pokiDetail.img} className="w-[100%] h-[100%] "/>
                </div>
                <div className="w-[400px] py-[87px] rounded-[30%] flex flex-col items-center justify-center border-[#EF5350] border-[2px] 
                bg-[#ef535072] max-1050px:w-[300px] max-1050px:py-[37px] max-800px:w-[240px] max-800px:py-[44px]">
                <h1 className="text-[30px] max-800px:text-[20px]"><span className="font-semibold">Name:</span> {pokiDetail.name}</h1>
                <h1 className="text-[30px] max-800px:text-[20px]"><span className="font-semibold">Type:</span> {pokiDetail.types}</h1>                
                <h1 className="text-[30px] max-800px:text-[20px]"><span className="font-semibold">Attack:</span> {pokiDetail.attack}</h1>
                <h1 className="text-[30px] max-800px:text-[20px]"><span className="font-semibold">Defense:</span> {pokiDetail.defense}</h1> 
                <h1 className="text-[30px] max-800px:text-[20px] max-550px:text-[18px]"><span className="font-semibold">hp:</span> {pokiDetail.hp}</h1>     
                </div>          
        </div>
        </div>
        </div>
    )
}