import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; /*wheneverr we want to in teract with redux whenverwe are calling an action or getting the state , we want to use connect(*/
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alert: PropTypes.array.isRequired /** as alerts is an array */,
};
const mapStatetoprops = (state) => ({
  alerts: state.alert,
});
export default connect(mapStatetoprops)(Alert);
