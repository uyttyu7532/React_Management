import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { DialogActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    useGifticonBtn: {
        width: '100px',
        height: '50px'
    },
    useGifticonDialog: {
        margin: '10px',
        maxWidth: '100%',
        width: '500px',
        maxHeight: ' 100%',
        height: '60px',
    },
    YesBtn: {
        width: '200px',
        height: '50px'
    },
    NoBtn: {
        width: '200px',
        height: '50px'
    }

});

class GifticonDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteGifticon(id) {
        const url = 'http://ec2-15-164-50-1.ap-northeast-2.compute.amazonaws.com/api/gifticons' + id;
        fetch(url, {
            method: 'DELETE'
        });
        // 새로 바뀐 목록 출력
        this.props.stateRefresh();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button  className={classes.useGifticonBtn} variant="contained" color="secondary" onClick={this.handleClickOpen}>사용</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>경고</DialogTitle>
                    <DialogContent className={classes.useGifticonDialog}>
                        <Typography gutterBottom>
                            정말 사용하신 기프티콘입니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.YesBtn} variant="contained" color="secondary" onClick={(e) => { this.deleteGifticon(this.props.id) }}>네</Button>
                        <Button className={classes.NoBtn} variant="outlined" color="secondary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(GifticonDelete);