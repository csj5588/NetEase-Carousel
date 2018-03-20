import React from 'react';
import { connect } from 'dva';
import styles from './Qr.less';

class Qr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrArr: [], // 所有一维码的队列
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.qrData.timestamp) {
      this.init(nextProps.qrData);
    }
  }
  init(qrData) {
    wx.config({
      // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      debug: false,
      // 必填，公众号的唯一标识
      appId: 'wx08798d049dd3351a',
      // 必填，生成签名的时间戳
      timestamp: "" + qrData.timestamp,
      // 必填，生成签名的随机串
      nonceStr: qrData.nonceStr,
      // 必填，签名，见附录1
      signature: qrData.signature,
      // 必填，需要使用的JS接口列表，所有JS接口列表见附录2   deb2b9f4a29e6d4b0a624e0a3399bebe11c43f49
      jsApiList : [ 'checkJsApi', 'scanQRCode' ]
    });
    wx.error(function(res) {
      alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    });
    wx.ready(function() {
      wx.checkJsApi({
        jsApiList : ['scanQRCode'],
        success : function(res) {}
      });
    });
  }
  getScan() { // 唤起扫一扫
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: (res) => {
        // this.setState({ flg: res.resultStr.split(',')[1] });
        const copy = this.state.qrArr;
        copy.push(res.resultStr.split(',')[1]);
        this.setState({ qrArr: copy });
      }
    });
  }
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.mesBox}>
          <ul>
            {
              this.state.qrArr.length === 0 ? <li>nothing</li> : this.state.qrArr.map((item, key) => {
                return (
                  <li key={key}>
                    {`设备编号： ${item}`}
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div
          id="scanQRCode"
          className={styles.qrBtn}
          onClick={() => this.getScan()}
        >
          <img src="images/scan.png" alt="" />
          <span>扫一维码进行入库</span>
        </div>
      </div>
    );
  }
}

export default connect(({ qr }) => ({
  qrData: qr.qrData,
}))(Qr);
