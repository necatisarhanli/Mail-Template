import React from 'react'
import TemplateList from './TemplateList'
import Menu from '../global/menu'
class TemplateMain extends React.Component {
  render() {
    return (
      <div className="ui grid container">
        <div className="sixteen column">
          <Menu />
          <h5 className="ui horizontal divider header ">
            <i className="copy outline icon"></i>
            Templates
          </h5>
          <TemplateList />
        </div>
      </div>
    )
  }
}

export default TemplateMain
