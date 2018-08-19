import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Pie } from 'react-chartjs';
import TendersScreen from '../tenders';

const pieData = [
  {
    value: 300,
    color: '#F7464A',
    highlight: '#FF5A5E',
    label: 'Schools'
  },
  {
    value: 50,
    color: '#46BFBD',
    highlight: '#5AD3D1',
    label: 'Manuacturing'
  },
  {
    value: 100,
    color: '#FDB45C',
    highlight: '#FFC870',
    label: 'Startup'
  },
  {
    value: 100,
    color: '#FDB45C',
    highlight: '#FFC870',
    label: 'Food Processing'
  }
];

const closedData = [
  {
    value: 100,
    color: '#F7464A',
    highlight: '#FF5A5E',
    label: 'Schools'
  },
  {
    value: 140,
    color: '#46BFBD',
    highlight: '#5AD3D1',
    label: 'Manuacturing'
  },
  {
    value: 200,
    color: '#FDB45C',
    highlight: '#FFC870',
    label: 'Startup'
  },
  {
    value: 10,
    color: '#FDB45C',
    highlight: '#FFC870',
    label: 'Food Processing'
  }
];
const Dashboard = ({ user }) => {
  return (
    <div className="pure-g">
      <div className="pure-u-1-1">
        <h1>Dezil-artneced tender system</h1>
        <p>Transparent Trust and Secure system</p>
        <div>
          <Card width="50px">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Typography
                gutterBottom
                variant="headline"
                component="h2"
                style={{ margin: 20 }}
              >
                Tenders Open
              </Typography>
              <CardContent>
                <img
                  style={{ width: 250, height: 250 }}
                  src={require('../../../chart1.jpg')}
                />
              </CardContent>
              <Typography
                gutterBottom
                variant="headline"
                component="h2"
                style={{ margin: 20 }}
              >
                Tenders Closed
              </Typography>
              <CardContent>
                <img
                  style={{ width: 250, height: 250 }}
                  src={require('../../../chart2.jpg')}
                />
              </CardContent>
            </div>
          </Card>
          <Card width="50px" style={{ marginTop: 20 }}>
            <Typography
              gutterBottom
              variant="headline"
              component="h2"
              style={{ margin: 20 }}
            >
              Bids Closing Today
            </Typography>
            <CardContent>
              <div>
                <TendersScreen user={user} dashboard={true} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
