import PropTypes from 'prop-types';
import styles from 'components/ImageGallery/ImageGallery.module.css'
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({images, modalOpen}) => {
    return <ul className={styles.gallery}>
        {images.map(({id, webformatURL, tags}) => <ImageGalleryItem key={id} id={id} previewImage={webformatURL} description={tags} modalOpen={modalOpen}/>)}
    </ul>
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
    }).isRequired).isRequired,
    modalOpen: PropTypes.func.isRequired
}