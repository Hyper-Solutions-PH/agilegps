
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { toArray } from 'lodash';
import appState from '../appState';

function formatVehicle(vehicle) {
  if (!vehicle) return "";
  let str = "";
  str += vehicle.name;

  // quick testing
  // vehicle.obd = {
  //     malfunction: true,
  //     diagnosticTroubleCodesCount: 1,
  //     temp: 95,
  //     fuelLevelInput: 97,
  // }
  // vehicle.deviceBatteryPercent = 23;

  if (vehicle.obd) {
    const obd = vehicle.obd;
    var prev = false;
    if (obd.malfunction) {
      str += " ";
      if (
        _.isFinite(obd.diagnosticTroubleCodesCount) &&
        obd.diagnosticTroubleCodesCount > 1
      ) {
        str += obd.diagnosticTroubleCodesCount;
      }
      str += "⚠";
      prev = true;
    }

    // if (obd.temp) {
    //     if (prev) str += " |";
    //     str += ' ' + obd.temp + '℃';
    //     prev = true;
    // }

    if (obd.fuelLevelInput) {
      if (prev) str += " |";
      if (_.isFinite(obd.fuelLevelInput)) {
        str += " " + obd.fuelLevelInput + "%⛽";
      }
      prev = true;
    }
  }

  // if (_.isFinite(vehicle.deviceBatteryPercent)) {
  //     str += ' ' + vehicle.deviceBatteryPercent + '%🔋';
  // }
  return str;
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      searchInput: '',
    }
  }

  static propTypes = {
    orgName: PropTypes.string,
    user: PropTypes.object,
  };

  componentDidMount() {
  }
  
  handleSearchChange = (event) => {
    this.setState({searchInput: event.target.value});
  }

  clearSearch = () => {
    this.setState({searchInput: ''});
  }

  selectFleetAll = () => {
    appState.selectFleetAll();
  }

  selectFleet = fleet => {
    appState.selectFleet(fleet);
  };

  render() {
    const { fleets, selectedAllFleets, selectedVehicle, vehiclesByID } = this.props;
    const { searchInput } = this.state;

    return (
      <div className="business-table fullwidth">
        <form className="form-search">
          <input
          className="input-search fullwidth"
          onChange={ this.handleSearchChange }
          value={ searchInput }
          >
          </input>
          <span
           className="middle glyphicon glyphicon-search"
           style={{
             position: 'absolute',
             right: '45px',
             top: '24px;,'
           }}
           onClick={ this.clearSearch }
          />
        </form>
        <ul className="list-group">
          <li
            key="Fleets/All"
            onClick={ this.selectFleetAll }
            className={ classnames('list-group-item pointer', {
            'active': selectedAllFleets,
          }) }>
            Fleets/All 
          </li>
          {
            fleets.map(fleet => {
              return (
                <li
                  key={ fleet.id }
                  onClick={ () => this.selectFleet(fleet) }
                  className={ classnames('list-group-item pointer', {}) }>
                  { /* todo add truck svg */ }
                  <b>{ fleet.name }</b>
                  <ul className="list-group">
                  { 
                    fleet.vehicles.filter(vid => {
                      const vehicle = vehiclesByID[vid];
                      return searchInput === '' || vehicle.name.toUpperCase().includes(searchInput);
                    })
                    .map(vid => {
                      const vehicle = vehiclesByID[vid];
                      return (
                        <li
                          className="list-group-item pointer"
                          style={{ 
                            margin: '0 0 0 15px',
                          }}
                          className={ classnames({
                            active: selectedVehicle === vehicle
                          }) }
                          onClick={ () => appState.selectVehicleByID(vehicle.id) }
                          key={ vid }
                        >
                          { formatVehicle(vehicle) }
                        </li>
                      )
                    })
                  }
                  </ul>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    fleets: toArray(state.fleetsByID),
    selectedAllFleets: state.selectedAllFleets,
    selectedVehicle: state.selectedVehicle,
    vehiclesByID: state.vehiclesByID,
  }),
  dispatch => bindActionCreators({
  }, dispatch),
)(Sidebar);
