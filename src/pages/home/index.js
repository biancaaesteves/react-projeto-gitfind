import { useState } from "react";
import { Header } from "../../components/Header";
import background from "../../assets/background-1.png";
import profile from "../../assets/profile.PNG";
import ItemList from "../../components/ItemList";

import "./styles.css";

function App() {
    const [user, setUser] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [repos, setRepos] = useState(null);

    const handleGetData = async () => {
        const userData = await fetch(`https://api.github.com/users/${user}`); // completa na url com o valor que o usuário digitou no input.
        const newUser = await userData.json();

        if (newUser.name) {
            const { avatar_url, name, bio, login } = newUser;
            setCurrentUser({ avatar_url, name, bio, login }); // joga as infors dentro do usuário atual pela desestruturação

            const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
            const newRepos = await reposData.json();

            if (newRepos.length) {
                // se é um array com dados, é pq me retornou alguma coisa.
                setRepos(newRepos);
            }
        }
    };
    // assíncrona pq como estamos buscando dados de uma API, de um serviço externo, não sabemos qto tempo isso vai demorar.
    // criamos função assíncona quando precisamos esperar uma resposta pro código continuar.

    return (
        <div className="App">
            <Header />
            <div className="conteudo">
                <img src={background} className="background" alt="background app" />
                <div className="info">
                    <div>
                        <input
                            name="usuario"
                            value={user}
                            onChange={(event) => setUser(event.target.value)}
                            placeholder="@username"
                        />
                        <button onClick={handleGetData}>Buscar</button>
                    </div>
                    {currentUser?.name ? ( // só mostra na tela se tiver usuário
                        <>
                            <div className="perfil">
                                <img
                                    src={currentUser.avatar_url}
                                    className="profile"
                                    alt="foto perfil"
                                />
                                <div>
                                    <h3>{currentUser.name}</h3>
                                    <span>@{currentUser.login}</span>
                                    <p>{currentUser.bio}</p>
                                </div>
                            </div>
                            <hr />
                        </>
                    ) : null}
                    {/* // se tiver repositório, mostra, se não tiver, não exibe nada na tela (null) */}
                    {repos?.length ? (
                        <div>
                            <h4 className="repositorio">Repositórios</h4>
                            {repos.map((repo) => (
                                <ItemList
                                    title={repo.name}
                                    description={repo.description}
                                    link={repo.html_url}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default App;
