import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Homepage() {

    const [pokemon, setPokemon] = useState([]);

    const getPokemon = async () => {
        try {
            const baseURL = `https://pokemondb117.herokuapp.com/pokemon/api`
            const url = `/all`
            // const baseURL = `http://localhost:3001/pokemon/api`
            console.log(url);
            const res = await axios({ url, responseType: "json", baseURL });
            console.log(res.data);
            setPokemon(res.data.pokemons)

        } catch (e) {
            console.log(e);
        }
    }



    useEffect(() => {
        getPokemon();
    }, []);

    return (
        <div className='mainPage'>

            {pokemon ? pokemon.map((data) => {
                return (
                    <div className='container' key={data._id}>
                        <Link to={`/pokemon/${data._id}`}><img src={data.image} alt="" /></Link>
                        <div>Poké Name: {data.name}</div>
                        <div className='divTable'>
                            <div className='divTableBody'>
                                <div className='divTableRow'>
                                    <div className='divTableCell'>Type 1</div>
                                    <div className='divTableCell'>{data.pokeType1}</div>
                                </div>
                                <div className='divTableRow'>
                                    <div className='divTableCell'>Type 2</div>
                                    <div className='divTableCell'>{data.pokeType2}</div>
                                </div>

                                <div className='divTableRow'>
                                    <div className='divTableCell'>Height</div>
                                    <div className='divTableCell'>{" "}{data.height} inches</div>
                                </div>
                                <div className='divTableRow'>
                                    <div className='divTableCell'>Weight</div>
                                    <div className='divTableCell'>{" "}{data.weight}lbs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) : null}


        </div >
    )
}

export default Homepage