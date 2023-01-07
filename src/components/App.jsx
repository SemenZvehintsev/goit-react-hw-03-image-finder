import { Component } from "react";
import axios from "axios";
import styles from 'components/App.module.css';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';

export class App extends Component {

  state = {
    images: [],
    total: '',
    search: '',
    isLoading: false,
    imageId: '',
    page: null
  }

  async getImages () {
    try {
      this.setState({isLoading: true})
      const {data} = await axios.get('https://pixabay.com/api/', {
        params: {
          q: this.state.search,
          page: this.state.page,
          key: '31495001-d7fca89852a5b5217d905cd4a',
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12
        }});
      const {hits} = data;
      const newImages = hits.map((hit) => 
      {return hit = {id: hit.id, webformatURL: hit.webformatURL, tags: hit.tags, largeImageURL: hit.largeImageURL}})
      this.setState(({images, page}) =>
      ({images: [...images, ...newImages], 
        total: data.total, 
        isLoading: false}))
      } catch (error) {
      console.error(error);
    }
  }

  handleLoadMore = () => {
    this.setState(({page}) => ({page: page + 1}))
  }


  handleSubmitSearch = (event) => {
    event.preventDefault();
    this.setState({images: [], page: 1, search: event.target.text.value})
  }

  handleModalOpen = (event) => {
    const {id} = event.target;
    this.setState({imageId: id})
  }

  handleModalClose = (event) => {
    if (event.target === event.currentTarget || event.key === 'Escape') {
      this.setState({imageId: ''})
    }
  }

  componentDidUpdate(_, prevstate) {
    
    if (this.state.page !== prevstate.page || this.state.search !== prevstate.search) {
      this.getImages();
    }

    if (this.state.images.length > prevstate.images.length) {   
    const interval = setInterval(() => {
        window.scrollBy(0, 10)
        if (document.documentElement.clientHeight + window.pageYOffset === document.body.offsetHeight) {
            clearInterval(interval)}
    }, 10)}
  }

  render() {
    const {images, total, isLoading, imageId} = this.state;

    const filterById = () => {
      const filteredImages = images.filter(image => Number(image.id) === Number(imageId))
      return filteredImages[0];
    }

    return (
    <div className={styles.app}>
      <Searchbar onSubmitSearch={this.handleSubmitSearch}/>
      {images.length > 0 && <ImageGallery images={images} modalOpen={this.handleModalOpen}/>}
      {isLoading && <Loader/>}
      {images.length < total && images.length > 0 && <Button loadMore={this.handleLoadMore}/>}
      {imageId && <Modal image={filterById()} close={this.handleModalClose}/>}
    </div>
  )}
};
