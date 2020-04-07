import React from 'react';
import Tooltip from 'components/uielements/tooltip';
import TextTruncate from 'react-truncate';

class Truncate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTruncated: false,
    };
  }

  handleTruncate(isTruncated) {
    this.setState({ isTruncated });
  }

  // TODO make truncate handler working correctly
  // TODO show tooltip only when truncated
  render() {
    const { isTruncated } = this.state;
    const text = this.props.children;
    const truncated = <TextTruncate>{text}</TextTruncate>;

    return (
      <Tooltip title={text} placement="topLeft">
        {truncated}
      </Tooltip>
    );
  }
}

export default Truncate;