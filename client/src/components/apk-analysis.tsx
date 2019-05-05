import * as React from 'react';
import { ApkAnalysisModel, IApkAnalysisModel } from '../models/apk-analysis.model';

export interface IApkAnalysisProps {
  file: string,
  toggleOthers: (shouldHide: boolean, data?: IApkAnalysisModel) => any
}

export interface IApkAnalysisState {
  showDetails: boolean,
  data?: ApkAnalysisModel
}

export default class ApkAnalysis extends React.Component<IApkAnalysisProps, IApkAnalysisState> {
  constructor(props: IApkAnalysisProps) {
    super(props);
    this.state = {
      showDetails: false
    }
  }

  componentDidMount() {
    this.getFile(this.props.file)
      .then(res => this.setState({ data: ApkAnalysisModel.create(res.file) }))
      .catch(err => console.log(err));
  }

  public render() {
    return (
      <React.Fragment>
        {this.state && this.state.data ?
          <tr>
            <td><a href="#" onClick={e => this.showDetails(e, this.state.data)}>{this.state.data.application.name}</a></td>
            <td>
              <label className={"btn btn-block btn-sm btn-" + this.getColor(this.state.data.application.permissions.length)}>{this.state.data.application.permissions.length} permissions</label>
              <label className={"btn btn-block btn-sm btn-" + this.getColor(this.state.data.trackers.length)}>{this.state.data.trackers.length} trackers</label>
            </td>
            <td>{this.state.data.application.version_name}</td>
          </tr>
          :
          <tr><td>Loading...</td></tr>
        }
      </React.Fragment>
    );
  }

  getColor = (amt: number) => {
    if (amt > 10) {
      return "danger";
    } else if (amt > 0) {
      return "warning";
    }
    return "success";
  }

  showDetails = (e: React.MouseEvent, data?: IApkAnalysisModel) => {
    e.preventDefault();
    this.setState({
      showDetails: true
    }, () => {
      if (data) {
        this.props.toggleOthers(true, data);
      }
    })
  }

  getFile = async (filename: string) => {
    const response = await fetch('/api/file?name=' + filename);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
}
