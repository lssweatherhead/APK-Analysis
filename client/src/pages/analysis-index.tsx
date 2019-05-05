import * as React from 'react';
import ApkAnalysis from '../components/apk-analysis';
import { IApkAnalysisModel } from '../models/apk-analysis.model';

export interface IAnalysisIndexProps {
}

export interface IAnalysisIndexState {
    files: string[],
    hideOthers: boolean,
    details?: IApkAnalysisModel
}

export default class AnalysisIndex extends React.Component<IAnalysisIndexProps, IAnalysisIndexState> {
  constructor(props: IAnalysisIndexProps) {
    super(props);

    this.state = {
        files: [],
        hideOthers: false
    }
  }

  componentDidMount() {
    this.getFiles()
      .then(res => this.setState({ files: res.files }))
      .catch(err => console.log(err));
  }

  public render() {
    return (
      <div>
        {this.state.hideOthers === false ?
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Application</th>
                <th scope="col">Issues</th>
                <th scope="col">Version</th>
              </tr>
            </thead>
            <tbody>
            { this.state.files.map(file =>
              <ApkAnalysis key={file} file={file} toggleOthers={this.toggleTable} />
            ) }
            </tbody>
          </table>
          :
          <div>
            {this.state.details ?        
              <div>
                <div className="text-left">
                  <button type="button" className="btn btn-dark" onClick={e => this.showTable(e)}>Back to list</button>
                </div>
                <hr />
                <div className="row">
                  <div className="col-4">
                    <div className={"alert alert-" + this.getColor(this.state.details.application.permissions.length)} role="alert">
                      <h1>{this.state.details.application.permissions.length}</h1>
                      <p>permissions</p>
                    </div>
                    <div className={"alert alert-" + this.getColor(this.state.details.trackers.length)} role="alert">
                      <h1>{this.state.details.trackers.length}</h1>
                      <p>trackers</p>
                    </div>
                  </div>
                  <div className="col-8 text-left">
                    <h1>{this.state.details.application.name}</h1>
                    <p>Version: {this.state.details.application.version_name} #{this.state.details.application.version_code}</p>
                    <p>Handle: {this.state.details.application.handle}</p>
                    <p>UAID: {this.state.details.application.uaid}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="card">
                      <div className="card-header">
                        {this.state.details.trackers.length} Trackers
                      </div>
                      <div className="card-body text-left">
                        {this.state.details.trackers.length > 0 ?
                          <React.Fragment>
                            <p className="card-text">We have found code signature of the following trackers in the application:</p>
                            <ul>
                              {this.state.details.trackers.map(t =>
                              <li><b>{t.name}</b> (Tracker ID: {t.id})</li>  
                              )}
                            </ul>
                          </React.Fragment>
                          :
                          <p className="card-text">No trackers</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="card">
                      <div className="card-header">
                        {this.state.details.application.permissions.length} Permissions
                      </div>
                      <div className="card-body text-left">
                        {this.state.details.application.permissions.length > 0 ?
                          <React.Fragment>
                            <p className="card-text">We have found the following permissions in the application:</p>
                            <hr />
                            {this.state.details.application.permissions.map(p =>
                              <React.Fragment>
                                <b>{p}</b>
                                <hr />
                              </React.Fragment>  
                            )}
                          </React.Fragment>
                          :
                          <p className="card-text">No trackers</p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              :
              <p>Loading...</p>
            }
          </div>
        }
      </div>
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

  showTable(e: React.MouseEvent): void {
    e.preventDefault();
    this.setState({
      hideOthers: false
    })
  }

  toggleTable = (hide: boolean, data?: IApkAnalysisModel) => {
    this.setState({
      hideOthers: hide,
      details: data
    })
  }

  getFiles = async () => {
    const response = await fetch('/api/files');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
}
