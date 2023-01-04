import styles from 'components/ImageGallery/ImageGallery.module.css'
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({images, modalOpen}) => {
    return <ul className={styles.gallery}>
        {images.map(({id, largeImageURL, webformatURL, tags}) => <ImageGalleryItem key={id} id={id} previewImage={webformatURL} description={tags} modalOpen={modalOpen}/>)}
    </ul>
}