import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsSearch } from "react-icons/bs";

export const SearchBar = ({ imageName }) => {
    const [value, setValue] = useState('')

    const handleNameImage = e => {
        setValue(e.currentTarget.value.toLowerCase().trim())
    }

    const handleSubmit = e => {
        e.preventDefault();
        imageName(value)
    }

    return (
        <header className="searchbar" >
            <form onSubmit={handleSubmit} className="search_form">
                <button type="submit" className="search_form-button">
                    <BsSearch style={{ width: 24, height: 24 }}>Search</BsSearch>
                </button>

                <input
                    className="search_form-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={value}
                    onChange={handleNameImage}
                />
            </form>
        </header>
    )
}

SearchBar.propTypes = {
    imageName: PropTypes.func.isRequired,
}