import PropTypes from 'prop-types';
import styles from 'components/Button/Button.module.css';
import { Component } from 'react';

export class Button extends Component {
    static propTypes = {
        loadMore: PropTypes.func.isRequired
    };

    componentDidUpdate() {
        const interval = setInterval(() => {
            window.scrollBy(0, 10)
            if (document.documentElement.clientHeight + window.pageYOffset === document.body.offsetHeight) {
                clearInterval(interval)}
        }, 10)
    }
    render() {return <button className={styles.button} type='button' onClick={this.props.loadMore}>Load more</button>}
}