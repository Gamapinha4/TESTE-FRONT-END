import "reflect-metadata";
import axios from "axios";
import { injectable } from "inversify";

@injectable()
export class Data {
    async fetchPokemonAPI(): Promise<any> {

        try {
            const [pokemonsList, regiaoList, cidadeList, schedulingData, schedulingTime] = await Promise.all([
                axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'),
                axios.get('https://pokeapi.co/api/v2/region/'),
                axios.get('https://pokeapi.co/api/v2/location/'),
                axios.get('http://localhost:3000/api/scheduling/date'),
                axios.post('/api/scheduling/time', { headers: { 'Content-Type': 'application/json' }})
            ]);
    
            console.log("Dados buscados com sucesso")
            return {pokemonsList, regiaoList, cidadeList, schedulingData, schedulingTime}
        } catch (error) {
            console.log("Não foi possível buscar os dados")
            throw error
        }

    }
}