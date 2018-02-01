import React, { Component } from 'react';

class SideNavSection extends Component {
    render() {
        const { children } = this.props;
        return (
            <ul>
                {children}
            </ul>
        );
    }
}

export default SideNavSection;