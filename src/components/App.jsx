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
    page: 1
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
      this.setState(({images, page}) =>
      ({images: [...images, ...data.hits], 
        page: page + 1, 
        total: data.total, 
        isLoading: false}))
      } catch (error) {
      console.error(error);
    }
  }

  handleLoadMore = () => {
    this.getImages();
    this.autoScroll()
  }

  autoScroll = () => {
    const interval = setInterval(() => {
      window.scrollBy(0, 10)
      if (document.documentElement.clientHeight + window.pageYOffset === document.body.offsetHeight) { clearInterval(interval)  }
    }, 10)
  }

  handleSearch = (event) => {
    const {value} = event.target;
    this.setState({search: value, images: []})
  }

  handleSubmitSearch = (event) => {
    event.preventDefault();
    this.setState({images: [], page: 1})
    this.getImages();
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

  render() {
    const {images, total, search, isLoading, imageId} = this.state;

    const filterById = () => {
      const filteredImages = images.filter(image => Number(image.id) === Number(imageId))
      return filteredImages[0];
    }

    return (
    <div className={styles.app}>
      <Searchbar onSubmitSearch={this.handleSubmitSearch} onChangeSearch={this.handleSearch} search={search}/>
      {images && <ImageGallery images={images} modalOpen={this.handleModalOpen}/>}
      {isLoading && <Loader/>}
      {images.length < total && images.length > 0 && <Button loadMore={this.handleLoadMore}/>}
      {imageId && <Modal image={filterById()} close={this.handleModalClose}/>}
    </div>
  )}
};
