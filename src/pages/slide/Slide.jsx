import React from 'react';
import styles from './Slide.less';

/**
 * 核心参数有：n>4张图片,响应式,某些样式参数，样式方面并不能开放所有出去，尤其是核心样式
 * 先看清组件的核心算法是什么。算不算按钮导航。
 */

class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dir: [
        { name: 'middle' },
        { name: 'start' },
        { name: 'normal' },
        { name: 'normal' },
        { name: 'normal' },
        { name: 'normal' },
        { name: 'normal' },
        { name: 'end' },
      ],
      current: '',
    };
  }

  slide(name, key) {  // 图片点击逻辑
    // 记录当前节点
    this.setState({ current: key });
    // 数组操作
    this.imgArr(name);
  }

  imgArr(name) { // 数组处理
    const dirCopy = this.state.dir;
    if (name === 'start') {  // 点击左侧那张
      const pop = dirCopy.pop(); // 从数组尾部弹出一个元素
      dirCopy.unshift(pop); // 尾部元素添加到数组头部
    } else if (name === 'end') { // 点击右侧那张
      const shift = dirCopy.shift(); // 从数组头部弹出一个元素
      dirCopy.push(shift);  // 添加到数组尾部
    }
    this.setState({ dir: dirCopy }); // 保存重新排列的数组 并触发render
  }

  pointFunc(index) { // 按钮点击
    const { current } = this.state;
    const dirCopy = this.state.dir;
    if (index < current) { // 鼠标经过左侧的按钮
      for (let i = 0; i < (current - index); i += 1) { // 判断距离
        const shift = dirCopy.shift(); // 进行数组操作
        dirCopy.push(shift);
      }
    } else if (index > current) { // 鼠标经过右侧的按钮
      for (let i = 0; i < (index - current); i += 1) {
        const pop = dirCopy.pop();
        dirCopy.unshift(pop);
      }
    }
    this.setState({ dir: dirCopy }); // 触发react-render重新渲染页面
    this.setState({ current: index }); // 记录当前图片节点
  }

  render() {
    const { dir } = this.state;
    return (
      <div className={styles.root}>
        {/* 外部容器*/}
        <div className={styles.slideBox}>
          {/* 内部循环*/}
          {
            dir.map((item, key) => {
              return (
                <div key={key} className={`${styles.slide} ${styles[item.name]}`}>
                  <img src={`./images/${key + 1}.png`} alt="404.png" />
                  <div
                    className={styles.masking}
                    onClick={() => this.slide(item.name, key)}
                  >{''}</div>
                </div>
              );
            })
          }
          {/* 导航按钮*/}
          <div className={styles.point}>
            {
              this.state.dir.map((item, key) => {
                return (
                  <span
                    key={key}
                    className={item.name === 'start' ? styles.hover : ''}
                    onMouseEnter={() => this.pointFunc(key - 1)}
                  >{}</span>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Slide;
