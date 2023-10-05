import Modal from '../Modal/Modal';
import propType from 'prop-types';
import { ImageGalleryItemStyled, ItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
	webformatURL,
	largeImageURL,
	tags,
	onImageClick,
}) => {
	return (
		<>
			<ImageGalleryItemStyled>
				<ItemImg
					src={webformatURL}
					alt={tags}
					onClick={() => onImageClick(largeImageURL)}
				/>
			</ImageGalleryItemStyled>
		</>
	);
};

export default ImageGalleryItem;

ImageGalleryItem.propType = {
	webformatURL: propType.string.isRequired,
	largeImageURL: propType.string.isRequired,
	tags: propType.string.isRequired,
	onImageClick: propType.func.isRequired,
};
