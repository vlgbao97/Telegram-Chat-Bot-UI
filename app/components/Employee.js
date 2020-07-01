import * as React from 'react';
import logo from '../images/telegram.png';
import excelDownload from '../images/exceldownload.png';
import history from "../utils/history";
import user from "../images/user.png";
import id from "../images/id.png";

export default class Employee extends React.Component {
  render() {
    return (
      <li
        className="employee"
        style={{
          borderBottom: '2px solid',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div>
            {/*<b>Tên:</b>*/}
            <img
              style={{height: '20px', width: '20px'}}
              src={user}
              alt="tdtLogo"
            >
            </img>
            {this.props.first_name} {this.props.last_name}
          </div>
          <div>
            <img
              style={{height: '20px', width: '20px'}}
              src={id}
              alt="tdtLogo"
            >
            </img>
             {this.props.id}
          </div>
        </div>
        <div>
          <img
            style={{ height: '30px', width: '30px' }}
            src={excelDownload}
            alt="Logo"
            onClick={this.props.handleOnPressExcelDownload}
          />
          <img
            style={{ height: '30px', width: '30px' }}
            src={logo}
            alt="Logo"
            onClick={this.props.handleOnPressEmployee}
          />
        </div>
      </li>
    );
  }
}
