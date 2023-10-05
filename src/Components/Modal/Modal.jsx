import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';

const ModalRoot = document.querySelector('#modal-root');

class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = (e) => {
		if (e.code === 'Escape') {
			console.log(e.code);
			this.props.onClose();
		}
	};

	handleBackDropClick = (e) => {
		if (e.target === e.currentTarget) {
			this.props.onClose();
		}
	};

	render() {
		return createPortal(
			<Overlay onClick={this.handleBackDropClick}>
				<ModalStyled>{this.props.children}</ModalStyled>
			</Overlay>,
			ModalRoot
		);
	}
}

export default Modal;
