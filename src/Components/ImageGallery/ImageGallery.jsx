import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';
import LoadButton from '../LoadButton/LoadButton';

import propType from 'prop-types';

export const ImageGallery = ({
	images,
	onImageClick,
	imageQuantity,
	onLoadMoreButtonClick,
}) => {
	return (
		<div>
			{images && (
				<ImageGalleryStyled>
					{images.map(({ id, webformatURL, largeImageURL, tags }) => (
						<ImageGalleryItem
							key={id}
							webformatURL={webformatURL}
							largeImageURL={largeImageURL}
							tags={tags}
							onImageClick={onImageClick}
						/>
					))}
				</ImageGalleryStyled>
			)}

			{images.length >= 1 && imageQuantity > 12 && (
				<LoadButton onLoadMoreButtonClick={onLoadMoreButtonClick}>
					Load More
				</LoadButton>
			)}
		</div>
	);
};

ImageGallery.propType = {
	images: propType.array.isRequired,
	onImageClick: propType.func.isRequired,
	imageQuantity: propType.number.isRequired,
	onLoadMoreButtonClick: propType.func.isRequired,
};

export default ImageGallery;
