import fetch from 'node-fetch';
import fs from 'fs';

async function fetchPokemon() {
    let pokes = [];
    for (let i = 1; i < 906; i++) {
        const results = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const pokemon = await results.json();
        // console.log(pokemon)
        const formattedPokes = {
            name: pokemon.name,
            number: pokemon.id,
            pokeType1: pokemon.types[0].type.name,
            pokeType2: pokemon.types[1] ? pokemon.types[1].type.name : undefined,
            height: Math.round(pokemon.height * 3.9),
            weight: Math.round(pokemon.weight / 4.3),
            image: pokemon.sprites["front_default"]
        };
        // console.log(formattedPokes)
        pokes.push(formattedPokes)
        console.log(`got pokemon ${formattedPokes.name}`)

    }
    // console.log(pokes)
    fs.writeFileSync('testfile', JSON.stringify(pokes, null, 2))
};
fetchPokemon();
