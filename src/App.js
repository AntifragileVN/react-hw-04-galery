import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api, { fetchPhoto } from './services/photo-api';
import './App.css';

import SearchBar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Modal from './Components/Modal/Modal';
import Loader from './Components/Loader/Loader';

class App extends Component {
	state = {
		photoName: '',
		currentImage: '',
		currentPage: 1,
		showModal: false,
		images: [],
		error: null,
		imageQuantity: 0,
		status: '',
		isLoading: false,
	};

	async componentDidUpdate(_, prevState) {
		const prevName = prevState.photoName;
		const currentName = this.state.photoName;
		const currentPage = this.state.currentPage;

		if (prevName !== currentName) {
			this.setState({
				currentPage: 1,
				imageQuantity: 0,
				isLoading: true,
			});

			const { hits, totalHits } = await fetchPhoto(
				currentName,
				currentPage
			);

			this.setState({
				images: hits,
				imageQuantity: totalHits,
				isLoading: false,
			});

			if (hits.length === 0) {
				toast.error('There is no images with such name');
				return;
			}
		}

		if (
			prevState.currentPage !== this.state.currentPage &&
			this.state.currentPage !== 1
		) {
			const { hits, totalHits } = await fetchPhoto(
				currentName,
				currentPage
			);

			this.setState((prevState) => ({
				images: [...prevState.images, ...hits],
				imageQuantity: totalHits,
			}));
		}
	}

	onImageClick = (currentImage) => {
		this.setState({
			currentImage,
			showModal: true,
		});
	};

	onSubmit = (photoName) => {
		this.setState({
			photoName: photoName,
		});
	};

	onLoadMoreButtonClick = () => {
		this.setState((prevState) => ({
			currentPage: prevState.currentPage + 1,
		}));
	};

	toggleModal = () => {
		this.setState(({ showModal }) => ({
			showModal: !showModal,
		}));
	};

	render() {
		const {
			photoName,
			currentImage,
			showModal,
			images,
			imageQuantity,
			isLoading,
		} = this.state;

		return (
			<div className="App">
				<SearchBar photoName={photoName} onSubmit={this.onSubmit} />
				{isLoading && <Loader />}
				<ImageGallery
					images={images}
					onImageClick={this.onImageClick}
					onLoadMoreButtonClick={this.onLoadMoreButtonClick}
					imageQuantity={imageQuantity}
				/>

				{showModal && (
					<Modal onClose={this.toggleModal}>
						<img src={currentImage} alt="" />
					</Modal>
				)}

				<ToastContainer autoClose="3000" />
			</div>
		);
	}
}

export default App;
