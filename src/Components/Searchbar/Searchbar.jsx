import { Component, useState } from 'react';
import { toast } from 'react-toastify';

import {
	Searchbar,
	SearchForm,
	SearchButton,
	FormInput,
	ButtonLabel,
} from './Searchbar.styled';

export default function SearchBar({ onSearchSubmit }) {
	const [query, setQuery] = useState('');

	const handleNameChange = (e) => {
		setQuery(e.target.value.toLowerCase());
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		if (query.trim() === '') {
			toast.error('You must write something');
			return;
		}

		onSearchSubmit(query);
		setQuery('');
	};

	return (
		<Searchbar>
			<SearchForm onSubmit={handleFormSubmit}>
				<SearchButton>
					<ButtonLabel type="submit">Search</ButtonLabel>
				</SearchButton>
				<FormInput
					type="text"
					name="query"
					onChange={handleNameChange}
					value={query}
				/>
			</SearchForm>
		</Searchbar>
	);
}
