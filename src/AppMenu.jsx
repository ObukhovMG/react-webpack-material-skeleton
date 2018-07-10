import React from "react"
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class AppMenu extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    state = {
        anchorEl: null,
    }

    handleClickMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleSelect = (location) => {
        const { history } = this.props;
        this.setState({ anchorEl: null }, history.push(location));
    }

    isSelected = (path) => {
        const {location} = this.props;
        return path === location.pathname
    }

	render() {
		const {classes} = this.props
        const {anchorEl} = this.state
		return (
			<div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton}
                                    color="inherit"
                                    aria-label="Menu"
                                    aria-owns={anchorEl ? 'simple-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleClickMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleSelect}
                        >
                            <MenuItem onClick={() => this.handleSelect('/HelloWorld')}
                                      selected={this.isSelected('/HelloWorld')}>
                                HelloWorld
                            </MenuItem>
                            <MenuItem onClick={() => this.handleSelect('/Other')}
                                      selected={this.isSelected('/Other')}>
                                Other
                            </MenuItem>
                        </Menu>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Title
                        </Typography>
                    </Toolbar>
                </AppBar>
			</div>
		)
	}
}

export default withRouter(withStyles(styles)(AppMenu))