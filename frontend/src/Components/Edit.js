import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function Edit() {
    const [pokemon, setPokemon] = useState([]);

    let params = useParams();
    const id = params.id;


    const getPokemon = async () => {
        try {
            const url = `/${id}`
            const baseURL = `http://localhost:3001/pokemon/api/edit`
            const res = await axios({ url, responseType: "json", baseURL });
            console.log(res.data);
            setPokemon(res.data.pokemons)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPokemon();
    }, []);

    return (
        <div>Edit</div>
    )
}


export default Edit