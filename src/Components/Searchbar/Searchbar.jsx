import { Component } from 'react';
import { toast } from 'react-toastify';

import {
	Searchbar,
	SearchForm,
	SearchButton,
	FormInput,
	ButtonLabel,
} from './Searchbar.styled';

class SearchBar extends Component {
	state = {
		photoName: '',
	};

	handleNameChange = (e) => {
		this.setState({
			photoName: e.target.value.toLowerCase(),
		});
	};

	handleFormSubmit = (e) => {
		e.preventDefault();

		if (this.state.photoName.trim() === '') {
			toast.error('You must write something');
			return;
		}

		this.props.onSubmit(this.state.photoName);
		this.setState({
			photoName: '',
		});
	};

	render() {
		const { photoName } = this.state;

		return (
			<Searchbar>
				<SearchForm onSubmit={this.handleFormSubmit}>
					<SearchButton>
						<ButtonLabel type="submit">Search</ButtonLabel>
					</SearchButton>
					<FormInput
						type="text"
						name="photoName"
						onChange={this.handleNameChange}
						value={photoName}
					/>
				</SearchForm>
			</Searchbar>
		);
	}
}

export default SearchBar;
