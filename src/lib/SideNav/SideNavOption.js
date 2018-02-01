import React, { Component } from 'react';

class SideNavOption extends Component {
    render() {
        const { children } = this.props;
        return (
            <li>
                {children}
            </li>
        );
    }
}

export default SideNavOption;