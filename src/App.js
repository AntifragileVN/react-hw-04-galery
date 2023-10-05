import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './services/photo-api';
import './App.css';

import SearchBar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Modal from './Components/Modal/Modal';
import Loader from './Components/Loader/Loader';

export default function App() {
	const [query, setQuery] = useState('');
	const [currentImage, setCurrentImage] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [page, setPage] = useState(1);

	const [images, setImages] = useState([]);
	const [imageQuantity, setImageQuantity] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const prevQueryRef = useRef(query);
	const prevPageRef = useRef(page);

	useEffect(() => {
		if (query !== '' && query !== prevQueryRef.current) {
			console.log('use efect 1');
			setPage(1);

			setImageQuantity(0);
			setIsLoading(true);

			api.fetchPhoto(query, page).then(({ hits, totalHits }) => {
				setImages(hits);
				setImageQuantity(totalHits);
				setIsLoading(false);

				if (hits.length === 0) {
					toast.error('There is no images with such name');
					return;
				}
			});
		}
		prevQueryRef.current = query;
	}, [page, query]);

	useEffect(() => {
		if (page !== 1 && page !== prevPageRef.current) {
			console.log('use efect 2');
			api.fetchPhoto(query, page).then(({ hits, totalHits }) => {
				setImages((prevState) => {
					return [...prevState, ...hits];
				});
				setImageQuantity(totalHits);

				if (hits.length === 0) {
					toast.error('There is no images with such name');
					return;
				}
			});
		}
		prevPageRef.current = page;
	}, [page, query]);

	const onImageClick = (currentImage) => {
		setCurrentImage(currentImage);
		setShowModal(true);
	};

	const onSearchSubmit = (query) => {
		setQuery(query);
	};

	const onLoadMoreButtonClick = () => {
		setPage((prev) => prev + 1);
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<div className="App">
			<SearchBar onSearchSubmit={onSearchSubmit} />
			{isLoading && <Loader />}
			<ImageGallery
				images={images}
				onImageClick={onImageClick}
				onLoadMoreButtonClick={onLoadMoreButtonClick}
				imageQuantity={imageQuantity}
			/>

			{showModal && (
				<Modal onClose={toggleModal}>
					<img src={currentImage} alt="" />
				</Modal>
			)}

			<ToastContainer autoClose="3000" />
		</div>
	);
}
