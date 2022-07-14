import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';

const Search = () => {
    const [pokemon, setPokemon] = useState("pikachu");
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonType, setPokemonType] = useState("")

    // const getPokemon = async () => {
    //     const toArray = [];
    //     try {
    //         const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    //         const res = await axios.get(url);
    //         toArray.push(res.data);
    //         setPokemonType(res.data.types[0].type.name);
    //         setPokemonData(toArray);
    //         console.log(res);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const getPokemon = async () => {
        const toArray = [];
        try {
            // const url = `https://pokemondb117.herokuapp.com/pokemon/${pokemon}`
            const url = `/${pokemon}`
            const baseURL = `http://localhost:3001/pokemon/api`
            console.log(url);
            const res = await axios({ url, responseType: "json", baseURL });
            console.log(res.data);
            toArray.push(res.data);
            setPokemonType(res.data.pokeType1);
            setPokemonData(toArray);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }




    // useEffect(() => {
    //   getPokemon();
    // }, []);
    const handleChange = (e) => {
        setPokemon(e.target.value.toLowerCase())
    }

    const handleSubmit = (e) => {
        console.log('stuff')
        e.preventDefault();
        getPokemon();
    }



    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text"
                        onChange={handleChange}
                        placeholder="Enter Pokemon Name"
                    />
                </label>
            </form>
            {pokemonData.map((data) => {
                return (
                    <div className='container'>
                        <img src={data.image} alt="" />
                        <div className='divTable'>
                            <div className='divTableBody'>
                                <div className='divTableRow'>
                                    <div className='divTableCell'>Type</div>
                                    <div className='divTableCell'>{pokemonType}</div>
                                </div>
                                <div className='divTableRow'>
                                    <div className='divTableCell'>Height</div>
                                    <div className='divTableCell'>{" "}{data.height}</div>
                                </div>
                                <div className='divTableRow'>
                                    <div className='divTableCell'>Weight</div>
                                    <div className='divTableCell'>{" "}{data.weight}lbs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
export default Search;