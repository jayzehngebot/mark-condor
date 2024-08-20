// class component
// search the site
import './Search.module.css';

import React, { Component } from 'react';

type SearchProps = {
    input: string;
}

class Search extends Component<SearchProps, { input: string }> {
    constructor(props: SearchProps) {
        super(props);
        this.state = { input: '' };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Searching for: " + this.state.input);
    }

    handleIconClick() {
        console.log("Searching for: " + this.state.input);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ input: event.target.value });
    }

    render() {
        return (
            <div className="ml-0">
                <form onSubmit={this.handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input mr-2"
                        value={this.state.input}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit" className="search-button">
                        {String.fromCodePoint(0x1f50d)}
                    </button>
                </form>
            </div>
        );
    }
}

export default Search;