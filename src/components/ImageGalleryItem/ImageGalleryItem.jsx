import PropTypes from 'prop-types';
import styles from 'components/ImageGalleryItem/ImageGalleryItem.module.css'

export const ImageGalleryItem = ({id, previewImage, description, modalOpen}) => {
    return <li className={styles.galleryItem}>
        <img className={styles.galleryItemImage} id={id} onClick={modalOpen} src={previewImage} alt={description} />
    </li>
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    modalOpen: PropTypes.func.isRequired
}