import React, { 
	useState,
	useEffect,
} from 'react';

const App = () => {
  
	const [ repositories, setRepositories ] = useState([]);

	const handleFavoriteRepo = (id) => {
		const newRepositories = repositories.map(item => {
			return item.id === id ? { ...item, favorite: !item.favorite } : item
		})

		setRepositories(newRepositories);
	}

	useEffect(async() => {
		const response = await fetch('https://api.github.com/users/luysla/repos');
		const data = await response.json();

		setRepositories(data);
	},[])

	useEffect(() => {
		const filtered = repositories.filter(item => item.favorite);

		document.title = `Você tem ${filtered.length} favoritos`
	}, [repositories])

	return (
		<>
			{
				repositories.map((item, index) => {
					return (
						<>
							<p key={item.id}>
								{item.name}
								{item.favorite && <span> (Favorito) </span>}
							</p>
							<button onClick={() => handleFavoriteRepo(item.id)}>
								Favoritar
							</button>
						</>
					)
				})
			}
		</>
		
	)
}

export default App;
