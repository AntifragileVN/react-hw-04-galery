import { Button } from './LoadButton.styled';

const LoadButton = ({ children, onLoadMoreButtonClick }) => {
	return (
		<Button type="button" onClick={onLoadMoreButtonClick}>
			{children}
		</Button>
	);
};

export default LoadButton;
