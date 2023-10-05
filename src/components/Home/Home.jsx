import React, { useEffect, useState } from 'react'
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';

// https://api.themoviedb.org/3/movie/popular?api_key=7d1b4bc0a266c0525b585bdbf792ac17&language=en-US&page=1

const apiKey = "c0134be367ed9eaa1d19799c98dbf2f5";
const url = "https://api.themoviedb.org/3";
const imgUrl = 'https://image.tmdb.org/t/p/w500';
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";


const Card = ({ img, name }) => {
    return (
        <div className='cardP'>
            <img className='card' src={img} alt="cover" />
            <p>{name}</p>
        </div>
    )
}

const Row = ({ title, arr = [{}]
}) => {
    return (
        <div className='row'>
            <h2>{title}</h2>

            <div>
                {
                    arr.map((item, i) => <Card key={i} img={`${imgUrl}${item.poster_path}`} name={item.original_title} />)

                }
            </div>

        </div>
    )
}





const Home = () => {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const fetchUpcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
            setUpcomingMovies(results);
        };

        const fetchpopular = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
            setPopularMovies(results);
        };

        const fetchtopRated = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
            setTopRatedMovies(results);
        };

        const fetchNowPlaying = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
            setNowPlayingMovies(results);
        };

        const getAllGenre = async () => {
            const {
                // https://api.themoviedb.org/3/genre/movie/list
                data: { genres },
            } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
            setGenre(genres);
        };


        fetchUpcoming();
        fetchNowPlaying();
        fetchpopular();
        fetchtopRated();

        getAllGenre();
    }, [])


    return (
        <section className="home">
            <div className="banner" style={{ backgroundImage : popularMovies[0]? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : "rgb(16, 16, 16)" }}>

            {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
            {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

            <div>
            <button><BiPlay />Play</button>
            <button>My List <AiOutlinePlus /></button>
            </div>

            </div>


            <Row title={"Upcoming"} arr={upcomingMovies} />
            <Row title={"Now Playing"} arr={nowPlayingMovies} />
            <Row title={"Top Rated"} arr={topRatedMovies} />
            <Row title={"Popular on Netflix"} arr={popularMovies} />

            <div className="genreBox">

                {
                    genre.map((item, index) =>
                        (<Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>)
                    )
                }
            </div>
        </section>
    )
}

export default Home;



// 1:06:15