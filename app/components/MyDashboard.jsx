import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/my-dashboard';
import $ from 'jquery';

const cx = classNames.bind(styles);

export default class MyDashboard extends Component {
    constructor(props) {
        super(props);
        this.onFileSubmit = this.onFileSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange() {
        const image = document.getElementById('image-input').files[0];
        const preview = document.getElementById('image-preview');
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            preview.src = reader.result;
        });

        reader.readAsDataURL(image);
    }

    onFileSubmit(event) {
        event.preventDefault();
        const image = document.getElementById('image-input').files[0];
        const name = document.getElementById('image-name').value;
        const {onFileSubmit} = this.props;

        const progressBar = $('#image-progress > span');
        onFileSubmit(image, name, progressBar); // file, name of file, ref to progress bar
    }

    render() {
        return (
            <div className={cx('file-upload-masonry')}>
                <h3>Upload image</h3>
                <img src="" alt="Preview" id='image-preview' className={cx('image-preview-style')}/>
                <br/>
                <form>
                    <input className={cx('form-upload-name')} id='image-name' type="text" placeholder="Title ..." name='title' required/>
                    <input className={cx('form-upload-browse')} type="file" id='image-input' onChange={this.onImageChange} name='image' required/>
                    <button className={cx('form-upload-submit')} onClick={this.onFileSubmit}>Submit</button>
                </form>
                <div className={cx('form-upload-progress')} id="image-progress">
                    <span></span>
                </div>
            </div>
        );
    }
}

MyDashboard.propTypes = {
    onFileSubmit: PropTypes.func.isRequired
};
