import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import GAMES from '../constants'
import { useAuth0 } from "@auth0/auth0-react"


function Edit() {
    const [pokemon, setPokemon] = useState({});
    const [pokedex, setPokedex] = useState({});
    const [pokedexEntry, setPokedexEntry] = useState({});

    const navigate = useNavigate();
    const { user } = useAuth0();
    console.log(user);

    let params = useParams();
    const id = params.id;


    const getPokemon = async () => {
        try {
            const url = `/${id}`
            // const baseURL = `https://pokemondb117.herokuapp.com/pokemon/api/edit`
            const baseURL = `http://localhost:3001/pokemon/api/edit`
            const res = await axios({ url, responseType: "json", baseURL });
            console.log(res.data);
            setPokemon(res.data);
            return res.data;
        }
        catch (e) {
            console.log(e);
        }
    }

    const getDefaultEntry = (id) => {
        return {
            pokemonId: id,
            games: GAMES.map((game) => ({
                name: game,
                caught: false,
                seen: false,
                onTeam: false,
            }))
        }
    }

    const getPokedex = async (poke) => {
        try {
            const url = `/${user.sub.split('|')[1]}`
            // const baseURL = `https://pokemondb117.herokuapp.com/pokemon/api/pokedex`
            const baseURL = 'http://localhost:3001/pokemon/api/pokedex'
            const res = await axios({ url, responseType: "json", baseURL });
            const dex = res.data
            const dexEntry = dex.pokemon.find(entry => entry.pokemonId === poke._id)
            console.log(`pokemon: ${JSON.stringify(poke, null, 2)}`);
            setPokedex(dex);
            setPokedexEntry(dexEntry ? dexEntry : getDefaultEntry(poke._id));
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getPokemon().then((poke) => { getPokedex(poke) });
    }, [user]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const baseURL = `https://pokemondb117.herokuapp.com/pokemon/api/pokedex`
            const url = `/${pokemon._id}`
            // const baseURL = `http://localhost:3001/pokemon/api/edit`
            console.log(pokemon);
            const existingEntry = pokedex.pokemon.find(entry => entry.pokemonId === pokemon._id)
            if (!existingEntry) {
                pokedex.pokemon.push(pokedexEntry)
            }
            console.log(pokedex)
            const res = await axios({ url, responseType: "json", baseURL, method: 'put', data: pokedex });
            // console.log(res.data);
            navigate('/pokemon')


        } catch (e) {
            console.log(e);
        }
    };



    const handleChange = (e, gameName, prop) => {
        const game = pokedexEntry.games.find((gamer) => gamer.name === gameName)
        game[prop] = !game[prop];
        setPokemon({ ...pokemon })
        console.log(pokemon);
    }

    return (
        <div className='mainPage'>
            <div className='container' key={pokemon._id}>
                <img src={pokemon.image} alt="" />
                <div>Poké Name: {pokemon.name}</div>
                <div className='divTable'>
                    <div className='divTableBody'>
                        <div className='divTableRow'>
                            <div className='divTableCell'>Type 1</div>
                            <div className='divTableCell'>{pokemon.pokeType1}</div>
                        </div>
                        <div className='divTableRow'>
                            <div className='divTableCell'>Type 2</div>
                            <div className='divTableCell'>{pokemon.pokeType2}</div>
                        </div>

                        <div className='divTableRow'>
                            <div className='divTableCell'>Height</div>
                            <div className='divTableCell'>{" "}{pokemon.height} inches</div>
                        </div>
                        <div className='divTableRow'>
                            <div className='divTableCell'>Weight</div>
                            <div className='divTableCell'>{" "}{pokemon.weight}lbs</div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                {pokedexEntry && pokedexEntry.games ? pokedexEntry.games.map((data, index) => {
                                    return (
                                        <div key={data.name}>
                                            <div>Game: {data.name}</div>
                                            <div>Seen:<input type='checkbox' checked={data['seen']} onChange={(e) => handleChange(e, data.name, 'seen')} /></div>
                                            <div>Caught:<input type='checkbox' checked={data['caught']} onChange={(e) => handleChange(e, data.name, 'caught')} /></div>
                                            <div>On Team:<input type='checkbox' checked={data['onTeam']} onChange={(e) => handleChange(e, data.name, 'onTeam')} /></div>
                                        </div>
                                    )
                                }) : null}
                            </div>
                            <div>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default Edit