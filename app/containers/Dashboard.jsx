import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/my-dashboard';
import Masonry from 'react-masonry-component';
import $ from 'jquery';

import { getUserImages } from 'actions/dashboard';

import MyDashboard from 'components/MyDashboard';
import MyDashboardImages from 'components/MyDashboardImages';
import MyDashboardMyImages from 'components/MyDashboardMyImages';

const cx = classNames.bind(styles);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.onFileSubmit = this.onFileSubmit.bind(this);
    }

    static need = [
      getUserImages
    ]

    onFileSubmit(image, name, progressBar) {

        const imageTypes = ['image/jpeg', 'image/png'];
        // Check that the image type is accepted & the image is > 3mb
        if (imageTypes.indexOf(image.type) !== -1 && image.size <= 5000000) {

            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', name);

            const xhr = new XMLHttpRequest;

            xhr.open('POST', '/dashboard/upload');
            // Update progress bar
            xhr.upload.onprogress = event => {
                if (event.lengthComputable) {
                    progressBar.css('width', ((event.loaded / event.total) * 100) + '%');
                }
            };

            // onload

            xhr.send(formData);
        }
    }

    deleteImage(title) {

      $.ajax({
          url: '/dashboard/delete',
          data: {title:title},
          type: 'DELETE'
      });
    }

    render() {
        const { images } = this.props;
        const user = images.user;
        const imageData = images.data || [];

        const myImages = [];
        const otherImages = [];

        imageData.forEach(image => {
          if (image.user === user) {
            myImages.push(image);
          } else {
            otherImages.push(image);
          }
        });

        return (
            <Masonry
                options={ {columnWidth: 50} }>
                <MyDashboard
                    onFileSubmit={this.onFileSubmit} />

                {myImages.map((image, index) => {
                    return (
                        <MyDashboardMyImages
                            src={`data:${image.image.mimeType};base64,${image.image.data}`}
                            title={image.title}
                            user={image.user}
                            deleteImage={this.deleteImage}
                            key={index}/>
                    );
                })}

                {otherImages.map((image, index) => {
                    return (
                        <MyDashboardImages
                            src={`data:${image.image.mimeType};base64,${image.image.data}`}
                            title={image.title}
                            user={image.user}
                            key={index + 'others'}/>
                    );
                })}

            </Masonry>
        );
    }
};

function mapStateToProps(state) {
  return {
    images: state.dashboard.images,
    user: state.user.storeUsername
  };
}

export default connect(mapStateToProps)(Dashboard);
