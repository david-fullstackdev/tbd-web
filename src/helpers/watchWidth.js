import React, { Component } from 'react';
import throttle from 'lodash/throttle';

const withEnvironment = (BaseComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        width: this.getWidth(),
      };

      this.getWidth = throttle(this.getWidth.bind(this), 100);
    }

    getWidth() {
      return this.ref && this.ref.offsetWidth;
    }

    componentDidMount() {
      window.addEventListener('resize', this.listener);
      this.listener();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.listener);
    }

    listener = () => {
      const width = this.getWidth();

      if (width !== this.state.width) {
        console.log(width);
        this.setState({ width });
      }
    };

    render() {
      return (
        <div style={{ overflow: 'hidden' }} ref={ref => { this.ref = ref; } }>
          {this.state.width && <BaseComponent {...this.props} {...this.state} />}
        </div>
      );
    }
  };
};

export default withEnvironment;
