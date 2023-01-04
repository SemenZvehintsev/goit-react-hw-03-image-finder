import styles from 'components/ImageGalleryItem/ImageGalleryItem.module.css'

export const ImageGalleryItem = ({id, previewImage, tags, modalOpen}) => {
    return <li className={styles.galleryItem}>
        <img className={styles.galleryItemImage} id={id} onClick={modalOpen} src={previewImage} alt={tags} />
    </li>
}