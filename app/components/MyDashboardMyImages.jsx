import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/my-dashboard-images';
import $ from 'jquery';

const cx = classNames.bind(styles);

export default class MyDashboardImages extends Component {
    constructor(props) {
        super(props);
        this.deleteImage = this.deleteImage.bind(this);
    }

    deleteImage() {
      const { deleteImage } = this.props;
      deleteImage(this.props.title);
    }

    render() {
        return (
            <div className={cx('dashboard-image')}>
                <img src={this.props.src || 'http://placehold.it/150x150'} alt="" className={cx('dashboard-image-image')}/>
                <h4>{this.props.title}</h4>
                <p><i className={cx('dashboard-image-username')}>{this.props.user}</i></p>
                <br/><br/>
                <button type="button" onClick={this.deleteImage}>Delete</button>
            </div>
        );
    }
}

/*MyDashboardImages.propTypes = {
    src: PropTypes.func.isRequired
};
*/
