import styled, { createGlobalStyle } from "styled-components";
import Header from "../components/Header";
import InfoHeader from "../components/InfoHeader";
import { theme } from "../theme/theme";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

type FormData = {
    nome: string;
    sobrenome: string;
    regiao: string;
    cidade: string;
    pokemons: string[]
}

type APIPokemonProps = {
    name: string;
    url: string;
}

type APIRegionProps = {
    name: string;
    url: string;
}

type APICityProps = {
    name: string;
    url: string;
}

const ResetCSS = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `

    const Title = styled.h1`
        position: relative;
        text-align: center;
        top: 32px;
        margin: 0 auto;
        font-family: 'Inter';
        font-size: 24px;
        font-weight: 600;
    `

    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        justify-content: center;
        justify-items: center;
        max-width: 600px;
        margin: 80px auto 0 auto;
        gap: 32px;
    `

    const ContainerInputLabel = styled.div`
        display: flex;
        flex-direction: column;
    `

    const Label = styled.label`
        font-family: 'Inter';
        font-size: 12px;
        font-weight: 700;
        color: ${theme.colors.label};
        margin-bottom: 8px;
        margin-left: 4px;
    `

    const Input = styled.input`
        width: 235px;
        height: 45px;
        border-radius: 8px;
        border: 1px solid ${theme.colors.placeholder};
        padding: 0 16px;
        font-family: 'Inter';
    `

    const Select = styled.select`
        width: 265px;
        height: 45px;
        border-radius: 8px;
        border: 1px solid ${theme.colors.placeholder};
        padding: 0 16px;
        font-family: 'Inter';
    `

    const TimeContainer = styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 600px;
        margin: 80px auto 0 auto;

        h1 {
            font-family: 'Inter';
            font-size: 16px;
            font-weight: 700;
            color: ${theme.colors.label};
        }
        
        p {
            font-family: 'Inter';
            font-size: 16px;
            font-weight: 500;
            color: ${theme.colors.subtitle};
        }

    `

    const InputField = styled.div`
        display: flex;
        flex-direction: row;
        margin-bottom: 16px;
        align-items: center;
        width: 100%;

    
    ${Select} {
        flex: 1;
        margin-left: 38px;
    }
    `

    const Button = styled.button<{variant: 'primary' | 'secundary'}>`
        width: 50%;
        height: 45px;
        border-radius: 30px;
        border: 1px solid ${prop => prop.variant === 'primary' ? theme.colors.border : 'transparent'};
        background-color: ${prop => prop.variant === 'primary' ? 'transparent' : theme.colors.primary};
        color: ${prop => prop.variant === 'primary' ? 'black' : 'white'};
        font-family: 'Inter';
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;

        span {
            font-size: 16px;
            margin-left: 8px;
        }
    `

    const Separator = styled.div`
       width: 600px;
       height: 1px;
       background-color: ${theme.colors.placeholder};
       justify-self: center;
       margin-top: -60px;
    `

    const InfomationField = styled.div`
        display: flex;
        width: 600px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;

        h2 {
            font-family: 'Inter';
            font-size: 24px;
            font-weight: 600;
            color: black;
        }

        h1 {
            font-family: 'Inter';
            font-size: 16px;
            font-weight: 500;
            color: ${theme.colors.subtitle};
        }
        p {
            font-family: 'Inter';
            font-size: 8px;
            font-weight: 400;
            color: ${theme.colors.subtitle};
        }
    `

export default function Consulta() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [pokemons, setPokemons] = useState<string[]>(['']);
    const [regiao, setRegiao] = useState<APIRegionProps[]>([]);
    const [cidade, setCidade] = useState<APICityProps[]>([]);
    const [pokemonsList, setPokemonsList] = useState<APIPokemonProps[]>([])

    const [schedulingData, setSchedulingData] = useState<string[]>([])
    const [schedulingTime, setSchedulingTime] = useState<string[]>([])

    const router = useRouter()

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
        router.push('/sucesso')
    }

    const handleAddPokemon = () => {
        if (pokemons.length < 6) {
            setPokemons([...pokemons, ''])
        }
    };

    async function loadTimeList() {
        try {
            const response = await axios.post('/api/scheduling/time', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            setSchedulingTime(response.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
    async function loadPokemonsAPI() {
        try {
            const pokemonsList = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
            setPokemonsList(pokemonsList.data.results)
            const regiaoList = await axios.get('https://pokeapi.co/api/v2/region/')
            setRegiao(regiaoList.data.results)
            const cidadeList = await axios.get('https://pokeapi.co/api/v2/location/')
            setCidade(cidadeList.data.results)

            const schedulingData = await axios.get('http://localhost:3000/api/scheduling/date')
            setSchedulingData(schedulingData.data)
        } catch (error) {
            throw error
        }
    }
    loadTimeList()
    loadPokemonsAPI()
    }, [])

    return(
        <div>
            <ResetCSS/>
            <InfoHeader title="Agendar Consulta" subtitle="Recupere seus pokémons em 5 segundos"/>
            <Title>Preencha o formulário abaixo para agendar sua consulta</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <GridContainer>
                    <ContainerInputLabel>
                        <Label>Nome</Label>
                        <Input placeholder="Digite seu nome" {...register('nome', { required: 'Nome é obrigatório'})}/>
                    </ContainerInputLabel>
                    <ContainerInputLabel>
                        <Label>Sobrenome</Label>
                        <Input placeholder="Digite seu sobrenome" {...register('sobrenome', { required: 'Sobrenome é obrigatório'})}/>
                    </ContainerInputLabel>
                    <ContainerInputLabel>
                        <Label>Região</Label>
                        <Select {...register('regiao', { required: 'Selecione uma região'})}>
                        <option value="">Selecione uma região</option>
                            {regiao.map((regiao) => {
                            return(
                                <option key={regiao.name} value={regiao.name}>{regiao.name.slice(0,1).toUpperCase() + regiao.name.slice(1, regiao.name.length)}</option>
                            )})}
                        </Select>
                    </ContainerInputLabel>
                    <ContainerInputLabel>
                        <Label>Cidade</Label>
                        <Select {...register('cidade', { required: 'Selecione uma Cidade'})}>
                        <option value="">Selecione uma cidade</option>
                            {cidade.map((cidade) => {
                            return(
                                <option key={cidade.name} value={cidade.name}>{cidade.name.slice(0,1).toUpperCase() + cidade.name.slice(1, cidade.name.length)}</option>
                            )})}
                        </Select>
                    </ContainerInputLabel>
                </GridContainer>
                <TimeContainer>
                    <h1>Cadastre seu time</h1>
                    <p>Atendemos até 06 pokémons por vez</p>
                    
                    {pokemons.map((_, index) => (
                        <InputField key={index}>
                            <Label>Pokémon {index + 1}</Label>
                            <Select {...register(`pokemons.${index}`, { required: 'Selecione um pokemon'})}>
                            <option value="">Selecione um pokémon</option>
                            {pokemonsList.map((pokemon) => (
                                <option key={pokemon.name} value={pokemon.name}>{pokemon.name.slice(0,1).toUpperCase() + pokemon.name.slice(1, pokemon.name.length)}</option>
                            ))}
                        </Select>
                        </InputField>
                    ))}
                    {pokemons.length < 6 && (
                        <Button variant={'primary'} type="button" onClick={handleAddPokemon}>
                            Adicionar novo pokémon ao time... <span>+</span>
                        </Button>
                    )}
                </TimeContainer>
                <GridContainer>
                    <ContainerInputLabel>
                        <Label>Data</Label>
                        <Select>
                            <option value="">Selecione uma data</option>
                            {schedulingData.map((scheduling) => {
                                return(
                                    <option key={scheduling} value={scheduling}>{scheduling}</option>
                                )
                            })}
                        </Select>
                    </ContainerInputLabel>
                    <ContainerInputLabel>
                        <Label>Hora</Label>
                        <Select>
                            <option value="">Selecione um horário</option>
                            {schedulingTime.map((scheduling) => {
                                return(
                                    <option key={scheduling} value={scheduling}>{scheduling}</option>
                                )
                            })}
                        </Select>
                    </ContainerInputLabel>
                </GridContainer>
                <Separator/>
                
                <InfomationField>
                    <h1>Números de pokemons a serem atendidos</h1>
                    <h1>0{pokemons.length}</h1>
                </InfomationField>
                <InfomationField>
                    <h1>Atendimento unitário por pokémon</h1>
                    <h1>R$ 70,00</h1>
                </InfomationField>
                <InfomationField>
                    <h1>Subtotal</h1>
                    <h1>R$ {pokemons.length * 70},00</h1>
                </InfomationField>
                <InfomationField>
                    <h1>Taxa geracional*:</h1>
                    <h1>R$ {((pokemons.length * 70) * 0.03).toFixed(2)}</h1>
                </InfomationField>
                <InfomationField>
                    <p>*adicionamos uma taxa de 3%, multiplicado pelo número da geração mais alta do time, com limite de até 30%</p>
                </InfomationField>
                <InfomationField>
                    <h2>Valor Total: R$ {((pokemons.length * 70) + (pokemons.length * 70) * 0.03).toFixed(2)}</h2>
                    <Button variant={'secundary'} type="submit" >Concluir Agendamento</Button>
                </InfomationField>
                
            </form>
        </div>
    )
}