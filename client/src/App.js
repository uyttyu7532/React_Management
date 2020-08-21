import React, { Component} from 'react';
import './App.css';
import Gifticon from './components/Gifticon';
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table:{
    minWidth: 1080
  },
  progress:{
    margin: theme.spacing.unit * 2
  }
})



class App extends Component {

  state = {
    customers: "",
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({gifticons: res})) // 받아서 state로 설정 (서버에서 받은 res가  gifticons가 됨)
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('/api/gifticons'); // 접속하고자 하는 api주소
    const body = await response.json(); // 목록이 json 형태로 출력
    return body;
  }

  progress = () => {
    const { completed } = this.state; // this.state.completed를 completed로 접근할 수 있게 해준다.
    this.setState({completed: completed >= 100 ? 0 : completed + 1})
  }

  render() {
      const { classes } = this.props;
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>기프티콘 사진</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>유효기간</TableCell>
                <TableCell>사용 여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.gifticons ? 
            this.state.gifticons.map(g => {
              return(
                <Gifticon
                key = {g.id}
                id = {g.id}
                barcode_img = {g.barcode_img}
                name = {g.name}
                exp_date = {g.exp_date}
                used = {g.used}
              />
              );
          }):
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
            </TableCell>
          </TableRow>
        }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);