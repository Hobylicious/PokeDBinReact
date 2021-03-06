import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function GameSelector() {
    const [pokemon, setPokemon] = useState([])
    const { user } = useAuth0();

    const location = useLocation();
    console.log(location)
    const locationPath = location.pathname

    const getPokemon = async () => {
        try {
            console.log(user)
            const baseURL = `https://pokemondb117.herokuapp.com/pokemon/api/game${locationPath}`
            // const baseURL = `http://localhost:3001/pokemon/api/game`
            const res = await axios({ url: user.sub.split('|')[1], responseType: "json", baseURL });
            console.log(res.data);
            setPokemon(res.data)

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log('there')
        getPokemon();
    }, [location.pathname]);

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

export default GameSelector