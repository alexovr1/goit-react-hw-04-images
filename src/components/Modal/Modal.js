import { useEffect } from "react"
import { createPortal } from "react-dom"
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal_root')

export const Modal = ({ onClose, children }) => {

    useEffect(() => {
        const onEscapeClose = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', onEscapeClose);

        return () => {
            window.removeEventListener('keydown', onEscapeClose);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onClose])

    const onBackdropClose = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };


    return createPortal(
        (<div className="overlay" onClick={onBackdropClose}>
            <div className="modal">
                {children}
            </div >
        </div >),
        modalRoot)
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};