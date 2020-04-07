import React, { Component } from 'react';
import LayoutContentWrapper from 'components/utility/layoutWrapper';
import LayoutContent from 'components/utility/layoutContent';
import { Input, Row, Select, Button, Icon } from 'antd';
import {apiRequest} from "helpers/utility"


export default class extends Component {

  constructor(props) {
    super(props)
    this.state = { upc_list: "", bu: "Tech",  job_id: ""}
  }

  handleChange(value) {
    this.setState({bu: value });
  }

  set_upc_list(e) {
    this.setState({upc_list: e.target.value});
  }

  submit_job() {
    apiRequest("/jobs/power", this.state, "POST")
      .then(function(data){
        console.log(data)
      })
  }

  set_job_id(e) {
    this.setState({job_id: e.target.value})
  }


  render() {

    const Option = Select.Option;

    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <Row style={{marginBottom: 20}}>
            <h1>Power Analysis</h1>
          </Row>
          <Row style={{marginBottom: 20}}>
            <Input placeholder="Job Name" onChange={this.set_job_id.bind(this)}/>
          </Row>
          <Row style={{marginBottom: 20}}>
            <Input placeholder="UPC LIST" onChange={this.set_upc_list.bind(this)}/>
          </Row>
          <Row style={{marginBottom: 20}}>
            <div>
              <Select defaultValue="Tech" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                <Option value="SDA">SDA</Option>
                <Option value="tech">Tech</Option>
                <Option value="beauty">Beauty</Option>
                <Option value="auto">Auto</Option>
              </Select>
            </div>
          </Row>
          <Row>
            <Button type="primary" onClick={this.submit_job.bind(this)}>Submit</Button>
          </Row>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}





