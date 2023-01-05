import PropTypes from 'prop-types';
import styles from 'components/Modal/Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {
  
  static propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired}).isRequired,
    close: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    window.addEventListener('keydown', this.props.close)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.close)
  }

  render() {
    const {image, close} = this.props;
    return <div className={styles.overlay} onClick={close}>
      <div className={styles.modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>}
}