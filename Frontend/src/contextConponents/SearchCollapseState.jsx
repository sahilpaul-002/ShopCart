import React, {useState} from 'react'
import SearchCollapseContext from '../contexts/SearchCollapseContext'

export default function SearchCollapseState(props) {
    // State to store the searchbar collapse
    const [searchbarCollapse, setSearchbarCollapse] = useState(true);

    const value = {searchbarCollapse, setSearchbarCollapse};

  return (
    <SearchCollapseContext value={value} >{props.children}</SearchCollapseContext>
  )
}
