import React, { Component } from 'react';
import { TabMenu } from 'primereact/tabmenu';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabItems: [
                {label: 'Browse', icon: 'pi pi-fw pi-info-circle'},
                {label: 'Search', icon: 'pi pi-fw pi-search'}
            ],
            activeTab: {}
        };
    }

    render() {
        return (
            <div>
                <TabMenu model={this.state.tabItems} activeItem={this.state.activeTab} onTabChange={(e) => this.setState({activeTab: e.value})}/>


            </div>
        );
    }
}

export default Home;
