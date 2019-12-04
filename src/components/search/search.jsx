import React, { useState, useEffect } from 'react';
import Loader from './../loader/loader';


export default function Search(props) {
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [toggleSearch, setToggleSearch] = useState(false)
  const [searchInput, setSearchInput] = useState(null);

  useEffect(() => {
    setLoadingSearch(false)
    setToggleSearch(false)
  }, [props.location])

  const handleSubmit = (e) => {
		e.preventDefault()
    props.searchLocation(searchInput)
    props.resetError()
    setLoadingSearch(true)
  }

  return (
    <div className="search">
      { !toggleSearch ?
        <div
          className="search-trigger"
          onClick={() => setToggleSearch(!toggleSearch)}>Not in {props.location[0].title}?
        </div>
        :
        <form
        className={toggleSearch ? 'search-form search-form--isAnimated' : 'search-form'}
        onSubmit={(e) => handleSubmit(e)}
        >
        <input
          className="search-field"
          placeholder="Search for..."
          onChange={(e) => setSearchInput(e.target.value)}
          autoComplete="off"
        />
        { loadingSearch && !props.error &&
          <div className="search-loaderWrapper">
            <Loader
              isSmall={true}
            />
          </div>
        }
        </form>
      }
    </div>
  )
}