import React from 'react';
import Slide from './Slide';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'index',
    };
  }

  render() {
    return (
      <div>
        <Slide
          images={[
            'https://s1.ax1x.com/2020/05/26/tiWmtS.png',
            'https://s1.ax1x.com/2020/05/26/tiWek8.png',
            'https://s1.ax1x.com/2020/05/26/tiWMlj.png',
            'https://s1.ax1x.com/2020/05/26/tiWlXn.png',
            'https://s1.ax1x.com/2020/05/26/tiWVTf.png',
            'https://s1.ax1x.com/2020/05/26/tiWQ6s.png',
            'https://s1.ax1x.com/2020/05/26/tiWnfg.png',
            'https://s1.ax1x.com/2020/05/26/tiWKpQ.png',
          ]}
        />
      </div>
    );
  }
}

export default Index;
